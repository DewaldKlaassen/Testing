// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.754.4/runtimes/native1.12-tchmi/TcHmi.d.ts" />

(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var ICxx;
        (function (ICxx) {
            function GTAC_ms_To_TimeString(Time) {
                //----------------------------------------------------------------
                /*
                        Give me:
                            - a numerical Value in milliseconds
                        and I will return the Time in HH:MM:SS.ms format
                */
                //------------------- Written by: cDrees -------------------------------------------
                //------------------- Last Edit: 20220414 --------------------------


                let Hour = Time / 3600000;
                let Minute = (Hour - Math.floor(Hour)) *60
                let Second = (Minute - Math.floor(Minute)) * 60
                let mSecond = (Second - Math.floor(Second))
                let CleanHour = Math.floor(Hour)
                let CleanMinute = Math.floor(Minute)
                let CleanSecond = Math.floor(Second)
                let HourStr = "";
                let MinStr = "";
                let SecStr = "";

                if (mSecond > 0.998) {
                    CleanSecond = CleanSecond +1;
                }
                if (CleanSecond >= 60) {
                    CleanSecond = CleanSecond - 60;
                    CleanMinute = CleanMinute + 1;
                }

                if (CleanMinute >= 60) {
                    CleanMinute = CleanMinute - 60;
                    CleanHour = CleanHour + 1;
                }

                if (CleanHour < 10) {
                    HourStr = "0" + CleanHour;
                } else {
                    HourStr = CleanHour;
                }
                if (CleanMinute < 10) {
                    MinStr = "0" + CleanMinute;
                } else {
                    MinStr = CleanMinute;
                }
                if (CleanSecond < 10) {
                    SecStr = "0" + CleanSecond;
                } else {
                    SecStr = CleanSecond;
                }
              
                return HourStr + ":" + MinStr + ":" + SecStr;
            }
            ICxx.GTAC_ms_To_TimeString = GTAC_ms_To_TimeString;
        })(ICxx = Functions.ICxx || (Functions.ICxx = {}));
        Functions.registerFunctionEx('GTAC_ms_To_TimeString', 'TcHmi.Functions.ICxx', ICxx.GTAC_ms_To_TimeString);
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);