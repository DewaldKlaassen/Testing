// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.754.4/runtimes/native1.12-tchmi/TcHmi.d.ts" />

(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var ICxx;
        (function (ICxx) {

            function GTAC_GetSymValue(ctx, Target_String, Bit, SymbolType) {
                //------------------- Give me a string (can be mulitple parts) ------------------------------
                //------------------- and I will fetch you the value of the symbol referenced by the string ---------
                //------------------- Written by: b.lekx-toniolo -------------------------------------------
                //------------------- Modified by: b.lekx-toniolo
                //-------------------  -Added more information into ctx.error responses for better diagnostics
                //------------------- Last Edit: 15-06-2022 --------------------------
         

                // General function param error handling
                if (!Target_String) throw new Error("Invalid value given for Target_String param: " + Target_String);

                if (!SymbolType) {
                    //Create Default symbol Type
                    SymbolType = "s";
                }
                
                //Add pre and post-amble conventions to create symbol string 
                let Symbol_String = "%"+SymbolType+"%" + Target_String + "%/"+SymbolType+"%";

                //Read in Symbol using readex2
                //callback function (to evaluate return object) created inline (called an anonymous function in JS)    
                TcHmi.Symbol.readEx2(Symbol_String, function (result_object) {

                    if (result_object.error === TcHmi.Errors.NONE) {
                        if (result_object.value != null) {
                            //If bit value is required from the symbol value, handle
                            if (Bit != null && Bit >= 0) {
                                let binary_value = TcHmi.Functions.ICxx.GTAC_ReturnBinary_Value(result_object.value, Bit)
                                return void ctx.success(binary_value);          //Pass symbol's requested Bit value back via the context object **
                            } else {
                                return void ctx.success(result_object.value);   //Pass symbol value back via the context object **
                            }
                        } else {
                            ctx.error(result_object.error, {
                                code: result_object.error,
                                message: TcHmi.Errors[result_object.error],
                                reason: "GTAC_GetSymValue, Brent says -> result_object.value returned as null!! " + Symbol_String,
                                domain: "Function"
                            })
                        }
                    } else {
                        ctx.error(result_object.error, {                 //** Otherwise pass back the error via the context object
                            code: result_object.error,
                            message: TcHmi.Errors[result_object.error],
                            reason: "GTAC_GetSymValue, Brent says -> symbol read error: " + result_object.error + " trying to read: " + Symbol_String,
                            domain: "Function"
                        })
                    }

                }); //End of readEx2
            } //Cest Fini!



                
            
            ICxx.GTAC_GetSymValue = GTAC_GetSymValue;
        })(ICxx = Functions.ICxx || (Functions.ICxx = {}));
        Functions.registerFunctionEx('GTAC_GetSymValue', 'TcHmi.Functions.ICxx', ICxx.GTAC_GetSymValue);
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);