//数据get
//基本资料
var modelNumber = d('model_number');				//机型编号
var modelName = d('model_name');					//机型名称
var modelNameEn = d('model_name_en');				//英文名称
var modelPayment = d('model_payment');				//服务费用
var modelMultiple = d('model_multiple');			//货道规格
//规格参数
var modelWidth = d('model_width');					//宽度
var modelHeight = d('model_height');				//高度
var modelDepth = d('model_depth');					//深度
var modelWeight = d('model_weight');				//重量
var modelNoise = d('model_noise');					//工作噪声
var modelPower = d('model_power');					//额定功率
//使用环境
var modelTemperature = d('model_temperature');		//环境温度
var modelHumidity = d('model_humidity');			//环境湿度
var modelUse = d('model_use');						//使用环境
var modelVoltage = d('model_voltage');				//工作电压
var modelCycle = d('model_cycle');					//保养周期
//配置
var modelComputer = d('model_computer');			//工控机
var modelOperatingsys = d('model_operatingsys');	//操作系统
var modelRouter = d('model_router');				//路由器
var modelMonitorone = d('model_monitorone');		//显示器1
var modelMonitortwo = d('model_monitortwo');		//显示器2
var modelScanner = d('model_scanner');				//扫码器
var modelInduction = d('model_induction');			//人体感应
var modelSterilize = d('model_sterilize');			//杀菌
var modelCamera = d('model_camera');				//摄像头
var modelPapercoin = d('model_papercoin');			//纸硬币器
var modelMethod = d('model_method');				//取货方式
var modelMouth = d('model_mouth');					//取物口
var modelRefrigeration = d('model_refrigeration');	//制冷类型
var modelHeating = d('model_heating');				//加热类型
var modelImage = d('model_image');					//机型图片int
var modelImageView = d('model_image_view');			//机型图片int
var modelImages = d('model_images');				//机型图片
var type = null;

var rightFootItem = c('operator_body_right_foot_item');

function start(){
	Authority(loginUserName.empcode);

	//渲染下拉框
	var modelSelect = c('model_select');
	var modelSelectObj = [
		['室内','室外','室内和室外'],
		['有','无'],
		['有','无'],
		['有','无'],
		['自取','送出'],
		['无','冷藏2°-6°','冷藏-18°'],
		['无','整箱加热','微博加热'],
	];
	for(var i = 0; i < modelSelect.length; i++){
		var ul = creat('ul');
		ul.className = 'model_select_ul';
		ul.setAttribute('data-list',i);
		for(var j = 0; j < modelSelectObj[i].length; j++){
			var li = creat('li');
			li.innerHTML = modelSelectObj[i][j];
			ul.appendChild(li);
		}
		modelSelect[i].parentNode.appendChild(ul);

		var modelSelectUl = c('model_select_ul');
		(function(q){
			modelSelect[q].onfocus = function(){
				modelSelectUl[q].style.display = "block";
			}
			modelSelect[q].onblur = function(){
				modelSelectUl[q].style.display = "none";
			}
		})(i)

		for(var j = 0; j < modelSelectUl[i].children.length; j++){
			modelSelectUl[i].children[j].onmousedown = function(){
				modelSelect[this.parentNode.dataset.list].value = this.innerHTML;
			}
		}
	};
	//渲染图片上传预览
	var modelImage = c('model_image')[0];
	var image_preview = c('image_preview')[0];
	var readers;
	modelImage.onchange = function(){
		var reader = new FileReader();
		reader.readAsDataURL(this.files[0]);
		reader.onload=function(oFREvent){
			image_preview.innerHTML = "";
			modelImageView.innerHTML = modelImage.value;
			readers = oFREvent.target.result;
			var img = new Image();
			img.src = readers;
			image_preview.appendChild(img);
		}
	}

	//为body部分高度布局
	var obody = c('operator_body')[0];
	obody.style.height = window.innerHeight - 119 + 'px';

	//初始数据渲染
	$.ajax({
		type: 'post',
		url: URLS + '/jxzd/getMachineType.json',
		data: {},
		success: function(data){
			console.log(data);
			var bodyLeftList = c('operator_body_left_list');
			for(var i = bodyLeftList.length-1;i > -1; i--){
				bodyLeftList[i].parentNode.removeChild(bodyLeftList[i]);
			}
			var BodyLeft = c('operator_body_left')[0];
			for(var i = 0; i < data.length; i++){
				var button = creat('button');
				button.className = 'operator_body_left_list';
				button.innerHTML = '<img src="image/jx.png"/>' + data[i].model;
				button.name = data[i].modelNum;
				BodyLeft.appendChild(button);
			}

			var bodyLeftList = c('operator_body_left_list');
			for(var i = 0; i < bodyLeftList.length; i++){
				(function(q){
					bodyLeftList[q].onclick = function(){
						for(var j = 0; j < bodyLeftList.length; j++){
							bodyLeftList[j].style.backgroundColor = "rgba(0,0,0,0)";
						}
						bodyLeftList[q].style.backgroundColor = "#e5e5e5";
						for(var i = 0; i < rightFootItem.length; i++){
							rightFootItem[i].style.display = 'block';
						}
						type = 1;
						modelNumber.value = data[q].modelNum;
						modelNumber.disabled = "disabled";
						modelNameEn.value = data[q].modelEn?data[q].modelEn:"";
						modelName.value = data[q].model;
						modelPayment.value = data[q].serviceFee;
						modelWidth.value = data[q].width;
						modelHeight.value = data[q].height;
						modelDepth.value = data[q].depth;
						modelWeight.value = data[q].weight;
						modelNoise.value = data[q].noise;
						modelPower.value = data[q].power;
						modelTemperature.value = data[q].temperature;
						modelHumidity.value = data[q].humidity;
						modelUse.value = data[q].environment;
						modelVoltage.value = data[q].voltage;
						modelCycle.value = data[q].keepDate;
						modelComputer.value = data[q].ipcSize;
						modelOperatingsys.value = data[q].os;
						modelRouter.value = data[q].routerSize;
						modelMonitorone.value = data[q].displayer1;
						modelMonitortwo.value = data[q].displayer2;
						modelScanner.value = data[q].qrcodeScanner;
						modelInduction.value = data[q].infrared;
						modelSterilize.value = data[q].ozone;
						modelCamera.value = data[q].camera;
						modelPapercoin.value = data[q].coinMech;
						modelMethod.value = data[q].takeWay;
						modelMouth.value = data[q].takeNum;
						modelRefrigeration.value = data[q].coolType;
						modelHeating.value = data[q].hotType;
						if(data[q].picture != ""&&data[q].picture != undefined){
							modelImageView.innerHTML = data[q].picture;
							modelImages.innerHTML = '<img src="'+ data[q].picture +'" />';
						}
						var MultipleData = data[q].goodsSize.split(',');
						var MultipleDiv = c('model_multiple_div');
						console.log(MultipleData);
						for(var j = 0; j < MultipleDiv.length; j++){
							MultipleDiv[j].children[0].checked = false;
						}
						for(var j = 0; j < MultipleDiv.length; j++){
							for(var k = 0; k < MultipleData.length; k++){
								if(MultipleDiv[j].children[0].name == MultipleData[k]){
									MultipleDiv[j].children[0].checked = 'checked';
								}
							}
						}
					}
				})(i)
			}
		},
	});

	//右上部导航栏渲染
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

function startbody(){
	//渲染货道规格
	$.ajax({
		type: 'post',
		url: URLS + '/jxzd/goods.json',
		data: {},
		async: false,
		success: function(data){
			console.log(data);
			for(var i = 0; i < data.length; i++){
				var div = creat('div');
				var input = creat('input');
				var span = creat('span');
				div.className = 'model_multiple_div';
				input.type = 'checkbox';
				input.name = data[i].categoryId;
				span.innerHTML = data[i].categoryId;
				div.appendChild(input);
				div.appendChild(span);
				modelMultiple.appendChild(div);
			}
			var divClear = creat('div');
			divClear.className = 'clear';
			modelMultiple.appendChild(divClear);
		}
	});
}

//初始化渲染布局
window.onresize = function(){
	var obody = c('operator_body')[0];
	obody.style.height = window.innerHeight - 119 + 'px';
}

function submit(){
	var bodyCreat = d('body_creat');		//创建按钮
	var bodySubmit = d('body_submit');		//保存按钮
	bodyCreat.onclick = function(){
		for(var i = 0; i < rightFootItem.length; i++){
			rightFootItem[i].style.display = 'block';
		}
		
		var bodyLeftList = c('operator_body_left_list');
		for(var j = 0; j < bodyLeftList.length; j++){
			bodyLeftList[j].style.backgroundColor = "rgba(0,0,0,0)";
		}
		type = 0;
		modelNumber.value = "";
		modelNumber.disabled = false;
		modelName.value = "";
		modelNameEn.value = "";
		modelPayment.value = "";
		modelWidth.value = "";
		modelHeight.value = "";
		modelDepth.value = "";
		modelWeight.value = "";
		modelNoise.value = "";
		modelPower.value = "";
		modelTemperature.value = "";
		modelHumidity.value = "";
		modelUse.value = "";
		modelVoltage.value = "";
		modelCycle.value = "";
		modelComputer.value = "";
		modelOperatingsys.value = "";
		modelRouter.value = "";
		modelMonitorone.value = "";
		modelMonitortwo.value = "";
		modelScanner.value = "";
		modelInduction.value = "";
		modelSterilize.value = "";
		modelCamera.value = "";
		modelPapercoin.value = "";
		modelMethod.value = "";
		modelMouth.value = "";
		modelRefrigeration.value = "";
		modelHeating.value = "";
		modelImage.value = "";
		modelImageView.innerHTML = "点击选择图片...";
		modelImages.innerHTML = "";
		var MultipleDiv = c('model_multiple_div');
		for(var j = 0; j < MultipleDiv.length; j++){
			MultipleDiv[j].children[0].checked = false;
		}
	}
	bodySubmit.onclick = function(){
		var errorObj = "";
		var Multiple = 0;
		if(modelNumber.value == ""){
			errorObj += '机型编号不能为空！</br>';
		}
		if(modelName.value == ""){
			errorObj += '机型名称不能为空！</br>';
		}
		if(modelNameEn.value == ""){
			errorObj += '英文名称不能为空！</br>';
		}
		if(modelPayment.value == ""){
			errorObj += '服务费用不能为空！</br>';
		}
		var MultipleDiv = c('model_multiple_div');
		for(var i = 0; i < MultipleDiv.length; i++){
			if(MultipleDiv[i].children[0].checked == true){
				Multiple = 1;
				break;
			};
		}
		if(Multiple == 0){
			errorObj += '至少选择一个货道规格！</br>';
		}
		if(errorObj != ""){
			alern(errorObj);
			return false;
		}
		//获取货道规格上传参数
		modelmul = "";
		for(var i = 0; i < MultipleDiv.length; i++){
			if(MultipleDiv[i].children[0].checked == true){
				modelmul += MultipleDiv[i].children[0].name + ',';
			};
		}
		modelmul = modelmul.substring(0,modelmul.length-1);
		//基础资料
		var basicObj = new Object();
		basicObj.number = modelNumber.value;
		basicObj.name = modelName.value;
		basicObj.modelEn = modelNameEn.value;
		basicObj.serviceFee = modelPayment.value;
		basicObj.multiple = modelmul;
		//规格参数
		var paramObj = new Object();
		paramObj.width = modelWidth.value;
		paramObj.height = modelHeight.value;
		paramObj.depth = modelDepth.value;
		paramObj.weight = modelWeight.value;
		paramObj.noise = modelNoise.value;
		paramObj.power = modelPower.value;
		//使用环境
		var useObj = new Object();
		useObj.temperature = modelTemperature.value;
		useObj.humidity = modelHumidity.value;
		useObj.use = modelUse.value;
		useObj.voltage = modelVoltage.value;
		useObj.cycle = modelCycle.value;
		//配置
		var deployObj = new Object();
		deployObj.computer = modelComputer.value;
		deployObj.operatingsys = modelOperatingsys.value;
		deployObj.router = modelRouter.value;
		deployObj.monitorone = modelMonitorone.value;
		deployObj.monitortwo = modelMonitortwo.value;
		deployObj.scanner = modelScanner.value;
		deployObj.induction = modelInduction.value;
		deployObj.sterilize = modelSterilize.value;
		deployObj.camera = modelCamera.value;
		deployObj.papercoin = modelPapercoin.value;
		deployObj.method = modelMethod.value;
		deployObj.mouth = modelMouth.value;
		deployObj.refrigeration = modelRefrigeration.value;
		deployObj.heating = modelHeating.value;
		deployObj.number = modelNumber.value;
		var image_preview = c('image_preview')[0];
		if(image_preview.children[0] != undefined){
			deployObj.image = image_preview.children[0].src;
		}else{
			deployObj.image = "";
		}
		console.log(JSON.stringify(basicObj));
		console.log(JSON.stringify(paramObj));
		console.log(JSON.stringify(useObj));
		console.log(JSON.stringify(deployObj));
		console.log(type + "");
		$.ajax({
			type: 'post',
			url: URLS + '/jxzd/addMachineType.json',
			data: {
				basicData: JSON.stringify(basicObj),
				paramData: JSON.stringify(paramObj),
				useData: JSON.stringify(useObj),
				deployData: JSON.stringify(deployObj),
				type: type + "",
			},
			success: function(data){
				alern(data);
				start();
			},
			error: function(data){
				alern(data.responseText);
				start();
			}
		})
	}
}

//系统升级
function subUP(){
	//版本更新
	c('model_update')[0].onclick = function(){
		c('model_update_fixed')[0].style.display = 'block';
	}
	c('model_update_fixed_clear')[0].onclick = function(){
		c('model_update_fixed')[0].style.display = 'none';
	}
	c('model_update_fixed_btn')[0].onmousedown = function(){
		var inta = c('model_update_fixed_inta')[0];	//客户端文件
		var intb = c('model_update_fixed_intb')[0];	//客户端版本号
		var intc = c('model_update_fixed_intc')[0];	//下位机文件
		var intd = c('model_update_fixed_intd')[0];	//下位机版本号
		var mobelName = d('model_name').value;		//机型名称
		var mobelId = d('model_number').value;		//机型编号

		var mobelUpdateObject = new Object();
		mobelUpdateObject.clientfileUrl = inta.value;
		mobelUpdateObject.clientfileVersion = intb.value;
		mobelUpdateObject.lowerfileUrl = intc.value;
		mobelUpdateObject.lowerfileVersion = intd.value;
		mobelUpdateObject.model = mobelName;
		mobelUpdateObject.modelNum = mobelId;
		console.log(JSON.stringify(mobelUpdateObject));
		$.ajax({
			type: 'post',
			url: URLX + '/jf/bg/file/web/addfile.json',
			data: {
				obj: JSON.stringify(mobelUpdateObject),
			},
			success: function(data){
				alern(data.msg);
			}
		})
	}
	//推送
	c('model_push')[0].onclick = function(){
		var mobelId = d('model_number').value;		//机型编号
		$.ajax({
			type: 'post',
			url: URLX + '/jf/bg/file/web/machver.json',
			data: {
				modelNum: mobelId,
			},
			success: function(data){
				console.log(data);
				c('model_push_fixed')[0].style.display = "block";
				//客户端与下位机下拉框
				var fixedHomeTableaInta = c('model_push_fixed_home_tablea_inta')[0];
				var fixedHomeTableaIntb = c('model_push_fixed_home_tablea_intb')[0];
				if(c('model_push_fixed_home_tablea_ula')[0] != undefined){
					c('model_push_fixed_home_tablea_ula')[0].parentNode.removeChild(c('model_push_fixed_home_tablea_ula')[0]);
				}
				var ul = creat('ul');
				ul.className = 'model_push_fixed_home_tablea_ula';
				ul.style.maxHeight = '300px';
				ul.style.overflowX = 'hidden';
				ul.style.overflowY = 'auto';
				for(var i = 0; i < data.filemaster.length; i++){
					if(data.filemaster[i].clientfileVersion !=""&&data.filemaster[i].clientfileUrl != ""){
						var li = creat('li');
						li.innerHTML = data.filemaster[i].clientfileVersion;
						li.setAttribute('data-value',data.filemaster[i].clientfileUrl);
						ul.appendChild(li);
					}
				}
				fixedHomeTableaInta.parentNode.appendChild(ul);
				if(c('model_push_fixed_home_tablea_ulb')[0] != undefined){
					c('model_push_fixed_home_tablea_ulb')[0].parentNode.removeChild(c('model_push_fixed_home_tablea_ulb')[0]);
				}
				var uls = creat('ul');
				uls.className = 'model_push_fixed_home_tablea_ulb';
				uls.style.maxHeight = '300px';
				uls.style.overflowX = 'hidden';
				uls.style.overflowY = 'auto';
				for(var i = 0; i < data.filemaster.length; i++){
					if(data.filemaster[i].lowerfileVersion != ""&&data.filemaster[i].lowerfileUrl !=""){
						var li = creat('li');
						li.innerHTML = data.filemaster[i].lowerfileVersion;
						li.setAttribute('data-value',data.filemaster[i].lowerfileUrl);
						uls.appendChild(li);
					}
				}
				fixedHomeTableaIntb.parentNode.appendChild(uls);
				var fixedHomeTableaUla = c('model_push_fixed_home_tablea_ula')[0];
				var fixedHomeTableaUlb = c('model_push_fixed_home_tablea_ulb')[0];
				fixedHomeTableaInta.onfocus = function(){
					fixedHomeTableaUla.style.display = "block";
				}
				fixedHomeTableaInta.onblur = function(){
					fixedHomeTableaUla.style.display = "none";
				}
				fixedHomeTableaIntb.onfocus = function(){
					fixedHomeTableaUlb.style.display = "block";
				}
				fixedHomeTableaIntb.onblur = function(){
					fixedHomeTableaUlb.style.display = "none";
				}
				for(var i = 0; i < fixedHomeTableaUla.children.length; i++){
					(function(q){
						fixedHomeTableaUla.children[q].onmousedown = function(){
							fixedHomeTableaInta.value = this.innerHTML;
							fixedHomeTableaInta.name = this.dataset.value;
						}
					})(i)
				}
				for(var i = 0; i < fixedHomeTableaUlb.children.length; i++){
					(function(q){
						fixedHomeTableaUlb.children[q].onmousedown = function(){
							fixedHomeTableaIntb.value = this.innerHTML;
							fixedHomeTableaIntb.name = this.dataset.value;
						}
					})(i)
				}
				//设备列表渲染
				var modelPushFixedHomeTbody = c('model_push_fixed_home_tbody')[0];
				modelPushFixedHomeTbody.innerHTML = "";
				for(var i = 0; i < data.deviceMaster.length; i++){
					var tr = creat('tr');
					var tda = creat('td');
					var tdb = creat('td');
					var tdc = creat('td');
					var tdd = creat('td');
					var tde = creat('td');
					tda.innerHTML = '<input class="model_push_fixed_home_tbody_box" type="checkbox" name="'+data.deviceMaster[i].macAddr+'"/>';
					tdb.innerHTML = data.deviceMaster[i].machName;
					tdc.innerHTML = data.deviceMaster[i].machCode;
					tdd.innerHTML = data.deviceMaster[i].macAddr;
					tde.innerHTML = data.deviceMaster[i].operateCompany;
					tr.appendChild(tda);
					tr.appendChild(tdb);
					tr.appendChild(tdc);
					tr.appendChild(tdd);
					tr.appendChild(tde);
					modelPushFixedHomeTbody.appendChild(tr);
				}
				var modelPushFixedHomeTbodyBox = c('model_push_fixed_home_tbody_box');
				c('model_push_fixed_home_tbody_allbox')[0].onclick = function(){
					for(var i = 0; i < modelPushFixedHomeTbodyBox.length; i++){
						modelPushFixedHomeTbodyBox[i].checked = true;
						modelPushFixedHomeTbodyBox[i].onclick = function(){
							c('model_push_fixed_home_tbody_allbox')[0].checked = false;
						}
					}
				}
			}
		})
	}
	c('model_push_fixed_clear')[0].onclick = function(){
		c('model_push_fixed')[0].style.display = "none";
	}
	c('model_push_fixed_btn')[0].onclick = function(){
		var mobelId = d('model_number').value;		//机型编号
		var fixedHomeTableaInta = c('model_push_fixed_home_tablea_inta')[0];	//客户端
		var fixedHomeTableaIntb = c('model_push_fixed_home_tablea_intb')[0];	//下位机
		var count = 0;
		var modelError = "";
		if(fixedHomeTableaInta.value ==""||fixedHomeTableaInta.name == ""){
			count ++;
		}
		if(fixedHomeTableaIntb.value ==""||fixedHomeTableaIntb.name == ""){
			count ++;
		}
		if(count == 2){
			modelError += '客户端版本与下位机版本不能同时为空！<br/>';
		}
		var modelPushFixedHomeTbodyBox = c('model_push_fixed_home_tbody_box');
		var modelArray = [];
		for(var i = 0; i < modelPushFixedHomeTbodyBox.length; i++){
			if(modelPushFixedHomeTbodyBox[i].checked){
				var modelClear = modelPushFixedHomeTbodyBox[i].name.replace(/:/g, '');
				modelArray.push(modelClear);
			}
		}
		if(modelArray == ""){
			modelError += '请至少选择一个设备！<br/>';
		}
		if(modelError != ""){
			alern(modelError);
			return false;
		}
		console.log(mobelId);
		console.log(fixedHomeTableaInta.name);
		console.log(fixedHomeTableaIntb.name);
		console.log(JSON.stringify(modelArray));
		$.ajax({
			type: 'post',
			url: URLX + '/jf/bg/file/web/pushfile.json',
			data: {
				modelNum: mobelId,							//机器型号
				clientfileUrl: fixedHomeTableaInta.name,	//客户端URL
				lowerfileUrl:  fixedHomeTableaIntb.name,	//下位机URL
				array: JSON.stringify(modelArray),
			},
			success: function(data){
				alern(data.msg);
			}
		})
	}
}

start();
startbody();
submit();
subUP();	//系统升级