// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.756.1/runtimes/native1.12-tchmi/TcHmi.d.ts" />

(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var ICxx;
        (function (ICxx) {
            function GTAC_Model_IDUPdater(FixID, ModelID) {
                //----------------------------------------------------------------------------
                //------- Create proper Fix / Model Locale Reference from Fix and Model ID Values
                //--------- written by: c.drees -----------------------------------------------
                //--------- modified by b.lekx-toniolo ---------------------------------------
                //--------- last edit: 20240509 -----------------------------------------------
                //----------------------------------------------------------------------------

                if (FixID != null && ModelID != null) {
                    if (ModelID < 10 && ModelID > 0) {
                        var modelString = FixID + '_Model0' + ModelID;
                    } else if (ModelID >= 10) {
                        var modelString = FixID + '_Model' + ModelID;
                    } else {
                        var modelString = 'NoModel';
                    }
                    return modelString;
                } else {
                    console.log("GTAC_Model_IDUPdater() -> null values given for one or more arguments")
                    return 'NoModel';
                }

            }
            ICxx.GTAC_Model_IDUPdater = GTAC_Model_IDUPdater;
        })(ICxx = Functions.ICxx || (Functions.ICxx = {}));
        Functions.registerFunctionEx('GTAC_Model_IDUPdater', 'TcHmi.Functions.ICxx', ICxx.GTAC_Model_IDUPdater);
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);