/* 饼图对象 */
var H5ComponentPie = function(name,cfg){
	var component = new H5ComponentBase(name,cfg);
	//绘制网格线
	var w = cfg.width;
	var h = cfg.height;

	//加入画布
	var cns = document.createElement('canvas');
	var ctx = cns.getContext('2d');//ctx想成画笔
	cns.width = ctx.width = w;
	cns.height = ctx.height = h;
	$(cns).css('zIndex',1);
	component.append(cns);

	var r=w/2;
	//加入一个底图层
	ctx.beginPath();
	ctx.fillStyle = "#eee";
	ctx.strokeStyle = "#eee";
	ctx.lineWidth = 10;
	ctx.arc(r,r,r,0,2*Math.PI);
	ctx.fill();
	ctx.stroke();

	//绘制一个数据层
	var cns = document.createElement('canvas');
	var ctx = cns.getContext('2d');//ctx想成画笔
	cns.width = ctx.width = w;
	cns.height = ctx.height = h;
	$(cns).css('zIndex',2);
	component.append(cns);

	var colors = ['red','green','blue','#a00','orange'];//备用颜色
	var sAngle = 1.5*Math.PI;//设置开始的角度在12点位置
	var eAngle = 0;//结束角度
	var aAngle = Math.PI*2;//100%的圆结束的角度 2PI=360

	var step = cfg.data.length;
	for(var i=0;i<step;i++){
		var item = cfg.data[i];
		var color = item[2]||(item[2] = colors.pop());

		eAngle = sAngle+aAngle*item[1];

		ctx.beginPath();
	    ctx.fillStyle = color;
		ctx.strokeStyle = color;
		ctx.lineWidth = .1;
		ctx.moveTo(r,r);
		ctx.arc(r,r,r,sAngle,eAngle);
		ctx.fill();
		ctx.stroke();
		
		//加入所有的项目文本以及百分比
		var text = $('<div class="text">');
		text.text(cfg.data[i][0]);
		var per = $('<div class="per">');
		per.text(cfg.data[i][1]*100+'%');
		text.append(per);

		var x = r+Math.sin(.5*Math.PI-sAngle)*r;
		var y = r+Math.cos(.5*Math.PI-sAngle)*r;
		/*text.css('left',x/2);
		text.css('top',y/2);*/
		if (x>=w/2) {
			text.css('left',x/2+30);
		}else{
			text.css('right',(w-x)/2);
		}

		if (y>h/2) {
			text.css('top',y/2+20);
		}else{
			text.css('bottom',(h-y)/2);
		}
		if (cfg.data[i][2]) {
			text.css('color',cfg.data[i][2]);
		}

		sAngle = eAngle;
		text.css('opacity',0);
		component.append(text);
	}

	//加入一个蒙版层
	var cns = document.createElement('canvas');
	var ctx = cns.getContext('2d');//ctx想成画笔
	cns.width = ctx.width = w;
	cns.height = ctx.height = h;
	$(cns).css('zIndex',3);
	component.append(cns);

	var r=w/2;
	ctx.fillStyle = "#eee";
	ctx.strokeStyle = "#eee";
	ctx.lineWidth = 1;
	

	/*
	 *绘制折线以及对应的数据和阴影
	 *@param {float} per 0-1之间的数据，会根据这个值绘制最终数据对应的中间状态
	 *@return {DOM} Component元素
	*/
	var draw = function(per){
		ctx.clearRect(0,0,w,h);

		ctx.beginPath();

		ctx.moveTo(r,r);
		if (per<=0) {
			ctx.arc(r,r,r,0,2*Math.PI*per);
			component.find('.text').css('opacity',0);
		}else{
			ctx.arc(r,r,r,sAngle,sAngle+2*Math.PI*per,true);
		}
		
	    ctx.fill();
	    ctx.stroke();

	    if (per>=1) {
	    	component.find('.text').css('opacity',1);
	    	ctx.clearRect(0,0,w,h);
	    }
	}

	component.on('onload',function(){
		//饼图生长动画
		var s = 0;
		for(i=0;i<100;i++){
			setTimeout(function(){
				s+=.01;
				draw(s);
			},i*10+500)
		}
	})

	component.on('onleave',function(){
		//饼图退出动画
		var s = 1;
		for(i=0;i<100;i++){
			setTimeout(function(){
				s-=.01;
				draw(s);
			},i*10)
		}
	})

	return component;
}