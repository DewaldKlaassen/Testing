// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.754.4/runtimes/native1.12-tchmi/TcHmi.d.ts" />

(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var ICxx;
        (function (ICxx) {
            function String_To_Any(String_To_Convert) {
                return parseFloat(String_To_Convert);
            }

            ICxx.String_To_Any = String_To_Any;
        })(ICxx = Functions.ICxx || (Functions.ICxx = {}));
        Functions.registerFunctionEx('String_To_Any', 'TcHmi.Functions.ICxx', ICxx.String_To_Any);
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);