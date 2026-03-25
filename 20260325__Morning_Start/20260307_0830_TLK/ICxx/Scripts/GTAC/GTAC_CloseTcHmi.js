// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.758.8/runtimes/native1.12-tchmi/TcHmi.d.ts" />
//---------------------------------------------------------------------------
// A js function workaround to close the TcHmi application:
// 
//  author: b.lekx-toniolo
//  Last edit: 20221021
//---------------------------------------------------------------------------

//Close the ui function called by "x" button
function close_the_ui() {

    if (confirm("Do you really want to close?")) {
        //Log event to console
        console.log("GTAC: close_the_ui() -> Preparing to close application.....");
        //Stop DB connections
        console.log("GTAC: close_the_ui() -> Stopping DB connections.....");
        TcHmi.Symbol.writeEx("%ctrl%Uc_GTAC_DB_Icon::Start_Connections%/ctrl%", false);

        //Close and Dispose of Db connections
        console.log("GTAC: close_the_ui() -> Closing and disposing of DB connections.....");
        for (let i = 0; i <= 5; i++) {
            if (i == 0) {
                TcHmi.Symbol.readEx2("%s%GTAC_TcUI_PostgreSQL.CLOSE%/s%", function (data) {
                    if (data.error === TcHmi.Errors.NONE) {
                        console.log("   Connection[" + i + "] -> " + data.value);
                    } else {
                        console.log("   Connection[" + i + "] -> " + data.error);
                    }

                });
            } else {
                TcHmi.Symbol.readEx2("%s%GTAC_TcUI_PostgreSQL.CLOSE_OP" + i + "%/s%", function (data) {
                    if (data.error === TcHmi.Errors.NONE) {
                        console.log("   Connection[" + i + "] -> " + data.value);
                    } else {
                        console.log("   Connection[" + i + "] -> " + data.error);
                    }

                });
            }

        }
        //Finally, close the window
        setTimeout(close_now, 1500);
    }
}
function close_now() {
    console.log("GTAC: close_the_ui() -> Closing application...bye bye!");
    window.close('', '_parent', '')
}

