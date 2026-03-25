// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.754.4/runtimes/native1.12-tchmi/TcHmi.d.ts" />

(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var ICxx;
        (function (ICxx) {
            function GTAC_BindFieldbus(DeviceType, DeviceNumber, GTACxx_ByteOffset) {
                //----------------------------------------------------------------
                /*
                        Give me:
                            - a string to a target symbol
                            - a Control Object reference 
                            - the property in the control object
                        and I will bind the symbol to the Control Object -> Property

                        --------------------------------------------------------------
                           Code developed off GTAC_Bind.js written by b.lekx-toniolo
                */
                //------------------- Written by: C.Drees -------------------------------------------
                //------------------- Last Edit : 20220420 --------------------------

                //Create internal variables
               // let Control_Property = "Data";
                let Target_String = "";
                let Symbol_String = "";
                let ControlByte = 0;
                let Control = "";
                let HalfByteOffset = 0;
                let HalfControlByte = 0;
                let Control_Property = "Data";
 
                for (ControlByte = 0; ControlByte <= 3; ControlByte++) {
                    for (i = 1; i <= 2; i++) {
                        HalfByteOffset = Math.floor(GTACxx_ByteOffset / 2);
                        HalfControlByte = Math.floor(ControlByte / 2);
                        if (i == 1) {
                            
                            //From Device to PLC data bindings
                            DeviceType = DeviceType.toUpperCase();
                            if (DeviceType == "LASER" || DeviceType == "LSR") {
                                Target_String = "PLC1..Out_To_ICxx::LSR[" + DeviceNumber + "]::In_Image::Laser_Out[" + (HalfByteOffset + HalfControlByte) + "]";
                            } else if (DeviceType == "SL" || DeviceType == "SEAL" || DeviceType == "SEALANT") {
                                Target_String = "PLC1..Out_To_ICxx::SL[" + DeviceNumber + "]::In_Image::Byte" + (GTACxx_ByteOffset + ControlByte);
                            } else if (DeviceType == "ROBOT" || DeviceType == "R") {
                                Target_String = "PLC1..Out_To_ICxx::Robot[" + DeviceNumber + "]::In_Image::BYTE_[" + (GTACxx_ByteOffset + ControlByte + 1) + "]";
                            } else if (DeviceType == "ST" || DeviceType == "STUD") {
                                Target_String = "PLC1..Out_To_ICxx::Stud[" + DeviceNumber + "]::In_Image::Byte" + (GTACxx_ByteOffset + ControlByte);
                            }
                            Control = "GTACxx_Fieldbus_FromByte" + ControlByte;

                        } else {
                            //From Device to PLC data bindings
                            DeviceType = DeviceType.toUpperCase();
                            if (DeviceType == "LASER" || DeviceType == "LSR") {
                                Target_String = "PLC1..Out_To_ICxx::LSR[" + DeviceNumber + "]::Out_Image::Laser_In[" + (HalfByteOffset + HalfControlByte) + "]";
                            } else if (DeviceType == "SL" || DeviceType == "SEAL" || DeviceType == "SEALANT") {
                                Target_String = "PLC1..Out_To_ICxx::SL[" + DeviceNumber + "]::Out_Image::Byte" + (GTACxx_ByteOffset + ControlByte);
                            } else if (DeviceType == "ROBOT" || DeviceType == "R") {
                                Target_String = "PLC1..Out_To_ICxx::Robot[" + DeviceNumber + "]::Out_Image::Byte_[" + (GTACxx_ByteOffset + ControlByte + 1) + "]";
                            } else if (DeviceType == "ST" || DeviceType == "STUD") {
                                Target_String = "PLC1..Out_To_ICxx::Stud[" + DeviceNumber + "]::Out_Image::Byte" + (GTACxx_ByteOffset + ControlByte);
                            }
                            Control = "GTACxx_Fieldbus_ToByte" + ControlByte;
   
                        }
                        const Target_Control_Object = TcHmi.Controls.get(Control);
                        //console.log("GTAC_Msg " + "TargetString:" + Target_String)

                        Symbol_String = "%s%" + Target_String + "%/s%";
                        
                        // General function param error handling
                        if (!DeviceType) throw new Error("Invalid value given for Target_String param: " + DeviceType);
                        if (!DeviceNumber) throw new Error("Invalid value given for Control param: " + DeviceNumber);

                        //First check to see if a binding already exists on the control's property
                        let binding_exists = TcHmi.Binding.resolveEx(Control_Property, Target_Control_Object);

                        TcHmi.Binding.removeEx2(null, Control_Property, Target_Control_Object);

                        TcHmi.Binding.createEx2(Symbol_String, Control_Property, Target_Control_Object);

       
                    }
                }
               





            }
            ICxx.GTAC_BindFieldbus = GTAC_BindFieldbus;
        })(ICxx = Functions.ICxx || (Functions.ICxx = {}));
        Functions.registerFunctionEx('GTAC_BindFieldbus', 'TcHmi.Functions.ICxx', ICxx.GTAC_BindFieldbus);
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);