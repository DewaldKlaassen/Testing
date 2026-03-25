// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.752.0/runtimes/native1.12-tchmi/TcHmi.d.ts" />
(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var ICxx;
        (function (ICxx) {
            function GTAC_ClearBinary_Bit(DInteger, Bit_Required) {

                //-----------Function to Clear a bit within a Dint --------
                //----------- Written by C.Drees --------------
                //----------- Last edited: 20220224 --------------------

                if (DInteger != null && Bit_Required != null) {
                    const mask = ~(1 << Bit_Required);
                    return DInteger & mask;
                }
                


            }
            ICxx.GTAC_ClearBinary_Bit = GTAC_ClearBinary_Bit;
        })(ICxx = Functions.ICxx || (Functions.ICxx = {}));
        Functions.registerFunctionEx('GTAC_ClearBinary_Bit', 'TcHmi.Functions.ICxx', ICxx.GTAC_ClearBinary_Bit);
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);
