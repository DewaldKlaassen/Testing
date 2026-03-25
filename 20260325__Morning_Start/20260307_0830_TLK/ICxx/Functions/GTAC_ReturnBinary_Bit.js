// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.752.0/runtimes/native1.12-tchmi/TcHmi.d.ts" />
(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var ICxx;
        (function (ICxx) {
            function GTAC_ReturnBinary_Bit(DInteger, Bit_Required) {

                //-----------Function to return the True / False status of a bit from a given Dint --------
                //----------- Written by b.lekx-toniolo ---------------------------------------------------
                //----------- Last edited: 20220408 (updated comment, blt)---------------------------------

                if (DInteger != null && Bit_Required != null) {
                    var bit_string = TcHmi.Functions.ICxx.GTAC_BinaryFormat(DInteger, 32);

                    if (bit_string[Bit_Required] == "0") {
                            return false;
                    }
                    else if (bit_string[Bit_Required] == "1") {
                            return true;
                        }
                    else {
                        return null;
                    }

                }
                else {
                    return "No value for params DInterger or Bit_Required given";
                }


            }
            ICxx.GTAC_ReturnBinary_Bit = GTAC_ReturnBinary_Bit;
        })(ICxx = Functions.ICxx || (Functions.ICxx = {}));
        Functions.registerFunctionEx('GTAC_ReturnBinary_Bit', 'TcHmi.Functions.ICxx', ICxx.GTAC_ReturnBinary_Bit);
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);