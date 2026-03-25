(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var ICxx;
        (function (ICxx) {

            /**
             * Read a symbol (full or assembled from parts) and write its value into a target symbol.
             * Params:
             *  - ctx (provided by TcHmi)
             *  - targetSymbol (string)       : e.g. "%ctrl%EP9214Device_IO_3::Device_STAT%/ctrl%"
             *  - sourcePrefixOrFull (string) : full quoted symbol or prefix like "%s%PLC1..Out_To_ICxx::SS[1]::Discrete_Image::N0"
             *  - ArrayIndex (optional)       : array index to apply to source symbol (replaces %ARRAY% or SS[n])
             *  - indexOrValue (optional)     : token/tag or number to insert between prefix and suffix
             *  - sourceSuffix (optional)     : suffix string like "_STAT::Device%/s%"
             *  - symbolType (optional)       : 's' by default or as provided
             *  Example usages:
             *   GTAC_GetArrayObject(%ctrl%MyControl%, "%s%PLC1..Out_To_ICxx::SS[1]::Discrete_Image:N0", 3, "::Tag1%/s%", "s")
             *   Last Edit: 26-08-2025 -r.jones  
             */
            function GTAC_GetArrayObject(ctx, targetSymbol, sourcePrefixOrFull, ArrayIndex, indexOrValue, sourceSuffix, symbolType) {
                try {
                    if (!ctx) {
                        throw new Error("Missing ctx parameter");
                    }

                    // Resolve targetSymbol (accept either a symbol string OR a control-value binding object)
                    var resolvedTarget = resolveTargetSymbolParam(ctx, targetSymbol);
                    if (!resolvedTarget) {
                        return void ctx.error(TcHmi.Errors.FUNCTION_EXPRESSION_PARSER_ERROR || -1, {
                            code: TcHmi.Errors.FUNCTION_EXPRESSION_PARSER_ERROR || -1,
                            message: "Invalid targetSymbol parameter",
                            reason: "Param0 must be a symbol expression string (e.g. %ctrl%EP9214Device_IO_3::Device_STAT%/ctrl%) or a control-binding object that exposes the symbol (property 'symbol' / 'symbolPath' / 'binding.symbol'). Check your Trigger Manager parameter order: Param0 = targetSymbol, Param1 = sourcePrefixOrFull, Param2 = index/tag, Param3 = sourceSuffix, Param4 = symbolType.",
                            domain: "Function"
                        });
                    }

                    // Use resolvedTarget for all further operations
                    targetSymbol = resolvedTarget;

                    // Quick sanity: targetSymbol must contain at least one '::' or be a control wrapper like %ctrl%
                    var ts = targetSymbol.trim();
                    if (!(ts.indexOf("::") !== -1 || /^%[a-zA-Z]+%/.test(ts))) {
                        return void ctx.error(TcHmi.Errors.FUNCTION_EXPRESSION_PARSER_ERROR || -1, {
                            code: TcHmi.Errors.FUNCTION_EXPRESSION_PARSER_ERROR || -1,
                            message: "targetSymbol does not look like a valid symbol expression",
                            reason: "Resolved targetSymbol: " + String(targetSymbol) + ". It should look like %ctrl%MyDevice::MyStruct%/ctrl% or contain '::'. Verify Param0 in Trigger Manager.",
                            domain: "Function"
                        });
                    }

                    // Validate inputs
                    if (typeof targetSymbol !== "string" || targetSymbol.trim() === "") {
                        return void ctx.error(TcHmi.Errors.FUNCTION_EXPRESSION_PARSER_ERROR || -1, {
                            code: TcHmi.Errors.FUNCTION_EXPRESSION_PARSER_ERROR || -1,
                            message: "Invalid targetSymbol parameter",
                            reason: "Provide the target symbol string (e.g. %ctrl%MyDevice::Status%/ctrl%).",
                            domain: "Function"
                        });
                    }
                    if (typeof sourcePrefixOrFull !== "string" || sourcePrefixOrFull.trim() === "") {
                        return void ctx.error(TcHmi.Errors.FUNCTION_EXPRESSION_PARSER_ERROR || -1, {
                            code: TcHmi.Errors.FUNCTION_EXPRESSION_PARSER_ERROR || -1,
                            message: "Invalid sourcePrefixOrFull parameter",
                            reason: "Provide a full source symbol or a prefix string to assemble the source symbol.",
                            domain: "Function"
                        });
                    }

                    // NEW (fixed): unwrap existing %X%...%/X% from the prefix, apply ArrayIndex to the inner path,
                    // assemble the inner source, then wrap exactly once with the final symbolType.
                    // 1) Detect and unwrap prefix wrapper (remember it if present)
                    var prefixWrappedMatch = null;
                    try {
                        prefixWrappedMatch = sourcePrefixOrFull.match(/^%([a-zA-Z]+)%([\s\S]+)%\/\1%$/);
                    } catch (e) { prefixWrappedMatch = null; }

                    var prefixSymbolType = null;
                    var innerPrefix = sourcePrefixOrFull;
                    if (prefixWrappedMatch) {
                        prefixSymbolType = prefixWrappedMatch[1];
                        innerPrefix = prefixWrappedMatch[2];
                    }

                    // --- NEW: sanitizers to avoid duplicated/malformed wrappers in parts ---
                    function stripOuterWrapperParts(s) {
                        try {
                            if (typeof s !== "string") return s;
                            // remove full wrappers like %x%...%/x%
                            var m = s.match(/^%([a-zA-Z]+)%([\s\S]*)%\/\1%$/);
                            if (m) s = m[2];
                            // remove any remaining wrapper tokens e.g. %s% or %/s% or %1%
                            s = s.replace(/%\/?[a-zA-Z0-9]+%/g, "");
                            return s;
                        } catch (e) { return s; }
                    }

                    // sanitize innerPrefix now (in case parts contain stray wrappers)
                    innerPrefix = stripOuterWrapperParts(innerPrefix);

                    // 2) Apply ArrayIndex to the innerPrefix (prefer %ARRAY% placeholder, otherwise replace SS[n])
                    if (typeof ArrayIndex !== "undefined" && ArrayIndex !== null && String(ArrayIndex).trim() !== "") {
                        try {
                            // ensure numeric-ish array index (strip non-digits)
                            var ai = String(ArrayIndex).replace(/\D/g, "");
                            if (ai === "") ai = String(ArrayIndex); // fallback if non-numeric intended
                            if (innerPrefix.indexOf("%ARRAY%") !== -1) {
                                innerPrefix = innerPrefix.replace(/%ARRAY%/g, ai);
                            } else {
                                innerPrefix = innerPrefix.replace(/SS\[\d+\]/, "SS[" + ai + "]");
                            }
                        } catch (e) {
                            // ignore and proceed with original innerPrefix
                        }
                    }

                    // 3) Sanitize indexOrValue and sourceSuffix to remove any wrappers before concatenation
                    var sanitizedIndex = indexOrValue;
                    var sanitizedSuffix = sourceSuffix;
                    if (typeof sanitizedIndex === "string") sanitizedIndex = stripOuterWrapperParts(sanitizedIndex);
                    if (typeof sanitizedSuffix === "string") sanitizedSuffix = stripOuterWrapperParts(sanitizedSuffix);

                    // 4) Assemble inner source (without any wrapper) using sanitized parts
                    var innerSrc;
                    if (typeof sanitizedIndex === "undefined" || sanitizedIndex === null || sanitizedIndex === "") {
                        innerSrc = innerPrefix;
                    } else {
                        sanitizedSuffix = (typeof sanitizedSuffix === "string") ? sanitizedSuffix : "";
                        innerSrc = String(innerPrefix) + String(sanitizedIndex) + String(sanitizedSuffix);
                    }

                    // 5) Determine final symbol type: explicit argument > prefix wrapper > default 's'
                    // sanitize any provided/prefix symbolType to letters only; fallback to 's'
                    if (prefixSymbolType) prefixSymbolType = String(prefixSymbolType).replace(/[^a-zA-Z]/g, "");
                    var suppliedType = (typeof symbolType === "string" && symbolType.length > 0)
                        ? String(symbolType).replace(/[^a-zA-Z]/g, "")
                        : "";
                    var finalSymbolType = suppliedType ? suppliedType : (prefixSymbolType ? prefixSymbolType : "s");

                    // 6) Wrap exactly once
                    var src = "%" + finalSymbolType + "%" + innerSrc + "%/" + finalSymbolType + "%";

                    // Prepare list of read attempts (primary + useful fallbacks)
                    var attempts = [];
                    attempts.push(src);

                    // If src includes %x% wrapper, add stripped-inner variant wrapped with same or default symbolType
                    var strippedInner = src;
                    var wrapperMatch = src.match(/^%([a-zA-Z]+)%([\s\S]+?)%\/([a-zA-Z]+)%$/);
                    if (wrapperMatch) {
                        strippedInner = wrapperMatch[2];
                        var wrapChar = wrapperMatch[1] || (symbolType || "s");
                        var wrappedStripped = "%" + wrapChar + "%" + strippedInner + "%/" + wrapChar + "%";
                        if (wrappedStripped !== src) attempts.push(wrappedStripped);
                    } else {
                        // src was not wrapped — add a wrapped variant using provided symbolType or default 's'
                        var wrapChar = (symbolType && typeof symbolType === "string" && symbolType.length > 0) ? symbolType : "s";
                        var defaultWrapped = "%" + wrapChar + "%" + src + "%/" + wrapChar + "%";
                        if (defaultWrapped !== src) attempts.push(defaultWrapped);
                    }

                    // Deduplicate attempts preserving order
                    attempts = attempts.filter(function (v, i) { return attempts.indexOf(v) === i; });

                    var attemptIndex = 0;
                    var attemptResults = [];

                    function tryReadNext() {
                        if (attemptIndex >= attempts.length) {
                            // All attempts failed: return detailed error
                            return void ctx.error(TcHmi.Errors.FUNCTION_FAILED || -1, {
                                code: TcHmi.Errors.FUNCTION_FAILED || -1,
                                message: "FunctionJS2_WriteToSymbol: all read attempts failed",
                                reason: "Attempts: " + JSON.stringify(attemptResults),
                                domain: "Function"
                            });
                        }

                        var attemptSymbol = attempts[attemptIndex++];

                        // Call readEx2 inside try/catch to catch invalid symbol expression exceptions
                        try {
                            TcHmi.Symbol.readEx2(attemptSymbol, function (readRes) {
                                try {
                                    var record = { symbol: attemptSymbol, result: readRes || null };
                                    attemptResults.push(record);

                                    if (!readRes) {
                                        // try next
                                        return tryReadNext();
                                    }

                                    if (typeof readRes.error === "undefined") {
                                        // malformed response: try next
                                        return tryReadNext();
                                    }

                                    if (readRes.error === TcHmi.Errors.NONE) {
                                        // success: write value to target
                                        var valueToWrite = readRes.value;

                                        // validate against current target schema (best-effort)
                                        validateAgainstTargetSchema(ctx, targetSymbol, valueToWrite, function (validationErr) {
                                            if (validationErr) {
                                                // Return clear validation error (do not attempt write)
                                                return void ctx.error(validationErr.code || (TcHmi.Errors.FUNCTION_FAILED || -1), {
                                                    code: validationErr.code || (TcHmi.Errors.FUNCTION_FAILED || -1),
                                                    message: validationErr.message || "Validation failed",
                                                    reason: validationErr.reason || ("Validation failed for target: " + targetSymbol),
                                                    domain: "Function"
                                                });
                                            }

                                            // Proceed to write since validation passed or couldn't be performed
                                            TcHmi.Symbol.writeEx(targetSymbol, valueToWrite, function (writeRes) {
                                                try {
                                                    if (!writeRes || typeof writeRes.error === "undefined" || writeRes.error !== TcHmi.Errors.NONE) {
                                                        return void ctx.error(writeRes && writeRes.error ? writeRes.error : (TcHmi.Errors.FUNCTION_FAILED || -1), {
                                                            code: writeRes && writeRes.error ? writeRes.error : (TcHmi.Errors.FUNCTION_FAILED || -1),
                                                            message: writeRes && writeRes.error ? TcHmi.Errors[writeRes.error] : "Write failed",
                                                            reason: "FunctionJS2_WriteToSymbol: writeEx failed for target: " + targetSymbol + "; read attempt: " + attemptSymbol,
                                                            domain: "Function"
                                                        });
                                                    }
                                                    return void ctx.success(true);
                                                } catch (we) {
                                                    return void ctx.error(TcHmi.Errors.FUNCTION_FAILED || -1, {
                                                        code: TcHmi.Errors.FUNCTION_FAILED || -1,
                                                        message: we && we.message ? we.message : String(we),
                                                        reason: "FunctionJS2_WriteToSymbol: exception in writeEx callback for: " + targetSymbol,
                                                        domain: "Function"
                                                    });
                                                }
                                            });
                                        });

                                    } else {
                                        // NEW: detect ADS invalid-symbol and return clear message
                                        var adsErr = null;
                                        try {
                                            adsErr = readRes.details && readRes.details.errors && readRes.details.errors[0];
                                        } catch (e) { adsErr = null; }

                                        if (adsErr && adsErr.code === 1048630) {
                                            return void ctx.error(readRes.error, {
                                                code: readRes.error,
                                                message: "Invalid symbol in PLC (HMI_ADS_E_INVALID_SYMBOL)",
                                                reason: "Attempted symbol: " + attemptSymbol + ". ADS message: " + (adsErr.message || JSON.stringify(adsErr)) + ". Verify symbol path and index in the Symbol Browser.",
                                                domain: "Function"
                                            });
                                        }

                                        // otherwise continue with next attempt
                                        return tryReadNext();
                                    }
                                } catch (ex) {
                                    return void ctx.error(TcHmi.Errors.FUNCTION_FAILED || -1, {
                                        code: TcHmi.Errors.FUNCTION_FAILED || -1,
                                        message: ex && ex.message ? ex.message : String(ex),
                                        reason: "FunctionJS2_WriteToSymbol: exception processing read result for: " + attemptSymbol,
                                        domain: "Function"
                                    });
                                }
                            });
                        } catch (callEx) {
                            // readEx2 threw synchronously (invalid symbol expression etc.) — record and continue
                            attemptResults.push({ symbol: attemptSymbol, exception: callEx && callEx.message ? callEx.message : String(callEx) });
                            return tryReadNext();
                        }
                    } // end tryReadNext

                    // start attempts
                    tryReadNext();

                } catch (ex) {
                    return void (ctx && ctx.error ? ctx.error(TcHmi.Errors.FUNCTION_FAILED || -1, {
                        code: TcHmi.Errors.FUNCTION_FAILED || -1,
                        message: ex && ex.message ? ex.message : String(ex),
                        reason: "FunctionJS2_WriteToSymbol wrapper caught exception.",
                        domain: "Function"
                    }) : null);
                }
            }

            // New helper: perform a best-effort validation of 'value' against the current value at targetSymbol.
            // If the target currently contains an object, ensure 'value' has the same keys and compatible basic types.
            // callback(err) -> err is null on success, otherwise an object with details to be reported.
            function validateAgainstTargetSchema(ctx, targetSymbol, value, callback) {
                try {
                    // Read current target value to infer schema
                    TcHmi.Symbol.readEx2(targetSymbol, function (metaRes) {
                        try {
                            if (!metaRes || typeof metaRes.error === "undefined") {
                                // Cannot determine schema; allow write (fail-open)
                                return void callback(null);
                            }
                            if (metaRes.error !== TcHmi.Errors.NONE) {
                                // Can't read target metadata; allow write
                                return void callback(null);
                            }
                            var current = metaRes.value;

                            // If current is not an object, we cannot validate complex schema; allow write
                            if (current === null || typeof current !== 'object') {
                                return void callback(null);
                            }

                            // If incoming value is not an object, it's a clear mismatch
                            if (value === null || typeof value !== 'object') {
                                return void callback({
                                    code: TcHmi.Errors.FUNCTION_FAILED || -1,
                                    message: "Type mismatch: target expects object, incoming value is not an object",
                                    reason: "Target symbol currently contains an object; incoming value type: " + typeof value
                                });
                            }

                            // Compare keys and basic types
                            var mismatches = [];
                            Object.keys(current).forEach(function (k) {
                                var expected = current[k];
                                var got = value[k];
                                if (typeof expected === 'undefined') {
                                    // can't infer type; skip
                                    return;
                                }
                                if (typeof got === 'undefined') {
                                    mismatches.push({ key: k, expectedType: typeof expected, gotType: 'missing' });
                                    return;
                                }
                                // treat null as allowed if expected is null
                                if (got === null && expected === null) return;
                                // Basic compatibility: booleans, numbers, strings, objects/arrays
                                var expectedType = (expected === null) ? 'null' : Array.isArray(expected) ? 'array' : typeof expected;
                                var gotType = (got === null) ? 'null' : Array.isArray(got) ? 'array' : typeof got;
                                if (expectedType !== gotType) {
                                    // allow number <-> integer mismatch: both 'number' same
                                    mismatches.push({ key: k, expectedType: expectedType, gotType: gotType });
                                }
                            });

                            if (mismatches.length > 0) {
                                return void callback({
                                    code: TcHmi.Errors.FUNCTION_FAILED || -1,
                                    message: "Returned object does not match target structure",
                                    reason: "Property mismatches: " + JSON.stringify(mismatches)
                                });
                            }

                            // All checks passed
                            return void callback(null);
                        } catch (e) {
                            // On unexpected error, allow write (fail-open) but report diagnostics
                            return void callback(null);
                        }
                    });
                } catch (e) {
                    // If readEx2 throws synchronously, allow write (fail-open)
                    return void callback(null);
                }
            }

            // Helper: accept a targetSymbol parameter that may be:
            //  - a symbol expression string ("%ctrl%Device::Struct%/ctrl%")
            //  - a control-value binding object that contains the symbol path (common keys searched below)
            function resolveTargetSymbolParam(ctx, param) {
                // If a symbol expression string was passed, return it (fast path)
                if (typeof param === "string") {
                    var s = param.trim();
                    if (s.length === 0) return null;
                    // Already a symbol expression?
                    if (/%[a-zA-Z]+%/.test(s) || s.indexOf("::") !== -1) {
                        return s;
                    }
                    // Otherwise treat as a control id/name and try to resolve control instance
                    try {
                        if (typeof TcHmi !== "undefined" && TcHmi.Controls && typeof TcHmi.Controls.getControl === "function") {
                            var ctrl = TcHmi.Controls.getControl(s);
                            if (ctrl) {
                                // Try common places for a registered server symbol on the control
                                var candidate =
                                    ctrl.symbol ||
                                    (ctrl.getAttribute && (ctrl.getAttribute("serverSymbol") || ctrl.getAttribute("symbol"))) ||
                                    (ctrl.__meta && ctrl.__meta.serverSymbol) ||
                                    (ctrl.binding && ctrl.binding.symbol) ||
                                    (ctrl.$ && ctrl.$.symbol);
                                if (typeof candidate === "string" && candidate.trim().length > 0) return candidate;
                            }
                        }
                    } catch (e) {
                        // ignore resolution errors, we'll fall through to other checks below
                    }
                    // Not a symbol and not resolvable as a control id
                    return null;
                }

                // If param is an object, try to extract a symbol path from likely fields
                if (param && typeof param === "object") {
                    var candidateKeys = [
                        "symbol", "Symbol", "symbolPath", "path", "targetSymbol",
    "serverSymbol", "_symbol", "ctrlSymbol", "binding", "__symbol"
                    ];
                    for (var i = 0; i < candidateKeys.length; i++) {
                        var k = candidateKeys[i];
                        try {
                            var v = param[k];
                            if (typeof v === "string" && v.trim().length > 0) return v;
                        } catch (e) { /* ignore */ }
                    }
                    // nested checks
                    try {
                        if (param.binding && typeof param.binding.symbol === "string") return param.binding.symbol;
                        if (param.__meta && typeof param.__meta.serverSymbol === "string") return param.__meta.serverSymbol;
                        if (param.$$ && typeof param.$$.symbol === "string") return param.$$.symbol;
                    } catch (e) { /* ignore */ }
                }

                return null;
            }

            // Export the implementation under a file-based name and keep old aliases for compatibility
            ICxx.GTAC_GetArrayObject = GTAC_GetArrayObject;
            ICxx.FunctionJS2_WriteToSymbol = GTAC_GetArrayObject; // preserve original export name as alias
            ICxx.testWritetoSymbol = GTAC_GetArrayObject; // backward compatibility alias
            ICxx.GTAC_Get_SetArrayObject = GTAC_GetArrayObject; // alias used by triggers

            // Register the callable names (primary = file name)
            Functions.registerFunctionEx('GTAC_GetArrayObject', 'TcHmi.Functions.ICxx', ICxx.GTAC_GetArrayObject);
            // Register aliases used by existing Trigger Manager configurations
            Functions.registerFunctionEx('GTAC_Get_SetArrayObject', 'TcHmi.Functions.ICxx', ICxx.GTAC_Get_SetArrayObject);
            Functions.registerFunctionEx('FunctionJS2_WriteToSymbol', 'TcHmi.Functions.ICxx', ICxx.FunctionJS2_WriteToSymbol);
            Functions.registerFunctionEx('testWritetoSymbol', 'TcHmi.Functions.ICxx', ICxx.testWritetoSymbol);

        })(ICxx = Functions.ICxx || (Functions.ICxx = {}));
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);