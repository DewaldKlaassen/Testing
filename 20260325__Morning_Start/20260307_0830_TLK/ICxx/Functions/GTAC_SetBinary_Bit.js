// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.752.0/runtimes/native1.12-tchmi/TcHmi.d.ts" />
(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var ICxx;
        (function (ICxx) {
            function GTAC_SetBinary_Bit(DInteger, Bit_Required) {

                //-----------Function to Set a bit within a Dint --------
                //----------- Written by c.Drees ----------------
                //----------- Last edited: 20220224 --------------------

                if (DInteger != null && Bit_Required != null) {
                    return DInteger | (1 << Bit_Required);

                }
                else {
                    return "No value for params DInterger or Bit_Required given";
                }


            }
            ICxx.GTAC_SetBinary_Bit = GTAC_SetBinary_Bit;
        })(ICxx = Functions.ICxx || (Functions.ICxx = {}));
        Functions.registerFunctionEx('GTAC_SetBinary_Bit', 'TcHmi.Functions.ICxx', ICxx.GTAC_SetBinary_Bit);
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);
