// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.754.4/runtimes/native1.12-tchmi/TcHmi.d.ts" />

(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var ICxx;
        (function (ICxx) {
            function GTAC_Rounding(Value, TrimSize) {
                return Value.toFixed(TrimSize);
            }
            ICxx.GTAC_Rounding = GTAC_Rounding;
        })(ICxx = Functions.ICxx || (Functions.ICxx = {}));
        Functions.registerFunctionEx('GTAC_Rounding', 'TcHmi.Functions.ICxx', ICxx.GTAC_Rounding);
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);