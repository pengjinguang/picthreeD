init();
function init() {
    var oImg = $('img');
    var len = oImg.length;
    var deg = 360 / len;
    for (var i = 0; i < len; i++) {
        $(oImg[i]).css({
            transform: 'rotateY(' + i * deg + 'deg) translateZ(350px)',
            transition: 'transform ' + (len - 1 - i) * 0.1 + 's'
        });
    }
    bindEvent();
}
function bindEvent() {
    var oWrap = $('.box');
    var body = $('body');
    var lastX, lastY, nowX, nowY, disX = 0, disY = 0;
    var roX = 0, roY = 0;
    var timer;
    body.on('mousedown', function (e) {
        clearInterval(timer);
        var event = e || window.event;
        lastX = event.clientX;
        lastY = event.clientY;
        body.on('mousemove', function (e) {
            var event = e || window.event;
            nowX = event.clientX;
            nowY = event.clientY;
            disX = nowX - lastX;
            disY = nowY - lastY;
            // 左往右
            roY += disX * 0.2;
            // 上往下
            roX -= disY * 0.2;
            oWrap.css({
                transform: 'rotateX(' + roX + 'deg)  rotateY(' + roY + 'deg)'
            });
            lastX = nowX;
            lastY = nowY;
        });
        body.on('mouseup', function () {
            body.off('mousemove');
            timer = setInterval(function () {
                disX *= 0.98;
                disY *= 0.98;
                roY += disX * 0.2;
                roX -= disY * 0.2;
                oWrap.css({
                    transform: 'rotateX(' + roX + 'deg)  rotateY(' + roY + 'deg)'
                });
                if (Math.abs(disX) < 0.1 && Math.abs(disY) < 0.1) {
                    clearInterval(timer);
                }
            }, 20);
        });
        return false;
    })
}