// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.754.4/runtimes/native1.12-tchmi/TcHmi.d.ts" />

(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var ICxx;
        (function (ICxx) {
            function GTAC_Timeto(TimeValue, TimeUnit) {
                let DayPosition = TimeValue.lastIndexOf("D")
                let HrPosition = TimeValue.lastIndexOf("H")
                let MinPosition = TimeValue.lastIndexOf("M");
                let SecPosition = TimeValue.lastIndexOf("S");
                var DayStartPos = 1;
                var HrStartPos = 2;
                var MinStartPos = 2;
                var SecStartPos = 2;
                var DayValue = 0;
                var HrValue = 0;
                var MinValue = 0;
                var SecValue = 0;
                var Total = 0;


                if (DayPosition > 0) {
                    DayValue = TimeValue.slice(DayStartPos, DayPosition);
                    HrStartPos = DayPosition + 2;
                    MinStartPos = DayPosition + 2;
                    SecStartPos = DayPosition + 2;
                }
                
                if (HrPosition > 0) {
                    HrValue = TimeValue.slice(HrStartPos, HrPosition);
                    MinStartPos = HrPosition + 1;
                    SecStartPos = HrPosition + 1;
                }
                if (MinPosition > 0) {
                    MinValue = TimeValue.slice(MinStartPos, MinPosition);
                    SecStartPos = MinPosition + 1;
                }
                if (SecPosition > 0) {

                    SecValue = TimeValue.slice(SecStartPos, SecPosition);
                }
                if (TimeUnit == "D") {

                    Total = parseInt(DayValue);
                    Total += parseInt(HrValue) / 24;
                    Total += parseInt(MinValue) / 1440;
                    Total += parseInt(SecValue / 86400);
                    return Total
                } else if (TimeUnit == "h") {
                    Total = parseInt(DayValue) * 24;
                    Total += parseInt(HrValue) ;
                    Total += parseInt(MinValue) /60;
                    Total += parseInt(SecValue) / 3600;
                    return Total 
                } else if (TimeUnit == "M") {
                    Total = parseInt(DayValue) * 1440;
                    Total += parseInt(HrValue) * 60;
                    Total += parseInt(MinValue) ;
                    Total += parseInt(SecValue / 60);
                    return Total
                } else if (TimeUnit == "s") {
                    Total = parseInt(DayValue) * 864000000;
                    Total += parseInt(HrValue) * 3600000;
                    Total += parseInt(MinValue) * 60000;
                    Total += parseInt(SecValue * 1000);
                    return Total / 1000
                } else if (TimeUnit == "ms") {
                    Total = parseInt(DayValue) * 864000000;
                    Total += parseInt(HrValue) * 3600000;
                    Total += parseInt(MinValue) * 60000;
                    Total += parseInt(SecValue * 1000);
                    return Total 
                }

            }
            ICxx.GTAC_Timeto = GTAC_Timeto;
        })(ICxx = Functions.ICxx || (Functions.ICxx = {}));
        Functions.registerFunctionEx('GTAC_Timeto', 'TcHmi.Functions.ICxx', ICxx.GTAC_Timeto);
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);