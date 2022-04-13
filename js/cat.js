var scrollelem;
var catlistH;
var overH;
var osTop;
var fixed_bar;
var rc_win;
var _rc_list;
var rc_li;
var _prev;
var _next;
var rc_i = 0;
var rc_step;
var base_l = $(".md_main_part .rc_list li").length;
var rc_time = setInterval("rc_autoSlide()",5000);
if(!supportTouche){$(".md_main_part .rc_win").hover(function(){clearInterval(rc_time);}, function(){rc_time = setInterval("rc_autoSlide()",5000);});}
$(window).load(function(){
	$(window).trigger('resize');
}).resize(function(){
	if($(".md_main_part").is(":visible")){
		if($(".md_menu").is(":visible")){
			$(".md_main_part").css("cssText","height: 100% !important;").width($(window).width() - $(".md_menu").width());
			overH = 0;
		}
		else {
			$(".md_main_part").css("cssText","width: 100% !important;").height($(window).height() - $(".sm_menu").height());
			$(".md_main_part .rc_win").unbind();
			overH = $(".sm_menu").height();
		}
		rc_win = $(".md_main_part .rc_win");
		_rc_list = $(".md_main_part .rc_list");
		_prev = $(".md_main_part .prev_h");
		_next = $(".md_main_part .next_h");
		waterfall($(".md_goods_list"),$(".md_goods_list_box"));
		fixed_bar = $(".md_main_part .fixed_bar");
		fixed_bar.width(fixed_bar.parent().width());
		rc_li = $("li", _rc_list);
		if(rc_li.length < base_l + 4){
			rc_li.slice(0,4).clone().appendTo(_rc_list);
		}
		$("li", _rc_list).width(rc_win.width() * 0.25).height(rc_li.width());
		catlistH = $(".md_main_part .cat_list").outerHeight();
		scrollelem = $(".md_main_part");
	}
	if($(".xs_main_part").is(":visible")){
		rc_win = $(".xs_main_part .rc_win");
		_rc_list = $(".xs_main_part .rc_list");
		_prev = $(".xs_main_part .prev_h");
		_next = $(".xs_main_part .next_h");
		fixed_bar = $(".xs_main_part .fixed_bar");
		fixed_bar.width(fixed_bar.parent().width());
		rc_li = $("li", _rc_list);
		if(rc_li.length < base_l + 1){
			rc_li.first().clone().appendTo(_rc_list);
		}
		$("li", _rc_list).width(rc_win.width()).height(rc_li.width());
		$(".xs_menu_list").css("top", ($(window).height() - $(".xs_menu_list").height()) / 2);
		overH = 0;
		catlistH = $(".xs_main_part .cat_list").outerHeight();
		scrollelem = $("body");
	}
	rc_win.height(rc_li.width());
	rc_step = rc_li.width();
	osTop = getTop(fixed_bar.parent()[0]);
	$(".rc_img", _rc_list).each(function(){
		$(this).css("top", (rc_li.width() - $(this).height()) / 2);
	});
	_rc_list.css("left", -rc_i * rc_step + "px");
});
setTimeout(function(){
	$(".next_h").click(function(event){
		if(rc_i == (base_l - 1)){
			_rc_list.animate({left: -(rc_i + 1) * rc_step + "px"},200,function(){
				_rc_list.css("left", 0);
			});
			rc_i = 0;
		}
		else {
			rc_i++;
			_rc_list.animate({left: -rc_i * rc_step + "px"},200);
		}
		event.stopPropagation();
	});
	$(".prev_h").click(function(event){
		if(rc_i == 0){
			_rc_list.css("left", -base_l * rc_step + "px");
			rc_i = base_l;
		}
		rc_i--;
		_rc_list.animate({left: -rc_i * rc_step + "px"},200);
		event.stopPropagation();
	});
	if(supportTouche){
		gestureT(_rc_list,rc_autoSlide,rc_time,_prev,_next);
	}
}, 1000);
function rc_autoSlide(){
	_next.trigger('click');
}
$(".md_main_part").scroll(function(){
	scrollFix(fixed_bar,osTop,$(this),overH);
});
$(window).scroll(function(){
	scrollFix(fixed_bar,osTop,$(this),overH);
});