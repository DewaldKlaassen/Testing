// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.758.8/runtimes/native1.12-tchmi/TcHmi.d.ts" />

(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var ICxx;
        (function (ICxx) {
            function GTAC_Region_ChkNCorrect() {

                var MainRegion_Content, MainRegion1_Content, MainRegion2_Content;
                var MainRegion_Left, MainRegion1_Left, MainRegion2_Left;
                var Region0Pos = '';
                var Region1Pos = '';
                var Region2Pos = '';
                var EmptyRegion = 0;


                //Check MainRegions for Position and for content

                TcHmi.Symbol.readEx2("%ctrl%MainRegion::RenderedLeft%/ctrl%", function (data) {
                    if (data.error === TcHmi.Errors.NONE) {
                        MainRegion_Left = data.value;
                    }
                });

                console.log("MainRegion_Left:" + MainRegion_Left);
                TcHmi.Symbol.readEx2("%ctrl%MainRegion_2::RenderedLeft%/ctrl%", function (data) {
                    if (data.error === TcHmi.Errors.NONE) {
                        MainRegion1_Left = data.value;
                    }
                });
                console.log("MainRegion2_Left:" + MainRegion1_Left);
                TcHmi.Symbol.readEx2("%ctrl%MainRegion_3::RenderedLeft%/ctrl%", function (data) {
                    if (data.error === TcHmi.Errors.NONE) {
                        MainRegion2_Left = data.value;
                    }
                });
                console.log("MainRegion3_Left:" + MainRegion2_Left);
                TcHmi.Symbol.readEx2("%ctrl%MainRegion::TargetContent%/ctrl%", function (data) {
                    if (data.error === TcHmi.Errors.NONE) {
                        MainRegion_Content = data.value;
                    }
                });
                TcHmi.Symbol.readEx2("%ctrl%MainRegion_2::TargetContent%/ctrl%", function (data) {
                    if (data.error === TcHmi.Errors.NONE) {
                        MainRegion1_Content = data.value;
                    }
                });
                TcHmi.Symbol.readEx2("%ctrl%MainRegion_3::TargetContent%/ctrl%", function (data) {
                    if (data.error === TcHmi.Errors.NONE) {
                        MainRegion2_Content = data.value;
                    }
                });

                //Check for Duplicate Positioning if there is a duplicate position determine Empty Position

                switch (MainRegion_Left) {
                    case -1024:
                        Region0Pos = "Left";
                        if (MainRegion_Left = MainRegion1_Left) {
                            if (MainRegion2_Left = 0) {
                                EmptyRegion = 1024;
                            } else { EmptyRegion = 0; }
                        }
                        if (MainRegion_Left = MainRegion2_Left) {
                            if (MainRegion1_Left = 0) {
                                EmptyRegion = 1024;
                            } else { EmptyRegion = 0; }
                        }

                    case 0:
                        Region0Pos = "Center";
                        if (MainRegion_Left = MainRegion1_Left) {
                            if (MainRegion2_Left = 1024) {
                                EmptyRegion = -1024;
                            } else { EmptyRegion = 1024; }
                        }
                        if (MainRegion_Left = MainRegion2_Left) {
                            if (MainRegion1_Left = 1024) {
                                EmptyRegion = -1024;
                            } else { EmptyRegion = 1024; }
                        }

                    case 1024:
                        Region0Pos = "Right";
                        if (MainRegion_Left = MainRegion1_Left) {
                            if (MainRegion2_Left = 0) {
                                EmptyRegion = -1024;
                            } else { EmptyRegion = 0; }
                        }

                        if (MainRegion_Left = MainRegion2_Left) {
                            if (MainRegion1_Left = 0) {
                                EmptyRegion = -1024;
                            } else { EmptyRegion = 0; }
                        }

                }

                switch (MainRegion1_Left) {
                    case -1024:
                        Region1Pos = "Left";
                        if (MainRegion1_Left = MainRegion2_Left) {
                            if (MainRegion_Left = 0) {
                                EmptyRegion = 1024;
                            } else { EmptyRegion = 0; }
                        }

                    case 0:
                        Region1Pos = "Center";
                        if (MainRegion1_Left = MainRegion2_Left) {
                            if (MainRegion_Left = 1024) {
                                EmptyRegion = -1024;
                            } else { EmptyRegion = 1024; }
                        }
                    case 1024:
                        Region1Pos = "Right";
                        if (MainRegion1_Left = MainRegion2_Left) {
                            if (MainRegion_Left = 0) {
                                EmptyRegion = -1024;
                            } else { EmptyRegion = 0; }
                        }

                }
                switch (MainRegion2_Left) {
                    case -1024:
                        Region2Pos = "Left";
                    case 0:
                        Region2Pos = "Center";
                    case 1024:
                        Region2Pos = "Right";

                }

                console.log("EmptyRegion:" + EmptyRegion);
                //If a Duplicate is determineed, move empty Region to Empty Position
                if ((MainRegion_Left = MainRegion1_Left) || (MainRegion_Left = MainRegion2_Left) || (MainRegion1_Left = MainRegion2_Left)){
                    switch (EmptyRegion) {
                        case -1024:
                            if (MainRegion_Content = '') {
                                $('#MainRegion').animate({ left: '-1024px' }, 'fast');
                            }
                            if (MainRegion1_Content = '') {
                                $('#MainRegion_2').animate({ left: '-1024px' }, 'fast');
                            }
                            if (MainRegion2_Content = '') {
                                $('#MainRegion_3').animate({ left: '-1024px' }, 'fast');
                            }
                        case 0:
                            if (MainRegion_Content = '') {
                                $('#MainRegion').animate({ left: '0px' }, 'fast');
                            }
                            if (MainRegion1_Content = '') {
                                $('#MainRegion_2').animate({ left: '0px' }, 'fast');
                            }
                            if (MainRegion2_Content = '') {
                                $('#MainRegion_3').animate({ left: '0px' }, 'fast');
                            }
                        case 1024:
                            if (MainRegion_Content = '') {
                                $('#MainRegion').animate({ left: '1024px' }, 'fast');
                            }
                            if (MainRegion1_Content = '') {
                                $('#MainRegion_2').animate({ left: '1024px' }, 'fast');
                            }
                            if (MainRegion2_Content = '') {
                                $('#MainRegion_3').animate({ left: '1024px' }, 'fast');
                            }
                    }
            }
                
            }
            ICxx.GTAC_Region_ChkNCorrect = GTAC_Region_ChkNCorrect;
        })(ICxx = Functions.ICxx || (Functions.ICxx = {}));
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);
TcHmi.Functions.registerFunctionEx('GTAC_Region_ChkNCorrect', 'TcHmi.Functions.ICxx', TcHmi.Functions.ICxx.GTAC_Region_ChkNCorrect);
