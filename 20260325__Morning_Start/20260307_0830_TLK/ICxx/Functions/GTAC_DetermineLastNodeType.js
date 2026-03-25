// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.756.1/runtimes/native1.12-tchmi/TcHmi.d.ts" />

(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var ICxx;
        (function (ICxx) {
            function GTAC_DetermineLastNodeType(NodeType) {

                /**
                ------------------- Reads in the entirety of the Node Type Array and returns the last Node ------------------------------
                ------------------- (This is originally menat to be used for Internal Fix Cable Breaks ---------
                ------------------- Written by: c.Drees -------------------------------------------
                ------------------- Last Edit: 06-09-2022 --------------------------
                **/

                let RetVar ='';
                for (let i = 0; i < 63; i++) {
                    if (NodeType[i] !=''){
                        RetVar = NodeType[i];
                    }
                }
                return RetVar;
            }
            ICxx.GTAC_DetermineLastNodeType = GTAC_DetermineLastNodeType;
        })(ICxx = Functions.ICxx || (Functions.ICxx = {}));
        Functions.registerFunctionEx('GTAC_DetermineLastNodeType', 'TcHmi.Functions.ICxx', ICxx.GTAC_DetermineLastNodeType);
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);