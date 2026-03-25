// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.752.0/runtimes/native1.12-tchmi/TcHmi.d.ts" />
(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var ICxx;
        (function (ICxx) {
            function GTAC_StrLeft(String, Chars_to_Return) {

                //-----------Function to return left hand characters (specified by Chars_To_Return) from a given string--------
                //----------- Written by b.lekx-toniolo ----------------
                //----------- Last edited: 20220225 --------------------

                var str_length = String.length;
                var lh_chars = "";
                
                if (Chars_to_Return > str_length) {
                    Chars_to_Return = str_length;
                }
                    
                for (let i = 0; i < Chars_to_Return; i++) {
                    lh_chars += String[i];
                }
                return lh_chars;

            }
            ICxx.GTAC_StrLeft = GTAC_StrLeft;
        })(ICxx = Functions.ICxx || (Functions.ICxx = {}));
        Functions.registerFunctionEx('GTAC_StrLeft', 'TcHmi.Functions.ICxx', ICxx.GTAC_StrLeft);
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);
