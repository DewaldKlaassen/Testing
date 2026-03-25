// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.754.4/runtimes/native1.12-tchmi/TcHmi.d.ts" />

(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var ICxx;
        (function (ICxx) {
            function GTAC_ReturnBinary_Value(DInteger, Bit_Required) {
                //-----------Function to return the 0 / 1 VALUE of a bit from a given Dint --------
                //----------- Written by b.lekx-toniolo ---------------------------------------------------
                //----------- Last edited: 20220408 (updated comment, blt)---------------------------------

                if (DInteger != null && Bit_Required != null) {
                    var bit_string = TcHmi.Functions.ICxx.GTAC_BinaryFormat(DInteger, 32);

                    if (bit_string[Bit_Required] == "0") {
                        return 0;
                    }
                    else if (bit_string[Bit_Required] == "1") {
                        return 1;
                    }
                    else {
                        return null;
                    }

                }
                else {
                    return "No value for params DInterger or Bit_Required given";
                }


            }
            ICxx.GTAC_ReturnBinary_Value = GTAC_ReturnBinary_Value;
        })(ICxx = Functions.ICxx || (Functions.ICxx = {}));
        Functions.registerFunctionEx('GTAC_ReturnBinary_Value', 'TcHmi.Functions.ICxx', ICxx.GTAC_ReturnBinary_Value);
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);