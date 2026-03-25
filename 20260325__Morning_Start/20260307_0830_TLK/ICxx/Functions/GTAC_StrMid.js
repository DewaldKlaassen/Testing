// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.754.4/runtimes/native1.12-tchmi/TcHmi.d.ts" />

(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var ICxx;
        (function (ICxx) {
            function GTAC_StrMid(String, Start, Chars_to_Return) {
                var str_length = String.length;
                var mid_chars = "";

                if ((Chars_to_Return+Start) > str_length) {
                    Chars_to_Return = str_length;
                }

                for (let i = Start; i < Chars_to_Return; i++) {
                    mid_chars += String[i];
                }
                return mid_chars;
            }
            ICxx.GTAC_StrMid = GTAC_StrMid;
        })(ICxx = Functions.ICxx || (Functions.ICxx = {}));
        Functions.registerFunctionEx('GTAC_StrMid', 'TcHmi.Functions.ICxx', ICxx.GTAC_StrMid);
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);