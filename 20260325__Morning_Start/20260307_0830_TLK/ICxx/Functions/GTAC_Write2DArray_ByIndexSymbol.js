// Simplified for array-of-arrays: always uses [i][j] addressing (no multidim probe)
(function (/** @type {globalThis.TcHmi} */ TcHmi) {


    //--------------------------------------------------------------------------
    //------ A Function to take indexs of an array and write to specified array, in BOOL -----
    //------ Written by: r.jones ----------------------------------------
    //------Last Edit: 20251209 ------------------------------------------------


    try { console.log('Loading script: GTAC_Write2DArray_ByIndexSymbol.js'); } catch (e) { }
    function GTAC_Write2DArray_ByIndexSymbol(ArrayBasePath, Index1, Index2OrSymbol, Value) {
        // Minimal debug (remove or comment out once stable)
        try { console.log('GTAC_Write2DArray_ByIndexSymbol call', ArrayBasePath, Index1, Index2OrSymbol, Value); } catch (e) { }

        // Detect totally null invocation (argument mapping failure)
        if (ArrayBasePath === null && Index1 === null && Index2OrSymbol === null && Value === null) {
            console.error('GTAC_Write2DArray_ByIndexSymbol: All arguments null. Function metadata likely not bound. Re-select function in event editor and rebuild server.');
            return;
        }

        // Normalize base path
        if (typeof ArrayBasePath === 'string') {
            ArrayBasePath = ArrayBasePath.trim();
            if (ArrayBasePath.indexOf('%s%') === 0) {
                // strip markup if pasted
                ArrayBasePath = ArrayBasePath.replace(/^%s%/, '').replace(/%\/s%$/, '');
            }
        }

        // If ArrayBasePath was accidentally bound to the actual PLC ARRAY variable instead of a plain string path,
        // its runtime value will be an array/object (or a serialized string like "[[false,false,...]]"). Detect and warn.
        if (Array.isArray(ArrayBasePath)) {
            console.warn('ArrayBasePath appears to be an ARRAY VALUE, not the textual base path. Bind a STRING like PLC1.MAIN.MyArray (not the symbol itself).');
            return;
        }
        if (!ArrayBasePath) { console.warn('Missing ArrayBasePath'); return; }

        if (Index1 === null || typeof Index1 === 'undefined' || Index1 === '') {
            console.warn('Missing Index1 - defaulting to 0');
            Index1 = 0;
        }
        if (Index2OrSymbol === null || typeof Index2OrSymbol === 'undefined' || Index2OrSymbol === '') { console.warn('Missing Index2OrSymbol'); return; }

        // Resolve first index (can now also be a symbol path)
        var firstIndexNeedsRead = false;
        if (typeof Index1 === 'string') {
            var trimmedI1 = Index1.trim();
            if (/^\d+$/.test(trimmedI1)) {
                Index1 = parseInt(trimmedI1, 10);
            } else {
                // treat as symbol path for first index
                firstIndexNeedsRead = true;
                Index1 = trimmedI1; // keep path text
            }
        }

        // Helper to resolve second index then write
        function resolveSecondAndWrite(resolvedFirst) {
            if (typeof Index2OrSymbol === 'number' || (typeof Index2OrSymbol === 'string' && /^\d+$/.test(Index2OrSymbol.trim()))) {
                var idx2Lit = parseInt(Index2OrSymbol, 10);
                return writeNested(resolvedFirst, idx2Lit);
            }
            var sym2 = '%s%' + Index2OrSymbol.trim() + '%/s%';
            TcHmi.Symbol.readEx2(sym2, function (data2) {
                if (data2.error !== TcHmi.Errors.NONE) { console.error('Index2 read error', data2.error); return; }
                var idx2Val = data2.value;
                if (idx2Val === null || typeof idx2Val === 'undefined') { console.error('Index2 symbol returned null/undefined'); return; }
                if (typeof idx2Val === 'string' && /^\d+$/.test(idx2Val)) { idx2Val = parseInt(idx2Val, 10); }
                writeNested(resolvedFirst, idx2Val);
            });
        }

        if (firstIndexNeedsRead) {
            var sym1 = '%s%' + Index1 + '%/s%';
            TcHmi.Symbol.readEx2(sym1, function (data1) {
                if (data1.error !== TcHmi.Errors.NONE) { console.error('Index1 read error', data1.error); return; }
                var i1Val = data1.value;
                if (i1Val === null || typeof i1Val === 'undefined') { console.error('Index1 symbol returned null/undefined'); return; }
                if (typeof i1Val === 'string' && /^\d+$/.test(i1Val)) { i1Val = parseInt(i1Val, 10); }
                resolveSecondAndWrite(i1Val);
            });
        } else {
            resolveSecondAndWrite(Index1);
        }

        function writeNested(i1, i2) {
            if (typeof i1 === 'string' && /^\d+$/.test(i1)) { i1 = parseInt(i1, 10); }
            if (typeof i2 === 'string' && /^\d+$/.test(i2)) { i2 = parseInt(i2, 10); }
            var ws = '%s%' + ArrayBasePath + '[' + i1 + '][' + i2 + ']%/s%';
            TcHmi.Symbol.writeEx(ws, Value, function (res) {
                if (res.error === TcHmi.Errors.NONE) {
                    console.log('Write success', ws);
                } else {
                    console.error('Write failed', res.error, ws);
                }
            });
        }
    }

    TcHmi.Functions.registerFunction('GTAC_Write2DArray_ByIndexSymbol', GTAC_Write2DArray_ByIndexSymbol);
})(TcHmi);
