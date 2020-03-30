var selectMachcode = '';
function start(num){
	group();	//获取bom结构
	BOMAll(KIT,loginUserName.scopeofauthority);
	groupitemlevel(4,KITEXTR);
	var discountLeftUl = c('discount_left_ul')[0];
	discountLeftUl.innerHTML = "";
	var li,input,img,a;
	var discountLeftPSpan = c('discount_left_p_span')[0];
	if(num === 1){
		selectMachcode = selectMachcode.substring(0,selectMachcode.length-1);
		selectMachcode = selectMachcode.split(',');
	}
	for(var i = 0; i < KITASSIGN.length; i++){
		li = creat('li');
		input = creat('input');
		input.type = 'checkbox';
		input.className = 'discount_left_ul_li_int';
		input.setAttribute('data-value',KITASSIGN[i].devicecode);
		var discountLeftUlLiInt = c('discount_left_ul_li_int');
		input.onchange = function(){
			var count = 0;
			for(var i = 0; i < discountLeftUlLiInt.length; i++){
				if(discountLeftUlLiInt[i].checked){
					count++;
				};
			}
			count === 0?discountLeftPSpan.innerHTML = '请选择设备...':discountLeftPSpan.innerHTML = '已选择' + count + '台';
			if(count !== discountLeftUlLiInt.length){
				c('discount_left_p_int')[0].checked = false;
			}else{
				c('discount_left_p_int')[0].checked = true;
			}
		}
		img = creat ('img');
		img.src = 'image/grouping/005.png';
		a = creat('a');
		a.innerHTML = KITASSIGN[i].text;
		li.appendChild(input);
		li.appendChild(img);
		li.appendChild(a);
		discountLeftUl.appendChild(li);

		//初始化时禁用已被操作过的设备
		for(var j = 0; j < selectMachcode.length; j++){
			if(KITASSIGN[i].devicecode === selectMachcode[j]){
				input.disabled = 'true';
				input.style.cursor = 'not-allowed';
				a.style.color = '#c3c3c3';
				li.title = '该设备已存在折扣！';
				li.style.cursor = 'not-allowed';
			}
		}
	}

	var discountLeftUlLiInt = c('discount_left_ul_li_int');
	c('discount_left_p_int')[0].onchange = function(){
		if(this.checked){
			var discountLeftUlLiIntCount = 0;
			for(var i = 0; i < discountLeftUlLiInt.length; i++){
				if(!discountLeftUlLiInt[i].disabled){
					discountLeftUlLiIntCount++;
					discountLeftUlLiInt[i].checked = true;
				}
			}
			discountLeftPSpan.innerHTML = '已选择' + discountLeftUlLiIntCount + '台';
		}else{
			for(var i = 0; i < discountLeftUlLiInt.length; i++){
				discountLeftUlLiInt[i].checked = false;
			}
			discountLeftPSpan.innerHTML = '请选择设备...';
		};
	}
}

function startGetList(num){
	var discountRightFootRightBody = c('discount_right_foot_right_body')[0];
	discountRightFootRightBody.innerHTML = "";
	$.ajax({
		type: 'post',
		url: URLS + '/jf/com/free/show.json',
		data: {
			code: '',
		},
		success: function(data){
			selectMachcode = '';
			if(data.code == 10001){
				var datas = data.data;
				for(var i = 0; i < datas.length; i++){
					selectMachcode += datas[i].machCode + ',';
					var divList = creat('div');
					divList.className = 'discount_right_foot_right_body_list';
					divList.setAttribute('data-value',JSON.stringify(datas[i]));
					var diva = creat('div'),divb = creat('div'),divc = creat('div'),divd = creat('div'),dive = creat('div'),divf = creat('div'),divg = creat('div'),divh = creat('div');
					diva.innerHTML = i+1;
					divb.innerHTML = datas[i].name;
					divc.innerHTML = datas[i].code;
					divd.innerHTML = datas[i].amount;
					dive.innerHTML = datas[i].tel;
					var datasI = JSON.stringify(datas[i]);
					divf.innerHTML = '<button class="discount_right_foot_right_body_list_edit" data-value=\''+JSON.stringify(datas[i])+'\' onclick="startGetListEdit(this)">修改</button><button class="discount_right_foot_right_body_list_delete" data-value=\''+JSON.stringify(datas[i])+'\' onclick="startGetListDelete(this)">删除</button>';
					divg.innerHTML = '<button onclick="startGetListView(this)" data-value=\''+JSON.stringify(datas[i])+'\'>查看</button>';
					divList.appendChild(diva);
					divList.appendChild(divb);
					divList.appendChild(divc);
					divList.appendChild(divd);
					divList.appendChild(dive);
					divList.appendChild(divf);
					divList.appendChild(divg);
					discountRightFootRightBody.appendChild(divList);
				}
			}else{
				var divList = creat('div');
				divList.className = 'discount_right_foot_right_body_list';
				divList.innerHTML = data.msg;
				divList.style.textAlign = 'center';
				divList.style.lineHeight = '40px';
				divList.style.color = '#a4a4a4';
				discountRightFootRightBody.appendChild(divList);
			}
			start(num);
			startSubmit();
		}
	})
}
startGetList(1);


//列表修改按钮
function startGetListEdit(that) {
	var discountName = d('discount_name');		//会员名称
	var discountId = d('discount_id');		//会员ID
	var discountPhone = d('discount_phone');	//联系电话
	var discountMoney = d('discount_money');		//余额
	var thatDatasetValue = JSON.parse(that.dataset.value);
	discountName.value = thatDatasetValue.name;
	discountId.value = thatDatasetValue.code;
	discountPhone.value = thatDatasetValue.tel;
	discountMoney.value = thatDatasetValue.amount;

	var thatMachCodeArr = thatDatasetValue.dBos;
	var thatMachCode = [];
	for(var i = 0; i < thatMachCodeArr.length; i++){
		thatMachCode.push(thatMachCodeArr[i].devicecode);
	}
	var discountLeftUlLiInt = c('discount_left_ul_li_int');	//设备编号
	for (var i = 0; i < discountLeftUlLiInt.length; i++) {
		discountLeftUlLiInt[i].checked = false;
	}
	start(2);
	for (var i = 0; i < discountLeftUlLiInt.length; i++) {
		for (var j = 0; j < thatMachCode.length; j++) {
			if (discountLeftUlLiInt[i].dataset.value === thatMachCode[j]) {
				discountLeftUlLiInt[i].checked = true;
				discountLeftUlLiInt[i].disabled = false;
				discountLeftUlLiInt[i].style.cursor = 'pointer';
				discountLeftUlLiInt[i].nextSibling.nextSibling.style.color = '#303030';
				discountLeftUlLiInt[i].parentNode.title = '';
				discountLeftUlLiInt[i].parentNode.style.cursor = 'pointer';
			}
		}
	}

	var discountLeftPSpan = c('discount_left_p_span')[0];
	var count = 0;
	var counts = 0;	
	for (var i = 0; i < discountLeftUlLiInt.length; i++) {
		if (discountLeftUlLiInt[i].checked) {
			count++;
		}
		;
		if (!discountLeftUlLiInt[i].disabled) {
			counts++;
		}
	}
	count === 0 ? discountLeftPSpan.innerHTML = '请选择设备...' : discountLeftPSpan.innerHTML = '已选择' + count + '台';
	if (count !== counts) {
		c('discount_left_p_int')[0].checked = false;
	} else {
		c('discount_left_p_int')[0].checked = true;
	}
	discountLeftPSpan.innerHTML = '已选择' + count + '台';
}

//列表删除按钮
function startGetListDelete(that){
	if(confirm('确认要删除当前会员吗？')){
		loading('删除中');
		$.ajax({
			type: 'post',
			url: URLS + '/jf/com/free/delete.json',
			data: {
				code: JSON.parse(that.dataset.value).code,
			},
			success: function(data){
				if(data.code === 10001){
					alern(data.msg);
					startGetList(1);
					d('discount_right_head_btn').click();
					//startGetList(1);
					//d('discount_right_head_btn').click();
				}else{
					alern(data.msg);
					startGetList(1);
					d('discount_right_head_btn').click();
					//startGetList(1);
					//d('discount_right_head_btn').click();
				};
				c('discount_left_p_int')[0].checked = false;
				loadingClear();
			},
			error: function(){
				alern('删除失败！');
				loadingClear();
			}
		})
	}
}

//列表查看按钮
function startGetListView(that){
	var thatData = JSON.parse(that.dataset.value);
	var machCodeListArr = thatData.dBos;
	var machCodeList = [];
	for(var i = 0; i < machCodeListArr.length; i++){
		machCodeList.push(machCodeListArr[i].devicecode);
	}
	var machCodeListAlern = '',machCodeListAlernCount = 0;;
	machCodeListAlern = '<p style="font-size: 14px; margin-bottom: 10px;">此会员应用设备如下(共<span class="alern_span" style="color: #F05555; padding-left: 2px; padding-right: 2px;"></span>台)：</p>'
	machCodeListAlern += '<ul>';
	for(var i = 0; i < KITASSIGN.length; i++){
		for(var j = 0; j < machCodeList.length; j++){
			if(KITASSIGN[i].devicecode === machCodeList[j]){
				machCodeListAlernCount ++;
				machCodeListAlern += '<li class="item1" style="margin-bottom: 5px; font-size: 14px;"><img style="position: relative; top: 3px; margin-right: 2px;" src="image/grouping/005.png" />' + KITASSIGN[i].text + '</li>';
			}
		}
	}
	machCodeListAlern += '</ul>';
	alern(machCodeListAlern,thatData.name);
	c('alern_span')[0].innerHTML = machCodeListAlernCount;
}

function startSubmit(){
	d('discount_right_head_btn').onclick = function(){
		d('discount_name').value = "";	//会员名称
		d('discount_id').value = "";	//会员ID
		d('discount_phone').value = "";	//联系电话
		d('discount_money').value = "";	//余额
		c('discount_left_p_span')[0].innerHTML = '请选择设备...';
		c('discount_left_p_int')[0].checked = false;
		var discountLeftUlLiInt = c('discount_left_ul_li_int');	//设备编号
		for(var i = 0; i < discountLeftUlLiInt.length; i++){
			discountLeftUlLiInt[i].checked = false;
		}
		start(2);
	};

	d('discount_right_body_submit').onclick = function(){
		var discountName = d('discount_name').value;	//会员名称
		var discountId = d('discount_id').value;		//会员ID
		var discountPhone = d('discount_phone').value;	//联系电话
		var discountMoney = d('discount_money').value;	//余额
		var discountLeftUlLiInt = c('discount_left_ul_li_int');	//设备编号
		var discountLeftUlLiIntString = '';					//最终被提交的设备编号字符串	
		for(var i = 0; i < discountLeftUlLiInt.length; i++){
			if(discountLeftUlLiInt[i].checked){
				discountLeftUlLiIntString += discountLeftUlLiInt[i].dataset.value + ',';
			}
		}
		discountLeftUlLiIntString = discountLeftUlLiIntString.substring(0,discountLeftUlLiIntString.length-1)

		var discountObject = {};
		var disconntError = "";

		discountObject.name = discountName;
		discountObject.code  = discountId;
		discountObject.tel = discountPhone;
		discountObject.amount = discountMoney;
		discountObject.dBos = [];
		if(discountName === ""){
			disconntError += '会员名称不能为空！<br/>';
		}
		if(discountId === ""){
			disconntError += '会员ID不能为空！<br/>';
		}
		if(discountMoney === ""){
			disconntError += '余额不能为空！<br/>';
		}
		if(discountLeftUlLiIntString){
			var discountLeftUlLiIntStringArr = discountLeftUlLiIntString.split(',');
			for(var i = 0; i < discountLeftUlLiIntStringArr.length; i++){
				var discountLeftUlLiIntStringObj = {};
				discountLeftUlLiIntStringObj.devicecode = discountLeftUlLiIntStringArr[i];
				discountLeftUlLiIntStringObj.vipcode = discountId;
				discountObject.dBos.push(discountLeftUlLiIntStringObj)
			}
		}
		if(disconntError){
			alern(disconntError);
			return false;
		}
		loading('保存中');
		$.ajax({
			type: 'post',
			url: URLS + '/jf/com/free/addfree.json',
			data: {
				obj : JSON.stringify(discountObject),
			},
			success: function(data){
				if(data.code === 10001){
					alern(data.msg);
					startGetList(1);
					d('discount_right_head_btn').click();
				}else{
					alern(data.msg);
					startGetList(1);
					d('discount_right_head_btn').click();
				}
				loadingClear();
			},
			error: function(){
				alern('保存失败！');
				loadingClear();
			}
		})
	}
}
startSubmit();