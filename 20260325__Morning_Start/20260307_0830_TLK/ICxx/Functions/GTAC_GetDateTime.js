// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.754.4/runtimes/native1.12-tchmi/TcHmi.d.ts" />

(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var ICxx;
        (function (ICxx) {
            function GTAC_GetDateTime(ReturnType) {//This is Code

                //-----------Function return Date, Time or Julian Date --------
                //----------- Written by C.Drees  ----------------
                //----------- Last edited: 20220324 --------------------
                var d = new Date();  //Creates a full Date to be used within the code
                var Year = d.getFullYear();  //Separates the full year out of the Date datatype (20xx)
                var Month = d.getMonth() +1; //Separates the month from the Date datatype (0-11, so 1 must be added)
                var Day = d.getDate(); //Separates the day of the month from the date Datatype
                var Dates = ''; //Initializes the string Variable to be returned "DD/MM/YYYY"
                var Hour = d.getHours(); //Separates the Hour from the Date Datatype
                var Minutes = d.getMinutes(); //Separates the Minutes from the Date DataType
                var Seconds = d.getSeconds(); //Separates the Seconds from the Date DataType
                var HourString = ''; //Hourstring is used for concatenating a '0' if less than 10 Hours
                var MinutesString = ''; //Hourstring is used for concatenating a '0' if less than 10 Hours
                var SecondsString = ''; //Hourstring is used for concatenating a '0' if less than 10 Hours
                var Time = ''; //Initialzes the String Variable to be retruned "HH:MM:SS"
                var JDate = ''; //Initialzes the String Variable to be returned as a Julian Date

                //Checks Month and day Strings if less than 10, if so then concatenate a 0 on the beginning
                    if (Month < 10) {
                        MonthString = '0' + Month;
                    } else {
                      MonthString = Month;
                    }
                    if (Day < 10) {
                        DayString = '0' + Day;
                    } else {
                        DayString = Day;
                    }
                    
                //Checks Hour, Minute and Second Strings if less than 10, if so then concatenate a 0 on the beginning
                    if (Hour < 10) {
                       HourString = '0' + Hour;
                    } else {
                        HourString = Hour;
                    }
                    if (Minutes < 10) {
                        MinutesString = '0' + Minutes;
                    } else {
                        MinutesString = Minutes;
                    }
                    if (Seconds < 10) {
                        SecondsString = '0' + Seconds;
                    } else {
                        SecondsString = Seconds;
                    }

                //Concatenates all strings together
                Dates = DayString + "/" + MonthString + "/" + Year;
                Time = HourString + ":" + MinutesString + ":" + SecondsString;
                JDate = (Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) - Date.UTC(d.getFullYear(), 0, 0)) / 24 / 60 / 60 / 1000;
            

                //Returns the type of data passed into the function
                if (ReturnType == 'D') {
                    return Dates;
                } else if (ReturnType == 'T') {
                    return Time;
                }else if (ReturnType == 'J') {
                    return JDate;
                }
            }
            ICxx.GTAC_GetDateTime = GTAC_GetDateTime;
        })(ICxx = Functions.ICxx || (Functions.ICxx = {}));
        Functions.registerFunctionEx('GTAC_GetDateTime', 'TcHmi.Functions.ICxx', ICxx.GTAC_GetDateTime);
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);