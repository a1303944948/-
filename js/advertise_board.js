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

	//thead浮空渲染
	/*var footFixedTable = c('user_body_right_foot_fixed_table')[0];
	var footFixedThead = c('user_body_right_foot_fixed_thead')[0];
	var footFixedTbody = c('user_body_right_foot_fixed_tbody')[0];
	for(var i = 0; i < footFixedThead.children[0].children.length;i++){
		footFixedThead.children[0].children[i].style.width = footFixedTbody.children[0].children[i].clientWidth + 'px';
	}*/
}

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
			stop: "1",
		},
		success: function(data){
			console.log(data);
			KITSort = data.obj;
			startbody();
		}
	})
}

//点击人物渲染右部表单
function rendering(devicecode,that){
	ADMACHCODE = devicecode;
	c('user_body_right_foot')[0].style.display = "block";
	//选中代码
	var userHeadUlShow = c('user_head_ul_show')[0];
	for(var i = 0; i < userHeadUlShow.children.length; i++){
		userHeadUlShow.children[i].children[1].style.backgroundColor = "rgba(0,0,0,0)";
	}
	for(var i = 0; i < userHeadUlShow.children.length; i++){
		if(userHeadUlShow.children[i].children[1].dataset.id == that.dataset.id){
			userHeadUlShow.children[i].children[1].style.backgroundColor = "#e5e5e5";
		}
	}
	renderingS(devicecode);
}
function renderingS(devicecode){
	$.ajax({
		type: 'post',
		url: URLS + '/adviertisement/giveAdviertise.json',
		data: {
			machCode: devicecode,
		},
		success: function(data){
			console.log(data);
			var footFixedTbodyTr = c('user_body_right_foot_fixed_tbody_tr');
			//渲染数据之前清空右边内容
			for(var i = footFixedTbodyTr.length-1; i >= 0; i--){
				footFixedTbodyTr[i].parentNode.removeChild(footFixedTbodyTr[i]);
			}
			//渲染数据
			for(var i = 0; i < data.length; i++){
				adCreat(data[i].type,data[i].picOrvidUrl,data[i].duration,data[i].startTime,data[i].endTime,data[i].advertPosition,data[i].content);
			}
			rest();
		}
	})
}

//初始化渲染布局
window.onresize = function(){
	var Head = c('user_head')[0];
	var dBody = c('user_body')[0];
	dBody.style.height = window.innerHeight - Head.clientHeight - 119 + 'px';

	//thead浮空渲染
	/*var footFixedTable = c('user_body_right_foot_fixed_table')[0];
	var footFixedThead = c('user_body_right_foot_fixed_thead')[0];
	var footFixedTbody = c('user_body_right_foot_fixed_tbody')[0];
	for(var i = 0; i < footFixedThead.children[0].children.length;i++){
		footFixedThead.children[0].children[i].style.width = footFixedTbody.children[0].children[i].clientWidth + 'px';
	}*/
};

function adCreat(Arra,Arrb,Arrc,Arrd,Arre,Arrf,Arrg){
	var footFixedTbodyTr = c('user_body_right_foot_fixed_tbody_tr');
	var count = footFixedTbodyTr.length+1;
	if(footFixedTbodyTr.length >= 40){
		alern('广告记录不能超过40条');
		return false;
	}
	var tr = creat('tr');
	tr.className = "user_body_right_foot_fixed_tbody_tr";
	var tda = creat('td');
	var tdb = creat('td');
	var tdc = creat('td');
	var tdd = creat('td');
	var tde = creat('td');
	var tdf = creat('td');
	var tdg = creat('td');
	var tdh = creat('td');
	tda.innerHTML = count;
	var Arrarr = "";
	if(Arra == "image"){
		Arrarr = "图片";
	}else if(Arra == "video"){
		Arrarr = "视频";
	}
	tdb.innerHTML = '<input class="user_body_right_foot_fixed_tbody_type advertise_board_type" style="cursor: pointer;" type="text" placeholder="请选择..." readonly="readonly" name="'+Arra+'" value="'+Arrarr+'" /><b></b>';
	tdc.innerHTML = '<input class="user_body_right_foot_fixed_tbody_addr advertise_board_addr" style="cursor: pointer;" readonly="readonly" type="text" placeholder="请选择资源" data-type="'+Arra+'" data-value="'+Arrb+'" value="'+Arrg+'"/><b></b>';
	tdd.innerHTML = '<input class="advertise_board_time" type="number" placeholder="请输入时长" value="'+Arrc+'"/>';
	tde.innerHTML = '<input class="startTime" type="text" style="cursor: pointer;" readonly="readonly" value="'+Arrd+'"/><div class="startTimeDick"><div class="startTimeDick_left"><div class="startTimeDick_left_top"><b></b></div><div class="startTimeDick_left_center"><input type="number" value="00"/>:</div><div class="startTimeDick_left_bottom"><b></b></div></div><div class="startTimeDick_right"><div class="startTimeDick_right_top"><b></b></div><div class="startTimeDick_right_center"><input type="number" value="00"/></div><div class="startTimeDick_right_bottom"><b></b></div></div><div class="clear"></div><div class="startTimeDick_bottom">确认<div></div>';
	tdf.innerHTML = '<input class="endTime" type="text" style="cursor: pointer;" readonly="readonly" value="'+Arre+'"/><div class="endTimeDick"><div class="endTimeDick_left"><div class="endTimeDick_left_top"><b></b></div><div class="endTimeDick_left_center"><input type="number" value="00"/>:</div><div class="endTimeDick_left_bottom"><b></b></div></div><div class="endTimeDick_right"><div class="endTimeDick_right_top"><b></b></div><div class="endTimeDick_right_center"><input type="number" value="00"/></div><div class="endTimeDick_right_bottom"><b></b></div></div><div class="clear"></div><div class="endTimeDick_bottom">确认<div></div>';
	tdg.innerHTML = '<input class="user_body_right_foot_fixed_tbody_select advertise_board_position" type="text" style="cursor: pointer;" placeholder="请选择..." readonly="readonly" value="'+Arrf+'"/><b></b>';
	tdh.innerHTML = '<button class="user_body_right_foot_fixed_tbody_delete"><img src="image/sc.png"/>删除</button>';
	tr.appendChild(tda);
	tr.appendChild(tdb);
	tr.appendChild(tdc);
	tr.appendChild(tdd);
	tr.appendChild(tde);
	tr.appendChild(tdf);
	tr.appendChild(tdg);
	tr.appendChild(tdh);
	footFixedTbody.appendChild(tr);
	ResourceSelect(tdc.children[0]);
	var footFixedTbodyDelete = c('user_body_right_foot_fixed_tbody_delete');
	var footFixedTbodyTr = c('user_body_right_foot_fixed_tbody_tr');
	function Delete(){
		for(var i = 0; i < footFixedTbodyDelete.length; i++){
			(function(q){
				footFixedTbodyDelete[q].onclick = function(){
					footFixedTbody.removeChild(footFixedTbodyDelete[q].parentNode.parentNode);
					for(var j = 0; j < footFixedTbodyTr.length; j++){
						footFixedTbodyTr[j].children[0].innerHTML = j+1;
					}
					rest();
					Delete();
				}
			})(i)
		}
	}
	Delete();
}

function rest(){//select下拉框渲染
	var footFixedTbodyType = c('user_body_right_foot_fixed_tbody_type');
	var footFixedTbodySelect = c('advertise_board_position');
	var footFixedTbodyAddr = c('user_body_right_foot_fixed_tbody_addr');
	for(var i = 0; i < footFixedTbodyType.length; i++){
		//类型渲染
		var ul = creat('ul');
		ul.className = "user_body_right_foot_fixed_tbody_type_ul";
		ul.setAttribute('data-value',i)
		var lia = creat('li');
		var lib = creat('li');
		lia.setAttribute('data-value','image');
		lia.innerHTML = "图片";
		lib.setAttribute('data-value','video');
		lib.innerHTML = "视频";
		ul.appendChild(lia);
		ul.appendChild(lib);
		if(footFixedTbodyType[i].parentNode.children[2] != undefined){
			footFixedTbodyType[i].parentNode.removeChild(footFixedTbodyType[i].parentNode.children[2]);
		}
		footFixedTbodyType[i].parentNode.appendChild(ul);
		var advertiseBoardTime = c('advertise_board_time');
		if(footFixedTbodyType[i].name == 'video'){
			advertiseBoardTime[i].disabled = true;
			advertiseBoardTime[i].placeholder = "默认视频时长";
			advertiseBoardTime[i].value = "";
			footFixedTbodyType[i].name = 'video';
		}else{
			advertiseBoardTime[i].placeholder = "请输入时长";
			advertiseBoardTime[i].disabled = false;
			footFixedTbodyType[i].name = 'image';
		}
		var fixedTbodyTypeUl = c('user_body_right_foot_fixed_tbody_type_ul');
		var advertiseBoardTime = c('advertise_board_time');
		//for(var j = 0; j < fixedTbodyTypeUl.length; j++){
			(function(q){
				console.log(q + '---------');
				footFixedTbodyType[q].onfocus = function(){
					fixedTbodyTypeUl[q].style.display = 'inline-block';
				}
				footFixedTbodyType[q].onblur = function(){
					fixedTbodyTypeUl[q].style.display = 'none';
				}
				for(var k = 0; k < fixedTbodyTypeUl[q].children.length; k++){
					(function(w){
						fixedTbodyTypeUl[q].children[w].onmousedown = function(){
							if(this.dataset.value === 'video'){
								advertiseBoardTime[q].disabled = true;
								advertiseBoardTime[q].placeholder = "默认视频时长";
								advertiseBoardTime[q].value = "";
								footFixedTbodyType[q].name = 'video';
								footFixedTbodyAddr[q].setAttribute('data-type','video');
								footFixedTbodyAddr[q].value = "";
								footFixedTbodyAddr[q].setAttribute('data-value','');
								ResourceSelect(footFixedTbodyAddr[q]);
							}else{
								advertiseBoardTime[q].placeholder = "请输入时长";
								advertiseBoardTime[q].disabled = false;
								footFixedTbodyType[q].name = 'image';
								footFixedTbodyAddr[q].setAttribute('data-type','image');
								footFixedTbodyAddr[q].value = "";
								footFixedTbodyAddr[q].setAttribute('data-value','');
								ResourceSelect(footFixedTbodyAddr[q]);
							}
							footFixedTbodyType[q].value = this.innerHTML;
						}
					})(k)
				}
			})(i)
		//}

		//广告位渲染
		var uls = creat('ul');
		uls.className = "user_body_right_foot_fixed_tbody_select_ul";
		uls.setAttribute('data-value',i);
		var lisa = creat('li');
		var lisb = creat('li');
		var lisc = creat('li');
		lisa.innerHTML = "1";
		lisb.innerHTML = "2";
		lisc.innerHTML = "3";
		uls.appendChild(lisa);
		uls.appendChild(lisb);
		uls.appendChild(lisc);
		if(footFixedTbodySelect[i].parentNode.children[2] != undefined){
			footFixedTbodySelect[i].parentNode.removeChild(footFixedTbodySelect[i].parentNode.children[2]);
		}
		footFixedTbodySelect[i].parentNode.appendChild(uls);
		var fixedTbodyTypeUls = c('user_body_right_foot_fixed_tbody_select_ul');
		//for(var j = 0; j < fixedTbodyTypeUls.length; j++){
			(function(q){
				footFixedTbodySelect[q].onfocus = function(){
					console.log(q);
					fixedTbodyTypeUls[q].style.display = 'inline-block';
				}
				footFixedTbodySelect[q].onblur = function(){
					fixedTbodyTypeUls[q].style.display = 'none';
				}
				for(var k = 0; k < fixedTbodyTypeUls[q].children.length; k++){
					(function(w){
						fixedTbodyTypeUls[q].children[w].onmousedown = function(){
							footFixedTbodySelect[q].value = this.innerHTML;
						}
					})(k)
				}
			})(i)
		//}
	}

	//选择器渲染
	var startTime = c('startTime');									//起input框
	var endTime = c('endTime');										//止input框
	var startTimeDick = c('startTimeDick');							//开始时间选择器控件
	var endTimeDick = c('endTimeDick');								//结束时间选择器控件
	var startTimeDickLeftTop = c('startTimeDick_left_top');			//开始时间选择器左边上按钮
	var startTimeDickLeftBottom = c('startTimeDick_left_bottom');	//开始时间选择器左边下按钮
	var startTimeDickLeftCenter = c('startTimeDick_left_center');	//开始时间选择器左边内容
	var startTimeDickRightTop = c('startTimeDick_right_top');		//开始时间选择器右边上按钮
	var startTimeDickRightBottom = c('startTimeDick_right_bottom');	//开始时间选择器右边下按钮
	var startTimeDickRightCenter = c('startTimeDick_right_center');	//开始时间选择器右边内容
	var endTimeDickLeftTop = c('endTimeDick_left_top');				//结束时间选择器左边上按钮
	var endTimeDickLeftBottom = c('endTimeDick_left_bottom');		//结束时间选择器左边下按钮
	var endTimeDickLeftCenter = c('endTimeDick_left_center');		//结束时间选择器左边内容
	var endTimeDickRightTop = c('endTimeDick_right_top');			//结束时间选择器右边上按钮
	var endTimeDickRightBottom = c('endTimeDick_right_bottom');		//结束时间选择器右边下按钮
	var endTimeDickRightCenter = c('endTimeDick_right_center');		//结束时间选择器右边内容
	var startTimeDickBottom = c('startTimeDick_bottom');			//开始时间确定按钮
	var endTimeDickBottom = c('endTimeDick_bottom');				//结束时间确定按钮
	for(var i = 0; i < startTime.length; i++){
		(function(q){
			startTime[q].onfocus = function(){
				for(var j = 0; j < startTimeDick.length; j++){
					startTimeDick[j].style.display = "none";
					endTimeDick[j].style.display = "none";
				}
				startTimeDick[q].style.display = "block";
				if(startTime[q].value){
					startTimeDickLeftCenter[q].children[0].value = startTime[q].value.split(':')[0];
					startTimeDickRightCenter[q].children[0].value = startTime[q].value.split(':')[1];
				}else{
					startTimeDickLeftCenter[q].children[0].value = '00';
					startTimeDickRightCenter[q].children[0].value = '00';
				}
				var count = parseInt(startTimeDickLeftCenter[q].children[0].value);
				var counts = parseInt(startTimeDickRightCenter[q].children[0].value);
				startTimeDickLeftTop[q].onclick = function(){
					count++;
					if(count > 23){
						count = 0;
					}
					if(count < 10){
						count = '0' + parseInt(count);
					}
					startTimeDickLeftCenter[q].children[0].value = count;
				}
				startTimeDickLeftBottom[q].onclick = function(){
					count--;
					if(count < 0){
						count = 23;
					}
					if(count < 10){
						count = '0' + parseInt(count);
					}
					startTimeDickLeftCenter[q].children[0].value = count;
				}
				startTimeDickLeftCenter[q].children[0].onchange = function(){
					if(this.value > 23){
						this.value = 23;
					}
					if(this.value < 10&&this.value >= 0){
						this.value = '0' + parseInt(this.value);
					}
					if(this.value < 0){
						this.value = '00';
					}
				}
				startTimeDickRightTop[q].onclick = function(){
					counts++;
					if(counts > 59){
						counts = 0;
					}
					if(counts < 10){
						counts = '0' + parseInt(counts);
					}
					startTimeDickRightCenter[q].children[0].value = counts;
				}
				startTimeDickRightBottom[q].onclick = function(){
					counts--;
					if(counts < 0){
						counts = 59;
					}
					if(counts < 10){
						counts = '0' + parseInt(counts);
					}
					startTimeDickRightCenter[q].children[0].value = counts;
				}
				startTimeDickRightCenter[q].children[0].onchange = function(){
					if(this.value > 59){
						this.value = 59;
					}
					if(this.value < 10&&this.value >= 0){
						this.value = '0' + parseInt(this.value);
					}
					if(this.value < 0){
						this.value = '00';
					}
				}
				startTimeDickBottom[q].onclick = function(){
					startTime[q].value = startTimeDickLeftCenter[q].children[0].value + ':' + startTimeDickRightCenter[q].children[0].value;
					if(endTime[q].value.split(':')[0] != ""){
						if(Number(startTime[q].value.split(':')[0]) > Number(endTime[q].value.split(':')[0])){
							alern('开始时间必须小于结束时间');
							startTime[q].value = "";
						}else if(Number(startTime[q].value.split(':')[0]) == Number(endTime[q].value.split(':')[0])&&Number(startTime[q].value.split(':')[1])>=Number(endTime[q].value.split(':')[1])){
							alern('开始时间必须小于结束时间');
							startTime[q].value = "";
						}
					}
					startTimeDick[q].style.display = "none";
				}
			}
			endTime[q].onfocus = function(){
				for(var j = 0; j < endTimeDick.length; j++){
					startTimeDick[j].style.display = "none";
					endTimeDick[j].style.display = "none";
				}
				endTimeDick[q].style.display = "block";
				if(endTime[q].value){
					endTimeDickLeftCenter[q].children[0].value = endTime[q].value.split(':')[0];
					endTimeDickRightCenter[q].children[0].value = endTime[q].value.split(':')[1];
				}else{
					endTimeDickLeftCenter[q].children[0].value = "00";
					endTimeDickRightCenter[q].children[0].value = "00";
				}
				var count = parseInt(endTimeDickLeftCenter[q].children[0].value);
				var counts = parseInt(endTimeDickRightCenter[q].children[0].value);
				endTimeDickLeftTop[q].onclick = function(){
					count++;
					if(count > 23){
						count = 0;
					}
					if(count < 10){
						count = '0' + parseInt(count);
					}
					endTimeDickLeftCenter[q].children[0].value = count;
				}
				endTimeDickLeftBottom[q].onclick = function(){
					count--;
					if(count < 0){
						count = 23;
					}
					if(count < 10){
						count = '0' + parseInt(count);
					}
					endTimeDickLeftCenter[q].children[0].value = count;
				}
				endTimeDickLeftCenter[q].children[0].onchange = function(){
					if(this.value > 23){
						this.value = 23;
					}
					if(this.value < 10&&this.value >= 0){
						this.value = '0' + parseInt(this.value);
					}
					if(this.value < 0){
						this.value = '00';
					}
				}
				endTimeDickRightTop[q].onclick = function(){
					counts++;
					if(counts > 59){
						counts = 0;
					}
					if(counts < 10){
						counts = '0' + parseInt(counts);
					}
					endTimeDickRightCenter[q].children[0].value = counts;
				}
				endTimeDickRightBottom[q].onclick = function(){
					counts--;
					if(counts < 0){
						counts = 59;
					}
					if(counts < 10){
						counts = '0' + parseInt(counts);
					}
					endTimeDickRightCenter[q].children[0].value = counts;
				}
				endTimeDickRightCenter[q].children[0].onchange = function(){
					if(this.value > 59){
						this.value = 59;
					}
					if(this.value < 10&&this.value >= 0){
						this.value = '0' + parseInt(this.value);
					}
					if(this.value < 0){
						this.value = '00';
					}
				}
				endTimeDickBottom[q].onclick = function(){
					endTime[q].value = endTimeDickLeftCenter[q].children[0].value + ':' + endTimeDickRightCenter[q].children[0].value;
					if(startTime[q].value.split(':')[0] != ""){
						if(Number(startTime[q].value.split(':')[0]) > Number(endTime[q].value.split(':')[0])){
							alern('开始时间必须小于结束时间');
							endTime[q].value = "";
						}else if(Number(startTime[q].value.split(':')[0]) == Number(endTime[q].value.split(':')[0])&&Number(startTime[q].value.split(':')[1])>=Number(endTime[q].value.split(':')[1])){
							alern('开始时间必须小于结束时间');
							endTime[q].value = "";
						}
					}
					endTimeDick[q].style.display = "none";
				}
			}
		})(i)
	}
}


//选择资源下拉框
function ResourceSelect(that){
	var footFixedTbodyAddrArr = [];
	$.ajax({
		type: 'post',
		url: URLS + '/oss/upload/getUrls.json',
		data: {
			type: that.dataset.type,
			operator: JSON.parse(sessionStorage.loginUserName).operatorID,
		},
		success: function(data){
			//下拉框渲染
			if(that.parentNode.children[2] !== undefined){
				that.parentNode.removeChild(that.parentNode.children[2]);
			}
			footFixedTbodyAddrArr = data.result;
			var ulx = creat('ul');
			ulx.className = 'user_body_right_foot_fixed_tbody_addr_ul';
			ulx.style.width = that.clientWidth + 'px';
			for(var i = 0; i < footFixedTbodyAddrArr.length; i++){
				var lix = creat('li');
				lix.innerHTML = footFixedTbodyAddrArr[i].remark;
				lix.setAttribute('data-value',footFixedTbodyAddrArr[i].url);
				lix.onmousedown = function(){
					this.parentNode.parentNode.children[0].value = this.innerHTML;
					this.parentNode.parentNode.children[0].setAttribute('data-value',this.dataset.value);
				};
				ulx.appendChild(lix);
			}
			that.parentNode.appendChild(ulx);
			that.onfocus = function(){
				that.parentNode.children[2].style.display = 'inline-block';
			};
			that.onblur = function(){
				that.parentNode.children[2].style.display = 'none';
			};
		}
	});
}

var footFixedTbody = c('user_body_right_foot_fixed_tbody')[0];
c('user_body_right_foot_foot_add')[0].onclick = function(){	
	adCreat("image","","","","","1","");
	rest();
	//thead浮空渲染
	/*var footFixedTable = c('user_body_right_foot_fixed_table')[0];
	var footFixedThead = c('user_body_right_foot_fixed_thead')[0];
	for(var i = 0; i < footFixedThead.children[0].children.length;i++){
		footFixedThead.children[0].children[i].style.width = footFixedTbody.children[0].children[i].clientWidth + 'px';
	}*/
};

//上传资源功能实现
var advertiseBoardUploadFixed = c('advertise_board_upload_fixed')[0];
c('user_body_right_foot_foot_upload')[0].onclick = function(){
	var advertiseUploadError = "";

	if(advertiseUploadError !== ""){
		alern(advertiseUploadError);
		return false;
	}
	advertiseBoardUploadFixed.style.display = 'block';

	var advertiseBoardUploadFixedBody = c('advertise_board_upload_fixed_body')[0];
	var advertiseBoardUploadFixedBodyHome = c('advertise_board_upload_fixed_body_home')[0];
	advertiseBoardUploadFixedBody.style.maxHeight = window.innerHeight - 160 + 'px';
	advertiseBoardUploadFixedBodyHome.style.maxHeight = parseInt(advertiseBoardUploadFixedBody.style.maxHeight) - 80 + 'px';
	advertiseBoardUploadFixedBody.style.marginTop = -(advertiseBoardUploadFixedBody.clientHeight/2 -50) + 'px';

};
c('advertise_board_upload_fixed_body_clear')[0].onclick = function(){
	advertiseBoardUploadFixed.style.display = 'none';
};

//添加一条资源
c('advertise_board_upload_fixed_body_home_add')[0].onclick = function() {
	c('advertise_board_upload_fixed_body_home_tableS')[0].style.display = "table";
	var tbodyS = c('advertise_board_upload_fixed_body_home_tbodyS')[0],
		tr = creat('tr'),
		tda = creat('td'),
		tdb = creat('td'),
		tdc = creat('td'),
		tdd = creat('td');
	tda.innerHTML = '<div class="advertise_board_upload_fixed_body_home_tbodyS_file" data-type="image" data-name="" data-url="">请选择文件上传...</div><!--<input class="advertise_board_upload_fixed_body_home_tbodyS_file" onchange="tbodyS(this)" type="file" data-value="1" accept=".jpg,.jpeg,.png,.gif,.bmp"/>-->';
	tdb.innerHTML = '<select onchange="tbodySelect(this)"><option value="image">图片</option><option value="video">视频</option></select>';
	tdc.innerHTML = '<input type="text" oninput="tbodySValue(this);" placeholder="输入广告名称..."/>';
	tdd.innerHTML = '<button class="advertise_board_upload_fixed_body_home_tbodyS_btn">上传</button><button onclick="deleteBoardList(this);">删除</button>';
	tr.appendChild(tda);
	tr.appendChild(tdb);
	tr.appendChild(tdc);
	tr.appendChild(tdd);
	tbodyS.appendChild(tr);
	UploadOss(c('advertise_board_upload_fixed_body_home_tbodyS_file').length-1);

	var advertiseBoardUploadFixedBody = c('advertise_board_upload_fixed_body')[0];
	var advertiseBoardUploadFixedBodyHome = c('advertise_board_upload_fixed_body_home')[0];
	advertiseBoardUploadFixedBody.style.maxHeight = window.innerHeight - 160 + 'px';
	advertiseBoardUploadFixedBodyHome.style.maxHeight = parseInt(advertiseBoardUploadFixedBody.style.maxHeight) - 80 + 'px';
	advertiseBoardUploadFixedBody.style.marginTop = -(advertiseBoardUploadFixedBody.clientHeight/2 -50) + 'px';
};
function deleteBoardList(that){
	if(that.parentNode.parentNode.children[0].children[0].dataset.url !== ""){
		$.ajax({
			type: 'post',
			url: URLS + '/oss/upload/deleteOssUrl.json',
			data: {
				ossUrl: that.parentNode.parentNode.children[0].children[0].dataset.url,
				setUrl: 'offical-web/hontech-rdcenter/advertise_board/',
			},
			success: function(){
				that.parentNode.parentNode.style.display = 'none';
				renderingS(ADMACHCODE);
			},
			error: function(){
				that.parentNode.parentNode.style.display = 'none';
				renderingS(ADMACHCODE);
			}
		})
	}else{
		that.parentNode.parentNode.style.display = 'none';
		renderingS(ADMACHCODE);
	}
}

//上传文件触发事件
/*function tbodyS(that){
	that.parentNode.children[0].innerHTML = that.files[0].name;
	that.parentNode.children[1].innerHTML = '';
}*/
//选择文件类型触发事件
function tbodySelect(that){
	if(that.value === 'image'){
		that.parentNode.parentNode.children[0].children[0].setAttribute('data-type',that.value);
	}else if(that.value === 'video'){
		that.parentNode.parentNode.children[0].children[0].setAttribute('data-type',that.value);
	}
}
//输入广告名称触发事件
function tbodySValue(that){
	that.parentNode.parentNode.children[0].children[0].setAttribute('data-name',that.value);
}

var count = 0;
var tbodyFileArray = [];
var tbodyFileObject = {};
//OSS文件上传事件
function UploadOss(num){
	var uploader = new plupload.Uploader({
		runtimes : 'html5,flash,silverlight,html4',
		browse_button : c('advertise_board_upload_fixed_body_home_tbodyS_file')[num],
		//multi_selection: false,
		container: c('advertise_board_upload_fixed_body_home_tbodyS_file')[num].parentNode,
		multi_selection: false,
		flash_swf_url : 'lib/plupload-2.1.2/js/Moxie.swf',
		silverlight_xap_url : 'lib/plupload-2.1.2/js/Moxie.xap',
		url : 'http://oss.aliyuncs.com',

		filters: {
			mime_types : [ //只允许上传图片和视频文件
				{title:"Image files", extensions : "jpg,jpeg,gif,png"},
				{title:"Video files", extensions : "mp4,3gp,avi"}
			],
			max_file_size : '200mb', //最大只能上传200mb的文件
			prevent_duplicates : true, //不允许选取重复文件
			prevent_empty:true, //忽略空文件，大小为0kb的文件
		},
		init: {
			PostInit: function(up) {
				c('advertise_board_upload_fixed_body_home_tbodyS_file')[num].innerHTML = '请选择文件...';
				document.querySelectorAll('.advertise_board_upload_fixed_body_home_tbodyS_btn')[num].onclick = function(){
					if(count === 1){
						alern('请等待上一个文件上传完毕再上传！');
						return false;
					}
					if(c('advertise_board_upload_fixed_body_home_tbody')[0].children.length >= 40){
						alern('广告资源最多不能超过40条！');
						return false;
					}

					var advertiseBoardUploadFixedBodyHomeTbodySFile = c('advertise_board_upload_fixed_body_home_tbodyS_file'),
						tbodyFileError = '';
					tbodyFileArray = [];
					if(advertiseBoardUploadFixedBodyHomeTbodySFile.length === 0){
						alern('请添加资源后在保存！');
						return false;
					}
					tbodyFileObject = {};
					if(advertiseBoardUploadFixedBodyHomeTbodySFile[num].dataset.name === ""){
						tbodyFileError += '广告名不能为空！<br/>';
					}else{
						tbodyFileObject.remark = advertiseBoardUploadFixedBodyHomeTbodySFile[num].dataset.name;
					}
					tbodyFileObject.type = advertiseBoardUploadFixedBodyHomeTbodySFile[num].dataset.type;
					if(up.files.length === 0){
						tbodyFileError += '资源文件不能为空！<br/>';
					}
					if(tbodyFileError !== ""){
						alern(tbodyFileError);
						return false;
					}
					set_upload_param(up,'', false,'offical-web/hontech-rdcenter/advertise_board/');
				};
			},

			FilesAdded: function(up, files){
				if(up.files.length > 1){
					up.splice(0,1);
				}
				c('advertise_board_upload_fixed_body_home_tbodyS_file')[num].innerHTML = '';
				plupload.each(files, function(file)
				{
					c('advertise_board_upload_fixed_body_home_tbodyS_file')[num].innerHTML += '<div id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ')<b></b>'+'<div class="progress"><div class="progress-bar" style="width: 0%"></div></div>'+'</div>';
				});
			},
			BeforeUpload: function(up, file) {
				set_upload_param(up, file.name, true,'offical-web/hontech-rdcenter/advertise_board/');
			},
			UploadFile: function(){
				count = 1;
			},
			UploadProgress: function(up, file) {
				var d = document.getElementById(file.id);
				d.getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
				var prog = d.getElementsByTagName('div')[0];
				prog.style.width='140px';
				var progBar = prog.getElementsByTagName('div')[0];
				progBar.style.width= 1.4*file.percent+'px';
				progBar.setAttribute('aria-valuenow', file.percent);
			},
			FileUploaded: function(up, file, info) {
				count = 0;
				if (info.status == 200)
				{
					c('advertise_board_upload_fixed_body_home_tbodyS_file')[num].setAttribute('data-url',host + '/' + new_multipart_params.key);
					var advertiseBoardUploadFixedBodyHomeTbodyS = c('advertise_board_upload_fixed_body_home_tbodyS')[0],
						advertiseBoardUploadFixedBodyHomeTbodySFile = c('advertise_board_upload_fixed_body_home_tbodyS_file');
					console.log(JSON.stringify(tbodyFileArray));
					tbodyFileObject.url = advertiseBoardUploadFixedBodyHomeTbodySFile[num].dataset.url;
					tbodyFileObject.operator = JSON.parse(sessionStorage.loginUserName).operatorID;
					tbodyFileArray.push(tbodyFileObject);
					$.ajax({
						type: 'post',
						url: URLS + '/oss/upload/saveUrl.json',
						data: {
							ossObjList: JSON.stringify(tbodyFileArray),
							operator: JSON.parse(sessionStorage.loginUserName).operatorID,
						},
						success: function(data){
							if(data.result === 1){
								boardListGet();
								renderingS(ADMACHCODE);
								advertiseBoardUploadFixedBodyHomeTbodySFile[num].parentNode.parentNode.style.display='none';
								alern('保存成功！');
							}else if(data.result === 0){
								alern('保存失败！');
							}else{
								alern('未知错误！');
							}
						},
						error: function(){
							alern('保存失败！');
						}
					});
					console.log('upload to oss success, object name:' + get_uploaded_object_name() + ' 回调服务器返回的内容是:' + info.response);
					//document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = 'upload to oss success, object name:' + get_uploaded_object_name() + ' 回调服务器返回的内容是:' + info.response;
				}
				else if (info.status == 203)
				{
					alern('上传失败！');
					console.log('上传到OSS成功，但是oss访问用户设置的上传回调服务器失败，失败原因是:' + info.response);
					//document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '上传到OSS成功，但是oss访问用户设置的上传回调服务器失败，失败原因是:' + info.response;
				}
				else
				{
					console.log(info.response);
					//document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = info.response;
				}
			},

			Error: function(up, err) {
				count = 0;
				if (err.code == -600) {
					alern("选择的文件太大了，请选择200M以内的文件上传！");
					//document.getElementById('console').appendChild(document.createTextNode("\n选择的文件太大了,可以根据应用情况，在upload.js 设置一下上传的最大大小"));
				}
				else if (err.code == -601) {
					alern("选择的文件后缀不对，目前仅支持图片类型：jpg,jpeg,gif,png；视频类型：mp4,3gp,avi。");
					//document.getElementById('console').appendChild(document.createTextNode("\n选择的文件后缀不对,可以根据应用情况，在upload.js进行设置可允许的上传文件类型"));
				}
				else if (err.code == -602) {
					alern("这个文件已经上传过一遍了");
					//document.getElementById('console').appendChild(document.createTextNode("\n这个文件已经上传过一遍了"));
				}
				else
				{
					alern('出现一个未知错误！');
					console.log("Error xml:" + err.response);
					//document.getElementById('console').appendChild(document.createTextNode("\nError xml:" + err.response));
				}
			}
		}
	});
	uploader.init();
}

//获取广告列表
function boardListGet(){
	var advertiseBoardUploadFixedBodyHomeTbody = c('advertise_board_upload_fixed_body_home_tbody')[0];
	advertiseBoardUploadFixedBodyHomeTbody.innerHTML = "";
	c('advertise_board_upload_fixed_body_home_table')[0].style.display = 'table';
	$.ajax({
		type: 'post',
		url: URLS + '/oss/upload/getUrls.json',
		data: {
			type: '',
			operator: JSON.parse(sessionStorage.loginUserName).operatorID,
		},
		success: function(data){
			console.log(data);
			if(data.result.length <= 0){
				c('advertise_board_upload_fixed_body_home_table')[0].style.display = 'none';
			}
			for(var i = 0; i < data.result.length; i++){
				var tr = creat('tr');
				tr.setAttribute('data-value',JSON.stringify(data.result[i]));
				var tda = creat('td');
				var tdb = creat('td');
				var tdc = creat('td');
				var tdd = creat('td');
				tda.innerHTML = '<input readonly="readonly" type="text" value="'+data.result[i].url+'" />';
				if(data.result[i].type == 'video'){
					tdb.innerHTML = '视频';
				}else{
					tdb.innerHTML = '图片';
				}
				tdc.innerHTML = data.result[i].remark;
				tdd.innerHTML = '<button style="margin-right: 5px;" data-url=\''+data.result[i].url+'\' onclick="viewBoard(this)">预览</button><button data-value=\''+JSON.stringify(data.result[i])+'\' onclick="deleteBoard(this)">删除</button>';
				tr.appendChild(tda);
				tr.appendChild(tdb);
				tr.appendChild(tdc);
				tr.appendChild(tdd);
				advertiseBoardUploadFixedBodyHomeTbody.appendChild(tr);
			}
		}
	})
}
//预览事件
var advertiseBoardViewFixed = c('advertise_board_view_fixed')[0];
function viewBoard(that){
	console.log(that.dataset.url);
	var thisSplit = that.dataset.url.split('.');
	if(that.dataset.url){
		if(thisSplit[thisSplit.length-1] == 'mp4'||thisSplit[thisSplit.length-1] == '3gp'||thisSplit[thisSplit.length-1] == 'avi'){
			loading('加载资源');
			advertiseBoardViewFixed.innerHTML = '';
			var video = creat('video');
			video.autoplay = 'autoplay';
			video.controls = 'controls';
			video.src = that.dataset.url;
			advertiseBoardViewFixed.appendChild(video);
			advertiseBoardViewFixed.children[0].oncanplay = function(){
				loadingClear();
				advertiseBoardViewFixed.style.display = 'block';
				advertiseBoardViewFixed.children[0].style.height = 'auto';
				advertiseBoardViewFixed.children[0].style.width = 'auto';
				if(advertiseBoardViewFixed.clientHeight < advertiseBoardViewFixed.children[0].clientHeight){
					advertiseBoardViewFixed.children[0].style.height = advertiseBoardViewFixed.clientHeight - 50 + 'px';
				}
				if(advertiseBoardViewFixed.clientWidth < advertiseBoardViewFixed.children[0].clientWidth){
					advertiseBoardViewFixed.children[0].style.width = advertiseBoardViewFixed.clientWidth - 50 + 'px';
				}
				advertiseBoardViewFixed.children[0].style.marginTop = (advertiseBoardViewFixed.clientHeight - advertiseBoardViewFixed.children[0].clientHeight)/2 + 'px';
			}
			advertiseBoardViewFixed.children[0].onerror = function(){
				alern('发生错误或是该资源不存在！');
				loadingClear();
			}
		}else{
			loading('加载资源');
			advertiseBoardViewFixed.style.display = 'block';
			advertiseBoardViewFixed.innerHTML = '';
			var img = creat('img');
			img.src = that.dataset.url;
			advertiseBoardViewFixed.appendChild(img);
			advertiseBoardViewFixed.children[0].onload = function(){
				loadingClear();
				advertiseBoardViewFixed.children[0].style.height = 'auto';
				advertiseBoardViewFixed.children[0].style.width = 'auto';
				if(advertiseBoardViewFixed.clientHeight < advertiseBoardViewFixed.children[0].clientHeight){
					advertiseBoardViewFixed.children[0].style.height = advertiseBoardViewFixed.clientHeight - 50 + 'px';
				}
				if(advertiseBoardViewFixed.clientWidth < advertiseBoardViewFixed.children[0].clientWidth){
					advertiseBoardViewFixed.children[0].style.width = advertiseBoardViewFixed.clientWidth - 50 + 'px';
				}
				advertiseBoardViewFixed.children[0].style.marginTop = (advertiseBoardViewFixed.clientHeight - advertiseBoardViewFixed.children[0].clientHeight)/2 + 'px';
			}
			advertiseBoardViewFixed.children[0].onerror = function(){
				alern('发生错误或是该资源不存在！');
				loadingClear();
			}
		}
	}else{
		alern('未检测到资源');
	}
}
advertiseBoardViewFixed.onclick = function(){
	this.style.display = 'none';
};
//删除事件
function deleteBoard(that){
	$.ajax({
		type: 'post',
		url: URLS + '/oss/upload/deleteUrl.json',
		data: {
			ossUrlObj: that.dataset.value,
			setUrl: 'offical-web/hontech-rdcenter/advertise_board/',
		},
		success: function(data){
			console.log(data);
			if(data.result === 1){
				alern('删除成功！');
			}else if(data.result === 0){
				alern('删除失败！');
			}else{
				alern('未知错误！');
			}
			boardListGet();
			renderingS(ADMACHCODE);
		},
		error: function(){
			alern('删除失败！');
			boardListGet();
			renderingS(ADMACHCODE);
		}
	})
}
boardListGet();

//复制到功能实现
var advertiseBoardFixed = c('advertise_board_fixed')[0];
c('user_body_right_foot_foot_more')[0].onclick = function(){
	var advertiseBoardType = c('advertise_board_type');				//图片/视频
	var advertiseBoardAddr = c('advertise_board_addr');				//URL地址
	var advertiseBoardTime = c('advertise_board_time');				//播放时长
	var startTime = c('startTime');									//开始时间
	var endTime = c('endTime');										//结束时间
	var advertiseBoardPosition = c('advertise_board_position');		//广告位
	var advertiseError = "";

	for(var i = 0; i < advertiseBoardType.length; i++){
		if(advertiseBoardType[i].name == ""){
			advertiseError += '第'+(i+1)+'行类型不能为空<br/>';
		}
		if(advertiseBoardAddr[i].value == ""){
			advertiseError += '第'+(i+1)+'行资源不能为空<br/>';
		}
		if(startTime[i].value == ""){
			advertiseError += '第'+(i+1)+'行开始时间不能为空<br/>';
		}
		if(endTime[i].value == ""){
			advertiseError += '第'+(i+1)+'行结束时间不能为空<br/>';
		}
		if(advertiseBoardType[i].name == 'image'){
			if(advertiseBoardTime[i].value == ""){
				advertiseError += '第'+(i+1)+'行播放时长不能为空<br/>';
			}
		}
		if(advertiseBoardPosition[i].value == ""){
			advertiseError += '第'+(i+1)+'行广告位不能为空<br/>';
		}
	}
	if(advertiseError != ""){
		alern(advertiseError);
		return false;
	};
	advertiseBoardFixed.style.display = 'block';
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
	    }else if(item.icon == 4){
			temp.push('<li><input class="item'+item['lev']+' adviertisement_fixed_int" type="checkbox" name="'+item.devicecode+'"/><img src="image/grouping/005.png"/><a data-id="'+item.id+'">'+item.text+'</a></li>');
		}
	}
	var advertiseBoardFixedBodyHomeUl = c('advertise_board_fixed_body_home_ul')[0];
	advertiseBoardFixedBodyHomeUl.innerHTML = "";
	var li = "";
	for(var j = 0; j < temp.length; j++){
		li += (temp[j]);
	}
	advertiseBoardFixedBodyHomeUl.innerHTML = li;
	var advertiseBoardFixedBody = c('advertise_board_fixed_body')[0];
	var advertiseBoardFixedBodyHome = c('advertise_board_fixed_body_home')[0];
	advertiseBoardFixedBody.style.maxHeight = window.innerHeight - 160 + 'px';
	advertiseBoardFixedBodyHome.style.maxHeight = advertiseBoardFixedBody.clientHeight - 80 + 'px';
	console.log(-(advertiseBoardFixedBodyHome.clientHeight/2));
	advertiseBoardFixedBody.style.marginTop = -(advertiseBoardFixedBody.clientHeight/2 -50) + 'px';

};
c('advertise_board_fixed_body_clear')[0].onclick = function(){
	advertiseBoardFixed.style.display = 'none';
};

//保存广告
function submit(){
	var RightFootFootSum = c('user_body_right_foot_foot_sum')[0];					//单个机器保存
	var advertiseBoardFixedBodySubmit = c('advertise_board_fixed_body_submit')[0];	//批量机器保存
	RightFootFootSum.onclick = function(){
		var advertiseBoardType = c('advertise_board_type');				//图片/视频
		var advertiseBoardAddr = c('advertise_board_addr');				//URL地址
		var advertiseBoardTime = c('advertise_board_time');				//播放时长
		var startTime = c('startTime');									//开始时间
		var endTime = c('endTime');										//结束时间
		var advertiseBoardPosition = c('advertise_board_position');		//广告位
		var advertiseArray = [];
		var advertiseError = "";

		for(var i = 0; i < advertiseBoardType.length; i++){
			var advertiseObject = new Object();
			if(advertiseBoardType[i].name == ""){
				advertiseError += '第'+(i+1)+'行类型不能为空<br/>';
			}
			if(advertiseBoardAddr[i].dataset.value == ""){
				advertiseError += '第'+(i+1)+'行资源不能为空<br/>';
			}
			if(startTime[i].value == ""){
				advertiseError += '第'+(i+1)+'行开始时间不能为空<br/>';
			}
			if(endTime[i].value == ""){
				advertiseError += '第'+(i+1)+'行结束时间不能为空<br/>';
			}
			if(advertiseBoardType[i].name == 'image'){
				if(advertiseBoardTime[i].value == ""){
					advertiseError += '第'+(i+1)+'行播放时长不能为空<br/>';
				}else{
					advertiseObject.duration = advertiseBoardTime[i].value;
				}
			}else{
				advertiseObject.duration = "";
			}
			if(advertiseBoardPosition[i].value == ""){
				advertiseError += '第'+(i+1)+'行广告位不能为空<br/>';
			}
			advertiseObject.machCode = ADMACHCODE;
			advertiseObject.picOrvidUrl = advertiseBoardAddr[i].dataset.value;
			advertiseObject.type = advertiseBoardType[i].name;
			advertiseObject.startTime = startTime[i].value;
			advertiseObject.endTime = endTime[i].value;
			advertiseObject.advertPosition = advertiseBoardPosition[i].value;
			advertiseObject.content = advertiseBoardAddr[i].value;
			advertiseArray.push(advertiseObject);
		}
		if(advertiseError != ""){
			alern(advertiseError);
			return false;
		};
		console.log(ADMACHCODE);
		console.log(JSON.stringify(advertiseArray));
		$.ajax({
			type: 'post',
			url: URLS + '/adviertisement/save.json',
			data: {
				machCode: ADMACHCODE,
				adDate: JSON.stringify(advertiseArray)
			},
			success: function(data){
				if(data.code === 10001){
					alern(data.msg);
				}else if(data.code === 10002){
					alern(data.msg);
				}else if(data.code === 10003){
					alern(data.msg);
				}else{
					alern('未知错误！');
				}
			},
			error: function(){
				alern('未知错误！');
			}
		})
	}
	//批量保存
	advertiseBoardFixedBodySubmit.onclick = function(){
		var adviertisementFixedInt = c('adviertisement_fixed_int');		//设备列表
		var advertiseBoardType = c('advertise_board_type');				//图片/视频
		var advertiseBoardAddr = c('advertise_board_addr');				//URL地址
		var advertiseBoardTime = c('advertise_board_time');				//播放时长
		var startTime = c('startTime');									//开始时间
		var endTime = c('endTime');										//结束时间
		var advertiseBoardPosition = c('advertise_board_position');		//广告位
		var advertiseArr = [];		//获取设备编号集合
		for(var i = 0; i < adviertisementFixedInt.length; i++){
			if(adviertisementFixedInt[i].checked){
				advertiseArr.push(adviertisementFixedInt[i].name);
				//for(var j = 0; j < advertiseBoardType.length; j++){
					//var advertiseObject = new Object();
					/*advertiseObject.machCode = adviertisementFixedInt[i].name;
					advertiseObject.picOrvidUrl = advertiseBoardAddr[j].value;
					advertiseObject.type = advertiseBoardType[j].name;
					advertiseObject.duration = advertiseBoardTime[j].value;
					advertiseObject.startTime = startTime[j].value;
					advertiseObject.endTime = endTime[j].value;
					advertiseObject.advertPosition = advertiseBoardPosition[j].value;
					advertiseObject.content = advertiseBoardLabel[j].value;*/
				//}
				//advertiseArray.push(advertiseArr);
			}
		}
		var advertiseArray = [];	//获取广告信息
		for(var j = 0; j < advertiseBoardType.length; j++){
			var advertiseObject = new Object();
			advertiseObject.picOrvidUrl = advertiseBoardAddr[j].dataset.value;
			advertiseObject.type = advertiseBoardType[j].name;
			advertiseObject.duration = advertiseBoardTime[j].value;
			advertiseObject.startTime = startTime[j].value;
			advertiseObject.endTime = endTime[j].value;
			advertiseObject.advertPosition = advertiseBoardPosition[j].value;
			advertiseObject.content = advertiseBoardAddr[j].value;
			advertiseArray.push(advertiseObject);
		}
		loading();
		$.ajax({
			type: 'post',
			url: URLS + '/adviertisement/copy.json',
			data: {
				adverData: JSON.stringify(advertiseArray),
				machCodeData: JSON.stringify(advertiseArr),
			},
			success: function(data){
				if(data.code === 10001){
					loadingClear();
					alern('应用成功');
					advertiseBoardFixed.style.display = 'none';
				}else if(data.code === 10002){
					loadingClear();
					alern('应用失败');
				}else if(data.code === 10003){
					loadingClear();
					alern('数据异常');
				}else{
					alern('未知错误！');
				}
			},
			error: function(){
				alern('未知错误');
			}
		})
	}
}
start();
startbody();	//渲染主体部分数据
submit();