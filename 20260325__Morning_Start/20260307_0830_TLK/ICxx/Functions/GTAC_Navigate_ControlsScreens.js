// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.754.4/runtimes/native1.12-tchmi/TcHmi.d.ts" />

(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var ICxx;
        (function (ICxx) {
            function GTAC_Navigate_ControlsScreens(Component_Name) {
                //-----------Function to return a path to a controls overview content file from given a SreenNavTarget Value --------
                //----------- Written by b.lekx-toniolo ----------------
                //----------- Last edited: 20221104 --------------------

                //If Component_Name param has not been blanked by upstream then process request
                if (Component_Name != "" && Component_Name != null) {

                    //Write to Internal var (which drives Title on Context Menu)
                    TcHmi.Symbol.writeEx("%i%Component_Name%/i%", Component_Name);

                    //Get Component Type from Name
                    var Component_Type = TcHmi.Functions.ICxx.GTAC_ReturnComponentType(Component_Name);
                        //Write to Internal var
                        TcHmi.Symbol.writeEx("%i%Component_Type%/i%", Component_Type);

                    //Get Component Number from Name and Type
                    var Component_Num = TcHmi.Functions.ICxx.GTAC_ReturnComponentNumber(Component_Name, Component_Type);
                        //Write to Internal var
                        TcHmi.Symbol.writeEx("%i%Component_Num%/i%", Component_Num);

                    //Finally Pass Component Name and Type to content function, return content path
                    return TcHmi.Functions.ICxx.GTAC_ReturnControlsOverviewPath(Component_Name, Component_Type);
                }


                //If Component_Name HAS been blanked by upstream then blank all asscoiated and call up Controls Menu Content
                else {
                    //Blank Title (Component_Name and Component_Num internal vars
                    TcHmi.Symbol.writeEx("%i%Component_Name%/i%", null);
                    TcHmi.Symbol.writeEx("%i%Component_Num%/i%", 0);
                    //Blank Navigation index
                    TcHmi.Symbol.writeEx("%i%ControlsScreenNavNumber%/i%", 0);
                    //Call up Controls menu Content
                    return "Contents/Controls Overview Screens/Controls - Overview_Menu.content";
                }


            }
            ICxx.GTAC_Navigate_ControlsScreens = GTAC_Navigate_ControlsScreens;
        })(ICxx = Functions.ICxx || (Functions.ICxx = {}));
        Functions.registerFunctionEx('GTAC_Navigate_ControlsScreens', 'TcHmi.Functions.ICxx', ICxx.GTAC_Navigate_ControlsScreens);
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);