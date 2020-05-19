function start(){
	Authority(loginUserName.empcode);

	var Head = c('operator_head')[0];
	var Select = c('item_select');
	var headUl = c('headUl');
	for(var i = headUl.length-1; i > -1; i--){
		headUl[i].parentNode.removeChild(headUl[i]);
	}
	//渲染状态下拉框
	for(var i = 0; i < Select.length; i++){
		var ul = creat('ul');
		ul.className = 'headUl';
		ul.setAttribute("data-list", i);
		for(var j = 0; j < DATA[i].length; j++){
			var li = creat('li');
			li.innerHTML = DATA[i][j].text;
			li.setAttribute("data-value", DATA[i][j].value);
			ul.appendChild(li);
		}
		Head.appendChild(ul);

		(function(q){
			Select[q].onmousedown = function(){
				headUl[q].style.display = 'block';
				headUl[q].style.width = Select[q].clientWidth + 'px';
				headUl[q].style.left = Select[q].offsetParent.offsetLeft + 5 + 'px';
				headUl[q].style.top = Select[q].offsetParent.offsetTop + 4 + Select[q].clientHeight + 'px';
			}
		})(i)
	}

	for(var i = 0; i < headUl.length; i++){
		(function(q){
			Select[q].onfocus = function(){
				headUl[q].style.display = 'inline-block';
			}
			Select[q].onblur = function(){
				headUl[q].style.display = 'none';
			}
		})(i)
		for(var j = 0; j < headUl[i].children.length; j++){
			Select[i].value = headUl[i].children[0].innerHTML;
			Select[i].name = headUl[i].children[0].dataset.value;
			headUl[i].children[j].onmousedown = function(){
				Select[this.parentNode.dataset.list].value = this.innerHTML;
				Select[this.parentNode.dataset.list].name = this.dataset.value;
			}
		}
	}

	//为body部分高度布局
	var obody = c('operator_body')[0];
	obody.style.height = window.innerHeight - Head.clientHeight - 119 + 'px';

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
						footList[j].style.display = 'block';
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
		/*if(DATAHEAD[i].value != 1){
			ulLi[i].style.display = 'none';
		}*/
	}

	var allNone = 0;
	for(var i = 0; i < DATAHEAD.length; i++){
		if(DATAHEAD[i].value == 1){
			for(var j = 0; j < footList.length; j++){
				if(DATAHEAD[i].menuid == footList[j].dataset.menuid){
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
	}*/
	//监听复选框事件
	let wechatPayOn = new OnChange('elem_enable');
	// let alipayPayOn = new OnChange('alipay_pay');
	// let silverPayOn = new OnChange('silver_pay');
	d('elem_enable').onchange = function(){
		if(this.checked){
			wechatPayOn.yes('wechat_pay');
		}else{
			wechatPayOn.no('wechat_pay');
		}
	};
	// d('alipay_pay').onchange = function(){
	// 	if(this.checked){
	// 		alipayPayOn.yes('alipay_pay');
	// 	}else{
	// 		alipayPayOn.no('alipay_pay');
	// 	}
	// };
	// d('silver_pay').onchange = function(){
	// 	if(this.checked){
	// 		silverPayOn.yes('silver_pay');
	// 	}else{
	// 		silverPayOn.no('silver_pay');
	// 	}
	// };
}
function OnChange(String){
	this.yes = function(value){
		for(let i = 0; i < c(value).length; i++){
			c(value)[i].style.display = 'inline';
		}
	};
	this.no = function(value){
		for(let i = 0; i < c(value).length; i++){
			c(value)[i].style.display = 'none';
		}
	};
	if(d(String).checked){
		this.yes(String);
	}else{
		this.no(String);
	}
}

function startbody(l){
	//body左边部分渲染
	DATALEFT = groupitem(1);
	var datalefts = [];
	for(var i = 0; i < DATALEFT.length; i++){
		if(DATALEFT[i].stop == l){
			datalefts.push(DATALEFT[i]);
		}
	}
	var bodyLeftList = c('operator_body_left_list');
	for(var i = bodyLeftList.length-1;i > -1; i--){
		bodyLeftList[i].parentNode.removeChild(bodyLeftList[i]);
	}
	var obodyLeft = c('operator_body_left')[0];
	obodyLeft.innerHTML = "";
	for(var i = 0; i < datalefts.length; i++){
		var divList = creat('button');
		divList.className = 'operator_body_left_list';
		divList.innerHTML = '<img src="image/yyf.png" />' + datalefts[i].text;
		divList.name = datalefts[i].operatorID;
		obodyLeft.appendChild(divList);
	}
	var BodyLeftList = c('operator_body_left_list');
	//点击渲染右边数据
	for(var i = 0; i < BodyLeftList.length; i++){
		(function(q){
			BodyLeftList[q].onclick = function(){
				for(var j = 0; j < BodyLeftList.length; j++){
					BodyLeftList[j].style.backgroundColor = "rgba(0,0,0,0)";
				}
				BodyLeftList[q].style.backgroundColor = "#e5e5e5";
				var thatName = this.name;
				var orightFootItem = c('operator_body_right_foot_item');
				for(var j = 0; j < orightFootItem.length; j++){
					orightFootItem[j].style.display = 'block';
				}
				//详细信息内容渲染
 				ajax({
					type: 'get',
					url: URLS + '/store/'+ thatName +'/search',
					dataType: 'json',
					success: function(data){
						log(data);
						//详细信息渲染
						var detailedOperatorId = d('detailed_operator_id');							//店铺ID
						var detailedOperatorCompanyname = d('detailed_operator_name');				//店铺名称
						var detailedOperatorCompanyaddress = d('detailed_operator_address');		//店铺地址
						var detailedOperatorPrincipal = d('detailed_operator_principal');			//店铺负责人
						var detailedOperatorPhone = d('detailed_operator_phone');					//联系手机
						var detailedOperatorStop = d('detailed_operator_stop');						//是否停用
						detailedOperatorId.value = data.resultObject.id;
						detailedOperatorId.disabled = "disabled";
						detailedOperatorCompanyname.value = data.resultObject.storeName;
						detailedOperatorCompanyaddress.value = data.resultObject.storeAddress;
						detailedOperatorPrincipal.value = data.resultObject.storePrincipal;
						detailedOperatorPhone.value = data.resultObject.storeTel;
						data.resultObject.storedeleted == 0?detailedOperatorStop.checked = "checked":detailedOperatorStop.checked = false;
						count = 1;

						//平台关联饿了么信息渲染
						var elemEnable = d('elem_enable');						//停用启用
						var elemStoreId = d('elem_store_id');					//平台ID
						var elemStoreKey = d('elem_store_key');					//应用Key
						var elemStoreSecret = d('elem_store_secret');			//应用Secret
						// var elemStoreRedirecturl = d('elem_store_redirecturl');	//回调URL
						// var elemStoreUrl = d('elem_store_url');					//店铺URL
						// var elemStoreUser = d('elem_store_user');				//店铺账号
						// var elemStorePass = d('elem_store_pass');				//店铺密码
						// var elemStorePushUrl = d('elem_store_pushUrl');			//推送地址
						if(data.resultObject.elmPlatform){
							elemStoreId.name = data.resultObject.id;
							elemStoreId.value = data.resultObject.elmPlatform.storeId;
							data.resultObject.elmPlatform.platformdeleted == 1?elemEnable.checked = "checked":elemEnable.checked = false;
							elemStoreKey.value = data.resultObject.elmPlatform.storeAppKey;
							elemStoreSecret.value = data.resultObject.elmPlatform.storeAppSecret;
							// elemStoreRedirecturl.value = data.resultObject.elmPlatform.redirectUrl;
							// elemStoreUrl.value = data.resultObject.elmPlatform.storeUrl;
							// elemStoreUser.value = data.resultObject.elmPlatform.storeAccountNumber;
							// elemStorePass.value = data.resultObject.elmPlatform.storePass;
							// elemStorePushUrl.value = data.resultObject.elmPlatform.pushUrl;
						}else{
							elemStoreId.name = data.resultObject.id;
							elemStoreId.value = '';
							elemEnable.checked = false;
							elemStoreKey.value = '';
							elemStoreSecret.value = '';
							// elemStoreRedirecturl.value = '';
							// elemStoreUrl.value = '';
							// elemStoreUser.value = '';
							// elemStorePass.value = '';
							// elemStorePushUrl.value = '';
						}
					}
				})
				/*//开票资料内容渲染
				$.ajax({
					type: 'post',
					url: URLS + '/invoice/getInvoice.json',
					data: {
						operatorID: thatName,
					},
					success: function(data){
						if(data.code == 10001){
							d('operator_name').value = data.data.company;				//公司名称
							d('operator_number').value = data.data.taxRegistrationNum;	//税务登记号
							d('operator_addr').value = data.data.location;				//公司地址
							d('operator_phone').value = data.data.phone;				//联系电话
							d('operator_bank').value = data.data.bank;					//开户银行
							d('operator_account').value = data.data.bankAccount;		//银行账号
						}else{
							d('operator_name').value = "";		//公司名称
							d('operator_number').value = "";	//税务登记号
							d('operator_addr').value = "";		//公司地址
							d('operator_phone').value = "";		//联系电话
							d('operator_bank').value = "";		//开户银行
							d('operator_account').value = "";	//银行账号
						}
					}
				})*/
			}
		})(i)
	}
}

//初始化渲染布局
window.onresize = function(){
	var Head = c('operator_head')[0];
	var obody = c('operator_body')[0];
	obody.style.height = window.innerHeight - Head.clientHeight - 119 + 'px';
	c('advertise_board_fixed_body')[0].style.marginTop = -(c('advertise_board_fixed_body')[0].clientHeight / 2) + 50 + 'px';
};

//搜索按钮
c('operator_home_head_submit')[0].onclick = function(){
	if(d('operator_status').name == 1){
		startbody(1);
	}else{
		startbody(0);
	}
};

c('advertise_board_fixed_body_clear')[0].onclick = function(){
	c('advertise_board_fixed')[0].style.display = 'none';
};

var count = 0;
function submit(){
	var bodyCreat = d('body_creat');
	//创建
	var bodySubmit = d('body_submit');
	bodyCreat.onclick = function(){
		var orightFootItem = c('operator_body_right_foot_item');
		for(var i = 0; i < orightFootItem.length; i++){
			orightFootItem[i].style.display = 'block';
		}

		//清空详细信息
		d('detailed_operator_id').value = "";						//运营方ID
		d('detailed_operator_name').value = "";						//公司名称
		d('detailed_operator_address').value = "";					//公司地址
		d('detailed_operator_principal').value = "";				//运营方负责人
		d('detailed_operator_phone').value = "";					//联系手机
		d('detailed_operator_stop').checked = false;				//是否停用

		//饿了么信息清空
		d('elem_enable').checked = false;								//停用启用
		d('elem_store_id').name = '';										//店铺ID
		d('elem_store_id').value = '';										//平台ID
		d('elem_store_key').value = '';					//应用Key
		d('elem_store_secret').value = '';			//应用Secret
		// d('elem_store_redirecturl').value = '';	//回调URL
		// d('elem_store_url').value = '';					//店铺URL
		// d('elem_store_user').value = '';				//店铺账号
		// d('elem_store_pass').value = '';				//店铺密码
		// d('elem_store_pushUrl').value = '';			//推送地址

		var BodyLeftList = c('operator_body_left_list');
		for(var j = 0; j < BodyLeftList.length; j++){
			BodyLeftList[j].style.backgroundColor = "rgba(0,0,0,0)";
		}
		count = 0;

		/*//清空开票资料
		d('operator_name').value = "";
		d('operator_number').value = "";
		d('operator_addr').value = "";
		d('operator_phone').value = "";
		d('operator_bank').value = "";
		d('detailed_account').value = "";*/
	};
	var userInfo = JSON.parse(sessionStorage.loginUserName);
	bodySubmit.onclick = function(){
		//详细信息提交
		var detailedOperatorId = d('detailed_operator_id').value;					//店铺ID
		var detailedOperatorCompanyname = d('detailed_operator_name').value;		//店铺名称
		var detailedOperatorCompanyaddress = d('detailed_operator_address').value;	//店铺地址
		var detailedOperatorPrincipal = d('detailed_operator_principal').value;		//店铺负责人
		var detailedOperatorPhone = d('detailed_operator_phone').value;				//联系电话
		var detailedOperatorStop = d('detailed_operator_stop').checked;				//是否停用
		if(detailedOperatorCompanyname == ''){
			alern('店铺名称不能为空');
			return false;
		}
		if(detailedOperatorStop){
			detailedOperatorStop = 0;
		}else{
			detailedOperatorStop = 1;
		}

		var obj = {};
		obj.id = detailedOperatorId;
		obj.storeName = detailedOperatorCompanyname;
		obj.storeAddress = detailedOperatorCompanyaddress;
		obj.storePrincipal = detailedOperatorPrincipal;
		obj.storeTel = detailedOperatorPhone;
		obj.storedeleted = detailedOperatorStop;

		//饿了么信息提交
		var elemEnable = d('elem_enable');						//停用启用
		var elemStoreId = d('elem_store_id');					//平台ID
		var elemStoreKey = d('elem_store_key');					//应用Key
		var elemStoreSecret = d('elem_store_secret');			//应用Secret
		// var elemStoreRedirecturl = d('elem_store_redirecturl');	//回调URL
		// var elemStoreUrl = d('elem_store_url');					//店铺URL
		// var elemStoreUser = d('elem_store_user');				//店铺账号
		// var elemStorePass = d('elem_store_pass');				//店铺密码
		// var elemStorePushUrl = d('elem_store_pushUrl');			//推送地址
		var objs = {};
		objs.storeId = Number(elemStoreId.value);
		objs.storeAppKey = elemStoreKey.value;
		objs.storeAppSecret = elemStoreSecret.value;
		// objs.redirectUrl = elemStoreRedirecturl.value;
		// objs.storeUrl = elemStoreUrl.value;
		// objs.storeAccountNumber = elemStoreUser.value;
		// objs.storePass = elemStorePass.value;
		// objs.pushUrl = elem_store_pushUrl.value;
		//objs.relatedId = Number(elemStoreId.name)?Number(elemStoreId.name):data.resultObject.id;
		objs.platformdeleted = elemEnable.checked?1:0;

		var param = count == 0?'/store/basis/add':'/store/basis/update';			//详细信息
		//var elemTj = count == 0?'/store/platform/add':'/store/platform/update';	//平台关联

		ajax({
			type: 'post',
			url: URLS + param,
			data: {
				obj: JSON.stringify(obj),	//详细信息
				objs: JSON.stringify(objs),	//平台信息
			},
			success: function(data){
				log(data);
				alern(data.msg);
				start();
				c('operator_home_head_submit')[0].click();
				// 平台信息保存
				// ajax({
				// 	type: 'post',
				// 	url: URLS + elemTj,
				// 	data: {
				// 		obj: JSON.stringify(obj),
				// 	},
				// 	success: function(data){
				// 		log(data);
				// 		alern(data.msg);
				// 		start();
				// 		c('operator_home_head_submit')[0].click();
				// 	}
				// })
			}
		})

		/*//开票资料上传
		var operatorName = d('operator_name').value;		//公司名称
		var operatorNumber = d('operator_number').value;	//税务登记号
		var operatorAddr = d('operator_addr').value;		//公司地址
		var operatorPhone = d('operator_phone').value;		//联系电话
		var operatorBank = d('operator_bank').value;		//开户银行
		var operatorAccount = d('operator_account').value;	//银行账号
		var operatorObject = {};
		operatorObject.operatorID = detailedOperatorId;
		operatorObject.company = operatorName;
		operatorObject.taxRegistrationNum = operatorNumber;
		operatorObject.location = operatorAddr;
		operatorObject.phone = operatorPhone;
		operatorObject.bank = operatorBank;
		operatorObject.bankAccount = operatorAccount;

		$.ajax({
			type: 'post',
			url: URLS + '/invoice/saveInvoice.json',
			data: {
				Data: JSON.stringify(operatorObject),
			},
			success: function(data){
				console.log(data);
			}
		})*/
	}
}

function platform(){		//平台关联模块
	//饿了么平台授权按钮
	// d('elem_store_authorize').onclick = function(){
	// 	var elemEnable = d('elem_enable');						//停用启用
	// 	var elemStoreId = d('elem_store_id');					//平台ID
	// 	var elemStoreKey = d('elem_store_key');					//应用Key
	// 	var elemStoreSecret = d('elem_store_secret');			//应用Secret
	// 	var elemStoreRedirecturl = d('elem_store_redirecturl');	//回调URL
	// 	var elemStoreUrl = d('elem_store_url');					//店铺URL
	// 	var elemStoreUser = d('elem_store_user');				//店铺账号
	// 	var elemStorePass = d('elem_store_pass');				//店铺密码
	// 	var elemStorePushUrl = d('elem_store_pushUrl');			//推送地址
		
	// 	var elemError;
	// 	elemError = elemStoreId.value?'':'平台ID不能为空<br/>';
	// 	elemError += elemStoreKey.value?'':'应用Key不能为空<br/>';
	// 	elemError += elemStoreSecret.value?'':'应用secret不能为空<br/>';
	// 	elemError += elemStoreRedirecturl.value?'':'回调URL不能为空<br/>';
	// 	elemError += elemStoreUrl.value?'':'店铺URL不能为空<br/>';
	// 	elemError += elemStorePass.value?'':'店铺密码不能为空';

	// 	if(elemError){
	// 		alern(elemError);
	// 		return false;
	// 	}

	// 	var obj = {};
	// 	obj.storeId = elemStoreId.value;
	// 	obj.storeAppKey = elemStoreKey.value;
	// 	obj.storeAppSecret = elemStoreSecret.value;
	// 	obj.redirectUrl = elemStoreRedirecturl.value;
	// 	obj.storeUrl = elemStoreUrl.value;
	// 	obj.storeAccountNumber = elemStoreUser.value;
	// 	obj.storePass = elemStorePass.value;
	// 	obj.pushUrl = elem_store_pushUrl.value;
	// 	obj.relatedId = elemStoreId.name;
	// 	obj.platformdeleted = elemEnable.checked?1:0;

	// 	ajax({
	// 		type: 'post',
	// 		url: URLS + '/store/platform/authorization',
	// 		data: {
	// 			obj: JSON.stringify(obj),
	// 		},
	// 		success: function(data){
	// 			log(data);
	// 			if(data.status == 10001 && data.resultObject.url){
	// 				window.open(data.resultObject.url,"饿了么授权","height=600,width=800,top=100,left=200,toolbar=no,menubar=no");
	// 			}else if(data.status == 10001 && data.resultObject.tokenCode){
	// 				alern('该店铺已经有绑定的饿了么商家！');
	// 			}else{
	// 				alern(data.msg);
	// 			}
	// 		}
	// 	})
	// }

	//饿了么取消授权按钮
	d('elem_store_authdelete').onclick = function(){
		if(confirm('确认要取消饿了么商家授权吗？取消后可重新绑定其他饿了么商家！')){
			ajax({
				type: 'post',
				url: URLS + '/store/platform/delete',
				data: {
					storeId: Number(d('elem_store_id').value),
				},
				success: function(data){
					alern(data.msg);
				}
			})
		}
	}
}


start();
startbody(1);
submit();
platform();		//平台关联模块