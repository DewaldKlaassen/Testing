// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.756.1/runtimes/native1.12-tchmi/TcHmi.d.ts" />


//---------------------------------------------------------------------------
// A js function set to perform the following:
// (called on cyclical basis on Pulse_500ms event in TwinCAT HMI Configuration -> Global Events)
//
//  - Gather and process PLC application fault information
//  - Display / sort fault views on UI
//  - Log fault events to DB for history use (IC01 only)
//
//  author: b.lekx-toniolo
//  Last edit: March 03 2025 (add in BG vs Text color and Text Size configs), b.lekx-toniolo / w.griffiths
//---------------------------------------------------------------------------


function Update_FaultInfo(disable_history_log) {
     
    //Reference to html host object (current fault screen)
    const fault_displayer_container = document.getElementById("fault_displayer_container");
 
    //Capture current Date and Time
    const eventDateTime = new Date();
    //Capture current user logged in
    const eventUser = TcHmi.Server.getCurrentUser();
    //Capture current language
    const current_lang_code = TcHmi.Locale.get();

    //Background vs text coloring
    let bg_color, text_color;
    let text_on_bg_cookie = TcHmi.Functions.ICxx.GTAC_EatCookie("alarm_textvsbg", silence_console = true);

    if (text_on_bg_cookie == "black_on_red") {
        text_color = "black";
        bg_color = "red";
    } else if (text_on_bg_cookie == "red_on_black") {
        text_color = "red";
        bg_color = "black";
    }else{
        text_color = "red";
        bg_color = "black";
    }
    //Text Size
    let text_size;
    let text_size_cookie = TcHmi.Functions.ICxx.GTAC_EatCookie("alarm_text_size", silence_console = true);
    if(text_size_cookie >= 12 && text_size_cookie <=16){
        text_size = text_size_cookie.toString()+"px";
    }else{
        text_size = "12px";
    }


    //Create some vars
    let system_fault_image = [];
    let SQL_Query, DB_Read_Response, SQL_Insert, DB_Write_Response;
    let new_fault_row, new_fault_datetime, new_fault_message, new_fault_variable, new_fault_user;
    let fault_index_prev, event_datetime_current, event_datetime_mostrecent;

    
    //If the internal Fault Messages array is empty, fill it
    if (TcHmi.Symbol.readEx("%i%Current_Fault_Messages[0]%/i%") == "" || TcHmi.Symbol.readEx("%i%Current_Fault_Messages[0]%/i%") == null) {
        get_currentlang_faultmessages();
    }


    //Read entire fault array (response is in the form of a callback as readEX2 is async)
    TcHmi.Symbol.readEx2("%s%PLC1..Out_To_ICxx::System_Faults%/s%", function (data) {
        if (data.error === TcHmi.Errors.NONE) {
            //Retrieve data from response object
            system_fault_image = data.value;

            //Process each fault from Fault Image captured above
            system_fault_image.forEach((fault, fault_index) => {

                //Update displays and DB history based on state of each fault
                //Current Fault being processed is True (active)
                if (fault == true) {


                    //---------------- Fault History Logging -------------
                    //If this is a new fault (no current timestamp) then capture current date, time and user and log to DB (for history)
                    if (TcHmi.Symbol.readEx("%i%Current_Fault_EventTimeStamps[" + fault_index.toString() + "]%/i%") == "") {
                        TcHmi.Symbol.writeEx("%i%Current_Fault_EventTimeStamps[" + fault_index.toString() + "]%/i%", eventDateTime);
                        TcHmi.Symbol.writeEx("%i%Current_Fault_Users[" + fault_index.toString() + "]%/i%", eventUser);
                        
                        //If this is IC01 and disable_logging is not true, the new fault shall be logged to Fault_History DB
                        if (TcHmi.Symbol.readEx("%i%ICxx_Value%/i%") == 1 && disable_history_log != true) {
                                    //Write Fault information to Fault_History DB
                            SQL_Insert = "INSERT INTO public.history (event_datetime, message, event_user, variable) VALUES ('" + eventDateTime.toString() + "', '" + TcHmi.Symbol.readEx("%i%Current_Fault_Messages["+fault_index+"]%/i%") + "', '" + eventUser.toString() + "', 'Out_To_ICxx.System_Faults[" + fault_index.toString() + "]');"
                                    TcHmi.Symbol.writeEx("%s%GTAC_TcUI_PostgreSQL.setINSERT_OP1%/s%", SQL_Insert);

                                    //Trigger DB Write to store fault event
                                    TcHmi.Symbol.readEx2("%s%GTAC_TcUI_PostgreSQL.WRITE_OP1%/s%", function (data) {
                                        if (data.error === TcHmi.Errors.NONE) {
                                            //Retrieve write response from response object
                                            DB_Write_Response = data.value;
                                        } else {
                                            //Handle DB write errors
                                            DB_Write_Response = data.error;
                                        }
                                    }); //End of DB Write Arrow function
                        }
                    }


                    //----------- Current Fault List Updating -------------
                    //If a fault displayer is currently in view, update current fault list
                    if (fault_displayer_container != null) {
                        //Check that message doesn't already exist on list, if not add
                        if (document.getElementById("fr" + fault_index.toString()) == null) {

                                    //New Table Row object
                                    new_fault_row = document.createElement('tr');
                                    new_fault_row.setAttribute("id", "fr" + fault_index.toString());
                                    new_fault_row.style = "margin: 0; padding-top: 0; color: "+text_color+"; background: "+bg_color+";";

                                    //Grab event time of current fault being handled
                                    event_datetime_current = TcHmi.Symbol.readEx("%i%Current_Fault_EventTimeStamps[" + fault_index.toString() + "]%/i%");
                                    event_datetime_mostrecent = TcHmi.Symbol.readEx("%i%Faults_Mostrecent_DateTime%/i%");
                                    if (event_datetime_mostrecent == null) {
                                        //Caputre datetime as "most recent" if most recent is blank (first evaluation as example)
                                        event_datetime_mostrecent = event_datetime_current;
                                        TcHmi.Symbol.writeEx("%i%Faults_Mostrecent_DateTime%/i%", event_datetime_mostrecent);
                                    }
                                    //Update routine if full fault displayer is in view
                                    if (fault_displayer_container != null) {

                                        //Sort inserting
                                        //Evaluate current fault timestamp vs the most recently timestamped fauly
                                        if (event_datetime_current > event_datetime_mostrecent) {
                                            //This fault is more recent then the previous posted so insert to top of list (but under header children)
                                            fault_displayer_container.insertBefore(new_fault_row, fault_displayer_container.children[1]);
                                            //Caputre datetime of currently handled as new most recent
                                            event_datetime_mostrecent = event_datetime_current;
                                        } else {
                                            //Otherwise simply append to end of fault list
                                            fault_displayer_container.appendChild(new_fault_row);
                                        }

                                        //Create reference to the new row
                                        fault_row_container = document.getElementById("fr" + fault_index.toString());

                                        //And finally populate the new row with children (timestamp, message, var, user)
                                        //Event Time
                                        new_fault_datetime = document.createElement('th');
                                        new_fault_datetime.style = "margin: 0; padding-top: 0; color: "+text_color+"; font-size: "+text_size+"; background: "+bg_color+"; text-align: left; padding-left: 6px;";
                                        new_fault_datetime.innerHTML = event_datetime_current.replaceAll('"', '');
                                        fault_row_container.appendChild(new_fault_datetime);

                                        //Fault message Information
                                        new_fault_message = document.createElement('th');
                                        new_fault_message.style = "margin: 0; padding-top: 0; color: " + text_color + "; font-size: "+text_size+"; background: " + bg_color + "; text-align: left; padding-left: 6px";
                                        //Evaluate if the response length is too short, if so there is no valid translation in the DB for this fault
                                        if (TcHmi.Symbol.readEx("%i%Current_Fault_Messages[" + fault_index.toString() + "]%/i%").length == 0) { new_fault_message.innerHTML = "FLT#" + fault_index + ": No translation for this fault in DB"; }
                                        else { new_fault_message.innerHTML = TcHmi.Symbol.readEx("%i%Current_Fault_Messages["+ fault_index.toString() +"]%/i%"); }
                                        fault_row_container.appendChild(new_fault_message);

                                        //Current user during fault occurance
                                        new_fault_user = document.createElement('th');
                                        new_fault_user.style = "margin: 0; padding-top: 0; color: " + text_color + "; font-size: "+text_size+"; background: " + bg_color + "; text-align: left; padding-left: 6px";
                                        new_fault_user.innerHTML = TcHmi.Symbol.readEx("%i%Current_Fault_Users[" + fault_index.toString() + "]%/i%");
                                        fault_row_container.appendChild(new_fault_user);
                                        //Variable ref for fault
                                        new_fault_variable = document.createElement('th');
                                        new_fault_variable.style = "margin: 0; padding-top: 0; color: " + text_color + "; font-size: "+text_size+"; background: " + bg_color + "; text-align: left; padding-left: 6px";
                                        new_fault_variable.innerHTML = "Out_To_ICxx.System_Faults[" + fault_index + "]";
                                        fault_row_container.appendChild(new_fault_variable);
                                    }
                            }
                    }
                }

                //Current Fault being processed is False (not active)
                else if (fault == false) {

                    //Blank time stamp and user captured for fault upon fault event de-activating (fault has recovered)					
                    if (TcHmi.Symbol.readEx("%i%Current_Fault_EventTimeStamps[" + fault_index.toString() + "]%/i%") != "") {
                        TcHmi.Symbol.writeEx("%i%Current_Fault_EventTimeStamps[" + fault_index.toString() + "]%/i%", "");
                        TcHmi.Symbol.writeEx("%i%Current_Fault_Users[" + fault_index.toString() + "]%/i%", "");
                    }
                    //Check if a fault message displayer is currently in view and fault row is on the display's list, if so, remove it because fault is false
                    if ((fault_displayer_container != null) && (document.getElementById("fr" + fault_index.toString()) != null)) {
                        fault_displayer_container.removeChild(document.getElementById("fr" + fault_index.toString()));
                    }
                }

            });//End of forEach
        }
        else {
            //Notify of ReadEX2 error handling
            console.log("GTAC: FaultHandler.Update_FaultInfo() -> Error Reading Fault Array from PLC, ensure PLC is running");
        }

    });//End of ReadEx2 of fault array from PLC

}//End of Update_FaultInfo function


//-----------------------------------------------------------------
// Database read function to grab the entire fault message set and pass to an Internal Array
//-----------------------------------------------------------------
function get_currentlang_faultmessages() {

    //Capture current language
    const current_lang_code = TcHmi.Locale.get();
    //Set Query Command String in PostgreSQL Server Extension
    SQL_Query = "SELECT " + resolve_language(current_lang_code) + " FROM public.alarm_messages ORDER BY id ASC ";
    TcHmi.Symbol.writeEx("%s%GTAC_TcUI_PostgreSQL.setQUERY%/s%", SQL_Query);

    //Trigger DB Read
    TcHmi.Symbol.readEx2("%s%GTAC_TcUI_PostgreSQL.READ%/s%", function (data) {
        if (data.error === TcHmi.Errors.NONE) {
            //Retrieve data from response object
            DB_Read_Response = data.value;
            //Parse out rows, seperated by * markers
            var DB_Read_ResponseArray = DB_Read_Response.split('*');
            //Finally, hand Fault Messages to Server Variable "Current_Failt_Message"
            TcHmi.Symbol.writeEx("%i%Current_Fault_Messages%/i%", DB_Read_ResponseArray);
        }

        else {
            //Handle DB read errors
            DB_Read_Response = data.error;
            console.log("GTAC: FaultHandler.get_currentlang_faultmessages() -> DB Read Error: " + data.error);
        }

    });
};


//-----------------------------------------------------------------
// Utility function to return language phrase based on locale codes
//-----------------------------------------------------------------
function resolve_language(lang_code) {
    if (lang_code == "en-US") { return "English" }
    else if (lang_code == "pt-BR") { return "Portuguese"; }
    else if (lang_code == "fr-FR") { return "French"; }
    else if (lang_code == "de-DE") { return "German"; }
    else if (lang_code == "es-MX") { return "Spanish"; }
    else if (lang_code == "hi-IN") { return "Hindi"; }
    else if (lang_code == "zh-HK") { return "Chinese"; }
    else if (lang_code == "ja-JP") { return "Japanese"; }
    else if (lang_code == "ru-RU") { return "Russian"; }
    else if (lang_code == "it-IT") { return "Italian"; }
    else if (lang_code == "cs-CZ") { return "Czech"; }
    else if (lang_code == "sk-SK") { return "Slovak"; }
    else { return "English"; }
};


