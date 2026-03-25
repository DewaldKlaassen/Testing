// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.754.4/runtimes/native1.12-tchmi/TcHmi.d.ts" />

(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var ICxx;
        (function (ICxx) {
            function GTAC_Bind(Target_String, Control, Control_Property) {
                //----------------------------------------------------------------
                /*
                        Give me:
                            - a string to a target symbol
                            - a Control Object reference 
                            - the property in the control object
                        and I will bind the symbol to the Control Object -> Property
                */
                //------------------- Written by: b.lekx-toniolo -------------------------------------------
                //------------------- Last Edit: 20220407 --------------------------


                // General function param error handling
                if (!Target_String) throw new Error("Invalid value given for Target_String param: " + Target_String);
                if (!Control) throw new Error("Invalid value given for Control param: " + Control);
                if (!Control_Property) throw new Error("Invalid value given for Control_Property param: " + Control_Property);

                
                //Add pre and post-amble conventions to create symbol string as expected by TcHMI 
                let Symbol_String = "%s%" + Target_String + "%/s%";


                //First check to see if a binding already exists on the control's property
               let binding_exists = TcHmi.Binding.resolveEx(Control_Property, Control);

                //Then, if there is no current binding, create a new binding between the symbol and the control's property
                if (binding_exists == null) {
                    TcHmi.Binding.createEx2(Symbol_String, Control_Property, Control);
                } else {
                    throw new Error("Binding already exists on this Control -> Property with: " +binding_exists);
                }
                    


            }
            ICxx.GTAC_Bind = GTAC_Bind;
        })(ICxx = Functions.ICxx || (Functions.ICxx = {}));
        Functions.registerFunctionEx('GTAC_Bind', 'TcHmi.Functions.ICxx', ICxx.GTAC_Bind);
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);