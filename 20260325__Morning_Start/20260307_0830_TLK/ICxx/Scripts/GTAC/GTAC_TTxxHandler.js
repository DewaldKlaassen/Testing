// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.760.59/runtimes/native1.12-tchmi/TcHmi.d.ts" />

//---------------------------------------------------------------------------
// A collection of js functions for working with the TTxxNav_WithFixSwap user control, see description of each function below
// 
//  author: b.lekx-toniolo
//  Last edit: 20250811 - added try / catch blocks per w.griffiths findings in SSCC610 GH Issue #245, b.lekx-toniolo (w.griffiths developed and proofed the updated, we will miss you Wes)
//---------------------------------------------------------------------------



//----------------------------------------------------------------------------------------------
//--------- Function to Multiplex Fixture Data in from Fixture sources based on state of N00s --
//----------------------------------------------------------------------------------------------

async function TTxxFixtureSwap(TT_Target, MaxFixtureCount, In_Simulation){

    //Declare a few vars
    let FixText;
    let ModelID;
    let Status;
    let EnableMotion;
    let BypassAcks;
    let FixOnTTSide;
    let FixtureN00_State;
    let FixtireN00_ID;
    let Side_ID;
    let Fixture;
    let TT_Name = TT_Target.split(".");
   
    //Process Each Side of TT, Side 1 = A and side 2 = B)
    for (let TT_Side = 1; TT_Side <=2; TT_Side++){
        if (TT_Side == 1){
            Side_ID ="A";
        }
        else if (TT_Side == 2){
            Side_ID ="B";
        }
        //Process fixture on current side of TT being processed
        for (Fixture = TT_Side; Fixture <= MaxFixtureCount; Fixture = Fixture + 2) {
            //Assemble Fixture reference    
            let Loop_FixText;
            if (Fixture > 0 && Fixture < 10) {
                Loop_FixText = "Fix0" + Fixture;
            }
            else if (Fixture >= 10 && Fixture < 99){
                Loop_FixText = "Fix" + Fixture;
            }
            //Grab State and ID values from Fixtures N00 (If fixture is "ON TT" these values will be available)
            try{
                FixtureN00_State = await GTAC_ReadPLCVar("%s%PLC1..Out_To_ICxx::" + Loop_FixText +"_Discrete_Image::N00::InfoData::State%/s%");
                FixtureN00_ID = await GTAC_ReadPLCVar("%s%PLC1..Out_To_ICxx::" + Loop_FixText + "_Discrete_Image::N00::ID%/s%");

                }
            catch (err)
            {
                console.log("GTAC: TTxxFixtureSwap() -> Error reading PLC1..Out_To_ICxx::" + Loop_FixText + "_Discrete_Image::N00::ID");

            }            
            

            if ((FixtureN00_State == 8 || In_Simulation) && FixtureN00_ID == Fixture){
                FixOnTTSide = Fixture;
                break;
            }
            else{
                FixOnTTSide = 0;
            }
        }//End of Fixture For Loop
 
        //Write out Data to applicable TT user control Parameter Targets
        // Assemble Fixture reference
        if (FixOnTTSide > 0 && FixOnTTSide < 99) {
            if (FixOnTTSide < 10){
                FixText = "Fix0" + FixOnTTSide;
            }
            else if (FixOnTTSide >= 10){
                FixText = "Fix" + FixOnTTSide;
            }
            //Fixture Text
            TcHmi.Symbol.writeEx("%ctrl%"+TT_Target+"::FixNumber_"+Side_ID+"%/ctrl%", FixText);
            await GTAC_WritePLCVar("%s%"+TT_Name[0]+"_Side"+Side_ID+"_FixName%/s%", FixText);
            //Model Data
            ModelID = await GTAC_ReadPLCVar("%s%PLC1..Out_To_ICxx::" + FixText + "_Discrete_Image::Model_Data%/s%");
            TcHmi.Symbol.writeEx("%ctrl%"+TT_Target+"::ModelID_"+Side_ID+"%/ctrl%", ModelID);
            //Status
            Status = await GTAC_ReadPLCVar("%s%PLC1..Out_To_ICxx::" + FixText + "_Discrete_Image::Status%/s%");
            TcHmi.Symbol.writeEx("%ctrl%"+TT_Target+"::Status_"+Side_ID+"%/ctrl%", Status);
            //Enable Motion
            EnableMotion = await GTAC_ReadPLCVar("%s%PLC1..Out_To_ICxx::" + FixText + "_Discrete_Image::Enable_Motion%/s%");
            TcHmi.Symbol.writeEx("%ctrl%"+TT_Target+"::EnableMotion_"+Side_ID+"%/ctrl%", EnableMotion);
            //Bypass Acks
            BypassAcks = await GTAC_ReadPLCVar("%s%PLC1..Out_To_ICxx::" + FixText + "_Discrete_Image::Bypass_ACKS%/s%");
            TcHmi.Symbol.writeEx("%ctrl%"+TT_Target+"::BypassAcks_"+Side_ID+"%/ctrl%", BypassAcks);
        }
        else{
            //If there is no fixture pair on the TT, blank the data
            //Fixture Text
            TcHmi.Symbol.writeEx("%ctrl%"+TT_Target+"::FixNumber_"+Side_ID+"%/ctrl%", "No Fixture");
            await GTAC_WritePLCVar("%s%"+TT_Name[0]+"_Side"+Side_ID+"_FixName%/s%", "");
            //Model Data
            TcHmi.Symbol.writeEx("%ctrl%"+TT_Target+"::ModelID_"+Side_ID+"%/ctrl%", 0);
            //Status
            TcHmi.Symbol.writeEx("%ctrl%"+TT_Target+"::Status_"+Side_ID+"%/ctrl%", 0);
            //Enable Motion
            TcHmi.Symbol.writeEx("%ctrl%"+TT_Target+"::EnableMotion_"+Side_ID+"%/ctrl%", false);
            //Bypass Acks
            TcHmi.Symbol.writeEx("%ctrl%"+TT_Target+"::BypassAcks_"+Side_ID+"%/ctrl%", 0);
        }//End of Side For Loop

    }//End of Side Loop
}//End of Function

