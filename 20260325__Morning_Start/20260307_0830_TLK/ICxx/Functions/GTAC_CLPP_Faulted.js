// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.758.8/runtimes/native1.12-tchmi/TcHmi.d.ts" />

(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var ICxx;
        (function (ICxx) {
            function GTAC_CLPP_Faulted(CLPPFaults1, CLPPFaults2, CLPPFaults3, CLPPFaults4, CLPPFaults5) {

                if (CLPPFaults1 != 0 || CLPPFaults2 != 0 || CLPPFaults3 != 0 || CLPPFaults4 != 0 || CLPPFaults5 != 0) {
                    return true
                }
                else {
                    return false
                }
            }
            ICxx.GTAC_CLPP_Faulted = GTAC_CLPP_Faulted;
        })(ICxx = Functions.ICxx || (Functions.ICxx = {}));
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);
TcHmi.Functions.registerFunctionEx('GTAC_CLPP_Faulted', 'TcHmi.Functions.ICxx', TcHmi.Functions.ICxx.GTAC_CLPP_Faulted);
