// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.756.1/runtimes/native1.12-tchmi/TcHmi.d.ts" />

(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    // If you want to unregister an event outside the event code you need to use the return value of the method register()
    var destroyOnInitialized = TcHmi.EventProvider.register('onInitialized', function (e, data) {
        // This event will be raised only once, so we can free resources. 
        // It's best practice to use destroy function of the event object within the callback function to avoid conflicts.
		e.destroy();

		Update_FaultInfo();
	

		
})(TcHmi);

		//----------------------------------------------------------------------------------------------------------------------
		//----------------------------------------------------------------------------------------------------------------------
		// A function to do the following:
		// - Gather status of machine related faults from PLC
		// - Update Current Alarm Views
		// - Log to DB for history purposes
		//
		// Author: B.Lekx-Toniolo
		// Last edit: 20220714
		// DEBUG DEBUG DEBUG still under development
		//-----------------------------------------------------------------------------------------------------------------------
		//-----------------------------------------------------------------------------------------------------------------------
	
	async function Update_FaultInfo() {

		//Reference to html host object on alarm screen
		const fault_displayer_container = document.getElementById("fault_displayer_container");
		const fault_datetime_container = document.getElementById("fault_datetime_container");
		const fault_message_container = document.getElementById("fault_message_container");
		const fault_variable_container = document.getElementById("fault_variable_container");
		const fault_currentuser_container = document.getElementById("fault_current_container");
		let system_fault_image = [];

		//Read entire fault array (response is in the form of a callback as readEX2 is async)
		TcHmi.Symbol.readEx2("%s%PLC1..Out_To_ICxx::System_Faults%/s%", function (data) {
			if (data.error === TcHmi.Errors.NONE) {
				//Retrieve data from response object
				system_fault_image = data.value;

				//Gather each fault
				system_fault_image.forEach((fault, fault_index) => {

					//Update displays based on State of each fault
					if (fault == true) {
						//Add in DB Write here for History
						//Add in DB Write here for History
						//Add in DB Write here for History

						//Check if a fault displayer is currently in view
						if (fault_displayer_container != null) {
							//Check that message doesn't already exist on list, if not add
							if (document.getElementById(fault_index.toString()) == null) {

								//Develop date / time stamp
								var new_fault_datetime = document.createElement('p');
								new_fault_datetime.setAttribute("id", "t" + fault_index.toString());
								new_fault_datetime.style = "margin: 0; padding-top: 0; color: red; background: black;";
								new_fault_datetime.innerHTML = 'Date / Time';
								fault_datetime_container.appendChild(new_fault_datetime);
								//Develop message
								var new_fault_message = document.createElement('p');
								new_fault_message.setAttribute("id", "m" + fault_index.toString());
								new_fault_message.style = "margin: 0; padding-top: 0; color: red; background: black;";
								new_fault_message.innerHTML = 'Fault: ' + fault_index;
								fault_message_container.appendChild(new_fault_message);
								//Develop variable ref for fault
								var new_fault_variable = document.createElement('p');
								new_fault_variable.setAttribute("id", "v" + fault_index.toString());
								new_fault_variable.style = "margin: 0; padding-top: 0; color: red; background: black;";
								new_fault_variable.innerHTML = 'Variable';
								fault_variable_container.appendChild(new_fault_variable);
								//Develop current for fault
								var new_fault_user = document.createElement('p');
								new_fault_user.setAttribute("id", "u" + fault_index.toString());
								new_fault_user.style = "margin: 0; padding-top: 0; color: red; background: black;";
								new_fault_user.innerHTML = 'Current User';
								fault_currentuser_container.appendChild(new_fault_user);
							}
						}
					}
					else if (fault == false) {
						//Add in DB Write here for History
						//Add in DB Write here for History
						//Add in DB Write here for History

						//Check if a fault message displayer is currently in view
						if (fault_displayer_container != null) {

							//Check if fault is on the list, if so, remove it
							if (document.getElementById(fault_index.toString()) != null) {
								fault_datetime_container.removeChild(document.getElementById("t" + fault_index.toString()));
								fault_message_container.removeChild(document.getElementById("m" + fault_index.toString()));
								fault_variable_container.removeChild(document.getElementById("v" + fault_index.toString()));
								fault_currentuser_container.removeChild(document.getElementById("u" + fault_index.toString()));
							}
						}
					}

				});//End of forEach

			}
			else {
				// Add in ReadEX2 error handling here
			}


		});//End of ReadEx2



	}//End of async function
}); //End of TcHmi function