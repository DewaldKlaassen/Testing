// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.758.8/runtimes/native1.12-tchmi/TcHmi.d.ts" />

//---------------------------------------------------------------------------
// A js function set to perform the following:
// 
//  - When requested, execute and gather product data report information
//  - Log report information to Product Reports DB for history use (IC01 only)
//
//  author: b.lekx-toniolo
//  Last edit: 20240909 - added in a couple of data points
//
//---------------------------------------------------------------------------


//Function to handle Report Triggers from PLC
function Handle_ProductReport_Triggers(triggers) {
    for (let report = 1; report <= 28; report++) {
        if (TcHmi.Functions.ICxx.GTAC_ReturnBinary_Value(triggers, report) == 1) {
            Log_Product_Report(report);
        }
        //All possible report triggers handled, blank all requests
        TcHmi.Symbol.writeEx("%s%PLC1..Out_To_ICxx::Product_Report_Trigger_REQS%/s%", 0);


    }
}

//Actual function to capture and store Product Data to the DB
function Log_Product_Report(targeted_fixture, response_handler) {
    //First, capture date / time stamp of function starting (to be used to calc how long function execution takes)
    let startlogging_DateTime = new Date();

    //If this is IC01, the create new DB record of product data report
    if (TcHmi.Symbol.readEx("%i%ICxx_Value%/i%") == 1) {
        //Create some vars

        let report = [], report_symbol;
        let reportDateTime;
        let machine_serial, machine_common_name, fixture;
        let operator_id;
        let product_serial, product_part_number, product_common_name;
        let product_model_id;
        let spare1, spare2;
        let generic_passfail_notes = [], generic_measurements = [];
        let temp_string1, temp_string2, placeholder1, placeholder2;
        let SQL_Insert, SQL_Insert1, SQL_Insert2;

        //Resolve report symbol
        if (targeted_fixture != null) {
            report_symbol = "%s%PLC1..Out_To_ICxx::ProductReport[" + targeted_fixture + "]%/s%";
        } else {

            //Handle bad function arguments given
            if (response_handler != null) {
                TcHmi.Symbol.writeEx(response_handler, "Null Value(s) for function argument(s): " + targeted_fixture );
            }
            console.log("GTAC: Log_Product_Report() -> Null Value(s) for function argument(s): " + targeted_fixture)
        }

        //Read entire targeted report (response is in the form of a callback as readEX2 is async)
        TcHmi.Symbol.readEx2(report_symbol, function (data) {
            if (data.error === TcHmi.Errors.NONE) {

                //Retrieve data set from response object
                report = data.value;

                //Transfer report information into vars
                reportDateTime = new Date();
                machine_serial = report.Machine_Serial;
                machine_common_name = report.Machine_Common_Name;

                if (targeted_fixture > 0 && targeted_fixture < 10) {
                    fixture = "Fix0" + targeted_fixture;
                } else if (targeted_fixture >= 10 && targeted_fixture <= 16) {
                    fixture = "Fix" + targeted_fixture;
                } else if (targeted_fixture >= 17 && targeted_fixture <= 28) {
                    fixture = "Fix" + ((targeted_fixture - 17) + 101);
                } else fixture = "Fix???: " + targeted_fixture;

                operator_id = report.Operator_ID;
                product_serial = report.Product_Serial;
                product_part_number = report.Product_Number;
                product_common_name = report.Product_Common_Name;
                product_model_id = report.Product_Model_ID;
                spare1 = report.Spare1;
                spare2 = report.Spare2;


                
                //Build results arrays
                //Pass Fail Notes Array
                temp_string1 = "{";
                for (let i = 0; i < 32; i++) {
                    placeholder1 = report.Generic_PassFail_Notes[i];
                    if (placeholder1 == null || placeholder1 == "") placeholder1 = "NA";
                    if (i == 31) {
                        temp_string1 = temp_string1 + placeholder1;
                    } else temp_string1 = temp_string1 + placeholder1 + ",";
                }
                //Finally, close array string
                generic_passfail_notes = temp_string1 + "}";

                //Measurements Array
                temp_string2 = "{";
                for (let i = 0; i < 32; i++) {
                    placeholder2 = report.Generic_Measurements[i].toString();
                    if (placeholder2 == null || placeholder2 == "") placeholder2 = "NA";
                    if (i == 31) {
                        temp_string2 = temp_string2 + placeholder2;
                    } else temp_string2 = temp_string2 + placeholder2 + ",";
                }
                //Finally, close array string
                generic_measurements = temp_string2 + "}";
                

                //Develop SQL INSERT string (build in stages for easier view on screen)
                SQL_Insert1 = "INSERT INTO public.product_data_reports (date_time, machine_serial, machine_common_name, fixture, operator_id, product_serial, product_part_number, product_common_name, product_model_id, spare1, spare2,  pass_fail_notes, measurements)";
                SQL_Insert2 = "VALUES ('" + reportDateTime + "','" + machine_serial + "','" + machine_common_name + "','" + fixture + "','" + operator_id + "','" + product_serial + "','" + product_part_number + "','" + product_common_name + "','" + product_model_id + "','" + spare1 + "','" + spare2 + "','" + generic_passfail_notes + "','" + generic_measurements + "');"

                SQL_Insert = SQL_Insert1.concat(' ', SQL_Insert2)

                //Set command to DB Sever Extension
                TcHmi.Symbol.writeEx("%s%GTAC_TcUI_PostgreSQL.setINSERT_OP3%/s%", SQL_Insert);

                //Trigger DB Write to store production report data
                TcHmi.Symbol.readEx2("%s%GTAC_TcUI_PostgreSQL.WRITE_OP3%/s%", function (data) {
                    if (data.error === TcHmi.Errors.NONE) {
                        //Retrieve write response from response object
                        DB_Write_Response = data.value;
                        //Post execution message plus execution time
                        if (response_handler != null) {
                            TcHmi.Symbol.writeEx(response_handler, DB_Write_Response + " in " + Math.abs(new Date - startlogging_DateTime) + " ms");
                        }
                        console.log("GTAC: Log_Product_Report() -> " + fixture + " product data report logged to DB, " + DB_Write_Response + " in " + Math.abs(new Date - startlogging_DateTime) + " ms")
                    } else {
                        //Handle DB write errors
                        DB_Write_Response = data.error;
                        if (response_handler != null) {
                            TcHmi.Symbol.writeEx(response_handler, DB_Write_Response);
                        }
                        console.log("GTAC: Log_Product_Report() -> " + DB_Write_Response)
                    }
                }); //End of DB Write Arrow function

            } else {
                //Handle ReadEx2 error
                if (response_handler != null) {
                    TcHmi.Symbol.writeEx(response_handler, "ReadEx2 Error");
                }
                console.log("GTAC: Log_Production_Report() -> ReadEX2 Error");
            }

        });//End of ReadEx2 function
    }//End of If check for IC01



    
}
