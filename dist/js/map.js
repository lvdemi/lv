/* 
    遵从AMD规范
*/
define(['jquery'], function($){
    function product(){
        $(".small").mouseenter(function(){
            $(".mark,.big").show();
        }).mouseleave(function(){
            $(".mark,.big").hide();
        }).mousemove(function(ev){
            var l = ev.pageX - $(this).offset().left - 50;
            if(l <= 0){
                l = 0;
            }
            if(l >= 350){
                l = 350;
            }

            var t = ev.pageY - $(this).offset().top - 50;
            if(t <= 0){
                t = 0;
            }
            if(t >= 350){
                t = 350;
            }
            $(".mark").css({
                left: l,
                top: t
            })

            //让big下面的图片，反方向，对应倍数移动
            $(".big img").css({
                left: -2 * l,
                top: -2 * t
            })
        })

        

    }
    return {
        product:product,
    }
    
})