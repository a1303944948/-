function start(){	
	//权限控制
	Authority(loginUserName.empcode);
	//获取BOM树
	$.ajax({
		type: 'post',
		url: URLZ + '/jf/bg/basic/cfc/searchClassifi.json',
		async: false,
		data: {
			id: loginUserName.scopeofauthority,
			by: "",
			stop: 1,
		},
		success: function(data){
			MACH = data.obj;
			MACHS = data.obj;
			KITSort = [];
			for(var i = 0; i < MACH.length; i++){
				if(MACH[i].icon == 4){
					KITSort.push(MACH[i]);
				}
			}
			for(var i = 0; i < MACH.length; i++){
				if(MACH[i].icon == 2){
					KITSort.push(MACH[i]);
				}
			}
			for(var i = 0; i < MACH.length; i++){
				if(MACH[i].icon == 1){
					KITSort.push(MACH[i]);
				}
			}
			for(var i = 0; i < MACH.length; i++){
				if(MACH[i].icon == 0){
					KITSort.push(MACH[i]);
				}
			}
			MACHS = KITSort;
		}
	})
	/*MACH = [
		{id: 2,text: '森淋',parent_id: 1,icon: 1,stop: 1},
		{id: 1,text: '嘉丰机电',parent_id: 0,icon: 0,stop: 1},
		{id: 3,text: '鼎阳',parent_id: 1,icon: 1,stop: 1},
		{id: 4,text: '大华',parent_id: 2,icon: 2,stop: 1},
		{id: 5,text: '二华',parent_id: 2,icon: 2,stop: 1},
		{id: 6,text: '朝阳',parent_id: 3,icon: 2,stop: 1},
		{id: 7,text: '三华',parent_id: 2,icon: 2,stop: 1},
		{id: 8,text: '方格',parent_id: 1,icon: 1,stop: 1},
		{id: 10,text: '东莞',parent_id: 9,icon: 2,stop: 1},
		{id: 9,text: '广州',parent_id: 8,icon: 2,stop: 1},
		{id: 11,text: '谋街',parent_id: 10,icon: 2,stop: 1},
		{id: 12,text: '金牛座',parent_id: 11,icon: 2,stop: 1},
		{id: 13,text: '森淋2',parent_id: 1,icon: 1,stop: 1},
		{id: 14,text: '鼎阳2',parent_id: 1,icon: 1,stop: 1},
		{id: 15,text: '大华',parent_id: 13,icon: 2,stop: 1},
		{id: 16,text: '二华',parent_id: 13,icon: 2,stop: 1},
		{id: 17,text: '朝阳',parent_id: 14,icon: 2,stop: 1},
		{id: 18,text: '三华',parent_id: 13,icon: 2,stop: 1},
		{id: 19,text: '方格2',parent_id: 1,icon: 1,stop: 1},
		{id: 20,text: '广州',parent_id: 19,icon: 2,stop: 1},
		{id: 21,text: '东莞',parent_id: 20,icon: 2,stop: 1},
		{id: 22,text: '谋街',parent_id: 21,icon: 2,stop: 1},
		{id: 23,text: '金牛座',parent_id: 22,icon: 2,stop: 1},
		{id: 24,text: '森淋3',parent_id: 1,icon: 1,stop: 1},
		{id: 25,text: '鼎阳3',parent_id: 1,icon: 1,stop: 1},
		{id: 26,text: '大华',parent_id: 24,icon: 2,stop: 1},
		{id: 27,text: '二华',parent_id: 24,icon: 2,stop: 1},
		{id: 28,text: '朝阳',parent_id: 25,icon: 2,stop: 1},
		{id: 29,text: '三华',parent_id: 24,icon: 2,stop: 1},
		{id: 30,text: '方格3',parent_id: 1,icon: 1,stop: 1},
		{id: 31,text: '广州',parent_id: 30,icon: 2,stop: 1},
		{id: 32,text: '东莞',parent_id: 31,icon: 2,stop: 1},
		{id: 33,text: '谋街',parent_id: 32,icon: 2,stop: 1},
		{id: 34,text: '金牛座',parent_id: 33,icon: 2,stop: 1},
		{id: 35,text: '金牛座1',parent_id: 34,icon: 2,stop: 1},
		{id: 36,text: '金牛座2',parent_id: 35,icon: 2,stop: 1},
		{id: 37,text: '金牛座3',parent_id: 36,icon: 2,stop: 1},
	];
	MACHS = [
		{id: 2,text: '森淋',parent_id: 1,icon: 1,stop: 1},
		{id: 1,text: '嘉丰机电',parent_id: 0,icon: 0,stop: 1},
		{id: 3,text: '鼎阳',parent_id: 1,icon: 1,stop: 1},
		{id: 4,text: '大华',parent_id: 2,icon: 2,stop: 1},
		{id: 5,text: '二华',parent_id: 2,icon: 2,stop: 1},
		{id: 6,text: '朝阳',parent_id: 3,icon: 2,stop: 1},
		{id: 7,text: '三华',parent_id: 2,icon: 2,stop: 1},
		{id: 8,text: '方格',parent_id: 1,icon: 1,stop: 1},
		{id: 9,text: '广州',parent_id: 8,icon: 2,stop: 1},
		{id: 10,text: '东莞',parent_id: 9,icon: 2,stop: 1},
		{id: 11,text: '谋街',parent_id: 10,icon: 2,stop: 1},
		{id: 12,text: '金牛座',parent_id: 11,icon: 2,stop: 1},
		{id: 13,text: '森淋2',parent_id: 1,icon: 1,stop: 1},
		{id: 14,text: '鼎阳2',parent_id: 1,icon: 1,stop: 1},
		{id: 15,text: '大华',parent_id: 13,icon: 2,stop: 1},
		{id: 16,text: '二华',parent_id: 13,icon: 2,stop: 1},
		{id: 17,text: '朝阳',parent_id: 14,icon: 2,stop: 1},
		{id: 18,text: '三华',parent_id: 13,icon: 2,stop: 1},
		{id: 19,text: '方格2',parent_id: 1,icon: 1,stop: 1},
		{id: 20,text: '广州',parent_id: 19,icon: 2,stop: 1},
		{id: 21,text: '东莞',parent_id: 20,icon: 2,stop: 1},
		{id: 22,text: '谋街',parent_id: 21,icon: 2,stop: 1},
		{id: 23,text: '金牛座',parent_id: 22,icon: 2,stop: 1},
		{id: 24,text: '森淋3',parent_id: 1,icon: 1,stop: 1},
		{id: 25,text: '鼎阳3',parent_id: 1,icon: 1,stop: 1},
		{id: 26,text: '大华',parent_id: 24,icon: 2,stop: 1},
		{id: 27,text: '二华',parent_id: 24,icon: 2,stop: 1},
		{id: 28,text: '朝阳',parent_id: 25,icon: 2,stop: 1},
		{id: 29,text: '三华',parent_id: 24,icon: 2,stop: 1},
		{id: 30,text: '方格3',parent_id: 1,icon: 1,stop: 1},
		{id: 31,text: '广州',parent_id: 30,icon: 2,stop: 1},
		{id: 32,text: '东莞',parent_id: 31,icon: 2,stop: 1},
		{id: 33,text: '谋街',parent_id: 32,icon: 2,stop: 1},
		{id: 34,text: '金牛座',parent_id: 33,icon: 2,stop: 1},
		{id: 35,text: '金牛座1',parent_id: 34,icon: 2,stop: 1},
		{id: 36,text: '金牛座2',parent_id: 35,icon: 2,stop: 1},
		{id: 37,text: '金牛座3',parent_id: 36,icon: 2,stop: 1},
		{id: 38,text: '张三',parent_id: 37,icon: 3,stop: 1},
		{id: 39,text: '李四',parent_id: 1,icon: 3,stop: 1},
		{id: 40,text: '王五',parent_id: 1,icon: 3,stop: 1},
		{id: 41,text: '赵六',parent_id: 2,icon: 3,stop: 1},
		{id: 42,text: '牛七',parent_id: 4,icon: 3,stop: 1},
		{id: 43,text: '陈八',parent_id: 2,icon: 3,stop: 1},
		{id: 44,text: '黄九',parent_id: 2,icon: 3,stop: 1},
		{id: 45,text: '金牛座001',parent_id: 37,icon: 4,stop: 1},
		{id: 46,text: '金牛座002',parent_id: 1,icon: 4,stop: 1},
		{id: 47,text: '金牛座003',parent_id: 1,icon: 4,stop: 1},
		{id: 48,text: '双子座001',parent_id: 2,icon: 4,stop: 1},
		{id: 49,text: '双子座002',parent_id: 4,icon: 4,stop: 1},
		{id: 50,text: '双子座003',parent_id: 2,icon: 4,stop: 1},
		{id: 51,text: '白羊座001',parent_id: 2,icon: 4,stop: 1},
	];*/

	var body = document.getElementsByTagName('body')[0];

	/*function familyTree(arr, pid) {
	    var temp = [];
	    var forFn = function(arr, pid){
	        for (var i = 0; i < arr.length; i++) {
	            var item = arr[i];
	            if (item.id == pid) {
	                temp.push(item);

	                forFn(arr,item.parent_id);
	            }
	        }
	    };
	    forFn(arr, pid);
	    return temp;
	}*/
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
	for(var i = 0; i < MACH.length; i++){
		count.push(MACH[i].parent_id);
	}
	var tree = sonsTree(MACH,Math.min.apply(Math,count));
	var temp = [];
	for(var i=0;i<tree.length;i++){
	    var item = tree[i],u = "";
	    if(item.icon == 0){
	   		temp.push('<li><img class="item'+item['lev']+'" src="image/grouping/001.png"/><a data-id="'+item.operatorID+'">'+item.text+'</a></li>');
	    }else if(item.icon == 1){
	   		temp.push('<li><img class="item'+item['lev']+'" src="image/grouping/002.png"/><a data-id="'+item.operatorID+'">'+item.text+'</a></li>');
	    }else if(item.icon == 2){
	   		temp.push('<li><img class="item'+item['lev']+'" src="image/grouping/003.png"/><a data-id="'+item.operatorID+'">'+item.text+'</a></li>');
	    }/*else if(item.icon == 3){
	   		temp.push('<li><img class="item'+item['lev']+'" src="image/grouping/004.png"/><a data-id="'+item.id+'">'+item.text+'</a></li>');
	    }*/
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
		for(var j = 0; j < MACHSTOP[i].length; j++){
			var li = creat('li');
			li.innerHTML = MACHSTOP[i][j].text;
			li.setAttribute("data-value", MACHSTOP[i][j].value);
			ul.appendChild(li);
		}
		Head.appendChild(ul);

		(function(q){
			var headUl = c('user_head_uls');
			Select[q].onfocus = function(){
				if(q == 1){
					headUl[q].style.display = "inline-block";
					headUl[q].style.minWidth = Select[q].clientWidth + 'px';
					headUl[q].style.left = this.offsetLeft + 5 + 255 + 'px';
					headUl[q].style.top = this.offsetTop + this.clientHeight + 210 + 'px';
					headUl[q].style.maxHeight = window.innerHeight - this.offsetTop - 190 - 23 - 200 + 'px';
				}else{
					headUl[q].style.display = "inline-block";
					headUl[q].style.minWidth = Select[q].clientWidth + 'px';
					headUl[q].style.left = this.offsetParent.offsetLeft + 5 + 'px';
					headUl[q].style.top = this.offsetParent.offsetTop + this.clientHeight + 5 + 'px';
					headUl[q].style.maxHeight = window.innerHeight - Select[q].offsetParent.offsetTop - 200 + 'px';
				}
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

var rightFootItem = c('user_body_right_foot_item');
for(var i = 0; i < rightFootItem.length; i++){
	rightFootItem[i].style.display = 'none';
}
var rightFootItemBtnbb = c('user_body_right_foot_item_btnbb')[0];
function rendering(msgObject,that){
	//选中效果实现
	var userHeadUlShow = c('user_head_ul_show')[0];
	for(var i = 0; i < userHeadUlShow.children.length; i++){
		userHeadUlShow.children[i].children[1].style.backgroundColor = "rgba(0,0,0,0)";
	}
	for(var i = 0; i < userHeadUlShow.children.length; i++){
		if(userHeadUlShow.children[i].children[1].dataset.id == that.dataset.id){
			userHeadUlShow.children[i].children[1].style.backgroundColor = "#e5e5e5";
		};
	}

	//table切换页面点击后才会出现页面
	for(var i = 0; i < rightFootItem.length; i++){
		rightFootItem[i].style.display = 'block';
	}
	//售货机详细信息变量
	var machineGrouping = d('machine_grouping');	//设备分组
	var machineName = d('machine_name');			//设备名称
	var machineNumber = d('machine_number');		//设备编号
	var machineMac = d('machine_mac');				//设备mac地址
	var machineAddr = d('machine_addr');			//设备地址
	var machineTraffic = d('machine_traffic');		//设备流量卡
	var machineExplain = d('machine_explain');		//设备说明
	var machineFreeze = d('machine_freeze');		//是否冻结
	//渲染详细信息
	$.ajax({
		type: 'post',
		url: URLS + '/jf/bg/basic/dvm/searchParamObj.json',
		data: {
			devicecode: msgObject.devicecode,
		},
		success: function(data){
			//渲染保存远程取物门开启时间
			c('remote_selectc')[0].value = data.obj.pickupdoor;
			for(var i = 0; i < MACH.length; i++){
				if(data.obj.operatorID == MACH[i].operatorID){
					machineGrouping.value = MACH[i].text;
					machineGrouping.name = MACH[i].operatorID;
					break;
				}
			}
			machineName.value = data.obj.machName;
			machineNumber.value = data.obj.machCode;
			machineMac.value = data.obj.macAddr;
			data.obj.useAddr?machineAddr.value = data.obj.useAddr:machineAddr.value = "";
			data.obj.flowcard?machineTraffic.value = data.obj.flowcard:machineTraffic.value = "";
			data.obj.description?machineExplain.value = data.obj.description:machineExplain.value = "";
			if(msgObject.isFree == 1){
				c('machine_freeze_tr')[0].style.display = 'none';
			}else{
				c('machine_freeze_tr')[0].style.display = 'table-row';
				if(data.obj.freeze != 1){
					machineFreeze.checked = 'checked';
				}else{
					machineFreeze.checked = false;
				}
			}
			//详细信息保存
			var rightFootItemBtna = c('user_body_right_foot_item_btna')[0];
			rightFootItemBtna.onclick = function(){
				data.obj.useAddr = machineAddr.value;
				data.obj.flowcard = machineTraffic.value;
				data.obj.description = machineExplain.value;
				data.obj.operateCompany = machineGrouping.value;
				data.obj.operatorID = machineGrouping.name;
				data.obj.machName = machineName.value;

				if(msgObject.isFree == 1){
					data.obj.freeze = 1;
				}else{
					if(machineFreeze.checked){
						data.obj.freeze = 0;
					}else{
						data.obj.freeze = 1;
					}
				}
				if(data.obj.machName == ""){
					alern('设备名称不能为空');
					return false;
				}
				$.ajax({
					type: 'post',
					url: URLZ + '/jf/bg/basic/dvm/update.json',
					data: {
						uObj: JSON.stringify(data.obj),
					},
					success: function(msg){
						if(msg.status == 10001){
							alern(msg.msg);
							userHeadSubmit.click();
						}else{
							alern(msg.msg);
						};
					},
					error: function(){
						alern('失败');
					}
				})
			}
		}
	})

	machineAll(msgObject.devicecode);
	ycStart(msgObject.devicecode,MACHOBJECT.machModelID);		//远程控制
	renderingAlarm(msgObject.devicecode,MACHOBJECT.machModelID)	//调用警报页面渲染方法
}

//搜索渲染
var userHeadSubmit = c('user_head_submit')[0];
userHeadSubmit.onclick = function(){
	var userHeadGroup = d('user_head_grouping').name;
	/*var userHeadSeach = d('user_head_seach').value;*/
	if(userHeadGroup == ""){
		userHeadGroup = loginUserName.scopeofauthority;
	}
	$.ajax({
		type: 'post',
		url: URLZ + '/jf/bg/basic/cfc/searchClassifi.json',
		data: {
			id: userHeadGroup,
			by: "",
			stop: 1,
		},
		success: function(data){
			MACHS = data.obj;
			startbody();
		}
	})
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
	for(var i = 0; i < MACHS.length; i++){
		count.push(MACHS[i].parent_id);
	}
	var tree = sonsTree(MACHS,Math.min.apply(Math,count));
	/*$.ajax({
		type: 'post',
		url: URLS + '/jf/com/util/web/alldev.json',
		data: {},
		async: false,
		success: function(data){
			for(var i = 0; i < tree.length; i++){
				if(tree[i].icon == 4){
					for(var j = 0; j < data.devs.length; j++){
						if(tree[i].devicecode == data.devs[j].machCode){
							tree[i].operatorID = data.devs[j].operatorID;
						}
					}
				}
			}
		}
	})
	$.ajax({
		type: 'post',
		url: URLS + '/jf/com/util/web/alloperate.json',
		data: {},
		async: false,
		success: function(data){
			for(var i = 0; i < tree.length; i++){
				if(tree[i].icon == 4){
					for(var j = 0; j < data.operates.length; j++){
						if(tree[i].operatorID == data.operates[j].operatorID){
							tree[i].isFree = data.operates[j].isFree;
						}
					}
				}
			}
		}
	})*/
	var temp = [];
	for(var i=0;i<tree.length;i++){
		var item = tree[i],u = "";
		if(item.icon == 0){
			temp.push('<li><img class="item'+item['lev']+'" src="image/grouping/001.png"/><a data-id="'+item.id+'" data-parent-id="'+item.parent_id+'">'+item.text+'</a></li>');
		}else if(item.icon == 1){
			temp.push('<li><img class="item'+item['lev']+'" src="image/grouping/002.png"/><a data-id="'+item.id+'" data-parent-id="'+item.parent_id+'">'+item.text+'</a></li>');
		}else if(item.icon == 2){
			temp.push('<li><img class="item'+item['lev']+'" src="image/grouping/003.png"/><a data-id="'+item.id+'" data-parent-id="'+item.parent_id+'">'+item.text+'</a></li>');
		}else if(item.icon == 4&&item.stop == 1){
			temp.push('<li><img class="item'+item['lev']+'" src="image/grouping/005.png"/><a data-id="'+item.id+'" onclick=\'rendering('+JSON.stringify(item)+',this)\'>'+item.text+'</a></li>');
		}/*else if(item.icon == 3){()\' data-parent-id="'+item.parent_id+'">'+item.text+'</a></li>');
		}*/
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


	//渲染右边结构部分
	//MACHHEAD = listMenu();
	var BottomUl = c('user_body_right_head_bottom_ul')[0];
	BottomUl.innerHTML = "";
	for(var i = 0; i < MACHHEAD.length; i++){
		var li = creat('li');
		li.innerHTML = MACHHEAD[i].text;
		li.setAttribute('data-menuid',MACHHEAD[i].menuid);
		BottomUl.appendChild(li);
	}
	var divClear = creat('div');
	divClear.className = 'clear';
	BottomUl.appendChild(divClear);

	//渲染右边table切换
	var footList = c('user_body_right_foot_list');
	var ulLi = c('user_body_right_head_bottom_ul')[0].children;

	for(var i = 0; i < MACHHEAD.length; i++){
		(function(q){
			ulLi[q].onclick = function(){
				for(var j = 0; j < footList.length; j++){
					footList[j].style.visibility = 'hidden';
				}
				for(var j = 0; j < ulLi.length; j++){
					ulLi[j].style.borderTop = 'none';
					ulLi[j].style.borderLeft = 'none';
					ulLi[j].style.borderRight = 'none';
					ulLi[j].style.marginTop = '0px';
					ulLi[j].style.color = '#428BCA';
					ulLi[j].style.backgroundColor = '#f0f0f0';
				}
				for(var j = 0; j < footList.length; j++){
					if(this.dataset.menuid == footList[j].dataset.menuid){
						footList[j].style.visibility = 'visible';
						this.style.borderTop = '2px #16b904 solid';
						this.style.borderLeft = '1px #e5e5e5 solid';
						this.style.borderRight = '1px #e5e5e5 solid';
						this.style.marginTop = '-1px';
						this.style.color = '#666666';
						this.style.backgroundColor = '#ffffff';
					}
				}
			}
		})(i)
	}

	var allNone = 0;
	for(var i = 0; i < MACHHEAD.length; i++){
		if(MACHHEAD[i].value == 1){
			for(var j = 0; j < footList.length; j++){
				if(MACHHEAD[i].menuid == footList[j].dataset.menuid){
					footList[j].style.visibility = 'visible';
					ulLi[i].style.borderTop = '2px #16b904 solid';
					ulLi[i].style.borderLeft = '1px #e5e5e5 solid';
					ulLi[i].style.borderRight = '1px #e5e5e5 solid';
					ulLi[i].style.marginTop = '-1px';
					ulLi[i].style.color = '#666666';
					ulLi[i].style.backgroundColor = '#ffffff';
					allNone = 1;
				}else{
					footList[j].style.visibility = 'hidden';
				}
			}
			break;
		}
	}
	if(allNone == 0){
		for(var j = 0; j < footList.length; j++){
			footList[j].style.visibility = 'hidden';
		}
	}
}

function itemBtnbSubmits(machcode){
	var roadaTable = c('user_body_right_foot_item_roada_table_tbody')[0];
	var roadaTableInt = c('user_body_right_foot_item_roada_table_int');
	var roadbTable = c('user_body_right_foot_item_roadb_table')[0];	
	var roadbTableInt = c('user_body_right_foot_item_roadb_table_int');
	var roadcTable = c('user_body_right_foot_item_roadc_table')[0];
	var roadcTableInt = c('user_body_right_foot_item_roadc_table_int');
	var itemCommodityaTbody = c('user_body_right_foot_item_commoditya_tbody')[0];
	var roadaObj = [];
	/*if(MACHCOMMOD.length != 0){
		if(MACHROAD.type == 'a'){
			for(var i = 0; i < roadaTableInt.length; i++){
				if(roadaTableInt[i].value == ""){
					alern('货道格数不能为空！');
					return false;
				}
			}
			for(var i = 0; i < MACHCOMMOD.length; i++){
				var roadaList = [];
				roadaList.push(itemCommodityaTbody.children[i].children[0].innerHTML);					//货道
				roadaList.push('特殊货道');			//货道类型
				roadaList.push(machcode);
				roadaList.push(itemCommodityaTbody.children[i].children[1].children[0].value);			//商品名称
				roadaList.push(itemCommodityaTbody.children[i].children[1].children[0].dataset.value);	//商品ID
				roadaList.push(itemCommodityaTbody.children[i].children[2].children[0].value);			//商品数量
				roadaList.push(itemCommodityaTbody.children[i].children[3].children[0].value);			//价格系数
				roadaList.push(itemCommodityaTbody.children[i].children[0].title);						//货道ID
				roadaObj.push(roadaList);
			}
			console.log(roadaObj);
		}else if(MACHROAD.type == 'b'){
			for(var i = 0; i < roadbTableInt.length; i++){
				if(roadbTableInt[i].value == ""){
					alern('货道类型不能为空！');
					return false;
				}
			}
			for(var i = 0; i < MACHCOMMOD.length; i++){
				var roadaList = [];
				roadaList.push(itemCommodityaTbody.children[i].children[0].innerHTML);					//货道
				roadaList.push(itemCommodityaTbody.children[i].children[1].children[0].name);			//货道类型
				roadaList.push(machcode);
				roadaList.push(itemCommodityaTbody.children[i].children[1].children[0].value);			//商品名称
				roadaList.push(itemCommodityaTbody.children[i].children[1].children[0].dataset.value);	//商品ID
				roadaList.push(itemCommodityaTbody.children[i].children[2].children[0].value);			//商品数量
				roadaList.push(itemCommodityaTbody.children[i].children[3].children[0].value);			//价格系数
				roadaList.push(itemCommodityaTbody.children[i].children[0].title);						//货道ID
				roadaObj.push(roadaList);
			};
		}else if(MACHROAD.type == 'c'){
			for(var i = 0; i < roadcTableInt.length; i++){
				if(roadcTableInt[i].value == ""){
					alern('货道类型不能为空！');
					return false;
				}
			}
			for(var i = 0; i < MACHCOMMOD.length; i++){
				var roadaList = [];
				roadaList.push(itemCommodityaTbody.children[i].children[0].innerHTML);					//货道
				roadaList.push(itemCommodityaTbody.children[i].children[1].children[0].value);			//货道类型
				roadaList.push(machcode);
				roadaList.push(itemCommodityaTbody.children[i].children[1].children[0].value);			//商品名称
				roadaList.push(itemCommodityaTbody.children[i].children[1].children[0].dataset.value);	//商品ID
				roadaList.push(itemCommodityaTbody.children[i].children[2].children[0].value);			//商品数量
				roadaList.push(itemCommodityaTbody.children[i].children[3].children[0].value);			//价格系数
				roadaList.push(itemCommodityaTbody.children[i].children[0].title);						//货道ID
				roadaObj.push(roadaList);
			};
		}
	}else{*/
	var divList = c('user_body_right_foot_item_divbb_body_list');
	var count = 0;
	for(var i = 0; i < divList.length; i++){
		if(divList[i].style.backgroundColor == 'rgb(91, 192, 222)'){
			count = 1;
		};
	}
	if(count == 0){
		alern('请选择一个模板');
		return false;
	}
	if(MACHROAD.type == 'a'){
		var itemRoadcTbody = c('user_body_right_foot_item_roadc_tbody')[0];
		for(var i = 0; i < roadaTableInt.length; i++){
			if(roadaTableInt[i].value == ""){
				alern('货道格数不能为空！');
				return false;
			}
		}
		for(var i = 0; i < roadaTableInt.length; i++){
			for(var j = 0; j < itemRoadcTbody.children[i].children[2].children[0].value; j++){
				var roadaList = [];
				roadaList.push((i + 1) + '-' + (j + 1));		//货道
				roadaList.push(itemRoadcTbody.children[i].children[1].children[0].value);				//货道类型
				roadaList.push(machcode);
				roadaList.push("");						//商品名称
				roadaList.push("");						//商品ID
				roadaList.push("");						//商品数量
				roadaList.push("");						//价格系数
				roadaList.push("");						//货道ID
				roadaObj.push(roadaList);
			}
		}
	}else if(MACHROAD.type == 'b'){
		var itemRoadcTbody = c('user_body_right_foot_item_roadc_tbody')[1];
		for(var i = 0; i < roadbTableInt.length; i++){
			if(roadbTableInt[i].value == ""){
				alern('货道类型不能为空！');
				return false;
			}
		}
		for(var i = 0; i < roadbTableInt.length; i++){
			for(var j = 0; j < itemRoadcTbody.children[i].children[1].children[0].value.split('/')[1]; j++){
				var roadaList = [];
				roadaList.push((i+1) + '-' + (j+1));					//货道
				roadaList.push(itemRoadcTbody.children[i].children[1].children[0].value);			//货道类型
				roadaList.push(machcode);
				roadaList.push("");						//商品名称
				roadaList.push("");						//商品ID
				roadaList.push("");						//商品数量
				roadaList.push("");						//价格系数
				roadaList.push("");						//货道ID
				roadaObj.push(roadaList);
			}
		};
	}else if(MACHROAD.type == 'c'){
		var itemRoadcTbody = c('user_body_right_foot_item_roadc_tbody')[2];
		for(var i = 0; i < roadcTableInt.length; i++){
			if(roadcTableInt[i].value == ""){
				alern('货道类型不能为空！');
				return false;
			}
		}
		for(var i = 0; i < roadcTableInt.length; i++){
			for(var j = 0; j < itemRoadcTbody.children[i].children[1].children[0].name; j++){
				var roadaList = [];
				roadaList.push((i+1)+'-'+(j+1));					//货道
				roadaList.push(itemRoadcTbody.children[i].children[1].children[0].value);			//货道类型
				roadaList.push(machcode);
				roadaList.push("");						//商品名称
				roadaList.push("");						//商品ID
				roadaList.push("");						//商品数量
				roadaList.push("");						//价格系数
				roadaList.push("");						//货道ID
				roadaObj.push(roadaList);
			}
		};
	}
	return roadaObj;
}

//警报部分渲染
function renderingAlarm(machCODE,mobleId){
	var footItemBtnf = c('user_body_right_foot_item_btnf')[0];
	$.ajax({
		type: 'post',
		url: URLS + '/worn/getTroubleMsg.json',
		data: {
			machModelID: mobleId,
		},
		success: function(data){
			MACHALARM = data;
			MACHALARMS = [];
			for(var i = 0; i < MACH.length; i++){
				var datas = {};
				if(MACH[i].icon == 3){
					datas.id = MACH[i].empcode;
					datas.text = MACH[i].text;
					MACHALARMS.push(datas);
				}
			}

			var alarmLeft = c('user_body_right_foot_item_alarm_left')[0];
			var alarmRight = c('user_body_right_foot_item_alarm_right')[0];
			var itemAlarmLeftUl = c('user_body_right_foot_item_alarm_left_ul')[0];
			var itemAlarmRightUl = c('user_body_right_foot_item_alarm_right_ul')[0];
			if(itemAlarmLeftUl!= undefined){
				itemAlarmLeftUl.parentNode.removeChild(itemAlarmLeftUl);
			};
			if(itemAlarmRightUl!= undefined){
				itemAlarmRightUl.parentNode.removeChild(itemAlarmRightUl);
			};

			//左边故障信息渲染
			var ul = creat('ul');
			ul.className = 'user_body_right_foot_item_alarm_left_ul';
			for(var i = 0; i < MACHALARM.length; i++){
				var li = creat('li');
				li.innerHTML = '<input type="checkbox" value="'+MACHALARM[i].name+'"/>' + MACHALARM[i].text;
				ul.appendChild(li);
				li.onchange = function(){
					console.log(this.children[0].value);
				}
			}
			alarmLeft.appendChild(ul);

			//右边警报接收人渲染
			var ul = creat('ul');
			ul.className = 'user_body_right_foot_item_alarm_right_ul';
			for(var i = 0; i < MACHALARMS.length; i++){
				var li = creat('li');
				li.innerHTML = '<input type="checkbox" value="'+MACHALARMS[i].id+'"/><img src="image/grouping/004.png"/>' + MACHALARMS[i].text;
				ul.appendChild(li);
				li.onchange = function(){
					console.log(this.children[0].value);
				}
			}
			alarmRight.appendChild(ul);

			//获取故障信息与警报接收人选中初始化
			$.ajax({
				type: 'post',
				url: URLS + '/worn/getWornByMachCode.json',
				data: {
					machCode: machCODE,
				},
				success: function(data){
					if(data != null){
						var itemAlarmLeftUl = c('user_body_right_foot_item_alarm_left_ul')[0];
						var itemAlarmRightUl = c('user_body_right_foot_item_alarm_right_ul')[0];
						//故障信息渲染
						var machineTempTop = d('machine_temp_top');
						var machineTempBom = d('machine_temp_bom');
						var machineTempTime = d('machine_temp_time');
						machineTempTop.value = data.temTop;
						machineTempBom.value = data.temBottom;
						machineTempTime.value = data.duration;
						if(data != null){
							for(var i = 0; i < JSON.parse(data.troubleMsg).length; i++){
								for(var j = 0; j < itemAlarmLeftUl.children.length; j++){
									if(JSON.parse(data.troubleMsg)[i] == itemAlarmLeftUl.children[j].children[0].value){
										itemAlarmLeftUl.children[j].children[0].checked = 'checked';
									}
								}
							}
							//警报接收人渲染
							for(var i = 0; i < JSON.parse(data.receiveMan).length; i++){
								var mark = 0;
								for(var j = 0; j < itemAlarmRightUl.children.length; j++){
									if(JSON.parse(data.receiveMan)[i] == itemAlarmRightUl.children[j].children[0].value){
										itemAlarmRightUl.children[j].children[0].checked = 'checked';
										mark = 1;
									}
								}
								if(mark == 0){
									MACHROADOBJ.push(JSON.parse(data.receiveMan)[i]);
								}
							}
						};
					}else{
						var machineTempTop = d('machine_temp_top');
						var machineTempBom = d('machine_temp_bom');
						var machineTempTime = d('machine_temp_time');
						machineTempTop.value = "";
						machineTempBom.value = "";
						machineTempTime.value = "";
					}
				}
			})

			//页面布局优化
			var bRight = c('user_body_right')[0];
			var rHeight = c('user_body_right_head')[0];
			var rFoot = c('user_body_right_foot')[0];
			var iAlarm = c('user_body_right_foot_item_alarm')[0];
			if(iAlarm != undefined){
				iAlarm.style.height = bRight.clientHeight - rHeight.clientHeight - rFoot.children[0].children[0].children[0].clientHeight - 70 + 'px';
			}
		}
	})

	//保存警报信息接口
	footItemBtnf.onclick = function(){
		var alarmLeftUl = c('user_body_right_foot_item_alarm_left_ul')[0];
		var alarmRightUl = c('user_body_right_foot_item_alarm_right_ul')[0];

		var alarmLeftUlObject = [];
		var alarmRightUlObject = [];
		var alarmTopObject = new Object();
		//添加故障信息提交资料
		for(var i = 0; i < alarmLeftUl.children.length; i++){
			if(alarmLeftUl.children[i].children[0].checked){
				alarmLeftUlObject.push(alarmLeftUl.children[i].children[0].value);
			};
		};

		//温度界限提交
		var machineTempTop = d('machine_temp_top');
		var machineTempBom = d('machine_temp_bom');
		var machineTempTime = d('machine_temp_time');
		if(Number(machineTempTop.value) < Number(machineTempBom.value)){
			alern('温度上限不能低于温度下限');
			return false;
		}
		if(machineTempTop.value != ''){
			if(machineTempBom.value == ''){
				alern('温度下限不能为空');
				return false;
			}
			if(machineTempTime.value == ''){
				alern('报警时长不能为空');
				return false;
			}
		}
		if(machineTempBom.value != ''){
			if(machineTempTop.value == ''){
				alern('温度上限不能为空');
				return false;
			}
			if(machineTempTime.value == ''){
				alern('报警时长不能为空');
				return false;
			}
		}
		if(machineTempTime.value != ''){
			if(machineTempBom.value == ''){
				alern('温度下限不能为空');
				return false;
			}
			if(machineTempTop.value == ''){
				alern('温度上限不能为空');
				return false;
			}
		}
		alarmTopObject.temTop = machineTempTop.value;
		alarmTopObject.temBottom = machineTempBom.value;
		alarmTopObject.duration = machineTempTime.value;
		//添加警报接收人提交资料
		for(var i = 0; i < alarmRightUl.children.length; i++){
			if(alarmRightUl.children[i].children[0].checked){
				alarmRightUlObject.push(alarmRightUl.children[i].children[0].value);
			};
		};
		//警报接收人隐藏提交资料合入
		for(var i = 0; i < MACHROADOBJ.length; i++){
			alarmRightUlObject.push(MACHROADOBJ[i]);
		}
		$.ajax({
			type: 'post',
			url: URLS + '/worn/saveWorn.json',
			data: {
				dataTrouble: JSON.stringify(alarmLeftUlObject),
				dataEmpcode: JSON.stringify(alarmRightUlObject),
				dataTem: JSON.stringify(alarmTopObject),
				machCode: machCODE,
			},
			success: function(data){
				alern(data.msg);
			},
			error: function(data){
				alern('失败');
			}
		})
	}

	//开启警报
	d('machine_temp_open').onclick = function(){
		ajax({
			type: 'post',
			url: URLS + '/worn/runTempture.json',
			data: {
				b: true,
				machCode: machCODE,
			},
			success: function(data){
				alern(data.msg);
			}

		})
	}
	//关闭警报
	d('machine_temp_close').onclick = function(){
		ajax({
			type: 'post',
			url: URLS + '/worn/runTempture.json',
			data: {
				b: false,
				machCode: machCODE,
			},
			success: function(data){
				alern(data.msg);
			}

		})
	}
}

//初始化渲染布局
window.onresize = function(){
	var Head = c('user_head')[0];
	var dBody = c('user_body')[0];
	dBody.style.height = window.innerHeight - Head.clientHeight - 119 + 'px';

	
	var bRight = c('user_body_right')[0];
	var rHeight = c('user_body_right_head')[0];
	var rFoot = c('user_body_right_foot')[0];
	var iAlarm = c('user_body_right_foot_item_alarm')[0];
	if(iAlarm != undefined){
		iAlarm.style.height = bRight.clientHeight - rHeight.clientHeight - rFoot.children[0].children[0].children[0].clientHeight - 70 + 'px';
	}

	var itemCommodity = c('user_body_right_foot_item_commodity');
	for(var i = 0; i < itemCommodity.length; i++){
		itemCommodity[i].style.height = window.innerHeight - 425 + 'px';
	}

	// //补货管理布局渲染
	// var itemTonic = c('user_body_right_foot_item_tonic')[0];
	// itemTonic.style.height = window.innerHeight - 430 + 'px';

	// //在售管理布局渲染
	// var priceDiv = c('user_body_right_foot_item_price')[0];
	// var stockDiv = c('user_body_right_foot_item_stock')[0];
	// priceDiv.style.height = window.innerHeight - 430 + 'px';
	// stockDiv.style.height = window.innerHeight - 430 + 'px';
}

start();
startbody();	//渲染主体部分数据