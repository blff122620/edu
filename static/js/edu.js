(function() {
    //video弹窗处理函数
    var videoPopHandler = function() {

        var videoPop = $$(".video-pop");
        var video = $$(".video-pop video");
        var mask = $$(".mask");
        var videoPopClose = $$(".video-close");
        var cancelVideo = function() {
            videoPop.style.display = "none";
            mask.style.display = "none";
            video.removeAttribute("autoPlay");
            video.pause();
        };
        videoPopClose.onclick = function() {
            cancelVideo();
        };
        var videoButton = $$("#edu-video-play");
        videoButton.onclick = function() {
            videoPop.style.display = "block";
            mask.style.display = "block";
            video.autoplay = true;
            video.load();
        };
        mask.addEventListener("click", function() {
            cancelVideo();
        });
    };

    //轮播处理函数
    var animation = function() {
        var INTERVAL = 5000; //轮播动画5s变一次
        var carouselPoint = $$(".carousel-point"); //ul节点
        var carouselPoints = $$(".carousel-point li"); //li节点数组
        var carouselPics = $$(".carousel-pic"); //轮播图数组
        var carouselPic = $$(".edu-carousel"); //轮播图div
        var cCount = carouselPics.length; //轮播图片个数
        var index = 0;
        var fadeoutIn = function(elements, index) {
            index %= cCount;
            elements[index].classList.add("carousel-fadeout");
            carouselPoints[index].classList.remove("selected");
            carouselPics[index].style.zIndex = 0; //z轴靠后放
            index = (index + 1) % cCount;
            elements[index].classList.remove("carousel-fadeout");
            carouselPoints[index].classList.add("selected");
            carouselPics[index].style.zIndex = 1; //z轴提前
            carouselPics.cTimeout = setTimeout(fadeoutIn, INTERVAL, carouselPics, index);
        }

        carouselPics.cTimeout = setTimeout(fadeoutIn, INTERVAL, carouselPics, index);
        carouselPoint.addEventListener("click", function(event) {
            if (event.target.nodeType != 1 || event.target === carouselPoint) {
                //忽略文本节点和自身ul节点，防止下面index为undefined
                return null;
            }
            clearTimeout(carouselPics.cTimeout); //清除循环，从点击出开始新的循环
            index = $.getNodeIndex(event.target, carouselPoints);
            carouselPics.forEach(function(item) {
                item.classList.add("carousel-fadeout"); //全部淡出 
                item.style.zIndex = 0; //全部放到最后，为了提前点击的那层

            });
            carouselPoints.forEach(function(item) {
                item.classList.remove("selected"); //全部按钮去掉点选状态
            });
            carouselPics[index].classList.remove("carousel-fadeout");
            carouselPoints[index].classList.add("selected");
            carouselPics[index].style.zIndex = 1; //z轴提前
            carouselPics.cTimeout = setTimeout(fadeoutIn, INTERVAL, carouselPics, index);
        });

        //hover状态暂停动画
        carouselPic.addEventListener("mouseover", function(event) {
            clearTimeout(carouselPics.cTimeout);
        });
        //鼠标离开后马上开始循环
        carouselPic.addEventListener("mouseleave", function(event) {
            carouselPics.cTimeout = setTimeout(fadeoutIn, INTERVAL, carouselPics, index);
        });
    };

    //头部广告处理函数
    var topAdHandler = function() {
        var halfMonthDate = new Date();
        halfMonthDate.setDate(halfMonthDate.getDate() + 15);
        if ($.cookie.get("topad") == "close") {
            $$(".edu-top-ad").style.display = "none";
        } else {
            $$(".edu-top-ad").style.display = "block";
        }
        $$("#edu-cancel-top-ad").onclick = function() {
            $$(".edu-top-ad").style.display = "none";
            $.cookie.set("topad", "close", halfMonthDate);
        }
    };


    window.onload = function() {
        videoPopHandler();
        animation();
        topAdHandler();

    };
})();
