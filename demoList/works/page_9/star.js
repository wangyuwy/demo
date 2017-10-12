(function(){
	/*得到canvas和ctx*/
	var canvasEI = document.getElementById("canvas");
	var ctx = canvasEI.getContext("2d");
	var mousePos = [0,0]; /*clientX/Y*/

	var easingFactor = 5.0;
	var backgroundColor = "#000";
	var nodeColor = "#fff";
	var edgeColor = "#fff";
	/*nodes:星星  edges:边*/
	var nodes = [];
	var edges = [];

	/*随机创建几个点，用字典对象的方式存储点的各个信息*/
	function constructNodes(){
		for(var i=0;i<100;i++){
			var node = {
				drivenByMouse:i==0,  /*i=0的点实现跟随鼠标移动的效果*/
				x:Math.random()*canvasEI.width,
				y:Math.random()*canvasEI.height,
				vx:Math.random()*1-0.5,
				vy:Math.random()*1-0.5,
				radius:Math.random()>0.9 ? 3+Math.random()*3:1+Math.random()*3
			};
			nodes.push(node);
		}
		nodes.forEach(function(e){
			nodes.forEach(function(e2){
				if (e == e2) {
					return;
				}

				var edge = {
					from:e,
					to:e2
				}
				addEdge(edge);
			});
		});
	}

	/*添加边*/
	function addEdge(edge){
		var ignore = false;
		edges.forEach(function(e){
			/*去除相同的边*/
			if (e.from == edge.from && e.to == edge.to) {
				ignore = true;
			}
			if (e.to == edge.from && e.from == edge.to) {
				ignore = true;
			}
		});
		if(!ignore){
			edges.push(edge);
		}
	}

	/*点动起来*/
	function step(){
		nodes.forEach(function(e){
			if (e.drivenByMouse) {
				return;
			}
			e.x += e.vx;
			e.y += e.vy;

			/*是点在某个区域内动*/
			function clamp(min,max,value){
				if (value > max) {
					return max;
				}else if(value < min){
					return min;
				}else{
					return value;
				}
			}

			if(e.x <= 0 || e.x >= canvasEI.width){
				e.vx *= -1;
				e.x = clamp(0,canvasEI.width,e.x);
			}

			if(e.y <= 0 || e.y >= canvasEI.width){
				e.vy *= -1;
				e.y = clamp(0,canvasEI.width,e.y);
			}
		});
		adjustNodeDrivenByMouse();
		render();
		window.requestAnimationFrame(step);
	}

	function adjustNodeDrivenByMouse(){
		nodes[0].x+=(mousePos[0]-nodes[0].x)/easingFactor;/*factor是缓动因子，t是最终位置，x是当前位置*/
		nodes[0].y+=(mousePos[0]-nodes[0].y)/easingFactor;
	}

	function lengthOfEdge(edge){
		return Math.sqrt(Math.pow((edge.from.x-edge.to.x),2)+Math.pow((edge.from.y-edge.to.y),2));
	}

	function render(){
		ctx.fillStyle = backgroundColor;
		ctx.fillRect(0,0,canvasEI.width,canvasEI.height);
		edges.forEach(function(e){
			var l = lengthOfEdge(e);
			var threshold = canvasEI.width/8;

			if (l > threshold) {/*根据阈值判断是否要绘制这条边*/
				return;
			}

			ctx.strokeStyle = edgeColor;
			ctx.lineWidth = (1.0-l/threshold)*2.5;
			ctx.globalAlpha = 1.0-l/threshold;
			ctx.beginPath();  /*重新开始画线*/
			ctx.moveTo(e.from.x,e.from.y);
			ctx.lineTo(e.to.x,e.to.y);
			ctx.stroke();
		});
		ctx.globalAlpha = 1.0;

		nodes.forEach(function(e){
			if (e.drivenByMouse) {
				return;
			}
			ctx.fillStyle = nodeColor;
			ctx.beginPath();  /*重新开始画线*/
			ctx.arc(e.x,e.y,e.radius,0,2+Math.PI);
			ctx.fill();
		});
	}

	/*当画布大小发生改变时重新绘制，并且调整自身分辨率*/
	window.onresize = function(){
		canvasEI.width = document.body.clientWidth;
		canvasEI.height = canvasEI.clientHeight;

		if (nodes.length == 0) {
			constructNodes();
		}
		render();
	};

	window.onmousemove = function(e){
		mousePos[0] = e.clientX;
		mousePos[1] = e.clientY;
	}

	window.onresize();//trigger the event manually
	window.requestAnimationFrame(step); //通过递归调用同一方法来不断更新画面以达到动起来的效果
}).call(this);