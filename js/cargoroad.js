function start(){
	Authority(loginUserName.empcode);

	var Select = c('item_select');

	//为body部分高度布局
	var obody = c('operator_body')[0];
	obody.style.height = window.innerHeight - 119 + 'px';

	$.ajax({
		type: 'post',
		url: URLX + '/cargoClass/web/list.json',
		data: {},
		success: function(data){
			console.log(data);
			var bodyLeftList = c('operator_body_left_list');
			for(var i = bodyLeftList.length-1;i > -1; i--){
				bodyLeftList[i].parentNode.removeChild(bodyLeftList[i]);
			}
			var BodyLeft = c('operator_body_left')[0];
			if(data.cargos != undefined){
				for(var i = 0; i < data.cargos.length; i++){
					var button = creat('button');
					button.className = 'operator_body_left_list';
					button.innerHTML = '<img src="image/hd.png"/>' + data.cargos[i].goodsCategory;
					button.name = data.cargos[i].categoryId;
					BodyLeft.appendChild(button);
				}
			}

			var bodyLeftList = c('operator_body_left_list');
			for(var i = 0; i < bodyLeftList.length; i++){
				(function(q){
					bodyLeftList[q].onclick = function(){
						for(var j = 0; j < bodyLeftList.length; j++){
							bodyLeftList[j].style.backgroundColor = "rgba(0,0,0,0)";
						}
						bodyLeftList[q].style.backgroundColor = "#e5e5e5";
						var rightFootItem = c('operator_body_right_foot_item')[0];
						rightFootItem.style.display = "block";
						mark = false;
						var operatorId = d('operator_id');
						var operatorName = d('operator_name');
						operatorId.value = this.name;
						operatorId.disabled = 'disabled';
						operatorName.value = this.innerText;
					}
				})(i)
			}
		}
	})
	//DATAHEAD = listMenu();

	var BottomUl = c('operator_body_right_head_bottom_ul')[0];
	BottomUl.innerHTML = "";
	for(var i = 0; i < DATAHEAD.length; i++){
		var li = creat('li');
		li.innerHTML = DATAHEAD[i].text;
		li.setAttribute('data-menuid',DATAHEAD[i].menuid);
		BottomUl.appendChild(li);
	}
	var divClear = creat('div');
	divClear.className = 'clear';
	BottomUl.appendChild(divClear);


	//渲染右边table切换
	var footList = c('operator_body_right_foot_list');
	var ulLi = c('operator_body_right_head_bottom_ul')[0].children;

	for(var i = 0; i < DATAHEAD.length; i++){
		(function(q){
			ulLi[q].onclick = function(){
				for(var j = 0; j < footList.length; j++){
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
				this.style.backgroundColor = '#ffffff';
			}
		})(i)
		if(DATAHEAD[i].value != 1){
			ulLi[i].style.display = 'none';
		}
	}

	var allNone = 0;
	for(var i = 0; i < DATAHEAD.length; i++){
		if(DATAHEAD[i].value == 1){
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
	}
}

//初始化渲染布局
window.onresize = function(){
	var obody = c('operator_body')[0];
	obody.style.height = window.innerHeight - 119 + 'px';
}

function submit(){
	var bodyCreat = d('body_creat');		//创建按钮
	var bodySubmit = d('body_submit');		//保存按钮
	var operatorId = d('operator_id');		//货道编号
	var operatorName = d('operator_name');	//货道名称
	bodyCreat.onclick = function(){
		var rightFootItem = c('operator_body_right_foot_item')[0];
		rightFootItem.style.display = "block";
		operatorId.disabled = false;
		operatorId.value = "";
		operatorName.value = "";
		mark = true;
		
		var bodyLeftList = c('operator_body_left_list');
		for(var j = 0; j < bodyLeftList.length; j++){
			bodyLeftList[j].style.backgroundColor = "rgba(0,0,0,0)";
		}
	}
	bodySubmit.onclick = function(){
		if(operatorId.value == ""||operatorName.value == ""){
			alern('货道编号或者货道名称不能为空！');
			return false;
		}
		console.log(operatorId.value);
		console.log(operatorName.value);
		console.log(mark);
		$.ajax({
			type: 'post',
			url: URLX + '/cargoClass/web/change.json',
			data: {
				cargoId: operatorId.value,
				cargoName: operatorName.value,
				person: loginUserName.name,
				mark: mark,
			},
			success: function(data){
				console.log(data);
				alern(data.msg);
				start();
			}
		})
	}
}

var mark = true;	//创建还是保存的关键字
start();
submit();