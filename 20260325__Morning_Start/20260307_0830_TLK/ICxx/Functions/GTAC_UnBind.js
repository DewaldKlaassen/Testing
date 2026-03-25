// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.754.4/runtimes/native1.12-tchmi/TcHmi.d.ts" />

(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var ICxx;
        (function (ICxx) {
            function GTAC_UnBind(Control, Control_Property) {
                //----------------------------------------------------------------
                /*
                        Give me:
                            - a Control Object reference 
                            - the property in the control object
                        and I will UNbind the symbol to the Control Object -> Property
                */
                //------------------- Written by: C.Drees -------------------------------------------
                //------------------- Last Edit: 20220419 --------------------------


                // General function param error handling
                if (!Control) throw new Error("Invalid value given for Control param: " + Control);
                if (!Control_Property) throw new Error("Invalid value given for Control_Property param: " + Control_Property);


                //First check to see if a binding already exists on the control's property
                let binding_exists = TcHmi.Binding.resolveEx(Control_Property, Control);

                //Then, if there is no current binding, create a new binding between the symbol and the control's property
                if (binding_exists == null) {
                    throw new Error("Binding Does Not Exist, why are you unbinding me?");
                } else {
                    TcHmi.Binding.removeEx2(null, Control_Property, Control); 
                }
            }
            ICxx.GTAC_UnBind = GTAC_UnBind;
        })(ICxx = Functions.ICxx || (Functions.ICxx = {}));
        Functions.registerFunctionEx('GTAC_UnBind', 'TcHmi.Functions.ICxx', ICxx.GTAC_UnBind);
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);