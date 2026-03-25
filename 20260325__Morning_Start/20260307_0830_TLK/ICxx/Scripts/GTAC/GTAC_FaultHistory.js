// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.756.1/runtimes/native1.12-tchmi/TcHmi.d.ts" />



//---------------------------------------------------------------------------
// A js function set to perform the following:
// (called upon opening of fault history content)
//
//  - Read in logged faults from Fault_History DB
//  - Add faults read to displayer
//
//  author: b.lekx-toniolo
//  Last edit: March 03 2025 (add in BG vs Text color and Text Size configs), b.lekx-toniolo / w.griffiths
//---------------------------------------------------------------------------


function Update_FaultHistory(show_last) {

    //Reference to html host object on fault history screen
    const fault_history_container = document.getElementById("fault_history_container");


    //Create some vars
    let SQL_Query, DB_Read_Response;
    let new_faulthistory_row, new_record_item;
    let record_display_limit = show_last;

    //Text Size
    let text_size;
    let text_size_cookie = TcHmi.Functions.ICxx.GTAC_EatCookie("alarm_text_size", silence_console = true);
    if (text_size_cookie >= 12 && text_size_cookie <= 16) {
        text_size = text_size_cookie.toString() + "px";
    } else {
        text_size = "12px";
    }



    //Update routine if fault history displayer is in view
    if (fault_history_container != null) {

        //Update Under Construction Note Visability (if machine is under construction, we don't actively log faults to history
        TcHmi.Symbol.writeEx("%ctrl% Under_Construction_Note::Visability%/ctrl%", "Hidden");

        //Display Processing message during retreival
        TcHmi.Symbol.writeEx("%ctrl%Record_Count_TB::Text%/ctrl%", "Reading fault records.....");

        //Retrieve Fault Record items from Fault_History DB  (id, datetimestamp, message)
        //Build Query String
        SQL_Query = "SELECT * FROM public.history ORDER BY id DESC LIMIT " + record_display_limit;
        //Set Query string to Server Extension (optional DB 1 in this case)
        TcHmi.Symbol.writeEx("%s%GTAC_TcUI_PostgreSQL.setQUERY_OP1%/s%", SQL_Query);
        //Trigger DB Read to grab message in currently selected language
        TcHmi.Symbol.readEx2("%s%GTAC_TcUI_PostgreSQL.READ_OP1%/s%", function (data) {
            if (data.error === TcHmi.Errors.NONE) {
                //Retrieve data from response object
                DB_Read_Response = data.value;
                //Parse out rows, seperated by * markers
                var DB_Read_ResponseArray = DB_Read_Response.split('*');
                
                //Sort through each fault record 
                for (let fault_record = 0; fault_record < DB_Read_ResponseArray.length; fault_record++) {
                    //Parse out Rows from the indvidual fault record, row seperated by ~
                    var DB_Read_ResponseSubArray = DB_Read_ResponseArray[fault_record].split('~'); 
 
                    //Set-up a new table row object in the fault_history_container HTML element
                    new_faulthistory_row = document.createElement('tr');
                    new_faulthistory_row.setAttribute("id", "fhr" + fault_record.toString());
                    new_faulthistory_row.style = "margin: 0; padding-top: 0; color: white; background: black;";
                    fault_history_container.appendChild(new_faulthistory_row);
                    //Create local reference to the row
                    let faulthistory_row_container = document.getElementById("fhr" + fault_record.toString());

 
                    //If there is no data found at searched record location, or we're at the end of a partially filled DB (IE doubled up ID), override
                    if (DB_Read_ResponseSubArray[0] == "" || DB_Read_ResponseSubArray[0] == null) {
                        DB_Read_ResponseSubArray[0] = "No Fault Record"; //id column
                        DB_Read_ResponseSubArray[1] = "No Fault Record"; //Date Time column
                        DB_Read_ResponseSubArray[2] = "No Fault Record"; //Message column
                    }

                    //Populate the new row with id
                    new_record_item = document.createElement('th');
                    new_record_item.style = "margin: 0; padding-top: 0; color: white; font-size: " + text_size + "; background: black; text-align: left; padding-left: 6px";
                    new_record_item.innerHTML = DB_Read_ResponseSubArray[0];
                    faulthistory_row_container.appendChild(new_record_item);
                    //Populate the new row with Date Time
                    new_record_item1 = document.createElement('th');
                    new_record_item1.style = "margin: 0; padding-top: 0; color: white; font-size: " + text_size + "; background: black; text-align: left; padding-left: 6px";
                    new_record_item1.innerHTML = DB_Read_ResponseSubArray[1];
                    faulthistory_row_container.appendChild(new_record_item1);
                    //Populate the new row with Message
                    new_record_item2 = document.createElement('th');
                    new_record_item2.style = "margin: 0; padding-top: 0; color: white; font-size: " + text_size + "; background: black; text-align: left; padding-left: 6px";
                    new_record_item2.innerHTML = DB_Read_ResponseSubArray[2];
                    faulthistory_row_container.appendChild(new_record_item2);
                    //Populate the new row with PLC Variable
                    new_record_item4 = document.createElement('th');
                    new_record_item4.style = "margin: 0; padding-top: 0; color: white; font-size: " + text_size + "; background: black; text-align: left; padding-left: 6px";
                    new_record_item4.innerHTML = DB_Read_ResponseSubArray[4];
                    faulthistory_row_container.appendChild(new_record_item4);
                    //Update Processing Status
                    TcHmi.Symbol.writeEx("%ctrl%Record_Count_TB::Text%/ctrl%", "Processing record: " + DB_Read_ResponseSubArray[0]);


                    //Finalize Processing Status
                    if (fault_record == DB_Read_ResponseArray.length - 1) {
                        TcHmi.Symbol.writeEx("%ctrl%Record_Count_TB::Text%/ctrl%", "Showing last " + fault_record + " records");
                    }

                }//End Fault_Record For loop
            } else {
                //Handle DB read errors
                DB_Read_Response = data.error;
                console.log("GTAC: Fault_History.Update_FaultHistory() -> DB Read Error: " + data.error);
            }

        }); //End of DB ReadEx2 Arrow function
    }//End of fault_history_container if check
}//End of Update_FaultHistory function
