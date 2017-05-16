$(function () {
    var nTab = new tab(document.querySelector(".main"), document.querySelector("#center"), "#img");
    nTab.bindFunc();
});


function tab(main, box, tselect) {							//轮播
    var _this = this;
    this.main = main;
    this.box = box;									//包含框
    this.tar = box.querySelector(tselect);			//目标对象
    this.t = null;                                  //轮播定时器
    this.browser_test = {
        IE6: false,
        IE7: false,
        IE8: false,
        IE9: false,
        IE10: false
    };
    this.now = 0;										//当前位置
    this.ready = true;								//是否准备好了
    this.W = this.tar.clientWidth;					//对象宽度
    this.H = this.tar.clientHeight;					//对象高度
    this.animateMethod = ["explode", "flip", "reverseFunc", "cube", "flipPage"];    //动画库
    this.srcs = ["images/waterslice1.jpg", "images/waterslice2.jpg", "images/waterslice3.jpg", "images/waterslice4.jpg", "images/waterslice6.jpg"];			//图片地址


    var img = $('img');
    //注册事件
    img.onmouseenter = function () {
        clearInterval(_this.t);
    };
    img.onmouseleave = function () {
        init();
    };
    //轮播
    function init() {
        _this.t = setInterval(function () {
            var random = Math.floor((Math.random() * (_this.animateMethod.length)));
            var nowAnimateMethod = _this.animateMethod[random];
            _this[nowAnimateMethod](_this.tar);
        }, 2000);
    }
    init();
}

tab.prototype = {				//原型
    /*----------------事件绑定------------------*/
    bindFunc: function () {						//绑定事件
        var a = this;
        var oBtn1 = a.box.querySelector("#btn_explode");
        var oBtn2 = a.box.querySelector("#btn_tile");
        var oBtn3 = a.box.querySelector("#btn_bars");
        var oBtn4 = a.box.querySelector("#btn_cube");
        var oBtn5 = a.box.querySelector("#btn_turn");
        oBtn1.onmouseover = function () {
            a.flip(a.tar);
        }
        oBtn2.onmouseover = function () {
            a.explode(a.tar);
        }
        oBtn3.onmouseover = function () {
            a.reverseFunc(a.tar);
        }
        oBtn4.onmouseover = function () {
            a.cube(a.tar);
        }
        oBtn5.onmouseover = function () {
            a.flipPage(a.tar);
        }
    },
    /*----------------特效方法------------------*/
    explode: function (obj) {							//爆炸
        var a = this;
        var W = a.W, H = a.H, oDiv = obj;
        if (!a.ready)return;
        a.ready = false;
        var R = 4;
        var C = 7;
        var cw = W / 2;
        var ch = H / 2;

        oDiv.innerHTML = '';
        oDiv.style.background = 'url(' + a.srcs[(a.next())] + ') center no-repeat';

        var aData = [];

        var wait = R * C;

        for (var i = 0; i < R; i++) {
            for (var j = 0, k = 0; j < C; j++, k++) {
                aData[i] = {left: W * j / C, top: H * i / R};
                var oNewDiv = document.createElement('div');

                a.setStyle(oNewDiv, {
                    position: 'absolute',
                    background: 'url(' + a.srcs[(a.now)] + ')' + -aData[i].left + 'px ' + -aData[i].top + 'px no-repeat',
                    width: Math.ceil(W / C) + 'px',
                    height: Math.ceil(H / R) + 'px',
                    left: aData[i].left + 'px',
                    top: aData[i].top + 'px'
                });

                oDiv.appendChild(oNewDiv);
                var l = ((aData[i].left + W / (2 * C)) - cw) * a.rnd(2, 3) + cw - W / (2 * C);
                var t = ((aData[i].top + H / (2 * R)) - ch) * a.rnd(2, 3) + ch - H / (2 * R);

                setTimeout((function (oNewDiv, l, t) {
                    return function () {
                        a.buffer(
                            oNewDiv,
                            {
                                left: oNewDiv.offsetLeft,
                                top: oNewDiv.offsetTop,
                                opacity: 100,
                                x: 0,
                                y: 0,
                                z: 0,
                                scale: 1,
                                a: 0
                            },
                            {
                                left: l,
                                top: t,
                                opacity: 0,
                                x: a.rnd(-180, 180),
                                y: a.rnd(-180, 180),
                                z: a.rnd(-180, 180),
                                scale: a.rnd(1.5, 3),
                                a: 1
                            },
                            function (now) {
                                this.style.left = now.left + 'px';
                                this.style.top = now.top + 'px';
                                this.style.opacity = now.opacity / 100;
                                a.setStyle3(oNewDiv, 'transform', 'perspective(500px) rotateX(' + now.x + 'deg) rotateY(' + now.y + 'deg) rotateZ(' + now.z + 'deg) scale(' + now.scale + ')')
                            }, function () {
                                setTimeout(function () {
                                    if (oNewDiv.parentNode == oDiv) {
                                        oDiv.removeChild(oNewDiv);
                                    }
                                    oNewDiv = null;
                                }, 200);

                                if (--wait == 0) {
                                    a.ready = true;
                                    a.now = a.next();
                                }
                            }, 10
                        );
                    };
                })(oNewDiv, l, t), a.rnd(0, 200));
            }
        }
    },
    flip: function (obj) {						//百叶窗翻转
        var a = this;
        var W = a.W, H = a.H, oDiv = obj;
        if (!a.ready)return;
        a.ready = false;
        var R = 3;
        var C = 6;
        var wait = R * C;

        var dw = Math.ceil(W / C);
        var dh = Math.ceil(H / R);

        oDiv.style.background = 'none';
        oDiv.innerHTML = '';

        for (var i = 0; i < C; i++) {
            for (var j = 0; j < R; j++) {
                var oNewDiv = document.createElement('div');
                var t = Math.ceil(H * j / R);
                var l = Math.ceil(W * i / C);

                a.setStyle(oNewDiv, {
                    position: 'absolute',
                    background: 'url(' + a.srcs[(a.now)] + ') ' + -l + 'px ' + -t + 'px no-repeat',
                    left: l + 'px',
                    top: t + 'px',
                    width: dw + 'px',
                    height: dh + 'px'
                });

                (function (oNewDiv, l, t) {
                    oNewDiv.ch = false;

                    setTimeout(function () {
                        a.linear(oNewDiv, {y: 0}, {y: 180}, function (now) {
                            if (now.y > 90 && !oNewDiv.ch) {
                                oNewDiv.ch = true;
                                oNewDiv.style.background = 'url(' + a.srcs[(a.next())] + ') ' + -l + 'px ' + -t + 'px no-repeat';
                            }

                            if (now.y > 90) {
                                a.setStyle3(oNewDiv, 'transform', 'perspective(500px) rotateY(' + now.y + 'deg) scale(-1,1)');
                            }
                            else {
                                a.setStyle3(oNewDiv, 'transform', 'perspective(500px) rotateY(' + now.y + 'deg)');
                            }
                        }, function () {
                            if ((--wait) == 0) {
                                a.ready = true;
                                a.now = a.next();
                            }
                        }, 22);
                    }, /*(i+j*R)*120*/(i + j) * 200);
                })(oNewDiv, l, t);

                oDiv.appendChild(oNewDiv);
                oNewDiv = null;
            }
        }
    },
    reverseFunc: function (obj) {						//扭转
        var a = this;
        var W = a.W, H = a.H, oDiv = obj;
        if (!a.ready)return;
        a.ready = false;
        var C = 7;
        var wait = C;

        var dw = Math.ceil(W / C);

        oDiv.style.background = 'none';
        oDiv.innerHTML = '';

        for (var i = 0; i < C; i++) {
            var oNewDiv = document.createElement('div');

            a.setStyle(
                oNewDiv,
                {
                    width: dw + 'px', height: '100%', position: 'absolute', left: W * i / C + 'px', top: 0
                });
            a.setStyle3(oNewDiv, 'transformStyle', 'preserve-3d');
            a.setStyle3(oNewDiv, 'transform', 'perspective(1000px) rotateX(0deg)');

            (function (oNewDiv, i) {
                oNewDiv.style.zIndex = C / 2 - Math.abs(i - C / 2);

                setTimeout(function () {
                    a.buffer(oNewDiv, {a: 0, x: 0}, {a: 100, x: -90}, function (now) {
                        a.setStyle3(oNewDiv, 'transform', 'perspective(1000px) rotateY(' + ((3 * (i - C / 2)) * (50 - Math.abs(now.a - 50)) / 50) + 'deg) rotateX(' + now.x + 'deg)');
                    }, function () {
                        if (--wait == 0) {
                            a.ready = true;
                            a.now = a.next();
                        }
                    }, 8);
                    //a.setStyle3(oNewDiv, 'transform', 'perspective(1000px) rotateY('+3*(i-C/2)+'deg) rotateX(-45deg)');
                }, (i + 1) * 130);
            })(oNewDiv, i);

            oNewDiv.innerHTML = '<div></div><div></div><div></div><div></div>';

            var oNext = oNewDiv.getElementsByTagName('div')[0];
            var oNow = oNewDiv.getElementsByTagName('div')[1];
            var oBack = oNewDiv.getElementsByTagName('div')[2];
            var oBack2 = oNewDiv.getElementsByTagName('div')[3];

            a.setStyle([oNext, oNow, oBack, oBack2], {
                width: '100%',
                height: '100%',
                position: 'absolute',
                left: 0,
                top: 0
            });
            a.setStyle(oNext, {
                background: 'url(' + a.srcs[(a.next())] + ') ' + -W * i / C + 'px 0px no-repeat'
            });
            a.setStyle3(oNext, 'transform', 'scale3d(0.836,0.836,0.836) rotateX(90deg) translateZ(' + H / 2 + 'px)');

            a.setStyle(oNow, {
                background: 'url(' + a.srcs[(a.now)] + ') ' + -W * i / C + 'px 0px no-repeat'
            });
            a.setStyle3(oNow, 'transform', 'scale3d(0.834,0.834,0.834) rotateX(0deg) translateZ(' + H / 2 + 'px)');

            a.setStyle(oBack, {
                background: '#666'
            });
            a.setStyle3(oBack, 'transform', 'scale3d(0.834,0.834,0.834) rotateX(0deg) translateZ(-' + H / 2 + 'px)');

            a.setStyle(oBack2, {
                background: '#666'
            });
            a.setStyle3(oBack2, 'transform', 'scale3d(0.834,0.834,0.834) rotateX(90deg) translateZ(-' + H / 2 + 'px)');

            oDiv.appendChild(oNewDiv);
            oNewDiv = null;
        }
    },
    cube: function (obj) {								//立方体旋转
        var a = this;
        var W = a.W, H = a.H, oDiv = obj;
        if (!a.ready)return;
        a.ready = false;

        oDiv.innerHTML = '';
        oDiv.style.background = 'none';

        a.setStyle3(oDiv, 'transformStyle', 'preserve-3d');
        a.setStyle3(oDiv, 'transform', 'perspective(1000px) rotateY(0deg)');

        var oNow = document.createElement('div');
        var oNext = document.createElement('div');

        a.setStyle([oNow, oNext], {
            position: 'absolute',
            width: '100%', height: '100%', left: 0, top: 0
        });

        a.setStyle3(oNow, 'transform', 'scale3d(0.741,0.741,0.741) rotate3d(0,1,0,0deg) translate3d(0,0,' + W / 2 + 'px)');
        a.setStyle3(oNext, 'transform', 'scale3d(0.741,0.741,0.741) rotate3d(0,1,0,90deg) translate3d(0,0,' + W / 2 + 'px)');

        oDiv.appendChild(oNext);
        oDiv.appendChild(oNow);

        oNow.style.background = 'url(' + a.srcs[(a.now)] + ') center no-repeat';
        oNext.style.background = 'url(' + a.srcs[(a.next())] + ') center no-repeat';
        //return;
        setTimeout(function () {
            //a.setStyle3(oDiv, 'transition', '1s all ease-in-out');
            a.flex(oDiv, {y: 0}, {y: -90}, function (now) {
                a.setStyle3(oDiv, 'transform', 'perspective(1000px) rotateY(' + now.y + 'deg)');
            }, function () {
                a.setStyle3(oDiv, 'transition', 'none');
                a.setStyle3(oDiv, 'transformStyle', 'flat');
                a.setStyle3(oDiv, 'transform', 'none');

                oDiv.innerHTML = '';
                oDiv.style.background = 'url(' + a.srcs[(a.next())] + ') center no-repeat';

                a.now = a.next();
                a.ready = true;
                oNext = null;
                oNow = null;
            }, 10, 0.6);
        }, 0);
    },
    flipPage: function (obj) {							//翻页
        var a = this;
        var oDiv = obj;
        if (!a.ready)return;
        a.ready = false;

        oDiv.innerHTML = '';
        oDiv.style.background = 'url(' + a.srcs[(a.next())] + ') center no-repeat';

        var oDivPage = document.createElement('div');

        a.setStyle(oDivPage, {
            position: 'absolute', background: 'url(' + a.srcs[(a.now)] + ') right no-repeat', zIndex: 3,
            left: '50%', top: 0, width: '50%', height: '100%', overflow: 'hidden'
        });
        a.setStyle3(oDivPage, 'transform', 'perspective(1000px) rotateY(0deg)');
        a.setStyle3(oDivPage, 'transformOrigin', 'left');

        oDiv.appendChild(oDivPage);


        var oDivOld = document.createElement('div');

        a.setStyle(oDivOld, {
            position: 'absolute', left: 0, top: 0, width: '50%', height: '100%', zIndex: 2,
            background: 'url(' + a.srcs[(a.now)] + ') left no-repeat'
        });

        oDiv.appendChild(oDivOld);
        oDivOld = null;
        var oDivShadow = document.createElement('div');

        a.setStyle(oDivShadow, {
            position: 'absolute', right: 0, top: 0, width: '50%', height: '100%', zIndex: 2,
            background: 'rgba(0,0,0,1)'
        });

        oDiv.appendChild(oDivShadow);

        oDivPage.ch = false;
        a.buffer(oDivPage, {y: 0, opacity: 1}, {y: -180, opacity: 0}, function (now) {
            if (now.y < -90 && !oDivPage.ch) {
                oDivPage.ch = true;
                oDivPage.innerHTML = '<img />';

                var oImg = oDivPage.getElementsByTagName('img')[0];

                oImg.src = a.srcs[(a.next())];
                a.setStyle3(oImg, 'transform', 'scaleX(-1)');

                a.setStyle(oImg, {
                    position: 'absolute', right: 0, top: 0, width: '200%', height: '100%'
                });

                a.setStyle3(oDivPage, 'transformOrigin', 'left');
            }

            if (now.y < -90) {
                a.setStyle3(oDivPage, 'transform', 'perspective(1000px) scale(-1,1) rotateY(' + (180 - now.y) + 'deg)');
            } else {
                a.setStyle3(oDivPage, 'transform', 'perspective(1000px) rotateY(' + now.y + 'deg)');
            }
            oDivShadow.style.background = 'rgba(0,0,0,' + now.opacity + ')';
        }, function () {
            a.now = a.next();
            a.ready = true;
            oDivPage = null;
            oDivShadow = null;
        }, 14);
    },
    /*-----------------------方法---------------------*/
    buffer: function (obj, cur, target, fnDo, fnEnd, fs) {
        var a = this;
        if (a.browser_test.IE6) {
            fnDo && fnDo.call(obj, target);
            fnEnd && fnEnd.call(obj, target);
            return;
        }

        if (!fs)fs = 6;
        var now = {};
        var x = 0;
        var v = 0;

        if (!obj.__last_timer)obj.__last_timer = 0;
        var t = new Date().getTime();
        if (t - obj.__last_timer > 20) {
            fnMove();
            obj.__last_timer = t;
        }

        clearInterval(obj.timer);
        obj.timer = setInterval(fnMove, 20);
        function fnMove() {
            v = Math.ceil((100 - x) / fs);

            x += v;

            for (var i in cur) {
                now[i] = (target[i] - cur[i]) * x / 100 + cur[i];
            }


            if (fnDo)fnDo.call(obj, now);

            if (Math.abs(v) < 1 && Math.abs(100 - x) < 1) {
                clearInterval(obj.timer);
                if (fnEnd)fnEnd.call(obj, target);
            }
        }
    },
    linear: function (obj, cur, target, fnDo, fnEnd, fs) {
        var a = this;
        if (a.browser_test.IE6) {
            fnDo && fnDo.call(obj, target);
            fnEnd && fnEnd.call(obj, target);
            return;
        }
        if (!fs)fs = 50;
        var now = {};
        var x = 0;
        var v = 0;

        if (!obj.__last_timer)obj.__last_timer = 0;
        var t = new Date().getTime();
        if (t - obj.__last_timer > 20) {
            fnMove();
            obj.__last_timer = t;
        }

        clearInterval(obj.timer);
        obj.timer = setInterval(fnMove, 20);

        v = 100 / fs;
        function fnMove() {
            x += v;

            for (var i in cur) {
                now[i] = (target[i] - cur[i]) * x / 100 + cur[i];
            }

            if (fnDo)fnDo.call(obj, now);

            if (Math.abs(100 - x) < 1) {
                clearInterval(obj.timer);
                if (fnEnd)fnEnd.call(obj, target);
            }
        }
    },
    flex: function (obj, cur, target, fnDo, fnEnd, fs, ms) {
        var a = this;
        if (a.browser_test.IE6) {
            fnDo && fnDo.call(obj, target);
            fnEnd && fnEnd.call(obj, target);
            return;
        }
        var MAX_SPEED = 16;

        if (!fs)fs = 6;
        if (!ms)ms = 0.75;
        var now = {};
        var x = 0;	//0-100

        if (!obj.__flex_v)obj.__flex_v = 0;

        if (!obj.__last_timer)obj.__last_timer = 0;
        var t = new Date().getTime();
        if (t - obj.__last_timer > 20) {
            fnMove();
            obj.__last_timer = t;
        }

        clearInterval(obj.timer);
        obj.timer = setInterval(fnMove, 20);

        function fnMove() {
            obj.__flex_v += (100 - x) / fs;
            obj.__flex_v *= ms;

            if (Math.abs(obj.__flex_v) > MAX_SPEED)obj.__flex_v = obj.__flex_v > 0 ? MAX_SPEED : -MAX_SPEED;

            x += obj.__flex_v;

            for (var i in cur) {
                now[i] = (target[i] - cur[i]) * x / 100 + cur[i];
            }


            if (fnDo)fnDo.call(obj, now);

            if (Math.abs(obj.__flex_v) < 1 && Math.abs(100 - x) < 1) {
                clearInterval(obj.timer);
                if (fnEnd)fnEnd.call(obj, target);
                obj.__flex_v = 0;
            }
        }
    },
    rnd: function (n, m) {
        return Math.random() * (m - n) + n;
    },			//随机数
    next: function () {
        var a = this;
        return (a.now + 1) % a.srcs.length;
    },			//下一个
    setStyle: function (obj, json) {								//设置样式
        if (obj.length) {
            for (var i = 0; i < obj.length; i++) {
                arguments.callee(obj[i], json);
            }
        } else {
            for (var i in json) {
                obj.style[i] = json[i];
            }
        }
    },
    setStyle3: function (obj, name, value) {
        obj.style['Webkit' + name.charAt(0).toUpperCase() + name.substring(1)] = value;
        obj.style['Moz' + name.charAt(0).toUpperCase() + name.substring(1)] = value;
        obj.style['ms' + name.charAt(0).toUpperCase() + name.substring(1)] = value;
        obj.style['O' + name.charAt(0).toUpperCase() + name.substring(1)] = value;
        obj.style[name] = value;
    },
}
//左右图片特效
$(function () {
    //点击左右图片，展示大图
    $(".m-left").click(function () {
        $(".ibig1").css("display", "block");
        $("body").css("overflow","hidden");
    });
    $(".m-right").click(function () {
        $(".ibig2").css("display", "block");
        $("body").css("overflow","hidden");
    });
    $("span").click(function () {
        $(".ibig1,.ibig2").css("display", "none");
    });
//添加小动画html标签
    $(".btnstyle").append("<span class='line line-top'></span>"
        +"<span class='line line-right'></span>"
        +"<span class='line line-bottom'></span>"
        +"<span class='line line-left'></span>");

    //鼠标经过导航栏，下拉框显示，导航栏变色
    $(".slide").mouseenter(function () {
        $(this).children("dl").stop().slideDown(200);
    });
    $(".slide").mouseleave(function () {
        $(this).children("dl").stop().slideUp(200);
        $(this).children("dl").css("zIndex", "20");
    });
    $(".header a.change").mouseenter(function () {
        $(this).stop().animate({
            "backgroundColor": "#D51413"
        });
    });
    $(".header a.change").mouseleave(function () {
        $(this).stop().animate({
            "backgroundColor": "#606060"
        });
    });
});

$(function () {
    // 返回顶部
    $(window).scroll(function () {
        if ($(window).scrollTop() >= 800) { //向下滚动像素大于这个值时，即出现小火箭~
            $('.actGotop').fadeIn(300); //火箭淡入的时间，越小出现的越快~
        } else {
            $('.actGotop').fadeOut(300); //火箭淡出的时间，越小消失的越快~
        }
    });
    //火箭动画停留时间，越小消失的越快~
    $('.actGotop').click(function () {
        $('html,body').animate({scrollTop: '0px'}, 1500);

    });

});