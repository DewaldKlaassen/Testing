// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.752.0/runtimes/native1.12-tchmi/TcHmi.d.ts" />
(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var ICxx;
        (function (ICxx) {
            function GTAC_GetBinary_Bit(Dint, Bit_Required) {

                //-----------Function to return the value of a required bit from any number --------
                //----------- Written by b.lekx-toniolo ----------------
                //------------ BTW don't touch this file, it's perfect the way it is lol -------
                //------------ Fine, I'll make my own file, with blackjack and hookers: Chris--------
                //----------- Last edited: 20220719 --------------------

                if (Dint != null && Bit_Required != null) {
                    return ((Dint & (1 << Bit_Required)) == 0 ? false : true);

                }
                else {
                    return "No value for params DInterger or Bit_Required given";
                }


            }
            ICxx.GTAC_GetBinary_Bit = GTAC_GetBinary_Bit;
        })(ICxx = Functions.ICxx || (Functions.ICxx = {}));
        Functions.registerFunctionEx('GTAC_GetBinary_Bit', 'TcHmi.Functions.ICxx', ICxx.GTAC_GetBinary_Bit);
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);
