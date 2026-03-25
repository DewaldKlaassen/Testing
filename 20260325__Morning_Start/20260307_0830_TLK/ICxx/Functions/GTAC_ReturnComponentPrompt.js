// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.754.4/runtimes/native1.12-tchmi/TcHmi.d.ts" />

(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var ICxx;
        (function (ICxx) {
            function GTAC_ReturnComponentPrompt(Component_ID, Component_Num) {
                //-----------Function to return UI Prompt Bit from a given Component Name and Bit required --------
                //----------- Written by b.lekx-toniolo ----------------
                //----------- Last edited: 20220317 --------------------

                if (!Component_ID) {
                    throw new Error("Invalid value given for param Component_ID (" + Component_ID + ")");
                }
                if (!Component_Num) {
                    throw new Error("Invalid value given for param Component_Num (" + Component_Num + ")");
                }
                var target_symbol_string = "%s%PLC1..Out_To_ICxx::"+Component_ID+"xx_FaultPrompts%/s%";
                const target_symbol = new TcHmi.Symbol(target_symbol_string);

                if (Component_Num >= 0 && Component_Num <=31){
                    var prompt_bit_state = TcHmi.Functions.ICxx.GTAC_ReturnBinary_Bit(target_symbol, Component_Num);
                    return prompt_bit_state;
                }
                else {
                    throw new Error("Param Component_Num outside of range (" + Component_Num + ")")
                }

                
            }
            ICxx.GTAC_ReturnComponentPrompt = GTAC_ReturnComponentPrompt;
        })(ICxx = Functions.ICxx || (Functions.ICxx = {}));
        Functions.registerFunctionEx('GTAC_ReturnComponentPrompt', 'TcHmi.Functions.ICxx', ICxx.GTAC_ReturnComponentPrompt);
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);