// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.760.59/runtimes/native1.12-tchmi/TcHmi.d.ts" />

//---------------------------------------------------------------------------
// A collection of js functions for different aspects of logging in, see description of each
//---------------------------------------------------------------------------



//--------------------------------------------------------------------------------
// A function for logging in if correct user and password are entered
// Author: w.griffiths
// Last Edit: 20250221 - initial concept
//--------------------------------------------------------------------------------
function GTAC_Login() {
    //Read user inputs for username and password and assign to variable
    let user = TcHmi.Symbol.readEx("%i%LogIn_User%/i%");
    let password = TcHmi.Symbol.readEx("%i%LogIn_Password%/i%");
    TcHmi.Symbol.writeEx("%i%Incorrect_Login%/i%", false);
    let returnScreen = TcHmi.Symbol.readEx("%i%LastScreenOpen%/i%");

    //functional code
    TcHmi.Server.loginEx2(user, password, false, false, {}, function (data) {
        if (data.error === TcHmi.Errors.NONE) {
            console.log("GTAC_Login() -> " + user + "_logon() -> Logged on as " + user + " user");
            TcHmi.Locale.load(TcHmi.Functions.ICxx.GTAC_EatCookie("Locale"));
            //reset password field
            TcHmi.Symbol.writeEx('%ctrl%Password_Input::Text%/ctrl%', '');
            //Return to last screen open
            TcHmi.Functions.ICxx.GTAC_Change_Screen(returnScreen);
          
        } else {
            TcHmi.Symbol.writeEx("%i%Incorrect_Login%/i%", true);
            console.log("GTAC_Login -> Login verification failed, username and/or password incorrect")
        }
    });
}//end of function



//--------------------------------------------------------------------------------
// A function for changing the password of a specific user
// Author: w.griffiths
// Last Edit: 20250221 - initial concept
//--------------------------------------------------------------------------------
function GTAC_ChangePassword() {
    //Read user inputs for username and password and assign to variable
    let CurrentUser = TcHmi.Symbol.readEx("%i%CurrentUser%/i%");
    let password = TcHmi.Symbol.readEx("%i%LogIn_Password%/i%");
    let NewPassword = TcHmi.Symbol.readEx("%i%NewPassword%/i%");
    let confirmNewPassword = TcHmi.Symbol.readEx("%i%ConfirmNewPassword%/i%");


    //functional code
    if ((NewPassword == confirmNewPassword) && (NewPassword.length > 3) && (NewPassword.length < 17)) {

            TcHmi.Server.loginEx2('__SystemAdministrator', 'camp1234', false, false, { timeout: 2000 }, function (data) {
                if (data.error === TcHmi.Errors.NONE) {
                    console.log(`GTAC_ChangePassword() -> Changing password for ${CurrentUser} account`);

                    //--- Update Password
                    TcHmi.Server.UserManagement.updateUser(
                        CurrentUser,
                        {
                            password: NewPassword
                        },
                         function (data) {
                             if (data.error === TcHmi.Errors.NONE) {
                                 console.log("GTAC_ChangePassword() -> Password for " + CurrentUser + " successfully changed");
                                 TcHmi.Server.loginEx2(CurrentUser, NewPassword, false, false, {}, function (data) {
                                     if (data.error === TcHmi.Errors.NONE) {
                                         TcHmi.Locale.load(TcHmi.Functions.ICxx.GTAC_EatCookie("Locale"));
                                         TcHmi.Symbol.writeEx('%i%PasswordChangeSuccessful%/i%', true);
                                     }
                                 });

                             } else {
                                 console.log(`GTAC_ChangePassword() -> Failed to Update Password, Check that Both fields match and try again`);

                             }
                         })
                }
            });
    } else if ((NewPassword !== confirmNewPassword) || ((NewPassword.length < 4) || (NewPassword.length > 16))) {
        console.log('GTAC_ChangePassword() -> Failed to Update Password, confirm that Password is between 4-16 characters and both fields match');
        TcHmi.Symbol.writeEx('%ctrl%Change_Password_Failed_Message::Visibility%/ctrl%', 'Visible');
    } 

    //reset internals
        TcHmi.Symbol.writeEx('%ctrl%NewPassword_Input::Text%/ctrl%', '');
        TcHmi.Symbol.writeEx('%ctrl%ConfirmNewPassword_Input::Text%/ctrl%', '');
        TcHmi.Symbol.writeEx("%i%LogIn_Password%/i%", '');
        TcHmi.Symbol.writeEx("%i%NewPassword%/i%", '');
        TcHmi.Symbol.writeEx("%i%ConfirmNewPassword%/i%", '');
        TcHmi.Symbol.writeEx('%i%PasswordChangeSuccessful%/i%', false);

    } //End of function
   
