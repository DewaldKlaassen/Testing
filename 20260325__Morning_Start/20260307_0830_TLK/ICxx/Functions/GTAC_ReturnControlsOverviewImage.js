// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.752.0/runtimes/native1.12-tchmi/TcHmi.d.ts" />
(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var ICxx;
        (function (ICxx) {
            function GTAC_ReturnControlsOverviewImage(Component_Type) {

                //-----------Function to return a path to a controls overview image file from given Component Name --------
                //----------- Written by b.lekx-toniolo ----------------
                //----------- Last Edited: 20250723 (Add in VFD, brent and rich)  --------------------

                switch (Component_Type) {
                    //----- IC contents (called discrete)------
                    case "IC":
                        return "Images/GTAC/Components/ico_icxx_cntl.bmp"
                        break;
                    case "ESW":
                        return "Images/GTAC/Components/ESWxx.png"
                        break;
                    case "R":
                        return "Images/GTAC/Components/ico_rxx_cntl.png"
                        break;
                    case "IS":
                        return "Images/GTAC/Components/ico_isxx_cntl.bmp"
                        break;
                    case "SS":
                        return "Images/GTAC/Components/ico_ssxx.bmp"
                        break;
                    case "SD":
                        return "Images/GTAC/Components/ico_sdxx.bmp"
                        break;
                    case "ST":
                        return "Images/GTAC/Components/Tucker Stud Welder.png"
                        break;
                    case "SL":
                        return "Images/GTAC/Components/Graco EFLO-IQ2.png"//ico_slxx_cntl.png"
                        break;
                    case "LSR":
                        return "Images/GTAC/Components/ico_lsrxx_cntl.png"
                        break;
                    case "MD":
                        return "Images/GTAC/Components/ico_mdxx_cntl.png"
                        break;
                    case "VFD":
                        return "Images/GTAC/Components/ico_vfdxx.png"
                        break;
                    default:
                        return "Images/GTAC/Components/null_component.bmp" //Default return

                        break;

                }


            }
            ICxx.GTAC_ReturnControlsOverviewImage = GTAC_ReturnControlsOverviewImage;
        })(ICxx = Functions.ICxx || (Functions.ICxx = {}));
        Functions.registerFunctionEx('GTAC_ReturnControlsOverviewImage', 'TcHmi.Functions.ICxx', ICxx.GTAC_ReturnControlsOverviewImage);
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);
