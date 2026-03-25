// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.756.1/runtimes/native1.12-tchmi/TcHmi.d.ts" />

(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var ICxx;
        (function (ICxx) {
            function GTAC_LineAngle(Angle) {
                const Tangent = Math.tan(Angle*Math.PI/180);
                return Tangent;


                /*if (NeedRise) {
                    return (Math.tan(Angle)*Run);
                } else if (!NeedRise) {
                    return (Rise/(Math.tan(Angle)));
                }*/
            }
            ICxx.GTAC_LineAngle = GTAC_LineAngle;
        })(ICxx = Functions.ICxx || (Functions.ICxx = {}));
        Functions.registerFunctionEx('GTAC_LineAngle', 'TcHmi.Functions.ICxx', ICxx.GTAC_LineAngle);
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);