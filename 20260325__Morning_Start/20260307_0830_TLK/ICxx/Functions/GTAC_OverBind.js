// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.754.4/runtimes/native1.12-tchmi/TcHmi.d.ts" />

(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var ICxx;
        (function (ICxx) {
            function GTAC_OverBind(Target_String, Control, Control_Property, VariableType) {

                //----------------------------------------------------------------
                /*
                        Give me:
                            - a string to a target symbol
                            - a Control Object reference 
                            - the property in the control object
                        and I will bind the symbol to the Control Object -> Property
                */
                //------------------- Originally Written as GTAC_Bind by: b.lekx-toniolo -------------------------------------------
                //------------------- Modified by Chris Drees to unbind and rebind the control--------------------------------
                //------------------- Last Edit: 20220509 --------------------------


                // General function param error handling
                if (!Target_String) throw new Error("Invalid value given for Target_String param: " + Target_String);
                if (!Control) throw new Error("Invalid value given for Control param: " + Control);
                if (!Control_Property) throw new Error("Invalid value given for Control_Property param: " + Control_Property);


                //Add pre and post-amble conventions to create symbol string as expected by TcHMI 
                //if (VariableType =="p"){
                //    VariableType ="pp";
                //}
                
                let Symbol_String = "%"+VariableType+"%" + Target_String + "%/"+VariableType+"%";
                //First check to see if a binding already exists on the control's property
                let binding_exists = TcHmi.Binding.resolveEx(Control_Property, Control);
                console.log("SymbolString:" + Symbol_String);
                console.log("ControlProperty:" + Control_Property);
                
                //Then, if there is no current binding, create a new binding between the symbol and the control's property
                if (binding_exists == null) {
                    TcHmi.Binding.createEx2(Symbol_String, Control_Property, Control);
                } else {
                    TcHmi.Binding.removeEx2(null, Control_Property, Control);
                    TcHmi.Binding.createEx2(Symbol_String, Control_Property, Control);
                }
                //Then, if there is no current binding, create a new binding between the symbol and the control's property




            }
            ICxx.GTAC_OverBind = GTAC_OverBind;
        })(ICxx = Functions.ICxx || (Functions.ICxx = {}));
        Functions.registerFunctionEx('GTAC_OverBind', 'TcHmi.Functions.ICxx', ICxx.GTAC_OverBind);
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);