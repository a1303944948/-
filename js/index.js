//首页圆环显示百分比设备状态
/**首页销售图数据来源**/

var groupitemKit = groupitem(4);
var groupitemArray = [];	//图表清单
var groupitemArrays = [];	//状态清单
for(var i = 0; i < groupitemKit.length; i++){
	groupitemArray.push(groupitemKit[i].devicecode);
	if(groupitemKit[i].stop == 1){
		groupitemArrays.push(groupitemKit[i].devicecode);
	}
}
var ybpobj;
$.ajax({
	type: 'post',
	url: URLX + '/jf/com/report/thirty.json',
	data: {
		array: JSON.stringify(groupitemArray),
	},
	async: true,
	dataType: 'json',
	success: function(data){
		ybpobj = data;
		d('index_chart_head_top_right_loading').style.display = 'none';
		d('index_chart_foot_top_right_loading').style.display = 'none';
		ybp();			//首页仪表盘
	},
	error: function(){
		d('index_chart_head_top_right_loading').innerHTML = '发生错误!';
		d('index_chart_foot_top_right_loading').innerHTML = '发生错误!';
		d('index_chart_head_top_right_loading').style.animation = 'false';
		d('index_chart_foot_top_right_loading').style.animation = 'false';
		d('index_chart_head_top_right_loading').style.lineHeight = d('index_chart_head_top_right_loading').clientHeight + 'px';
		d('index_chart_foot_top_right_loading').style.lineHeight = d('index_chart_foot_top_right_loading').clientHeight + 'px';
	}
})


/*$.ajax({
	url: URLS + '/sbzt/indexNum.json',
	type: 'post',
	data: {'emplCode': '13758333226'},
	dataType: 'json',
	async: false,
	success: function(data){
		console.log(data);
		canvas(data);
	}
})*/
$.ajax({
	url: URLS + '/status/getHomePage.json',
	type: 'post',
	data: {
		strArray: JSON.stringify(groupitemArrays),
	},
	async: false,
	success: function(data){
		canvas(data);
	}
})

//var allD = {totalNum: 15,NornalNum: 5,NornalFake: 3,BadNum: 5,BadNum24: 2};
//canvas(allD);
function canvas(allData){
	/*var context = d('canvas');
	var cxt = context.getContext('2d');
	cxt.beginPath();
	cxt.strokeStyle = '#e5e5e5';
	cxt.lineWidth = 10;
	cxt.arc(40,40,35,0,Math.PI*2);
	cxt.stroke();*/
	var total = allData.totalNum;
	var nornal = allData.NornalNum;
	var nornals = allData.NornalFake;
	var bad = allData.BadNum;
	var bad24 = allData.BadNum24;

	var topTotal = c('index_status_list_left_top_total')[0];
	var topNornal = c('index_status_list_left_top_nornal')[0];
	var topBad = c('index_status_list_left_top_bad')[0];
	var topBad24 = c('index_status_list_left_top_bad24')[0];
	topTotal.innerHTML = total;
	topNornal.innerHTML = nornal + nornals;
	topBad.innerHTML = bad;
	topBad24.innerHTML = bad24;

	var listNornal = c('index_status_list_right_item_nornal')[0];
	var listBad = c('index_status_list_right_item_bad')[0];
	var listBad24 = c('index_status_list_right_item_bad24')[0];
	listNornal.innerHTML = Math.round((nornal + nornals)/total*100) + '%';
	listBad.innerHTML = Math.round(bad/total*100) + '%';
	listBad24.innerHTML = Math.round(bad24/total*100) + '%';

	var context1 = d('canvas1');
	var cxt1 = context1.getContext('2d');
	cxt1.beginPath();
	cxt1.strokeStyle = '#4BB622';
	cxt1.lineWidth = 10;
	cxt1.arc(32,32,26,Math.PI*1.5,Math.PI*(1.5 + nornal/total*2),false);
	cxt1.stroke();
	cxt1.beginPath();
	cxt1.strokeStyle = '#FFAE68';
	cxt1.lineWidth = 10;
	cxt1.arc(32,32,26,Math.PI*(1.5 + nornal/total*2),Math.PI*(1.5 + (nornal + nornals)/total*2),false);
	cxt1.stroke();

	var context2 = d('canvas2');
	var cxt2 = context2.getContext('2d');
	cxt2.beginPath();
	cxt2.strokeStyle = '#ffc000';
	cxt2.lineWidth = 10;
	cxt2.arc(32,32,26,Math.PI*1.5,Math.PI*(1.5 + bad/total*2),false);
	cxt2.stroke();

	var context3 = d('canvas3');
	var cxt3 = context3.getContext('2d');
	cxt3.beginPath();
	cxt3.strokeStyle = '#ff0000';
	cxt3.lineWidth = 10;
	cxt3.arc(32,32,26,Math.PI*1.5,Math.PI*(1.5 + bad24/total*2),false);
	cxt3.stroke();
}
//首页仪表盘刻度线
function canvasRight(){
	var context = d('index_chart_head_top_right_canvas');
	var tRight = c('index_chart_head_top_right')[0];
	var cxt = context.getContext('2d');

	var Width = tRight.clientWidth;
	var Height = tRight.clientHeight;

	context.width = Width;
	context.height = Height;

	for(var i = 0; i < 6; i++){
		cxt.beginPath();
		cxt.strokeStyle = '#e5e5e5';
		cxt.lineWidth = 1;
		cxt.moveTo(0,i*Height/6 + 0.5);
		cxt.lineTo(Width,i*Height/6 + 0.5);
		cxt.closePath();
		cxt.stroke();
	}

	var contexts = d('index_chart_foot_top_right_canvas');
	var tRights = c('index_chart_foot_top_right')[0];
	var cxts = contexts.getContext('2d');

	var Widths = tRights.clientWidth;
	var Heights = tRights.clientHeight;

	contexts.width = Widths;
	contexts.height = Heights;

	for(var i = 0; i < 6; i++){
		cxts.beginPath();
		cxts.strokeStyle = '#e5e5e5';
		cxts.lineWidth = 1;
		cxts.moveTo(0,i*Heights/6 + 0.5);
		cxts.lineTo(Widths,i*Heights/6 + 0.5);
		cxts.closePath();
		cxts.stroke();
	}
}

//首页仪表盘渲染
function ybp(){
	var ybpa = c('index_chart_head_bottom')[0];
	var topRight = c('index_chart_head_top_right')[0];
	var leftList = 0;	//30天柱状图使用变量
	var leftLists = 0;  //今年vs去年柱状图使用变量
	var Width = window.innerWidth;
	var Height = window.innerHeight;
	for(var i = 0; i < ybpobj.days.length; i++){
		// var date = new Date();
		// var nian = date.getFullYear();
		// var yue = date.getMonth()+1;
		// var ri = date.getDate();
		// var dates = new Date(nian,yue,ri - 30 + i);
		// var nians = dates.getFullYear();
		// var yues = dates.getMonth();
		// var ris = dates.getDate();
		// if(yues == 0){
		// 	yues = 12;
		// 	nians -= 1;
		// }
		//生成30天销售图底部的日期
		var div = creat('div');
		div.className = 'index_chart_head_bottom_list';
		ybpa.appendChild(div);
		div.innerHTML = ybpobj.days[i];
		/*div.children[0].style.display = 'block';
		div.children[0].style.width = div.clientHeight + 'px';
		div.children[0].style.height = div.clientWidth + 'px';
		div.children[0].style.lineHeight = div.clientWidth + 'px';
		div.children[0].style.position = 'relative';
		div.children[0].style.left = div.clientWidth + 'px';
		div.children[0].style.fontFamily = 'Arial, Helvetica, sans-serif';
		div.children[0].style.transformOrigin = 'left top';
		div.children[0].style.transform = 'rotate(90deg)';*/

		//生成30天销售图的柱状图
		var zdz = ybpobj.totals.slice(0);
		zdz = zdz.sort(function (a,b){return a - b;});
		leftList = parseInt(zdz[zdz.length-1]);
		var divsCount = leftListMe(leftList)[0];
		var divs = creat('div');
		var p = creat('p');
		var span = creat('span');
		span.innerHTML = "微信："+ybpobj.wechats[i]+
						"<br/>支付宝："+ybpobj.alipays[i]+
						"<br/>银商："+ybpobj.SilverMerchants[i]+
						"<br/>工商："+ybpobj.icbcs[i]+
						"<br/>现金："+ybpobj.cashs[i]+
						"<br/>刷卡："+ybpobj.cards[i]+
						"<br/>自定义："+ybpobj.frees[i];
		divs.className = 'index_chart_head_top_right_list';
		p.innerHTML = ybpobj.totals[i];
		divs.appendChild(p);
		divs.appendChild(span);
		topRight.appendChild(divs);
		p.style.marginLeft = (divs.clientWidth - p.clientWidth)/2 + 'px';
		span.style.top = '-10000px';
		if(divs.offsetParent.offsetLeft + (Width - (divs.offsetParent.clientWidth + 80))/2 + divs.offsetLeft + divs.clientWidth + span.clientWidth>Width){
			span.style.left = -span.clientWidth + 'px';
		}else{
			span.style.left = divs.clientWidth + 'px';
		}
		divs.style.top = topRight.clientHeight - zdz[zdz.length-1]/divsCount*topRight.clientHeight + 'px';
		divs.style.height = Math.round(ybpobj.totals[i]/divsCount*topRight.clientHeight) + 'px';
	}

	var ybpb = c('index_chart_foot_bottom')[0];
	var topRights = c('index_chart_foot_top_right')[0];

	var zdzs = ybpobj.vsMap.pastMap.totals.slice(0);
	for(var i = 0; i < ybpobj.vsMap.thisMap.totals.length; i++){
		zdzs.push(ybpobj.vsMap.thisMap.totals.slice(0)[i]);
	}
	zdzs = zdzs.sort(function (a,b){return a - b;});
	leftLists = parseInt(zdzs[zdzs.length-1]);
	for(var i = 0; i < ybpobj.vsMap.pastMap.yues.length; i++){
		//生成去年vs今年销售图底部的日期
		var divb = creat('div');
		divb.className = 'index_chart_foot_bottom_list';
		ybpb.appendChild(divb);
		divb.innerHTML = ybpobj.vsMap.pastMap.yues[i];

		//生成去年vs今年销售图的柱状图
		var divsCount = parseInt(leftListMe(leftLists)[0]);
		var divs = creat('div');
		var p = creat('p');
		var span = creat('span');
		var divsa = creat('div');
		var pa = creat('p');
		var spana = creat('span');
		span.innerHTML = "微信："+ybpobj.vsMap.pastMap.wechats[i]+
						"<br/>支付宝："+ybpobj.vsMap.pastMap.alipays[i]+
						"<br/>银商："+ybpobj.vsMap.pastMap.SilverMerchants[i]+
						"<br/>工商："+ybpobj.vsMap.pastMap.icbcs[i]+
						"<br/>现金："+ybpobj.vsMap.pastMap.pcashs[i]+
						"<br/>刷卡："+ybpobj.vsMap.pastMap.pcards[i]+
						"<br/>自定义："+ybpobj.vsMap.pastMap.pfrees[i];
		divs.className = 'index_chart_foot_top_right_list';
		spana.innerHTML = "微信："+ybpobj.vsMap.thisMap.wechats[i]+
						"<br/>支付宝："+ybpobj.vsMap.thisMap.alipays[i]+
						"<br/>银商："+ybpobj.vsMap.thisMap.SilverMerchants[i]+
						"<br/>工商："+ybpobj.vsMap.thisMap.icbcs[i]+
						"<br/>现金："+ybpobj.vsMap.thisMap.tcashs[i]+
						"<br/>刷卡："+ybpobj.vsMap.thisMap.tcards[i]+
						"<br/>自定义："+ybpobj.vsMap.thisMap.tfrees[i];
		divsa.className = 'index_chart_foot_top_right_lists';
		p.innerHTML = ybpobj.vsMap.pastMap.totals[i];
		pa.innerHTML = ybpobj.vsMap.thisMap.totals[i];
		divs.appendChild(p);
		divs.appendChild(span);
		divsa.appendChild(pa);
		divsa.appendChild(spana);
		topRights.appendChild(divs);
		topRights.appendChild(divsa);
		p.style.marginLeft = (divs.clientWidth - p.clientWidth)/2 + 'px';
		pa.style.marginLeft = (divsa.clientWidth - pa.clientWidth)/2 + 'px';
		span.style.top = '-10000px';
		spana.style.top = '-10000px';
		if(divs.offsetParent.offsetLeft + (Width - (divs.offsetParent.clientWidth + 80))/2 + divs.offsetLeft + divs.clientWidth + span.clientWidth>Width){
			span.style.left = -span.clientWidth + 'px';
		}else{
			span.style.left = divs.clientWidth + 'px';
		}
		if(divsa.offsetParent.offsetLeft + (Width - (divsa.offsetParent.clientWidth + 80))/2 + divsa.offsetLeft + divsa.clientWidth + span.clientWidth>Width){
			spana.style.left = -spana.clientWidth + 'px';
		}else{
			spana.style.left = divsa.clientWidth + 'px';
		}
		divs.style.top = topRights.clientHeight - zdzs[zdzs.length-1]/divsCount*topRights.clientHeight + 'px';
		divs.style.height = Math.round(ybpobj.vsMap.pastMap.totals[i]/divsCount*topRights.clientHeight) + 'px';
		divsa.style.top = topRights.clientHeight - zdzs[zdzs.length-1]/divsCount*topRights.clientHeight + 'px';
		divsa.style.height = Math.round(ybpobj.vsMap.thisMap.totals[i]/divsCount*topRights.clientHeight) + 'px';
	}
	//渲染最近30天的竖状旁黑块区域
	function rightList(){
		var right_list = c('index_chart_head_top_right_list');
		for(var i = 0; i < right_list.length; i++){
			(function(q){
				right_list[q].onmouseover = function(e){
					right_list[q].children[1].style.top = '0px';
				}
				right_list[q].onmouseout = function(e){
					right_list[q].children[1].style.top = '-10000px';
				}
			})(i)
		}
	}
	rightList();

	//渲染今年vs去年的竖状旁黑块区域
	function rightLists(){
		var right_list = c('index_chart_foot_top_right_list');
		var right_lists = c('index_chart_foot_top_right_lists');
		for(var i = 0; i < right_list.length; i++){
			(function(q){
				right_list[q].onmouseover = function(e){
					right_list[q].children[1].style.top = '0px';
				}
				right_list[q].onmouseout = function(e){
					right_list[q].children[1].style.top = '-10000px';
				}
				right_lists[q].onmouseover = function(e){
					right_lists[q].children[1].style.top = '0px';
				}
				right_lists[q].onmouseout = function(e){
					right_lists[q].children[1].style.top = '-10000px';
				}
			})(i)
		}
	}
	rightLists();

	//渲染销售图的记录值
	function leftListMe(num){
		if(num < 10){
			one = 0;
			two = 2;
			three = 4;
			four = 6;
			five = 8;
			six = 10;
			seven = 12;
		}else{
			var weishu = num.toString();		//得到数据是几位数
			weishu = weishu.replace(/[^0]/ig,"0");
			weishu = weishu.substr(0, weishu.length - 2);
			var fir = num.toString()[0];			//得到数据的第一位数值
			var Last = num.toString()[1];			//得到数据的第二位数值
			var one;
			var two;
			var three;
			var four;
			var five;
			var six;
			var seven;
			if(fir == 1&&Last < 2){
				one = 0;
				two = 2 + weishu;
				three = 4 + weishu;
				four = 6 + weishu;
				five = 8 + weishu;
				six = 10 + weishu;
				seven = 12 + weishu;
			}else if(fir == 1&&Last >= 2&&Last < 5){
				one = 0;
				two = 3 + weishu;
				three = 6 + weishu;
				four = 9 + weishu;
				five = 12 + weishu;
				six = 15 + weishu;
				seven = 18 + weishu;
			}else if(fir == 1&&Last >= 5){
				one = 0;
				two = 4 + weishu;
				three = 8 + weishu;
				four = 12 + weishu;
				five = 16 + weishu;
				six = 20 + weishu;
				seven = 24 + weishu;
			}else if(fir == 2){
				one = 0;
				two = 5 + weishu;
				three = 10 + weishu;
				four = 15 + weishu;
				five = 20 + weishu;
				six = 25 + weishu;
				seven = 30 + weishu;
			}else if(fir == 3){
				one = 0;
				two = 7 + weishu;
				three = 14 + weishu;
				four = 21 + weishu;
				five = 28 + weishu;
				six = 35 + weishu;
				seven = 42 + weishu;
			}else if(fir == 4){
				one = 0;
				two = 9 + weishu;
				three = 18 + weishu;
				four = 27 + weishu;
				five = 36 + weishu;
				six = 45 + weishu;
				seven = 54 + weishu;
			}else if(fir == 5){
				one = 0;
				two = 10 + weishu;
				three = 20 + weishu;
				four = 30 + weishu;
				five = 40 + weishu;
				six = 50 + weishu;
				seven = 60 + weishu;
			}else if(fir == 6){
				one = 0;
				two = 12 + weishu;
				three = 24 + weishu;
				four = 36 + weishu;
				five = 48 + weishu;
				six = 60 + weishu;
				seven = 72 + weishu;
			}else if(fir == 7){
				one = 0;
				two = 14 + weishu;
				three = 28 + weishu;
				four = 42 + weishu;
				five = 56 + weishu;
				six = 70 + weishu;
				seven = 84 + weishu;
			}else if(fir == 8){
				one = 0;
				two = 16 + weishu;
				three = 32 + weishu;
				four = 48 + weishu;
				five = 64 + weishu;
				six = 80 + weishu;
				seven = 96 + weishu;
			}else if(fir == 9){
				one = 0;
				two = 17 + weishu;
				three = 34 + weishu;
				four = 51 + weishu;
				five = 68 + weishu;
				six = 85 + weishu;
				seven = 102 + weishu;
			}
		}
		var obj = [seven,six,five,four,three,two,one];
		return obj;
	}

	//最近三十天刻度渲染
	var topLeft = c('index_chart_head_top_left')[0];
	var topLeftCount = leftListMe(leftList);
	for(var i = 0; i < 7; i++){
		var div = creat('div');
		div.className = 'index_chart_head_top_left_list';
		div.innerHTML = topLeftCount[i];
		topLeft.appendChild(div);
	}

	//去年vs今年刻度渲染
	var topLefts = c('index_chart_foot_top_left')[0];
	var topLeftCounts = leftListMe(leftLists);
	for(var i = 0; i < 7; i++){
		var div = creat('div');
		div.className = 'index_chart_head_top_left_list';
		div.innerHTML = topLeftCounts[i];
		topLefts.appendChild(div);
	}
}

//页面大小改变时触发
window.onresize = function(){
	//30天销售图柱状鼠标移上出现的黑块在矿口发生改变时重新定位
	var rightList = c('index_chart_head_top_right_list');
	var Width = window.innerWidth;
	var Height = window.innerHeight;
	for(var i = 0; i < rightList.length; i++){
		if(rightList[i].offsetParent.offsetLeft + (Width - (rightList[i].offsetParent.clientWidth + 80))/2 + rightList[i].offsetLeft + rightList[i].clientWidth + rightList[i].children[1].clientWidth>Width){
			rightList[i].children[1].style.left = -rightList[i].children[1].clientWidth + 'px';
		}else{
			rightList[i].children[1].style.left = rightList[i].clientWidth + 'px';
		}
	}
	//首页仪表盘刻度线
	canvasRight();
	var divs = c('index_chart_head_top_right_list');
	for(var i = 0; i < divs.length; i++){
		divs[i].children[0].style.marginLeft = (divs[i].clientWidth - divs[i].children[0].clientWidth)/2 + 'px';
	}
}

//调用方法处
canvasRight();	//首页仪表盘刻度绘制