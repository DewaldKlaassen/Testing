// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.756.1/runtimes/native1.12-tchmi/TcHmi.d.ts" />


//---------------------------------------------------------------------------
// A js function set to perform the following:
// 
//  - When requested, execute and gather production report information
//  - Log report information to DB for history use (IC01 only)
//
//  author: b.lekx-toniolo
//  Last edit: 20221012
//
//---------------------------------------------------------------------------

//Function to handle Report Triggers from PLC
function Handle_ProductionReport_Triggers(triggers) {
    for (let report = 1; report <= 16; report++) {
        if (TcHmi.Functions.ICxx.GTAC_ReturnBinary_Value(triggers, report) == 1) {
            Log_Production_Report(report, "Curr");
        }
        //All possible report triggers handled, blank all requests
        TcHmi.Symbol.writeEx("%s%PLC1..Out_To_ICxx::Production_Report_Trigger_REQS%/s%", 0);


     }
}

//Actual function to capture and store production Data to the DB
function Log_Production_Report(targeted_fixture, targeted_report, response_handler) {
    //First, capture date / time stamp of function starting (to be used to calc how long function execution takes)
    let startlogging_DateTime = new Date();

    //If this is IC01, the create new DB record of production report
    if (TcHmi.Symbol.readEx("%i%ICxx_Value%/i%") == 1) {
        //Create some vars

        let report = [], report_symbol;
        let reportDateTime;
        let machine_serial, machine_common_name, fixture, part_number, target_cycletime;
        let shift_started, shift_ended, gross_shift_duration, net_shift_duration;
        let shift_status, total_expected, total_actual, total_defect, deviation;
        let up_time, faulted_time, fault_count;
        let availability, oper_perf, ftq, oee;
        let actual_per_hour = [], expected_per_hour = [];
        let shift_config = [];
        let SQL_Insert, SQL_Insert1, SQL_Insert2;
        let report_forced;

        //Resolve report symbol
        if (targeted_report != null && targeted_fixture != null) {
            report_symbol = "%s%PLC1..Out_To_ICxx::ProdReport[" + targeted_fixture + "]::" + targeted_report + "_Prod_Report%/s%";
        } else {

            //Handle bad function arguments given
            if (response_handler != null) {
                TcHmi.Symbol.writeEx(response_handler, "Null Value(s) for function argument(s): " + targeted_fixture + " , " + targeted_report);
            }
            console.log("GTAC: Log_Production_Report() -> Null Value(s) for function argument(s): " + targeted_fixture + " , " + targeted_report)
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
                }
                part_number = "partnumberTBD";
                target_cycletime = report.Target_Cycle_Time;
                shift_started = report.Start_Shift_TimeDate.wYear + "/" + report.Start_Shift_TimeDate.wMonth + "/" + report.Start_Shift_TimeDate.wDay + "-" + report.Start_Shift_TimeDate.wHour + ":" + report.Start_Shift_TimeDate.wMinute + ":" + report.Start_Shift_TimeDate.wSecond;
                shift_ended = report.End_Shift_TimeDate.wYear + "/" + report.End_Shift_TimeDate.wMonth + "/" + report.End_Shift_TimeDate.wDay + "-" + report.End_Shift_TimeDate.wHour + ":" + report.End_Shift_TimeDate.wMinute + ":" + report.End_Shift_TimeDate.wSecond;
                gross_shift_duration = report.Gross_Shift_Duration;
                net_shift_duration = report.Net_Shift_Duration;
                shift_status = report.Status;
                total_expected = report.Prod_Running_Target;
                total_actual = report.Prod_Count_Total;
                total_defect = report.Prod_Count_Scrap;
                deviation = report.Prod_Difference;
                up_time = report.Running_Up_Time;
                faulted_time = report.Total_Fault_Time;
                fault_count = report.Total_Fault_Count;
                availability = report.Prod_Availability;
                oper_perf = report.Prod_Performance;
                ftq = report.Prod_Quality;
                oee = report.Prod_Running_OEE;
                actual_per_hour = "{" + report.Hour_Count[1] + "," + report.Hour_Count[2] + "," + report.Hour_Count[3] + "," + report.Hour_Count[4] + "," + report.Hour_Count[5] + "," + report.Hour_Count[6] + "," + report.Hour_Count[7] + "," + report.Hour_Count[8] + "," + report.Hour_Count[9] + "," + report.Hour_Count[10] + "," + report.Hour_Count[11] + "," + report.Hour_Count[12] + "}";
                expected_per_hour = "{" + report.Expected_Count[1] + "," + report.Expected_Count[2] + "," + report.Expected_Count[3] + "," + report.Expected_Count[4] + "," + report.Expected_Count[5] + "," + report.Expected_Count[6] + "," + report.Expected_Count[7] + "," + report.Expected_Count[8] + "," + report.Expected_Count[9] + "," + report.Expected_Count[10] + "," + report.Expected_Count[11] + "," + report.Expected_Count[12] + "}";
                shift_config = "{" + report.ProdConfig_Times.Shift_StartTime + "," + report.ProdConfig_Times.Break1_StartTime + "," + report.ProdConfig_Times.Break1_EndTime + "," + report.ProdConfig_Times.Break2_StartTime + "," + report.ProdConfig_Times.Break2_EndTime + "," + report.ProdConfig_Times.Break3_StartTime + "," + report.ProdConfig_Times.Break3_EndTime + "," + report.ProdConfig_Times.Shift_EndTime + "}";
                report_forced = TcHmi.Symbol.readEx("%i%Prod_Report_Forced%/i%");

                //Develop SQL INSERT string (build in stages for easier view on screen)
                SQL_Insert1 = "INSERT INTO public.production_reports_current (date_time, machine_serial, machine_common_name, fixture, part_number, target_cycle_time, shift_started, shift_ended, gross_shift_duration, net_shift_duration, shift_status, total_expected, total_actual, total_defect, net_production, production_deviation, machine_up_time, fault_time, fault_count, machine_availability, operator_performance, first_time_quality, oee, actual_per_hour, expected_per_hour, shift_config, report_capture_forced)";
                //SQL_Insert1 = "INSERT INTO public.production_reports_current (date_time, machine_serial, machine_common_name, fixture, part_number, target_cycle_time, shift_started, shift_ended, gross_shift_duration, net_shift_duration, status, total_expected)";
                SQL_Insert2 = "VALUES ('" + reportDateTime + "','" + machine_serial + "','" + machine_common_name + "','" + fixture + "','" + part_number + "','" + target_cycletime + "','" + shift_started + "','" + shift_ended + "','" + gross_shift_duration + "','" + net_shift_duration + "','" + shift_status + "','" + total_expected + "','" + total_actual + "','" + total_defect + "','" + deviation + "','" + total_expected + "','" + up_time + "','" + faulted_time + "','" + fault_count + "','" + availability + "','" + oper_perf + "','" + ftq + "','" + oee + "','" + actual_per_hour + "','" + expected_per_hour + "','" + shift_config + "','" + report_forced + "');"

                SQL_Insert = SQL_Insert1.concat(' ', SQL_Insert2)

                //Set command to DB Sever Extension
                TcHmi.Symbol.writeEx("%s%GTAC_TcUI_PostgreSQL.setINSERT_OP2%/s%", SQL_Insert);

                //Trigger DB Write to store production report data
                TcHmi.Symbol.readEx2("%s%GTAC_TcUI_PostgreSQL.WRITE_OP2%/s%", function (data) {
                    if (data.error === TcHmi.Errors.NONE) {
                        //Retrieve write response from response object
                        DB_Write_Response = data.value;
                        //Post execution message plus execution time
                        if (response_handler != null) {
                            TcHmi.Symbol.writeEx(response_handler, DB_Write_Response + " in " + Math.abs(new Date - startlogging_DateTime) + " ms");
                        }
                        console.log("GTAC: Log_Production_Report() -> " + fixture + " production report logged to DB, " + DB_Write_Response + " in " + Math.abs(new Date - startlogging_DateTime) + " ms")
                        //Blank Forced bit
                        TcHmi.Symbol.writeEx("%i%Prod_Report_Forced%/i%", false);
                    } else {
                        //Handle DB write errors
                        DB_Write_Response = data.error;
                        if (response_handler != null) {
                            TcHmi.Symbol.writeEx(response_handler, DB_Write_Response);
                        }
                        console.log("GTAC: Log_Production_Report() -> " + DB_Write_Response)
                        //Blank Forced bit
                        TcHmi.Symbol.writeEx("%i%Prod_Report_Forced%/i%", false);
                    }
                }); //End of DB Write Arrow function

            } else {
                //Handle ReadEx2 error
            }

        });//End of ReadEx2 function
    }//End of If check for IC01
    else {
        //Blank Forced bit
        TcHmi.Symbol.writeEx("%i%Prod_Report_Forced%/i%", false);
    }
}//End of GTAC_ProdReportHandler function
