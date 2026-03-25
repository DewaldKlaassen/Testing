// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.754.4/runtimes/native1.12-tchmi/TcHmi.d.ts" />

(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var ICxx;
        (function (ICxx) {
            function GTAC_GotoNext_ControlsScreen(ScreenNavNumber) {

                //----------- Increment and Wrap around control for Controls Overview Screen Navigation --------
                //----------- Written by b.lekx-toniolo ----------------
                //----------- Last edited: 20220328 --------------------

                if (!ScreenNavNumber) throw new Error("No value given for Parameter: " + ScreenNavNumber);
                //Check bounding, increment if not at boundary
                if (ScreenNavNumber < 50) {
                    ScreenNavNumber = ScreenNavNumber + 1;
                    return ScreenNavNumber;
                }
                else {
                    //If bound hit, return 0
                    return 0;
                }
                

            }
            ICxx.GTAC_GotoNext_ControlsScreen = GTAC_GotoNext_ControlsScreen;
        })(ICxx = Functions.ICxx || (Functions.ICxx = {}));
        Functions.registerFunctionEx('GTAC_GotoNext_ControlsScreen', 'TcHmi.Functions.ICxx', ICxx.GTAC_GotoNext_ControlsScreen);
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);