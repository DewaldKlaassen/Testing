// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.752.0/runtimes/native1.12-tchmi/TcHmi.d.ts" />
(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var ICxx;
        (function (ICxx) {
            function GTAC_ReturnStringLen(String) {

                //-----------Function to return legnth value of given string--------
                //----------- Written by b.lekx-toniolo ----------------
                //----------- Last edited: 20220225 --------------------

                if (String != null) {
                    return String.length;
                }
                else {
                    return null;
                }
            }
            ICxx.GTAC_ReturnStringLen = GTAC_ReturnStringLen;
        })(ICxx = Functions.ICxx || (Functions.ICxx = {}));
        Functions.registerFunctionEx('GTAC_ReturnStringLen', 'TcHmi.Functions.ICxx', ICxx.GTAC_ReturnStringLen);
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);