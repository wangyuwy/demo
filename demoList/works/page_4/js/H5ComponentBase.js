/* 基本图文对象 */
var H5ComponentBase =function(name,cfg){
	var cfg=cfg||{};
	var id=('h5_c_'+Math.random()).replace('.','_');
	//把当前的组件类型添加到样式中
	var cls=' h5_component_name_'+cfg.type;//设置多个类名
	var $component=$("<div class='h5_component "+cls+" h5_component_name_"+name+"' id='"+id+"'>");
	cfg.text && $component.text(cfg.text);
	cfg.width && $component.width(cfg.width/2);//组件高度及宽度
	cfg.height && $component.height(cfg.height/2);
	cfg.css && $component.css(cfg.css);
	cfg.bg && $component.css('backgroundImage','url('+cfg.bg+')');
	if (cfg.center===true) {
		$component.css({
			marginLeft:(cfg.width/4*-1)+'px',
			left:'50%'
		})
	}

	//很多自定义的参数
	if (typeof cfg.onclick==='function') {
		$component.on('click',cfg.onclick);
	}


	console.log("onload+onleave begin");
	$component.on("onload",function(){
				setTimeout(function(){
					$component.addClass(cls+"_load").removeClass(cls+"_leave");
					cfg.animateIn && $component.animate(cfg.animateIn);/*判断是否为空*/
				},cfg.delay||0);
				console.log("onload end");
				return false;
			})
	$component.on("onleave",function(){
				setTimeout(function(){
					$component.addClass(cls+"_leave").removeClass(cls+"_load");
					cfg.animateOut && $component.animate(cfg.animateOut);/*判断是否为空*/
				},cfg.delay||0);
				console.log("onleave end");
				return false;
			})
	console.log("onload+onleave end");
	return $component;
}