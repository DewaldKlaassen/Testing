// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.752.0/runtimes/native1.12-tchmi/TcHmi.d.ts" />
(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var ICxx;
        (function (ICxx) {
            function GTAC_ZeroStringPad(Num) {
                if (Num <10) {
                    return ("0"+Num);
                } else {
                    return (Num);
                }
                   
                
            }
            ICxx.GTAC_ZeroStringPad = GTAC_ZeroStringPad;
        })(ICxx = Functions.ICxx || (Functions.ICxx = {}));
        Functions.registerFunctionEx('GTAC_ZeroStringPad', 'TcHmi.Functions.ICxx', ICxx.GTAC_ZeroStringPad);
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);