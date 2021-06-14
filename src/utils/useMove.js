// "use strict";
// exports.__esModule = true;
// 可拖拽组件：pc和Mobile
function useMove(el) {
    el.style.position = 'fixed';
    var offsetX, offsetY, oL, oT, oLeft, oTop;
    var browser = {
        versions: function () {
            var u = navigator.userAgent;
            return {
                mobile: !!u.match(/AppleWebKit.*Mobile.*/)
            };
        }()
    };
    if (!browser.versions.mobile) { //Pc
        if (el != null) {
            el.addEventListener('mousedown', function (event) {
                if (event.button == 0 && el != null) {
                    var lexObj = getComputedStyle(el);
                    offsetX = event.pageX - el.offsetLeft + parseInt(lexObj['margin-left']);
                    offsetY = event.pageY - el.offsetTop + parseInt(lexObj['margin-right']);
                    var move_1 = function (event) {
                        if (el != null) {
                            var x = event.pageX - offsetX;
                            var y = event.pageY - offsetY;
                            if (x < 0) {
                                x = 0;
                            }
                            else if (x > document.documentElement.clientWidth - el.offsetWidth) {
                                x = document.documentElement.clientWidth - el.offsetWidth;
                            }
                            if (y < 0) {
                                y = 0;
                            }
                            else if (y > document.documentElement.clientHeight - el.offsetHeight) {
                                y = document.documentElement.clientHeight - el.offsetHeight;
                            }
                            el.style.left = x + 'px';
                            el.style.top = y + 'px';
                        }
                        return false;
                    };
                    document.addEventListener('mousemove', move_1);
                    var stop_1 = function () {
                        document.removeEventListener('mousemove', move_1);
                        document.removeEventListener('mouseup', stop_1);
                    };
                    document.addEventListener('mouseup', stop_1);
                }
                return false;
            });
        }
    }
    else { //Mobile
        if (el != null) {
            var maxW_1 = document.body.clientWidth - el.offsetWidth;
            var maxH_1 = document.body.clientHeight - el.offsetHeight;
            var defaultEvent_1 = function (e) {
                e.preventDefault();
            };
            el.addEventListener('touchstart', function (e) {
                var ev = e || window.event;
                var touch = ev.targetTouches[0];
                oL = touch.clientX - el.offsetLeft;
                oT = touch.clientY - el.offsetTop;
                document.addEventListener("touchmove", defaultEvent_1, false);
                el.addEventListener('touchmove', function (e) {
                    var ev = e || window.event;
                    var touch = ev.targetTouches[0];
                    oLeft = touch.clientX - oL;
                    oTop = touch.clientY - oT;
                    if (oLeft < 0) {
                        oLeft = 0;
                    }
                    else if (oLeft >= maxW_1) {
                        oLeft = maxW_1;
                    }
                    if (oTop < 0) {
                        oTop = 0;
                    }
                    else if (oTop >= maxH_1) {
                        oTop = maxH_1;
                    }
                    el.style.left = oLeft + 'px';
                    el.style.top = oTop + 'px';
                });
                el.addEventListener('touchend', function () {
                    document.removeEventListener("touchmove", defaultEvent_1);
                });
            });
        }
    }
}
exports["default"] = useMove;