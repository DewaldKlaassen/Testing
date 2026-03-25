// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.760.59/runtimes/native1.12-tchmi/TcHmi.d.ts" />

(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var ICxx;
        (function (ICxx) {
            function GTAC_SetSymValue(Target_String, Value, SymbolType) {
                //------------------- Give me a string (can be mulitple parts) and a value ------------------------------
                //------------------- and I will set the targeted symbol to the value you've given me. ---------
                //------------------- Written by: b.lekx-toniolo / r.jones-------------------------------------------
                //-------------------- May-26-2024 ---------------------------------------------------------


                // General function param error handling
                if (!Target_String || Target_String == null) throw new Error("GTAC_SetSymValue -> Null given for Target_String param: " + Target_String);
                if (Value == null) throw new Error("GTAC_SetSymValue -> Null given for Value param: " + Value);

                if (!SymbolType || SymbolType == null) {
                    //Create Default symbol Type
                    SymbolType = "s";
                }

                //Add pre and post-amble conventions to create symbol string (AKA jinja like identifiers)
                let Symbol_String = "%" + SymbolType + "%" + Target_String + "%/" + SymbolType + "%";
 
                //Write Value to Target Symbol
                TcHmi.Symbol.writeEx(Symbol_String, Value);


            }
            ICxx.GTAC_SetSymValue = GTAC_SetSymValue;
        })(ICxx = Functions.ICxx || (Functions.ICxx = {}));
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);
TcHmi.Functions.registerFunctionEx('GTAC_SetSymValue', 'TcHmi.Functions.ICxx', TcHmi.Functions.ICxx.GTAC_SetSymValue);
