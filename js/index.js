var ban_win;
var _ban_list;
var v_ban_list;
var ban_li;
var _handle;
var _prev;
var _next;
var ban_i = 0;
var v_ban_i = 0;
var ban_step;
var banbool = true;
var vbanbool = true;
var base_l = $(".md_main_part .ban_list li").length;
var v_ban_time = setInterval("v_ban_autoSlide()",5000);
var ban_time = setInterval("ban_autoSlide()",5000);
if(!supportTouche){$(".md_main_part .ban_win").hover(function(){clearInterval(ban_time);}, function(){ban_time = setInterval("ban_autoSlide()",5000);});}
$(window).load(function(){
	$(window).trigger('resize');
}).resize(function(){
	var dif;
	if($(".md_main_part").is(":visible")){
		$(".md_main_part").width($(window).width() - $(".md_menu").width());
		$(".md_main_part .banner").css("width", "90%");
		ban_win = $(".md_main_part .ban_win");
		_ban_list = $(".md_main_part .ban_list");
		_handle = $(".md_main_part .ban_handle li");
		waterfall($(".md_index_goodslist"),$(".md_index_goodslist_box"));
		dif = $(window).height() - Math.round(clearLetter($(".md_main_part .banner_box").css("paddingTop"))) - ban_win.prev().outerHeight() - $(".title",_ban_list).outerHeight();
		if(ban_win.width() > dif){
			ban_win.parent().width(dif - 20);
		}
		ban_li = $("li", _ban_list);
		if(ban_li.length < base_l + 1){
			ban_li.first().clone().appendTo(_ban_list);
		}
		$("li", _ban_list).width(ban_win.width());
		$(".ban_img", _ban_list).height(ban_win.width());
		ban_win.height(ban_li.height());
		if(supportTouche && banbool){
			gestureT(_ban_list,ban_autoSlide,ban_time,_handle);
			banbool = false;
		}
		_ban_list.css("left", -ban_i * ban_win.width() + "px");
	}
	if($(".sm_main_part").is(":visible")){
		$(".sm_main_part").height($(window).height() - $(".sm_menu").height());
		$(".sm_main_part .banner").css("width", "90%");
		waterfall($(".sm_index_goodslist"),$(".sm_index_goodslist_box"));
		if($(window).width() > $(window).height()){
			$(".padtransverse").show();
			$(".padvertical").hide();
			ban_win = $(".padtransverse .ban_win");
			_ban_list = $(".padtransverse .ban_list");
			_handle = $(".padtransverse .ban_handle li");
			dif = $(".sm_main_part").height() - Math.round(clearLetter($(".padtransverse").css("paddingTop"))) - ban_win.prev().outerHeight() - $(".title",_ban_list).outerHeight();
			if(ban_win.width() > dif){
				ban_win.parent().width(dif - 20);
			}
			ban_li = $("li", _ban_list);
			if(ban_li.length < base_l + 1){
				ban_li.first().clone().appendTo(_ban_list);
			}
			$("li", _ban_list).width(ban_win.width());
			$(".ban_img", _ban_list).height(ban_win.width());
			ban_win.height(ban_li.height());
			if(supportTouche && banbool){
				gestureT(_ban_list,ban_autoSlide,ban_time,_handle);
				banbool = false;
			}
			_ban_list.css("left", -ban_i * ban_win.width() + "px");
		}
		else {
			$(".padvertical").show();
			$(".padtransverse").hide();
			ban_win = $(".padvertical .ban_win");
			v_ban_list = $(".v_ban_list");
			_prev = $(".prev_h");
			_next = $(".next_h");
			dif = $(".sm_main_part").height() - Math.round(clearLetter($(".padvertical").css("paddingTop"))) - ban_win.prev().outerHeight() - 80;
			if(ban_win.width() * 2 > dif){
				ban_win.parent().width(dif / 2);
			}
			ban_li = $("li", v_ban_list);
			if(ban_li.length < base_l + 2){
				ban_li.slice(0,2).clone().appendTo(v_ban_list);
			}
			$("li", v_ban_list).width(ban_win.width());
			$(".ban_img", v_ban_list).height(ban_win.width());
			ban_win.height(ban_li.height() * 2);
			if(supportTouche && vbanbool){
				gestureV(v_ban_list,v_ban_autoSlide,v_ban_time,_prev,_next);
				vbanbool = false;
			}
			v_ban_list.css("top", -v_ban_i * ban_win.width() + "px");
		}
	}
	if($(".xs_main_part").is(":visible")){
		ban_win = $(".xs_main_part .ban_win");
		_ban_list = $(".xs_main_part .ban_list");
		_handle = $(".xs_main_part .ban_handle li");
		ban_li = $("li", _ban_list);
		if(ban_li.length < base_l + 1){
			ban_li.first().clone().appendTo(_ban_list);
		}
		$("li", _ban_list).width(ban_win.width());
		$(".ban_img", _ban_list).height(ban_win.width());
		ban_win.height(ban_li.height());
		$(".xs_menu_list").css("top", ($(window).height() - $(".xs_menu_list").height()) / 2);
		if(supportTouche && banbool){
			gestureT(_ban_list,ban_autoSlide,ban_time,_handle);
			banbool = false;
		}
		_ban_list.css("left", -ban_i * ban_win.width() + "px");
	}
	ban_step = ban_win.width();
});
setTimeout(function(){
	$(".ban_handle li").click(function(event){
		ban_i = _handle.index(this);//手动点击后更新ban_i的值
		if(this.className == "current"){
			return false;
		}
		else {
			if(ban_i == 0 && _handle.last().hasClass("current")){
				_ban_list.animate({left: -base_l * ban_step + "px"},200,function(){
					_ban_list.css("left", 0);
				});
			}
			else if(ban_i == (base_l - 1) && _handle.first().hasClass("current")){
				_ban_list.css("left", -base_l * ban_step + "px");
				_ban_list.animate({left: -ban_i * ban_step + "px"},200);
			}
			else {
				_ban_list.animate({left: -ban_i * ban_step + "px"},200);
			}
			$(this).addClass("current").siblings().removeClass("current");
		}
		event.stopPropagation();
	});
	$(".next_h").click(function(event){
		if(v_ban_i == (base_l - 1)){
			v_ban_list.animate({top: -(v_ban_i + 1) * ban_step + "px"},200,function(){
				v_ban_list.css("top", 0);
			});
			v_ban_i = 0;
		}
		else {
			v_ban_i++;
			v_ban_list.animate({top: -v_ban_i * ban_step + "px"},200);
		}
		event.stopPropagation();
	});
	$(".prev_h").click(function(event){
		if(v_ban_i == 0){
			v_ban_list.css("top", -base_l * ban_step + "px");
			v_ban_i = base_l;
		}
		v_ban_i--;
		v_ban_list.animate({top: -v_ban_i * ban_step + "px"},200);
		event.stopPropagation();
	});
}, 1000);
function ban_autoSlide(b){
	if(b == undefined){//向左轮播
		ban_i >= base_l - 1 ? ban_i = 0 : ban_i++;
	}
	else {//向右轮播
		ban_i == 0 ? ban_i = base_l - 1 : ban_i--;
	}
	if(_handle){
		_handle.eq(ban_i).trigger('click');
	}
}
function v_ban_autoSlide(){
	if(_next){
		_next.trigger('click');
	}
}