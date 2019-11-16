/* 
    遵从AMD规范
*/
define(["jquery"],function($){
    function download(){
        $.ajax({
            url:"../data/nav.json",
            success:function(obj){
                console.log(obj);
                var bannerArr = obj.banner;
               for(var i = 0; i < bannerArr.length; i++){
                   $(`<a href="${bannerArr[i].url}"  style="display: ${i == 0 ? "block" : "none"}; opacity: ${i == 0 ? 1 : 0.2};">
                   <img class="swiper-lazy swiper-lazy-loaded" src="${bannerArr[i].img}" alt="">
                 </a>`).appendTo($("#J_homeSwiper .swiper-slide"));
                 $(`<a href="#" class = 'swiper-pagination-bullet ${i == 0 ? "swiper-pagination-bullet-active" : ""}'></a>`).appendTo($("#J_homeSwiper .swiper-pagination"))

               } 
                //左侧侧边栏的数据取出
                var sideNavArr = obj.sideNav;
                for(var i = 0; i < sideNavArr.length; i++){
                    var childArr = sideNavArr[i].child;

                    //计算一共要多少列
                    var col = Math.ceil(childArr.length / 90)

                    var node = $(`<li class = 'category-item'>
                        <a href="/index.html" class = 'title'>
                            ${sideNavArr[i].title}
                            <em class = 'iconfont-arrow-right-big'></em>
                        </a>
                        <div class="children clearfix children-col-${col}" style = 'display:none'>
                            
                        </div>
                    </li>`);
                    node.appendTo($("#J_categoryList"));

                    //取出当前分类下所有的数据

                    
                    for(var j = 0; j < childArr.length; j++){
                        if(j % 90 == 0){
                            var oUl = $(`<ul class="children-list children-list-col children-list-col-1">  
                            </ul>`);
                        }
                        $(` <li>
                        <a href="#">
                            <span class="text">${childArr[j].title}</span>
                        </a>
                    </li>`).appendTo(oUl);
                        oUl.appendTo(node.find(".children"));
                    }
                }
            }
        })
    }
  //轮播图效果
  function leftNavTab(){
    $("#J_categoryList").on("mouseenter", ".category-item", function(){
        $(this).addClass("category-item-active")
        $(this).find(".children").show();
    })
    $("#J_categoryList").on("mouseleave", ".category-item", function(){
        $(this).removeClass("category-item-active")
        $(this).find(".children").hide();
    })
}

        function bannerTab(){
            var timer = null;
            var iNow = 0;
    
            timer = setInterval(function(){
                iNow++;
                tab();
            }, 2000);
    
    
            function tab(){
                var aImgs = $("#J_homeSwiper .swiper-slide").find("a");
                var aBtns = $("#J_homeSwiper .swiper-pagination").find("a");
    
                aImgs.css("opacity", 0.2).hide().eq(iNow).show().animate({
                    opacity: 1
                }, 800, function(){
                    if(iNow == aBtns.size() - 1){
                        iNow = -1;
                    }
                });
                aBtns.removeClass("swiper-pagination-bullet-active").eq(iNow).addClass("swiper-pagination-bullet-active");
    
            }
        }
    return {
        download: download,
        bannerTab: bannerTab,
        leftNavTab:leftNavTab
    }
})