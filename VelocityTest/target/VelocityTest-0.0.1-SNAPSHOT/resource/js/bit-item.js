$(function () {
    //初始化大图属性
    initBigImg();

    function initBigImg(){
        //默认显示第一张大图
        $(".bigimg").eq(0).show();
        $(".prev").hide();
        //默认显示第一张小图
        $(".smallimgbox .red-border").eq(0).show();
        $(".small-prev").hide();
        ImgHover(0, 3);
        ImgHoverClick(4, "next");
        //设置小图长度
        var bigImglistLength = $(".js-hover").size();
        var smallthumbWidth = ($(".smallimgbox img").width()+ 8)*bigImglistLength;
        $(".smallthumbContainer").width(smallthumbWidth);
    }

    $(".prev").click(function () {
        if(!$(".smallthumbContainer").is(":animated")) {
            var lastIndex = $(".bigimg:visible").index();
            //改变小图(需判断是否翻页)
            var bigImglistLength = $(".js-hover").size();
            if (lastIndex - 1 == getBorderIndex() - 5 ||((getBorderIndex() == bigImglistLength-1)&&(lastIndex - 1 == getBorderIndex() - 4))) {
                scrollSmallImg("prev", lastIndex - 1)
            }
            selectSmallImg(lastIndex, lastIndex - 1);
            //改变大图
            selectBigImg(lastIndex, lastIndex - 1, true);
        }
    });

    $(".next").click(function () {
        if(!$(".smallthumbContainer").is(":animated")) {
            var lastIndex = $(".bigimg:visible").index();
            //改变小图(需判断是否翻页)
            var bigImglistLength = $(".js-hover").size();
            if (lastIndex + 1 == getBorderIndex() && lastIndex+1 != bigImglistLength-1) {
                scrollSmallImg("next", lastIndex + 1);
            }
            selectSmallImg(lastIndex, lastIndex + 1);
            //改变大图
            selectBigImg(lastIndex, lastIndex + 1, true);
        }
    });

    $(".bigimgbox").hover(function () {
        var index = $(".bigimg:visible").index();
        if(!isFirstImg(index)){
            $(".prev").show();
        }
        if(!isLastImg(index)){
            $(".next").show();
        }
    }, function () {
        $(".prev").hide();
        $(".next").hide();
    })
    function selectBigImg(lastIndex, index, isHover, isPop){
        var popStr = "";
        if(isPop){
            popStr = "pop-"
        }
        if(!$("."+popStr+"smallthumbContainer").is(":animated")) {
            var bigImglist = $("."+popStr+"bigimg");
            bigImglist.hide();
            bigImglist.eq(index).show();
            $("."+popStr+"current-num").text(index + 1);
            if (isHover) {
                if (isFirstImg(lastIndex)) {
                    $("."+popStr+"prev").show();
                }
                if (isLastImg(lastIndex)) {
                    $("."+popStr+"next").show();
                }
                if (isFirstImg(index)) {
                    $("."+popStr+"prev").hide()
                }
                if (isLastImg(index)) {
                    $("."+popStr+"next").hide();
                }
            }
        }
    }

    //是否第一张
    function isFirstImg(index) {
        if(index == 0){
            return true;
        }else{
            return false;
        }
    }
    //是否最后一张
    function isLastImg(index) {
        var bigImglist = $(".bigimg");
        if(index == bigImglist.size()-1){
            return true;
        }else{
            return false;
        }
    }

    $(".small-prev").click(function () {
        scrollSmallImg("prev");
    });
    $(".small-next").click(function () {
        scrollSmallImg("next");
    });
    //小图滚动
    function scrollSmallImg(str, current) {
        if(!$(".smallthumbContainer").is(":animated")){
            var unitWidth = $(".smallimgbox img").width() + 8;  //每个img宽度
            var marginLeft = Math.abs(parseInt($(".smallthumbContainer").css('marginLeft')));   //marginleft宽度绝对值
            var width = $(".wrapper").width();  //小图tab实际宽度
            var smallthumbWidth = $(".smallthumbContainer").width();    //小图tab总宽度（包括隐藏部分）
            //默认位移宽度
            var shouldMarginLeft = 496
            if ((marginLeft == 0) || (smallthumbWidth - marginLeft == width)) {
                shouldMarginLeft = 443;
            }
            //如果到底了
            if ((marginLeft + width + 4 * unitWidth > smallthumbWidth) && str == "next") {
                shouldMarginLeft = smallthumbWidth - marginLeft - width;
                $(".small-next").hide();
            }
            //如果第一
            if ((marginLeft - 4 * unitWidth < 0) && str == "prev") {
                shouldMarginLeft = marginLeft;
                $(".small-prev").hide();
            }
            //默认当前页选中第一个
            var lastIndex = $(".bigimg:visible").index();
            if (str == "next") {
                $(".small-prev").show();
                $(".smallthumbContainer").animate({marginLeft: '-=' + shouldMarginLeft}, 400, function () {changeSmallImg(current, lastIndex);});  //通过改变left值，达到每次换一个版面
            }
            if (str == "prev") {
                $(".small-next").show();
                $(".smallthumbContainer").animate({marginLeft: '+=' + shouldMarginLeft}, 400, function () {changeSmallImg(current, lastIndex);});  //通过改变left值，达到每次换一个版面
            }
        }
    }
    function changeSmallImg(current, lastIndex) {
        //改变边缘hover为click时间
        var index = getBorderIndex();
        var bigImglistSize = $(".bigimg").size();
        if(index == 4){
            ImgHover(0, index-1);
            ImgHoverClick(index, "next");
            if(current == null || current == undefined || current == ''){
                current = index-4;
            }
            //改变大图
            selectBigImg(lastIndex, current, false);
            //改变小图
            selectSmallImg(lastIndex, current);
        }else if(index == bigImglistSize-1){
            ImgHoverClick(index-4, "prev");
            ImgHover(index-3, index);
            if(current == null || current == undefined || current == ''){
                current = index-3;
            }
            //改变大图
            selectBigImg(lastIndex, current, false);
            //改变小图
            selectSmallImg(lastIndex, current);
        }else{
            ImgHoverClick(index-5, "prev");
            ImgHover(index-4, index-1);
            ImgHoverClick(index, "next");
            if(current == null || current == undefined || current == ''){
                current = index-4;
            }
            //改变大图
            selectBigImg(lastIndex, current, false);
            //改变小图
            selectSmallImg(lastIndex, current);
        }
    }
    //小图hover为click
    function ImgHoverClick(index, str) {
        $(".js-hover").eq(index).unbind();
        $(".js-hover").eq(index).click(function () {
            scrollSmallImg(str, index);
        });
    }
    //小图hover事件
    function ImgHover(start, end) {
        //如果是0,特殊情况
        if(start == 0){
            $(".js-hover").eq(0).unbind();
            $(".js-hover").eq(0).hover(function () {
                var lastIndex = $(".bigimg:visible").index();
                var index = $(this).index()
                //改变大图
                selectBigImg(lastIndex, index, false);
                //改变小图
                selectSmallImg(lastIndex, index);
            });
            start = 1;
        }
        $(".js-hover:gt("+(start-1)+"):lt("+end+")").unbind();
        $(".js-hover:gt("+(start-1)+"):lt("+end+")").hover(function () {
            var lastIndex = $(".bigimg:visible").index();
            var index = $(this).index()
            //改变大图
            selectBigImg(lastIndex, index, false);
            //改变小图
            selectSmallImg(lastIndex, index);
        })
    }

    //小图选中方法
    function selectSmallImg(lastIndex, index) {
        $(".smallimgbox .red-border").hide();
        $(".smallimgbox .red-border").eq(index).show();
    }
    //获取小图边缘图片（不可hover，可以click）
    function getBorderIndex() {
        var unitWidth = $(".smallimgbox img").width() + 8;  //每个img宽度
        var marginLeft = Math.abs(parseInt($(".smallthumbContainer").css('marginLeft')));   //marginleft宽度绝对值
        var width = $(".wrapper").width();  //小图tab实际宽度
        var bIndex = Math.ceil((marginLeft + width)/unitWidth) - 1;
        return bIndex;
    }

    //点击左侧图片弹出大图
    $(".bigimg").click(function () {
        $(".pop-img").show();
        $(".pop-mask").show();
        //当前选中项
        var index = $(".bigimg:visible").index();
        initPopBigImg(index);
    });
    function initPopBigImg(index){
        //默认显示第一张大图
        $(".pop-bigimg").hide();
        $(".pop-bigimg").eq(index).show();
        //编号为1
        $(".pop-current-num").text(index+1);
        if(index == 0){
            $(".pop-prev").hide();
        }else{
            $(".pop-prev").show();
        }
        resizePageIntroWidth();
    }
    $(window).resize(function() {
        resizePageIntroWidth();
    });
    //pop-page-intro 图片介绍居中
    function resizePageIntroWidth() {
        var popBigImgWidth = $(".pop-bigimg img:visible").width();
        console.info(popBigImgWidth);
        var padding = parseInt($(".pop-page-intro").css("padding-left"))+parseInt($(".pop-page-intro").css("padding-right"));
        $(".pop-page-intro").width(popBigImgWidth-padding);
    }
    //弹出大图点击关闭事件
    $("body").bind("click", function (event) {
       if($(event.target).is(".pop-bigimg")){
           $(".pop-img").hide();
           $(".pop-mask").hide();
       }
    });
    //弹出大图点击关闭事件
    $(".pop-close").click(function () {
        $(".pop-img").hide();
        $(".pop-mask").hide();
    });

    $(".pop-prev").click(function () {
        var lastIndex = $(".pop-bigimg:visible").index();
        //改变大图
        selectBigImg(lastIndex, lastIndex - 1, true, "pop-");
    });

    $(".pop-next").click(function () {
        var lastIndex = $(".pop-bigimg:visible").index();
        //改变大图
        selectBigImg(lastIndex, lastIndex + 1, true, true);
    });
})