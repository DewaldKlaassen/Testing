// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.754.4/runtimes/native1.12-tchmi/TcHmi.d.ts" />

(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var ICxx;
        (function (ICxx) {
            function GTAC_AnyToVis(Boolean) {
                //-----------Convert A Boolean to Visibility Property --------
                //----------- Written by C.Drees ----------------
                //----------- Last edited: 20220217 --------------------

                if (Boolean != null) {


                    if (Boolean == false) {
                        return 'Collapsed';
                    }
                    else if (Boolean == true) {
                        return 'Visible';
                    }
                    else {
                        return null;
                    }

                }
                else {
                    return null;
                }
            }
            ICxx.GTAC_AnyToVis = GTAC_AnyToVis;
        })(ICxx = Functions.ICxx || (Functions.ICxx = {}));
        Functions.registerFunctionEx('GTAC_AnyToVis', 'TcHmi.Functions.ICxx', ICxx.GTAC_AnyToVis);
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);