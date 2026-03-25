// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.752.0/runtimes/native1.12-tchmi/TcHmi.d.ts" />
(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var ICxx;
        (function (ICxx) {
            function GTAC_BinaryFormat(Value_To_Format, Length) {

                //-----------Function to return a bit string from DINT type parameter --------
                //----------- Written by b.lekx-toniolo ----------------
                //----------- Last edited: 20220217 --------------------

                if (Value_To_Format != null && Length != null) 
                {

                    var bit_string = (Value_To_Format).toString(2);
                    var bitstring_array = new Array(Length).fill(0);
                    var bit_string_length
                    if (bit_string.length > bitstring_array.length) {
                        bit_string_length = bitstring_array.length;
                    }
                    else {
                        bit_string_length = bit_string.length;
                    }
                    for (let i = 0; i < bit_string_length; i++) {
                        bitstring_array[i] = bit_string[(bit_string_length - 1)- i];
                    }
                    return (bitstring_array);
                }
                else {
                    return "No value for params Value_To_Format or Length given";
                }
            


            }
            ICxx.GTAC_BinaryFormat = GTAC_BinaryFormat;
        })(ICxx = Functions.ICxx || (Functions.ICxx = {}));
        Functions.registerFunctionEx('GTAC_BinaryFormat', 'TcHmi.Functions.ICxx', ICxx.GTAC_BinaryFormat);
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);