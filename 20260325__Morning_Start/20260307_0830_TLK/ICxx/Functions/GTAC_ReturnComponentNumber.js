// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.754.4/runtimes/native1.12-tchmi/TcHmi.d.ts" />

(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var ICxx;
        (function (ICxx) {
            function GTAC_ReturnComponentNumber(Component_Name, Component_Type) {
                //-------------- Parse out and return a GTAC Component Type from given Name
                //-------------- Written by: b.lekx-toniolo -------------------------
                //-------------- Last Edited: 20250723 (add in VFD, brent and rich) ------------------------------

                switch (Component_Type) {
                    case "IC":
                        return TcHmi.Functions.ICxx.GTAC_StrRight(Component_Name, 1);
                    case "IS":
                        return TcHmi.Functions.ICxx.GTAC_StrRight(Component_Name, 1);
                    case "SS":
                        return TcHmi.Functions.ICxx.GTAC_StrRight(Component_Name, 1);
                    case "ESW":
                        return TcHmi.Functions.ICxx.GTAC_StrRight(Component_Name, 1);
                    case "ST":
                        return TcHmi.Functions.ICxx.GTAC_StrRight(Component_Name, 1);
                    case "SL":
                        return TcHmi.Functions.ICxx.GTAC_StrRight(Component_Name, 1);
                    case "LSR":
                        return TcHmi.Functions.ICxx.GTAC_StrRight(Component_Name, 1);
                    case "MD":
                        return TcHmi.Functions.ICxx.GTAC_StrRight(Component_Name, 1);
                    case "VFD":
                        return TcHmi.Functions.ICxx.GTAC_StrRight(Component_Name, 1);

                    case "R":
                        if (Component_Name.length == 2) {
                            return TcHmi.Functions.ICxx.GTAC_StrRight(Component_Name, 1);
                        } else if (Component_Name.length == 3) {
                            return TcHmi.Functions.ICxx.GTAC_StrRight(Component_Name, 2);
                        }
                    case "SD":
                        if (Component_Name.length == 3) {
                            return TcHmi.Functions.ICxx.GTAC_StrRight(Component_Name, 1);
                        } else if (Component_name.length == 4) {
                            return TcHmi.Functions.ICxx.GTAC_StrRight(Component_Name, 2);
                        }
                }

 
            }
            ICxx.GTAC_ReturnComponentNumber = GTAC_ReturnComponentNumber;
        })(ICxx = Functions.ICxx || (Functions.ICxx = {}));
        Functions.registerFunctionEx('GTAC_ReturnComponentNumber', 'TcHmi.Functions.ICxx', ICxx.GTAC_ReturnComponentNumber);
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);