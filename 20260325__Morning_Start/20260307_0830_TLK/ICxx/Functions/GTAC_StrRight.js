// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.752.0/runtimes/native1.12-tchmi/TcHmi.d.ts" />
(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var ICxx;
        (function (ICxx) {
            function GTAC_StrRight(String, Chars_to_Return) {

                //-----------Function to return right hand characters (specified by Chars_To_Return) from a given string--------
                //----------- Written by b.lekx-toniolo ----------------
                //----------- Last edited: 20220225 --------------------

                var str_length = String.length;
                var rh_chars = "";

                for (let i = str_length - Chars_to_Return; i < str_length; i++) {
                    rh_chars += String[i];
                }
                return rh_chars;

            }
            ICxx.GTAC_StrRight = GTAC_StrRight;
        })(ICxx = Functions.ICxx || (Functions.ICxx = {}));
        Functions.registerFunctionEx('GTAC_StrRight', 'TcHmi.Functions.ICxx', ICxx.GTAC_StrRight);
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);