// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../Packages/Beckhoff.TwinCAT.HMI.Framework.12.758.8/runtimes/native1.12-tchmi/TcHmi.d.ts" />

(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var UC_reference;
        (function (UC_reference) {
               //----------- Function for formatting the x-axis of trend line charts --------
                //----------- Written by Dev @ Beckhoff Canada ----------------
                //----------- Last edited: 20221028 --------------------


            function TrendLineXValue(value) {
                var numDate = new Date(value);
                let formatted_date = numDate.getFullYear() + "/" + ('00' + (numDate.getMonth()+1)).slice(-2) + "/" + ('00' + numDate.getDate()).slice(-2) + " - " + ('00' + numDate.getHours()).slice(-2) + ":" + ('00' + numDate.getMinutes()).slice(-2) + ":" + ('00' + numDate.getSeconds()).slice(-2);
                return formatted_date;
            }
            UC_reference.TrendLineXValue = TrendLineXValue;
        })(UC_reference = Functions.UC_reference || (Functions.UC_reference = {}));
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);
TcHmi.Functions.registerFunctionEx('TrendLineXValue', 'TcHmi.Functions.UC_reference', TcHmi.Functions.UC_reference.TrendLineXValue);
