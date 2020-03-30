function start(){
	Authority(loginUserName.empcode);

	var Select = c('item_select');

	//为body部分高度布局
	var obody = c('operator_body')[0];
	obody.style.height = window.innerHeight - 119 + 'px';

	$.ajax({
		type: 'post',
		url: URLX + '/jf/announcement/search.json',
		data: {
			id: '',
			deleted: 0,
			usercode: '',
		},
		success: function(data){
			var bodyLeftListUlLi = c('operator_body_left_ul_li');
			for(var i = bodyLeftListUlLi.length-1;i > -1; i--){
				bodyLeftListUlLi[i].parentNode.removeChild(bodyLeftListUlLi[i]);
			}
			var BodyLeft = c('operator_body_left_ul')[0];
			if(data.objs != undefined){
				for(var i = 0; i < data.objs.length; i++){
					let li = creat('li');
					li.className = 'operator_body_left_ul_li';
					let button = creat('button');
					button.className = 'operator_body_left_list';
					button.innerHTML = '<img src="image/hd.png"/>' + data.objs[i].title;
					button.name = JSON.stringify(data.objs[i]);
					let buttonDelete = creat('button');
					buttonDelete.className = 'operator_body_left_list_delete';
					buttonDelete.innerHTML = '<img src="image/sc.png"/>';
					buttonDelete.name = JSON.stringify(data.objs[i]);
					buttonDelete.onclick = function(){
						if(confirm('删除操作会导致所有用户的消息列表中的该条消息被删除！')){
							let buttonDeleteObj = {};
							buttonDeleteObj.id = JSON.parse(this.name).id;
							$.ajax({
								type: 'post',
								url: URLX + '/jf/announcement/delete.json',
								data: {
									obj: JSON.stringify(buttonDeleteObj),
								},
								success: function(data){
									alern(data.msg);
									start();
									d('body_creat').click();
									noticed();
								}
							})
						}
					};
					li.appendChild(button);
					li.appendChild(buttonDelete);
					BodyLeft.appendChild(li);
				}
			}

			var bodyLeftList = c('operator_body_left_list');
			for(var i = 0; i < bodyLeftList.length; i++){
				(function(q){
					bodyLeftList[q].onclick = function(){
						d('body_submit').style.display = 'none';
						for(var j = 0; j < bodyLeftList.length; j++){
							bodyLeftList[j].style.backgroundColor = "rgba(0,0,0,0)";
						}
						bodyLeftList[q].style.backgroundColor = "#e5e5e5";
						var rightFootItem = c('operator_body_right_foot_item')[0];
						rightFootItem.style.display = "block";
						var operatorId = d('operator_id');
						var operatorName = d('operator_name');
						let normalNotice = d('normal_notice');
						let alertNotice = d('alert_notice');
						operatorId.value = JSON.parse(this.name).title;
						operatorId.disabled = 'disabled';
						operatorName.value = JSON.parse(this.name).content;
						operatorName.disabled = 'disabled';
						if(JSON.parse(this.name).type === 1){
							normalNotice.checked = true;
						}else{
							alertNotice.checked = true;
						}
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
	var operatorId = d('operator_id');		//公告标题
	var operatorName = d('operator_name');	//公告正文
	let noticeType = d('normal_notice');	//公告类型
	bodyCreat.onclick = function(){
		d('body_submit').style.display = '';
		var rightFootItem = c('operator_body_right_foot_item')[0];
		rightFootItem.style.display = "block";
		operatorId.disabled = false;
		operatorId.value = "";
		operatorName.disabled = false;
		operatorName.value = "";
		
		var bodyLeftList = c('operator_body_left_list');
		for(var j = 0; j < bodyLeftList.length; j++){
			bodyLeftList[j].style.backgroundColor = "rgba(0,0,0,0)";
		}
	}
	bodySubmit.onclick = function(){
		if(operatorId.value == ""||operatorName.value == ""){
			alern('公告标题或者公告正文不能为空！');
			return false;
		}
		let noticeObj = {};
		noticeObj.title = operatorId.value;
		noticeObj.content = operatorName.value;
		noticeType.checked?noticeObj.type = 1:noticeObj.type = 2;
		$.ajax({
			type: 'post',
			url: URLX + '/jf/announcement/add.json',
			data: {
				obj: JSON.stringify(noticeObj),
			},
			success: function(data){
				alern(data.msg);
				start();
				bodyCreat.click();
				noticed();
			}
		})
	}
}
start();
submit();