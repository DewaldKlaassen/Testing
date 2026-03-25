// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.752.0/runtimes/native1.12-tchmi/TcHmi.d.ts" />
(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var ICxx;
        (function (ICxx) {
            function GTAC_GetContentName(RegionTarget) {

                if (!RegionTarget) {
                    return "";
                }
                let LastSlash = RegionTarget.lastIndexOf("/");
                let ExtentionPosition = RegionTarget.search(".content");
                return (RegionTarget.slice((LastSlash + 1), ExtentionPosition));
            }
            ICxx.GTAC_GetContentName = GTAC_GetContentName;
        })(ICxx = Functions.ICxx || (Functions.ICxx = {}));
        Functions.registerFunctionEx('GTAC_GetContentName', 'TcHmi.Functions.ICxx', ICxx.GTAC_GetContentName);
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);