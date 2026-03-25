// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.756.1/runtimes/native1.12-tchmi/TcHmi.d.ts" />

(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var ICxx;
        (function (ICxx) {
            function GTAC_EatCookie(cName, silence_console) {

                //----------- Reads in the Cookies to return the value stored --------
                //----------- This code uses cName to find the named instance in a cookie --------
                //----------- and returns a string value of the cookie's contents --------
                //----------- Written by C.Drees ----------------
                //----------- Last edited: 20250303 (add in console silencing), b.lekx-toniolo --------------------

                let name = cName + "=";
                let decodedCookie = decodeURIComponent(document.cookie);
                let ca = decodedCookie.split(';');
                for (let i = 0; i < ca.length; i++) {
                    let c = ca[i];
                    while (c.charAt(0) == ' ') {
                        c = c.substring(1);
                    }
                    if (c.indexOf(name) == 0) {

                        if (silence_console != true) {
                            console.log("GTAC_EatCookie() -> Found cookie: " + c.substring(name.length, c.length));
                        }
                        return c.substring(name.length, c.length);
                    }
                }

                if (silence_console != true) {
                    console.log("GTAC_EatCookie() -> Cookie not found, go bake please: " + cName);
                }
                return "GTAC: Cookie Not Found go bake more.";
            }
            ICxx.GTAC_EatCookie = GTAC_EatCookie;
        })(ICxx = Functions.ICxx || (Functions.ICxx = {}));
        Functions.registerFunctionEx('GTAC_EatCookie', 'TcHmi.Functions.ICxx', ICxx.GTAC_EatCookie);
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);