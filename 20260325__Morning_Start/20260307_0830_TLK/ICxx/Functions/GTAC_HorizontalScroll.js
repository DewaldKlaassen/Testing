// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.758.8/runtimes/native1.12-tchmi/TcHmi.d.ts" />

(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var ICxx;
        (function (ICxx) {
            function GTAC_HorizontalScroll(ScreenName, ObjectToScroll, StartingOffset) {

                $(document).ready(function () {
                    // check where the shoppingcart-div is  
                    var offset = $(ScreenName).offset();
                    var newPosition =StartingOffset - offset.left;
                        $(ObjectToScroll).animate({ left: newPosition +'px'},'fast');
                });
                
            }
            ICxx.GTAC_HorizontalScroll = GTAC_HorizontalScroll;
        })(ICxx = Functions.ICxx || (Functions.ICxx = {}));
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);
TcHmi.Functions.registerFunctionEx('GTAC_HorizontalScroll', 'TcHmi.Functions.ICxx', TcHmi.Functions.ICxx.GTAC_HorizontalScroll);
