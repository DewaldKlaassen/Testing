// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.756.1/runtimes/native1.12-tchmi/TcHmi.d.ts" />

(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var ICxx;
        (function (ICxx) {
            function GTAC_TimeToClock(Time_Input) {
                let DayPosition = Time_Input.lastIndexOf("D")
                let HrPosition = Time_Input.lastIndexOf("H")
                let MinPosition = Time_Input.lastIndexOf("M");
                let SecPosition = Time_Input.lastIndexOf("S");
                var DayStartPos = 1;
                var HrStartPos = 2;
                var MinStartPos = 2;
                var SecStartPos = 2;
                var DayValue = 0;
                var HrValue = 0;
                var MinValue = 0;
                var SecValue = 0;
                var Total = 0;
                var ReturnString = "";
                var HourString = ''; //Hourstring is used for concatenating a '0' if less than 10 Hours
                var MinutesString = ''; //Hourstring is used for concatenating a '0' if less than 10 Hours
                var SecondsString = ''; //Hourstring is used for concatenating a '0' if less than 10 Hours



                if (DayPosition > 0) {
                    DayValue = Time_Input.slice(DayStartPos, DayPosition);
                    HrStartPos = DayPosition + 2;
                    MinStartPos = DayPosition + 2;
                    SecStartPos = DayPosition + 2;
                }

                if (HrPosition > 0) {
                    HrValue = Time_Input.slice(HrStartPos, HrPosition);
                    MinStartPos = HrPosition + 1;
                    SecStartPos = HrPosition + 1;
                }
                if (MinPosition > 0) {
                    MinValue = Time_Input.slice(MinStartPos, MinPosition);
                    SecStartPos = MinPosition + 1;
                }
                if (SecPosition > 0) {

                    SecValue = Time_Input.slice(SecStartPos, SecPosition);
                }
                if (HrValue < 10) {
                    HourString = '0' + HrValue;
                } else {
                    HourString = HrValue;
                }
                if (MinValue < 10) {
                    MinutesString = '0' + MinValue;
                } else {
                    MinutesString = MinValue;
                }
                if (SecValue < 10) {
                    SecondsString = '0' + SecValue;
                } else {
                    SecondsString = SecValue;
                }
                
                ReturnString = HourString + ":" + MinutesString + ":" + SecondsString;
                return ReturnString;
            }
            ICxx.GTAC_TimeToClock = GTAC_TimeToClock;
        })(ICxx = Functions.ICxx || (Functions.ICxx = {}));
        Functions.registerFunctionEx('GTAC_TimeToClock', 'TcHmi.Functions.ICxx', ICxx.GTAC_TimeToClock);
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);