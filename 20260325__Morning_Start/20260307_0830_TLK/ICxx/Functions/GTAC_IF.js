// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.754.4/runtimes/native1.12-tchmi/TcHmi.d.ts" />

(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var ICxx;
        (function (ICxx) {
            function GTAC_IF(Comparison, True_Return, NotTrue_Return) {
                //----------------------------------------------------------------------------
                //------- Take result of Comparison given, return the True / Not True return value
                //-------- based on result of comparison ---------------------------------------
                //---------written by: b.lekx-toniolo ------------------------------------------
                //---------last edit: 20220411 -------------------------------------------------
                //------------------------------------------------------------------------------

                //General parameter error handling
                if (!Comparison) {throw new Error ("Invalid value given for Comparison param: "+Comparison)};
                if (!True_Return) {throw new Error ("Invalid value given for True_Return param: "+True_Return)};
                if (!Comparison) {throw new Error ("Invalid value given for NotTrue_Return param: "+NotTrue_Return)};


                //Determine return
                if (Comparison) {
                    return True_Return;
                } else {
                    return NotTrue_Return;
                }


            }
            ICxx.GTAC_IF = GTAC_IF;
        })(ICxx = Functions.ICxx || (Functions.ICxx = {}));
        Functions.registerFunctionEx('GTAC_IF', 'TcHmi.Functions.ICxx', ICxx.GTAC_IF);
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);