// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.756.1/runtimes/native1.12-tchmi/TcHmi.d.ts" />

(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var ICxx;
        (function (ICxx) {


            function GTAC_ReturnEPImage(NodeType) {
                //------------------- Take a Node Type and return a path to the image of said node ------------------------------
                //------------------- Written by: c.drees -------------------------------------------
                //------------------- Last edited: 20250303 (added in null / blank string check), w.griffiths and b.lekx-toniolo --------------------

                if (NodeType != null && NodeType != "") {
                    if (NodeType == 'EP1111') {
                        return "Images/GTAC/Icons/EP1111.png";
                    } else if (NodeType== 'EP1008') {
                        return "Images/GTAC/Icons/EP1008.png";
                    } else if (NodeType=='EP1908') {
                        return "Images/GTAC/Icons/EP1908.png";
                    } else if (NodeType == 'EP3174') {
                        return "Images/GTAC/Icons/EP3174.png";
                    } else if (NodeType == 'EX260-' || NodeType == 'CTEU-E') {
                        return "Images/GTAC/Icons/EX260.png";
                    } else if (NodeType =='EP9224') {
                        return "Images/GTAC/Icons/EP9224.png";
                    } else if (NodeType == 'EP6224') {
                        return "Images/GTAC/Icons/EP6224.png";
                    } else if (NodeType == 'EP2008' || NodeType == 'EP2028' || NodeType == 'EP2624' || NodeType == 'EP2338') {
                        return "Images/GTAC/Icons/EP2008.png";
                    } else {
                        console.log("GTAC_ReturnEPImage(NodeType) -> Unspecified/ unrecognized node type (" + NodeType + "), can't return image");
                    }
                }
     
            }
            ICxx.GTAC_ReturnEPImage = GTAC_ReturnEPImage;
        })(ICxx = Functions.ICxx || (Functions.ICxx = {}));
        Functions.registerFunctionEx('GTAC_ReturnEPImage', 'TcHmi.Functions.ICxx', ICxx.GTAC_ReturnEPImage);
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);