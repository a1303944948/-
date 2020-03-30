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
	   		temp.push('<li><img class="item'+item['lev']+'" src="image/grouping/001.png"/><a data-id="'+item.id+'">'+item.text+'</a></li>');
	    }else if(item.icon == 1){
	   		temp.push('<li><img class="item'+item['lev']+'" src="image/grouping/002.png"/><a data-id="'+item.id+'">'+item.text+'</a></li>');
	    }else if(item.icon == 2){
	   		temp.push('<li><img class="item'+item['lev']+'" src="image/grouping/003.png"/><a data-id="'+item.id+'">'+item.text+'</a></li>');
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
var itemBtnb = c('user_body_right_foot_item_btnb')[0];		//保存按钮
var itemBtnba = c('user_body_right_foot_item_btnba')[0];	//创建货道模板
var itemBtnbb = c('user_body_right_foot_item_btnbb')[0];	//导入货道模板
var itemBtnbc = c('user_body_right_foot_item_btnbc')[0];	//删除货道模板

var rightFootItem = c('user_body_right_foot_item');
for(var i = 0; i < rightFootItem.length; i++){
	rightFootItem[i].style.display = 'none';
}
var rightFootItemBtnbb = c('user_body_right_foot_item_btnbb')[0];
var rightFootItemBtnb = c('user_body_right_foot_item_btnb')[0];
var rightFootItemBtnda = c('user_body_right_foot_item_btnda')[0];
var rightFootItemBtndb = c('user_body_right_foot_item_btndb')[0];
rightFootItemBtnbb.style.display = 'none';
rightFootItemBtnb.style.display = 'none';
rightFootItemBtnda.style.display = 'none';
rightFootItemBtndb.style.display = 'none';
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
	rightFootItemBtnbb.style.display = 'inline';
	rightFootItemBtnb.style.display = 'inline';
	rightFootItemBtnda.style.display = 'inline';
	rightFootItemBtndb.style.display = 'inline';
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
		url: URLZ + '/jf/bg/basic/dvm/searchParamObj.json',
		data: {
			devicecode: msgObject.devicecode,
		},
		success: function(data){

			//渲染保存远程取物门开启时间
			c('remote_selectc')[0].value = data.obj.pickupdoor;

			for(var i = 0; i < MACH.length; i++){
				if(data.obj.scopeofauthority == MACH[i].id){
					machineGrouping.value = MACH[i].text;
					machineGrouping.name = MACH[i].id;
					break;
				}
			}
			machineName.value = data.obj.machName;
			machineNumber.value = data.obj.machCode;
			machineMac.value = data.obj.macAddr;
			if(data.obj.useAddr != undefined){
				machineAddr.value = data.obj.useAddr;
			}else{
				machineAddr.value = "";
			}
			if(data.obj.flowcard != undefined){
				machineTraffic.value = data.obj.flowcard;
			}else{
				machineTraffic.value = "";
			}
			if(data.obj.description != undefined){
				machineExplain.value = data.obj.description;
			}else{
				machineExplain.value = "";
			}
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
				data.obj.scopeofauthority = machineGrouping.name;
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
						if(msg.success){
							alern('成功');
							userHeadSubmit.click();
						}else{
							alern('失败');
						};
					},
					error: function(){
						alern('失败');
					}
				})
			}
		}
	})


	renderingRoad(msgObject.devicecode);	//货道配置
	startfoot(msgObject.devicecode);		//渲染模板
	hdStart(msgObject.devicecode);			//补货管理
	zsStart(msgObject.devicecode);			//在售管理

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
	$.ajax({
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
	})
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

function startfoot(machCODE){
	//创建货道配置模版
	itemBtnba.onclick = function(){
		var roadaObj = itemBtnbSubmitz();
		if(roadaObj == '[]'||roadaObj == ''||roadaObj == undefined){
			alern('无法保存空白模板');
			return false;
		}
		var roadaName = prompt("请为当前模板命名");
		if(roadaName != null){
			$.ajax({
				type: 'post',
				url: URLS + '/template/saveTemplate.json',
				data: {
					templateName: roadaName,
					operatorID: loginUserName.operatorID,
					machModelID: MACHOBJECT.machModelID,
					//FC02,VMC0401002,VMC08855W0 | 白羊/金牛/双子
					jsData: JSON.stringify(roadaObj),
				},
				success: function(data){
					alern('成功');
				}
			})
		}
	}
	function itemBtnbSubmitz(){
		var roadaTable = c('user_body_right_foot_item_roada_table_tbody')[0];
		var roadaTableInt = c('user_body_right_foot_item_roada_table_int');
		var roadbTable = c('user_body_right_foot_item_roadb_table')[0];	
		var roadbTableInt = c('user_body_right_foot_item_roadb_table_int');
		var roadcTable = c('user_body_right_foot_item_roadc_table')[0];
		var roadcTableInt = c('user_body_right_foot_item_roadc_table_int');
		var roaddTable = c('user_body_right_foot_item_roadd_table')[0];
		var roaddTableInt = c('user_body_right_foot_item_roadd_table_int');
		var itemCommodityaTbody = c('user_body_right_foot_item_commoditya_tbody')[0];
		var roadaObj = [];
		for(var i = 0; i < MACHCOMMOD.length; i++){
			var roadaList = [];
			roadaList.push(MACHCOMMOD[i].recars);
			roadaList.push(MACHCOMMOD[i].recarsType);
			roadaList.push(MACHCOMMOD[i].machCode);
			roadaList.push(MACHCOMMOD[i].goods);
			roadaList.push(MACHCOMMOD[i].goodsId);
			roadaList.push(MACHCOMMOD[i].number);
			roadaList.push(MACHCOMMOD[i].price);
			roadaList.push(MACHCOMMOD[i].id);
			roadaObj.push(roadaList);
		}
		/*if(MACHROAD.type == 'a'){
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
					roadaList.push(machCODE);
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
					roadaList.push(machCODE);
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
					roadaList.push(machCODE);
					roadaList.push("");						//商品名称
					roadaList.push("");						//商品ID
					roadaList.push("");						//商品数量
					roadaList.push("");						//价格系数
					roadaList.push("");						//货道ID
					roadaObj.push(roadaList);
				}
			};
		}*/
		return roadaObj;
	}
	//导入货道配置模板
	itemBtnbb.onclick = function(){
		var itemFixedbb = c('user_body_right_foot_item_fixedbb')[0];		//导入模板弹出窗
		var itemDivbbClose = c('user_body_right_foot_item_divbb_close')[0];	//关闭弹出窗按钮
		var itemDivbbBody = c('user_body_right_foot_item_divbb_body')[0];	//弹出窗承载体
		var itemDivbbBtn = c('user_body_right_foot_item_divbb_foot_btn')[0];//导入执行按钮
		var itemObject = [];
		itemDivbbClose.onclick = function(){
			itemFixedbb.style.display = 'none';
		}
		$.ajax({
			type: 'post',
			url: URLS + '/template/getTemplate.json',
			data: {
				operatorID: loginUserName.operatorID,
				machModelID: MACHOBJECT.machModelID,

			},
			success: function(data){
				//导入货道
				if(data == ""){
					alern('找不到模板');
					return false;
				}
				itemFixedbb.style.display = 'block';
				itemDivbbBody.innerHTML = "";
				for(var i = 0; i < data.length; i++){
					var divList = creat('div');
					var divLeft = creat('div');
					var divCenter = creat('div');
					var divRight = creat('div');
					var divClear = creat('div');
					divList.className = 'user_body_right_foot_item_divbb_body_list';
					divLeft.className = 'user_body_right_foot_item_divbb_body_list_left';
					divCenter.className = 'user_body_right_foot_item_divbb_body_list_center';
					divRight.className = 'user_body_right_foot_item_divbb_body_list_right';
					divClear.className = 'clear';
					divLeft.innerHTML = i+1;
					divCenter.innerHTML = data[i].templateID;
					divRight.innerHTML = data[i].templateName;
					divList.appendChild(divLeft);
					divList.appendChild(divCenter);
					divList.appendChild(divRight);
					divList.appendChild(divClear);
					itemDivbbBody.appendChild(divList);
				}

				

				//点击导入按钮进行导入
				var divList = c('user_body_right_foot_item_divbb_body_list');
				for(var i = 0; i < divList.length; i++){
					(function(q){
						divList[q].onclick = function(){
							if(this.style.backgroundColor != 'rgb(91, 192, 222)'&&this.style.backgroundColor != 'rgb(49, 176, 213)'){
								for(var j = 0; j < divList.length; j++){
									if(j%2 == 0){
										divList[j].style.backgroundColor = '#f0f0f0';
										divList[j].onmouseover = function(){
											this.style.backgroundColor = '#e6e6e6';
										}
										divList[j].onmouseout = function(){
											this.style.backgroundColor = '#f0f0f0';
										}
									}else{
										divList[j].style.backgroundColor = '#ffffff';
										divList[j].onmouseover = function(){
											this.style.backgroundColor = '#fafafa';
										}
										divList[j].onmouseout = function(){
											this.style.backgroundColor = '#ffffff';
										}
									}
									for(var k = 0; k < divList[j].children.length; k++){
										divList[j].children[k].style.color = '#303030';
									}
								}
								divList[q].style.backgroundColor = '#5BC0DE';
								divList[q].onmouseover = function(){
									this.style.backgroundColor = '#31B0D5';
								}
								divList[q].onmouseout = function(){
									this.style.backgroundColor = '#5BC0DE';
								}
								for(var j = 0; j < divList[q].children.length; j++){
									divList[q].children[j].style.color = '#ffffff';
								}
							}else{
								for(var j = 0; j < divList.length; j++){
									if(j%2 == 0){
										divList[j].style.backgroundColor = '#f0f0f0';
										divList[j].onmouseover = function(){
											this.style.backgroundColor = '#e6e6e6';
										}
										divList[j].onmouseout = function(){
											this.style.backgroundColor = '#f0f0f0';
										}
									}else{
										divList[j].style.backgroundColor = '#ffffff';
										divList[j].onmouseover = function(){
											this.style.backgroundColor = '#fafafa';
										}
										divList[j].onmouseout = function(){
											this.style.backgroundColor = '#ffffff';
										}
									}
									for(var k = 0; k < divList[j].children.length; k++){
										divList[j].children[k].style.color = '#303030';
									}
								}
							};
						}
					})(i)
				}
				itemDivbbBtn.onclick = function(){
					if(confirm('导入并保存为当前模板数据?')){
						for(var i = 0; i < divList.length; i++){
							if(divList[i].style.backgroundColor == 'rgb(91, 192, 222)'){
								//根据模板ID请求改模板的信息
								$.ajax({
									type: 'post',
									url: URLS + '//template/getTemplate1.json',
									data: {
										templateID: divList[i].children[1].innerHTML,
									},
									async: false,
									success: function(data){
										for(var i = 0; i < data.length; i++){
											itemObject.push(data[i]);
										}
									}
								})
							};
						}
						if(MACHROAD.type == 'a'){
							//特殊货道部分
							//初始数据渲染
							var machaStart = [];
							var machaObj = [];
							var machatype = [];
							for(var i = 0; i < itemObject.length; i++){
								machaStart.push(itemObject[i].recars.split('-')[0]);
							}
							var hashStart=[];
							var hashObj = [];
							for (var i = 0; i < machaStart.length; i++) {
								var kit = 1;
							    for (var j = i+1; j < machaStart.length; j++) {
							      	if(machaStart[i]===machaStart[j]){
							    		kit++;
							        	++i;
							      	}
							    }
							    machatype.push(itemObject[i].recarsType);
							    hashStart.push(parseInt(machaStart[i]));
							    hashObj.push(kit);
							}
							c('user_body_right_foot_item_roada')[0].style.display = 'block';
							var roadaTable = c('user_body_right_foot_item_roada_table_tbody')[0];
							var roadaBtn = c('user_body_right_foot_item_roada_btn')[0];
							roadaTable.innerHTML = '';
							for(var i = 0; i < hashStart.length; i++){
								var tr = creat('tr');
								var tda = creat('td');
								var tdb = creat('td');
								var tdc = creat('td');
								var tdd = creat('td');
								tda.innerHTML = hashStart[i];
								tdb.innerHTML = '<input class="user_body_right_foot_item_roada_table_selectType" style="cursor: pointer" value="'+machatype[i]+'" readonly="readonly" type="text">';
								var ul = creat('ul');
								ul.className = "user_body_right_foot_item_roada_table_selectUl";
								ul.style.left = "100px";
								ul.style.top = '24px';
								for(var j = 0; j < MACHROAD.value.length; j++){
									var li = creat('li');
									li.innerHTML = MACHROAD.value[j];
									li.onmouseover = function(){
										this.style.backgroundColor = '#e5e5e5';
									}
									li.onmouseout = function(){
										this.style.backgroundColor = '#ffffff';
									}
									ul.appendChild(li);
								}
								tdb.appendChild(ul);
								tdc.innerHTML = '<input class="user_body_right_foot_item_roada_table_int" value="'+hashObj[i]+'" type="number"/>';
								tdd.innerHTML = '<button class="user_body_right_foot_item_roada_table_clear"><img src="image/sc.png"/>删除</button>';
								tr.appendChild(tda);
								tr.appendChild(tdb);
								tr.appendChild(tdc);
								tr.appendChild(tdd);
								roadaTable.appendChild(tr);
							}
							var roadaTableInt = c('user_body_right_foot_item_roada_table_int');
							var roadaTableClear = c('user_body_right_foot_item_roada_table_clear');
							var roadaTableSelectType = c('user_body_right_foot_item_roada_table_selectType');
							var roadaTableSelectUl = c('user_body_right_foot_item_roada_table_selectUl');
							for(var j = 0; j < roadaTableSelectType.length; j++){
								roadaTableSelectUl[j].style.width = roadaTableSelectType[j].clientWidth - 2 + 'px';
							}
							function roadaTableSelectClick(){
								for(var j = 0; j <　roadaTableSelectType.length; j++){
									(function(q){
										roadaTableSelectType[q].onfocus = function(){
											roadaTableSelectUl[q].style.display = 'inline';
										}
										roadaTableSelectType[q].onblur = function(){
											roadaTableSelectUl[q].style.display = 'none';
										}
										for(var k = 0; k < roadaTableSelectUl[q].children.length; k++){
											(function(w){
												roadaTableSelectUl[q].children[w].onmousedown = function(){
													roadaTableSelectType[q].value = roadaTableSelectUl[q].children[w].innerHTML;
												}
											})(k)
										}
									})(j)
								}
							}
							roadaTableSelectClick();
							for(var i = 0; i < roadaTableInt.length;i++){
								(function(q){
									roadaTableInt[q].onchange = function(){
										if(this.value > 40){
											this.value = 40;
											alern('货道行的格数不能超过40');
										}
									}
									roadaTableClear[q].onclick = function(){
										this.offsetParent.parentNode.parentNode.removeChild(this.offsetParent.parentNode);
										for(var j = 0; j < roadaTableClear.length; j++){
											roadaTableClear[j].offsetParent.parentNode.children[0].innerHTML = j+1;
										}
										roadaTableSelectClick();
									}
								})(i)
							}
							roadaBtn.onclick = function(){
								var roadaTableIntCount = c('user_body_right_foot_item_roada_table_int');
								if(roadaTableIntCount.length < 40){
									var tr = creat('tr');
									var tda = creat('td');
									var tdb = creat('td');
									var tdc = creat('td');
									var tdd = creat('td');
									tda.innerHTML = roadaTableIntCount.length+1;
									tdb.innerHTML = '<input class="user_body_right_foot_item_roada_table_selectType" style="cursor: pointer" value="" readonly="readonly" type="text">';
									var ul = creat('ul');
									ul.className = "user_body_right_foot_item_roada_table_selectUl";
									ul.style.left = "100px";
									ul.style.top = '24px';
									for(var j = 0; j < MACHROAD.value.length; j++){
										var li = creat('li');
										li.innerHTML = MACHROAD.value[j];
										li.onmouseover = function(){
											this.style.backgroundColor = '#e5e5e5';
										}
										li.onmouseout = function(){
											this.style.backgroundColor = '#ffffff';
										}
										ul.appendChild(li);
									}
									tdb.appendChild(ul);
									tdc.innerHTML = '<input class="user_body_right_foot_item_roada_table_int" type="number"/>';
									tdd.innerHTML = '<button class="user_body_right_foot_item_roada_table_clear"><img src="image/sc.png"/>删除</button>';
									tr.appendChild(tda);
									tr.appendChild(tdb);
									tr.appendChild(tdc);
									tr.appendChild(tdd);
									roadaTable.appendChild(tr);
									var roadaTableInt = c('user_body_right_foot_item_roada_table_int');
									var roadaTableClear = c('user_body_right_foot_item_roada_table_clear');
									var roadaTableSelectType = c('user_body_right_foot_item_roada_table_selectType');
									var roadaTableSelectUl = c('user_body_right_foot_item_roada_table_selectUl');
									for(var j = 0; j < roadaTableSelectType.length; j++){
										roadaTableSelectUl[j].style.width = roadaTableSelectType[j].clientWidth - 2 + 'px';
									}
									function roadaTableSelectClick(){
										for(var j = 0; j <　roadaTableSelectType.length; j++){
											(function(q){
												roadaTableSelectType[q].onfocus = function(){
													roadaTableSelectUl[q].style.display = 'inline';
												}
												roadaTableSelectType[q].onblur = function(){
													roadaTableSelectUl[q].style.display = 'none';
												}
												roadaTableSelectType[q].value = roadaTableSelectUl[q].children[0].innerHTML;
												for(var k = 0; k < roadaTableSelectUl[q].children.length; k++){
													(function(w){
														roadaTableSelectUl[q].children[w].onmousedown = function(){
															roadaTableSelectType[q].value = roadaTableSelectUl[q].children[w].innerHTML;
														}
													})(k)
												}
											})(j)
										}
									}
									roadaTableSelectClick();
									for(var i = 0; i < roadaTableInt.length;i++){
										(function(q){
											roadaTableInt[q].onchange = function(){
												if(this.value > 40){
													this.value = 40;
													alern('货道行的格数不能超过40!');
												}
											}
											roadaTableClear[q].onclick = function(){
												this.offsetParent.parentNode.parentNode.removeChild(this.offsetParent.parentNode);
												for(var j = 0; j < roadaTableClear.length; j++){
													roadaTableClear[j].offsetParent.parentNode.children[0].innerHTML = j+1;
												}
												roadaTableSelectClick();
											}
										})(i)
									}
								}else{
									alern('货道不能超过40行!');
								}
							}
							var roadaObj = itemBtnbSubmits(machCODE);
							if(JSON.stringify(roadaObj) == 'false'){
								return false;
							}
							$.ajax({
								type: 'post',
								url: URLS + '/rocars/saveRecars.json',
								data: {
									machCode: machCODE,
									jsData: JSON.stringify(roadaObj),
								},
								async: false,
								success: function(data){
									console.log('Success');
								}
							})
							//导入商品
							var huodaoId = [];
							var commodityaTbody = c('user_body_right_foot_item_commoditya_tbody')[0];
							$.ajax({
								type: 'post',
								url: URLS + '/rocars/getRecarsByMachCode.json',
								data: {
									machCode: machCODE,
								},
								async: false,
								dataType: 'json',
								success: function(data){
									for(var i = 0; i < data.length; i++){
										huodaoId.push(data[i].id);
									}
								}
							})
							commodityaTbody.innerHTML = "";
							for(var i = 0;i < itemObject.length; i++){
								var tr = creat('tr');
								var tda = creat('td');
								var tdb = creat('td');
								var tdc = creat('td');
								var tdd = creat('td');
								tda.innerHTML = itemObject[i].recars;
								tda.title = huodaoId[i];
								tdb.innerHTML = '<input class="user_body_right_foot_item_commoditya_tbody_inta" name="'+itemObject[i].recarsType+'" readonly="readonly" value="'+itemObject[i].goods+'" data-value="'+itemObject[i].goodsId+'" placeholder="Select..."/>';
								tdc.innerHTML = '<input class="user_body_right_foot_item_commoditya_tbody_intb" value="'+itemObject[i].number+'" type="number"/>';
								var pride = itemObject[i].price;
								if(pride == ""){
									pride = 1;
								}
								tdd.innerHTML = '<input class="user_body_right_foot_item_commoditya_tbody_intc" type="number" value="'+pride+'"/>';
								tr.appendChild(tda);
								tr.appendChild(tdb);
								tr.appendChild(tdc);
								tr.appendChild(tdd);
								commodityaTbody.appendChild(tr);
							}
							var itemCommodityaTbody = c('user_body_right_foot_item_commoditya_tbody')[0];
							var objTbody = [];	//被提交的数据集合
							var xsbwk = [];		//判断价格系数不能为空的数组
							var slbwk = [];		//商品存在则商品数量不能为空
							var spbwk = [];		//商品数量存在则商品不能为空
							var xsty = [];		//同商品的价格系数必须统一
							var objObject = [];	//将所有报错数据汇总到一起提示
							for(var i = 0; i < itemCommodityaTbody.children.length; i++){
								var objTbodys = [];
								if(itemCommodityaTbody.children[i].children[3].children[0].value == ""){
									xsbwk.push(itemCommodityaTbody.children[i].children[0].innerHTML + '价格系数不能为空!<br/>');
								}
								if(itemCommodityaTbody.children[i].children[1].children[0].value != ""&&itemCommodityaTbody.children[i].children[2].children[0].value == ""){
									slbwk.push(itemCommodityaTbody.children[i].children[0].innerHTML + '商品数量不能为空!<br/>')
								}
								if(itemCommodityaTbody.children[i].children[1].children[0].value == ""&&itemCommodityaTbody.children[i].children[2].children[0].value != ""){
									spbwk.push(itemCommodityaTbody.children[i].children[0].innerHTML + '商品不能为空!<br/>')
								}
								objTbodys.push(machCODE);																//设备编号
								objTbodys.push(itemCommodityaTbody.children[i].children[0].innerHTML);					//货道
								objTbodys.push(itemCommodityaTbody.children[i].children[1].children[0].value);			//商品名称
								objTbodys.push(itemCommodityaTbody.children[i].children[1].children[0].dataset.value);	//商品ID
								objTbodys.push(itemCommodityaTbody.children[i].children[1].children[0].name);			//货道类型
								objTbodys.push(itemCommodityaTbody.children[i].children[2].children[0].value);			//商品数量
								objTbodys.push(itemCommodityaTbody.children[i].children[3].children[0].value);			//价格系数
								objTbodys.push(itemCommodityaTbody.children[i].children[0].title);						//货道ID
								objTbody.push(objTbodys);
							};
							if(xsbwk != ''){
								alern(xsbwk.join(''));
								return false;
							};
							if(slbwk != ''){
								alern(slbwk.join(''));
								return false;
							};
							if(spbwk != ''){
								alern(spbwk.join(''));
								return false;
							};
							//筛选出商品为空的先排除
							var ceObjTbody = objTbody.slice(0);
							for(var i = objTbody.length-1; i > 0; i--){
								if(objTbody[i][2] == ""){
									ceObjTbody.splice(i,1)
								}
							}
							//筛选出不重复的商品列表
							var ceObjTbodys = [];
							for(var i = 0; i < ceObjTbody.length; i++){
								var count = 0;
								for(var j = 0; j < ceObjTbodys.length; j++){
									if(ceObjTbody[i][3] == ceObjTbodys[j][3]){
										count = 1;
									}
								}
								if(count == 0){
									ceObjTbodys.push(ceObjTbody[i]);
								}
							}
							//将商品相同的货道分类到一起
							for(var i = 0; i < ceObjTbodys.length; i++){
								var xstyObject = [];
								for(var j = 0; j < ceObjTbody.length; j++){
									if(ceObjTbodys[i][3] == ceObjTbody[j][3]){
										xstyObject.push(ceObjTbody[j]);
									}
								}
								xsty.push(xstyObject);
								xsty.push('<br/>');
							}
							for(var i = 0; i < xsty.length; i++){
								var count = 0;
								var xstyCount = [];
								xstyCount.push(xsty[i][0][2]);
								xstyCount.push('<div style="font-size: 14px; color: red; margin-bottom: 5px;">价格系数不一致</div>');
								for(var j = 0; j < xsty[i].length; j++){
									xstyCount.push(xsty[i][j][1] +'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;系数: '+ xsty[i][j][6] +'</br>');
									if(xsty[i][j][6] != xsty[i][0][6]){
										count = 1;
									}
								}
								xstyCount.push('</br>');
								if(count == 1){
									objObject.push(xstyCount.join(''));
								}
							}
							if(objObject != ''){
								alern(objObject.join(''));
								return false;
							}
							var commodityaTbodyInta = c('user_body_right_foot_item_commoditya_tbody_inta');
							for(var i = 0; i < commodityaTbodyInta.length; i++){
								(function(q){
									commodityaTbodyInta[q].onfocus = function(){
										var that = this;
										$.ajax({
											type: 'post',
											url: URLS + '/rocars/getGoodsByType.json',
											data: {
												operPartyID: loginUserName.operatorID,
												recarsType: this.name,
											},
											success: function(msg){
												var ul = creat('ul');
												ul.className = 'user_body_right_foot_item_commoditya_tbody_ula';
												ul.setAttribute('data-list',q);
												ul.style.width = that.clientWidth + 'px';
												var li = creat('li');
												li.innerHTML = '请选择...';
												li.setAttribute('data-value','');
												li.style.color = '#999999';
												ul.appendChild(li);
												for(var j = 0; j < msg.length; j++){
													var li = creat('li');
													li.innerHTML = msg[j].goods;
													li.setAttribute('data-value',msg[j].goodsId);
													ul.appendChild(li);
												}
												that.parentNode.appendChild(ul);

												var commodityaTbodyUla = c('user_body_right_foot_item_commoditya_tbody_ula');
												for(var j = 0; j < commodityaTbodyUla[0].children.length; j++){
													commodityaTbodyUla[0].children[j].onmousedown = function(){
														if(this.innerHTML == '请选择...'){
															that.value = '';
															that.setAttribute('data-value','');
														}else{
															that.value = this.innerHTML;
															that.setAttribute('data-value',this.dataset.value);
														}
													}
												}
											}
										})
									}
									commodityaTbodyInta[q].onblur = function(){
										this.parentNode.removeChild(this.parentNode.children[1]);
									}
								})(i)
							}
							$.ajax({
								type: 'post',
								url: URLS + '/rocars/updateRecars.json',
								data: {
									machCode: machCODE,
									jsData: JSON.stringify(objTbody),
								},
								success: function(){
									console.log('成功');
									//byStart(machCODE);
								},
								error: function(){
									console.log('失败');
								}
							})
							itemFixedbb.style.display = 'none';
							alern('成功');
							return false;
						};
						if(MACHROAD.type == 'b'){
							//金牛座部分
							//初始数据渲染
							var machbStart = [];
							var machbObj = [];
							for(var i = 0; i < itemObject.length; i++){
								machbObj.push(itemObject[i].recarsType);
								machbStart.push(itemObject[i].recars.split('-')[0]);
							}
							var hashStart=[];
							var hashObj = [];
							for (var i = 0; i < machbStart.length; i++) {
							    for (var j = i+1; j < machbStart.length; j++) {
							      	if(machbStart[i]===machbStart[j]){
							        	++i;
							      	}
							    }
							    hashStart.push(parseInt(machbStart[i])-1);
							    hashObj.push(machbObj[i])
							}
							c('user_body_right_foot_item_roadb')[0].style.display = 'block';
							var roadbTable = c('user_body_right_foot_item_roadb_table')[0]; 
							var roadbTableInt = c('user_body_right_foot_item_roadb_table_int');
							roadbTable.innerHTMl = "";
							for(var i = 0; i < hashStart.length; i++){
								roadbTableInt[hashStart[i]].value = hashObj[i];
								roadbTableInt[hashStart[i]].name = parseInt(hashObj[i].split('/')[1]);
							}
							for(var i = 0; i < roadbTableInt.length; i++){
								var ul = creat('ul');
								ul.className = 'user_body_right_foot_item_roadb_table_select';
								ul.style.width = roadbTableInt[i].clientWidth + 2 + 'px';
								ul.setAttribute('data-list',i);
								for(var j = 0; j < MACHROAD.value.length; j++){
									var li = creat('li');
									li.innerHTML = MACHROAD.value[j];
									li.setAttribute('data-value',parseInt(MACHROAD.value[j].split('/')[1]));
									ul.appendChild(li);
								}
								roadbTable.appendChild(ul);
								ul.style.left = roadbTableInt[i].parentNode.offsetLeft + 139 + 'px';
								ul.style.top = roadbTableInt[i].parentNode.offsetTop + 37 + 'px';

								var roadbTableSelect = c('user_body_right_foot_item_roadb_table_select');
								(function(q){
									roadbTableInt[q].onfocus = function(){
										roadbTableSelect[q].style.display = 'block';
									}
									roadbTableInt[q].onblur = function(){
										roadbTableSelect[q].style.display = 'none';
									}
								})(i)
							}
							var roadbTableSelect = c('user_body_right_foot_item_roadb_table_select');
							for(var i = 0; i < roadbTableSelect.length; i++){
								for(var j = 0; j < roadbTableSelect[i].children.length; j++){
									roadbTableSelect[i].children[j].onmousedown = function(){
										roadbTableInt[this.parentNode.dataset.list].value = this.innerHTML;
										roadbTableInt[this.parentNode.dataset.list].name = this.dataset.value;
									}
								}
							}
							var roadaObj = itemBtnbSubmits(machCODE);
							if(JSON.stringify(roadaObj) == 'false'){
								return false;
							}
							$.ajax({
								type: 'post',
								url: URLS + '/rocars/saveRecars.json',
								data: {
									machCode: machCODE,
									jsData: JSON.stringify(roadaObj),
								},
								async: false,
								success: function(data){
									console.log('成功');
								}
							})
							//导入商品
							var huodaoId = [];
							var commodityaTbody = c('user_body_right_foot_item_commoditya_tbody')[0];
							$.ajax({
								type: 'post',
								url: URLS + '/rocars/getRecarsByMachCode.json',
								data: {
									machCode: machCODE,
								},
								async: false,
								dataType: 'json',
								success: function(data){
									for(var i = 0; i < data.length; i++){
										huodaoId.push(data[i].id);
									}
								}
							})
							commodityaTbody.innerHTML = "";
							for(var i = 0;i < itemObject.length; i++){
								var tr = creat('tr');
								var tda = creat('td');
								var tdb = creat('td');
								var tdc = creat('td');
								var tdd = creat('td');
								tda.innerHTML = itemObject[i].recars;
								tda.title = huodaoId[i];
								tdb.innerHTML = '<input class="user_body_right_foot_item_commoditya_tbody_inta" name="'+itemObject[i].recarsType+'" readonly="readonly" value="'+itemObject[i].goods+'" data-value="'+itemObject[i].goodsId+'" placeholder="请选择..."/>';
								tdc.innerHTML = '<input class="user_body_right_foot_item_commoditya_tbody_intb" value="'+itemObject[i].number+'" type="number"/>';
								var pride = itemObject[i].price;
								if(pride == ""){
									pride = 1;
								}
								tdd.innerHTML = '<input class="user_body_right_foot_item_commoditya_tbody_intc" type="number" value="'+pride+'"/>';
								tr.appendChild(tda);
								tr.appendChild(tdb);
								tr.appendChild(tdc);
								tr.appendChild(tdd);
								commodityaTbody.appendChild(tr);
							}
							var itemCommodityaTbody = c('user_body_right_foot_item_commoditya_tbody')[0];
							var objTbody = [];	//被提交的数据集合
							var xsbwk = [];		//判断价格系数不能为空的数组
							var slbwk = [];		//商品存在则商品数量不能为空
							var spbwk = [];		//商品数量存在则商品不能为空
							var xsty = [];		//同商品的价格系数必须统一
							var objObject = [];	//将所有报错数据汇总到一起提示
							for(var i = 0; i < itemCommodityaTbody.children.length; i++){
								var objTbodys = [];
								if(itemCommodityaTbody.children[i].children[3].children[0].value == ""){
									xsbwk.push(itemCommodityaTbody.children[i].children[0].innerHTML + '价格系数不能为空!<br/>');
								}
								if(itemCommodityaTbody.children[i].children[1].children[0].value != ""&&itemCommodityaTbody.children[i].children[2].children[0].value == ""){
									slbwk.push(itemCommodityaTbody.children[i].children[0].innerHTML + '商品数量不能为空!<br/>')
								}
								if(itemCommodityaTbody.children[i].children[1].children[0].value == ""&&itemCommodityaTbody.children[i].children[2].children[0].value != ""){
									spbwk.push(itemCommodityaTbody.children[i].children[0].innerHTML + '商品不能为空!<br/>')
								}
								objTbodys.push(machCODE);																//设备编号
								objTbodys.push(itemCommodityaTbody.children[i].children[0].innerHTML);					//货道
								objTbodys.push(itemCommodityaTbody.children[i].children[1].children[0].value);			//商品名称
								objTbodys.push(itemCommodityaTbody.children[i].children[1].children[0].dataset.value);	//商品ID
								objTbodys.push(itemCommodityaTbody.children[i].children[1].children[0].name);			//货道类型
								objTbodys.push(itemCommodityaTbody.children[i].children[2].children[0].value);			//商品数量
								objTbodys.push(itemCommodityaTbody.children[i].children[3].children[0].value);			//价格系数
								objTbodys.push(itemCommodityaTbody.children[i].children[0].title);						//货道ID
								objTbody.push(objTbodys);
							};
							if(xsbwk != ''){
								alern(xsbwk.join(''));
								return false;
							};
							if(slbwk != ''){
								alern(slbwk.join(''));
								return false;
							};
							if(spbwk != ''){
								alern(spbwk.join(''));
								return false;
							};
							//筛选出商品为空的先排除
							var ceObjTbody = objTbody.slice(0);
							for(var i = objTbody.length-1; i > 0; i--){
								if(objTbody[i][2] == ""){
									ceObjTbody.splice(i,1)
								}
							}
							//筛选出不重复的商品列表
							var ceObjTbodys = [];
							for(var i = 0; i < ceObjTbody.length; i++){
								var count = 0;
								for(var j = 0; j < ceObjTbodys.length; j++){
									if(ceObjTbody[i][3] == ceObjTbodys[j][3]){
										count = 1;
									}
								}
								if(count == 0){
									ceObjTbodys.push(ceObjTbody[i]);
								}
							}
							//将商品相同的货道分类到一起
							for(var i = 0; i < ceObjTbodys.length; i++){
								var xstyObject = [];
								for(var j = 0; j < ceObjTbody.length; j++){
									if(ceObjTbodys[i][3] == ceObjTbody[j][3]){
										xstyObject.push(ceObjTbody[j]);
									}
								}
								xsty.push(xstyObject);
								xsty.push('<br/>');
							}
							for(var i = 0; i < xsty.length; i++){
								var count = 0;
								var xstyCount = [];
								xstyCount.push(xsty[i][0][2]);
								xstyCount.push('<div style="font-size: 14px; color: red; margin-bottom: 5px;">价格系数不一致</div>');
								for(var j = 0; j < xsty[i].length; j++){
									xstyCount.push(xsty[i][j][1] +'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;系数: '+ xsty[i][j][6] +'</br>');
									if(xsty[i][j][6] != xsty[i][0][6]){
										count = 1;
									}
								}
								xstyCount.push('</br>');
								if(count == 1){
									objObject.push(xstyCount.join(''));
								}
							}
							if(objObject != ''){
								alern(objObject.join(''));
								return false;
							}
							var commodityaTbodyInta = c('user_body_right_foot_item_commoditya_tbody_inta');
							for(var i = 0; i < commodityaTbodyInta.length; i++){
								(function(q){
									commodityaTbodyInta[q].onfocus = function(){
										var that = this;
										$.ajax({
											type: 'post',
											url: URLS + '/rocars/getGoodsByType.json',
											data: {
												operPartyID: loginUserName.operatorID,
												recarsType: this.name,
											},
											success: function(msg){
												var ul = creat('ul');
												ul.className = 'user_body_right_foot_item_commoditya_tbody_ula';
												ul.setAttribute('data-list',q);
												ul.style.width = that.clientWidth + 'px';
												var li = creat('li');
												li.innerHTML = '请选择...';
												li.setAttribute('data-value','');
												li.style.color = '#999999';
												ul.appendChild(li);
												for(var j = 0; j < msg.length; j++){
													var li = creat('li');
													li.innerHTML = msg[j].goods;
													li.setAttribute('data-value',msg[j].goodsId);
													ul.appendChild(li);
												}
												that.parentNode.appendChild(ul);

												var commodityaTbodyUla = c('user_body_right_foot_item_commoditya_tbody_ula');
												for(var j = 0; j < commodityaTbodyUla[0].children.length; j++){
													commodityaTbodyUla[0].children[j].onmousedown = function(){
														if(this.innerHTML == '请选择...'){
															that.value = '';
															that.setAttribute('data-value','');
														}else{
															that.value = this.innerHTML;
															that.setAttribute('data-value',this.dataset.value);
														}
													}
												}
											}
										})
									}
									commodityaTbodyInta[q].onblur = function(){
										this.parentNode.removeChild(this.parentNode.children[1]);
									}
								})(i)
							}
							$.ajax({
								type: 'post',
								url: URLS + '/rocars/updateRecars.json',
								data: {
									machCode: machCODE,
									jsData: JSON.stringify(objTbody),
								},
								success: function(){
									console.log('成功');
									//byStart(machCODE);
								},
								error: function(){
									console.log('失败');
								}
							})
							itemFixedbb.style.display = 'none';
							alern('成功');
							return false;
						};
						if(MACHROAD.type == 'c'){
							//双子座部分
							//初始数据渲染
							var machcStart = [];
							var machcObj = [];
							for(var i = 0; i < itemObject.length; i++){
								machcObj.push(itemObject[i].recarsType);
								machcStart.push(itemObject[i].recars.split('-')[0]);
							}
							var hashStart=[];
							var hashObj = [];
							for (var i = 0; i < machcStart.length; i++) {
								for (var j = i+1; j < machcStart.length; j++) {
									if(machcStart[i]===machcStart[j]){
										++i;
									}
								}
								hashStart.push(parseInt(machcStart[i])-1);
								hashObj.push(machcObj[i]);
							}
							c('user_body_right_foot_item_roadc')[0].style.display = 'block';
							var roadcTable = c('user_body_right_foot_item_roadc_table')[0]; 
							var roadcTableInt = c('user_body_right_foot_item_roadc_table_int');
							for(var i = 0; i < hashStart.length; i++){
								roadcTableInt[hashStart[i]].value = hashObj[i];
								if(hashObj[i] == 60){
									roadcTableInt[hashStart[i]].name = 22;
								}else if(hashObj[i] == 80){
									roadcTableInt[hashStart[i]].name = 16;
								}else if(hashObj[i] == 100){
									roadcTableInt[hashStart[i]].name = 13;
								}else if(hashObj[i] == 50){
									roadcTableInt[hashStart[i]].name = 26;
								}else if(hashObj[i] == 75){
									roadcTableInt[hashStart[i]].name = 17;
								}
							}
							for(var i = 0; i < roadcTableInt.length; i++){
								var ul = creat('ul');
								ul.className = 'user_body_right_foot_item_roadc_table_select';
								ul.style.width = roadcTableInt[i].clientWidth + 2 + 'px';
								ul.setAttribute('data-list',i);
								for(var j = 0; j < MACHROAD.value.length; j++){
									var li = creat('li');
									li.innerHTML = MACHROAD.value[j];
									if(MACHROAD.value[j] == 60){
										li.setAttribute('data-value',22);
									}else if(MACHROAD.value[j] == 80){
										li.setAttribute('data-value',16);
									}else if(MACHROAD.value[j] == 100){
										li.setAttribute('data-value',13);
									}else if(MACHROAD.value[j] == 50){
										li.setAttribute('data-value',26);
									}else if(MACHROAD.value[j] == 75){
										li.setAttribute('data-value',17);
									}
									ul.appendChild(li);
								}
								roadcTable.appendChild(ul);
								ul.style.left = roadcTableInt[i].parentNode.offsetLeft + 139 + 'px';
								ul.style.top = roadcTableInt[i].parentNode.offsetTop + 37 + 'px';

								var roadbTableSelect = c('user_body_right_foot_item_roadc_table_select');
								(function(q){
									roadcTableInt[q].onfocus = function(){
										roadbTableSelect[q].style.display = 'block';
									}
									roadcTableInt[q].onblur = function(){
										roadbTableSelect[q].style.display = 'none';
									}
								})(i)
							}
							var roadbTableSelect = c('user_body_right_foot_item_roadc_table_select');
							for(var i = 0; i < roadbTableSelect.length; i++){
								for(var j = 0; j < roadbTableSelect[i].children.length; j++){
									roadbTableSelect[i].children[j].onmousedown = function(){
										roadcTableInt[this.parentNode.dataset.list].value = this.innerHTML;
										roadcTableInt[this.parentNode.dataset.list].name = this.dataset.value;
									}
								}
							}
							var roadaObj = itemBtnbSubmits(machCODE);
							if(JSON.stringify(roadaObj) == 'false'){
								return false;
							}
							$.ajax({
								type: 'post',
								url: URLS + '/rocars/saveRecars.json',
								data: {
									machCode: machCODE,
									jsData: JSON.stringify(roadaObj),
								},
								async: false,
								success: function(data){
									console.log('成功');
								}
							})
							//导入商品
							var huodaoId = [];
							var commodityaTbody = c('user_body_right_foot_item_commoditya_tbody')[0];
							$.ajax({
								type: 'post',
								url: URLS + '/rocars/getRecarsByMachCode.json',
								data: {
									machCode: machCODE,
								},
								async: false,
								dataType: 'json',
								success: function(data){
									for(var i = 0; i < data.length; i++){
										huodaoId.push(data[i].id);
									}
								}
							})
							commodityaTbody.innerHTML = "";
							for(var i = 0;i < itemObject.length; i++){
								var tr = creat('tr');
								var tda = creat('td');
								var tdb = creat('td');
								var tdc = creat('td');
								var tdd = creat('td');
								tda.innerHTML = itemObject[i].recars;
								tda.title = huodaoId[i];
								tdb.innerHTML = '<input class="user_body_right_foot_item_commoditya_tbody_inta" name="'+itemObject[i].recarsType+'" readonly="readonly" value="'+itemObject[i].goods+'" data-value="'+itemObject[i].goodsId+'" placeholder="请选择..."/>';
								tdc.innerHTML = '<input class="user_body_right_foot_item_commoditya_tbody_intb" value="'+itemObject[i].number+'" type="number"/>';
								var pride = itemObject[i].price;
								if(pride == ""){
									pride = 1;
								}
								tdd.innerHTML = '<input class="user_body_right_foot_item_commoditya_tbody_intc" type="number" value="'+pride+'"/>';
								tr.appendChild(tda);
								tr.appendChild(tdb);
								tr.appendChild(tdc);
								tr.appendChild(tdd);
								commodityaTbody.appendChild(tr);
							}
							var itemCommodityaTbody = c('user_body_right_foot_item_commoditya_tbody')[0];
							var objTbody = [];	//被提交的数据集合
							var xsbwk = [];		//判断价格系数不能为空的数组
							var slbwk = [];		//商品存在则商品数量不能为空
							var spbwk = [];		//商品数量存在则商品不能为空
							var xsty = [];		//同商品的价格系数必须统一
							var objObject = [];	//将所有报错数据汇总到一起提示
							for(var i = 0; i < itemCommodityaTbody.children.length; i++){
								var objTbodys = [];
								if(itemCommodityaTbody.children[i].children[3].children[0].value == ""){
									xsbwk.push(itemCommodityaTbody.children[i].children[0].innerHTML + '价格系数不能为空!<br/>');
								}
								if(itemCommodityaTbody.children[i].children[1].children[0].value != ""&&itemCommodityaTbody.children[i].children[2].children[0].value == ""){
									slbwk.push(itemCommodityaTbody.children[i].children[0].innerHTML + '商品数量不能为空!<br/>')
								}
								if(itemCommodityaTbody.children[i].children[1].children[0].value == ""&&itemCommodityaTbody.children[i].children[2].children[0].value != ""){
									spbwk.push(itemCommodityaTbody.children[i].children[0].innerHTML + '商品不能为空!<br/>')
								}
								objTbodys.push(machCODE);																//设备编号
								objTbodys.push(itemCommodityaTbody.children[i].children[0].innerHTML);					//货道
								objTbodys.push(itemCommodityaTbody.children[i].children[1].children[0].value);			//商品名称
								objTbodys.push(itemCommodityaTbody.children[i].children[1].children[0].dataset.value);	//商品ID
								objTbodys.push(itemCommodityaTbody.children[i].children[1].children[0].name);			//货道类型
								objTbodys.push(itemCommodityaTbody.children[i].children[2].children[0].value);			//商品数量
								objTbodys.push(itemCommodityaTbody.children[i].children[3].children[0].value);			//价格系数
								objTbodys.push(itemCommodityaTbody.children[i].children[0].title);						//货道ID
								objTbody.push(objTbodys);
							};
							if(xsbwk != ''){
								alern(xsbwk.join(''));
								return false;
							};
							if(slbwk != ''){
								alern(slbwk.join(''));
								return false;
							};
							if(spbwk != ''){
								alern(spbwk.join(''));
								return false;
							};
							//筛选出商品为空的先排除
							var ceObjTbody = objTbody.slice(0);
							for(var i = objTbody.length-1; i > 0; i--){
								if(objTbody[i][2] == ""){
									ceObjTbody.splice(i,1)
								}
							}
							//筛选出不重复的商品列表
							var ceObjTbodys = [];
							for(var i = 0; i < ceObjTbody.length; i++){
								var count = 0;
								for(var j = 0; j < ceObjTbodys.length; j++){
									if(ceObjTbody[i][3] == ceObjTbodys[j][3]){
										count = 1;
									}
								}
								if(count == 0){
									ceObjTbodys.push(ceObjTbody[i]);
								}
							}
							//将商品相同的货道分类到一起
							for(var i = 0; i < ceObjTbodys.length; i++){
								var xstyObject = [];
								for(var j = 0; j < ceObjTbody.length; j++){
									if(ceObjTbodys[i][3] == ceObjTbody[j][3]){
										xstyObject.push(ceObjTbody[j]);
									}
								}
								xsty.push(xstyObject);
								xsty.push('<br/>');
							}
							for(var i = 0; i < xsty.length; i++){
								var count = 0;
								var xstyCount = [];
								xstyCount.push(xsty[i][0][2]);
								xstyCount.push('<div style="font-size: 14px; color: red; margin-bottom: 5px;">价格系数不一致</div>');
								for(var j = 0; j < xsty[i].length; j++){
									xstyCount.push(xsty[i][j][1] +'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;系数: '+ xsty[i][j][6] +'</br>');
									if(xsty[i][j][6] != xsty[i][0][6]){
										count = 1;
									}
								}
								xstyCount.push('</br>');
								if(count == 1){
									objObject.push(xstyCount.join(''));
								}
							}
							if(objObject != ''){
								alern(objObject.join(''));
								return false;
							}
							var commodityaTbodyInta = c('user_body_right_foot_item_commoditya_tbody_inta');
							for(var i = 0; i < commodityaTbodyInta.length; i++){
								(function(q){
									commodityaTbodyInta[q].onfocus = function(){
										var that = this;
										$.ajax({
											type: 'post',
											url: URLS + '/rocars/getGoodsByType.json',
											data: {
												operPartyID: loginUserName.operatorID,
												recarsType: this.name,
											},
											success: function(msg){
												var ul = creat('ul');
												ul.className = 'user_body_right_foot_item_commoditya_tbody_ula';
												ul.setAttribute('data-list',q);
												ul.style.width = that.clientWidth + 'px';
												var li = creat('li');
												li.innerHTML = '请选择...';
												li.setAttribute('data-value','');
												li.style.color = '#999999';
												ul.appendChild(li);
												for(var j = 0; j < msg.length; j++){
													var li = creat('li');
													li.innerHTML = msg[j].goods;
													li.setAttribute('data-value',msg[j].goodsId);
													ul.appendChild(li);
												}
												that.parentNode.appendChild(ul);

												var commodityaTbodyUla = c('user_body_right_foot_item_commoditya_tbody_ula');
												for(var j = 0; j < commodityaTbodyUla[0].children.length; j++){
													commodityaTbodyUla[0].children[j].onmousedown = function(){
														if(this.innerHTML == '请选择...'){
															that.value = '';
															that.setAttribute('data-value','');
														}else{
															that.value = this.innerHTML;
															that.setAttribute('data-value',this.dataset.value);
														}
													}
												}
											}
										})
									}
									commodityaTbodyInta[q].onblur = function(){
										this.parentNode.removeChild(this.parentNode.children[1]);
									}
								})(i)
							}
							$.ajax({
								type: 'post',
								url: URLS + '/rocars/updateRecars.json',
								data: {
									machCode: machCODE,
									jsData: JSON.stringify(objTbody),
								},
								success: function(){
									console.log('成功');
									//byStart(machCODE);
								},
								error: function(){
									console.log('失败');
								}
							})
							itemFixedbb.style.display = 'none';
							alern('成功');
							return false;
						};
						alern('请先选择模板');
					}
				}
			}
		})
	}
	var itemBtnbcCount;
	itemBtnbc.onclick = function(){
		var itemFixedbb = c('user_body_right_foot_item_fixedbc')[0];		//导入模板弹出窗
		var itemDivbbClose = c('user_body_right_foot_item_divbc_close')[0];	//关闭弹出窗按钮
		var itemDivbbBody = c('user_body_right_foot_item_divbc_body')[0];	//弹出窗承载体
		var itemDivbbBtn = c('user_body_right_foot_item_divbc_foot_btn')[0];//导入执行按钮
		var itemObject = [];
		itemDivbbClose.onclick = function(){
			itemFixedbb.style.display = 'none';
		}
		$.ajax({
			type: 'post',
			url: URLS + '/template/getTemplate.json',
			data: {
				operatorID: loginUserName.operatorID,
				machModelID: MACHOBJECT.machModelID,
			},
			success: function(data){
				if(itemBtnbcCount != 1){
					if(data == ""){
						alern('当前没有可用模板');
						itemFixedbb.style.display = 'none';
						return false;
					}
				}else{
					itemBtnbcCount = undefined;
				}
				itemFixedbb.style.display = 'block';
				itemDivbbBody.innerHTML = "";
				for(var i = 0; i < data.length; i++){
					var divList = creat('div');
					var divLeft = creat('div');
					var divCenter = creat('div');
					var divRight = creat('div');
					var divRights = creat('div');
					var divClear = creat('div');
					divList.className = 'user_body_right_foot_item_divbc_body_list';
					divLeft.className = 'user_body_right_foot_item_divbc_body_list_left';
					divCenter.className = 'user_body_right_foot_item_divbc_body_list_center';
					divRight.className = 'user_body_right_foot_item_divbc_body_list_right';
					divRights.className = 'user_body_right_foot_item_divbc_body_list_rights';
					divClear.className = 'clear';
					itemObject.push(data[i].templateData);
					divLeft.innerHTML = i+1;
					divCenter.innerHTML = data[i].templateID;
					divRight.innerHTML = data[i].templateName;
					divRights.innerHTML = '<button class="user_body_right_foot_item_divbc_body_list_btn" name="'+data[i].templateID+'">删除</button>';
					divList.appendChild(divLeft);
					divList.appendChild(divCenter);
					divList.appendChild(divRight);
					divList.appendChild(divRights);
					divList.appendChild(divClear);
					itemDivbbBody.appendChild(divList);
				}
				var itemDivbcListBtn = c('user_body_right_foot_item_divbc_body_list_btn');
				for(var i = 0; i < itemDivbcListBtn.length; i++){
					(function(q){
						itemDivbcListBtn[q].onclick = function(){
							if(confirm('删除模板?')){
								$.ajax({
									type: 'post',
									url: URLS + '/template/deleteTemplate.json',
									data: {
										templateID: this.name,
									},
									success: function(data){
										alern('成功');
										itemBtnbcCount = itemDivbcListBtn.length;
										itemBtnbc.click();
									}
								})
							}
						}
					})(i)
				}
			}
		});
	}
}

//货道配置部分渲染
function renderingRoad(machCODE){
	$.ajax({
		type: 'post',
		url: URLS + '/rocars/getRecars.json',
		data: {
			machCode: machCODE,
		},
		dataType: 'json',
		success: function(data){
			MACHROAD = data;
			$.ajax({
				type: 'post',
				url: URLS + '/rocars/getRecarsByMachCode.json',
				data: {
					machCode: machCODE,
				},
				async: false,
				dataType: 'json',
				success: function(msg){
					MACHROADS = msg;
				}
			})
			for(var i = 0; i < c('user_body_right_foot_item_road').length; i++){
				c('user_body_right_foot_item_road')[i].style.display = 'none';
			}
			if(MACHROAD.type == 'a'){
				//特殊货道部分
				//初始数据渲染
				var machaStart = [];
				var machaObj = [];
				for(var i = 0; i < MACHROADS.length; i++){
					machaStart.push(MACHROADS[i].recars.split('-')[0]);
				}
				var hashType =[];
				var hashStart=[];
				var hashObj = [];
				for (var i = 0; i < machaStart.length; i++) {
					var kit = 1;
				    for (var j = i+1; j < machaStart.length; j++) {
				      	if(machaStart[i]===machaStart[j]){
							
				    		kit++;
				        	++i;
				      	}
				    }
					hashType.push(MACHROADS[i].recarsType);
				    hashStart.push(parseInt(machaStart[i]));
				    hashObj.push(kit);
				}
				c('user_body_right_foot_item_roada')[0].style.display = 'block';
				var roadaTable = c('user_body_right_foot_item_roada_table_tbody')[0];
				var roadaBtn = c('user_body_right_foot_item_roada_btn')[0];
				roadaTable.innerHTML = "";
				for(var i = 0; i < hashStart.length; i++){
					var tr = creat('tr');
					var tda = creat('td');
					var tdb = creat('td');
					var tdc = creat('td');
					var tdd = creat('td');
					tda.innerHTML = hashStart[i];
					tdb.innerHTML = '<input class="user_body_right_foot_item_roada_table_selectType" style="cursor: pointer" readonly="readonly" value="'+hashType[i]+'" type="text"/>';
					var ul = creat('ul');
					ul.className = "user_body_right_foot_item_roada_table_selectUl";
					ul.style.left = "100px";
					ul.style.top = '24px';
					for(var j = 0; j < MACHROAD.value.length; j++){
						var li = creat('li');
						li.innerHTML = MACHROAD.value[j];
						li.onmouseover = function(){
							this.style.backgroundColor = '#e5e5e5';
						}
						li.onmouseout = function(){
							this.style.backgroundColor = '#ffffff';
						}
						ul.appendChild(li);
					}
					tdb.appendChild(ul);
					tdc.innerHTML = '<input class="user_body_right_foot_item_roada_table_int" value="'+hashObj[i]+'" type="number"/>';
					tdd.innerHTML = '<button class="user_body_right_foot_item_roada_table_clear"><img src="image/sc.png"/>删除</button>';
					tr.appendChild(tda);
					tr.appendChild(tdb);
					tr.appendChild(tdc);
					tr.appendChild(tdd);
					roadaTable.appendChild(tr);
					var roadaTableInt = c('user_body_right_foot_item_roada_table_int');
					var roadaTableClear = c('user_body_right_foot_item_roada_table_clear');
					var roadaTableSelectType = c('user_body_right_foot_item_roada_table_selectType');
					var roadaTableSelectUl = c('user_body_right_foot_item_roada_table_selectUl');
					for(var j = 0; j <　roadaTableSelectType.length; j++){
						roadaTableSelectUl[j].style.width = roadaTableSelectType[j].clientWidth - 2 + 'px';
					}
					function roadaTableSelectClick(){
						for(var j = 0; j <　roadaTableSelectType.length; j++){
							(function(q){
								roadaTableSelectType[q].onfocus = function(){
									roadaTableSelectUl[q].style.display = 'inline';
								}
								roadaTableSelectType[q].onblur = function(){
									roadaTableSelectUl[q].style.display = 'none';
								}
								for(var k = 0; k < roadaTableSelectUl[q].children.length; k++){
									(function(w){
										roadaTableSelectUl[q].children[w].onmousedown = function(){
											roadaTableSelectType[q].value = roadaTableSelectUl[q].children[w].innerHTML;
										}
									})(k)
								}
							})(j)
						}
					}
					roadaTableSelectClick();
					function roadaTableSelectSet(){
						for(var j = 0; j < roadaTableInt.length;j++){
							(function(q){
								roadaTableInt[q].onchange = function(){
									if(this.value > 40){
										this.value = 40;
										alern('货道行的格数不能超过40');
									}
								}
								roadaTableClear[q].onclick = function(){
									roadaTableSelectType[q].onfocus = function(){
										roadaTableSelectUl[q].style.display = 'inline';
									}
									roadaTableSelectType[q].onblur = function(){
										roadaTableSelectUl[q].style.display = 'none';
									}
									this.offsetParent.parentNode.parentNode.removeChild(this.offsetParent.parentNode);
									for(var k = 0; k < roadaTableClear.length; k++){
										roadaTableClear[k].offsetParent.parentNode.children[0].innerHTML = k+1;
									}
									roadaTableSelectClick();
									roadaTableSelectSet();
								}
							})(j)
						}
					}
					roadaTableSelectSet();
				}
				roadaBtn.onclick = function(){
					var roadaTableInt = c('user_body_right_foot_item_roada_table_int');
					if(roadaTableInt.length < 40){
						var tr = creat('tr');
						var tda = creat('td');
						var tdb = creat('td');
						var tdc = creat('td');
						var tdd = creat('td');
						tda.innerHTML = roadaTableInt.length + 1;
						tdb.innerHTML = '<input class="user_body_right_foot_item_roada_table_selectType" style="cursor: pointer" readonly="readonly" type="text"/>';
						var ul = creat('ul');
						ul.className = "user_body_right_foot_item_roada_table_selectUl";
						ul.style.left = "100px";
						ul.style.top = '24px';
						for(var i = 0; i < MACHROAD.value.length; i++){
							var li = creat('li');
							li.innerHTML = MACHROAD.value[i];
							li.onmouseover = function(){
								this.style.backgroundColor = '#e5e5e5';
							}
							li.onmouseout = function(){
								this.style.backgroundColor = '#ffffff';
							}
							ul.appendChild(li);
						}
						tdb.appendChild(ul);
						tdc.innerHTML = '<input class="user_body_right_foot_item_roada_table_int" type="number"/>';
						tdd.innerHTML = '<button class="user_body_right_foot_item_roada_table_clear"><img src="image/sc.png"/>删除</button>';
						tr.appendChild(tda);
						tr.appendChild(tdb);
						tr.appendChild(tdc);
						tr.appendChild(tdd);
						roadaTable.appendChild(tr);
						var roadaTableInt = c('user_body_right_foot_item_roada_table_int');
						var roadaTableClear = c('user_body_right_foot_item_roada_table_clear');
						var roadaTableSelectType = c('user_body_right_foot_item_roada_table_selectType');
						var roadaTableSelectUl = c('user_body_right_foot_item_roada_table_selectUl');
						for(var i = 0; i <　roadaTableSelectType.length; i++){
							roadaTableSelectUl[i].style.width = roadaTableSelectType[i].clientWidth - 2 + 'px';
						}
						function roadaTableSelectClick(){
							for(var i = 0; i <　roadaTableSelectType.length; i++){
								(function(q){
									roadaTableSelectType[q].onfocus = function(){
										roadaTableSelectUl[q].style.display = 'inline';
									}
									roadaTableSelectType[q].onblur = function(){
										roadaTableSelectUl[q].style.display = 'none';
									}
									roadaTableSelectType[q].value = roadaTableSelectUl[q].children[0].innerHTML;
									for(var j = 0; j < roadaTableSelectUl[q].children.length; j++){
										(function(w){
											roadaTableSelectUl[q].children[w].onmousedown = function(){
												roadaTableSelectType[q].value = roadaTableSelectUl[q].children[w].innerHTML;
											}
										})(j)
									}
								})(i)
							}
						}
						roadaTableSelectClick();
						for(var i = 0; i < roadaTableInt.length;i++){
							(function(q){
								roadaTableInt[q].onchange = function(){
									if(this.value > 40){
										this.value = 40;
										alern('货道行的格数不能超过40');
									}
								}
								roadaTableClear[q].onclick = function(){
									this.offsetParent.parentNode.parentNode.removeChild(this.offsetParent.parentNode);
									for(var j = 0; j < roadaTableClear.length; j++){
										roadaTableClear[j].offsetParent.parentNode.children[0].innerHTML = j+1;
									}
									roadaTableSelectClick();
								}
							})(i)
						}
					}else{
						alern('货道不能超过40行');
					}
				}
			}else if(MACHROAD.type == 'b'){
				//金牛座部分
				//初始数据渲染
				var machbStart = [];
				var machbObj = [];
				for(var i = 0; i < MACHROADS.length; i++){
					machbObj.push(MACHROADS[i].recarsType);
					machbStart.push(MACHROADS[i].recars.split('-')[0]);
				}
				var hashStart=[];
				var hashObj = [];
				for (var i = 0; i < machbStart.length; i++) {
				    for (var j = i+1; j < machbStart.length; j++) {
				      	if(machbStart[i]===machbStart[j]){
				        	++i;
				      	}
				    }
				    hashStart.push(parseInt(machbStart[i])-1);
				    hashObj.push(machbObj[i]);
				}
				c('user_body_right_foot_item_roadb')[0].style.display = 'block';
				var roadbTable = c('user_body_right_foot_item_roadb_table')[0]; 
				var roadbTableInt = c('user_body_right_foot_item_roadb_table_int');
				for(var i = 0; i < roadbTableInt.length; i++){
					roadbTableInt[i].value = "";
					roadbTableInt[i].name = "";
				}
				for(var i = 0; i < hashStart.length; i++){
					roadbTableInt[hashStart[i]].value = hashObj[i];
					roadbTableInt[hashStart[i]].name = parseInt(hashObj[i].split('/')[1]);
				}
				for(var i = 0; i < roadbTableInt.length; i++){
					var ul = creat('ul');
					ul.className = 'user_body_right_foot_item_roadb_table_select';
					ul.style.width = roadbTableInt[i].clientWidth + 2 + 'px';
					ul.setAttribute('data-list',i);
					for(var j = 0; j < MACHROAD.value.length; j++){
						var li = creat('li');
						li.innerHTML = MACHROAD.value[j];
						li.setAttribute('data-value',parseInt(MACHROAD.value[j].split('/')[1]));
						ul.appendChild(li);
					}
					roadbTable.appendChild(ul);
					ul.style.left = roadbTableInt[i].parentNode.offsetLeft + 139 + 'px';
					ul.style.top = roadbTableInt[i].parentNode.offsetTop + 37 + 'px';

					var roadbTableSelect = c('user_body_right_foot_item_roadb_table_select');
					(function(q){
						roadbTableInt[q].onfocus = function(){
							roadbTableSelect[q].style.display = 'block';
						}
						roadbTableInt[q].onblur = function(){
							roadbTableSelect[q].style.display = 'none';
						}
					})(i)
				}
				var roadbTableSelect = c('user_body_right_foot_item_roadb_table_select');
				for(var i = 0; i < roadbTableSelect.length; i++){
					for(var j = 0; j < roadbTableSelect[i].children.length; j++){
						roadbTableSelect[i].children[j].onmousedown = function(){
							roadbTableInt[this.parentNode.dataset.list].value = this.innerHTML;
							roadbTableInt[this.parentNode.dataset.list].name = this.dataset.value;
						}
					}
				}
			}else if(MACHROAD.type == 'c'){
				//双子座部分
				//初始数据渲染
				var machcStart = [];
				var machcObj = [];
				for(var i = 0; i < MACHROADS.length; i++){
					machcObj.push(MACHROADS[i].recarsType);
					machcStart.push(MACHROADS[i].recars.split('-')[0]);
				}
				var hashStart=[];
				var hashObj = [];
				for (var i = 0; i < machcStart.length; i++) {
					for (var j = i+1; j < machcStart.length; j++) {
						if(machcStart[i]===machcStart[j]){
							++i;
						}
					}
					hashStart.push(parseInt(machcStart[i])-1);
					hashObj.push(machcObj[i]);
				}
				c('user_body_right_foot_item_roadc')[0].style.display = 'block';
				var roadcTable = c('user_body_right_foot_item_roadc_table')[0]; 
				var roadcTableInt = c('user_body_right_foot_item_roadc_table_int');
				for(var i = 0; i < roadcTableInt.length; i++){
					roadcTableInt[i].value = "";
					roadcTableInt[i].name = "";
				}
				for(var i = 0; i < hashStart.length; i++){
					roadcTableInt[hashStart[i]].value = hashObj[i];
					if(hashObj[i] == 60){
						roadcTableInt[hashStart[i]].name = 22;
					}else if(hashObj[i] == 80){
						roadcTableInt[hashStart[i]].name = 16;
					}else if(hashObj[i] == 100){
						roadcTableInt[hashStart[i]].name = 13;
					}else if(hashObj[i] == 50){
						roadcTableInt[hashStart[i]].name = 26;
					}else if(hashObj[i] == 75){
						roadcTableInt[hashStart[i]].name = 17;
					}
				}
				for(var i = 0; i < roadcTableInt.length; i++){
					var ul = creat('ul');
					ul.className = 'user_body_right_foot_item_roadc_table_select';
					ul.style.width = roadcTableInt[i].clientWidth + 2 + 'px';
					ul.setAttribute('data-list',i);
					for(var j = 0; j < MACHROAD.value.length; j++){
						var li = creat('li');
						li.innerHTML = MACHROAD.value[j];
						if(MACHROAD.value[j] == 60){
							li.setAttribute('data-value',22);
						}else if(MACHROAD.value[j] == 80){
							li.setAttribute('data-value',16);
						}else if(MACHROAD.value[j] == 100){
							li.setAttribute('data-value',13);
						}else if(MACHROAD.value[j] == 50){
							li.setAttribute('data-value',26);
						}else if(MACHROAD.value[j] == 75){
							li.setAttribute('data-value',17);
						}
						ul.appendChild(li);
					}
					roadcTable.appendChild(ul);
					ul.style.left = roadcTableInt[i].parentNode.offsetLeft + 139 + 'px';
					ul.style.top = roadcTableInt[i].parentNode.offsetTop + 37 + 'px';

					var roadbTableSelect = c('user_body_right_foot_item_roadc_table_select');
					(function(q){
						roadcTableInt[q].onfocus = function(){
							roadbTableSelect[q].style.display = 'block';
						}
						roadcTableInt[q].onblur = function(){
							roadbTableSelect[q].style.display = 'none';
						}
					})(i)
				}
				var roadbTableSelect = c('user_body_right_foot_item_roadc_table_select');
				for(var i = 0; i < roadbTableSelect.length; i++){
					for(var j = 0; j < roadbTableSelect[i].children.length; j++){
						roadbTableSelect[i].children[j].onmousedown = function(){
							roadcTableInt[this.parentNode.dataset.list].value = this.innerHTML;
							roadcTableInt[this.parentNode.dataset.list].name = this.dataset.value;
						}
					}
				}
			}else if(MACHROAD.type == 'd'){
				c('user_body_right_foot_item_roadd')[0].style.display = 'block';
				var userBodyRightFootItemRoaddTbody = c('user_body_right_foot_item_roadd_tbody')[0];
				userBodyRightFootItemRoaddTbody.innerHTML = "";
				for(var i = 0; i < 27; i++){
					var tr = creat('tr');
					var tda = creat('td');
					var tdb = creat('td');
					var tdc = creat('td');
					tda.innerHTML = i+1;
					tdb.innerHTML = '<input class="user_body_right_foot_item_roadd_table_int" type="text" style="cursor: pointer" readonly="readonly" value="'+MACHROAD.value[0]+'"/>';
					tdc.innerHTML = '7';
					tr.appendChild(tda);
					tr.appendChild(tdb);
					tr.appendChild(tdc);
					userBodyRightFootItemRoaddTbody.appendChild(tr);
				}
			}
			byStart(machCODE);
			if(MACHROAD.type == 'b'||MACHROAD.type == 'c'){
				for(let i = 0; i <　c('user_body_right_foot_item_commoditya_tbody_intb').length; i++){
					c('user_body_right_foot_item_commoditya_tbody_intb')[i].disabled = 'disabled';
				}
			}else if(MACHROAD.type == 'd'){
				for(let i = 0; i <　c('user_body_right_foot_item_commoditya_tbody_intb').length; i++){
					c('user_body_right_foot_item_commoditya_tbody_intb')[i].oninput = function(){
						if(this.value > 7){
							this.value = 7
						}else if(this.value < 0){
							this.value = 0
						}
					}
				}
			}
		},
	})
	//保存货道配置
	itemBtnb.onclick = function(){
		var roadaObj = itemBtnbSubmit();
		if(JSON.stringify(roadaObj) == 'false'){
			return false;
		}
		if(!confirm('保存货道会清空商品配置，是否保存?')){
			return false;
		}
		$.ajax({
			type: 'post',
			url: URLS + '/rocars/saveRecars.json',
			data: {
				machCode: machCODE,
				jsData: JSON.stringify(roadaObj),
			},
			success: function(data){
				alern('成功');
				byStart(machCODE);
			}
		})
	}
	function itemBtnbSubmit(){
		var roadaTable = c('user_body_right_foot_item_roada_table_tbody')[0];
		var roadaTableInt = c('user_body_right_foot_item_roada_table_int');
		var roadbTable = c('user_body_right_foot_item_roadb_table')[0];	
		var roadbTableInt = c('user_body_right_foot_item_roadb_table_int');
		var roadcTable = c('user_body_right_foot_item_roadc_table')[0];
		var roadcTableInt = c('user_body_right_foot_item_roadc_table_int');
		var roaddTable = c('user_body_right_foot_item_roadd_table')[0];
		var roaddTableInt = c('user_body_right_foot_item_roadd_table_int');
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
					roadaList.push(machCODE);
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
					roadaList.push(machCODE);
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
					roadaList.push(machCODE);
					roadaList.push(itemCommodityaTbody.children[i].children[1].children[0].value);			//商品名称
					roadaList.push(itemCommodityaTbody.children[i].children[1].children[0].dataset.value);	//商品ID
					roadaList.push(itemCommodityaTbody.children[i].children[2].children[0].value);			//商品数量
					roadaList.push(itemCommodityaTbody.children[i].children[3].children[0].value);			//价格系数
					roadaList.push(itemCommodityaTbody.children[i].children[0].title);						//货道ID
					roadaObj.push(roadaList);
				};
			}
		}else{*/
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
					roadaList.push(machCODE);
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
					roadaList.push(machCODE);
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
					roadaList.push(machCODE);
					roadaList.push("");						//商品名称
					roadaList.push("");						//商品ID
					roadaList.push("");						//商品数量
					roadaList.push("");						//价格系数
					roadaList.push("");						//货道ID
					roadaObj.push(roadaList);
				}
			};
		}else if(MACHROAD.type == 'd'){
			var itemRoadcTbody = c('user_body_right_foot_item_roadc_tbody')[3];
			for(var i = 0; i < roaddTableInt.length; i++){
				if(roaddTableInt[i].value == ""){
					alern('货道类型不能为空！');
					return false;
				}
			}
			for(var i = 0; i < roaddTableInt.length; i++){
				var roadaList = [];
				roadaList.push(itemRoadcTbody.children[i].children[0].innerHTML);					//货道
				roadaList.push(itemRoadcTbody.children[i].children[1].children[0].value);			//货道类型
				roadaList.push(machCODE);
				roadaList.push("");						//商品名称
				roadaList.push("");						//商品ID
				roadaList.push("");						//商品数量
				roadaList.push("");						//价格系数
				roadaList.push("");						//货道ID
				roadaObj.push(roadaList);
			};
		}
		return roadaObj;
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

	//补货管理布局渲染
	var itemTonic = c('user_body_right_foot_item_tonic')[0];
	itemTonic.style.height = window.innerHeight - 430 + 'px';

	//在售管理布局渲染
	var priceDiv = c('user_body_right_foot_item_price')[0];
	var stockDiv = c('user_body_right_foot_item_stock')[0];
	priceDiv.style.height = window.innerHeight - 430 + 'px';
	stockDiv.style.height = window.innerHeight - 430 + 'px';
}

start();
startbody();	//渲染主体部分数据