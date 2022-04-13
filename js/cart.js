$(window).load(function(){
	$(window).trigger('resize');
}).resize(function(){
	var cartimg_box;
	if($(".md_main_part").is(":visible")){
		cartimg_box = $(".cartbox .cartimg_box");
		if($(".md_menu").is(":visible")){
			$(".md_main_part").css("cssText","height: 100% !important;").width($(window).width() - $(".md_menu").width());
		}
		else {
			$(".md_main_part").css("cssText","width: 100% !important;").height($(window).height() - $(".sm_menu").height());
		}
	}
	if($(".xs_main_part").is(":visible")){
		cartimg_box = $(".xs_cartbox .cartimg_box");
		$(".xs_menu_list").css("top", ($(window).height() - $(".xs_menu_list").height()) / 2);
	}
	cartimg_box.height(cartimg_box.width());
	$("img",cartimg_box).each(function(){
		if($(this).width() > $(this).height()){
			$(this).height(cartimg_box.height()).css({"left": (cartimg_box.width() - $(this).width()) / 2,"top": 0});
		}
		else {
			$(this).width(cartimg_box.width()).css({"left": 0,"top": (cartimg_box.height() - $(this).height()) / 2});
		}
	});
});