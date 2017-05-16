/* 散点图表组件对象 */
var H5ComponentPoint =function ( name, cfg){
	var component=new H5ComponentBase(name,cfg);//图标依赖图文
	var base=cfg.data[0][1];//以第一个数据的比例为大小的100%
	//输出每个point
	$.each(cfg.data,function(idx,item){//取每项数据
		var point=$("<div class='point point_"+idx+"'>");
		/*point.text(item[0]+item[1]);*/

		var name=$('<div class="name">'+item[0]+'</div>');
		var rate=$('<div class="per">'+(item[1]*100)+'%</div>');
		name.append(rate);
		point.append(name);

		var pre=(item[1]/base*100)+'%';
		point.width(pre).height(pre);

		if (item[2]) {
			point.css("backgroundColor",item[2]);
		}
		if (item[3]!==undefined &&item[4]!==undefined) {
			point.css('left',item[3]).css('top',item[4]);
		}
		component.append(point);
	})
	return component;
}