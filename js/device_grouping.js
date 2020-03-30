var URLID = null;
group();
Authority(loginUserName.empcode);
function start(){

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
	//区域分组
	function sonsTree(arr,id){
	    var temp = [],lev=0;
	    var forFn = function(arr, id,lev){
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
	for(var i = 0; i < KIT.length; i++){
		count.push(KIT[i].parent_id);
	}
	var tree = sonsTree(KIT,Math.min.apply(Math,count));
	var temp = [];
	var itemBreak = null;
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
	var Head = c('device_head')[0];
	var Groupingz = c('device_head_groupingz')[0];
	var ul = creat('ul');
	ul.className = "device_head_ul";
	var li = "";
	for(var j = 0; j < temp.length; j++){
		li += (temp[j]);
	}
	ul.innerHTML = li;
	ul.style.minWidth = Groupingz.clientWidth + 'px';
	Head.appendChild(ul);

	var headUlz = c('device_head_ul');
	Groupingz.onfocus = function(){
		headUlz[0].style.display = "inline-block";
		headUlz[0].style.left = this.offsetParent.offsetLeft + 5 + 'px';
		headUlz[0].style.top = this.offsetParent.offsetTop + this.clientHeight + 5 + 'px';
		headUlz[0].style.maxHeight = window.innerHeight - Groupingz.offsetParent.offsetTop - 200 + 'px';
	}
	Groupingz.onblur = function(){
		headUlz[0].style.display = "none";
	}

	for(var j = 0; j < headUlz[0].children.length; j++){
		headUlz[0].children[j].children[1].onmousedown = function(){
			Groupingz.value = this.innerHTML;
			Groupingz.name = this.dataset.id;
		}
	}

	//停用启用下拉框
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
	for(var i = 0; i < KIT.length; i++){
		count.push(KIT[i].parent_id);
	}
	var tree = sonsTree(KIT,Math.min.apply(Math,count));
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

	var Head = c('device_head')[0];
	var Select = c('device_head_select');
	for(var i = 0; i < Select.length; i++){
		var ul = creat('ul');
		ul.className = "device_head_uls";
		ul.setAttribute("data-list", i);
		for(var j = 0; j < KITSTOP.length; j++){
			var li = creat('li');
			li.innerHTML = KITSTOP[j].text;
			li.setAttribute("data-value", KITSTOP[j].value);
			ul.appendChild(li);
		}
		ul.style.minWidth = Select[i].clientWidth + 'px';
		Head.appendChild(ul);

		(function(q){
			var headUl = c('device_head_uls');
			Select[q].onfocus = function(){
				headUl[q].style.display = "inline-block";
				headUl[q].style.left = this.offsetParent.offsetLeft + 5 + 'px';
				headUl[q].style.top = this.offsetParent.offsetTop + this.clientHeight + 5 + 'px';
			}
			Select[q].onblur = function(){
				headUl[q].style.display = "none";
			}
		})(i)

		var headUl = c('device_head_uls');
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

//搜索渲染
var deviceHeadSubmit = c('device_head_submit')[0];
deviceHeadSubmit.onclick = function(){
	var deviceHeadGroupingz = d('device_head_groupingz').name;
	/*var deviceHeadMan = d('device_head_man').value;*/
	var deviceHeadSelect = d('device_head_select').name;
	if(deviceHeadGroupingz == ""){
		deviceHeadGroupingz = loginUserName.scopeofauthority;
	}
	console.log(deviceHeadGroupingz);
	console.log(deviceHeadSelect);
	$.ajax({
		type: 'post',
		url: URLZ + '/jf/bg/basic/cfc/searchClassifi.json',
		data: {
			id: deviceHeadGroupingz,
			by: "",
			stop: deviceHeadSelect,
		},
		success: function(data){
			console.log(data);
			KITSEARCH = data.obj;
			if(deviceHeadSelect == 1){
				startbody();
			}else if(deviceHeadSelect == 0){
				var temp = [];
				for(var i = 0; i < KITSEARCH.length; i++){
					if(KITSEARCH[i].icon == 2){
						temp.push('<li><img class="item0" src="image/grouping/003.png"/><a data-id="'+KITSEARCH[i].id+'" onclick=\'rendering('+JSON.stringify(KITSEARCH[i])+',this);\' data-parent-id="'+KITSEARCH[i].parent_id+'">'+KITSEARCH[i].text+'</a></li>');
					}
				}
				var Left = c('device_body_left')[0];
				Left.innerHTML = "";
				var ul = creat('ul');
				ul.className = "device_head_ul_show";
				var li = "";
				for(var j = 0; j < temp.length; j++){
					li += (temp[j]);
				}
				ul.innerHTML = li;
				Left.appendChild(ul);

				var deviceHeadUlShow = c('device_head_ul_show')[0];
				for(var i = 0; i < deviceHeadUlShow.children.length; i++){
					if(URLID == deviceHeadUlShow.children[i].children[1].dataset.id){
						for(var j = 0; j < KIT.length; j++){
							if(KIT[j].id == deviceHeadUlShow.children[i].children[1].dataset.id){
								rendering(KIT[j],deviceHeadUlShow.children[i].children[1]);
								return false;
							}
						}
					}
				}
				c('device_body_right_foot_item')[0].style.display = 'none';
			}
		}
	})
}

//渲染主体部分数据
function startbody(){
	var Head = c('device_head')[0];
	var dBody = c('device_body')[0];

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
	var temp = [];
	for(var i = 0; i < KITSEARCH.length; i++){
		count.push(KITSEARCH[i].parent_id);
	}
	//渲染左边数据
	var tree = sonsTree(KITSEARCH,Math.min.apply(Math,count));
	for(var i=0;i<tree.length;i++){
		var item = tree[i],u = "";
		if(item.icon == 0){
			temp.push('<li><img class="item'+item['lev']+'" src="image/grouping/001.png"/><a data-id="'+item.id+'" data-parent-id="'+item.parent_id+'">'+item.text+'</a></li>');
		}else if(item.icon == 1){
			temp.push('<li><img class="item'+item['lev']+'" src="image/grouping/002.png"/><a data-id="'+item.id+'" data-parent-id="'+item.parent_id+'">'+item.text+'</a></li>');
		}else if(item.icon == 2){
			temp.push('<li><img class="item'+item['lev']+'" src="image/grouping/003.png"/><a data-id="'+item.id+'" onclick=\'rendering('+JSON.stringify(item)+',this);\' data-parent-id="'+item.parent_id+'">'+item.text+'</a></li>');
		}/*else if(item.icon == 3){
			temp.push('<li><img class="item'+item['lev']+'" src="image/grouping/004.png"/><a data-id="'+item.id+'" data-parent-id="'+item.parent_id+'">'+item.text+'</a></li>');
		}else if(item.icon == 4){
			temp.push('<li><img class="item'+item['lev']+'" src="image/grouping/005.png"/><a data-id="'+item.id+'" data-parent-id="'+item.parent_id+'">'+item.text+'</a></li>');
		}*/
	}

	var Left = c('device_body_left')[0];
	Left.innerHTML = "";
	var ul = creat('ul');
	ul.className = "device_head_ul_show";
	var li = "";
	for(var j = 0; j < temp.length; j++){
		li += (temp[j]);
	}
	ul.innerHTML = li;
	Left.appendChild(ul);

	var deviceHeadUlShow = c('device_head_ul_show')[0];
	for(var i = 0; i < deviceHeadUlShow.children.length; i++){
		if(URLID == deviceHeadUlShow.children[i].children[1].dataset.id){
			for(var j = 0; j < KIT.length; j++){
				if(KIT[j].id == deviceHeadUlShow.children[i].children[1].dataset.id){
					rendering(KIT[j],deviceHeadUlShow.children[i].children[1]);
					return false;
				}
			}
		}
	}
	c('device_body_right_foot_item')[0].style.display = 'none';
}

function startbodyRight(){
	//KITHEAD = listMenu();

	var BottomUl = c('device_body_right_head_bottom_ul')[0];
	for(var i = 0; i < KITHEAD.length; i++){
		var li = creat('li');
		li.innerHTML = KITHEAD[i].text;
		li.setAttribute('data-menuid',KITHEAD[i].menuid);
		BottomUl.appendChild(li);
	}
	var divClear = creat('div');
	divClear.className = 'clear';
	BottomUl.appendChild(divClear);

	//渲染右边table切换
	var footList = c('device_body_right_foot_list');
	var ulLi = c('device_body_right_head_bottom_ul')[0].children;

	for(var i = 0; i < KITHEAD.length; i++){
		(function(q){
			ulLi[q].onclick = function(){
				for(var j = 0; j < footList.length; j++){
					console.log(this.dataset.menuid,footList[j].dataset.menuid);
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
				/*for(var j = 0; j < footList.length; j++){
					footList[j].style.display = 'none';
					ulLi[j].style.borderTop = 'none';
					ulLi[j].style.borderLeft = 'none';
					ulLi[j].style.borderRight = 'none';
					ulLi[j].style.marginTop = '0px';
					ulLi[j].style.color = '#428BCA';
					ulLi[j].style.backgroundColor = '#f0f0f0';
				};
				footList[q].style.display = 'block';
				this.style.borderTop = '2px #16b904 solid';
				this.style.borderLeft = '1px #e5e5e5 solid';
				this.style.borderRight = '1px #e5e5e5 solid';
				this.style.marginTop = '-1px';
				this.style.color = '#666666';
				this.style.backgroundColor = '#ffffff';*/
			}
		})(i)
		/*if(KITHEAD[i].value != 1){
			ulLi[i].style.display = 'none';
		}*/
	}
	

	var allNone = 0;
	for(var i = 0; i < KITHEAD.length; i++){
		if(KITHEAD[i].value == 1){
			for(var j = 0; j < footList.length; j++){
				if(KITHEAD[i].menuid == footList[j].dataset.menuid){
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
	/*var allNone = 0;
	for(var i = 0; i < KITHEAD.length; i++){
		if(KITHEAD[i].value == 1){
			for(var j = 0; j < footList.length; j++){
				footList[j].style.display = 'none';
			}
			footList[i].style.display = 'block';
			ulLi[i].style.borderTop = '2px #16b904 solid';
			ulLi[i].style.borderLeft = '1px #e5e5e5 solid';
			ulLi[i].style.borderRight = '1px #e5e5e5 solid';
			ulLi[i].style.marginTop = '-1px';
			ulLi[i].style.color = '#666666';
			ulLi[i].style.backgroundColor = '#ffffff';
			allNone = 1;
			break;
		}
	}
	if(allNone == 0){
		for(var j = 0; j < footList.length; j++){
			footList[j].style.display = 'none';
		}
	}*/
}

//点击后渲染表单
function rendering(msgObject,that){
	c('device_body_right_foot_item')[0].style.display = 'block';
	var deviceId = d('device_id');						//区域/组ID
	var deviceName = d('device_name')					//区域/组名称
	var deviceGrouping = d('device_grouping');			//上级
	var deviceMan = d('device_man');					//区域/组负责人
	var devicePhone = d('device_phone');				//负责人电话
	var deviceExplain = d('device_explain');			//说明
	var deviceStop = d('device_stop');					//停用
	var deviceHeadUlShow = c('device_head_ul_show')[0];
	deviceId.value = msgObject.id;
	deviceName.value = msgObject.text;
	URLID = msgObject.id;								//为渲染点击后黑块样式的全局变量，在顶部声明;
	var groupCount = 0;
	for(var i = 0; i < KIT.length; i++){
		if(msgObject.parent_id == KIT[i].id){
			deviceGrouping.value = KIT[i].text;
			deviceGrouping.name = KIT[i].id;
			groupCount = 1;
			break;
		}
	}
	if(groupCount == 0){
		deviceGrouping.value = "";
		deviceGrouping.name = "";
	}
	deviceMan.value = msgObject.personliableBy;
	devicePhone.value = msgObject.personliableTel;
	deviceExplain.value = msgObject.mark;
	if(msgObject.stop == 0){
		deviceStop.checked = 'checked';
	}else{
		deviceStop.checked = '';
	}
	for(var i = 0; i < deviceHeadUlShow.children.length; i++){
		deviceHeadUlShow.children[i].children[1].style.backgroundColor = "rgba(0,0,0,0)";
	}
	that.style.backgroundColor = "#e5e5e5";

	//上级权限分配
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
	for(var i = 0; i < KIT.length; i++){
		count.push(KIT[i].parent_id);
	}
	var tree = sonsTree(KIT,Math.min.apply(Math,count));
	var temp = [];
	var itemBreak = null;
	for(var i=0;i<tree.length;i++){
	    var item = tree[i],u = "";
	    if(itemBreak == null){
		    if(msgObject.id == item.id){
		    	itemBreak = msgObject.lev;
		    }else{
		    	if(item.icon == 0){
			   		temp.push('<li><img class="item'+item['lev']+'" src="image/grouping/001.png"/><a data-id="'+item.id+'">'+item.text+'</a></li>');
			    }else if(item.icon == 1){
			   		temp.push('<li><img class="item'+item['lev']+'" src="image/grouping/002.png"/><a data-id="'+item.id+'">'+item.text+'</a></li>');
			    }else if(item.icon == 2){
			   		temp.push('<li><img class="item'+item['lev']+'" src="image/grouping/003.png"/><a data-id="'+item.id+'">'+item.text+'</a></li>');
			    }
		    }
	    }else{
	    	if(item.lev <= itemBreak){
		    	if(item.icon == 0){
			   		temp.push('<li><img class="item'+item['lev']+'" src="image/grouping/001.png"/><a data-id="'+item.id+'">'+item.text+'</a></li>');
			    }else if(item.icon == 1){
			   		temp.push('<li><img class="item'+item['lev']+'" src="image/grouping/002.png"/><a data-id="'+item.id+'">'+item.text+'</a></li>');
			    }else if(item.icon == 2){
			   		temp.push('<li><img class="item'+item['lev']+'" src="image/grouping/003.png"/><a data-id="'+item.id+'">'+item.text+'</a></li>');
			    }
	    		itemBreak = null;
	    	}
	    }
	}
	var Head = c('device_head')[0];
	var Grouping = c('device_head_grouping')[0];
	var deviceHeadUl = c('device_head_ul')[1];
	if(deviceHeadUl != undefined){
		var ul = deviceHeadUl;
		ul.innerHTML = "";
	}else{
		var ul = creat('ul');
		ul.className = "device_head_ul";
	}
	var li = "";
	for(var j = 0; j < temp.length; j++){
		li += (temp[j]);
	}
	ul.innerHTML = li;
	ul.style.minWidth = Grouping.clientWidth + 'px';
	Head.appendChild(ul);

	var headUl = c('device_head_ul');
	Grouping.onfocus = function(){
		headUl[1].style.display = "inline-block";
		headUl[1].style.left = this.offsetParent.offsetLeft + 5 + 255 + 'px';
		headUl[1].style.top = this.offsetParent.offsetTop + this.clientHeight + 181 + 'px';
		headUl[1].style.maxHeight = window.innerHeight - this.offsetParent.offsetTop - 190 - 23 - 200 + 'px';
	}
	Grouping.onblur = function(){
		headUl[1].style.display = "none";
	}

	var headUl = c('device_head_ul');
	for(var j = 0; j < headUl[1].children.length; j++){
		headUl[1].children[j].children[1].onmousedown = function(){
			Grouping.value = this.innerHTML;
			Grouping.name = this.dataset.id;
		}
	}

}

var bCreatBtn = d('body_creatbtn');
var bSubmit = d('body_submit');
//创建按钮
bCreatBtn.onclick = function(){
	c('device_body_right_foot_item')[0].style.display = 'block';
	var deviceId = d('device_id');						//区域/组ID
	var deviceName = d('device_name')					//区域/组名称
	var deviceGrouping = d('device_grouping');			//上级
	var deviceMan = d('device_man');					//区域/组负责人
	var devicePhone = d('device_phone');				//负责人电话
	var deviceExplain = d('device_explain');			//说明
	var deviceStop = d('device_stop');					//停用
	deviceId.value = "";
	deviceName.value = "";
	deviceGrouping.value = "";
	deviceGrouping.name = "";
	deviceMan.value = "";
	devicePhone.value = "";
	deviceExplain.value = "";
	deviceStop.checked = "";

	//清除BOM选中状态
	var deviceHeadUlShow = c('device_head_ul_show')[0];
	for(var i = 0; i < deviceHeadUlShow.children.length; i++){
		deviceHeadUlShow.children[i].children[1].style.backgroundColor = "rgba(0,0,0,0)";
	}
	//上级权限分配
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
	for(var i = 0; i < KIT.length; i++){
		count.push(KIT[i].parent_id);
	}
	var tree = sonsTree(KIT,Math.min.apply(Math,count));
	var temp = [];
	var itemBreak = null;
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
	var Head = c('device_head')[0];
	var Grouping = c('device_head_grouping')[0];
	var deviceHeadUl = c('device_head_ul')[1];
	if(deviceHeadUl != undefined){
		var ul = deviceHeadUl;
		ul.innerHTML = "";
	}else{
		var ul = creat('ul');
		ul.className = "device_head_ul";
	}
	var li = "";
	for(var j = 0; j < temp.length; j++){
		li += (temp[j]);
	}
	ul.innerHTML = li;
	ul.style.minWidth = Grouping.clientWidth + 'px';
	Head.appendChild(ul);

	var headUl = c('device_head_ul');
	Grouping.onfocus = function(){
		headUl[1].style.display = "inline-block";
		headUl[1].style.left = this.offsetParent.offsetLeft + 5 + 255 + 'px';
		headUl[1].style.top = this.offsetParent.offsetTop + this.clientHeight + 181 + 'px';
		headUl[1].style.maxHeight = window.innerHeight - this.offsetParent.offsetTop - 190 - 23 - 200 + 'px';
	}
	Grouping.onblur = function(){
		headUl[1].style.display = "none";
	}

	var headUl = c('device_head_ul');
	for(var j = 0; j < headUl[1].children.length; j++){
		headUl[1].children[j].children[1].onmousedown = function(){
			console.log(123);
			Grouping.value = this.innerHTML;
			Grouping.name = this.dataset.id;
		}
	}
}

//停用启用组时的提示
d('device_stop').onchange = function(){
	var deviceId = d('device_id').value;
	if(this.checked && deviceId != ""){
		var deviceObj = "";
		var deviceGroup = "";
		var deviceUser = "";
		var deviceMach = "";
		for(var i = 0; i < KIT.length; i++){
			if(deviceId == KIT[i].parent_id && KIT[i].stop == 1){
				if(KIT[i].icon == 3){
					deviceUser += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + KIT[i].text + '</br>';
				}else if(KIT[i].icon == 4){
					deviceMach += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + KIT[i].text + '</br>';
				}else{
					deviceGroup += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + KIT[i].text + '</br>';
				}
			}
		}
		if(deviceGroup != ""){
			deviceObj += '组：</br>' + deviceGroup + '</br>';
		};
		if(deviceMach != ""){
			deviceObj += '设备：</br>' + deviceMach + '</br>';
		};
		if(deviceUser != ""){
			deviceObj += '&nbsp;&nbsp;&nbsp;人员：</br>' + deviceUser;
		};
		if(deviceObj != ""){
			this.checked = false;
			alern('请停用或转移以下资源！</br></br>&nbsp;&nbsp;&nbsp;' + deviceObj);
		}
	};
}

//保存按钮
bSubmit.onclick = function(){
	if(c('device_body_right_foot_item')[0].style.display == 'block'){
		var deviceId = d('device_id');						//区域/组ID
		var deviceName = d('device_name')					//区域/组名称
		var deviceGrouping = d('device_grouping');			//上级
		var deviceMan = d('device_man');					//区域/组负责人
		var devicePhone = d('device_phone');				//负责人电话
		var deviceExplain = d('device_explain');			//说明
		var deviceStop = d('device_stop');					//停用
		if(deviceName.value == ""){
			alern('区域/组名称不能为空!');
			return false;
		}
		if(deviceGrouping.name == deviceId.value){
			alern('上级不能是本身!');
		}
		if(deviceGrouping.value == ""&&deviceGrouping.name == ""){
			alern('必须为该组选择一个上级!');
			return false;
		}
		if(deviceStop.checked){
			deviceStop = '0';
		}else{
			deviceStop = '1';
		}
		var deviceObject = new Object();
		deviceObject.id = deviceId.value;
		deviceObject.text = deviceName.value;
		deviceObject.parent_id = deviceGrouping.name;
		deviceObject.personliableBy = deviceMan.value;
		deviceObject.personliableTel = devicePhone.value;
		deviceObject.mark = deviceExplain.value;
		deviceObject.stop = deviceStop;
		deviceObject.icon = '2';
		if(deviceId.value == ""){
			//如果不存在ID就会走创建区域/组方法
			$.ajax({
				type: 'post',
				url: URLZ + '/jf/bg/basic/cfc/addClassifi.json',
				data: {
					classiObj: JSON.stringify(deviceObject),
				},
				success: function(data){
					console.log(data.obj);
					if(data.obj == 1){
						alert('创建成功!');
						deviceHeadSubmit.click();
						location.reload();
					};
				}
			})
		}else{
			//如果存在ID就会走更新区域/组方法
			$.ajax({
				type: 'post',
				url: URLZ + '/jf/bg/basic/cfc/saveClassifi.json',
				data: {
					classiObj: JSON.stringify(deviceObject),
				},
				success: function(data){
					if(data.obj == 1){
						alert('操作成功!');
						deviceHeadSubmit.click();
						location.reload();
					}
				}
			})
		}
	}
}

//初始化渲染布局
window.onresize = function(){
	var Head = c('device_head')[0];
	var dBody = c('device_body')[0];
	dBody.style.height = window.innerHeight - Head.clientHeight - 119 + 'px';
}

start();
startbody();	//渲染主体部分数据
startbodyRight();