var TcHmi;
(function (TcHmi) {
    let Functions;
    (function (Functions) {
        let ICxx;
        (function (ICxx) {
            function GTAC_GoGetSymbol_TS(Target_String) {
                var Symbol_String = "%s%" + Target_String + "%/s%";
                // Read actual symbol and process context return
                let retSymbol_Value;
                retSymbol_Value = TcHmi.Symbol.readEx2(Symbol_String, function (context_return) {
                    if (context_return.error === TcHmi.Errors.NONE) {
                        let intSymbol_Value = context_return.value;
                        //throw new Error("My Symbol_Value = "+intSymbol_Value);
                        //return Symbol_Value;
                    }
                    else {
                        throw new Error("Error reading Symbol: " + context_return.error);
                        //return null;
                    }
                });
                return retSymbol_Value;
            }
            ICxx.GTAC_GoGetSymbol_TS = GTAC_GoGetSymbol_TS;
        })(ICxx = Functions.ICxx || (Functions.ICxx = {}));
        Functions.registerFunctionEx('GTAC_GoGetSymbol_TS', 'TcHmi.Functions.ICxx', ICxx.GTAC_GoGetSymbol_TS);
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi || (TcHmi = {}));
//# sourceMappingURL=GTAC_GoGetSymbol_TS.js.map