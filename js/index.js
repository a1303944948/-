//首页圆环显示百分比设备状态
/**首页销售图数据来源**/

var groupitemKit = groupitem(4);
var groupitemArrays = [];	//状态清单
for(var i = 0; i < groupitemKit.length; i++){
	if(groupitemKit[i].stop == 1){
		groupitemArrays.push(groupitemKit[i].devicecode);
	}
}
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

ajax({
	url: URLS + '/elmStatus/getHomePage.json',
	type: 'post',
	data: {
		strArray: JSON.stringify(groupitemArrays),
	},
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

//看板栏历史记录样式渲染
function kanbansfun(){
	var Height = window.innerHeight;
	var Header = n('header')[0].clientHeight;
	var indexStatus = c('index_status')[0].clientHeight;
	var indexKanban = c('index_kanban')[0].clientHeight;
	var kanbans = c('index_kanbans')[0];
	kanbans.style.height = Height - Header - indexStatus - indexKanban - 85 + 'px';
}
kanbansfun();

window.onresize = function(){
	kanbansfun();
}

//今日看板
function todayBar(){
	var barDate = new Date();
	var nian = barDate.getFullYear();
	var yue = barDate.getMonth() + 1;
	var ri = barDate.getDate();
	var startTime = String(nian) + '-' + String(yue) + '-' + String(ri) + ' 00:00:00';
	var endTime = String(nian) + '-' + String(yue) + '-' + String(ri+1) + ' 00:00:00';
	ajax({
		type: 'get',
		url: URLS + '/count/'+loginUserName.empcode+'/home?startTime='+startTime+'&endTime='+endTime,
		success: function(data){
			if(data.status == 10001){
				c('index_kanban_total')[0].innerHTML = data.resultObject.turnover;
				c('index_kanban_num')[0].innerHTML = data.resultObject.validCount;
			}else{
				c('index_kanban_total')[0].innerHTML = 0;
				c('index_kanban_num')[0].innerHTML = 0;
			}
		}
	})
}
todayBar();

//历史看板
function historyBar(){
	var indexKanbansYbp = c('index_kanbans_ybp')[0];
	var selects = c('index_head_selects');	//第一种类input下拉框(不携带value值的下拉框)
	var selects_ul = c('index_head_selects_ul');

	//第一种类渲染
	//给下拉框元素创建下拉内容
	for(var i = 0; i < selects.length; i++){
		var ul = creat('ul');
		ul.className = 'index_head_selects_ul';
		ul.setAttribute('data-list',i);
		for(var j = 0; j < INDEXLIST[i].length; j++){
			var li = creat('li');
			var br = creat('br');
			li.innerHTML = INDEXLIST[i][j];
			ul.appendChild(li);
			ul.appendChild(br);
		}
		indexKanbansYbp.appendChild(ul);
	}

	//渲染点击事件
	for(var i = 0; i < selects.length; i++){
		selects_ul[i].style.left = selects[i].offsetParent.offsetLeft + 17 + 'px';
		selects_ul[i].style.top = selects[i].offsetParent.offsetTop + selects[i].offsetParent.clientHeight - 4 + 'px';
		(function(q){
			//点击input框时的显示隐藏
			selects[q].onfocus = function(){
				selects_ul[q].style.display = 'inline-block';
			}
			selects[q].onblur = function(){
				selects_ul[q].style.display = 'none';
			}
			//点击ul时的显示隐藏
			selects[q].parentNode.children[1].onfocus = function(){
				selects_ul[q].style.display = 'inline-block';
			}
			selects[q].parentNode.children[1].onblur = function(){
				selects_ul[q].style.display = 'none';
			}
		})(i)
		//将ul中选中的数据渲染到input框中
		for(var j = 0; j < selects_ul[i].children.length; j++){
			if(j%2 == 0){
				selects_ul[i].children[j].onmousedown = function(){
					selects[this.offsetParent.dataset.list].value = this.innerHTML;
				}
			};
		}

		//给下拉框元素默认选中第一个值
		selects[i].value = selects_ul[i].children[0].innerHTML;
	}
}
historyBar();

var startDate;	//开始时间
var endDate;	//结束时间

//日期渲染	如果input框发生改变时要跟着改变
function datepicke(){

	var date_select = c('index_head_selects')[0];	//日期input
	var date_selectUl = c('index_head_selects_ul')[0];	//日期input
	var date_selectList = date_selectUl.children;			//日期input下拉框
	var headNian = c('index_head_date_nian');
	var headYue = c('index_head_date_yue');
	var headStart = c('index_head_date_start');
	var headEnd = c('index_head_date_end');
	var date = new Date();
	var nian;
	var yue;
	var ri;

	//页面加载时获取默认时间
	startDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
	endDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate() + 1);

	var zhou = date.getDay();
	if(date.getDay() == 0){
		zhou = 7;
	}
	var hao = date.getDate()-1;
	var tian = 86400000;
	dateNone();
	for(var i = 0; i < date_selectList.length; i++){
		(function(q){
			date_selectList[q].onmousedown = function(){
				date_select.value = this.innerHTML;
				if(this.innerHTML == '今天'){
					nian = date.getFullYear();
					yue = date.getMonth() + 1;
					ri = date.getDate();
					startDate = String(nian) + '-' + String(yue) + '-' + String(ri);
					endDate = String(nian) + '-' + String(yue) + '-' + String(ri+1);
					dateNone();
				}else if(this.innerHTML == '昨天'){
					var dates = new Date(new Date - tian);
					nian = dates.getFullYear();
					yue = dates.getMonth() + 1;
					ri = dates.getDate();
					startDate = String(nian) + '-' + String(yue) + '-' + String(ri);
					endDate = String(nian) + '-' + String(yue) + '-' + String(ri+1);
					dateNone();
				}else if(this.innerHTML == '本周'){
					var dates = new Date(new Date - tian*(zhou));
					nian = dates.getFullYear();
					yue = dates.getMonth() + 1;
					ri = dates.getDate();
					startDate = String(nian) + '-' + String(yue) + '-' + String(ri);
					nian = date.getFullYear();
					yue = date.getMonth() + 1;
					ri = date.getDate();
					endDate = String(nian) + '-' + String(yue) + '-' + String(ri+1);
					dateNone();
				}else if(this.innerHTML == '最近10天'){
					var dates = new Date(new Date - tian*9);
					nian = dates.getFullYear();
					yue = dates.getMonth() + 1;
					ri = dates.getDate();
					startDate = String(nian) + '-' + String(yue) + '-' + String(ri);
					nian = date.getFullYear();
					yue = date.getMonth() + 1;
					ri = date.getDate();
					endDate = String(nian) + '-' + String(yue) + '-' + String(ri+1);
					dateNone();
				}else if(this.innerHTML == '上周'){
					var dates = new Date(new Date - tian*(zhou-1+7));
					nian = dates.getFullYear();
					yue = dates.getMonth() + 1;
					ri = dates.getDate();
					startDate = String(nian) + '-' + String(yue) + '-' + String(ri-1);
					dates = new Date(new Date - tian*(zhou));
					nian = dates.getFullYear();
					yue = dates.getMonth() + 1;
					ri = dates.getDate();
					endDate = String(nian) + '-' + String(yue) + '-' + String(ri);
					dateNone();
				}else if(this.innerHTML == '本月'){
					var dates = new Date(new Date - tian*hao);
					nian = dates.getFullYear();
					yue = dates.getMonth() + 1;
					ri = dates.getDate();
					startDate = String(nian) + '-' + String(yue) + '-' + String(ri);
					nian = date.getFullYear();
					yue = date.getMonth() + 1;
					ri = date.getDate();
					endDate = String(nian) + '-' + String(yue) + '-' + String(ri+1);
					dateNone();
				}else if(this.innerHTML == '最近30天'){
					var dates = new Date(new Date - tian*29);
					nian = dates.getFullYear();
					yue = dates.getMonth() + 1;
					ri = dates.getDate();
					startDate = String(nian) + '-' + String(yue) + '-' + String(ri);
					nian = date.getFullYear();
					yue = date.getMonth() + 1;
					ri = date.getDate();
					endDate = String(nian) + '-' + String(yue) + '-' + String(ri+1);
					dateNone();
				}else if(this.innerHTML == '上个月'){
					var dates = new Date(new Date - tian*(hao+1));
					nian = dates.getFullYear();
					yue = dates.getMonth() + 1;
					ri = dates.getDate();
          			endDate = String(nian) + '-' + String(yue+1) + '-' + String(1);
					dates = new Date(new Date - tian*(hao+ri));
					nian = dates.getFullYear();
					yue = dates.getMonth() + 1;
					ri = dates.getDate();
					startDate = String(nian) + '-' + String(yue) + '-' + String(ri);
					dateNone();
				}else if(this.innerHTML == '按月'){
					dateNone();
					headNian[0].style.display = 'table-cell';
					headNian[1].style.display = 'table-cell';
					headYue[0].style.display = 'table-cell';
					headYue[1].style.display = 'table-cell';
					startDate = undefined;
					endDate = undefined;

					d('device_head_year').value = '';
					d('device_head_month').value = '';
					d('device_head_year').setAttribute('data-value','');
					d('device_head_month').setAttribute('data-value','');

					var preStartTimeYear = 2020;
					var preTimeYear = new Date().getFullYear();
					var preTimeYearArr = [];
					for(var i = 0; i < preTimeYear-preStartTimeYear+1; i++){
						preTimeYearArr.push(preStartTimeYear+i);
					}
					var preTimeYearArray = [];
					for(var i = 0; i < preTimeYearArr.length; i++){
						var preTimeYearObject = {};
						preTimeYearObject.name = preTimeYearArr[i];
						preTimeYearObject.value = preTimeYearArr[i];
						preTimeYearArray.push(preTimeYearObject);
					}
					var deviceHeadYear = d('device_head_year');
					deviceHeadYear.setAttribute('data-select',JSON.stringify(preTimeYearArray));

					log(123);
					log(d('device_head_year'));
					d('device_head_year').onInput = function(){
						log(123);
					}

					d('device_head_month').onInput = function(){
						log(456);
					}

					WmStartSelect();
				}else if(this.innerHTML == '今年'){
					var dateArr = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
					var dates = new Date();
					nian = dates.getFullYear();
					yue = dates.getMonth(); //getMonth()是从0开始
					ri = dates.getDate();
					var result = 0;
					for ( var i = 0; i < yue - 1; i++) {
						result += dateArr[i];
					}
					result += ri;
					//判断是否闰年
					if (yue > 1 && (nian % 4 == 0 && nian % 100 != 0) || nian % 400 == 0) {
						result += 1;
					}
					dates = new Date(new Date - tian*(result-1));
					nian = dates.getFullYear();
					yue = 1; //getMonth()是从0开始
					ri = 1;
					startDate = String(nian) + '-' + String(yue) + '-' + String(ri);
					nian = date.getFullYear();
					yue = date.getMonth() + 1;
					ri = date.getDate();
					endDate = String(nian) + '-' + String(yue) + '-' + String(ri+1);
					dateNone();
				}else if(this.innerHTML == '去年'){
					var dateArr = new Array(31,28,31,30,31,30,31,31,30,31,30,31);
					var dates = new Date();
					nian = dates.getFullYear();
					yue = dates.getMonth(); //getMonth()是从0开始
					ri = dates.getDate();
					var result = 0;
					for ( var i = 0; i < yue; i++) {
						result += dateArr[i];
					}
					result += ri - 1;
					//判断是否闰年
					if (yue > 1 && (nian % 4 == 0 && nian % 100 != 0) || nian % 400 == 0) {
						result += 1;
					}
					dates = new Date(new Date - tian*(result));
					nian = dates.getFullYear();
					yue = dates.getMonth() + 1; //getMonth()是从0开始
					ri = dates.getDate();
					endDate = String(nian) + '-' + String(yue) + '-' + String(1);
					nian = nian-1;
					yue = 1;
					ri = 1;
					startDate = String(nian) + '-' + String(yue) + '-' + String(ri);
					dateNone();
				}else if(this.innerHTML == '自定时间间隔'){
					dateNone();
					headStart[0].style.display = 'table-cell';
					headStart[1].style.display = 'table-cell';
					headStart[1].children[0].value = '';
					headEnd[0].style.display = 'table-cell';
					headEnd[1].style.display = 'table-cell';
					headEnd[1].children[0].value = '';
					startDate = undefined;
					endDate = undefined;
					controller(nianStart,yueStart,riStart);
					tabDate();
					onclicks(yueStart);
				}
			}
		})(i)
	}
	function dateNone(){
		headNian[0].style.display = 'none';
		headNian[1].style.display = 'none';
		headYue[0].style.display = 'none';
		headYue[1].style.display = 'none';
		headStart[0].style.display = 'none';
		headStart[1].style.display = 'none';
		headEnd[0].style.display = 'none';
		headEnd[1].style.display = 'none';
	}
}

var dateStart = new Date();
var nianStart = dateStart.getFullYear();
var yueStart = dateStart.getMonth()+1;
var riStart = dateStart.getDate();

//首次渲染日期控件
function controller(nian,yue,ri){
	var indexHead = c('index_kanbans_ybp')[0];
	var dateController = c('index_head_date_controller');
	var headStart = c('index_head_date_start');
	var headEnd = c('index_head_date_end');
	var Left;
	var Top;
	var Width;

	for(var i = 0; i < dateController.length; i++){
		Left = dateController[i].parentNode.offsetLeft + 5;
		Top = dateController[i].parentNode.offsetTop + dateController[i].parentNode.clientHeight - 3;
		Width = dateController[i].clientWidth - 20;
		var div = creat('div');			//创建日期控件本身
		div.className = 'ui_datapicker';
		div.style.width = Width + 'px';
		div.style.height = 'auto';
		div.style.position = 'absolute';
		div.style.left = Left + 'px';
		div.style.top = Top + 'px';
		div.style.padding = '5px 10px 10px 10px';
		div.style.border = '1px #e5e5e5 solid';
		div.style.backgroundColor = '#ffffff';
		div.style.zIndex = 55;

		function header(){
			var p = creat('p');
			var headerHeight = 30;
			p.className = 'ui_datapicker_head';
			p.style.width = '100%';
			p.style.height = headerHeight + 'px';
			for(var j = 0; j < 4; j++){
				var a = creat('a');
				a.style.display = 'inline-block';
				a.style.height = headerHeight + 'px';
				a.style.lineHeight = headerHeight + 'px';
				a.style.textAlign = 'center';
				a.style.cursor = 'pointer';
				a.style.position = 'relative';
				p.appendChild(a);
				switch(j+1){
					case 1:
						a.innerHTML = '<';
						a.style.width = '20%';
						a.style.fontFamily = 'serif';
						a.style.fontSize = '20px';
						a.style.userSelect = 'none';
						a.style.fontWeight = '700';
						a.className = 'ui_datapicker_head_prev';
						a.onmouseover = function(){
							this.style.backgroundColor = '#e5e5e5';
						}
						a.onmouseout = function(){
							this.style.backgroundColor = '#ffffff';
						}
						break;
					case 2:
						var input = creat('input');
						var span = creat('span');
						input.value = nian;
						a.style.width = '34%';
						input.style.display = 'block';
						input.style.border = 'none';
						input.style.width = '100%';
						input.style.height = headerHeight-4 + 'px';
						input.style.fontSize = '16px';
						input.style.textAlign = 'center';
						input.style.userSelect = 'none';
						input.type = 'number';
						span.style.position = 'absolute';
						span.style.right = '-4px';
						span.style.top = '-4px';
						span.innerHTML = '-';
						a.appendChild(input);
						a.appendChild(span);
						a.className = 'ui_datapicker_head_left';
						break;
					case 3:
						if(parseInt(yue) < 10){
							yue = '0' + parseInt(yue);
						}
						a.style.width = '26%';
						a.innerHTML = yue;
						a.className = 'ui_datapicker_head_right';
						break;
					case 4:
						a.innerHTML = '>';
						a.style.width = '20%';
						a.style.fontFamily = 'serif';
						a.style.fontSize = '20px';
						a.style.userSelect = 'none';
						a.style.fontWeight = '700';
						a.className = 'ui_datapicker_head_next';
						a.onmouseover = function(){
							this.style.backgroundColor = '#e5e5e5';
						}
						a.onmouseout = function(){
							this.style.backgroundColor = '#ffffff';
						}
						break;
				}
			}
			div.appendChild(p);
		}
		header();

		/*日期选择器核心数组*/
		(function (){
			var datepicker = {};

			datepicker.getMonthDate = function(year,month){
				var ret = [];
				if(!year || !month){
					var today = new Date();
					year = today.getFullYear();
					month = today.getMonth() + 1;
				}

				var firstDay = new Date(year,month-1,1);
				var firstDayWeekDay = firstDay.getDay();
				if(firstDayWeekDay === 0){
					firstDayWeekDay = 7;
				}

				var lastDayOfLastMonth = new Date(year,month-1,0).getDate();

				var preMonthDayCount = firstDayWeekDay - 1;
				var lastDay = new Date(year,month,0);
				var lastDate = lastDay.getDate();
				for(var j = 0; j<7*6;j++){
					var date = j + 1 - preMonthDayCount;
					var showDate = date;
					var thisMonth = month;

					if(date <= 0){
						thisMonth = month-1;
						showDate = lastDayOfLastMonth + date;

					}else if(date > lastDate){
						thisMonth = month+1;
						showDate = showDate - lastDate;
					}

					if(thisMonth === 0) thisMonth = 12;
					if(thisMonth === 13) thisMonth = 1;

					ret.push({
						month: thisMonth,
						date: date,
						showDate: showDate
					});
					
				}
				return ret;
			}
			window.datepicker = datepicker;
		})()
		function bodyer(){
			var obj = datepicker.getMonthDate(nian,parseInt(yue));
			var objs = ['一','二','三','四','五','六','日']
			var count = -1;

			var table = creat('table');
			table.width = Width + 'px';
			table.height = 'auto';
			table.className = 'ui_datapicker_body';
			table.style.borderCollapse = 'collapse';
			for(var j = 0; j < 1; j++){
				var tr = creat('tr');
				for(var k = 0; k < 7; k++){
					count++;
					var th = creat('th');
					th.innerHTML = objs[count];
					th.style.height = Width/7 + 'px';
					th.style.lineHeight = Width/7 + 'px';
					th.style.textAlign = 'center';
					th.style.userSelect = 'none';
					th.style.borderRadius = '50%';
					tr.appendChild(th);
				}
				table.appendChild(tr);
			}
			count = -1;
			for(var j = 0; j < 6; j++){
				var tr = creat('tr');
				for(var k = 0; k < 7; k++){
					count++;
					var td = creat('td');
					td.innerHTML = obj[count].showDate;
					td.style.height = Width/7 + 'px';
					td.style.lineHeight = Width/7 + 'px';
					td.style.textAlign = 'center';
					td.style.userSelect = 'none';
					td.style.borderRadius = '50%';
					td.style.fontSize = '14px';
					td.style.cursor = 'pointer';
					if(obj[count].month != yue){
						td.style.color = '#a4a4a4';
						td.style.cursor = 'auto';
					}
					td.setAttribute("data-title",obj[count].month);
					td.onmouseover = function(){
						this.style.backgroundColor = '#e5e5e5';
					}
					td.onmouseout = function(){
						this.style.backgroundColor = '#ffffff';
					}
					tr.appendChild(td);
				}
				table.appendChild(tr);
			}
			count = -1;
			div.appendChild(table);
		}
		bodyer();
		indexHead.appendChild(div);
		(function(q){	//点击展开收起日期控件
			dateController[q].onfocus = function(){
				var ui_datapicker = c('ui_datapicker');
				ui_datapicker[q].style.display = 'block';
			}
			dateController[q].onblur = function(){
				ui_datapicker[q].style.display = 'none';
			}
		})(i)
	}

	//页面加载时关闭所有的日期控件
	var ui_datapicker = c('ui_datapicker');
	for(var i = 0; i < ui_datapicker.length; i++){
		ui_datapicker[i].style.display = 'none';
	}
}

//点击后渲染日期控件
function controllers(nian,yue,ri,num){
	var indexHead = c('index_kanbans_ybp')[0];
	var dateController = c('index_head_date_controller');
	var headStart = c('index_head_date_start');
	var headEnd = c('index_head_date_end');
	var left = c('ui_datapicker_head_left');
	var right = c('ui_datapicker_head_right');
	var box = yue;
	var Width;

	var div = c('ui_datapicker');
	var tbody = c('ui_datapicker_body');

	Width = dateController[num].clientWidth - 20;

	if(box < 10){
		box = '0' + box;
	}
	left[num].children[0].value = nian;
	right[num].innerHTML = box;

	/*日期选择器核心数组*/
	(function (){
		var datepicker = {};

		datepicker.getMonthDate = function(year,month){
			var ret = [];
			if(!year || !month){
				var today = new Date();
				year = today.getFullYear();
				month = today.getMonth() + 1;
			}

			var firstDay = new Date(year,month-1,1);
			var firstDayWeekDay = firstDay.getDay();
			if(firstDayWeekDay === 0){
				firstDayWeekDay = 7;
			}

			var lastDayOfLastMonth = new Date(year,month-1,0).getDate();

			var preMonthDayCount = firstDayWeekDay - 1;
			var lastDay = new Date(year,month,0);
			var lastDate = lastDay.getDate();
			for(var j = 0; j<7*6;j++){
				var date = j + 1 - preMonthDayCount;
				var showDate = date;
				var thisMonth = month;

				if(date <= 0){
					thisMonth = month-1;
					showDate = lastDayOfLastMonth + date;

				}else if(date > lastDate){
					thisMonth = month+1;
					showDate = showDate - lastDate;
				}

				if(thisMonth === 0) thisMonth = 12;
				if(thisMonth === 13) thisMonth = 1;

				ret.push({
					month: thisMonth,
					date: date,
					showDate: showDate
				});
				
			}
			return ret;
		}
		window.datepicker = datepicker;
	})()
	function bodyer(){
		var tbody = c('ui_datapicker_body');
		var table = creat('table');
		var obj = datepicker.getMonthDate(nian,parseInt(yue));
		var objs = ['一','二','三','四','五','六','日']
		var count = -1;

		var table = creat('table');
		table.width = Width + 'px';
		table.height = 'auto';
		table.className = 'ui_datapicker_body';
		table.style.borderCollapse = 'collapse';

		for(var j = 0; j < 1; j++){
			var tr = creat('tr');
			for(var k = 0; k < 7; k++){
				count++;
				var th = creat('th');
				th.innerHTML = objs[count];
				th.style.height = Width/7 + 'px';
				th.style.lineHeight = Width/7 + 'px';
				th.style.textAlign = 'center';
				th.style.userSelect = 'none';
				th.style.borderRadius = '50%';
				tr.appendChild(th);
			}
			table.appendChild(tr);
		}
		count = -1;
		for(var j = 0; j < 6; j++){
			var tr = creat('tr');
			for(var k = 0; k < 7; k++){
				count++;
				var td = creat('td');
				td.innerHTML = obj[count].showDate;
				td.style.height = Width/7 + 'px';
				td.style.lineHeight = Width/7 + 'px';
				td.style.textAlign = 'center';
				td.style.userSelect = 'none';
				td.style.borderRadius = '50%';
				td.style.fontSize = '14px';
				td.style.cursor = 'pointer';
				if(obj[count].month != yue){
					td.style.color = '#a4a4a4';
					td.style.cursor = 'auto';
				}
				if(obj[count].month == yue){
					if(left[num].children[0].value == nianSelected[num]){
						if(right[num].innerHTML == yueSelected[num]){
							if(riSelected[num] == td.innerHTML){
								td.style.backgroundColor = '#0C64A8';
								td.style.color = '#ffffff';
							}else{
								tdNormal();
							}
						}else{
							tdNormal();
						}
					}else{
						tdNormal();
					}
					function tdNormal(){
						td.setAttribute("data-title",obj[count].month);
						td.onmouseover = function(){
							this.style.backgroundColor = '#e5e5e5';
						}
						td.onmouseout = function(){
							this.style.backgroundColor = '#ffffff';
						}
					}
				}
				tr.appendChild(td);
			}
			table.appendChild(tr);
		}
		count = -1;
		div[num].removeChild(tbody[num]);
		div[num].appendChild(table);
	}
	bodyer();
	onclicks(yue);
}

var nianNode = [];	//被调用的日期
var yueNode = [];	//被调用的日期
var riNode = [];	//被调用的日期

var nianSelected = [];	//被选中的日期
var yueSelected = [];	//被选中的日期
var riSelected = [];	//被选中的日期

function tabDate(){
	var div = c('ui_datapicker');
	var head = c('ui_datapicker_head');
	var prev = c('ui_datapicker_head_prev');
	var next = c('ui_datapicker_head_next');
	var left = c('ui_datapicker_head_left');
	var right = c('ui_datapicker_head_right');
	var table = c('ui_datapicker_body');
	var dateController = c('index_head_date_controller');
	for(var i = 0; i < div.length; i++){
		nianNode.push(nianStart);
		yueNode.push(yueStart);
		riNode.push(riStart);
		nianSelected.push('');
		yueSelected.push('');
		riSelected.push('');
		(function(q){
			prev[q].onmousedown = function(e){
				yueNode[q]--;
				if(yueNode[q] < 1){
        			yueNode[q] = 12;
        			nianNode[q] = nianNode[q] - 1;
				}
				controllers(nianNode[q],yueNode[q],riNode[q],q);
				 if ( e && e.preventDefault ) 
		            e.preventDefault(); 
		        //IE阻止默认事件
		        else 
		            window.event.returnValue = false; 
		        return false;
			}
			next[q].onmousedown = function(e){
				yueNode[q]++;
				if(yueNode[q] > 12){
		        	yueNode[q] = 1;
		        	nianNode[q] = nianNode[q] + 1;
				}
				controllers(nianNode[q],yueNode[q],riNode[q],q);
				 if ( e && e.preventDefault ) 
		            e.preventDefault();
		        //IE阻止默认事件
		        else 
		            window.event.returnValue = false; 
		        return false;
			}
			left[q].children[0].onmousedown = function(e){
				setTimeout(function(){
					div[q].style.display = 'block';
					left[q].children[0].focus();
				},10)
			}
			left[q].children[0].onblur = function(){
					div[q].style.display = 'none';
			}
			left[q].children[0].onchange = function(){
				if(parseInt(this.value) < 1900){
					this.value = 1900;
				}
				nianNode[q] = parseInt(this.value);
				controllers(nianNode[q],yueNode[q],riNode[q],q);
			}
		})(i)
	}
}

//选中事件
function onclicks(yue){
	var table = c('ui_datapicker_body');
	var dateController = c('index_head_date_controller');
	var ui_datapicker = c('ui_datapicker');
	for(var i = 0; i < table.length; i++){
		(function(q){
			for(var j = 0; j < table[q].children.length; j++){
				for(var k = 0; k < table[q].children[j].children.length; k++){
					if(table[q].children[j].children[k].dataset.title == yue){
						table[q].children[j].children[k].onmousedown = function(){
							nianSelected[q] = nianNode[q];
							yueSelected[q] = yueNode[q];
							riSelected[q] = parseInt(this.innerHTML);
							dateController[q].value = String(nianNode[q]) + '-' + String(yueNode[q]) + '-' + String(this.innerHTML) + ' ' + '00:00:00';
							controllers(nianSelected[q],yueSelected[q],riSelected[q],q);
							if(nianSelected[0] != ""){
								startDate = String(nianSelected[0]) + '-' +String(yueSelected[0]) + '-' + String(riSelected[0]);
							}
							if(nianSelected[1] != ""){
								endDate = String(nianSelected[1]) + '-' +String(yueSelected[1]) + '-' + String(riSelected[1]);
							}
							ui_datapicker[q].style.display = 'none';
						}
					};
				}
			}
		})(i)
	}
}

datepicke();

//查询按钮
c('index_head_tbody_submit')[0].onclick = function(){

	var indexHeadTime = d('index_head_time');
	var deviceHeadYear = d('device_head_year');
	var deviceHeadMonth = d('device_head_month')

	if(indexHeadTime.value == '按月'){
		var deviceHeadYearValue = deviceHeadYear.dataset.value;
		var deviceHeadMonthValue = deviceHeadMonth.dataset.value;
		if(deviceHeadYearValue && deviceHeadMonthValue){
			startDate = deviceHeadYearValue + '-' + deviceHeadMonthValue + '-1';
			if(deviceHeadMonthValue == '12'){
				endDate = (Number(deviceHeadYearValue) + 1) + '-1-1';
			}else{
				endDate = deviceHeadYearValue + '-' + (Number(deviceHeadMonthValue) + 1) + '-1';
			}
		}
	}
	if(!startDate || !endDate){
		alern('请选择有效的时间查询！');
		return false;
	}
	if(new Date(startDate).getTime() >= new Date(endDate).getTime()){
		alern('开始时间不能大于或等于结束时间！');
		return false;
	}

	ajax({
		type: 'get',
		url: URLS + '/count/'+loginUserName.empcode+'/home?startTime='+startDate+' 00:00:00&endTime='+endDate+' 00:00:00',
		success: function(data){
			if(data.status == 10001){
				d('index_kanbans_body_total').innerHTML = data.resultObject.turnover;
				d('index_kanbans_body_num').innerHTML = data.resultObject.validCount;
			}else{
				c('index_kanban_total')[0].innerHTML = 0;
				c('index_kanban_num')[0].innerHTML = 0;
			}
		}
	})
}