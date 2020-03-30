var userOperator = d('user_operator');						//权限范围
var userPurview = d('user_purview');						//权限范围
var userName = d('user_name');								//姓名
var userJob = d('user_job');								//职位
var userPhone = d('user_phone');							//联系电话
var userAccount = d('user_account');						//账号
/*var userPassword = d('user_password');					//密码
var userConfirmpass = d('user_confirmpass');				//确认密码*/
var userEmail = d('user_email');							//电子邮件
var userRigphone = d('user_rigphone');						//备用电话
var userLegend = d('user_legend');							//说明
var userStop = d('user_stop');								//是否停用
var type = null;											//提交表单的类型
var userBodyRightFootItem = c('user_body_right_foot_item');	//表单的显示隐藏
var userNameDelete = d('user_name_delete');					//姓名
var userAccountDelete = d('user_account_delete');			//账号
function start(){
	group();
	Authority(loginUserName.empcode);
	/*var KITKIT = [
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
	];*/
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
			KIT = data.obj;
			if(userHeadStatus == 1){
				startbody();
			}else if(userHeadStatus == 0){
				var temp = [];
				for(var i = 0; i < KIT.length; i++){
					if(KIT[i].icon == 3){
						temp.push('<li><img class="item0" src="image/grouping/004.png"/><a data-id="'+KIT[i].id+'" onclick=\'rendering('+JSON.stringify(KIT[i].empcode)+',this);\' data-parent-id="'+KIT[i].parent_id+'">'+KIT[i].text+'</a></li>');
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


//渲染主体部分数据
function startbody(addper){
	KITSort = [];
	for(var i = 0; i < KIT.length; i++){
		if(KIT[i].icon == 3){
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
	function GROUPING(){
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
	GROUPING();

	//运营方
	function OPERATOR(){
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
		   		temp.push('<li><img class="item'+item['lev']+'" src="image/grouping/002.png"/><a data-id="'+item.operatorID+'">'+item.text+'</a></li>');
		    }
		}


		var Head = c('user_head')[0];
		var Operator = c('user_head_operator');
		for(var i = 0; i < Operator.length; i++){
			var ul = creat('ul');
			ul.className = "user_head_ulOperator";
			ul.setAttribute('data-list',i);
			var li = "";
			for(var j = 0; j < temp.length; j++){
				li += (temp[j]);
			}
			ul.innerHTML = li;
			console.log(Operator[i].clientWidth);
			ul.style.minWidth = '179px';
			Head.appendChild(ul);

			(function(q){
				var headUlOperator = c('user_head_ulOperator');
				Operator[q].onfocus = function(){
					headUlOperator[q].style.display = "inline-block";
					headUlOperator[q].style.left = this.offsetParent.offsetLeft + 5 + 255 + 'px';
					headUlOperator[q].style.top = this.offsetParent.offsetTop + this.clientHeight + 181 + 'px';
					headUlOperator[q].style.maxHeight = window.innerHeight - this.offsetParent.offsetTop - 190 - 23 - 200 + 'px';
				}
				Operator[q].onblur = function(){
					headUlOperator[q].style.display = "none";
				}
			})(i)
			
			var headUlOperator = c('user_head_ulOperator');
			if(addper != 1){
				Operator[i].value = headUlOperator[i].children[0].children[1].innerHTML;
				Operator[i].name = headUlOperator[i].children[0].children[1].dataset.id;
			}
			for(var j = 0; j < headUlOperator[i].children.length; j++){
				headUlOperator[i].children[j].onmousedown = function(){
					console.log(this.innerText);
					console.log(this.children[1].dataset.id);
					Operator[this.parentNode.dataset.list].value = this.children[1].innerHTML;
					Operator[this.parentNode.dataset.list].name = this.children[1].dataset.id;
				}
			}
		}
	}
	if(loginUserName.operatorID == 1){
		OPERATOR();
	}else{
		$.ajax({
			type: 'post',
			url: URLS + '/operate/getOperate.json',
			data: {
				operatorID: loginUserName.operatorID,
			},
			success: function(data){
				console.log(data);

				var Head = c('user_head')[0];
				var Operator = c('user_head_operator');
				for(var i = 0; i < Operator.length; i++){
					var ul = creat('ul');
					ul.className = "user_head_ulOperator";
					ul.setAttribute('data-list',i);
					var li = creat('li');
					li.innerHTML = data.operator;
					li.setAttribute('data-value',data.operatorID);
					ul.appendChild(li);
					console.log(Operator[i].clientWidth);
					ul.style.minWidth = '179px';
					Head.appendChild(ul);

					(function(q){
						var headUlOperator = c('user_head_ulOperator');
						Operator[q].onfocus = function(){
							headUlOperator[q].style.display = "inline-block";
							headUlOperator[q].style.left = this.offsetParent.offsetLeft + 5 + 255 + 'px';
							headUlOperator[q].style.top = this.offsetParent.offsetTop + this.clientHeight + 181 + 'px';
							headUlOperator[q].style.maxHeight = window.innerHeight - this.offsetParent.offsetTop - 190 - 23 - 200 + 'px';
						}
						Operator[q].onblur = function(){
							headUlOperator[q].style.display = "none";
						}
					})(i)
			
					var headUlOperator = c('user_head_ulOperator');
					Operator[i].value = headUlOperator[i].children[0].innerHTML;
					Operator[i].name = headUlOperator[i].children[0].dataset.id;
					for(var j = 0; j < headUlOperator[i].children.length; j++){
						headUlOperator[i].children[j].onmousedown = function(){
							Operator[this.parentNode.dataset.list].value = this.children[1].innerHTML;
							Operator[this.parentNode.dataset.list].name = this.children[1].dataset.id;
						}
					}
				}
			}
		})
	}

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
		}else if(item.icon == 3){
			temp.push('<li><img class="item'+item['lev']+'" src="image/grouping/004.png"/><a data-id="'+item.id+'" onclick="rendering(\''+item.empcode+'\',this)" data-parent-id="'+item.parent_id+'">'+item.text+'</a></li>');
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
	BottomUl.innerHTML = "";
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
				/*for(var j = 0; j < footList.length; j++){
					footList[j].style.display = 'none';
				};*/
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
				/*footList[q].style.display = 'block';
				this.style.borderTop = '2px #16b904 solid';
				this.style.borderLeft = '1px #e5e5e5 solid';
				this.style.borderRight = '1px #e5e5e5 solid';
				this.style.marginTop = '-1px';
				this.style.color = '#666666';
				this.style.backgroundColor = '#ffffff';*/
			}
		})(i)
		/*if(USERHEAD[i].value != 1){
			ulLi[i].style.display = 'none';
		}*/
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
	//权限分配界面渲染
	var bRight = c('user_body_right')[0];
	var rHeight = c('user_body_right_head')[0];
	var rFoot = c('user_body_right_foot')[0];
	var panel = c('user_body_right_foot_item_panel')[0];
	if(panel != undefined){
		panel.style.height = bRight.clientHeight - rHeight.clientHeight - rFoot.children[0].children[0].children[0].clientHeight - 60 + 'px';
	}
	
	if(c('user_body_right_foot_item_panel_ul')[0] != undefined){
		c('user_body_right_foot_item_panel_ul')[0].parentNode.removeChild(c('user_body_right_foot_item_panel_ul')[0]);
	};
	
	$.ajax({
		type: 'post',
		url: URLZ + '/jf/bg/basic/sac/searchSubAthor.json',
		async: false,
		data: {
			emplCode: loginUserName.empcode,
		},
		success: function(data){
			USERWE = [];
			for(var i = 0; i < data.obj.length; i++){
				USERWE.push(data.obj[i]);
			}
		}
	})
	var ulz = creat('ul');
	ulz.className = "user_body_right_foot_item_panel_ul";
	var userweobject = [];
	var userweobjects = [];
	for(var i = 0; i < USERWE.length; i++){
		if(USERWE[i].perent == undefined||USERWE[i].perent == ""||USERWE[i].perent == null){
			USERWE[i].lev = 0;
			userweobject.push(USERWE[i]);
		}
	}

	console.log(userweobject);
	for(var o = 0; o < userweobject.length; o++){
		function sonsTree(arr,id){
		    var temp = [],lev=0;
		    temp.push(userweobject[o]);
		    var forFn = function(arr, id,lev){
		        for (var i = 0; i < arr.length; i++) {
		            var item = arr[i];
		            if (item.perent==id) {
		                item.lev=lev + 1;
		                temp.push(item);
		                forFn(arr,item.menuid,lev+1);
		            }
		        }
		    };
		    forFn(arr, id,lev);
		    userweobjects.push(temp);
		    return temp;
		}
		var tree = sonsTree(USERWE,userweobject[o].menuid);
	}
	console.log(userweobjects);
	for(var i = 0; i < userweobjects.length; i++){
		for(var j = 0; j < userweobjects[i].length; j++){
			var li = creat('li');
			li.className = 'items' + userweobjects[i][j].lev;
			li.setAttribute('data-value',userweobjects[i][j].perent);
			li.innerHTML = '<input type="checkbox" data-textEn="'+userweobjects[i][j].textEn+'" value="'+userweobjects[i][j].menuid+'"/>' + userweobjects[i][j].text;
			ulz.appendChild(li);
		}
		/*if(nav[i][0].value == 1){
			li.innerHTML = '<input type="checkbox" checked="checked"/><img src ="'+nav[i][0].icon+'"/>' + nav[i][0].text;
		}else if(nav[i][0].value == 0){
			li.innerHTML = '<input type="checkbox"/><img src ="'+nav[i][0].icon+'"/>' + nav[i][0].text;
		}
		li.setAttribute('data-menuid',nav[i][0].menuid);
		for(var j = 0; j < nav[i][1].length; j++){
			var a = creat('a');
			if(nav[i][1][j][0].value == 1){
				a.innerHTML = '<input type="checkbox" checked="checked"/><img src ="'+nav[i][1][j][0].icon+'"/>' + nav[i][1][j][0].text;
			}else if(nav[i][1][j][0].value == 0){
				a.innerHTML = '<input type="checkbox"/><img src ="'+nav[i][1][j][0].icon+'"/>' + nav[i][1][j][0].text;
			}
			a.setAttribute('data-menuid',nav[i][1][j][0].menuid);
			for(var k = 0; k < nav[i][1][j][1].length; k++){
				var span = creat('span');
				if(nav[i][1][j][1][k].value == 1){
					span.innerHTML = '<input type="checkbox" checked="checked"/>' + nav[i][1][j][1][k].text;
				}else if(nav[i][1][j][1][k].value == 0){
					span.innerHTML = '<input type="checkbox"/>' + nav[i][1][j][1][k].text;
				}
				span.setAttribute('data-menuid',nav[i][1][j][1][k].menuid);
				a.appendChild(span);
			}
			li.appendChild(a);
		}*/
	}
	if(panel != undefined){
		panel.appendChild(ulz);
	}


	var panelUl = c('user_body_right_foot_item_panel_ul')[0];
	if(panelUl != undefined){
		for(var i = 0; i < panelUl.children.length; i++){
			panelUl.children[i].children[0].checked = false;
		}
		for(var i = 0; i < panelUl.children.length; i++){
			//console.log(panelUl.children[i]);USEROTHER
			panelUl.children[i].children[0].onchange = function(){
				console.log(this.parentNode.dataset.value);
				console.log(this.value);
				console.log(this.parentNode.innerText);
			}
		}
	}
}

var Head = c('user_head')[0];
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

function startfoot(){
	if(loginUserName.operatorID == 1){
		var Head = c('user_head')[0];
		var Operator = c('user_head_operator');
		var headUlOperator = c('user_head_ulOperator');
		console.dir(headUlOperator[0].children[0]);
		for(var i = 0; i < Operator.length; i++){
			Operator[i].value = headUlOperator[i].children[0].children[0].innerHTML;
			Operator[i].name = headUlOperator[i].children[0].children[0].dataset.id;
			for(var j = 0; j < headUlOperator[i].children.length; j++){
				headUlOperator[i].children[j].children[0].onmousedown = function(){
					console.log(this.innerHTML);
					console.log(this.dataset.id);
					Operator[this.parentNode.parentNode.dataset.list].value = this.innerHTML;
					Operator[this.parentNode.parentNode.dataset.list].name = this.dataset.id;
				}
			}
		}
	}else{
		var Head = c('user_head')[0];
		var Operator = c('user_head_operator');
		var headUlOperator = c('user_head_ulOperator');
		console.dir(headUlOperator[0].children[0]);
		for(var i = 0; i < Operator.length; i++){
			Operator[i].value = headUlOperator[i].children[0].innerHTML;
			Operator[i].name = headUlOperator[i].children[0].dataset.value;
			for(var j = 0; j < headUlOperator[i].children.length; j++){
				headUlOperator[i].children[j].onmousedown = function(){
					console.log(this.innerHTML);
					console.log(this.dataset.value);
					Operator[this.parentNode.dataset.list].value = this.innerHTML;
					Operator[this.parentNode.dataset.list].name = this.dataset.value;
				}
			}
		}
	}
}

//点击人物渲染右部表单
function rendering(empcode,that){
	console.log(123);
	startfoot();
	USEREMPCODE = empcode;
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
		url: URLZ + '/jf/bg/basic/pc/searchper.json',
		data: {
			empcode: empcode,
		},
		success: function(data){
			console.log(data);
			type = 1;
			for(var i = 0; i < userBodyRightFootItem.length; i++){
				userBodyRightFootItem[i].style.visibility = 'visible';
			}
			userName.value = data.obj.name;
			userJob.value = data.obj.position;
			userPhone.value = data.obj.tel;
			userAccount.value = data.obj.empcode;
			userAccount.disabled = "disabled";
			/*userPassword.value = data.obj.password;
			userConfirmpass.value = data.obj.password;*/
			userEmail.value = data.obj.email;
			userRigphone.value = data.obj.phone;
			userLegend.value = data.obj.mark;
			if(data.obj.stop == 1){
				userStop.checked = false;
			}else{
				userStop.checked = 'checked';
			}
			userNameDelete.value = data.obj.name;
			userAccountDelete.value = data.obj.empcode;
			console.log(KITSorted);
			var userCount = 0;
			for(var i = 0; i < KITSorted.length; i++){
				if(KITSorted[i].id == data.obj.scopeofauthority){
					userPurview.value = KITSorted[i].text;
					userPurview.name = KITSorted[i].id;
					userCount = 1;
				}
				if(KITSorted[i].operatorID == data.obj.operatorID||KITSorted[i].id == data.obj.operatorID){
					console.log(KITSorted[i].text);
					console.log(KITSorted[i].operatorID);
					userOperator.value = KITSorted[i].text;
					userOperator.name = KITSorted[i].operatorID;
				}
			}
			if(userCount == 0){
				userPurview.value = "";
				userPurview.name = "";
			}
		}
	})
	//权限分配
	$.ajax({
		type: 'post',
		url: URLZ + '/jf/bg/basic/sac/searchSubAthor.json',
		async: false,
		data: {
			emplCode: empcode,
		},
		success: function(data){
			console.log(data);
			USEROTHER = [];
			for(var i = 0; i < data.obj.length; i++){
				USEROTHER.push(data.obj[i]);
			}
		}
	})
	$.ajax({
		type: 'post',
		url: URLZ + '/jf/bg/basic/sac/searchSubAthor.json',
		async: false,
		data: {
			emplCode: loginUserName.empcode,
		},
		success: function(data){
			USERWE = [];
			for(var i = 0; i < data.obj.length; i++){
				USERWE.push(data.obj[i]);
			}
		}
	})
	USEROBJECTS = [];
	for(var i = 0; i < USEROTHER.length; i++){
		var count = 0;
		for(var j = 0; j < USERWE.length; j++){
			if(USEROTHER[i].menuid == USERWE[j].menuid){
				count = 1;
			}
		}
		if(count == 0){
			USEROBJECTS.push(USEROTHER[i]);
		}
	}

	//权限分配界面渲染
	var bRight = c('user_body_right')[0];
	var rHeight = c('user_body_right_head')[0];
	var rFoot = c('user_body_right_foot')[0];
	var panel = c('user_body_right_foot_item_panel')[0];
	if(panel != undefined){
		panel.style.height = bRight.clientHeight - rHeight.clientHeight - rFoot.children[0].children[0].children[0].clientHeight - 60 + 'px';
	}
	
	if(c('user_body_right_foot_item_panel_ul')[0] != undefined){
		c('user_body_right_foot_item_panel_ul')[0].parentNode.removeChild(c('user_body_right_foot_item_panel_ul')[0]);
	};
	var ulz = creat('ul');
	ulz.className = "user_body_right_foot_item_panel_ul";
	var userweobject = [];
	var userweobjects = [];
	for(var i = 0; i < USERWE.length; i++){
		if(USERWE[i].perent == undefined||USERWE[i].perent == ""||USERWE[i].perent == null){
			USERWE[i].lev = 0;
			userweobject.push(USERWE[i]);
		}
	}
	for(var o = 0; o < userweobject.length; o++){
		function sonsTree(arr,id){
		    var temp = [],lev=0;
		    temp.push(userweobject[o]);
		    var forFn = function(arr, id,lev){
		        for (var i = 0; i < arr.length; i++) {
		            var item = arr[i];
		            if (item.perent==id) {
		                item.lev=lev + 1;
		                temp.push(item);
		                forFn(arr,item.menuid,lev+1);
		            }
		        }
		    };
		    forFn(arr, id,lev);
		    userweobjects.push(temp);
		    return temp;
		}
		var tree = sonsTree(USERWE,userweobject[o].menuid);
	}
	for(var i = 0; i < userweobjects.length; i++){
		for(var j = 0; j < userweobjects[i].length; j++){
			if(userweobjects[i][j].value == '1'){
				var li = creat('li');
				li.className = 'items' + userweobjects[i][j].lev;
				li.setAttribute('data-value',userweobjects[i][j].perent);
				li.innerHTML = '<input type="checkbox" data-textEn="'+userweobjects[i][j].textEn+'" value="'+userweobjects[i][j].menuid+'"/>' + userweobjects[i][j].text;
				ulz.appendChild(li);
			}
		}
		/*if(nav[i][0].value == 1){
			li.innerHTML = '<input type="checkbox" checked="checked"/><img src ="'+nav[i][0].icon+'"/>' + nav[i][0].text;
		}else if(nav[i][0].value == 0){
			li.innerHTML = '<input type="checkbox"/><img src ="'+nav[i][0].icon+'"/>' + nav[i][0].text;
		}
		li.setAttribute('data-menuid',nav[i][0].menuid);
		for(var j = 0; j < nav[i][1].length; j++){
			var a = creat('a');
			if(nav[i][1][j][0].value == 1){
				a.innerHTML = '<input type="checkbox" checked="checked"/><img src ="'+nav[i][1][j][0].icon+'"/>' + nav[i][1][j][0].text;
			}else if(nav[i][1][j][0].value == 0){
				a.innerHTML = '<input type="checkbox"/><img src ="'+nav[i][1][j][0].icon+'"/>' + nav[i][1][j][0].text;
			}
			a.setAttribute('data-menuid',nav[i][1][j][0].menuid);
			for(var k = 0; k < nav[i][1][j][1].length; k++){
				var span = creat('span');
				if(nav[i][1][j][1][k].value == 1){
					span.innerHTML = '<input type="checkbox" checked="checked"/>' + nav[i][1][j][1][k].text;
				}else if(nav[i][1][j][1][k].value == 0){
					span.innerHTML = '<input type="checkbox"/>' + nav[i][1][j][1][k].text;
				}
				span.setAttribute('data-menuid',nav[i][1][j][1][k].menuid);
				a.appendChild(span);
			}
			li.appendChild(a);
		}*/
	}
	if(panel != undefined){
		panel.appendChild(ulz);
	}


	var panelUl = c('user_body_right_foot_item_panel_ul')[0];
	if(panelUl != undefined){
		for(var i = 0; i < panelUl.children.length; i++){
			panelUl.children[i].children[0].checked = false;
		}
		for(var i = 0; i < panelUl.children.length; i++){
			//console.log(panelUl.children[i]);USEROTHER
			panelUl.children[i].children[0].onchange = function(){
				console.log(this.parentNode.dataset.value);
				console.log(this.value);
				console.log(this.parentNode.innerText);
				/*if(this.checked){
					for(var j = 2; j < this.parentNode.children.length; j++){
						this.parentNode.children[j].children[0].checked = true;
						for(var k = 2; k < this.parentNode.children[j].children.length; k++){
							this.parentNode.children[j].children[k].children[0].checked = true;
						}
					}
				}else{
					for(var j = 2; j < this.parentNode.children.length; j++){
						this.parentNode.children[j].children[0].checked = false;
						for(var k = 2; k < this.parentNode.children[j].children.length; k++){
							this.parentNode.children[j].children[k].children[0].checked = false;
						}
					}
				}*/
			}
			//初始被选中的标签
			for(var j = 0; j < USEROTHER.length; j++){
				if(panelUl.children[i].children[0].value == USEROTHER[j].menuid&&USEROTHER[j].value == '1'){
					panelUl.children[i].children[0].checked = 'checked';
				}
			}
			/*for(var j = 2; j < panelUl.children[i].children.length; j++){
				panelUl.children[i].children[j].children[0].onchange = function(){
					console.log(this.parentNode.dataset.menuid);
					if(this.checked){
						for(var k = 2; k < this.parentNode.children.length; k++){
							this.parentNode.children[k].children[0].checked = true;
						}
					}else{
						for(var k = 2; k < this.parentNode.children.length; k++){
							this.parentNode.children[k].children[0].checked = false;
						}
					}
				};
				for(var k = 2; k < panelUl.children[i].children[j].children.length; k++){
					panelUl.children[i].children[j].children[k].children[0].onchange = function(){
						console.log(this.parentNode.dataset.menuid);
					}
				}
			}*/
		}
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
	var panel = c('user_body_right_foot_item_panel')[0];
	panel.style.height = bRight.clientHeight - rHeight.clientHeight - rFoot.children[0].children[0].children[0].clientHeight - 60 + 'px';
}

function submit(){
	var bodyCreat = d('body_creat');		//创建按钮
	var bodySubmit = d('body_submit');		//保存按钮
	var userStops;

	/*userConfirmpass.onchange = function(){
		if(userConfirmpass.value != userPassword.value){
			alern('确认密码与密码不一致');
			userConfirmpass.value = "";
		}
	}*/
	//创建事件
	bodyCreat.onclick = function(){
		type = 0;
		for(var i = 0; i < userBodyRightFootItem.length; i++){
			userBodyRightFootItem[i].style.visibility = 'visible';
		}
		userOperator.value = "";
		userOperator.name = "";
		userName.value = "";
		userJob.value = "";
		userPhone.value = "";
		userAccount.value = "";
		userAccount.disabled = false;
		/*userPassword.value = "";
		userConfirmpass.value = "";*/
		userEmail.value = "";
		userRigphone.value = "";
		userLegend.value = "";
		userStop.checked = false;
		userPurview.value = "";
		userPurview.name = "";
		userNameDelete.value = "";
		userAccountDelete.value = "";

		startfoot();

		//清除BOM选中状态
		var userHeadUlShow = c('user_head_ul_show')[0];
		for(var i = 0; i < userHeadUlShow.children.length; i++){
			userHeadUlShow.children[i].children[1].style.backgroundColor = "rgba(0,0,0,0)";
		}

		//点击创建按钮时清空权限分配
		var userBodyRightFootItemPanelUl = c('user_body_right_foot_item_panel_ul')[0];
		for(var i = 0; i < userBodyRightFootItemPanelUl.children.length; i++){
			userBodyRightFootItemPanelUl.children[i].children[0].checked = false;
		}
	}

	//保存按钮
	bodySubmit.onclick = function(){
		//创建事件
		var userError = "";
		if(userPurview.name == ""){
			userError += '权限范围不能为空！</br>';
		}
		if(userName.value == ""){
			userError += '姓名不能为空！</br>';
		}
		if(userJob.value == ""){
			userError += '职位不能为空！</br>';
		}
		if(userAccount.value == ""){
			userError += '账号不能为空！</br>';
		}
		/*if(userPassword.value == ""){
			userError += '密码不能为空！</br>';
		}
		if(userConfirmpass.value == ""){
			userError += '确认密码不能为空！';
		}*/
		if(userStop.checked){
			userStops = 0
		}else{
			userStops = 1
		};
		if(userError != ""){
			alern(userError);
			return false;
		}

		var userObject = new Object();
		userObject.OperatorID = userOperator.name;
		userObject.scopeofauthority = userPurview.name;
		userObject.name = userName.value;
		userObject.position = userJob.value;
		userObject.tel = userPhone.value;
		userObject.empcode = userAccount.value;
		/*userObject.password = userPassword.value;*/
		userObject.email = userEmail.value;
		userObject.phone = userRigphone.value;
		userObject.mark = userLegend.value;
		userObject.stop = userStops;

		console.log(userObject);
		if(type == 0){
			//创建事件
			$.ajax({
				type: 'post',
				url: URLZ + '/jf/bg/basic/pc/addper.json',
				data: {
					pObj: JSON.stringify(userObject),
				},
				success: function(data){
					if(data.obj == 1){
						alert('创建成功！');
						start();
						startbody(1);
						location.reload();
					}else{
						alern('创建失败！');
					};
				},
				error: function(){
					alern('创建失败');
				}
			})
		}else if(type == 1){
			//更新事件
			$.ajax({
				type: 'post',
				url: URLZ + '/jf/bg/basic/pc/saveper.json',
				data: {
					pObj: JSON.stringify(userObject),
				},
				success: function(data){
					if(data.obj == 1){
						alert('更新成功');
						start();
						startbody(1);
						location.reload();
					}else{
						alern('更新失败！');
					};
				},
				error: function(){
					alern('更新失败');
				}
			})
			//密码更新
			/*console.log(userAccount.value);
			console.log(userPassword.value);
			$.ajax({
				type: 'post',
				url: URLZ + '/jf/bg/basic/new/updatePWD.json',
				data: {
					empcode: userAccount.value,
					password: userPassword.value,
				},
				success: function(data){
					console.log(data);
				}
			})*/
		}

		//权限分配
		var itemPanelUl = c('user_body_right_foot_item_panel_ul')[0];
		var itemPanelUlArray = [];
		for(var i = 0; i < itemPanelUl.children.length; i++){
			if(itemPanelUl.children[i].children[0].checked){
				var itemPanelUlObject = new Object();
				if(itemPanelUl.children[i].dataset.value != 'undefined'){
					itemPanelUlObject.perent = itemPanelUl.children[i].dataset.value;
				}else{
					itemPanelUlObject.perent = "";
				};
				itemPanelUlObject.menuid = itemPanelUl.children[i].children[0].value;
				itemPanelUlObject.text = itemPanelUl.children[i].innerText;
				itemPanelUlObject.textEn = itemPanelUl.children[i].children[0].dataset.texten;
				itemPanelUlObject.value = 1;
				itemPanelUlObject.emplCode = USEREMPCODE;
				itemPanelUlArray.push(itemPanelUlObject);
			}else{
				var itemPanelUlObject = new Object();
				if(itemPanelUl.children[i].dataset.value != 'undefined'){
					itemPanelUlObject.perent = itemPanelUl.children[i].dataset.value;
				}else{
					itemPanelUlObject.perent = "";
				};
				itemPanelUlObject.menuid = itemPanelUl.children[i].children[0].value;
				itemPanelUlObject.textEn = itemPanelUl.children[i].innerText;
				itemPanelUlObject.value = 0;
				itemPanelUlObject.text = itemPanelUl.children[i].children[0].dataset.text;
				itemPanelUlObject.emplCode = USEREMPCODE;
				itemPanelUlArray.push(itemPanelUlObject);
			}
		}
		for(var i = 0; i < USEROBJECTS.length; i++){
			itemPanelUlArray.push(USEROBJECTS[i]);
		}
		$.ajax({
			type: 'post',
			url: URLZ + '/jf/bg/basic/sac/addSubAthor.json',
			data: {
				subAthorObjArarry: JSON.stringify(itemPanelUlArray),
			},
			success: function(data){
				console.log(data);
			},
			error: function(data){
				console.log(data);
			}
		})
		console.log(JSON.stringify(itemPanelUlArray));
	}
}

c('user_rest_pass')[0].onclick = function(){
	var userName = d('user_name');
	var userAccount = d('user_account');
	if(confirm('重置用户'+userName.value+'的账号'+userAccount.value+'的密码吗？')){
		$.ajax({
			type: 'post',
			url: URLZ + '/jf/bg/basic/pc/initPasswd.json',
			data: {
				empcode: userAccount.value,
			},
			success: function(data){
				if(data.obj == 1){
					alert('重置密码成功！');

				}else{
					alern('重置密码失败！');
				}
			}
		})
	}
}

start();

KITSorted = [];
for(var i = 0; i < KIT.length; i++){
	if(KIT[i].icon == 3){
		KITSorted.push(KIT[i]);
	}
}
for(var i = 0; i < KIT.length; i++){
	if(KIT[i].icon == 2){
		KITSorted.push(KIT[i]);
	}
}
for(var i = 0; i < KIT.length; i++){
	if(KIT[i].icon == 1){
		KITSorted.push(KIT[i]);
	}
}
for(var i = 0; i < KIT.length; i++){
	if(KIT[i].icon == 0){
		KITSorted.push(KIT[i]);
	}
}

startbody();	//渲染主体部分数据
submit();

d('user_empcode_delete').onclick = function(){
	if(confirm('确定要删除"'+userNameDelete.value+'"用户吗？')){
		$.ajax({
			type: 'post',
			url: URLS + '/jf/bg/basic/pc/delete.json',
			data: {
				empcode: userAccountDelete.value,
			},
			success: function(data){
				if(data.code == 10001){
					alert(data.msg);
					start();
					startbody(1);
					location.reload();
				}else{
					alern(data.msg);
				}
			}
		})
	}
}