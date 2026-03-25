// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.754.4/runtimes/native1.12-tchmi/TcHmi.d.ts" />

(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var ICxx;
        (function (ICxx) {
            function GTAC_TimeToSeconds(Time) {
                //------------------- Written by: c.drees -------------------------------------------
                //------------------- Modified by: b.lekx-toniolo
                //------------------- Breakout UTC to Second to one dec place
                //------------------- Last Edit: 22-04-2024 (fix decimal length to single dec) --------------------------


                let DayPosition = Time.lastIndexOf("D")
                let HrPosition = Time.lastIndexOf("H")
                let MinPosition = Time.lastIndexOf("M");
                let SecPosition = Time.lastIndexOf("S");
                var DayStartPos = 2;
                var HrStartPos = 2;
                var MinStartPos = 2;
                var SecStartPos = 2;
                var DayValue = 0;
                var HrValue = 0;
                var MinValue = 0;
                var SecValue = 0;
                var Total = 0;


                if (DayPosition > 0) {
                    DayValue = Time.slice(DayStartPos, DayPosition);
                    HrStartPos = DayPosition +1;
                    MinStartPos = DayPosition +1;
                    SecStartPos = DayPosition +1;
                }
                if (HrPosition > 0) {
                    HrValue = Time.slice(HrStartPos, HrPosition);
                    MinStartPos =HrPosition +1;
                    SecStartPos = HrPosition +1;
                }
                if (MinPosition > 0) {
                    MinValue = Time.slice(MinStartPos, MinPosition);
                    SecStartPos = MinPosition +1;
                }
                if (SecPosition > 0) {
                 
                    SecValue = Time.slice(SecStartPos, SecPosition);
                }
                Total = parseInt(DayValue) * 864000000;
                Total += parseInt(HrValue) * 3600000;
                Total += parseInt(MinValue) * 60000;
                Total += parseInt(SecValue * 1000);
                Total = Total / 1000;

                return Total.toFixed(1)
                
            }
            ICxx.GTAC_TimeToSeconds = GTAC_TimeToSeconds;
        })(ICxx = Functions.ICxx || (Functions.ICxx = {}));
        Functions.registerFunctionEx('GTAC_TimeToSeconds', 'TcHmi.Functions.ICxx', ICxx.GTAC_TimeToSeconds);
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);