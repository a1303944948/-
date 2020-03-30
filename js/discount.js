let selectMachcode = '';
function start(num){
	group();	//获取bom结构
	BOMAll(KIT,loginUserName.scopeofauthority);
	groupitemlevel(4,KITEXTR);
	let discountLeftUl = c('discount_left_ul')[0];
	discountLeftUl.innerHTML = "";
	let li,input,img,a;
	let discountLeftPSpan = c('discount_left_p_span')[0];
	if(num === 1){
		selectMachcode = selectMachcode.substring(0,selectMachcode.length-1);
		selectMachcode = selectMachcode.split(',');
	}
	for(let i = 0; i < KITASSIGN.length; i++){
		li = creat('li');
		input = creat('input');
		input.type = 'checkbox';
		input.className = 'discount_left_ul_li_int';
		input.setAttribute('data-value',KITASSIGN[i].devicecode);
		let discountLeftUlLiInt = c('discount_left_ul_li_int');
		input.onchange = function(){
			let count = 0;
			for(let i = 0; i < discountLeftUlLiInt.length; i++){
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
		for(let j = 0; j < selectMachcode.length; j++){
			if(KITASSIGN[i].devicecode === selectMachcode[j]){
				input.disabled = 'true';
				input.style.cursor = 'not-allowed';
				a.style.color = '#c3c3c3';
				li.title = '该设备已存在折扣！';
				li.style.cursor = 'not-allowed';
			}
		}
	}

	let discountLeftUlLiInt = c('discount_left_ul_li_int');
	c('discount_left_p_int')[0].onchange = function(){
		if(this.checked){
			let discountLeftUlLiIntCount = 0;
			for(let i = 0; i < discountLeftUlLiInt.length; i++){
				if(!discountLeftUlLiInt[i].disabled){
					discountLeftUlLiIntCount++;
					discountLeftUlLiInt[i].checked = true;
				}
			}
			discountLeftPSpan.innerHTML = '已选择' + discountLeftUlLiIntCount + '台';
		}else{
			for(let i = 0; i < discountLeftUlLiInt.length; i++){
				discountLeftUlLiInt[i].checked = false;
			}
			discountLeftPSpan.innerHTML = '请选择设备...';
		};
	}
}

//事件注册
function startBody(){
	d('discount_stop').onchange = function(){
		if(this.checked){
			this.nextSibling.innerHTML = '启用';
			this.nextSibling.style.color = '#f00f00';
			this.nextSibling.style.textDecoration = 'none';
		}else{
			this.nextSibling.innerHTML = '不启用';
			this.nextSibling.style.color = '#999999';
			this.nextSibling.style.textDecoration = 'line-through';
		}
	}
	d('discount_start_hh').addEventListener('input',function(){
		discountHh(this);
	});
	d('discount_start_mm').addEventListener('input',function(){
		discountMm(this);
	});
	d('discount_end_hh').addEventListener('input',function(){
		discountHh(this);
	});
	d('discount_end_mm').addEventListener('input',function(){
		discountMm(this);
	});
	function discountHh(that){
		console.log(that.value);
		that.value>23?that.value=23:that.value=that.value;
		that.value<0?that.value=0:that.value=that.value;
		that.value.length===0?that.value='00':that.value=that.value;
		that.value.length===1?that.value='0'+that.value:that.value=that.value;
		that.value.length>2?that.value=that.value.substr(1):that.value=that.value;
	}
	function discountMm(that){
		that.value>59?that.value=59:that.value=that.value;
		that.value<0?that.value=0:that.value=that.value;
		that.value.length===0?that.value='00':that.value=that.value;
		that.value.length===1?that.value='0'+that.value:that.value=that.value;
		that.value.length>2?that.value=that.value.substr(1):that.value=that.value;
	}
}
startBody();

function startGetList(num){
	let discountRightFootRightBody = c('discount_right_foot_right_body')[0];
	discountRightFootRightBody.innerHTML = "";
	$.ajax({
		type: 'post',
		url: URLS + '/promotion/pageGetPromotion.json',
		data: {
			operator: loginUserName.operatorID + '',
		},
		success: function(data){
			let datas = data.result;
			selectMachcode = '';
			console.log(data);
			for(let i = 0; i < datas.length; i++){
				selectMachcode += datas[i].machCode + ',';
				let divList = creat('div');
				divList.className = 'discount_right_foot_right_body_list';
				divList.setAttribute('data-value',JSON.stringify(datas[i]));
				let diva = creat('div'),divb = creat('div'),divc = creat('div'),divd = creat('div'),dive = creat('div'),divf = creat('div'),divg = creat('div'),divh = creat('div');
				diva.innerHTML = i+1;
				divb.innerHTML = datas[i].promotionName;
				divc.innerHTML = datas[i].discount + '折';
				var HdStartTime = worldDateTime(new Date(datas[i].startTime).getTime());
				var HdEndTime = worldDateTime(new Date(datas[i].endTime).getTime());
				divd.innerHTML = HdStartTime.substring(0,HdStartTime.length-3);
				dive.innerHTML = HdEndTime.substring(0,HdEndTime.length-3);
				let datasI = JSON.stringify(datas[i]);
				divf.innerHTML = datas[i].status === '0'?'<p class="discount_right_foot_right_body_list_p" data-value="off" onclick=\'discountSwitch(this,'+datasI+')\' style="background-color: #f9f9f9;"><b style="left: 1px;">关</b></p>':'<p class="discount_right_foot_right_body_list_p" data-value="on" onclick=\'discountSwitch(this,'+datasI+')\' style="background-color: #1464A8;"><b style="left: 27px;">开</b></p>';
				divg.innerHTML = '<button class="discount_right_foot_right_body_list_edit" data-value=\''+JSON.stringify(datas[i])+'\' onclick="startGetListEdit(this)">修改</button><button class="discount_right_foot_right_body_list_delete" data-value=\''+JSON.stringify(datas[i])+'\' onclick="startGetListDelete(this)">删除</button>';
				divh.innerHTML = '<button onclick="startGetListView(this)" data-value=\''+JSON.stringify(datas[i])+'\'>查看</button>';
				divList.appendChild(diva);
				divList.appendChild(divb);
				divList.appendChild(divc);
				divList.appendChild(divd);
				divList.appendChild(dive);
				divList.appendChild(divf);
				divList.appendChild(divg);
				divList.appendChild(divh);
				discountRightFootRightBody.appendChild(divList);
			}
			start(num);
		}
	})
}
startGetList(1);

let discountSwitchCount = 5;
function discountSwitch(that,json){
	let Timore;
	let status;
	if(isNaN(that.children[0].innerHTML)){
		if(that.dataset.value === 'off'){
			that.setAttribute('data-value','on');
			that.style.backgroundColor = '#1464A8';
			that.children[0].style.left = '27px';
			that.children[0].innerHTML = discountSwitchCount;
			status = '1';
			Timore = setInterval(function(){
				if(parseInt(that.children[0].innerHTML) > 1){
					that.children[0].innerHTML = parseInt(that.children[0].innerHTML)-1;
				}else{
					clearInterval(Timore);
					that.children[0].innerHTML = '开';
				}
			},1000);
		}else{
			that.setAttribute('data-value','off');
			that.style.backgroundColor = '#f9f9f9';
			that.children[0].style.left = '1px';
			that.children[0].innerHTML = discountSwitchCount;
			status = '0';
			Timore = setInterval(function(){
				if(parseInt(that.children[0].innerHTML) > 1){
					that.children[0].innerHTML = parseInt(that.children[0].innerHTML)-1;
				}else{
					clearInterval(Timore);
					that.children[0].innerHTML = '关';
				}
			},1000);
		}
		json.status = status;
		loading('操作中');
		d('discount_right_head_btn').click();
		$.ajax({
			type: 'post',
			url: URLS + '/promotion/startOrStopPromotion.json',
			data: {
				promotionEntity: JSON.stringify(json),
			},
			success: function(data){
				if(status === '1'){
					if(data.result === 10000){
						alern('启用成功');
					}else if(data.result === 10001){
						alern('启用失败');
						startGetList(2);
					}
				}else if(status === '0'){
					if(data.result === 10000){
						alern('停用成功');
					}else if(data.result === 10001){
						alern('停用失败');
						startGetList(2);
					}
				}
				loadingClear();
			},
			error: function(){
				alern('操作失败！');
				loadingClear();
			}
		})
	}
}

let countType = 1;
//列表修改按钮
function startGetListEdit(that){
	if(that.parentNode.previousSibling.children[0].dataset.value === 'off'){
		countType = 2;
		let discountName = d('discount_name');	//促销名称
		let discountNum = d('discount_num');		//折扣力度
		let discountStart = d('discount_start');	//折扣开始时间
		let discountStarthh = d('discount_start_hh');	//折扣开始时间(时)
		let discountStartmm = d('discount_start_mm');	//折扣开始时间(分)
		let discountEnd = d('discount_end');		//折扣结束时间
		let discountEndhh = d('discount_end_hh');		//折扣结束时间(时)
		let discountEndmm = d('discount_end_mm');		//折扣结束时间(分)
		let discountStop = d('discount_stop');	//停用/启用状态
		var thatDatasetValue = JSON.parse(that.dataset.value);
		discountName.value = thatDatasetValue.promotionName;
		discountName.setAttribute('data-id',thatDatasetValue.id);
		discountNum.value = thatDatasetValue.discount;
		thatDatasetValue.startTime = worldDateTime(new Date(thatDatasetValue.startTime).getTime());
		thatDatasetValue.endTime = worldDateTime(new Date(thatDatasetValue.endTime).getTime());
		discountStart.value = thatDatasetValue.startTime.split(' ')[0];
		discountStarthh.value = thatDatasetValue.startTime.split(' ')[1].split(':')[0];
		discountStartmm.value = thatDatasetValue.startTime.split(' ')[1].split(':')[1];
		discountEnd.value = thatDatasetValue.endTime.split(' ')[0];
		discountEndhh.value = thatDatasetValue.endTime.split(' ')[1].split(':')[0];
		discountEndmm.value = thatDatasetValue.endTime.split(' ')[1].split(':')[1];
		if(thatDatasetValue.status === '1'){
			discountStop.checked = true;
		}else{
			discountStop.checked = false;
		}
		discountStop.parentNode.parentNode.style.opacity = '0';

		let thatMachCode = thatDatasetValue.machCode.split(',');
		let discountLeftUlLiInt = c('discount_left_ul_li_int');	//设备编号
		for(let i = 0; i < discountLeftUlLiInt.length; i++){
			discountLeftUlLiInt[i].checked = false;
		}
		start(2);
		for(let i = 0; i < discountLeftUlLiInt.length; i++){
			for(let j = 0; j < thatMachCode.length; j++){
				if(discountLeftUlLiInt[i].dataset.value === thatMachCode[j]){
					discountLeftUlLiInt[i].checked = true;
					discountLeftUlLiInt[i].disabled = false;
					discountLeftUlLiInt[i].style.cursor = 'pointer';
					discountLeftUlLiInt[i].nextSibling.nextSibling.style.color = '#303030';
					discountLeftUlLiInt[i].parentNode.title = '';
					discountLeftUlLiInt[i].parentNode.style.cursor = 'pointer';
				}
			}
		}

		let discountLeftPSpan = c('discount_left_p_span')[0];
		let count = 0;
		let counts = 0;
		for(let i = 0; i < discountLeftUlLiInt.length; i++){
			if(discountLeftUlLiInt[i].checked){
				count++;
			};
			if(!discountLeftUlLiInt[i].disabled){
				counts++;
			}
		}
		count === 0?discountLeftPSpan.innerHTML = '请选择设备...':discountLeftPSpan.innerHTML = '已选择' + count + '台';
		console.log(count,counts);
		if(count !== counts){
			c('discount_left_p_int')[0].checked = false;
		}else{
			c('discount_left_p_int')[0].checked = true;
		}
		discountLeftPSpan.innerHTML = '已选择' + count + '台';
	}else{
		alern('必须先停用当前折扣才能修改配置信息！');
	}
}

//列表删除按钮
function startGetListDelete(that){
	if(that.parentNode.previousSibling.children[0].dataset.value === 'off'){
		if(confirm('确认要删除当前折扣活动吗？')){
			loading('删除中');
			$.ajax({
				type: 'post',
				url: URLS + '/promotion/deletePromotion.json',
				data: {
					promotionEntity: that.dataset.value,
				},
				success: function(data){
					if(data.result === 10000){
						alern('删除成功！');
						startGetList(1);
						d('discount_right_head_btn').click();
					}else if(data.result === 10001){
						alern('删除失败！');
						//startGetList(1);
						//d('discount_right_head_btn').click();
					}else{
						alern('发生未知错误！');
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
	}else{
		alern('必须先停用当前折扣活动才能删除此记录！');
	}
}

//列表查看按钮
function startGetListView(that){
	let thatData = JSON.parse(that.dataset.value);
	let machCodeList = thatData.machCode;
	machCodeList = machCodeList.split(',');
	let machCodeListAlern = '',machCodeListAlernCount = 0;;
	machCodeListAlern = '<p style="font-size: 14px; margin-bottom: 10px;">此折扣应用设备如下(共<span class="alern_span" style="color: #F05555; padding-left: 2px; padding-right: 2px;"></span>台)：</p>'
	machCodeListAlern += '<ul>';
	for(let i = 0; i < KITASSIGN.length; i++){
		for(let j = 0; j < machCodeList.length; j++){
			if(KITASSIGN[i].devicecode === machCodeList[j]){
				machCodeListAlernCount ++;
				machCodeListAlern += '<li class="item1" style="margin-bottom: 5px; font-size: 14px;"><img style="position: relative; top: 3px; margin-right: 2px;" src="image/grouping/005.png" />' + KITASSIGN[i].text + '</li>';
			}
		}
	}
	machCodeListAlern += '</ul>';
	alern(machCodeListAlern,thatData.promotionName);
	c('alern_span')[0].innerHTML = machCodeListAlernCount;
}

function startSubmit(){
	d('discount_right_head_btn').onclick = function(){
		countType = 1;
		d('discount_name').value = "";	//促销名称
		d('discount_name').setAttribute('data-id','');	//ID
		d('discount_num').value = "";		//折扣力度
		d('discount_start').value = "";	//折扣开始时间
		d('discount_start_hh').value = "00";	//折扣开始时间
		d('discount_start_mm').value = "00";	//折扣开始时间
		d('discount_end').value = "";		//折扣结束时间
		d('discount_end_hh').value = "00";		//折扣结束时间
		d('discount_end_mm').value = "00";		//折扣结束时间
		d('discount_stop').checked = false;
		d('discount_stop').parentNode.parentNode.style.opacity = '1';
		d('discount_stop').nextSibling.innerHTML = '不启用';
		d('discount_stop').nextSibling.style.color = '#999999';
		d('discount_stop').nextSibling.style.textDecoration = 'line-through';
		c('discount_left_p_span')[0].innerHTML = '请选择...';
		c('discount_left_p_int')[0].checked = false;
		let discountLeftUlLiInt = c('discount_left_ul_li_int');	//设备编号
		for(let i = 0; i < discountLeftUlLiInt.length; i++){
			discountLeftUlLiInt[i].checked = false;
		}
		start(2);
	};

	d('discount_right_body_submit').onclick = function(){
		let discountName = d('discount_name').value;	//促销名称
		let discountNum = d('discount_num').value;		//折扣力度
		let discountStart = d('discount_start').value;	//折扣开始时间
		let discountStarthh = d('discount_start_hh').value;	//折扣开始时间
		let discountStartmm = d('discount_start_mm').value;	//折扣开始时间
		let discountEnd = d('discount_end').value;		//折扣结束时间
		let discountEndhh = d('discount_end_hh').value;		//折扣结束时间
		let discountEndmm = d('discount_end_mm').value;		//折扣结束时间
		let discountStop = d('discount_stop').checked;	//停用/启用状态
		discountStop?discountStop = '1':discountStop = '0';
		let operatorID = loginUserName.operatorID;		//运营方ID
		let discountLeftUlLiInt = c('discount_left_ul_li_int');	//设备编号
		let discountLeftUlLiIntString = '';					//最终被提交的设备编号字符串	
		for(let i = 0; i < discountLeftUlLiInt.length; i++){
			if(discountLeftUlLiInt[i].checked){
				discountLeftUlLiIntString += discountLeftUlLiInt[i].dataset.value + ',';
			}
		}
		discountLeftUlLiIntString = discountLeftUlLiIntString.substring(0,discountLeftUlLiIntString.length-1)

		let discountObject = {};
		let disconntError = "";

		if(countType === 1){
			discountObject.promotionName = discountName;
			discountObject.discount  = discountNum;
			discountObject.startTime = discountStart + ' ' + discountStarthh + ':' + discountStartmm;
			discountObject.endTime = discountEnd + ' ' + discountEndhh + ':' + discountEndmm;
			discountObject.status = discountStop;
			discountObject.machCode = discountLeftUlLiIntString;
			discountObject.operator = operatorID;
			if(discountName === ""){
				disconntError += '促销名称不能为空！<br/>';
			}
			if(discountNum === ""){
				disconntError += '折扣力度不能为空！<br/>';
			}
			if(discountStart === ""){
				disconntError += '开始时间(日期)不能为空！<br/>';
			}
			if(discountStarthh === ""){
				disconntError += '开始时间(时)不能为空！<br/>';
			}
			if(discountStartmm === ""){
				disconntError += '开始时间(分)不能为空！<br/>';
			}
			if(discountEnd === ""){
				disconntError += '结束时间(日期)不能为空！<br/>';
			}
			if(discountEndhh === ""){
				disconntError += '结束时间(时)不能为空！<br/>';
			}
			if(discountEndmm === ""){
				disconntError += '结束时间(分)不能为空！<br/>';
			}
			if(discountLeftUlLiIntString === ""){
				disconntError += '至少选择一台设备！';
			}
			if(disconntError){
				alern(disconntError);
				return false;
			}
			var date = new Date();
			discountObject.startTime = worldDates(new Date(discountObject.startTime).getTime());
			discountObject.endTime = worldDates(new Date(discountObject.endTime).getTime());
			loading('保存中');
			$.ajax({
				type: 'post',
				url: URLS + '/promotion/savePromotion.json',
				data: {
					promotionEntity: JSON.stringify(discountObject),
				},
				success: function(data){
					if(data.result === 10000){
						alern('保存成功！');
						startGetList(1);
						d('discount_right_head_btn').click();
					}else if(data.result === 10001){
						alern('保存失败！');
						//startGetList(1);
						//d('discount_right_head_btn').click();
					}else{
						alern('发生未知错误！');
						//startGetList(1);
						//d('discount_right_head_btn').click();
					};
					loadingClear();
				},
				error: function(){
					alern('保存失败！');
					loadingClear();
				}
			})
		}else if(countType === 2){
			discountObject.promotionName = discountName;
			discountObject.discount  = discountNum;
			discountObject.startTime = discountStart + ' ' + discountStarthh + ':' + discountStartmm;
			discountObject.endTime = discountEnd + ' ' + discountEndhh + ':' + discountEndmm;
			discountObject.status = '0';
			discountObject.machCode = discountLeftUlLiIntString;
			discountObject.operator = operatorID;
			discountObject.id = d('discount_name').dataset.id;
			if(discountName === ""){
				disconntError += '促销名称不能为空！<br/>';
			}
			if(discountNum === ""){
				disconntError += '折扣力度不能为空！<br/>';
			}
			if(discountStart === ""){
				disconntError += '开始时间不能为空！<br/>';
			}
			if(discountStarthh === ""){
				disconntError += '开始时间(时)不能为空！<br/>';
			}
			if(discountStartmm === ""){
				disconntError += '开始时间(分)不能为空！<br/>';
			}
			if(discountEnd === ""){
				disconntError += '结束时间不能为空！<br/>';
			}
			if(discountEndhh === ""){
				disconntError += '结束时间(时)不能为空！<br/>';
			}
			if(discountEndmm === ""){
				disconntError += '结束时间(分)不能为空！<br/>';
			}
			if(new Date(discountObject.startTime).getTime() >= new Date(discountObject.endTime).getTime()){
				disconntError += '结束时间不能大于或等于开始时间！<br/>';
			}
			if(discountLeftUlLiIntString === ""){
				disconntError += '至少选择一台设备！';
			}
			if(disconntError){
				alern(disconntError);
				return false;
			}
			loading('保存中');
			$.ajax({
				type: 'post',
				url: URLS + '/promotion/updatePromotion.json',
				data: {
					promotionEntity: JSON.stringify(discountObject),
				},
				success: function(data){
					if(data.result === 10000){
						alern('保存成功！');
						startGetList(1);
						d('discount_right_head_btn').click();
					}else if(data.result === 10001){
						alern('保存失败！');
						//startGetList(1);
						//d('discount_right_head_btn').click();
					}else{
						alern('发生未知错误！');
						//startGetList(1);
						//d('discount_right_head_btn').click();
					};
					loadingClear();
				},
				error: function(){
					alern('保存失败！');
					loadingClear();
				}
			})
		}
	}
}
startSubmit();