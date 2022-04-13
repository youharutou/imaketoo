var gsBg;
var bImg;
var gsScale;
var biScale;
var detTab;
var detList;
var detStep;
var ivbool = true;
$(window).load(function(){
	var newimg = new Image();
	newimg.src = $(".goods_bg img").attr("src");
	biScale = newimg.width / newimg.height;
	$(window).trigger('resize');
}).resize(function(){
	var offsetL, offsetT;
	if($(".xs_main_part").is(":visible")){
		detTab = $(".xs_detail_box .tab_a");
		detList = $(".xs_detail_box .goods_ct_list");
		detStep = $(".xs_detail_box .goods_ct").width();
		$(".xs_detail_box .goods_ct_item").width(detStep);
		gsBg = $(".xs_goods_bg");
		bImg = $(".xs_goods_bg img");
		$(".xs_menu_list").css("top", ($(window).height() - $(".xs_menu_list").height()) / 2);
	}
	else {
		if($(".md_menu").is(":visible")){
			$(".md_main_part").css("cssText","height: 100% !important;").width($(window).width() - $(".md_menu").width());
		}
		else {
			$(".md_main_part").css("cssText","width: 100% !important;").height($(window).height() - $(".sm_menu").height());
		}
		waterfall($(".goods_info_li"),$(".goods_info_box"));
		waterfall($(".like_li"),$(".like_pos"));
		gsBg = $(".goods_bg");
		bImg = $(".goods_bg img");
		detTab = $(".detail_box .tab_a");
		detList = $(".detail_box .goods_ct_list");
		detStep = $(".detail_box .goods_ct").width();
		$(".detail_box .goods_ct_item").width(detStep);
	}
	detList.data("step", detStep);
	detList.css("left", -detTab.index(detTab.filter(".current")) * detStep + "px");
	gsScale = gsBg.width() / gsBg.height();                                                              
	if(gsScale > biScale){
		bImg.width(gsBg.width()).height("auto").css({"left": 0,"top": (gsBg.height() - bImg.height()) / 2});
	}
	else {
		bImg.height(gsBg.height()).width("auto").css({"left": (gsBg.width() - bImg.width()) / 2,"top": 0});
	}
	if(ivbool){
		imgView(bImg,gsBg);
		ivbool = false;
	}
	offsetL = getLeft(gsBg[0]);
	offsetT = getTop(gsBg[0]);
	if(!supportTouche){
		bImg.draggable('option', 'containment',[offsetL - bImg.width() + gsBg.width(),offsetT - bImg.height() + gsBg.height(),offsetL,offsetT]);
	}
});
setTimeout(function(){
	$(".tab_a").click(function(){
		Switch(detTab,detList,detStep,detTab.index(this));
	});
	if(supportTouche){
		gestureSwitch(detTab,detList,Switch);
	}
}, 1000);