// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.756.1/runtimes/native1.12-tchmi/TcHmi.d.ts" />

(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var ICxx;
        (function (ICxx) {
            function GTAC_TruncIDs(ID) {
                const PeriodLocate = ID.indexOf(".");
                return ID.substring(0, PeriodLocate);
            }
            ICxx.GTAC_TruncIDs = GTAC_TruncIDs;
        })(ICxx = Functions.ICxx || (Functions.ICxx = {}));
        Functions.registerFunctionEx('GTAC_TruncIDs', 'TcHmi.Functions.ICxx', ICxx.GTAC_TruncIDs);
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);