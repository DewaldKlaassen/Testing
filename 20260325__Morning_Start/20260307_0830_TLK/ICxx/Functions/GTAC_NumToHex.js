// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.754.4/runtimes/native1.12-tchmi/TcHmi.d.ts" />

(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var ICxx;
        (function (ICxx) {
            function GTAC_NumToHex(Value_To_Format) {
                //-----------Function to convert a number input to hex format --------
                //----------- Written by b.lekx-toniolo ----------------
                //----------- Last edited: 20220310 --------------------
                if (Value_To_Format != null) {
                    var temp = "0000" + Value_To_Format.toString(16); //Fill with leading zeros
                    temp = temp.toUpperCase();
                    return "0x" + temp.substr(temp.length - 4); // Remove unrequired front end zeros to achive a final string length of 4
                }
                else {
                    throw new Error("Invalid value given for parameter Value_To_Fomrat (" + Value_To_Format + ")");
                    return null;
                }

            }
            ICxx.GTAC_NumToHex = GTAC_NumToHex;
        })(ICxx = Functions.ICxx || (Functions.ICxx = {}));
        Functions.registerFunctionEx('GTAC_NumToHex', 'TcHmi.Functions.ICxx', ICxx.GTAC_NumToHex);
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);