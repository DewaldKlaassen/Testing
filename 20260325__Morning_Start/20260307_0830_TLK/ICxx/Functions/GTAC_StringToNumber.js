// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.756.1/runtimes/native1.12-tchmi/TcHmi.d.ts" />

(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var ICxx;
        (function (ICxx) {
            function GTAC_StringToNum(StringInput) {
                return Number(StringInput);
            }
            ICxx.GTAC_StringToNum = GTAC_StringToNum;
        })(ICxx = Functions.ICxx || (Functions.ICxx = {}));
        Functions.registerFunctionEx('GTAC_StringToNum', 'TcHmi.Functions.ICxx', ICxx.GTAC_StringToNum);
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);