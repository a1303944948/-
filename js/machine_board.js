var boardpPurview = d('board_purview');							//权限范围
var boardMachcode = d('board_machcode');						//设备编号
var boardMachname = d('board_machname');						//设备名称
var boardModel = d('board_model');								//机型
var boardMac = d('board_mac');									//MAC地址
var boardOperator = d('board_operator');						//运营方
var boardConcur = d('board_concur');							//合作方式
var boardBuy = d('board_buy');									//购买日期
var boardRentstart = d('board_rentstart');						//租赁开始日期
var boardRentend = d('board_rentend');							//租赁到期日期
var boardMark = d('board_mark');								//备注
var boardStop = d('board_stop');								//是否停用
var type = null;												//提交表单的类型
var userBodyRightFootItem = c('user_body_right_foot_item')[0];	//表单的显示隐藏

var BOARDSELECT = [];

//右下角表单下拉框内容
$.ajax({
	type: 'post',
	url: URLZ + '/jf/bg/basic/dvm/searchParamtb_business_operate.json',
	async: false,
	success: function(data){
		var BOARDSELECTB = [];
		if(loginUserName.operatorID == 1){
			for(var i = 0; i <　data.dataOper.length; i++){
				var BOARDSELECTBOBJ = new Object();
				BOARDSELECTBOBJ.type = data.dataOper[i].operatorID;
				BOARDSELECTBOBJ.text = data.dataOper[i].operator;
				BOARDSELECTB.push(BOARDSELECTBOBJ);
			}
		}else{
			$.ajax({
				type: 'post',
				url: URLS + '/operate/getOperate.json',
				data: {
					operatorID: loginUserName.operatorID,
				},
				async: false,
				success: function(data){
					var BOARDSELECTBOBJ = new Object();
					BOARDSELECTBOBJ.type = data.operatorID;
					BOARDSELECTBOBJ.text = data.operator;
					BOARDSELECTB.push(BOARDSELECTBOBJ);
				}
			})
		}
		BOARDSELECT.push(BOARDSELECTB);
	}
})
$.ajax({
	type: 'post',
	async: false,
	url: URLZ + '/jf/bg/basic/dvm/searchParamModel.json',
	success: function(data){
		var BOARDSELECTA = [];
		for(var i = 0; i <　data.dataModel.length; i++){
			var BOARDSELECTAOBJ = new Object();
			BOARDSELECTAOBJ.type = data.dataModel[i].modelNum;
			BOARDSELECTAOBJ.text = data.dataModel[i].model;
			BOARDSELECTA.push(BOARDSELECTAOBJ);
		}
		BOARDSELECT.push(BOARDSELECTA);
	}
})
BOARDSELECT.push([{type: '1',text: '购买'},{type: '2',text: '租赁'}]);
function start(){
	group();
	Authority(loginUserName.empcode);
	
	console.log(KIT);
	KITSort = [];
	for(var i = 0; i < KIT.length; i++){
		if(KIT[i].icon == 4){
			KITSort.push(KIT[i]);
		}
	}
	for(var i = 0; i < KIT.length; i++){
		if(KIT[i].icon == 2){
			KITSort.push(KIT[i]);
		}
	}
	for(var i = 0; i < KIT.length; i++){
		if(KIT[i].icon == 1){
			KITSort.push(KIT[i]);
		}
	}
	for(var i = 0; i < KIT.length; i++){
		if(KIT[i].icon == 0){
			KITSort.push(KIT[i]);
		}
	}

	var body = document.getElementsByTagName('body')[0];

	function sonsTree(arr,id){
	    var temp = [],lev=0;
	    function forFn(arr, id,lev){
	        for(var i = 0; i < arr.length; i++){
	            var item = arr[i];
	            if(item.parent_id==id){
	                item.lev=lev;
	                temp.push(item);
	                forFn(arr,item.id,lev+1);
	            }
	        }
	    };
	    forFn(arr, id,lev);
	    return temp;
	}
	var count = [];
	for(var i = 0; i < KITSort.length; i++){
		count.push(KITSort[i].parent_id);
	}
	var tree = sonsTree(KITSort,Math.min.apply(Math,count));
	var temp = [];
	for(var i=0;i<tree.length;i++){
	    var item = tree[i],u = "";
	    if(item.icon == 0){
	   		temp.push('<li><img class="item'+item['lev']+'" src="image/grouping/001.png"/><a data-id="'+item.id+'">'+item.text+'</a></li>');
	    }else if(item.icon == 1){
	   		temp.push('<li><img class="item'+item['lev']+'" src="image/grouping/002.png"/><a data-id="'+item.id+'">'+item.text+'</a></li>');
	    }else if(item.icon == 2){
	   		temp.push('<li><img class="item'+item['lev']+'" src="image/grouping/003.png"/><a data-id="'+item.id+'">'+item.text+'</a></li>');
	    }
	}
	var Head = c('user_head')[0];
	var Grouping = c('user_head_grouping');
	for(var i = 0; i < Grouping.length; i++){
		var ul = creat('ul');
		ul.className = "user_head_ul";
		ul.setAttribute('data-list',i);
		var li = "";
		for(var j = 0; j < temp.length; j++){
			li += (temp[j]);
		}
		ul.innerHTML = li;
		ul.style.minWidth = Grouping[i].clientWidth + 'px';
		Head.appendChild(ul);

		(function(q){
			var headUl = c('user_head_ul');
			Grouping[q].onfocus = function(){
				if(q == 1){
					headUl[1].style.display = "inline-block";
					headUl[1].style.left = this.offsetParent.offsetLeft + 5 + 255 + 'px';
					headUl[1].style.top = this.offsetParent.offsetTop + this.clientHeight + 181 + 'px';
					headUl[1].style.maxHeight = window.innerHeight - this.offsetParent.offsetTop - 190 - 23 - 200 + 'px';
				}else{
					headUl[q].style.display = "inline-block";
					headUl[q].style.left = this.offsetParent.offsetLeft + 5 + 'px';
					headUl[q].style.top = this.offsetParent.offsetTop + this.clientHeight + 5 + 'px';
					headUl[q].style.maxHeight = window.innerHeight - Grouping[q].offsetParent.offsetTop - 200 + 'px';
				}
			}
			Grouping[q].onblur = function(){
				headUl[q].style.display = "none";
			}
		})(i)

		var headUl = c('user_head_ul');
		for(var j = 0; j < headUl[i].children.length; j++){
			headUl[i].children[j].children[1].onmousedown = function(){
				Grouping[this.parentNode.parentNode.dataset.list].value = this.innerHTML;
				Grouping[this.parentNode.parentNode.dataset.list].name = this.dataset.id;
			}
		}
	}

	var Select = c('user_head_select');
	for(var i = 0; i < Select.length; i++){
		var ul = creat('ul');
		ul.className = "user_head_uls";
		ul.setAttribute("data-list", i);
		for(var j = 0; j < USERSTOP.length; j++){
			var li = creat('li');
			li.innerHTML = USERSTOP[j].text;
			li.setAttribute("data-value", USERSTOP[j].value);
			ul.appendChild(li);
		}
		ul.style.minWidth = Select[i].clientWidth + 'px';
		Head.appendChild(ul);

		(function(q){
			var headUl = c('user_head_uls');
			Select[q].onfocus = function(){
				headUl[q].style.display = "inline-block";
				headUl[q].style.left = this.offsetParent.offsetLeft + 5 + 'px';
				headUl[q].style.top = this.offsetParent.offsetTop + this.clientHeight + 5 + 'px';
			}
			Select[q].onblur = function(){
				headUl[q].style.display = "none";
			}
		})(i)

		var headUl = c('user_head_uls');
		Select[i].value = headUl[i].children[0].innerHTML;
		Select[i].name = headUl[i].children[0].dataset.value;
		for(var j = 0; j < headUl[i].children.length; j++){
			headUl[i].children[j].onmousedown = function(){
				Select[this.parentNode.dataset.list].value = this.innerHTML;
				Select[this.parentNode.dataset.list].name = this.dataset.value;
			}
		}
	}
}


//渲染主体部分数据
function startbody(){
	var Head = c('user_head')[0];
	var dBody = c('user_body')[0];
	dBody.style.height = window.innerHeight - Head.clientHeight - 119 + 'px';

	function sonsTree(arr,id){
		var temp = [],lev=0;
		var forFn = function(arr, id,lev){
			for (var i = 0; i < arr.length; i++) {
				var item = arr[i];
				if (item.parent_id==id) {
					item.lev=lev;
					temp.push(item);
					forFn(arr,item.id,lev+1);
				}
			}
		};
		forFn(arr, id,lev);
		return temp;
	}
	var count = [];
	for(var i = 0; i < KITSort.length; i++){
		count.push(KITSort[i].parent_id);
	}
	var tree = sonsTree(KITSort,Math.min.apply(Math,count));
	var temp = [];
	for(var i=0;i<tree.length;i++){
		var item = tree[i],u = "";
		if(item.icon == 0){
			temp.push('<li><img class="item'+item['lev']+'" src="image/grouping/001.png"/><a data-id="'+item.id+'" data-parent-id="'+item.parent_id+'">'+item.text+'</a></li>');
		}else if(item.icon == 1){
			temp.push('<li><img class="item'+item['lev']+'" src="image/grouping/002.png"/><a data-id="'+item.id+'" data-parent-id="'+item.parent_id+'">'+item.text+'</a></li>');
		}else if(item.icon == 2){
			temp.push('<li><img class="item'+item['lev']+'" src="image/grouping/003.png"/><a data-id="'+item.id+'" data-parent-id="'+item.parent_id+'">'+item.text+'</a></li>');
		}else if(item.icon == 4){
			temp.push('<li><img class="item'+item['lev']+'" src="image/grouping/005.png"/><a data-id="'+item.id+'" onclick="rendering(\''+item.devicecode+'\',this)" data-parent-id="'+item.parent_id+'">'+item.text+'</a></li>');
		}
	}
	//渲染左边结构
	var Left = c('user_body_left')[0];
	Left.innerHTML = "";
	var ul = creat('ul');
	ul.className = "user_head_ul_show";
	var li = "";
	for(var j = 0; j < temp.length; j++){
		li += (temp[j]);
	}
	ul.innerHTML = li;
	Left.appendChild(ul);


	//渲染右边结构部分
	//USERHEAD = listMenu();
	var BottomUl = c('user_body_right_head_bottom_ul')[0];
	BottomUl.innerHTML = [];
	for(var i = 0; i < USERHEAD.length; i++){
		var li = creat('li');
		li.innerHTML = USERHEAD[i].text;
		li.setAttribute('data-menuid',USERHEAD[i].menuid);
		BottomUl.appendChild(li);
	}
	var divClear = creat('div');
	divClear.className = 'clear';
	BottomUl.appendChild(divClear);

	//渲染右边table切换
	var footList = c('user_body_right_foot_list');
	var ulLi = c('user_body_right_head_bottom_ul')[0].children;

	for(var i = 0; i < USERHEAD.length; i++){
		(function(q){
			ulLi[q].onclick = function(){
				for(var j = 0; j < footList.length; j++){
					if(this.dataset.menuid == footList[j].dataset.menuid){
						footList[j].style.display = 'block';
						this.style.borderTop = '2px #16b904 solid';
						this.style.borderLeft = '1px #e5e5e5 solid';
						this.style.borderRight = '1px #e5e5e5 solid';
						this.style.marginTop = '-1px';
						this.style.color = '#666666';
						this.style.backgroundColor = '#ffffff';
					}else{
						footList[j].style.display = 'none';
						ulLi[j].style.borderTop = 'none';
						ulLi[j].style.borderLeft = 'none';
						ulLi[j].style.borderRight = 'none';
						ulLi[j].style.marginTop = '0px';
						ulLi[j].style.color = '#428BCA';
						ulLi[j].style.backgroundColor = '#f0f0f0';
					}
				}
			}
		})(i)
	}

	var allNone = 0;
	for(var i = 0; i < USERHEAD.length; i++){
		if(USERHEAD[i].value == 1){
			for(var j = 0; j < footList.length; j++){
				if(USERHEAD[i].menuid == footList[j].dataset.menuid){
					footList[j].style.display = 'block';
					ulLi[i].style.borderTop = '2px #16b904 solid';
					ulLi[i].style.borderLeft = '1px #e5e5e5 solid';
					ulLi[i].style.borderRight = '1px #e5e5e5 solid';
					ulLi[i].style.marginTop = '-1px';
					ulLi[i].style.color = '#666666';
					ulLi[i].style.backgroundColor = '#ffffff';
					allNone = 1;
				}else{
					footList[j].style.display = 'none';
				}
			}
			break;
		}
	}
	if(allNone == 0){
		for(var j = 0; j < footList.length; j++){
			footList[j].style.display = 'none';
		}
	}

	//表单下拉框
	var boardSelect = c('board_select');
	console.log(boardSelect);
	for(var i = 0; i < boardSelect.length; i++){
		var ul = creat('ul');
		ul.className = "board_select_ul";
		ul.setAttribute('data-list',i);
		ul.style.minWidth = boardSelect[i].clientWidth + 'px';
		for(var j = 0; j < BOARDSELECT[i].length; j++){
			var li = creat('li');
			li.innerHTML = BOARDSELECT[i][j].text;
			li.setAttribute('data-value',BOARDSELECT[i][j].type);
			ul.appendChild(li);
		}
		if(boardSelect[i].parentNode.children[2] != undefined){
			boardSelect[i].parentNode.removeChild(boardSelect[i].parentNode.children[2]);
		}
		boardSelect[i].parentNode.appendChild(ul);
	}

	var boardSelectUl = c('board_select_ul');

	for(var i = 0; i < boardSelect.length; i++){
		(function(q){
			boardSelect[q].onfocus = function(){
				boardSelectUl[q].style.display = "block";
			}
			boardSelect[q].onblur = function(){
				boardSelectUl[q].style.display = "none";
			}
		})(i)
	}

	for(var i = 0; i < boardSelectUl.length; i++){
		for(var j = 0; j < boardSelectUl[i].children.length; j++){
			boardSelectUl[i].children[j].onmousedown = function(){
				boardSelect[this.parentNode.dataset.list].value = this.innerHTML;
				boardSelect[this.parentNode.dataset.list].name = this.dataset.value;
				//显示隐藏租赁与购买日期的控制器
				if(this.parentNode.dataset.list == 2){
					var boardBuys = d('board_buys');
					var boardRentstarts = d('board_rentstarts');
					var boardRentends = d('board_rentends');
					if(this.innerHTML == '购买'){
						boardBuys.style.display = 'table-row';
						boardRentstarts.style.display = 'none';
						boardRentends.style.display = 'none';
						dateXuanran();
					}else if(this.innerHTML == '租赁'){
						boardBuys.style.display = 'none';
						boardRentstarts.style.display = 'table-row';
						boardRentends.style.display = 'table-row';
						dateXuanran();
					}
				}
			}
		}
	}
}

//搜索渲染
var userHeadSubmit = c('user_head_submit')[0];
userHeadSubmit.onclick = function(){
	var userHeadGroup = d('user_head_group').name;
	/*var userHeadSeach = d('user_head_seach').value;*/
	var userHeadStatus = d('user_head_status').name;
	if(userHeadGroup == ""){
		userHeadGroup = loginUserName.scopeofauthority;
	}
	console.log(userHeadGroup);
	console.log(userHeadStatus);
	$.ajax({
		type: 'post',
		url: URLZ + '/jf/bg/basic/cfc/searchClassifi.json',
		data: {
			id: userHeadGroup,
			by: "",
			stop: userHeadStatus,
		},
		success: function(data){
			console.log(data);
			KITSort = data.obj;
			if(userHeadStatus == 1){
				startbody();
			}else if(userHeadStatus == 0){
				var temp = [];
				for(var i = 0; i < KITSort.length; i++){
					if(KITSort[i].icon == 4){
						temp.push('<li><img class="item0" src="image/grouping/005.png"/><a data-id="'+KITSort[i].id+'" onclick=\'rendering('+JSON.stringify(KITSort[i].devicecode)+',this);\' data-parent-id="'+KITSort[i].parent_id+'">'+KITSort[i].text+'</a></li>');
					}
				}
				
				var Left = c('user_body_left')[0];
				Left.innerHTML = "";
				var ul = creat('ul');
				ul.className = "user_head_ul_show";
				var li = "";
				for(var j = 0; j < temp.length; j++){
					li += (temp[j]);
				}
				ul.innerHTML = li;
				Left.appendChild(ul);
			}
		}
	})
}

//日期选择器控件
function dateXuanran(){
	//重复点击时清除日期选择器
	var boardBuys = d('board_buys');
	var boardRentstarts = d('board_rentstarts');
	var boardRentends = d('board_rentends');
	if(boardBuys.children[1].children[2] != undefined){
		boardBuys.children[1].removeChild(boardBuys.children[1].children[2]);
		boardRentstarts.children[1].removeChild(boardRentstarts.children[1].children[2]);
		boardRentends.children[1].removeChild(boardRentends.children[1].children[2]);
	};

	//日期选择器渲染
	var dateStart = new Date();
	var nianStart = dateStart.getFullYear();
	var yueStart = dateStart.getMonth()+1;
	var riStart = dateStart.getDate();


	var nianNode = [];	//被调用的日期
	var yueNode = [];	//被调用的日期
	var riNode = [];	//被调用的日期

	var nianSelected = [];	//被选中的日期
	var yueSelected = [];	//被选中的日期
	var riSelected = [];	//被选中的日期

	controller(nianStart,yueStart,riStart);
	tabDate();
	onclicks(yueStart);

	function controller(nian,yue,ri){
		var boardDate = c('board_date');
		var Left;
		var Top;
		var Width;

		for(var i = 0; i < boardDate.length; i++){
			Width = boardDate[i].clientWidth;
			var div = creat('div');			//创建日期控件本身
			div.className = 'ui_datapicker';
			div.style.width = Width + 'px';
			div.style.height = 'auto';
			div.style.position = 'absolute';
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
						td.style.height = (Width-20)/14 + 'px';
						td.style.lineHeight = (Width-20)/14 + 'px';
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
			boardDate[i].parentNode.appendChild(div);
			(function(q){	//点击展开收起日期控件
				boardDate[q].onfocus = function(){
					var ui_datapicker = c('ui_datapicker');
					ui_datapicker[q].style.display = 'block';
				}
				boardDate[q].onblur = function(){
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
		var boardDate = c('board_date');
		var headStart = c('sales_head_date_start');
		var headEnd = c('sales_head_date_end');
		var left = c('ui_datapicker_head_left');
		var right = c('ui_datapicker_head_right');
		var box = yue;
		var Width;

		var div = c('ui_datapicker');
		var tbody = c('ui_datapicker_body');

		Width = boardDate[num].clientWidth;

		if(box < 10){
			box = '0' + box;
		}
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
					td.style.height = (Width-20)/14 + 'px';
					td.style.lineHeight = (Width-20)/14 + 'px';
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

	//选中事件
	function onclicks(yue){
		var table = c('ui_datapicker_body');
		var boardDate = c('board_date');
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
								boardDate[q].value = String(nianNode[q]) + '-' + String(yueNode[q]) + '-' + String(this.innerHTML);
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

	function tabDate(){
		var div = c('ui_datapicker');
		var head = c('ui_datapicker_head');
		var prev = c('ui_datapicker_head_prev');
		var next = c('ui_datapicker_head_next');
		var left = c('ui_datapicker_head_left');
		var right = c('ui_datapicker_head_right');
		var table = c('ui_datapicker_body');
		var dateController = c('sales_head_date_controller');
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
						nianNode[q] -= 1;
						nianSelected[q] -= 1;
						var ui_datapicker_head_left = c('ui_datapicker_head_left');
						ui_datapicker_head_left[q].children[0].value = nianNode[q];
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
						nianNode[q] += 1;
						nianSelected[q] += 1;
						var ui_datapicker_head_left = c('ui_datapicker_head_left');
						ui_datapicker_head_left[q].children[0].value = nianNode[q];
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
				left[q].children[0].oninput = function(){
					/*if(parseInt(this.value) < 1900){
						this.value = 1900;
					}*/
					nianNode[q] = parseInt(this.value);
					controllers(nianNode[q],yueNode[q],riNode[q],q);
				}
			})(i)
		}
	}
}

//点击人物渲染右部表单
var AllMach;
function rendering(devicecode,that){
	//选中代码
	var userHeadUlShow = c('user_head_ul_show')[0];
	for(var i = 0; i < userHeadUlShow.children.length; i++){
		userHeadUlShow.children[i].children[1].style.backgroundColor = "rgba(0,0,0,0)";
	}
	for(var i = 0; i < userHeadUlShow.children.length; i++){
		if(userHeadUlShow.children[i].children[1].dataset.id == that.dataset.id){
			userHeadUlShow.children[i].children[1].style.backgroundColor = "#e5e5e5";
		};
	}
	$.ajax({
		type: 'post',
		url: URLZ + '/jf/bg/basic/dvm/searchParamObj.json',
		data: {
			devicecode: devicecode,
		},
		success: function(data){
			console.log(data);
			AllMach = data;
			var boardBuys = d('board_buys');
			var boardRentstarts = d('board_rentstarts');
			var boardRentends = d('board_rentends');
			type = 1;
			userBodyRightFootItem.style.visibility = 'visible';
			var userCount = 0;
			for(var i = 0; i < KIT.length; i++){
				if(KIT[i].id == data.obj.scopeofauthority){
					boardpPurview.value = KIT[i].text;
					boardpPurview.name = data.obj.scopeofauthority;
					userCount = 1;
				};
			}
			if(userCount == 0){
				boardpPurview.value = "";
				boardpPurview.name = "";
			}

			boardMachcode.value = data.obj.machCode;
			boardMachcode.disabled = "disabled";
			boardMachname.value = data.obj.machName;
			boardModel.value = data.obj.machModel;
			boardModel.name = data.obj.machModelID;
			boardMac.value = data.obj.macAddr;
			for(var i = 0; i < BOARDSELECT[0].length; i++){
				if(BOARDSELECT[0][i].type == data.obj.operatorID){
					boardOperator.value = BOARDSELECT[0][i].text;
				};
			}
			boardOperator.name = data.obj.operatorID;
			for(var i = 0; i < BOARDSELECT[2].length; i++){
				if(BOARDSELECT[2][i].text == data.obj.cooperationMode){
					boardConcur.name = BOARDSELECT[2][i].type;
				}
			}
			boardConcur.value = data.obj.cooperationMode;

			if(data.obj.cooperationMode == '购买'){
				boardBuys.style.display = 'table-row';
				data.obj.buyTime = worldDateTime(new Date(data.obj.buyTime).getTime());
				boardBuy.value = data.obj.buyTime.split(" ")[0];
				boardRentstarts.style.display = 'none';
				boardRentends.style.display = 'none';
				dateXuanran();
			}else if(data.obj.cooperationMode == '租赁'){
				boardBuys.style.display = 'none';
				boardRentstarts.style.display = 'table-row';
				boardRentends.style.display = 'table-row';
				data.obj.leaseStartTime = worldDateTime(new Date(data.obj.leaseStartTime).getTime());
				data.obj.leaseExpireTime = worldDateTime(new Date(data.obj.leaseExpireTime).getTime());
				boardRentstart.value = data.obj.leaseStartTime.split(" ")[0];
				boardRentend.value = data.obj.leaseExpireTime.split(" ")[0];
				dateXuanran();
			}
			boardMark.value = data.obj.remark;
			boardStop.checked = false;
			if(data.obj.dltflag == 1){
				boardStop.checked = false;
			}else{
				boardStop.checked = 'checked';
			}
		}
	})
}

//初始化渲染布局
window.onresize = function(){
	var Head = c('user_head')[0];
	var dBody = c('user_body')[0];
	dBody.style.height = window.innerHeight - Head.clientHeight - 119 + 'px';
}

function submit(){
	var bodyCreat = d('body_creat');		//创建按钮
	var bodySubmit = d('body_submit');		//保存按钮
	var userStops;
	var boardBuys = d('board_buys');
	var boardRentstarts = d('board_rentstarts');
	var boardRentends = d('board_rentends');

	//mac地址检测是否重复
	boardMac.onchange = function(){
		console.log(this.value);
		var that = this;
		$.ajax({
			type: 'post',
			url: URLZ + '/jf/bg/basic/dvm/check.json',
			data: {
				macAddr: that.value,
			},
			success: function(data){
				console.log(data);
				if(data.obj != 0){
					alern('MAC地址与'+data.obj.machName+'重复!');
					that.value = "";
				}
			}
		})
	}

	//创建事件
	bodyCreat.onclick = function(){
		userBodyRightFootItem.style.visibility = 'visible';

		boardBuys.style.display = 'none';
		boardRentstarts.style.display = 'none';
		boardRentends.style.display = 'none';
		AllMach = "";
		type = 0;
		boardpPurview.value = "";
		boardpPurview.name = "";
		boardMachcode.value = "";
		boardMachcode.disabled = false;
		boardMachname.value = "";
		boardModel.value = "";
		boardModel.name = "";
		boardMac.value = "";
		boardOperator.value = "";
		boardOperator.name = "";
		boardConcur.value = "";
		boardConcur.name = "";
		boardBuy.value = "";
		boardRentstart.value = "";
		boardRentend.value = "";
		boardMark.value = "";
		boardStop.checked = false;

		var userHeadUlShow = c('user_head_ul_show')[0];
		for(var i = 0; i < userHeadUlShow.children.length; i++){
			userHeadUlShow.children[i].children[1].style.backgroundColor = "rgba(0,0,0,0)";
		}
	}

	//保存按钮
	bodySubmit.onclick = function(){
		//创建事件
		var userError = "";
		var boardStops;
		if(boardpPurview.name == ""){
			userError += '权限范围不能为空！</br>';
		}
		if(boardMachcode.value == ""){
			userError += '设备编号不能为空！</br>';
		}
		if(boardMachname.value == ""){
			userError += '设备名称不能为空！</br>';
		}
		if(boardModel.name == ""){
			userError += '机型不能为空！</br>';
		}
		if(boardMac.value == ""){
			userError += 'MAC地址不能为空！</br>';
		}
		if(boardOperator.name == ""){
			userError += '运营方不能为空！</br>';
		}
		if(boardConcur.value == ""){
			userError += '合作方式不能为空！</br>';
		}
		if(boardBuys.style.display == 'table-row'&&boardBuy.value == ""){
			userError += '购买日期不能为空！</br>';
		}
		if(boardRentstarts.style.display == 'table-row'&&boardRentstart.value == ""){
			userError += '租赁开始日期不能为空！</br>';
		}
		if(boardRentends.style.display == 'table-row'&&boardRentend.value == ""){
			userError += '租赁结束日期不能为空！</br>';
		}
		if(boardStop.checked){
			boardStops = 0;
		}else{
			boardStops = 1;
		};
		if(userError != ""){
			alern(userError);
			return false;
		}

		var userObject = new Object();
		userObject.scopeofauthority = boardpPurview.name;
		userObject.machCode = boardMachcode.value;
		userObject.machName = boardMachname.value;
		userObject.machModel = boardModel.value;
		userObject.machModelID = boardModel.name;
		userObject.macAddr = boardMac.value;
		userObject.operateCompany = boardOperator.value;
		userObject.operatorID = boardOperator.name;
		userObject.cooperationMode = boardConcur.value;
		var date = new Date();
		if(boardConcur.value == "购买"){
			userObject.buyTime = worldDate(new Date(boardBuy.value + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()).getTime())+ " 00:00:00";
			userObject.leaseStartTime = '2018-09-03 15:31:34';
			userObject.leaseExpireTime = '2018-09-03 15:31:34';
		}else{
			userObject.buyTime = '2018-09-03 15:31:34';
			userObject.leaseStartTime = worldDate(new Date(boardRentstart.value + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()).getTime()) + " 00:00:00";
			userObject.leaseExpireTime =  worldDate(new Date(boardRentend.value + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()).getTime()) + " 00:00:00";
		}
		userObject.remark = boardMark.value;
		userObject.dltflag = boardStops;
		if(AllMach != undefined&&AllMach != ""&&AllMach != null){
			userObject.status = AllMach.obj.status;
			userObject.description = AllMach.obj.description;
			userObject.flowcard = AllMach.obj.flowcard;
			userObject.useAddr = AllMach.obj.useAddr;
			userObject.matter = AllMach.obj.matter;
			userObject.problem = AllMach.obj.problem;
			userObject.trouble = AllMach.obj.trouble;
			userObject.freeze = AllMach.obj.freeze;
		}

		console.log(type);
		if(type == 0){
			//创建事件
			$.ajax({
				type: 'post',
				url: URLZ + '/jf/bg/basic/dvm/addObj.json',
				data: {
					aObj: JSON.stringify(userObject),
				},
				success: function(data){
					if(data.result == 0){
						alert('创建成功！');
						start();
						startbody();
						userHeadSubmit.click();
						bodyCreat.click();
					}else{
						alern('创建失败！');
					}
				},
				error: function(){
					alern('创建失败');
				}
			})
		}else if(type == 1){
			//更新事件
			$.ajax({
				type: 'post',
				url: URLZ + '/jf/bg/basic/dvm/update.json',
				data: {
					uObj: JSON.stringify(userObject),
				},
				success: function(data){
					if(data.success){
						alert('更新成功');
						start();
						startbody();
						userHeadSubmit.click();
						bodyCreat.click();
					}else{
						alern('更新失败！');
					}
				},
				error: function(){
					alern('更新失败');
				}
			})
		}
	}
}

start();
startbody();	//渲染主体部分数据
submit();