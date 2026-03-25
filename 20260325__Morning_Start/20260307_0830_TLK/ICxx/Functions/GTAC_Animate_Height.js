// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.758.8/runtimes/native1.12-tchmi/TcHmi.d.ts" />

(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var ICxx;
        (function (ICxx) {
            function GTAC_Animate_Height(Height, ID) {
                //-----------------------------------------------------------------------------
                // A simple JS function to animate the MD / Rol Door Object
                // Written by: c.drees
                // Last Edit: 20250109 - cleaned up white spacing and added some commenting, blt
                //-----------------------------------------------------------------------------
                //Use Jquery Selector and animate method to aniumate the door change in height value
                NewSelector = '#' + ID;

                $(NewSelector).animate({
                    height: Height + 'px',
                    duration: 75
                    });
            }
            ICxx.GTAC_Animate_Height = GTAC_Animate_Height;
        })(ICxx = Functions.ICxx || (Functions.ICxx = {}));
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);
TcHmi.Functions.registerFunctionEx('GTAC_Animate_Height', 'TcHmi.Functions.ICxx', TcHmi.Functions.ICxx.GTAC_Animate_Height);
