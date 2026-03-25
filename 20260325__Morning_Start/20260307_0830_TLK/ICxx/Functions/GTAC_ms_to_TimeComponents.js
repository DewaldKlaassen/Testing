// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.754.4/runtimes/native1.12-tchmi/TcHmi.d.ts" />

(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var ICxx;
        (function (ICxx) {
            function GTAC_ms_to_TimeComponents(ms, TimeComponent) {
                //----------------------------------------------------------------
                /*
                        Give me:
                            - a numerical Value in milliseconds
                        and I will return the Time in HH:MM:SS.ms format
                */
                //------------------- Written by: cDrees -------------------------------------------
                //------------------- Last Edit: 20220414 --------------------------


                let Hour = ms / 3600000;
                let Minute = (Hour - Math.floor(Hour)) * 60
                let Second = (Minute - Math.floor(Minute)) * 60
                let mSecond = (Second - Math.floor(Second))
                let CleanHour = Math.floor(Hour)
                let CleanMinute = Math.floor(Minute)
                let CleanSecond = Math.floor(Second)

                if (TimeComponent == "H") {
                    return CleanHour
                }
                if (TimeComponent == "M") {
                    return CleanMinute
                }
                if (TimeComponent == "S") {
                    return CleanSecond
                }

            }
            ICxx.GTAC_ms_to_TimeComponents = GTAC_ms_to_TimeComponents;
        })(ICxx = Functions.ICxx || (Functions.ICxx = {}));
        Functions.registerFunctionEx('GTAC_ms_to_TimeComponents', 'TcHmi.Functions.ICxx', ICxx.GTAC_ms_to_TimeComponents);
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);