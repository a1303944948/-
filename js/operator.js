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
	let wechatPayOn = new OnChange('wechat_pay');
	let alipayPayOn = new OnChange('alipay_pay');
	let silverPayOn = new OnChange('silver_pay');
	let icbcPayOn = new OnChange('icbc_pay');
	d('wechat_pay').onchange = function(){
		if(this.checked){
			wechatPayOn.yes('wechat_pay');
		}else{
			wechatPayOn.no('wechat_pay');
		}
	};
	d('alipay_pay').onchange = function(){
		if(this.checked){
			alipayPayOn.yes('alipay_pay');
		}else{
			alipayPayOn.no('alipay_pay');
		}
	};
	d('silver_pay').onchange = function(){
		if(this.checked){
			silverPayOn.yes('silver_pay');
		}else{
			silverPayOn.no('silver_pay');
		}
	};
	d('icbc_pay').onchange = function(){
		if(this.checked){
			icbcPayOn.yes('icbc_pay');
		}else{
			icbcPayOn.no('icbc_pay');
		}
	}
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
 				$.ajax({
					type: 'post',
					url: URLZ + '/operate/getOperate.json',
					data: {
						operatorID: thatName,
					},
					dataType: 'json',
					success: function(data){
						var detailedOperatorId = d('detailed_operator_id');							//运营方ID
						var detailedOperatorNumbering = d('detailed_operator_numbering');			//运营方编号
						var detailedOperatorCompanyname = d('detailed_operator_companyname');		//公司名称
						var detailedOperatorCompanyaddress = d('detailed_operator_companyaddress');	//公司地址
						var detailedOperatorPrincipal = d('detailed_operator_principal');			//运营方负责人
						var detailedOperatorPhone = d('detailed_operator_phone');					//联系手机
						var detailedOperatorSparephone = d('detailed_operator_sparephone');			//备用手机
						var detailedOperatorEmail = d('detailed_operator_email');					//Email邮箱
						var detailedOperatorStop = d('detailed_operator_stop');						//是否停用
						var detailedOperatorIsFree = d('detailed_operator_isFree');					//是否免费
						detailedOperatorId.value = data.operatorID;
						detailedOperatorId.disabled = "disabled";
						detailedOperatorNumbering.value = data.operator;
						detailedOperatorCompanyname.value = data.company;
						detailedOperatorCompanyaddress.value = data.location;
						detailedOperatorPrincipal.value = data.principal;
						detailedOperatorPhone.value = data.phone1;
						detailedOperatorSparephone.value = data.phone2;
						detailedOperatorEmail.value = data.email;
						if(data.mark == '0'){
							detailedOperatorStop.checked = "checked";
						}else{
							detailedOperatorStop.checked = false;
						}
						if(data.isFree == 1){
							detailedOperatorIsFree.checked = "checked";
						}else{
							detailedOperatorIsFree.checked = false;
						}
					}
				})
				//账户配置内容渲染
				$.ajax({
					type: 'post',
					url: URLS + '/paycenter/getPaycenter.json',
					data: {
						operatorID: thatName,
					},
					dataType: 'json',
					success: function(data){
						if(JSON.stringify(data) == "{}"){
							var wechatPay = d('wechat_pay');			//微信支付
							var wechatPass = d('wechat_pass');			//微信密钥
							var wechatId = d('wechat_id');				//微信公众号id
							var wechatSecret = d('wechat_secret');		//微信公众号secret
							var wecahtShanghu = d('wecaht_shanghu');		//微信商户号
							var wecahtFile = d('wecahtFile');				//微信商户号
							var wecahtFileValue = d('wecahtFile_value');	//微信商户号
							wechatPay.checked = false;
							wechatPass.value = "";
							wechatId.value = "";
							wechatSecret.value = "";
							wecahtShanghu.value = "";
							readers = "";
							wecahtFileValue.innerHTML = "";

							var alipayPay = d('alipay_pay');			//支付宝支付
							var alipayId = d('alipay_id');				//支付宝应用id
							var alipayPrivpay = d('alipay_privpay');		//支付宝私钥
							var alipayPublicpay = d('alipay_publicpay');	//支付宝公钥
							alipayPay.checked = false;
							alipayId.value = "";
							alipayPrivpay.value = "";
							alipayPublicpay.value = "";

							var silverPay = d('silver_pay');			//银商支付
							var silverShanghu = d('silver_shanghu');		//银商平台商户号
							var silverEnd = d('silver_end');				//银商终端号
							var silverJshanghu = d('silver_jshanghu');	//银商机构商户号
							var silverNews = d('silver_news');			//银商消息来源
							var silverNumber = d('silver_number');		//银商来源编号
							var silverTest = d('silver_test');			//银商测试环境MD5
							silverPay.checked = false;
							silverShanghu.value = "";
							silverEnd.value = "";
							silverJshanghu.value = "";
							silverNews.value = "";
							silverNumber.value = "";
							silverTest.value = "";

							var icbcPay = d('icbc_pay');				//工行支付
							var icbcPublicpay = d('icbc_publicpay');		//工行网关公钥
							var icbcAppid = d('icbc_appid');				//工行appid
							var icbcPrivpay = d('icbc_privpay');			//工行私钥
							var icbcSpecial = d('icbc_special');			//工行商户档案
							var icbcLife = d('icbc_life');				//工行e生活商户档案
							icbcPay.checked = false;
							icbcPublicpay.value = "";
							icbcAppid.value = "";
							icbcPrivpay.value = "";
							icbcSpecial.value = "";
							icbcLife.value = "";
						}else{
							var wechatPay = d('wechat_pay');			//微信支付
							var wechatPass = d('wechat_pass');			//微信密钥
							var wechatId = d('wechat_id');				//微信公众号id
							var wechatSecret = d('wechat_secret');		//微信公众号secret
							var wecahtShanghu = d('wecaht_shanghu');		//微信商户号
							var wecahtFile = d('wecahtFile');				//微信商户号
							var wecahtFileValue = d('wecahtFile_value');	//微信商户号
							if(data.wxMark == 0){
								wechatPay.checked = false;
							}else{
								wechatPay.checked = 'checked';
							}
							wechatPass.value = data.pass;
							wechatId.value = data.user;
							wechatSecret.value = data.wxAPPSecret;
							wecahtShanghu.value = data.mch_id;
							readers = data.fileRealName;
							wecahtFileValue.innerHTML = data.fileRealName;

							var alipayPay = d('alipay_pay');			//支付宝支付
							var alipayId = d('alipay_id');				//支付宝应用id
							var alipayPrivpay = d('alipay_privpay');		//支付宝私钥
							var alipayPublicpay = d('alipay_publicpay');	//支付宝公钥
							if(data.zfMark == 0){
								alipayPay.checked = false;
							}else{
								alipayPay.checked = 'checked';
							}
							alipayId.value = data.appid;
							alipayPrivpay.value = data.sdkpass;
							alipayPublicpay.value = data.sdkuser;

							var silverPay = d('silver_pay');			//银商支付
							var silverShanghu = d('silver_shanghu');		//银商平台商户号
							var silverEnd = d('silver_end');				//银商终端号
							var silverJshanghu = d('silver_jshanghu');	//银商机构商户号
							var silverNews = d('silver_news');			//银商消息来源
							var silverNumber = d('silver_number');		//银商来源编号
							var silverTest = d('silver_test');			//银商测试环境MD5
							if(data.ysMark == 0){
								silverPay.checked = false;
							}else{
								silverPay.checked = 'checked';
							}
							silverShanghu.value = data.silver_merchant;
							silverEnd.value = data.silver_end;
							silverJshanghu.value = data.silver_mechanism;
							silverNews.value = data.silver_news;
							silverNumber.value = data.silver_number;
							silverTest.value = data.silver_md5;

							var icbcPay = d('icbc_pay');				//工行支付
							var icbcPublicpay = d('icbc_publicpay');		//工行网关公钥
							var icbcAppid = d('icbc_appid');				//工行appid
							var icbcPrivpay = d('icbc_privpay');			//工行私钥
							var icbcSpecial = d('icbc_special');			//工行商户档案
							var icbcLife = d('icbc_life');				//工行e生活商户档案
							if(data.ghMark == 0){
								icbcPay.checked = false;
							}else{
								icbcPay.checked = 'checked';
							}
							icbcPublicpay.value = data.apigw_public_key;
							icbcAppid.value = data.app_id;
							icbcPrivpay.value = data.my_private_key;
							icbcSpecial.value = data.merId;
							icbcLife.value = data.storecode;
						}
						new OnChange('wechat_pay');
						new OnChange('alipay_pay');
						new OnChange('silver_pay');
						new OnChange('icbc_pay');
					}
				})
				//开票资料内容渲染
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
				})
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

var wecahtFile = d('wecahtFile');//获取上传的文件内容
var readers;
wecahtFile.onchange = function(){
	var reader = new FileReader();
	reader.readAsDataURL(this.files[0]);
	reader.onload=function(oFREvent){
		readers = oFREvent.target.result;
		var wecahtFileValue = d('wecahtFile_value');
		wecahtFileValue.innerHTML = wecahtFile.value;
	}
};

//判断运营方ID是否重复
d('detailed_operator_id').onchange = function(){
	for(var i = 0; i < DATALEFT.length; i++){
		if(this.value == DATALEFT[i].operatorID){
			alern('运营方代码已存在');
			this.value = "";
			return false;
		}
	}
}

/*支付测试事件（提供给运营方进行便捷检测支付配置是否完善所用）*/
//微信支付测试
d('wechatTest').onclick = function(){
	var ErrorString = "";
	var wechatObject = {};
	var detailedOperatorId = d('detailed_operator_id').value;	//运营方ID
	var wechatPass = d('wechat_pass').value;					//微信密钥
	var wechatId = d('wechat_id').value;						//微信公众号id
	var wechatSecret = d('wechat_secret').value;				//微信公众号secret
	var wecahtShanghu = d('wecaht_shanghu').value;				//微信商户号
	var wecahtFileValue = d('wecahtFile_value');				//检测p12文件是否存在
	wechatObject.operatorID = detailedOperatorId;
	wechatObject.pass = wechatPass;
	wechatObject.user = wechatId;
	wechatObject.wxAPPSecret = wechatSecret;
	wechatObject.mch_id = wecahtShanghu;
	if(detailedOperatorId === ''){
		ErrorString += "运营方ID不能为空<br/>";
	}
	if(wechatPass === ''){
		ErrorString += "微信API密钥不能为空<br/>";
	}
	if(wechatId === ''){
		ErrorString += "微信公众号id不能为空</br>";
	}
	if(wechatSecret === ''){
		ErrorString += "微信APPSecret不能为空</br>";
	}
	if(wecahtShanghu === ''){
		ErrorString += "微信商户号不能为空</br>";
	}
	if(wecahtFileValue === ''){
		ErrorString += "微信Pcks12证书不能为空</br>";
	}
	if(ErrorString !== ""){
		alern(ErrorString);
		return false;
	}
	$.ajax({
		type: 'post',
		url: URLS + '/paycenter/test/wechat/qrcode.json',
		data: {
			obj: JSON.stringify(wechatObject),
		},
		success: function(data){
			if(data.code == 10001){
				c("advertise_board_fixed_body_home_ewm")[0].innerHTML = "";
				var qrcode = new QRCode(c("advertise_board_fixed_body_home_ewm")[0], {
		            width : 220,//设置宽高
		            height : 220,
		        });
	   			qrcode.makeCode(data.wechat);
				c('advertise_board_fixed')[0].style.display = 'block';
				c('advertise_board_fixed_body')[0].style.marginTop = -(c('advertise_board_fixed_body')[0].clientHeight / 2) + 50 + 'px';
			}else{
				alern(data.msg);
			}
		},
		error: function(){
			alern('未知错误');
		}
	})

}
//支付宝支付测试
d('alipayTest').onclick = function(){
	var ErrorString = "";
	var alipayObject = {};
	var detailedOperatorId = d('detailed_operator_id').value;	//运营方ID
	var alipayId = d('alipay_id').value;						//支付宝应用id
	var alipayPrivpay = d('alipay_privpay').value;				//支付宝私钥
	var alipayPublicpay = d('alipay_publicpay').value;			//支付宝公钥
	alipayObject.operatorID = detailedOperatorId;
	alipayObject.appid = alipayId;
	alipayObject.sdkpass = alipayPrivpay;
	alipayObject.sdkuser = alipayPublicpay;
	if(detailedOperatorId === ''){
		ErrorString += "运营方ID不能为空<br/>";
	}
	if(alipayId === ''){
		ErrorString += "支付宝APPID不能为空<br/>";
	}
	if(alipayPrivpay === ''){
		ErrorString += "支付宝私钥不能为空<br/>";
	}
	if(alipayPublicpay === ''){
		ErrorString += "支付宝公钥不能为空<br/>";
	}
	if(ErrorString !== ""){
		alern(ErrorString);
		return false;
	}
	$.ajax({
		type: 'post',
		url: URLS + '/paycenter/test/alipay/qrcode.json',
		data: {
			obj: JSON.stringify(alipayObject),
		},
		success: function(data){
			if(data.code == 10001){
				c("advertise_board_fixed_body_home_ewm")[0].innerHTML = "";
				var qrcode = new QRCode(c("advertise_board_fixed_body_home_ewm")[0], {
		            width : 220,//设置宽高
		            height : 220,
		        });
	   			qrcode.makeCode(data.alipay);
				c('advertise_board_fixed')[0].style.display = 'block';
				c('advertise_board_fixed_body')[0].style.marginTop = -(c('advertise_board_fixed_body')[0].clientHeight / 2) + 50 + 'px';
			}else{
				alern(data.msg);
			}
		},
		error: function(){
			alern('未知错误');
		}
	})
}

c('advertise_board_fixed_body_clear')[0].onclick = function(){
	c('advertise_board_fixed')[0].style.display = 'none';
};

function submit(){
	var bodyCreat = d('body_creat');
	//创建
	var bodySubmit = d('body_submit');
	bodyCreat.onclick = function(){
		var orightFootItem = c('operator_body_right_foot_item');
		for(var i = 0; i < orightFootItem.length; i++){
			orightFootItem[i].style.display = 'block';
		}
		d('detailed_operator_id').value = "";								//运营方ID
		d('detailed_operator_id').disabled = false;
		d('detailed_operator_numbering').value = "";						//运营方编号
		d('detailed_operator_companyname').value = "";						//公司名称
		d('detailed_operator_companyaddress').value = "";					//公司地址
		d('detailed_operator_principal').value = "";						//运营方负责人
		d('detailed_operator_phone').value = "";							//联系手机
		d('detailed_operator_sparephone').value = "";						//备用手机
		d('detailed_operator_email').value = "";							//Email邮箱
		d('detailed_operator_stop').checked = false;						//是否停用
		d('detailed_operator_isFree').checked = false;						//是否免费

		var BodyLeftList = c('operator_body_left_list');
		for(var j = 0; j < BodyLeftList.length; j++){
			BodyLeftList[j].style.backgroundColor = "rgba(0,0,0,0)";
		}

		var wechatPay = d('wechat_pay');				//微信支付
		var wechatPass = d('wechat_pass');				//微信密钥
		var wechatId = d('wechat_id');					//微信公众号id
		var wechatSecret = d('wechat_secret');			//微信公众号secret
		var wecahtShanghu = d('wecaht_shanghu');		//微信商户号
		var wecahtFile = d('wecahtFile');				//微信商户号
		var wecahtFileValue = d('wecahtFile_value');	//微信商户号
		wechatPay.checked = false;
		wechatPass.value = "";
		wechatId.value = "";
		wechatSecret.value = "";
		wecahtShanghu.value = "";
		readers = "";
		wecahtFileValue.innerHTML = "";

		var alipayPay = d('alipay_pay');			//支付宝支付
		var alipayId = d('alipay_id');				//支付宝应用id
		var alipayPrivpay = d('alipay_privpay');		//支付宝私钥
		var alipayPublicpay = d('alipay_publicpay');	//支付宝公钥
		alipayPay.checked = false;
		alipayId.value = "";
		alipayPrivpay.value = "";
		alipayPublicpay.value = "";

		var silverPay = d('silver_pay');			//银商支付
		var silverShanghu = d('silver_shanghu');		//银商平台商户号
		var silverEnd = d('silver_end');				//银商终端号
		var silverJshanghu = d('silver_jshanghu');	//银商机构商户号
		var silverNews = d('silver_news');			//银商消息来源
		var silverNumber = d('silver_number');		//银商来源编号
		var silverTest = d('silver_test');			//银商测试环境MD5
		silverPay.checked = false;
		silverShanghu.value = "";
		silverEnd.value = "";
		silverJshanghu.value = "";
		silverNews.value = "";
		silverNumber.value = "";
		silverTest.value = "";

		var icbcPay = d('icbc_pay');				//工行支付
		var icbcPublicpay = d('icbc_publicpay');		//工行网关公钥
		var icbcAppid = d('icbc_appid');				//工行appid
		var icbcPrivpay = d('icbc_privpay');			//工行私钥
		var icbcSpecial = d('icbc_special');			//工行商户档案
		var icbcLife = d('icbc_life');				//工行e生活商户档案
		icbcPay.checked = false;
		icbcPublicpay.value = "";
		icbcAppid.value = "";
		icbcPrivpay.value = "";
		icbcSpecial.value = "";
		icbcLife.value = "";
		new OnChange('wechat_pay');
		new OnChange('alipay_pay');
		new OnChange('silver_pay');
		new OnChange('icbc_pay');

		//清空开票资料
		d('operator_name').value = "";
		d('operator_number').value = "";
		d('operator_addr').value = "";
		d('operator_phone').value = "";
		d('operator_bank').value = "";
		d('detailed_account').value = "";
	};
	bodySubmit.onclick = function(){
		var count = 0;
		//详细信息提交
		var detailedOperatorId = d('detailed_operator_id').value;							//运营方ID
		var detailedOperatorNumbering = d('detailed_operator_numbering').value;				//运营方编号
		var detailedOperatorCompanyname = d('detailed_operator_companyname').value;			//公司名称
		var detailedOperatorCompanyaddress = d('detailed_operator_companyaddress').value;	//公司地址
		var detailedOperatorPrincipal = d('detailed_operator_principal').value;				//运营方负责人
		var detailedOperatorPhone = d('detailed_operator_phone').value;						//联系手机
		var detailedOperatorSparephone = d('detailed_operator_sparephone').value;			//备用手机
		var detailedOperatorEmail = d('detailed_operator_email').value;						//Email邮箱
		var detailedOperatorStop = d('detailed_operator_stop').checked;						//是否停用
		var detailedOperatorIsFree = d('detailed_operator_isFree').checked;					//是否免费
		if(detailedOperatorId == ''){
			alern('运营方ID不能为空');
			return false;
		}
		if(detailedOperatorNumbering == ''){
			alern('运营方编号不能为空');
			return false;
		}
		if(detailedOperatorStop){
			detailedOperatorStop = '0';
		}else{
			detailedOperatorStop = '1';
		}
		if(detailedOperatorIsFree){
			detailedOperatorIsFree = 1;
		}else{
			detailedOperatorIsFree = 0;
		}
		$.ajax({
			type: 'post',
			url: URLZ + '/operate/saveOperate.json',
			data: {
				operatorID: detailedOperatorId,
				operator: detailedOperatorNumbering,
				company: detailedOperatorCompanyname,
				location: detailedOperatorCompanyaddress,
				principal: detailedOperatorPrincipal,
				phone1: detailedOperatorPhone,
				phone2: detailedOperatorSparephone,
				email: detailedOperatorEmail,
				mark: detailedOperatorStop,
				isFree: detailedOperatorIsFree,
			},
			success: function(data){
				count++;
				if(count == 2){
					alern('保存成功');
					start();
					c('operator_home_head_submit')[0].click();
				}
			}
		})
		//支付配置提交
		var wecahtFile = d('wecahtFile');//p12文件上传
		if(wecahtFile != undefined){
			if(wecahtFile.value != ''){
				if(wecahtFile.value.split('.')[wecahtFile.value.split('.').length-1] != 'p12'){
					alern('p12证书格式不正确！');
					return false;
				};
				if(wecahtFile.files[0].size > 1024000){
					alern('p12证书文件不得大于1MB');
					return false;
				};
			}
		}

		var ErrorString = "";
		var wechatObject = {};
		var wechatPay = d('wechat_pay').checked;			//微信支付
		if(wechatPay){
			wechatPay = '1';
		}else{
			wechatPay = '0';
		}
		var wechatPass = d('wechat_pass').value;			//微信密钥
		var wechatId = d('wechat_id').value;				//微信公众号id
		var wechatSecret = d('wechat_secret').value;		//微信公众号secret
		var wecahtShanghu = d('wecaht_shanghu').value;		//微信商户号
		var wecahtFileValue = d('wecahtFile_value');		//检测p12文件是否存在
		wechatObject.wechatPay = wechatPay;
		wechatObject.wechatPass = wechatPass;
		wechatObject.wechatId = wechatId;
		wechatObject.wechatSecret = wechatSecret;
		wechatObject.wecahtShanghu = wecahtShanghu;
		if(wechatPay === '1'){
			if(wechatPass === ''){
				ErrorString += "微信API密钥不能为空<br/>";
			}
			if(wechatId === ''){
				ErrorString += "微信公众号id不能为空</br>";
			}
			if(wechatSecret === ''){
				ErrorString += "微信APPSecret不能为空</br>";
			}
			if(wecahtShanghu === ''){
				ErrorString += "微信商户号不能为空</br>";
			}
			if(wecahtFileValue === ''){
				ErrorString += "微信Pcks12证书不能为空</br>";
			}
		}

		var alipayObject = {};
		var alipayPay = d('alipay_pay').checked;			//支付宝支付
		if(alipayPay){
			alipayPay = '1';
		}else{
			alipayPay = '0';
		}
		var alipayId = d('alipay_id').value;				//支付宝应用id
		var alipayPrivpay = d('alipay_privpay').value;		//支付宝私钥
		var alipayPublicpay = d('alipay_publicpay').value;	//支付宝公钥
		alipayObject.alipayPay = alipayPay;
		alipayObject.alipayId = alipayId;
		alipayObject.alipayPrivpay = alipayPrivpay;
		alipayObject.alipayPublicpay = alipayPublicpay;
		if(alipayPay === '1'){
			if(alipayId === ''){
				ErrorString += "支付宝APPID不能为空<br/>";
			}
			if(alipayPrivpay === ''){
				ErrorString += "支付宝私钥不能为空<br/>";
			}
			if(alipayPublicpay === ''){
				ErrorString += "支付宝公钥不能为空<br/>";
			}
		}

		var silverObject = {};
		var silverPay = d('silver_pay').checked;			//银商支付
		if(silverPay){
			silverPay = '1';
		}else{
			silverPay = '0';
		}
		var silverShanghu = d('silver_shanghu').value;		//银商平台商户号
		var silverEnd = d('silver_end').value;				//银商终端号
		var silverJshanghu = d('silver_jshanghu').value;	//银商机构商户号
		var silverNews = d('silver_news').value;			//银商消息来源
		var silverNumber = d('silver_number').value;		//银商来源编号
		var silverTest = d('silver_test').value;			//银商测试环境MD5
		silverObject.silverPay = silverPay;
		silverObject.silverShanghu = silverShanghu;
		silverObject.silverEnd = silverEnd;
		silverObject.silverJshanghu = silverJshanghu;
		silverObject.silverNews = silverNews;
		silverObject.silverNumber = silverNumber;
		silverObject.silverTest = silverTest;
		if(silverPay === '1'){
			if(silverShanghu === ''){
				ErrorString += "银商平台商户号不能为空<br/>";
			}
			if(silverEnd === ''){
				ErrorString += "银商终端号不能为空<br/>";
			}
			if(silverJshanghu === ''){
				ErrorString += "银商机构商户号不能为空<br/>";
			}
			if(silverNews === ''){
				ErrorString += "银商消息来源不能为空<br/>";
			}
			if(silverNumber === ''){
				ErrorString += "银商来源编号不能为空<br/>";
			}
			if(silverTest === ''){
				ErrorString += "银商测试环境MD5不能为空<br/>";
			}
		}

		var icbcObject = {};
		var icbcPay = d('icbc_pay').checked;				//工行支付
		if(icbcPay){
			icbcPay = '1';
		}else{
			icbcPay = '0';
		}
		var icbcPublicpay = d('icbc_publicpay').value;		//工行网关公钥
		var icbcAppid = d('icbc_appid').value;				//工行appid
		var icbcPrivpay = d('icbc_privpay').value;			//工行私钥
		var icbcSpecial = d('icbc_special').value;			//工行商户档案
		var icbcLife = d('icbc_life').value;				//工行e生活商户档案
		icbcObject.icbcPay = icbcPay;
		icbcObject.icbcPublicpay = icbcPublicpay;
		icbcObject.icbcAppid = icbcAppid;
		icbcObject.icbcPrivpay = icbcPrivpay;
		icbcObject.icbcSpecial = icbcSpecial;
		icbcObject.icbcLife = icbcLife;
		if(icbcPay === '1'){
			if(icbcPublicpay === ''){
				ErrorString += "工行网关公钥不能为空<br/>";
			}
			if(icbcAppid === ''){
				ErrorString += "工行appid不能为空<br/>";
			}
			if(icbcPrivpay === ''){
				ErrorString += "工行私钥不能为空<br/>";
			}
			if(icbcSpecial === ''){
				ErrorString += "工行特约商户档案不能为空<br/>";
			}
			if(icbcLife === ''){
				ErrorString += "工行e生活商户档案不能为空<br/>";
			}
		}
		/*console.log(JSON.stringify(wechatObject));
		console.log(JSON.stringify(alipayObject));
		console.log(JSON.stringify(silverObject));
		console.log(JSON.stringify(icbcObject));
		console.log(readers);
		console.log(detailedOperatorId);*/
		if(ErrorString !== ""){
			alern(ErrorString);
			return false;
		}

		if(readers == undefined){
			readers = "";
		};
		$.ajax({
			type: 'post',
			url: URLS + '/paycenter/savePaycenter.json',
			data: {
				wxData: JSON.stringify(wechatObject),
				zfData: JSON.stringify(alipayObject),
				ysData: JSON.stringify(silverObject),
				ghData: JSON.stringify(icbcObject),
				baseFile: readers,
				operatorID: detailedOperatorId,
			},
			success: function(data){
				count++;
				if(count == 2){
					alert(data.msg);
					start();
					c('operator_home_head_submit')[0].click();
					location.reload();
				}
			}
		})

		//开票资料上传
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
		})
	}
}

start();
startbody(1);
submit();