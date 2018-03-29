'use strict'

+function (win,doc,undefined) {
    var vendors=['webkit','moz','ms','o'];

    win.cancelAnimationFrame = win.cancelAnimationFrame || win.cancelRequestAnimationFrame;

    for (var i=0; !win.requestAnimationFrame && i<vendors.length ; i++ ){
        win.requestAnimationFrame=win[vendors[i]+'RequestAnimationFrame'];
        win.cancelAnimationFrame=win[vendors[i]+'CancelAnimationFrame'] || win[vendors[i]+'CancelRequestAnimationFrame'];
    }

    if (!win.requestAnimationFrame){
        var lastTime=0;

        win.requestAnimationFrame=function (callback,refreshRate) {
            var currentTime=(new Date()).getTime();

            var deltaTime=Math.max(0,16.67-(currentTime-lastTime));

            lastTime=currentTime+deltaTime;

            return setTimeout(function () {
                callback && callback(lastTime);
            },deltaTime);
        };

        win.cancelAnimationFrame=function (id) {
            clearTimeout(id);
        };
    }
}(window,document);