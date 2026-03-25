// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.758.8/runtimes/native1.12-tchmi/TcHmi.d.ts" />


//---------------------------------------------------------------------------
// A collection of misc js functions, see description of each
//---------------------------------------------------------------------------



//--------------------------------------------------------------------------------
// A simple function to automatically logon user: eng if we're under construction upon boot (see global onInit)
// Author: b.lekx-toniolo
// Last Edit: yyyymmdd - note
//--------------------------------------------------------------------------------
function auto_eng_logon(under_construction) {
     //^^^ Announce code execution
    console.log("GTAC: auto_eng_logon() -> Checking log on directives....");
    //^^^ Lougout any current users (in case left over from last boot)
    //TcHmi.Server.logoutEx2(false);


    //*** If Under Construction, change Autologout time on Eng account, then log in as Eng
    if (under_construction == true) {
       
 
        //$$$ Login as SysAdmin to adjust Eng user autoLogout Time
        TcHmi.Server.loginEx2('__SystemAdministrator', 'camp1234', false, false, { timeout: 2000 }, function (data) {
            if (data.error === TcHmi.Errors.NONE) {
                console.log("GTAC: auto_eng_logon() -> Machine is Under Construction, Adjusting autoLogout time on Eng account.....");

                //--- Extend autoLogout from default 2mins to 2hours
                TcHmi.Server.UserManagement.updateUser(
                    'Eng',
                    {
                        autoLogout: 'PT2H'
                    },
                     function (data) {
                         if (data.error === TcHmi.Errors.NONE) {
                             console.log("GTAC: auto_eng_logon() -> Changed Eng user Auto logout time to PT2H....");
                             //--- Eng Login 
                             TcHmi.Server.loginEx2('Eng', 'gotocamp', false, false);
                             console.log("GTAC: auto_eng_logon() -> Logged on Eng user because we're under_construction!");

                         } else {
                             console.log("GTAC: auto_eng_logon() -> Couldn't change autoLogon: " + data.error);
                             TcHmi.Server.logoutEx2(false);
                         }
                     }
                    );
               

            //$$$ Error handing of SysAdmin login
            } else {
                console.log("GTAC: auto_eng_logon() ->  Couldn't login as SysAdmin: " + data.error);
            }

        });//End of SysAdmin Login

       

    //*** Otherwise...system will login as the default user (Guest)
    } else {
        console.log("GTAC: auto_eng_logon() -> Logged on " + TcHmi.Server.getCurrentUser() + " user because we're NOT under_construction!");

    }
}//End of Function


//--------------------------------------------------------------------------------
// A simple function to take a string representing a real, parse to a fixed decimal length and return as string
// Author: c.drees
// Last Edit: yyyymmdd - note
//--------------------------------------------------------------------------------
function string_parsey(data_to_parse, decimal_count) {

    let temp = parseFloat(data_to_parse);
    temp = temp.toFixed(decimal_count);
    return temp.toString();

}//End of Function



//--------------------------------------------------------------------------------
// A simple function to check for which view to load upon init
// Author: b.lekx-toniolo & w.griffiths
// Last Edit: 20250129 - init concept
//--------------------------------------------------------------------------------

async function LoadView() {
    console.log("GTAC: LoadView() -> Deteremining which view to load.....");
    try {
        window.screenDetails = await window.getScreenDetails();
        if(window.screenDetails.screens.length <= 1){
            console.log("LoadView() -> Only one screen detected, will simply load Desktop.view on IPC only");
            TcHmi.View.load("Desktop.view");
            return;
        }
        else{
            //Capture the url string, parse the view parameter and see if there is a "Secondary" view request
            const urlParams = new URLSearchParams(window.location.search);
            const viewParam = urlParams.get("view")
            //Loading Standard Desktop.view
            if (viewParam == "Secondary"){
                console.log("LoadView() -> Secondary viewParam detected, will load Secondary.view");
                TcHmi.View.load("Secondary.view");
            }
            else{
                console.log("LoadView() -> No viewParam detected, will load Desktop.view");
                TcHmi.View.load("Desktop.view");
            }

        }
    } 
    catch(err) {
        console.log("LoadView() -> Could not capture getScreenDetails: "+err.message);
        console.log("LoadView() -> Screen Details Unavailable, will simply load Desktop.view");
        TcHmi.View.load("Desktop.view");
    }
}
//--------------------------------------------------------------------------------
// A simple function to check for a secondary screen and launch a secondary view on it
// Author: b.lekx-toniolo & w.griffiths
// Last Edit: 20250129 - init concept
//--------------------------------------------------------------------------------

async function LaunchSecondaryView(setwidth,setheight ) {
    console.log("GTAC: LaunchSecondaryView() -> Attempting to Launch Secondary View if possible");
    try {
        //Get Screen Details if possible
        window.screenDetails = await window.getScreenDetails();
        //Check if the screen list array holds more then a single screen data set
        if(window.screenDetails.screens.length <= 1){
            console.log("LaunchSecondaryView() -> Only one screen detected, is the second screen hooked up and powered on??");
            return;}
        else{
            console.log("LaunchSecondaryView() -> Mulitple screens detected, launching second browser to other screen....");
            //Grab reference to a screen that is not the current screen
            const otherscreenref = window.screenDetails.screens.find(screens=>screens!=window.screenDetails.currentScreen);
            const width = setwidth;
            const height = setheight;
            const left = otherscreenref.availLeft;
            const top = otherscreenref.availTop;
            const features = `left=${left},top=${top},width=${width},height=${height}`;
            window.open("https://127.0.0.1:1020?view=Secondary", "_blank", features);
            console.log("LaunchSecondaryView() -> Launch location (use for custom .bat launcher), left = "+left+" top = "+top);
            //Disable the TV Icon to prevent end user from spamming the button
            TcHmi.Symbol.writeEx("%ctrl%TcHmiImage__TV_Icon::Visibility%/ctrl%", "Collapsed");
        }
    } catch(err) {console.log("LaunchSecondView() -> Could not capture getScreenDetails: "+err.message);}
  
    
}


//--------------------------------------------------------------------------------
//Function to Populate Secondary Screen content based on either static Fixture ID or Turntable Position + Installed Fixture ID
// Author: w.griffiths (originally created on Audi)
// Last edit: 20250213, some modifications for genericy when brought from Audi to FW, b.lekx-toniolo
//--------------------------------------------------------------------------------

async function PopulateSecondaryScreen(TT_Type_View, Fix_OR_TT_Name) {
    console.log("GTAC: PopulateSecondaryScreen() -> Figuring out which content to load onto the Secondary View");
  
    let SecondaryScreenContentPath = null;
    let SecondaryTitleText = null;
    let OP10_FixName = null;
    let OP20_FixName = null;

    //Transfer Main server Locale to the secondary environment
    let SecondaryLocale = await GTAC_ReadPLCVar("%s%SecondaryLocale%/s%");
    console.log("GTAC: PopulateSecondaryScreen() -> Setting Locale to "+SecondaryLocale);
    TcHmi.Functions.Beckhoff.SetLocale(SecondaryLocale);

    //If TurnTable Type View is selected then we'll capture which fixture is out at the operator
    if (TT_Type_View) {
        //Issues reading in the Side, and FixID values 
        let Side = await GTAC_ReadPLCVar("%s%PLC1..Out_To_ICxx::"+Fix_OR_TT_Name+"_Location_Index%/s%");
        //Build content path
        if (Side===2) {
            //Get Fixture ID of Fixture currently on TT Side B
            OP10_FixName = await GTAC_ReadPLCVar("%s%"+Fix_OR_TT_Name+"_SideA_FixName%/s%");
            SecondaryScreenContentPath = "Contents/Human Fixture Screens/"+ OP10_FixName +"/"+ OP10_FixName +" - Sensors_1.content"
            SecondaryTitleText = Fix_OR_TT_Name+"."+OP10_FixName;
        } else if (Side===1) {
            //Get Fixture ID of Fixture currently on TT Side B
            OP20_FixName = await GTAC_ReadPLCVar("%s%"+Fix_OR_TT_Name+"_SideB_FixName%/s%");
            SecondaryScreenContentPath = "Contents/Human Fixture Screens/"+ OP20_FixName +"/"+ OP20_FixName +" - Sensors_1.content"
            SecondaryTitleText = Fix_OR_TT_Name+"."+OP20_FixName;
        } else {
            SecondaryScreenContentPath = null;
        }
    } else{
        //If not TT Type, then simply build content path from static Fixture given
        SecondaryScreenContentPath = "Contents/Human Fixture Screens/"+ Fix_OR_TT_Name +"/"+ Fix_OR_TT_Name +" - Sensors_1.content"
        SecondaryTitleText = Fix_OR_TT_Name;

    }



    // Finally, write the content Path to content region
    if (SecondaryScreenContentPath != null && ((OP10_FixName !="" && OP20_FixName !="") || TT_Type_View != true)) {
        if (TcHmi.Symbol.readEx("%ctrl%SecondaryViewContent::TargetContent%/ctrl%") != SecondaryScreenContentPath){
            console.log("PopulateSecondaryScreen() -> Loading: " +SecondaryScreenContentPath);
            TcHmi.Symbol.writeEx("%ctrl%SecondaryViewContent::TargetContent%/ctrl%", SecondaryScreenContentPath)
            TcHmi.Symbol.writeEx("%ctrl%SecondaryViewText::Text%/ctrl%", SecondaryTitleText);
        }else{
            console.log("PopulateSecondaryScreen() -> Proper content already loaded, I'll relax...");
        }

    } else {
        console.log("PopulateSecondaryScreen() -> Content Path null");
        TcHmi.Symbol.writeEx("%ctrl%SecondaryViewContent::TargetContent%/ctrl%", null);
        TcHmi.Symbol.writeEx("%ctrl%SecondaryViewText::Text%/ctrl%", TcHmi.Symbol.readEx("%l%SecTitle_LoadingContent%/l%"));
    }
  

};//end of function
