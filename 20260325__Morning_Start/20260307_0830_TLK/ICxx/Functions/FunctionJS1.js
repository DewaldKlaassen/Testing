// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.758.8/runtimes/native1.12-tchmi/TcHmi.d.ts" />

(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var ICxx;
        (function (ICxx) {
            function FunctionJS1(par1) {

                $(document).ready(function () {
                    // check where the shoppingcart-div is  
                    var offset = $('#IC01_NextArrow').offset();
                        console.log("Offset.Left:"+offset.left)
                    $(window).scroll(function () {
                        var scrollLeft = $(window).scrollLeft(); // check the visible top of the browser  
                            console.log("ScrollLeft:"+(970-scrollLeft))
 //                       if (offset.left < scrollLeft) $('#IC01_NextArrow').addClass('fixed');
 //                       else $('#IC01_NextArrow').removeClass('fixed');
                    });
                });
                
            }
            ICxx.FunctionJS1 = FunctionJS1;
        })(ICxx = Functions.ICxx || (Functions.ICxx = {}));
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);
TcHmi.Functions.registerFunctionEx('FunctionJS1', 'TcHmi.Functions.ICxx', TcHmi.Functions.ICxx.FunctionJS1);
