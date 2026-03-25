// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.758.8/runtimes/native1.12-tchmi/TcHmi.d.ts" />

(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var ICxx;
        (function (ICxx) {
            function GTAC_DetermineICxx(ICxxValue, Content1, Content2, Content3, NextTarget) {
                let Content_Return = "";
                console.log("NextTarget:" + NextTarget)
                console.log("ICxx Value:"+ICxxValue)
                switch (ICxxValue) {
                    case 1:
                        if (Content1 = "Contents/Line Overview Screens/Line Overview_1.content") { return NextTarget;}
                        else if (Content2 = "Contents/Line Overview Screens/Line Overview_1.content") { return NextTarget; }
                        else if (Content3 = "Contents/Line Overview Screens/Line Overview_1.content") { return NextTarget; }
                        else Content_Return = "Contents/Line Overview Screens/Line Overview_1.content";
                        TcHmi.Symbol.writeEx('%i%AnimateFade%/i%', true);
                        console.log("Content_Return:" + Content_Return)
                        break;

                    case 2:
                        if (Content1 = "Contents/Line Overview Screens/Line Overview_2.content") { return NextTarget; }
                        else if (Content2 = "Contents/Line Overview Screens/Line Overview_2.content") { return NextTarget; }
                        else if (Content3 = "Contents/Line Overview Screens/Line Overview_2.content") { return NextTarget; }
                        else Content_Return = "Contents/Line Overview Screens/Line Overview_2.content";
                        TcHmi.Symbol.writeEx('%i%AnimateFade%/i%', true);
                        console.log("Content_Return:" + Content_Return)
                        break;

                    case 3:
                        if (Content1 = "Contents/Line Overview Screens/Line Overview_3.content") { return NextTarget; }
                        else if (Content2 = "Contents/Line Overview Screens/Line Overview_3.content") { return NextTarget; }
                        else if (Content3 = "Contents/Line Overview Screens/Line Overview_3.content") { return NextTarget; }
                        else Content_Return = "Contents/Line Overview Screens/Line Overview_3.content";
                        TcHmi.Symbol.writeEx('%i%AnimateFade%/i%', true);
                        console.log("Content_Return:" + Content_Return)
                        break;

                    case 4:
                        if (Content1 = "Contents/Line Overview Screens/Line Overview_4.content") { return NextTarget; }
                        else if (Content2 = "Contents/Line Overview Screens/Line Overview_4.content") { return NextTarget; }
                        else if (Content3 = "Contents/Line Overview Screens/Line Overview_4.content") { return NextTarget; }
                        else Content_Return = "Contents/Line Overview Screens/Line Overview_4.content";
                        TcHmi.Symbol.writeEx('%i%AnimateFade%/i%', true);
                        console.log("Content_Return:" + Content_Return)
                        break;

                    case 5:
                        if (Content1 = "Contents/Line Overview Screens/Line Overview_5.content") { return NextTarget; }
                        else if (Content2 = "Contents/Line Overview Screens/Line Overview_5.content") { return NextTarget; }
                        else if (Content3 = "Contents/Line Overview Screens/Line Overview_5.content") { return NextTarget; }
                        else Content_Return = "Contents/Line Overview Screens/Line Overview_5.content";
                        TcHmi.Symbol.writeEx('%i%AnimateFade%/i%', true);
                        console.log("Content_Return:" + Content_Return)
                        break;

                    case 6:
                        if (Content1 = "Contents/Line Overview Screens/Line Overview_6.content") { return NextTarget; }
                        else if (Content2 = "Contents/Line Overview Screens/Line Overview_6.content") { return NextTarget; }
                        else if (Content3 = "Contents/Line Overview Screens/Line Overview_6.content") { }
                        else Content_Return = "Contents/Line Overview Screens/Line Overview_6.content";
                        TcHmi.Symbol.writeEx('%i%AnimateFade%/i%', true);
                        console.log("Content_Return:" + Content_Return)
                        break; return NextTarget;

                    case 7:
                        if (Content1 = "Contents/Line Overview Screens/Line Overview_7.content") { return NextTarget; }
                        else if (Content2 = "Contents/Line Overview Screens/Line Overview_7.content") { return NextTarget; }
                        else if (Content3 = "Contents/Line Overview Screens/Line Overview_7.content") { return NextTarget; }
                        else Content_Return = "Contents/Line Overview Screens/Line Overview_7.content";
                        TcHmi.Symbol.writeEx('%i%AnimateFade%/i%', true);
                        console.log("Content_Return:" + Content_Return)
                        break;

                    case 8:
                        if (Content1 = "Contents/Line Overview Screens/Line Overview_8.content") { return NextTarget; }
                        else if (Content2 = "Contents/Line Overview Screens/Line Overview_8.content") { return NextTarget; }
                        else if (Content3 = "Contents/Line Overview Screens/Line Overview_8.content") { return NextTarget; }
                        else Content_Return = "Contents/Line Overview Screens/Line Overview_8.content";
                        TcHmi.Symbol.writeEx('%i%AnimateFade%/i%', true);
                        console.log("Content_Return:" + Content_Return)
                        break;
                }
                return Content_Return;
            }
            ICxx.GTAC_DetermineICxx = GTAC_DetermineICxx;
        })(ICxx = Functions.ICxx || (Functions.ICxx = {}));
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);
TcHmi.Functions.registerFunctionEx('GTAC_DetermineICxx', 'TcHmi.Functions.ICxx', TcHmi.Functions.ICxx.GTAC_DetermineICxx);
