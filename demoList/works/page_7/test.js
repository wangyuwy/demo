function calendar(year, month) {
	var arr = document.getElementsByTagName("td");
	for(var i=0;i<arr.length;i++){
		arr[i].setAttribute("class","");
		var nodes = arr[i].childNodes;
		if(nodes.length != 0){
			for(var j = 0; j<nodes.length;j++){
				arr[i].removeChild(nodes[j]);
			}
		}
	}

	var date = new Date(month+" 1,"+year);
    var day = date.getDay();
   /* var arr = document.getElementsByTagName("td");*/
    var num =1;
    var maxDay = [];
    if (year % 100 == 0) {
    	if (year % 4 ==0) {
    		maxDay = [31,29,31,30,31,30,31,31,30,31,30,31];
    	}else{
    		maxDay = [31,28,31,30,31,30,31,31,30,31,30,31];
    	}
    }else if(year % 4 == 0){
    	maxDay = [31,29,31,30,31,30,31,31,30,31,30,31];
    }else{
    	maxDay = [31,28,31,30,31,30,31,31,30,31,30,31];
    }
    for(var i = day-1; i<arr.length && num<=maxDay[month-1] ;i++,num++){
        arr[i].innerHTML = "<span>"+num+"<span>";
    }
    var currentDate = new Date();
    var currentDay = currentDate.getDate();
    var currentMonth = currentDate.getMonth();
    if(month == currentMonth+1){
    	var scale = currentDay+day-2;
    	arr[scale].setAttribute("class","current");
    } 
}