function waterfall(li,wrap){
	var len = li.length;
	var wrap_W = wrap.width();//区块容器的宽度
	var intervalHalf = clearLetter(li.css("paddingRight"));//设置两边间距
	var intervalBottom = clearLetter(li.css("paddingBottom"));//设置底部间距
	var li_W = li.eq(0).width() + intervalHalf * 2;//取区块的实际宽度
	var li_H;
	var min_H;
	var max_H;
	var minKey;
    var h = [];
    var n = Math.round(wrap_W / li_W);
	for(var i=0;i<len;i++) {
		li_H = li.eq(i).height();//获取每个li的高度
		if(i < n){//判断是否是第一行
			h[i] = li_H;
			li.eq(i).stop().animate({top: 0 + "px", left: li_W * i + "px"},400);
		}
		else{
			min_H = Math.min.apply(null,h);//取得数组中的最小值，区块中高度值最小的那个
			minKey = getarraykey(h, min_H);//最小的值对应的key
			h[minKey] += li_H + intervalBottom;//加上新高度后更新高度值
			li.eq(i).stop().animate({top: min_H + intervalBottom + "px", left: li_W * minKey + "px"},400);
		}
	}
    max_H = Math.max.apply(null,h) ;
    wrap.height(max_H);//全部排列好后设置容器的高度
}
function getarraykey(s,v){
	for(k in s){
		if(s[k] == v){
			return k;
		}
	}
}