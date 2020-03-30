function start(){
	group();
	Authority(loginUserName.empcode);

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
	temp.push('<li><input class="left_checkboxAll" style="margin-left: 0px;" type="checkbox"/>全选<input class="left_checkboxNomal" type="checkbox"/><span style="color: red;">过期</span><input class="left_checkboxLast" type="checkbox"/><span style="color: orange;">将过期</span></li>');	
	$.ajax({
		type: 'post',
		url: URLS + '/jf/com/util/web/alldev.json',
		data: {},
		async: false,
		success: function(data){
			//为BOM数据中的设备加入机型跟使用地址
			for(var i = 0; i <　tree.length; i++){
				if(tree[i].icon == 4){
					for(var j = 0; j < data.devs.length; j++){
						if(tree[i].devicecode == data.devs[j].machCode){
							tree[i].machModelID = data.devs[j].machModelID;
							tree[i].useAddr = data.devs[j].useAddr;
							tree[i].operateCompany = data.devs[j].operateCompany;
						}
					}
				}
			}
		}
	})
	$.ajax({
		type: 'post',
		url: URLS + '/jf/com/util/web/allmodel.json',
		data: {},
		async: false,
		success: function(data){
			//为BOM数据中的设备加入单价
			for(var i = 0; i < tree.length; i++){
				if(tree[i].icon == 4){
					for(var j = 0; j < data.modelAll.length; j++){
						if(tree[i].machModelID == data.modelAll[j].modelNum){
							tree[i].serviceFee = data.modelAll[j].serviceFee;
						}
					}
				}
			}
		}
	})
	$.ajax({
		type: 'post',
		url: URLS + '/jf/com/payment/recharge/devgroup.json',
		data: {
			deviceGroup: '[]',	//此处只需传空数组字符串即可
		},
		async: false,
		success: function(data){
			//为BOM数据中的设备加入过期时间与状态
			console.log(data);
			var treeArray = [];
				for(var i = 0; i < tree.length; i++){
					if(tree[i].icon == 4){
						if(data.serviceRenewalFrees != undefined){
							for(var j = 0; j < data.serviceRenewalFrees.length; j++){
								if(tree[i].devicecode == data.serviceRenewalFrees[j].machCode){
									tree[i].validityEndTime = data.serviceRenewalFrees[j].validityEndTime;
									tree[i].expired = data.serviceRenewalFrees[j].expired;
									treeArray.push(tree[i]);
								}
							}
						}
					}else{
						treeArray.push(tree[i]);
					}
				}
			tree = treeArray;
		}
	})
	for(var i = 0;i < tree.length;i++){
		var item = tree[i],u = "";
		if(item.icon == 0){
			temp.push('<li><img class="item'+item['lev']+'" src="image/grouping/001.png"/><a data-id="'+item.id+'" data-parent-id="'+item.parent_id+'">'+item.text+'</a></li>');
		}else if(item.icon == 1){
			temp.push('<li><img class="item'+item['lev']+'" src="image/grouping/002.png"/><a data-id="'+item.id+'" data-parent-id="'+item.parent_id+'">'+item.text+'</a></li>');
		}else if(item.icon == 2){
			temp.push('<li><img class="item'+item['lev']+'" src="image/grouping/003.png"/><a data-id="'+item.id+'" data-parent-id="'+item.parent_id+'">'+item.text+'</a></li>');
		}else if(item.icon == 4){
			if(item.expired == 1){
				temp.push('<li><input class="item'+item['lev']+' left_checkbox" data-value=\''+JSON.stringify(item)+'\' type="checkbox"/><img src="image/grouping/005.png"/><a data-id="'+item.id+' data-parent-id="'+item.parent_id+'">'+item.text+'</a></li>');
			}else if(item.expired == 2){
				temp.push('<li><input class="item'+item['lev']+' left_checkbox" data-value=\''+JSON.stringify(item)+'\' type="checkbox"/><img src="image/grouping/005.png"/><a style="color: orange;" data-id="'+item.id+' data-parent-id="'+item.parent_id+'">'+item.text+'</a></li>');
			}else{
				temp.push('<li><input class="item'+item['lev']+' left_checkbox" data-value=\''+JSON.stringify(item)+'\' type="checkbox"/><img src="image/grouping/005.png"/><a style="color: red;" data-id="'+item.id+' data-parent-id="'+item.parent_id+'">'+item.text+'</a></li>');
			}
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

	var userBodyRightBodyFoot = c('user_body_right_body_foot')[0];	//右边承载体
	var userBodyRightBodyFootCount = 0;								//记录选中设备条数使用变量
	var userBodyRightpSpan = c('user_body_right_p_span')[0];		//批量选择续费时长下拉框

	//左边树结构全选功能
	c('left_checkboxAll')[0].onclick = function(){
		if(this.checked){
			//第一步for循环为先清除掉原先被选择的目标
			for(var i = 0; i < c('left_checkbox').length; i++){
				noChecked(c('left_checkbox')[i]);
			}
			for(var i = 0; i < c('left_checkbox').length; i++){
				c('left_checkbox')[i].checked = true;
				yesChecked(c('left_checkbox')[i]);
			}
			userBodyRightpSpan.style.display = 'inline-block';
		}else{
			for(var i = 0; i < c('left_checkbox').length; i++){
				c('left_checkbox')[i].checked = false;
				noChecked(c('left_checkbox')[i]);
			}
			userBodyRightpSpan.style.display = 'none';
		}
	}
	//左边树结构过期全选功能
	c('left_checkboxNomal')[0].onclick = function(){
		if(this.checked){
			//第一步for循环为先清除掉原先被选择的目标
			for(var i = 0; i < c('left_checkbox').length; i++){
				if(JSON.parse(c('left_checkbox')[i].dataset.value).expired == -1){
					noChecked(c('left_checkbox')[i]);
				};
			}
			for(var i = 0; i < c('left_checkbox').length; i++){
				if(JSON.parse(c('left_checkbox')[i].dataset.value).expired == -1){
					c('left_checkbox')[i].checked = true;
					yesChecked(c('left_checkbox')[i]);
				};
			}
			userBodyRightpSpan.style.display = 'inline-block';
		}else{
			for(var i = 0; i < c('left_checkbox').length; i++){
				if(JSON.parse(c('left_checkbox')[i].dataset.value).expired == -1){
					c('left_checkbox')[i].checked = false;
					noChecked(c('left_checkbox')[i]);
				}
			}
			if(userBodyRightBodyFootCount <= 0){
				userBodyRightpSpan.style.display = 'none';
			}
		}
	}
	c('left_checkboxNomal')[0].click();
	//左边树结构将过期全选功能
	c('left_checkboxLast')[0].onclick = function(){
		if(this.checked){
			//第一步for循环为先清除掉原先被选择的目标
			for(var i = 0; i < c('left_checkbox').length; i++){
				if(JSON.parse(c('left_checkbox')[i].dataset.value).expired == 2){
					noChecked(c('left_checkbox')[i]);
				};
			}
			for(var i = 0; i < c('left_checkbox').length; i++){
				if(JSON.parse(c('left_checkbox')[i].dataset.value).expired == 2){
					c('left_checkbox')[i].checked = true;
					yesChecked(c('left_checkbox')[i]);
				};
			}
			userBodyRightpSpan.style.display = 'inline-block';
		}else{
			for(var i = 0; i < c('left_checkbox').length; i++){
				if(JSON.parse(c('left_checkbox')[i].dataset.value).expired == 2){
					c('left_checkbox')[i].checked = false;
					noChecked(c('left_checkbox')[i]);
				}
			}
			if(userBodyRightBodyFootCount <= 0){
				userBodyRightpSpan.style.display = 'none';
			}
		}
	}

	//设备选中功能
	for(var i = 0; i < c('left_checkbox').length; i++){
		(function(q){
			c('left_checkbox')[q].onchange = function(){
				if(this.checked){
					yesChecked(this);
					userBodyRightpSpan.style.display = 'inline-block';
				}else{
					noChecked(this);
					if(userBodyRightBodyFootCount <= 0){
						userBodyRightpSpan.style.display = 'none';
					}
				}
			}
		})(i)
	}

	function yesChecked(bthis){
		userBodyRightBodyFootCount++;
		//计算总台数
		c('user_body_right_foot_num')[0].innerHTML = userBodyRightBodyFootCount;

		var divList = creat('div');
		divList.className = 'user_body_right_body_foot_list';
		var that = JSON.parse(bthis.dataset.value);
		for(var j = 0; j < 8; j++){
			var divListItem = creat('div');
			divListItem.className = 'user_body_right_body_foot_list_item';
			var divListItemSpan = creat('span');
			switch(j){
				case 0:
					divListItemSpan.className = 'user_body_right_body_foot_list_item_no';
					divListItemSpan.innerHTML = userBodyRightBodyFootCount;
					break;
				case 1:
					divListItemSpan.className = 'user_body_right_body_foot_list_item_opr';
					divListItemSpan.innerHTML = that.operateCompany;
					break;
				case 2:
					divListItemSpan.className = 'user_body_right_body_foot_list_item_dev';
					divListItemSpan.innerHTML = that.text;
					break;
				case 3:
					divListItemSpan.className = 'user_body_right_body_foot_list_item_addr';
					divListItemSpan.innerHTML = that.useAddr;
					break;
				case 4:
					divListItemSpan.className = 'user_body_right_body_foot_list_item_time';
					divListItemSpan.innerHTML = "<input class='user_body_right_body_foot_list_item_int' data-value='"+JSON.stringify(that)+"' data-dev='"+that.devicecode+"' oninput='this.value=this.value.replace(/\d/,\"\");if(this.value == \"\"){this.value = \"\";}else if(this.value > 12){this.value = 12;}else if(this.value < 1){this.value=1;};this.offsetParent.children[5].innerHTML = \"<span class=user_body_right_body_foot_list_item_money>\"+ Math.round(this.value * JSON.parse(this.dataset.value).serviceFee*10)/10+\"</span>\";SP();total();' onclick='this.offsetParent.children[5].innerHTML = \"<span class=user_body_right_body_foot_list_item_money>\"+ Math.round(this.value * JSON.parse(this.dataset.value).serviceFee*10)/10+\"</span>\";SP();total();' type='number' value='1'/>月";
					break;
				case 5:
					divListItemSpan.className = 'user_body_right_body_foot_list_item_money';
					divListItemSpan.innerHTML = that.serviceFee * 1;
					break;
				case 6:
					divListItemSpan.className = 'user_body_right_body_foot_list_item_date';
					divListItemSpan.innerHTML = that.validityEndTime;
					break;
				case 7:
					divListItemSpan.className = 'user_body_right_body_foot_list_item_view';
					divListItemSpan.innerHTML = '<button class="user_body_right_body_foot_list_item_btn" data-value="'+that.devicecode+'">充值明细</button>';
					break;
			}
			divListItem.appendChild(divListItemSpan);
			divList.appendChild(divListItem);
		}
		var divListItemClear = creat('div');
		divListItemClear.style.clear = 'both';
		divList.appendChild(divListItemClear);
		userBodyRightBodyFoot.appendChild(divList);
		for(var j = 0; j < c('user_body_right_body_foot_list_item_btn').length; j++){
			c('user_body_right_body_foot_list_item_btn')[j].onclick = function(){
				console.log(this.dataset.value);
				$.ajax({
					type: 'post',
					url: URLS + '/jf/com/payment/recharge/singledev.json',
					data: {
						machCode: this.dataset.value,
					},
					success: function(data){
						console.log(data);
						c('user_body_right_body_foot_fixed')[0].style.display = 'block';
						c('user_body_right_body_foot_fixed_body_tbody')[0].innerHTML = '';
						for(var k = 0; k < data.serviceHistoricalRenewalFree.length; k++){
							var tr = creat('tr');
							var tda = creat('td');
							var tdb = creat('td');
							var tdc = creat('td');
							var tdd = creat('td');
							var tde = creat('td');
							var tdf = creat('td');
							var tdg = creat('td');
							var tdh = creat('td');
							var tdi = creat('td');
							tda.innerHTML = k+1;
							tdb.innerHTML = data.serviceHistoricalRenewalFree[k].operatorCompany;
							tdc.innerHTML = data.serviceHistoricalRenewalFree[k].machName;
							tdd.innerHTML = data.serviceHistoricalRenewalFree[k].renewalTimeVar;
							tde.innerHTML = data.serviceHistoricalRenewalFree[k].executor;
							tdf.innerHTML = data.serviceHistoricalRenewalFree[k].rechargeOrder;
							tdg.innerHTML = data.serviceHistoricalRenewalFree[k].paymentAmount;
							tdh.innerHTML = data.serviceHistoricalRenewalFree[k].updateTime;
							tdi.innerHTML = data.serviceHistoricalRenewalFree[k].validityEndTime;
							tr.appendChild(tda);
							tr.appendChild(tdb);
							tr.appendChild(tdc);
							tr.appendChild(tdd);
							tr.appendChild(tde);
							tr.appendChild(tdf);
							tr.appendChild(tdg);
							tr.appendChild(tdh);
							tr.appendChild(tdi);
							c('user_body_right_body_foot_fixed_body_tbody')[0].appendChild(tr);
						}
					}
				})
			}
		}
		//c('user_body_right_body_foot_list_item_btn');
		total();
		/*for(var j = 0; j < c('user_body_right_body_foot_list_item_int').length; j++){
			(function(q){
				c('user_body_right_body_foot_list_item_int')[q].oninput = function(){
					this.value=this.value.replace(/[^\d]/g,'');
				}
			})(j)
		}*/
		SP();	//适配样式调用
	}

	function noChecked(bthis){
		for(var j = 0; j < c('user_body_right_body_foot_list_item_dev').length; j++){
			if(c('user_body_right_body_foot_list_item_dev')[j].innerHTML == JSON.parse(bthis.dataset.value).text){
				userBodyRightBodyFootCount--;
				//计算总台数
				c('user_body_right_foot_num')[0].innerHTML = userBodyRightBodyFootCount;

				userBodyRightBodyFoot.removeChild(c('user_body_right_body_foot_list')[j]);
				for(var k = 0; k < c('user_body_right_body_foot_list_item_no').length; k++){
					c('user_body_right_body_foot_list_item_no')[k].innerHTML = k + 1;
				}
				total();
			};
		}
	}
	//thead浮空渲染
	/*var footFixedTable = c('user_body_right_foot_fixed_table')[0];
	var footFixedThead = c('user_body_right_foot_fixed_thead')[0];
	var footFixedTbody = c('user_body_right_foot_fixed_tbody')[0];
	for(var i = 0; i < footFixedThead.children[0].children.length;i++){
		footFixedThead.children[0].children[i].style.width = footFixedTbody.children[0].children[i].clientWidth + 'px';
	}*/
}

var array = ['a','b','c','d','e','f','g'];

//搜索渲染
var userHeadSubmit = c('user_head_submit')[0];
userHeadSubmit.onclick = function(){
	var userHeadGroup = d('user_head_group').name;
	if(userHeadGroup == ""){
		userHeadGroup = loginUserName.scopeofauthority;
	}
	console.log(userHeadGroup);
	$.ajax({
		type: 'post',
		url: URLZ + '/jf/bg/basic/cfc/searchClassifi.json',
		data: {
			id: userHeadGroup,
			by: "",
			stop: 1,
		},
		success: function(data){
			console.log(data);
			KITSort = data.obj;
			c('user_body_right_body_foot')[0].innerHTML = "";
			c('user_body_right_foot_num')[0].innerHTML = 0;
			c('user_body_right_foot_pric')[0].innerHTML = 0;
			startbody();
		}
	})
}

//初始化渲染布局
window.onresize = function(){
	var Head = c('user_head')[0];
	var dBody = c('user_body')[0];
	dBody.style.height = window.innerHeight - Head.clientHeight - 119 + 'px';

	c('advertise_board_fixed_body')[0].style.marginTop = -(c('advertise_board_fixed_body')[0].clientHeight / 2) + 50 + 'px';

	//thead浮空渲染
	/*var footFixedTable = c('user_body_right_foot_fixed_table')[0];
	var footFixedThead = c('user_body_right_foot_fixed_thead')[0];
	var footFixedTbody = c('user_body_right_foot_fixed_tbody')[0];
	for(var i = 0; i < footFixedThead.children[0].children.length;i++){
		footFixedThead.children[0].children[i].style.width = footFixedTbody.children[0].children[i].clientWidth + 'px';
	}*/
}

//全选事件
c('user_body_right_p_select')[0].onchange = function(){
	for(var i = 0; i < c('user_body_right_body_foot_list_item_int').length; i++){
		c('user_body_right_body_foot_list_item_int')[i].value = this.value;
		c('user_body_right_body_foot_list_item_int')[i].click();
	}
}

//续费列表内容垂直居中
for(var i = 0; i < c('user_body_right_body_head_item').length; i++){
	c('user_body_right_body_head_item')[i].children[0].style.marginTop = (c('user_body_right_body_head_item')[i].clientHeight - c('user_body_right_body_head_item')[i].children[0].clientHeight)/2 + 'px';
}
function SP(){
	for(var i = 0; i < c('user_body_right_body_foot_list_item').length; i++){
		c('user_body_right_body_foot_list_item')[i].children[0].style.marginTop = (c('user_body_right_body_foot_list_item')[i].clientHeight - c('user_body_right_body_foot_list_item')[i].children[0].clientHeight)/2 + 'px';
	}
}
function total(){
	//计算总价格
	var userBodyRightBodyFootCounts = 0;
	for(var k = 0; k < c('user_body_right_body_foot_list_item_money').length; k++){
		userBodyRightBodyFootCounts +=	Number(c('user_body_right_body_foot_list_item_money')[k].innerHTML);
	}
	c('user_body_right_foot_pric')[0].innerHTML = Math.round(userBodyRightBodyFootCounts*10)/10;
}

c('advertise_board_fixed_body_clear')[0].onclick = function(){
	c('advertise_board_fixed')[0].style.display = 'none';
}
c('user_body_right_body_foot_fixed_body_clear')[0].onclick = function(){
	c('user_body_right_body_foot_fixed')[0].style.display = 'none';
}

function submit(){
	var userBodyRightBodyFootListItemInt = c('user_body_right_body_foot_list_item_int');
	var submitArray = [];
	c('user_body_right_foot_btn')[0].onclick = function(){
		console.log(userBodyRightBodyFootListItemInt.length);
		if(userBodyRightBodyFootListItemInt.length == 0){
			alern('请选择至少一台设备！');
			return false;
		}
		submitArray = [];
		for(var i = 0; i < userBodyRightBodyFootListItemInt.length; i++){
			var submitObject = new Object();
			submitObject.machCode = userBodyRightBodyFootListItemInt[i].dataset.dev;
			submitObject.renewalTime = userBodyRightBodyFootListItemInt[i].value;
			submitArray.push(submitObject);
		}
		c('advertise_board_fixed')[0].style.display = 'block';
		c('advertise_board_fixed_body_home')[0].style.display = 'block';
		c('advertise_board_fixed_body_home_ewm')[0].style.display = 'none';
		c('advertise_board_fixed_body')[0].style.marginTop = -(c('advertise_board_fixed_body')[0].clientHeight / 2) + 50 + 'px';
	}

	c('advertise_board_fixed_body_home_left')[0].onclick = function(){
		c('advertise_board_fixed_body_home')[0].style.display = 'none';
		c('advertise_board_fixed_body_home_ewm')[0].style.display = 'block';
		c('advertise_board_fixed_body')[0].style.marginTop = -(c('advertise_board_fixed_body')[0].clientHeight / 2) + 50 + 'px';
		console.log(submitArray);
		c('advertise_board_fixed_body_home_ewm')[0].innerHTML = '<div class="advertise_board_fixed_body_home_ewm_loading"></div>';
		$.ajax({
			type: 'post',
			url: URLS + '/jf/com/payment/recharge/wechat.json',
			data: {
				obj: JSON.stringify(submitArray),
				userId: JSON.parse(sessionStorage.loginUserName).empcode,
			},
			success: function(data){
				console.log(data);
				c('advertise_board_fixed_body_home_ewm')[0].innerHTML = "";
				var qrcode = new QRCode(c("advertise_board_fixed_body_home_ewm")[0], {
		            width : 220,//设置宽高
		            height : 220,
		        });
       			qrcode.makeCode(data.wechat);
			}
		})
	}

	c('advertise_board_fixed_body_home_right')[0].onclick = function(){
		c('advertise_board_fixed_body_home')[0].style.display = 'none';
		c('advertise_board_fixed_body_home_ewm')[0].style.display = 'block';
		c('advertise_board_fixed_body')[0].style.marginTop = -(c('advertise_board_fixed_body')[0].clientHeight / 2) + 50 + 'px';
		c('advertise_board_fixed_body_home_ewm')[0].innerHTML = '<div class="advertise_board_fixed_body_home_ewm_loading"></div>';
		$.ajax({
			type: 'post',
			url: URLS + '/jf/com/payment/recharge/alipay.json',
			data: {
				obj: JSON.stringify(submitArray),
				userId: JSON.parse(sessionStorage.loginUserName).empcode,
			},
			success: function(data){
				console.log(data);
				c('advertise_board_fixed_body_home_ewm')[0].innerHTML = "";
				var qrcode = new QRCode(c("advertise_board_fixed_body_home_ewm")[0], {
		            width : 220,//设置宽高
		            height : 220,
		        });
       			qrcode.makeCode(data.alipay);
			}
		})
	}
}
start();
startbody();	//渲染主体部分数据
submit();
SP();			//适配样式调用