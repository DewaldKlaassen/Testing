// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.754.4/runtimes/native1.12-tchmi/TcHmi.d.ts" />

(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var ICxx;
        (function (ICxx) {
            function GTAC_ReturnComponentType(Component_Name) {
                //-------------- Parse out and return a GTAC Component Type from given Name
                //-------------- Written by: b.lekx-toniolo -------------------------
                //-------------- Last Edited: 20250723 (add in VFD, brent and rich) ------------------------------

                //General Error handling
                if (!Component_Name) throw new Error("Invalid value given for Component_Name: " + Component_Name);

                //Gather various length parses from Component_Name
                var blank_type = Component_Name;
                var three_char_type = TcHmi.Functions.ICxx.GTAC_StrLeft(Component_Name, 3);
                var two_char_type = TcHmi.Functions.ICxx.GTAC_StrLeft(Component_Name, 2);
                var one_char_type = TcHmi.Functions.ICxx.GTAC_StrLeft(Component_Name, 1);


                //Validate the parses against known GTAC Components

                if (three_char_type == "ESW" || three_char_type == "LSR" || three_char_type == "VFD") {
                    return three_char_type;
                } else if (two_char_type == "IC" || two_char_type == "IS" || two_char_type == "SS" || two_char_type == "SD" || two_char_type == "ST" || two_char_type == "SL" || two_char_type == "MD") {
                    return TcHmi.Functions.ICxx.GTAC_StrLeft(Component_Name, 2);
                } else if (TcHmi.Functions.ICxx.GTAC_StrLeft(Component_Name, 1) == "R") {
                    return TcHmi.Functions.ICxx.GTAC_StrLeft(Component_Name, 1);
                } else if (Component_Name == "Blank") {
                    return Component_Name;
                } else {
                    throw new Error("Component Type failed validation against known GTAC component types");
                    return null;
                }




            }
            ICxx.GTAC_ReturnComponentType = GTAC_ReturnComponentType;
        })(ICxx = Functions.ICxx || (Functions.ICxx = {}));
        Functions.registerFunctionEx('GTAC_ReturnComponentType', 'TcHmi.Functions.ICxx', ICxx.GTAC_ReturnComponentType);
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);