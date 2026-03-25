// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.756.1/runtimes/native1.12-tchmi/TcHmi.d.ts" />

(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var ICxx;
        (function (ICxx) {

            function GTAC_BakeCookie(cName, cAny, PreserveTime) {

                //----------- Create Cookies for Storing configuration code --------
                //----------- This code uses cName to create a named instance in a cookie --------
                //----------- to store the value of cAny --------
                //----------- Written by C.Drees ----------------
                //----------- Last edited: 20220602 --------------------
                const d = new Date();
               
                if (PreserveTime==null) {
                    d.setTime(d.getTime() + (7300 * 86400000));
                } else if (PreserveTime == 0) {
                    d.setTime(d.getTime());
                } else if (PreserveTime > 0) {
                    d.setTime(d.getTime() + (PreserveTime*60000));
                };
                
                
                let expires = "expires=" + d.toUTCString();
                document.cookie = cName + "=" + cAny + ";" + expires + ";path=/";
                console.log("GTAC: Baked cookie: "+cName+" = "+cAny)
            }
            ICxx.GTAC_BakeCookie = GTAC_BakeCookie;
        })(ICxx = Functions.ICxx || (Functions.ICxx = {}));
        Functions.registerFunctionEx('GTAC_BakeCookie', 'TcHmi.Functions.ICxx', ICxx.GTAC_BakeCookie);
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);