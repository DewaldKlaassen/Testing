// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.754.4/runtimes/native1.12-tchmi/TcHmi.d.ts" />

(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var ICxx;
        (function (ICxx) {
            function GTAC_StringToReal(String_To_Convert) {
                //--------------------------------------------------------------------------
                //------ A Function to take a String and return the Real (Float) value -----
                //------ Written by: b.lekx-toniolo ----------------------------------------
                //------Last Edit: 20220409 ------------------------------------------------
                
                //General parameter error checking
                if (!String_To_Convert) throw new Error ("Invalid value given for String_To_Convert param: "+String_To_Convert)

                //return Real (Float) value of the string param
                return parseFloat(String_To_Convert);


            }
            ICxx.GTAC_StringToReal = GTAC_StringToReal;
        })(ICxx = Functions.ICxx || (Functions.ICxx = {}));
        Functions.registerFunctionEx('GTAC_StringToReal', 'TcHmi.Functions.ICxx', ICxx.GTAC_StringToReal);
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);