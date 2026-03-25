// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.752.0/runtimes/native1.12-tchmi/TcHmi.d.ts" />
(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var ICxx;
        (function (ICxx) {
            function GTAC_BoolToVis(Boolean) {

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
            ICxx.GTAC_BoolToVis = GTAC_BoolToVis;
        })(ICxx = Functions.ICxx || (Functions.ICxx = {}));
        Functions.registerFunctionEx('GTAC_BoolToVis', 'TcHmi.Functions.ICxx', ICxx.GTAC_BoolToVis);
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);
