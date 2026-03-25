// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.758.8/runtimes/native1.12-tchmi/TcHmi.d.ts" />

(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var ICxx;
        (function (ICxx) {
            function GTAC_Add_Flash(object, flash_on_color, flash_off_color, flash_pulse) {
                //-----------------------------------------------------------------------------
                // A simple JS function to add flash functionality to an object (sory no error handlign for bad symbols)
                // Written by: b.lekx-toniolo
                // Last Edit: 20221117
                //-----------------------------------------------------------------------------

                // General function param error handling
                if (!object) throw new Error("Invalid value given for object param: " + object);
               
                //Add pre and post-amble conventions to create conrtol reference
                let Symbol_String = "%ctrl%" + object + "::BackgroundColor%/ctrl%";

                    //If function is called, alternate between flash_on_color and flash_off_color at pulse rate
                    if (flash_pulse == true) {
                        TcHmi.Symbol.writeEx(Symbol_String, flash_on_color);
                    } else {
                        TcHmi.Symbol.writeEx(Symbol_String, flash_off_color);
                    }
            }
            ICxx.GTAC_Add_Flash = GTAC_Add_Flash;
        })(ICxx = Functions.ICxx || (Functions.ICxx = {}));
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);
TcHmi.Functions.registerFunctionEx('GTAC_Add_Flash', 'TcHmi.Functions.ICxx', TcHmi.Functions.ICxx.GTAC_Add_Flash);
