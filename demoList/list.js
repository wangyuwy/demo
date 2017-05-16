function animation(){
	var anima = document.getElementById("animation");
	var imgSet = document.getElementById("imgSet");
	var img = imgSet.getElementsByTagName("img");
	console.log(img.length);
	/*初始top left*/
	var height = anima.offsetHeight;
	var top = anima.offsetTop;
	for(var i=0;i<img.length;i++){
		var topSet = parseInt(top - height*i);
		imgSet.style.top = topSet+"px";
		top = topSet;
	}
	
}



window.onload = window.setInterval(animation,500);