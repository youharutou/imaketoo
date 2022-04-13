var uc_tabs;
var tab_list;
var tab_li;
var uc_ct_list;
var uc_ct_item;
var ucStep;
$(window).load(function(){
	$(".uc_item").first().fadeIn(500).animate({left: 0},{duration: 500, queue: false});
	$(".uc_ct_item").not(".uc_ct_index").height(1);
	$(".tab_list").data("num",0);
	$(window).trigger('resize');
}).resize(function(){
	if($(".md_menu").is(":visible")){
		$(".md_menu").height($(window).height());
		$(".uc_index").outerWidth($(window).width() * 0.22).outerHeight($(window).height());
		$(".md_main_part").width($(window).width() - $(".md_menu").width() - $(".uc_index").outerWidth()).css("marginLeft", $(".md_menu").width() + $(".uc_index").outerWidth());
	}
	if($(".sm_menu").is(":visible")){
		uc_tabs = $(".uc_tabs");
		tab_list = $(".tab_list");
		tab_li = $(".tab_list li");
		uc_ct_list = $("#uc_ct_list");
		uc_ct_item = $(".uc_ct_item");
		tab_li.outerWidth(uc_tabs.width() / 6);
		uc_ct_item.outerWidth(uc_tabs.width());
		ucStep = uc_tabs.width();
		uc_ct_list.css("left", -tab_li.filter(".current").index() * ucStep).data("step", ucStep);
		tab_list.css("left", -tab_list.data("num") * tab_li.outerWidth());
	}
	if($(".xs_menu").is(":visible")){
		uc_tabs = $(".uc_tabs");
		tab_list = $(".tab_list");
		tab_li = $(".tab_list li");
		uc_ct_list = $("#uc_ct_list");
		uc_ct_item = $(".uc_ct_item");
		tab_li.outerWidth(uc_tabs.width() / 3);
		uc_ct_item.outerWidth(uc_tabs.width());
		ucStep = uc_tabs.width();
		uc_ct_list.css("left", -tab_li.filter(".current").index() * ucStep).data("step", ucStep);
		tab_list.css("left", -tab_list.data("num") * tab_li.outerWidth());
		$(".xs_menu_list").css("top", ($(window).height() - $(".xs_menu_list").height()) / 2);
	}
});
setTimeout(function(){
	$(".uc_menu li").click(function(){
		fadeSwitch($(this),$(".uc_item"),$(this).index());
	});
	$(".tab_list li").click(function(){
		ucSwitch(tab_li,uc_ct_list,ucStep,tab_li.index(this));
	});
	if(supportTouche){
		gestureSwitch(tab_li,uc_ct_list,ucSwitch);
	}
}, 1000);