// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.758.8/runtimes/native1.12-tchmi/TcHmi.d.ts" />

(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var ICxx;
        (function (ICxx) {
            function GTAC_Change_Screen(New_Target, Animation_Type) {

                //--------------------------------------------------------------------------------
                // A simple function to change the main region content (IE Change screens)
                // Also porting animation jquery code to here in future (there were many issues with animations freezing during testing)
                //
                // Author: b.lekx-toniolo
                //
                // Last Edit: 20240611 (added lastscreenopen capture)
                //--------------------------------------------------------------------------------

                //Check if valid animation type is given, if so then setup left, main and right regions for animations
                if (Animation_Type == "Left" || Animation_Type == "Right" || Animation_Type == "Fade"){

                    //Check MainRegion, set if required
                    TcHmi.Symbol.readEx2("%ctrl%MainRegion::TargetContent%/ctrl%", function (data) {
                        if (data.error === TcHmi.Errors.NONE) {
                            var MainRegion_CurrentTarget = data.value;
                            if (MainRegion_CurrentTarget != New_Target) {

                                //Check MainRegion_Left
                                TcHmi.Symbol.readEx2("%ctrl%MainRegion_Left::TargetContent%/ctrl%", function (data) {
                                    if (data.error === TcHmi.Errors.NONE) {
                                        var MainRegionLeft_CurrentTarget = data.value;
                                        if (MainRegionLeft_CurrentTarget != New_Target) {

                                            //Check MainRegion_Right
                                            TcHmi.Symbol.readEx2("%ctrl%MainRegion_Right::TargetContent%/ctrl%", function (data) {
                                                if (data.error === TcHmi.Errors.NONE) {
                                                    var MainRegionRight_CurrentTarget = data.value;
                                                    if (MainRegionRight_CurrentTarget != New_Target) {

                                                        //If all regions are blank, setup areas for animations
                                                        //TODO: Under re-development (blt)
                                                        //TODO: Under re-development (blt)
                                                        //TODO: Under re-development (blt)

                                                    }
                                                } else {
                                                    // Handle error... 
                                                    console.log("GTAC_Change_Screen(), Error checking right region -> " + data.error);

                                                }
                                            });

                                        }
                                    } else {
                                        // Handle error... 
                                        console.log("GTAC_Change_Screen(), Error checking left region-> " + data.error);
                                    }
                                });

                            }
                        } else {
                            // Handle error... 
                            console.log("GTAC_Change_Screen(), Error checking main region-> " + data.error);
                        }
                    });


                //If no animation type was given, then simply do a content replace type "screen change"
                } else {
                   //Capture current Screen to become "Last Screen Open", for use to be able to "return to previous screen"
                    TcHmi.Symbol.writeEx("%i%LastScreenOpen%/i%", TcHmi.Symbol.readEx("%ctrl%MainRegion::TargetContent%/ctrl%"));
                    TcHmi.Symbol.writeEx("%ctrl%MainRegion::TargetContent%/ctrl%", New_Target);

                }


 





            }//End of function

            ICxx.GTAC_Change_Screen = GTAC_Change_Screen;
        })(ICxx = Functions.ICxx || (Functions.ICxx = {}));
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);
TcHmi.Functions.registerFunctionEx('GTAC_Change_Screen', 'TcHmi.Functions.ICxx', TcHmi.Functions.ICxx.GTAC_Change_Screen);
