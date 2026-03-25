// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.758.8/runtimes/native1.12-tchmi/TcHmi.d.ts" />


//---------------------------------------------------------------------------
// A collection of js functions to handle our generic fieldbus screen:
// (functions called as required by the GTAC_Fieldbus.content file)
//
//
//  author: b.lekx-toniolo (some ported from c.drees original work in action editor)
//  Last over-all edit: 20221116
//
//---------------------------------------------------------------------------


/*------------------------------------------------------------------------------------------
A function to to setup some initial data to configure how the screen will operate
Created: Brent Lekx-Toniolo (ported from c.drees original action editor work)

- 20240619 Added in exception code to correct the "call from Weld I/O button" SSCC610 GH Issue #53 (b.lekx-toniolo)
------------------------------------------------------------------------------------------*/
function fieldbus_screen_init() {

	//Grab Component Type
	let Component_Name = TcHmi.Symbol.readEx("%i%Component_Name%/i%");
	//Setup component type and num
	let Component_Type = TcHmi.Functions.ICxx.GTAC_ReturnComponentType(Component_Name);
	let Component_Num = TcHmi.Functions.ICxx.GTAC_ReturnComponentNumber(Component_Name);


    //Blank Byte offset
	if ((Component_Type == "R") && (TcHmi.Symbol.readEx("%i%GTACxx_FieldbusByteOffset%/i%") == 22)) {
	    TcHmi.Symbol.writeEx("%i%GTACxx_FieldbusByteOffset%/i%", 22) //Then just leave the value at 22 as this is a call to the Weld I/O screen

	} else {
	    TcHmi.Symbol.writeEx("%i%GTACxx_FieldbusByteOffset%/i%", 0);
    }
	
	
	//Write to Internal symbols
	TcHmi.Symbol.writeEx("%i%Component_Type%/i%", Component_Type);
	TcHmi.Symbol.writeEx("%i%Component_Num%/i%", Component_Num);


	//Set max byte offsets ased on GTAC component type, this sets the "end" of the scrolling for the screen navigation
	//Rxx Type
	if (Component_Type == "R") {
		//Set Max Byte Offset
		TcHmi.Symbol.writeEx("%i%GTACxx_FieldbusByteOffsetMax%/i%", 60);
	}
	//STxx Type
	else if (Component_Type == "ST") {
		//Set Max Byte Offset
		TcHmi.Symbol.writeEx("%i%GTACxx_FieldbusByteOffsetMax%/i%", 4);
	}
	//SLxx Type
	else if (Component_Type == "SL") {
		//Set Max Byte Offset
		TcHmi.Symbol.writeEx("%i%GTACxx_FieldbusByteOffsetMax%/i%", 72);
	}
	//LSRxx Type
	else if (Component_Type == "LSR") {
		//Set Max Byte Offset
		TcHmi.Symbol.writeEx("%i%GTACxx_FieldbusByteOffsetMax%/i%", 12);
	}

}//End of function



/*------------------------------------------------------------------------------------------
A function to control Updating of fieldbus IO Screen text with data retrieved from Database (DB)
Created: Brent Lekx-Toniolo

- 20220704 Modified from a Page offset to a Byte offset to allow for custom Byte offsets in the code (c.drees)
- 20221115 moved code from content internal JS editor to this JS file and added title update code (b.lekx-toniolo)
- 20240308 Optimize DB read be retrieving 8 messages per read inseatd of singular (b.lekx-toniolo)
- 20250604 added in ability for multi language retrieval (b.lekx-toniolo)

------------------------------------------------ S.H.H.D.I ---------------------------------
---------------------------------------------Fort Wisers ----------------------------------*/
function update_screen_messages() {


	//Grab Component Type, Num 
	var Component_Type = TcHmi.Symbol.readEx("%i%Component_Type%/i%");
	var Component_Num = TcHmi.Symbol.readEx("%i%Component_Num%/i%");
	//Assemble Name
	var Component_Name = null;
	if (Component_Type == "R") { Component_Name = Component_Type + Component_Num; }
	else {
		if (Component_Num < 10) { Component_Name = Component_Type +"0"+ Component_Num }
		else { Component_Name = Component_Type + Component_Num }
	}


	//Page offset
	let Start_Byte_Offset = TcHmi.Symbol.readEx("%i%GTACxx_FieldbusByteOffset%/i%");


	//Create some Misc variables
	var DB_TargetTable_In = null;
	var DB_TargetTable_Out = null;
	var DB_TargetColumn = null;
	const current_lang_code = TcHmi.Locale.get();

	//Select DB Tables to pull data from based on type (and later language as well)
	//Rxx Type
	if (Component_Type == "R") {
		DB_TargetTable_In = "public.fieldbus_descr_rxx_kukatype6x_in";
		DB_TargetTable_Out = "public.fieldbus_descr_rxx_kukatype6x_out";
		DB_TargetColumn = resolve_language(current_lang_code);
		//Update Titles
		if (Start_Byte_Offset == 20) {
			TcHmi.Symbol.writeEx("%ctrl%Fieldbus_Title_1::Text%/ctrl%", "From " + Component_Name + " To PLC Byte " + (Start_Byte_Offset + 1));
			TcHmi.Symbol.writeEx("%ctrl%Fieldbus_Title_2::Text%/ctrl%", "To " + Component_Name + " From PLC Byte " + (Start_Byte_Offset + 1));
		} else {
			TcHmi.Symbol.writeEx("%ctrl%Fieldbus_Title_1::Text%/ctrl%", "From " + Component_Name + " To PLC Byte " + (Start_Byte_Offset + 1) + " & " + (Start_Byte_Offset + 2));
			TcHmi.Symbol.writeEx("%ctrl%Fieldbus_Title_2::Text%/ctrl%", "To " + Component_Name + " From PLC Byte " + (Start_Byte_Offset + 1) + " & " + (Start_Byte_Offset + 2));
			TcHmi.Symbol.writeEx("%ctrl%Fieldbus_Title_3::Text%/ctrl%", "From " + Component_Name + " To PLC Byte " + (Start_Byte_Offset + 3) + " & " + (Start_Byte_Offset + 4));
			TcHmi.Symbol.writeEx("%ctrl%Fieldbus_Title_4::Text%/ctrl%", "To " + Component_Name + " From PLC Byte " + (Start_Byte_Offset + 3) + " & " + (Start_Byte_Offset + 4));
		}
	}
	//STxx Type
	else if (Component_Type == "ST") {
		DB_TargetTable_In = "public.fieldbus_descr_stxx_in";
		DB_TargetTable_Out = "public.fieldbus_descr_stxx_out";
		DB_TargetColumn = "description";

		//Update Titles
		TcHmi.Symbol.writeEx("%ctrl%Fieldbus_Title_1::Text%/ctrl%", "From " + Component_Name + " To PLC Byte " + (Start_Byte_Offset + 0) + " & " + (Start_Byte_Offset + 1));
		TcHmi.Symbol.writeEx("%ctrl%Fieldbus_Title_2::Text%/ctrl%", "To " + Component_Name + " From PLC Byte " + (Start_Byte_Offset + 0) + " & " + (Start_Byte_Offset + 1));
		TcHmi.Symbol.writeEx("%ctrl%Fieldbus_Title_3::Text%/ctrl%", "From " + Component_Name + " To PLC Byte " + (Start_Byte_Offset + 2) + " & " + (Start_Byte_Offset + 3));
		TcHmi.Symbol.writeEx("%ctrl%Fieldbus_Title_4::Text%/ctrl%", "To " + Component_Name + " From PLC Byte " + (Start_Byte_Offset + 2) + " & " + (Start_Byte_Offset + 3));
	}
	//SLxx Type
	else if (Component_Type == "SL") {
		DB_TargetTable_In = "public.fieldbus_descr_slxx_in";
		DB_TargetTable_Out = "public.fieldbus_descr_slxx_out";
		DB_TargetColumn = "description";

		//Update Titles
		TcHmi.Symbol.writeEx("%ctrl%Fieldbus_Title_1::Text%/ctrl%", "From " + Component_Name + " To PLC Byte " + (Start_Byte_Offset + 0) + " & " + (Start_Byte_Offset + 1));
		TcHmi.Symbol.writeEx("%ctrl%Fieldbus_Title_2::Text%/ctrl%", "To " + Component_Name + " From PLC Byte " + (Start_Byte_Offset + 0) + " & " + (Start_Byte_Offset + 1));
		TcHmi.Symbol.writeEx("%ctrl%Fieldbus_Title_3::Text%/ctrl%", "From " + Component_Name + " To PLC Byte " + (Start_Byte_Offset + 2) + " & " + (Start_Byte_Offset + 3));
		TcHmi.Symbol.writeEx("%ctrl%Fieldbus_Title_4::Text%/ctrl%", "To " + Component_Name + " From PLC Byte " + (Start_Byte_Offset + 2) + " & " + (Start_Byte_Offset + 3));
	}
	//LSRxx Type
	else if (Component_Type == "LSR") {
		DB_TargetTable_In = "public.fieldbus_descr_lsrxx_in";
		DB_TargetTable_Out = "public.fieldbus_descr_lsrxx_out";
		DB_TargetColumn = "description";

		//Update Titles
		let word_offset = Start_Byte_Offset/ 2;
		TcHmi.Symbol.writeEx("%ctrl%Fieldbus_Title_1::Text%/ctrl%", "From " + Component_Name + " To PLC Word " + word_offset);
		TcHmi.Symbol.writeEx("%ctrl%Fieldbus_Title_2::Text%/ctrl%", "To " + Component_Name + " From PLC Word " + word_offset);
		TcHmi.Symbol.writeEx("%ctrl%Fieldbus_Title_3::Text%/ctrl%", "From " + Component_Name + " To PLC Word " + (word_offset + 1));
		TcHmi.Symbol.writeEx("%ctrl%Fieldbus_Title_4::Text%/ctrl%", "To " + Component_Name + " From PLC Word " + (word_offset + 1));
	}
	//Default Case
	else {
		DB_TargetTable_In = null;
		DB_TargetTable_Out = null;
		DB_TargetColumn = null;

	}

	
	//ReadEX2 runs asynchronous when dealing with Server Symbols so traditional for loops would not work here.
	//(The for loop would count past each async call to readEX2
	//Therefore we must count through each required readEX2 asynchronously and await the finish before incrementing

	//For In or Out Displays
	const display_types = ["In", "Out"];
	display_types.forEach((display_type) => {

		//Each Byte display
		const byte_display_count = [1, 2, 3, 4];
		byte_display_count.forEach((byte_display) => {

			
		    if (DB_TargetTable_In != null) {
		        var DB_LocationStart = 1 + ((byte_display - 1) * 8) + ((Start_Byte_Offset) * 8);
		        var DB_LocationEnd = DB_LocationStart + 7;

		        //Select which display types we're updating and grab the range of descriptions
		        if (display_type == "In") {
		            var SQL_Query = "SELECT " + DB_TargetColumn + " FROM " + DB_TargetTable_In + " WHERE id BETWEEN " + DB_LocationStart +" AND "+ (DB_LocationEnd) + " Order by id ASC";
                }
		        if (display_type == "Out") {
		            var SQL_Query = "SELECT " + DB_TargetColumn + " FROM " + DB_TargetTable_Out + " WHERE id BETWEEN " + DB_LocationStart + " AND " + (DB_LocationEnd) + " Order by id ASC";
		        }

		        //Set Query String in PostgreSQL Server Extension
		        TcHmi.Symbol.writeEx("%s%GTAC_TcUI_PostgreSQL.setQUERY%/s%", SQL_Query);

		        //Trigger DB Read
		        TcHmi.Symbol.readEx2("%s%GTAC_TcUI_PostgreSQL.READ%/s%", function (data) {
		            if (data.error === TcHmi.Errors.NONE) {
		                //Retrieve data from response object                                        		
		                var DB_Read_Response = data.value;
		                var DB_Read_ResponseArray = DB_Read_Response.split('*'); //Parse out row data seperated by '*'
		                //Loop through each byte indicator
		                const row_count = [0, 1, 2, 3, 4, 5, 6, 7];
		                row_count.forEach((row) => {
		                    //Update Text field with DB Data
		                    TcHmi.Symbol.writeEx("%ctrl%GTACxx_Fieldbus_" + display_type + "Byte" + byte_display + "::text_ind_" + row + "%/ctrl%", DB_Read_ResponseArray[row]);
		                    });//End of row_count.forEach (Indicator)

		            } else {
		                // Handle error
		                const row_count = [0, 1, 2, 3, 4, 5, 6, 7];
		                row_count.forEach((row) => {
		                    TcHmi.Symbol.writeEx("%ctrl%GTACxx_Fieldbus_" + display_type + "Byte" + byte_display + "::text_ind_" + row + "%/ctrl%", "DB Read Error: " + data.error);

		                });//End of row_count.forEach (Indicator)
		            }
		        });

		    } else {
		        TcHmi.Symbol.writeEx("%ctrl%GTACxx_Fieldbus_" + display_type + "Byte" + byte_display + "::text_ind_" + row + "%/ctrl%", "Unknown Component Type");
		    }
		
	
		});//End of byte_display_count.forEach (Byte)

	});//End of display_types.forEach (In, Out)

}//End of function



/*------------------------------------------------------------------------------------------
A function to bind plc variables to the byte displays on the fieldbus screen
Created: Brent Lekx-Toniolo (partially ported from c.drees action editor work)
------------------------------------------------------------------------------------------*/
function update_fieldbus_io() {

	//Grab Component Type
	var Component_Type = TcHmi.Symbol.readEx("%i%Component_Type%/i%");
	var Component_Num = TcHmi.Symbol.readEx("%i%Component_Num%/i%");
	var Fieldbus_ByteOffset = TcHmi.Symbol.readEx("%i%GTACxx_FieldbusByteOffset%/i%");

	//Rxx Type
	if (Component_Type == "R") {
		//In Image
		for (let i = 1; i <= 4; i++) {
			TcHmi.Symbol.readEx2("%s%PLC1..Out_To_ICxx::Robot[" + Component_Num + "]::In_Image::BYTE_[" + (Fieldbus_ByteOffset + i) + "]%/s%", function (data) {
				if (data.error === TcHmi.Errors.NONE) {
					//Retrieve data from response object                                        		
					TcHmi.Symbol.writeEx("%ctrl%GTACxx_Fieldbus_InByte"+i+"::Data%/ctrl%", data.value);
				} else {
					//Handle error
					console.log("GTAC: update_fieldbus_io() -> Failed to read symbol: " + Component_Type);
				}
			});
		}
		//Out Image
		for (let i = 1; i <= 4; i++) {
			TcHmi.Symbol.readEx2("%s%PLC1..Out_To_ICxx::Robot[" + Component_Num + "]::Out_Image::Byte_[" + (Fieldbus_ByteOffset + i) + "]%/s%", function (data) {
				if (data.error === TcHmi.Errors.NONE) {
					//Retrieve data from response object                                        		
					TcHmi.Symbol.writeEx("%ctrl%GTACxx_Fieldbus_OutByte" + i + "::Data%/ctrl%", data.value);
				} else {
					//Handle error
					console.log("GTAC: update_fieldbus_io() -> Failed to read symbol: " + Component_Type);
				}
			});
		}

	//STxx Type
	} else if (Component_Type == "ST") {
		//In Image
		for (let i = 0; i <= 3; i++) {
			TcHmi.Symbol.readEx2("%s%PLC1..Out_To_ICxx::Stud[" + Component_Num + "]::In_Image::Byte" + (Fieldbus_ByteOffset + i) + "%/s%", function (data) {
				if (data.error === TcHmi.Errors.NONE) {
					//Retrieve data from response object
					TcHmi.Symbol.writeEx("%ctrl%GTACxx_Fieldbus_InByte" + (i + 1) + "::Data%/ctrl%", data.value);
				} else {
					//Handle error
					console.log("GTAC: update_fieldbus_io() -> Failed to read symbol: " + Component_Type);
				}
			});
		}
		//Out Image
		for (let i = 0; i <= 3; i++) {
			TcHmi.Symbol.readEx2("%s%PLC1..Out_To_ICxx::Stud[" + Component_Num + "]::Out_Image::Byte" + (Fieldbus_ByteOffset + i) + "%/s%", function (data) {
				if (data.error === TcHmi.Errors.NONE) {
					//Retrieve data from response object                                        		
					TcHmi.Symbol.writeEx("%ctrl%GTACxx_Fieldbus_OutByte" + (i + 1) + "::Data%/ctrl%", data.value);
				} else {
					//Handle error
					console.log("GTAC: update_fieldbus_io() -> Failed to read symbol: " + Component_Type);
				}
			});
		}

	//SLxx Type
	} else if (Component_Type == "SL") {
		//In Image
		for (let i = 0; i <= 3; i++) {
			TcHmi.Symbol.readEx2("%s%PLC1..Out_To_ICxx::SL[" + Component_Num + "]::In_Image::Byte" + (Fieldbus_ByteOffset + i) + "%/s%", function (data) {
				if (data.error === TcHmi.Errors.NONE) {
					//Retrieve data from response object
					TcHmi.Symbol.writeEx("%ctrl%GTACxx_Fieldbus_InByte" + (i + 1) + "::Data%/ctrl%", data.value);
				} else {
					//Handle error
					console.log("GTAC: update_fieldbus_io() -> Failed to read symbol: " + Component_Type);
				}
			});
		}
		//Out Image
		for (let i = 0; i <= 3; i++) {
			TcHmi.Symbol.readEx2("%s%PLC1..Out_To_ICxx::SL[" + Component_Num + "]::Out_Image::Byte" + (Fieldbus_ByteOffset + i) + "%/s%", function (data) {
				if (data.error === TcHmi.Errors.NONE) {
					//Retrieve data from response object                                        		
					TcHmi.Symbol.writeEx("%ctrl%GTACxx_Fieldbus_OutByte" + (i + 1) + "::Data%/ctrl%", data.value);
				} else {
					//Handle error
					console.log("GTAC: update_fieldbus_io() -> Failed to read symbol: " + Component_Type);
				}
			});
		}

	//LSRxx Type
	} else if (Component_Type == "LSR") {
		let word_offset = Fieldbus_ByteOffset / 2;
		//In Image
		for (let i = 0; i <= 1; i++) {
			TcHmi.Symbol.readEx2("%s%PLC1..Out_To_ICxx::LSR[" + Component_Num + "]::In_Image::Laser_Out[" + (word_offset + i) + "]%/s%", function (data) {
				if (data.error === TcHmi.Errors.NONE) {
					//Retrieve data from response object
						TcHmi.Symbol.writeEx("%ctrl%GTACxx_Fieldbus_InByte" + (i + i + 1) + "::Data%/ctrl%", data.value);
						TcHmi.Symbol.writeEx("%ctrl%GTACxx_Fieldbus_InByte" + (i + i + 2) + "::Data%/ctrl%", (data.value >> 8));
				} else {
					//Handle error
					console.log("GTAC: update_fieldbus_io() -> Failed to read symbol: " + Component_Type);
				}
			});
		}
		//Out Image
		for (let i = 0; i <= 1; i++) {
			TcHmi.Symbol.readEx2("%s%PLC1..Out_To_ICxx::LSR[" + Component_Num + "]::Out_Image::Laser_In[" + (word_offset + i) + "]%/s%", function (data) {
				if (data.error === TcHmi.Errors.NONE) {
					//Retrieve data from response object
					TcHmi.Symbol.writeEx("%ctrl%GTACxx_Fieldbus_OutByte" + (i + i + 1) + "::Data%/ctrl%", data.value);
					TcHmi.Symbol.writeEx("%ctrl%GTACxx_Fieldbus_OutByte" + (i + i + 2) + "::Data%/ctrl%", (data.value >> 8));
				} else {
					//Handle error
					console.log("GTAC: update_fieldbus_io() -> Failed to read symbol: " + Component_Type);
				}
			});
		}

	}

}//End of function
