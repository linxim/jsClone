window.onload = function () {
    var img = document.getElementsByTagName('img');
    var len = img.length;
    var deg = 360 / len;
    // 遍历每一张图片
    for (var i = 0; i < len; i++) {
        img[i].style.transform = 'rotateY(' + deg * i + 'deg) translateZ(200px)';
        // 延迟
        img[i].style.transition = 'transform 0.5s linear' + (len - 1 - i) * 0.1 + 's';

    }
    bindEvent();
}
function bindEvent() {
    var body = document.getElementsByTagName('body')[0];
    var oBox = document.getElementsByClassName('box')[0];
    // disX,dixY是鼠标移动的差值(number)
    var lastX, lastY, nowX, nowY, disX, disY;
    //拖拽   x,y旋转
    var roX = 0, roY = 0;
    var timer ;
    body.onmousedown = function (e) {
        lastX = e.clientX;
        lastY = e.clientY;

        body.onmousemove = function (e) {
            nowX = e.clientX;
            nowY = e.clientY;

            disX = nowX - lastX;
            disY = nowY - lastY;

            roX -= disY * 0.2; //绕Y轴旋转
            roY += disX * 0.2;

            oBox.style.transform = 'rotateX(' + roX + 'deg) rotateY(' + roY + 'deg)';
            // 每次鼠标落下为初始点.在将上一次点赋给初始点。
            lastX = nowX;
            lastY = nowY;
        };
        body.onmouseup = function (e) {
            body.onmousemove = function(){return false;}
            
            //惯性 定时器
            timer = setInterval(function (e) {
                disX *= 0.95;
                disY *= 0.95;
                roX -= disY * 0.1;
                roY += disX * 0.1;
                oBox.style.transform = 'rotateX(' + roX + 'deg) rotateY(' + roY + 'deg)';

                if (Math.abs(disX) < 0.1 && Math.abs(disY) < 0.1) {
                    //清除定时器
                    clearInterval(timer);
                }
            }, 20);
        }
        return false;
    }
}