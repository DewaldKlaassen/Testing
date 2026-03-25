// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.752.0/runtimes/native1.12-tchmi/TcHmi.d.ts" />
(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var ICxx;
        (function (ICxx) {
            function GTAC_ReturnControlsOverviewPath(Component_Name, Component_Type) {

                //-----------Function to return a path to a controls overview content file from given Component Name --------
                //----------- Written by b.lekx-toniolo ----------------
                //----------- Last Edited: 20250723 (Add in VFD, brent and rich)  --------------------

                switch (Component_Name) {
                    //----- IC contents (called discrete)------
                    case "IC01":
                        return "Contents/Controls Overview Screens/Controls - Overview_IC01.content"
                        break;
                    case "IC02":
                        return "Contents/Controls Overview Screens/Controls - Overview_IC02.content"
                        break;
                    case "IC03":
                        return "Contents/Controls Overview Screens/Controls - Overview_IC03.content"
                        break;
                    case "IC04":
                        return "Contents/Controls Overview Screens/Controls - Overview_IC04.content"
                        break;
                    case "IC05":
                        return "Contents/Controls Overview Screens/Controls - Overview_IC05.content"
                        break;
                    case "IC06":
                        return "Contents/Controls Overview Screens/Controls - Overview_IC06.content"
                        break;
                    case "IC07":
                        return "Contents/Controls Overview Screens/Controls - Overview_IC07.content"
                        break;
                    case "IC08":
                        return "Contents/Controls Overview Screens/Controls - Overview_IC08.content"
                        break;
                    case "Blank":
                        return "Contents/Controls Overview Screens/Controls - Overview_Blank.content"
                        break;
                }
                switch (Component_Type) {
                    //----- Other contents (called generic)------
                    case "ESW":
                        return "Contents/Controls Overview Screens/Controls - Overview_ESWxx.content"
                        break;
                    case "R":
                        return "Contents/Controls Overview Screens/Controls - Overview_Rxx.content"
                        break;
                    case "IS":
                        return "Contents/Controls Overview Screens/Controls - Overview_ISxx.content"
                        break;
                    case "SS":
                        return "Contents/Controls Overview Screens/Controls - Overview_SSxx.content"
                        break;
                    case "SD":
                        return "Contents/Controls Overview Screens/Controls - Overview_SDxx.content"
                        break;
                    case "ST":
                        return "Contents/Controls Overview Screens/Controls - Overview_STxx.content"
                        break;
                    case "SL":
                        return "Contents/Controls Overview Screens/Controls - Overview_SLxx.content"
                        break;
                    case "LSR":
                        return "Contents/Controls Overview Screens/Controls - Overview_LSRxx.content"
                        break;
                    case "MD":
                        return "Contents/Controls Overview Screens/Controls - Overview_MDxx.content"
                        break;
                    case "VFD":
                        return "Contents/Controls Overview Screens/Controls - Overview_VFDxx.content"
                        break;
                    default:
                        return "" //Simply a call to a content that does not exist

                        break;

                }



            }
            ICxx.GTAC_ReturnControlsOverviewPath = GTAC_ReturnControlsOverviewPath;
        })(ICxx = Functions.ICxx || (Functions.ICxx = {}));
        Functions.registerFunctionEx('GTAC_ReturnControlsOverviewPath', 'TcHmi.Functions.ICxx', ICxx.GTAC_ReturnControlsOverviewPath);
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);