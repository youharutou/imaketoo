function resetCSS(elem,prop){
	var old = {};
	for(key in prop){
		old[key] = elem.style.key;
		elem.style.key = prop[key];
	}
	return old;
}

function revertCSS(elem,prop){
	for(key in prop){
		elem.style.key = prop[key];
	}
}

function getHideHeight(elem,selector){
	var old = resetCSS(elem,{
	display:'block !important',
	visibility:'hidden !important',
	position:'absolute !important'
	});
	var h = $("." + selector,elem).height();
	revertCSS(elem,old);
	return h;
}

function addEvent(elm, evType, fn, useCapture) {  
	if (elm.addEventListener) {  
		elm.addEventListener(evType, fn, useCapture);//DOM2.0  
		return true;  
	}  
	else if (elm.attachEvent) {  
		var r = elm.attachEvent('on' + evType, fn);//IE5+  
		return r;  
	}  
	else {  
		elm['on' + evType] = fn;//DOM 0  
	}  
}

function clearLetter(p){
	var reg=/[^\d|.|-]/g;
	if(reg.test(p)){
		p=p.replace(reg,"");
	}
	return Number(p);
}

function getTop(o) {
    var osTop = o.offsetTop;
    if (o.offsetParent != null) {
        osTop += getTop(o.offsetParent);
    }
    return osTop;
}

function getLeft(o) {
    var osLeft = o.offsetLeft;
    if (o.offsetParent != null) {
        osLeft += getLeft(o.offsetParent);
    }
    return osLeft;
}

function showMenu(t,evt){
	evt.stopPropagation();
	$(t).toggleClass("current");
	$(t).next().toggle();
}

function Switch(tab,list,step,i) {  //带箭头
    if(tab.eq(i).hasClass("current")) {
        return false;
    }
	var _this = tab.eq(i);
	var cLeft = 0;
	var arrow = _this.parent().find("i");
	var mR = clearLetter(tab.css("marginRight"));
	tab.removeClass("current");
	_this.addClass("current");
	list.children().height("auto");
	list.animate({left: -i * step + "px"},200,function(){
		list.children().eq(i).siblings().height(1);
	});
	for(var n=0;n<i;n++){
		cLeft = cLeft + tab.eq(n).width() + mR;
	}
	arrow.animate({left: cLeft + ((_this.width() - arrow.width()) / 2) +"px"},300);
}

function ucSwitch(tab,list,step,i) {  //普通current
    if(tab.eq(i).hasClass("current")) {
        return false;
    }
	var _this = tab.eq(i);
	var n = tab.parent().data("num");
	var maxL = Math.round(step / tab.outerWidth());
	tab.removeClass("current");
	_this.addClass("current");
	list.children().height("auto");
	list.animate({left: -i * step + "px"},200,function(){
		list.children().eq(i).siblings().height(1);
	});
	if(i == n && i != 0){
		tab.parent().data("num", n - 1).animate({left: -(i - 1) * tab.outerWidth() + "px"},500);
	}
	if(i + 1 - n == maxL && i != tab.length - 1){
		tab.parent().data("num",n + 1).animate({left: -(i - maxL + 2) * tab.outerWidth() + "px"},500);
	}
}

function fadeSwitch(t,itm,i){
	if(!t.hasClass("current") && !itm.is(":animated")){
		t.addClass("current").siblings().removeClass("current");
		itm.filter(":visible").fadeOut(500).animate({left: "-25%"},{duration: 500, queue: false, complete: function(){
			itm.eq(i).fadeIn(500).animate({left: 0},{duration: 500, queue: false});
		}});
	}
}

function gestureSwitch(tab,list,fn) {
	var ScoorX, ScoorY, EcoorX, oriLeft, i;
	var FircoorX = 0;
	var FircoorY = 0;
	var direction = 0;//手势方向0为竖，1为横，默认为竖
	list.parent()[0].addEventListener("touchstart",function(event){
		var touch = event.targetTouches[0];
		ScoorX = touch.clientX;
		ScoorY = touch.clientY;
		oriLeft = clearLetter(list.css("left"));
		i = -oriLeft / list.data("step");
	},false);
	list.parent()[0].addEventListener("touchmove",function(event){
		var touch = event.changedTouches[0];
		if(FircoorX == 0){
			FircoorX = touch.clientX;
		}
		if(FircoorY == 0){
			FircoorY = touch.clientY;
		}
		if(Math.abs(FircoorX - ScoorX) > Math.abs(FircoorY - ScoorY)){//判断手势方向
			direction = 1;//横向移动的距离比竖向大，设置手势方向为横
			event.preventDefault();
			if((touch.clientX > ScoorX && i != 0) || (ScoorX > touch.clientX && i != tab.length - 1)){
				list.css("left", oriLeft + touch.clientX - ScoorX);
			}
		}
	},false);
	list.parent()[0].addEventListener("touchend",function(event){
		if(direction == 1){
			var touch = event.changedTouches[0];
			EcoorX = touch.clientX;
			if(ScoorX > EcoorX && i != tab.length - 1){
				i++;
				fn(tab,list,list.data("step"),i);
			}
			if(ScoorX < EcoorX && i != 0){
				i--;
				fn(tab,list,list.data("step"),i);
			}
		}
		direction = 0;//结束手势后，手势方向清零
		FircoorX = 0;
		FircoorY = 0;
	},false);
}

function scrollFix(fb,ostop,scrollele,th){
	if(scrollele.scrollTop() > ostop - th){
		fb.css("position","fixed");
		fb.css("top", th);
		fb.css("z-index","999");
	}
	else {
		fb.css("position", "relative");
		fb.css("top", 0);
	}
}

function cateUnfold(hidlayerH,ostop,scrollele,th){
	var sTop = scrollele.scrollTop();
	var diff = sTop - ostop + th;
	if(diff > 0){
		if(hidlayerH > diff){
			scrollele.animate({scrollTop:ostop - th},200);
		}
		else {
			scrollele.animate({scrollTop:sTop - hidlayerH},200);
		}
	}
}

function cateShrink(hidlayerH,ostop,scrollele,th){
	var sTop = scrollele.scrollTop();
	if(sTop > ostop - th){
		scrollele.animate({scrollTop:sTop + hidlayerH},200);
	}
}

function gestureT(list,autoSlide,timer,handle1,handle2){
	var ScoorX, ScoorY, EcoorX, oriLeft;
	var FircoorX = 0;
	var FircoorY = 0;
	var direction = 0;//手势方向0为竖，1为横，默认为竖
	list.parent()[0].addEventListener("touchstart",function(event){
		clearInterval(timer);
		var touch = event.targetTouches[0];
		ScoorX = touch.clientX;
		ScoorY = touch.clientY;
		oriLeft = clearLetter(list.css("left"));
	},false);
	list.parent()[0].addEventListener("touchmove",function(event){
		var touch = event.changedTouches[0];
		if(FircoorX == 0){
			FircoorX = touch.clientX;
		}
		if(FircoorY == 0){
			FircoorY = touch.clientY;
		}
		if(Math.abs(FircoorX - ScoorX) > Math.abs(FircoorY - ScoorY)){//判断手势方向
			direction = 1;//横向移动的距离比竖向大，设置手势方向为横
			event.preventDefault();
			list.css("left", oriLeft + touch.clientX - ScoorX);
		}
	},false);
	list.parent()[0].addEventListener("touchend",function(event){
		if(direction == 1){
			var touch = event.changedTouches[0];
			EcoorX = touch.clientX;
			if(ScoorX > EcoorX){
				autoSlide();
			}
			if(ScoorX < EcoorX){
				if(handle2 == undefined){
					autoSlide(0);
				}
				else {
					handle1.trigger('click');
				}
			}
		}
		timer = setInterval(function(){autoSlide();},5000);
		direction = 0;//结束手势后，手势方向清零
		FircoorX = 0;
		FircoorY = 0;
	},false);
}
function gestureV(list,autoSlide,timer,handle1,handle2){
	var ScoorX, ScoorY, EcoorY, oriTop;
	var FircoorX = 0;
	var FircoorY = 0;
	var direction = 0;//手势方向0为横，1为竖，默认为横
	list.parent()[0].addEventListener("touchstart",function(event){
		clearInterval(timer);
		var touch = event.targetTouches[0];
		ScoorX = touch.clientX;
		ScoorY = touch.clientY;
		oriTop = clearLetter(list.css("top"));
	},false);
	list.parent()[0].addEventListener("touchmove",function(event){
		var touch = event.changedTouches[0];
		if(FircoorX == 0){
			FircoorX = touch.clientX;
		}
		if(FircoorY == 0){
			FircoorY = touch.clientY;
		}
		if(Math.abs(FircoorY - ScoorY) > Math.abs(FircoorX - ScoorX)){//判断手势方向
			direction = 1;//竖向移动的距离比横向大，设置手势方向为竖
			event.preventDefault();
			list.css("top", oriTop + touch.clientY - ScoorY);
		}
	},false);
	list.parent()[0].addEventListener("touchend",function(event){
		if(direction == 1){
			var touch = event.changedTouches[0];
			EcoorY = touch.clientY;
			if(ScoorY > EcoorY){
				autoSlide();
			}
			if(ScoorY < EcoorY){
				if(handle2 == undefined){
					autoSlide(0);
				}
				else {
					handle1.trigger('click');
				}
			}
		}
		timer = setInterval(function(){autoSlide();},5000);
		direction = 0;//结束手势后，手势方向清零
		FircoorX = 0;
		FircoorY = 0;
	},false);
}

function imgView(img,box){
	if(supportTouche){
		var ScoorX, ScoorY, oriPos, direction, diff;
		var FircoorX = 0;
		var FircoorY = 0;
		box[0].addEventListener("touchstart",function(event){
			var touch = event.targetTouches[0];
			clearLetter(img.css("left")) == 0 ? direction = 0 : direction = 1;//0只能竖向移动，1只能横向移动
			ScoorX = touch.clientX;
			ScoorY = touch.clientY;
			if(direction == 0){
				oriPos = -clearLetter(img.css("top"));
				diff = img.height() - box.height() - oriPos;
			}
			if(direction == 1){
				oriPos = -clearLetter(img.css("left"));
				diff = img.width() - box.width() - oriPos;
			}
		},false);
		box[0].addEventListener("touchmove",function(event){
			event.preventDefault();
			var touch = event.changedTouches[0];
			if(FircoorX == 0){
				FircoorX = touch.clientX;
			}
			if(FircoorY == 0){
				FircoorY = touch.clientY;
			}
			if(direction == 0 && Math.abs(FircoorY - ScoorY) > Math.abs(FircoorX - ScoorX)){
				if(touch.clientY > ScoorY - diff && touch.clientY < ScoorY + oriPos){
					img.css("top", -oriPos + touch.clientY - ScoorY);
				}
			}
			if(direction == 1 && Math.abs(FircoorX - ScoorX) > Math.abs(FircoorY - ScoorY)){
				if(touch.clientX > ScoorX - diff && touch.clientX < ScoorX + oriPos){
					img.css("left", -oriPos + touch.clientX - ScoorX);
				}
			}
		},false);
		box[0].addEventListener("touchend",function(event){
			FircoorX = 0;
			FircoorY = 0;
		},false);
	}
	else {
		img.draggable({
			cursor: "all-scroll",
			addClasses: false
		});
	}
}

function horiScroll(list,total,width,handle,swi){  //横排不定宽item滚动
	if(!list.is(":animated")){
		var left = clearLetter(list.css("left"));
		var diff = total - width + left;
		var itm = list.children(".current");
		if(swi == "next"){
			var cwidth = itm.outerWidth();
			if(cwidth >= diff){
				list.animate({left: left - diff + "px"},300,function(){
					handle.fadeOut(100).delay(300).siblings().animate({right: 0},500);
				});
				list.data("last",diff);
			}
			else {
				if(left == 0){
					handle.siblings().fadeIn(500);
				}
				list.animate({left: left - cwidth + "px"},300);
				itm.removeClass("current").next().addClass("current");
			}
		}
		else {
			if(diff == 0){
				list.animate({left: left + list.data("last") + "px"},300,function(){
					handle.animate({right: handle.width() + 1 + "px"},500,function(){
						handle.siblings().fadeIn(200);
					});
				});
			}
			else {
				list.animate({left: left + itm.prev().outerWidth() + "px"},300,function(){
					if(clearLetter(list.css("left")) == 0){
						handle.fadeOut(200);
					}
				});
				itm.removeClass("current").prev().addClass("current");
			}
		}
	}
}

function ArrayMaxMin(){
	this._value = new Array();
	if(typeof ArrayMaxMin._init == "undefined"){
		ArrayMaxMin.prototype.append = function(value){
			this._value.push(value);
		}
		ArrayMaxMin.prototype.max = function(arr){
			return Math.max.apply(null,arr);
		}
		ArrayMaxMin.prototype.min = function(arr){
			return Math.min.apply(null,arr);
		}
		ArrayMaxMin._init = true;
	}
}