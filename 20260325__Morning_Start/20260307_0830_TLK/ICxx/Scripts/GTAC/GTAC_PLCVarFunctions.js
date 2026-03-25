// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.760.59/runtimes/native1.12-tchmi/TcHmi.d.ts" />



//---------------------------------------------------------------------------
// A collection of js functions to deal with async PLC variable exchanges, see description of each
// 
//  author: b.lekx-toniolo and r.jones
//  Last edit: 20250124 - initial concept
//---------------------------------------------------------------------------


//--------------------------------------------------------------------------------------
//-------------- PLC Read Variable Function (with Promise return) ----------------------
//------- Note: Intellisense will likely throw a red line under "function", igonre -----
//----------------- (Dear me why didn't we figure out Promises sooner) -----------------
//--------------------------------------------------------------------------------------
async function GTAC_ReadPLCVar(symbol){
    return new Promise ((resolve, reject) =>{
        TcHmi.Symbol.readEx2(symbol, function (data) {
            if (data.error === TcHmi.Errors.NONE) {
                resolve(data.value);
            } else {
                const errorObject = {
                    ErrorCode: data.error,
                    ErrorText: "GTAC_ReadPLCVar() -> Can't read PLC symbol: "+symbol
                };
                reject(errorObject);
            }
        }); //End of ReadEx2
    }); //End of Promise
}


//--------------------------------------------------------------------------------------
//-------------- PLC Write Variable Function (with Promise return) ----------------------
//--------------------------------------------------------------------------------------
async function GTAC_WritePLCVar(symbol, value){
    return new Promise ((resolve, reject) =>{
        TcHmi.Symbol.writeEx(symbol, value, function (data) {
            if (data.error === TcHmi.Errors.NONE) {
                resolve(data.value);
            } else {
                const errorObject = {
                    ErrorCode: data.error,
                    ErrorText: "GTAC_WritePLCVar() -> Can't write PLC symbol: "+symbol
                };
                reject(errorObject);
            }
        }); //End of ReadEx2
    }); //End of Promise
}
