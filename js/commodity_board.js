var type = 10000;
function start(){
	Authority(loginUserName.empcode);

	var Head = c('operator_head')[0];
	var Select = c('item_select');
	var headUl = c('headUl');
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

	//渲染货道规格
	var modelMultiple = d('model_multiple');
	$.ajax({
		type: 'post',
		url: URLS + '/jxzd/goods.json',
		data: {},
		async: false,
		success: function(data){
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

	//DATAHEAD = listMenu();

	var BottomUl = c('operator_body_right_head_bottom_ul')[0];
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
	//渲染顶部运营方下拉框
	var operatorSelect = c('operator_selects')[0];
	var operatorSelectUl = c('operator_select_uls')[0];
	if(operatorSelectUl != undefined){
		operatorSelectUl.parentNode.removeChild(operatorSelectUl);
	};

	DATALEFT = groupitem(1);
	function operatorSel(){
		var ul = creat('ul');
		ul.className = "operator_select_uls";
		ul.style.minWidth = operatorSelect.clientWidth + 'px';
		for(i = 0; i < DATALEFT.length; i++){
			var li = creat('li');
			li.innerHTML = DATALEFT[i].text;
			li.setAttribute('data-value',DATALEFT[i].operatorID);
			ul.appendChild(li);
		}
		operatorSelect.parentNode.appendChild(ul);
		var operatorSelectUl = c('operator_select_uls')[0];
		operatorSelect.onfocus = function(){
			operatorSelectUl.style.display = "inline";
		}
		operatorSelect.onblur = function(){
			operatorSelectUl.style.display = "none";
		}
		operatorSelect.value = operatorSelectUl.children[0].innerHTML;
		operatorSelect.name = operatorSelectUl.children[0].dataset.value;
		for(var i = 0; i < operatorSelectUl.children.length; i++){
			operatorSelectUl.children[i].onmousedown = function(){
				operatorSelect.value = this.innerHTML;
				operatorSelect.name = this.dataset.value;
			}
		}
	}
	if(loginUserName.operatorID == 1){
		operatorSel();
	}else{
		$.ajax({
			type: 'post',
			url: URLS + '/operate/getOperate.json',
			data: {
				operatorID: loginUserName.operatorID,
			},
			success: function(data){

				var ul = creat('ul');
				ul.className = "operator_select_uls";
				ul.style.minWidth = operatorSelect.clientWidth + 'px';
				var li = creat('li');
				li.innerHTML = data.operator;
				li.setAttribute('data-value',data.operatorID);
				ul.appendChild(li);
				operatorSelect.parentNode.appendChild(ul);
				var operatorSelectUl = c('operator_select_uls')[0];
				operatorSelect.onfocus = function(){
					operatorSelectUl.style.display = "inline";
				}
				operatorSelect.onblur = function(){
					operatorSelectUl.style.display = "none";
				}
				operatorSelect.value = operatorSelectUl.children[0].innerHTML;
				operatorSelect.name = operatorSelectUl.children[0].dataset.value;
				for(var i = 0; i < operatorSelectUl.children.length; i++){
					operatorSelectUl.children[i].onmousedown = function(){
						operatorSelect.value = this.innerHTML;
						operatorSelect.name = this.dataset.value;
					}
				}
			}
		})
	}
}

function startbody(){
	//获取运营方下拉框数据
	DATALEFT = groupitem(1);
	//获取商品数据
	var commodityOperators = d('commodity_operators');
	var commodityStatus = d('commodity_status');
	$.ajax({
		type: 'post',
		url: URLZ + '/jf/bg/basic/gdsm/searchObjParam.json',
		data: {
			operatorID: loginUserName.operatorID,
			status: commodityStatus.name,
		},
		success: function(data){
			startbodyleft(data.obj);
		}
	});
	/*$.ajax({
		type: 'post',
		url: URLZ + '/jf/bg/basic/gdsm/getParam.json',
		data: {
			operatorID: loginUserName.operatorID,
		},
		success: function(data){
			//body左边部分渲染
			console.log(data);
			var commmodityLeft = data.obj;
			startbodyleft(commmodityLeft);
		}
	})*/
}

function startbodyleft(commmodityLeft){
	var obodyLeft = c('operator_body_left')[0];
	var OperatorBodyLeftUl = c('operator_body_left_ul')[0];
	if(OperatorBodyLeftUl != undefined){
		obodyLeft.removeChild(OperatorBodyLeftUl);
	}
	var ul = creat('ul');
	ul.className = 'operator_body_left_ul';
	for(var i = 0; i < commmodityLeft.length; i++){
		var divList = creat('li');
		divList.className = 'operator_body_left_list';
		divList.innerHTML = '<img src="image/spgl.png" /><span>' + commmodityLeft[i].waresName + '</span><div class="clear"></div>';
		divList.setAttribute('data-value',commmodityLeft[i].waresId);
		ul.appendChild(divList);
	}
	obodyLeft.appendChild(ul);

	var BodyLeftList = c('operator_body_left_list');
	//点击渲染右边数据
	for(var i = 0; i < BodyLeftList.length; i++){
		BodyLeftList[i].style.width = BodyLeftList[i].children[0].clientWidth + BodyLeftList[i].children[1].clientWidth + 10 + 'px';
		(function(q){
			BodyLeftList[q].onclick = function(){
				type = 0;
				for(var j = 0; j < BodyLeftList.length; j++){
					BodyLeftList[j].style.backgroundColor = "rgba(0,0,0,0)";
				}
				BodyLeftList[q].style.backgroundColor = "#e5e5e5";
				var thatName = this.dataset.value;
				var orightFootItem = c('operator_body_right_foot_item');
				for(var j = 0; j < orightFootItem.length; j++){
					orightFootItem[j].style.display = 'block';
				}
				//渲染运营方下拉框
				var operatorSelect = c('operator_select')[0];
				var operatorSelectUl = c('operator_select_ul')[0];
				if(operatorSelectUl != undefined){
					operatorSelectUl.parentNode.removeChild(operatorSelectUl);
				};
				function operatorSel(){
					var ul = creat('ul');
					ul.className = "operator_select_ul";
					ul.style.minWidth = operatorSelect.clientWidth + 'px';
					for(j = 0; j < DATALEFT.length; j++){
						var li = creat('li');
						li.innerHTML = DATALEFT[j].text;
						li.setAttribute('data-value',DATALEFT[j].operatorID);
						ul.appendChild(li);
					}
					operatorSelect.parentNode.appendChild(ul);
					var operatorSelectUl = c('operator_select_ul')[0];
					operatorSelect.onfocus = function(){
						operatorSelectUl.style.display = "inline";
					}
					operatorSelect.onblur = function(){
						operatorSelectUl.style.display = "none";
					}
					operatorSelect.value = operatorSelectUl.children[0].innerHTML;
					operatorSelect.name = operatorSelectUl.children[0].dataset.value;
					for(var j = 0; j < operatorSelectUl.children.length; j++){
						operatorSelectUl.children[j].onmousedown = function(){
							operatorSelect.value = this.innerHTML;
							operatorSelect.name = this.dataset.value;
						}
					}
				}
				if(loginUserName.operatorID == 1){
					operatorSel();
				}else{
					$.ajax({
						type: 'post',
						url: URLS + '/operate/getOperate.json',
						data: {
							operatorID: loginUserName.operatorID,
						},
						success: function(data){

							var ul = creat('ul');
							ul.className = "operator_select_ul";
							ul.style.minWidth = operatorSelect.clientWidth + 'px';
							var li = creat('li');
							li.innerHTML = data.operator;
							li.setAttribute('data-value',data.operatorID);
							ul.appendChild(li);
							operatorSelect.parentNode.appendChild(ul);
							var operatorSelectUl = c('operator_select_ul')[0];
							operatorSelect.onfocus = function(){
								operatorSelectUl.style.display = "inline";
							}
							operatorSelect.onblur = function(){
								operatorSelectUl.style.display = "none";
							}
							operatorSelect.value = operatorSelectUl.children[0].innerHTML;
							operatorSelect.name = operatorSelectUl.children[0].dataset.value;
							for(var i = 0; i < operatorSelectUl.children.length; i++){
								operatorSelectUl.children[i].onmousedown = function(){
									operatorSelect.value = this.innerHTML;
									operatorSelect.name = this.dataset.value;
								}
							}
						}
					})
				}
				//详细信息内容渲染
				var detailedOperatorId = d('commodity_operator');							//运营方
				var detailedOperatorNumbering = d('commodity_num');							//商品编号
				var detailedOperatorCompanyname = d('commodity_name');						//商品名称
				var detailedOperatorCompanyaddress = d('commodity_price');					//标准价格
				var commodityShelf = d('commodity_shelf');									//保质期
				var detailedOperatorPrincipal = c('model_multiple_div');					//货道规格
				var detailedOperatorPhone = c('detailed_operator_star');					//推荐星值
				var commodityCode = d('commodity_code');									//条码编号
				var detailedOperatorSparephone = d('commodity_Infrared');					//红外加热
				var detailedOperatorEmail = d('commodity_microwave');						//微波加热
				var commodityCooling = d('commodity_cooling');								//散热时间
				var commodityCooking = d('commodity_cooking');								//烹饪温度
				var commodityType = d('commodity_type');									//工艺类型
				var commoditySupplier = d('commodity_supplier');							//供应商
				var detailedOperatorPickimg = c('detailed_operator_pickimg')[0];			//选餐图片
				var detailedOperatorOrderimg = c('detailed_operator_orderimg')[0];			//下单图片
				var detailedOperatorIngredientimg = c('detailed_operator_ingredientimg')[0];//商品介绍
				var commodityRemark = d('commodity_remark');								//备注
				var detailedOperatorStop = d('detailed_operator_stop');						//停用
				detailedOperatorId.value = commmodityLeft[q].operParty;
				detailedOperatorId.name = commmodityLeft[q].operatorID;
				detailedOperatorNumbering.value = commmodityLeft[q].waresId;
				detailedOperatorCompanyname.value = commmodityLeft[q].waresName;
				detailedOperatorCompanyaddress.value = commmodityLeft[q].waresPrice;
				commodityShelf.value = commmodityLeft[q].quaGuaPeriod;
				//detailedOperatorPrincipal.value = commmodityLeft[q].principal;
				//detailedOperatorPhone.value = commmodityLeft[q].phone1;
				var theGoodsModel = commmodityLeft[q].theGoodsModel.split(',');
				for(var j = 0; j < detailedOperatorPrincipal.length; j++){
					detailedOperatorPrincipal[j].children[0].checked = false;
				}
				for(var j = 0; j < detailedOperatorPrincipal.length; j++){
					for(var k = 0; k < theGoodsModel.length; k++){
						if(detailedOperatorPrincipal[j].children[0].name == theGoodsModel[k]){
							detailedOperatorPrincipal[j].children[0].checked = 'checked';
						}
					}
				}
				for(var j = 0; j < detailedOperatorPhone.length; j++){
					detailedOperatorPhone[j].children[0].src = "image/dxs.png";
				}
				for(var j = 0; j < commmodityLeft[q].starValue; j++){
					detailedOperatorPhone[j].children[0].src = "image/dx.png";
				}
				commodityCode.value = commmodityLeft[q].barCodeNo;
				detailedOperatorSparephone.value = commmodityLeft[q].infraredheating;
				detailedOperatorEmail.value = commmodityLeft[q].microwaveheating;
				commodityCooling.value = commmodityLeft[q].heatDissipationTime;
				commodityCooking.value = commmodityLeft[q].cooking;
				commoditySupplier.value = commmodityLeft[q].supplier;
				commodityType.value = commmodityLeft[q].workmanshipName;
				commodityType.setAttribute('data-value',commmodityLeft[q].workmanshipId);
				detailedOperatorPickimg.innerHTML = commmodityLeft[q].waresImage1;
				d('detailed_operator_pickimg').setAttribute('data-url',commmodityLeft[q].waresImage1);
				detailedOperatorOrderimg.innerHTML = commmodityLeft[q].waresImage2;
				d('detailed_operator_orderimg').setAttribute('data-url',commmodityLeft[q].waresImage2);
				if(commmodityLeft[q].waresImage3 !== undefined){
					detailedOperatorIngredientimg.innerHTML = commmodityLeft[q].waresImage3;
					d('detailed_operator_ingredientimg').setAttribute('data-url',commmodityLeft[q].waresImage3);
				}else{
					detailedOperatorIngredientimg.innerHTML = "";
					d('detailed_operator_ingredientimg').setAttribute('data-url','');
				}
				commodityRemark.value = commmodityLeft[q].remark;
				if(commmodityLeft[q].dltflag == '0'){
					detailedOperatorStop.checked = "checked";
				}else{
					detailedOperatorStop.checked = false;
				}
				WmStartSelect();
			}
		})(i)
	}
}

//搜索商品列表
c('operator_home_head_submit')[0].onclick = function(){
	var orightFootItem = c('operator_body_right_foot_item');
	for(var i = 0; i < orightFootItem.length; i++){
		orightFootItem[i].style.display = 'none';
	}
	var commodityOperators = d('commodity_operators');
	var commodityStatus = d('commodity_status');
	$.ajax({
		type: 'post',
		url: URLZ + '/jf/bg/basic/gdsm/searchObjParam.json',
		data: {
			operatorID: commodityOperators.name,
			status: commodityStatus.name,
		},
		success: function(data){
			startbodyleft(data.obj);
		}
	})
}

//初始化渲染布局
window.onresize = function(){
	var Head = c('operator_head')[0];
	var obody = c('operator_body')[0];
	obody.style.height = window.innerHeight - Head.clientHeight - 119 + 'px';
}

let count = 0;
let deleteUrl = ['',''];
let deleteUrls = [''];

for(let i = 0; i < c('detailed_operator_int').length; i++){
	UploadOss(i);
}
//OSS文件上传事件(不包含商品介绍)

function UploadOss(num){
	var uploader = new plupload.Uploader({
		runtimes : 'html5,flash,silverlight,html4',
		browse_button : c('detailed_operator_int')[num],
		//multi_selection: false,
		container: c('detailed_operator_int')[num].parentNode,
		multi_selection: false,
		flash_swf_url : 'lib/plupload-2.1.2/js/Moxie.swf',
		silverlight_xap_url : 'lib/plupload-2.1.2/js/Moxie.xap',
		url : 'http://oss.aliyuncs.com',

		filters: {
			mime_types : [ //只允许上传图片和视频文件
				{title:"Image files", extensions : "jpg,jpeg,gif,png"}
			],
			max_file_size : '2mb', //最大只能上传200mb的文件
			prevent_duplicates : true, //不允许选取重复文件
			prevent_empty:true, //忽略空文件，大小为0kb的文件
		},
		init: {
			PostInit: function(up) {
				c('detailed_operator_int')[num].innerHTML = '请选择文件...';
				c('detailed_operator_img_btns')[num].onclick = function(){
					if(this.previousSibling.previousSibling.children.length === 0){
						alern('请添加一个图片在上传！');
						return false;
					};
					if(count === 1){
						alern('请等待上一个文件上传完毕再上传！');
						return false;
					}
					let detailedOperatorInt = c('detailed_operator_int');
						tbodyFileError = '';
					if(detailedOperatorInt.length === 0){
						alern('请添加资源后在保存！');
						return false;
					}
					/*if(detailedOperatorInt[num].dataset.name === ""){
						tbodyFileError += '广告名不能为空！<br/>';
					}else{
						tbodyFileObject.remark = detailedOperatorInt[num].dataset.name;
					}
					tbodyFileObject.type = detailedOperatorInt[num].dataset.type;
					if(up.files.length === 0){
						tbodyFileError += '未发现待上传的文件！<br/>';
					}
					if(tbodyFileError !== ""){
						alern(tbodyFileError);
						return false;
					}*/
					set_upload_param(up,'', false,'offical-web/hontech-rdcenter/commodity_board/');//commodity_board
				};
			},

			FilesAdded: function(up, files){
				if(up.files.length > 1){
					up.splice(0,1);
				}
				deleteUrl[num] = c('detailed_operator_img')[num].innerHTML;
				c('detailed_operator_img')[num].innerHTML = '';
				plupload.each(files, function(file)
				{
					c('detailed_operator_img')[num].innerHTML += '<div id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ')<b></b>'+'<div class="progress"><div class="progress-bar" style="width: 0%"></div></div>'+'</div>';
				});
			},
			BeforeUpload: function(up, file) {
				set_upload_param(up, file.name, true,'offical-web/hontech-rdcenter/commodity_board/');
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
					let detailedOperatorInt = c('detailed_operator_int');
					detailedOperatorInt[num].setAttribute('data-url',host + '/' + new_multipart_params.key);
					c('detailed_operator_img')[num].innerHTML = OSSURL + get_uploaded_object_name();
					c('detailed_operator_img')[num].setAttribute('data-url',deleteUrl[num]);
					/*$.ajax({
						type: 'post',
						url: URLS + '/oss/upload/saveUrl.json',
						data: {
							ossObjList: JSON.stringify(tbodyFileArray),
							operator: JSON.parse(sessionStorage.loginUserName).operatorID,
						},
						success: function(data){
							if(data.result === 1){
								alern('上传成功！');
							}else if(data.result === 0){
								alern('上传失败！');
							}else{
								alern('未知错误！');
							}
						},
						error: function(){
							alern('保存失败！');
						}
					});*/
					alern('上传成功！');
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
					alern('出现一个未知错误！');
					console.log(info.response);
					//document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = info.response;
				}
			},

			Error: function(up, err) {
				count = 0;
				if (err.code == -600) {
					alern("选择的文件太大了，请选择2M以内的文件上传！");
					//document.getElementById('console').appendChild(document.createTextNode("\n选择的文件太大了,可以根据应用情况，在upload.js 设置一下上传的最大大小"));
				}
				else if (err.code == -601) {
					alern("选择的文件后缀不对，目前仅支持图片类型：jpg,jpeg,gif,png；");
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

//商品介绍OSS文件上传
function UploadOssS(){
	var uploader = new plupload.Uploader({
		runtimes : 'html5,flash,silverlight,html4',
		browse_button : d('detailed_operator_ingredientimg'),
		//multi_selection: false,
		container: d('detailed_operator_ingredientimg').parentNode,
		multi_selection: false,
		flash_swf_url : 'lib/plupload-2.1.2/js/Moxie.swf',
		silverlight_xap_url : 'lib/plupload-2.1.2/js/Moxie.xap',
		url : 'http://oss.aliyuncs.com',

		filters: {
			mime_types : [ //只允许上传图片和视频文件
				{title:"Image files", extensions : "jpg,jpeg,gif,png"},
				{title:"Video files", extensions : "mp4,3gp,avi"}
			],
			max_file_size : '50mb', //最大只能上传200mb的文件
			prevent_duplicates : true, //不允许选取重复文件
			prevent_empty:true, //忽略空文件，大小为0kb的文件
		},
		init: {
			PostInit: function(up) {
				d('detailed_operator_ingredientimg').innerHTML = '请选择文件...';
				c('detailed_operator_img_btns_b')[0].onclick = function(){
					if(this.previousSibling.previousSibling.children.length === 0){
						alern('请添加一个图片在上传！');
						return false;
					};
					if(count === 1){
						alern('请等待上一个文件上传完毕再上传！');
						return false;
					}
					let detailedOperatorIngredientimg = d('detailed_operator_ingredientimg');
					if(detailedOperatorIngredientimg.length === 0){
						alern('请添加资源后在保存！');
						return false;
					}
					set_upload_param(up,'', false,'offical-web/hontech-rdcenter/commodity_board/');
				};
			},

			FilesAdded: function(up, files){
				if(up.files.length > 1){
					up.splice(0,1);
				}
				deleteUrls = c('detailed_operator_imgs')[0].innerHTML;
				c('detailed_operator_imgs')[0].innerHTML = '';
				plupload.each(files, function(file)
				{
					c('detailed_operator_imgs')[0].innerHTML += '<div id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ')<b></b>'+'<div class="progress"><div class="progress-bar" style="width: 0%"></div></div>'+'</div>';
				});
			},
			BeforeUpload: function(up, file) {
				set_upload_param(up, file.name, true,'offical-web/hontech-rdcenter/commodity_board/');
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
					let detailedOperatorIngredientimg = d('detailed_operator_ingredientimg');
					detailedOperatorIngredientimg.setAttribute('data-url',host + '/' + new_multipart_params.key);
					c('detailed_operator_imgs')[0].innerHTML = OSSURL + get_uploaded_object_name();
					c('detailed_operator_imgs')[0].setAttribute('data-url',deleteUrls);
					/*$.ajax({
						type: 'post',
						url: URLS + '/oss/upload/saveUrl.json',
						data: {
							ossObjList: JSON.stringify(tbodyFileArray),
							operator: JSON.parse(sessionStorage.loginUserName).operatorID,
						},
						success: function(data){
							if(data.result === 1){
								alern('上传成功！');
							}else if(data.result === 0){
								alern('上传失败！');
							}else{
								alern('未知错误！');
							}
						},
						error: function(){
							alern('保存失败！');
						}
					});*/
					alern('上传成功！');
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
					alern('出现一个未知错误！');
					console.log(info.response);
					//document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = info.response;
				}
			},

			Error: function(up, err) {
				count = 0;
				if (err.code == -600) {
					alern("选择的文件太大了，请选择2M以内的文件上传！");
					//document.getElementById('console').appendChild(document.createTextNode("\n选择的文件太大了,可以根据应用情况，在upload.js 设置一下上传的最大大小"));
				}
				else if (err.code == -601) {
					alern("选择的文件后缀不对，目前仅支持图片类型：jpg,jpeg,gif,png；");
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
UploadOssS();

var operatorStars = 0;
function submit(){
	var bodyCreat = d('body_creat');
	var bodySubmit = d('body_submit');

	//检测条码编号是否重复
	/*d('commodity_code').onchange = function(){
		var that = this;
		console.log(d('commodity_operator').name);
		console.log(that.value);
	}*/

	var operatorStar = c('detailed_operator_star');	//推荐星值打星
	for(var i = 0; i < operatorStar.length; i++){
		(function(q){
			operatorStar[q].onclick = function(){
				for(var j = 0; j < operatorStar.length; j++){
					operatorStar[j].children[0].src = 'image/dxs.png';
				}
				for(var j = 0; j < (q+1); j++){
					operatorStar[j].children[0].src = 'image/dx.png';
					operatorStars = j+1;
				}
			}
		})(i)
	}

	d('commodity_Infrared').onchange = function(){
		if(this.value > 600){
			this.value = 0;
			alern('红外加热时长必须介于0 - 600');
		}
		if(this.value < 0){
			this.value = 0;
			alern('红外加热时长必须介于0 - 600');
		}
		if(this.value == ""){
			this.value = 0;
			alern('红外加热时长不能为空！');
		}
	}
	d('commodity_Infrared').oninput = function(){
		this.value=this.value.replace(/[^0-9]/);
	}

	d('commodity_microwave').onchange = function(){
		if(this.value > 600){
			this.value = 0;
			alern('微波加热时长必须介于0 - 600');
		}
		if(this.value < 0){
			this.value = 0;
			alern('微波加热时长必须介于0 - 600');
		}
		if(this.value == ""){
			this.value = 0;
			alern('微波加热时长不能为空！');
		}
	}
	d('commodity_microwave').oninput = function(){
		this.value=this.value.replace(/[^0-9]/);
	}

	d('commodity_cooking').onchange = function(){
		if(this.value > 300){
			this.value = 0;
			alern('烹饪温度必须介于0 - 300');
		}
		if(this.value < 0){
			this.value = 0;
			alern('烹饪温度必须介于0 - 300');
		}
		if(this.value == ""){
			this.value = 0;
			alern('烹饪温度不能为空！');
		}
	}
	d('commodity_cooking').oninput = function(){
		this.value=this.value.replace(/[^0-9]/);
	}

	//标准价格
	d('commodity_price').oninput = function(){
		console.log(this.value);
		console.log(this.value.length);
		/*if(this.value > 10000){
			alern('不能超过10000');
			this.value = 10000;
		}
		this.value<0.01?this.value=0.01:this.value=this.value;
		if(this.value.split(".")[1] != undefined){
			if(this.value.split(".")[1].length > 2){
				var that = "";
				for(var i = 0; i < this.value.length - this.value.split(".")[1].length + 1; i++){
					that += this.value[i];
				}
				this.value = that;
			}
		}*/
	}

	//图片上传
	var OperatorPickimg = d('detailed_operator_pickimg');
	var detailedOperatorPickimg = c('detailed_operator_pickimg')[0];
	var OperatorOrderimg = d('detailed_operator_orderimg');
	var detailedOperatorOrderimg = c('detailed_operator_orderimg')[0];
	var OperatorIngredientimg = d('detailed_operator_ingredientimg');
	var detailedOperatorIngredientimg = c('detailed_operator_ingredientimg')[0];
	var operatorPickimgBtn = d('detailed_operator_pickimg_btn');
	var operatorOrderimgBtn = d('detailed_operator_orderimg_btn');
	var operatorIngredientimgBtn = d('detailed_operator_ingredientimg_btn');
	let detailedOperatorImg = c('detailed_operator_img');
	let detailedOperatorImgS = c('detailed_operator_imgs');
	let	OperatorPickimgBase = d('detailed_operator_pickimg').dataset.url;			//创建选餐图片
	let	OperatorOrderimgBase = d('detailed_operator_orderimg').dataset.url;			//创建下单图片
	let	OperatorIngredientimgBase = d('detailed_operator_ingredientimg').dataset.url;	//创建商品介绍
	var imageFixed = c('image_fixed')[0];
	let imageFixeds = c('image_fixeds')[0];
	/*OperatorPickimg.onchange = function(e){
		var reader = new FileReader();
		console.log(this.files[0]);
		reader.readAsDataURL(this.files[0]);
		reader.onload=function(oFREvent){
			OperatorPickimgBase = oFREvent.target.result;
		}
		detailedOperatorPickimg.innerHTML = this.value;
	}
	OperatorOrderimg.onchange = function(e){
		var reader = new FileReader();
		reader.readAsDataURL(this.files[0]);
		reader.onload=function(oFREvent){
			OperatorOrderimgBase = oFREvent.target.result;
		}
		detailedOperatorOrderimg.innerHTML = this.value;
	}
	OperatorIngredientimg.onchange = function(e){
		var reader = new FileReader();
		reader.readAsDataURL(this.files[0]);
		reader.onload=function(oFREvent){
			OperatorIngredientimgBase = oFREvent.target.result;
		}
		detailedOperatorIngredientimg.innerHTML = this.value;
	}*/
	operatorPickimgBtn.onclick = function(){
		if(this.previousSibling.previousSibling.dataset.url){
			imageFixed.style.display = 'block';
			imageFixed.children[0].src = this.previousSibling.previousSibling.dataset.url;
			imageFixed.children[0].onload = function(){
				imageFixed.children[0].style.height = 'auto';
				imageFixed.children[0].style.width = 'auto';
				if(imageFixed.clientHeight < imageFixed.children[0].clientHeight){
					imageFixed.children[0].style.height = imageFixed.clientHeight - 50 + 'px';
				}
				if(imageFixed.clientWidth < imageFixed.children[0].clientWidth){
					imageFixed.children[0].style.width = imageFixed.clientWidth - 50 + 'px';
				}
				imageFixed.children[0].style.marginTop = (imageFixed.clientHeight - imageFixed.children[0].clientHeight)/2 + 'px';
			}
			imageFixed.children[0].onerror = function(){
				alern('发生错误或是该资源不存在！');
			}
		}else{
			alern('未上传图片');
		}
	}
	operatorOrderimgBtn.onclick = function(){
		if(this.previousSibling.previousSibling.dataset.url){
			imageFixed.style.display = 'block';
			imageFixed.children[0].src = this.previousSibling.previousSibling.dataset.url;
			imageFixed.children[0].onload = function(){
				imageFixed.children[0].style.height = 'auto';
				imageFixed.children[0].style.width = 'auto';
				if(imageFixed.clientHeight < imageFixed.children[0].clientHeight){
					imageFixed.children[0].style.height = imageFixed.clientHeight - 50 + 'px';
				}
				if(imageFixed.clientWidth < imageFixed.children[0].clientWidth){
					imageFixed.children[0].style.width = imageFixed.clientWidth - 50 + 'px';
				}
				imageFixed.children[0].style.marginTop = (imageFixed.clientHeight - imageFixed.children[0].clientHeight)/2 + 'px';
			}
			imageFixed.children[0].onerror = function(){
				alern('发生错误或是该资源不存在！');
			}
		}else{
			alern('未上传图片');
		}
	}
	operatorIngredientimgBtn.onclick = function(){
		let thisSplit = this.previousSibling.previousSibling.dataset.url.split('.');
		if(this.previousSibling.previousSibling.dataset.url){
			if(thisSplit[thisSplit.length-1] == 'mp4'||thisSplit[thisSplit.length-1] == '3gp'||thisSplit[thisSplit.length-1] == 'avi'){
				loading('加载资源');
				imageFixeds.innerHTML = '';
				let video = creat('video');
				video.autoplay = 'autoplay';
				video.controls = 'controls';
				video.src = this.previousSibling.previousSibling.dataset.url;
				imageFixeds.appendChild(video);
				imageFixeds.children[0].oncanplay = function(){
					loadingClear();
					imageFixeds.style.display = 'block';
					imageFixeds.children[0].style.height = 'auto';
					imageFixeds.children[0].style.width = 'auto';
					if(imageFixeds.clientHeight < imageFixeds.children[0].clientHeight){
						imageFixeds.children[0].style.height = imageFixeds.clientHeight - 50 + 'px';
					}
					if(imageFixeds.clientWidth < imageFixeds.children[0].clientWidth){
						imageFixeds.children[0].style.width = imageFixeds.clientWidth - 50 + 'px';
					}
					imageFixeds.children[0].style.marginTop = (imageFixeds.clientHeight - imageFixeds.children[0].clientHeight)/2 + 'px';
				}
				imageFixeds.children[0].onerror = function(){
					alern('发生错误或是该资源不存在！');
					loadingClear();
				}
			}else{
				loading('加载资源');
				imageFixeds.style.display = 'block';
				imageFixeds.innerHTML = '';
				let img = creat('img');
				img.src = this.previousSibling.previousSibling.dataset.url;
				imageFixeds.appendChild(img);
				imageFixeds.children[0].onload = function(){
					loadingClear();
					imageFixeds.children[0].style.height = 'auto';
					imageFixeds.children[0].style.width = 'auto';
					if(imageFixeds.clientHeight < imageFixeds.children[0].clientHeight){
						imageFixeds.children[0].style.height = imageFixeds.clientHeight - 50 + 'px';
					}
					if(imageFixeds.clientWidth < imageFixeds.children[0].clientWidth){
						imageFixeds.children[0].style.width = imageFixeds.clientWidth - 50 + 'px';
					}
					imageFixeds.children[0].style.marginTop = (imageFixeds.clientHeight - imageFixeds.children[0].clientHeight)/2 + 'px';
				}
				imageFixeds.children[0].onerror = function(){
					alern('发生错误或是该资源不存在！');
					loadingClear();
				}
			}
		}else{
			alern('未上传资源');
		}
	}
	imageFixed.onclick = function(){
		this.style.display = 'none';
	}
	imageFixeds.onclick = function(){
		this.style.display = 'none';
	}

	//商品介绍资源清空按钮
	d('detailed_operator_ingredientimg_delete_btn').onclick = function(){
		if(c('detailed_operator_imgs')[0].innerHTML){
			c('detailed_operator_imgs')[0].setAttribute('data-url',c('detailed_operator_imgs')[0].innerHTML);
			c('detailed_operator_imgs')[0].innerHTML = '';
			d('detailed_operator_ingredientimg').setAttribute('data-url','');
		}else{
			alern('没有内容！');
		}
	}

	bodyCreat.onclick = function(){
		type = 1;
		var orightFootItem = c('operator_body_right_foot_item');
		for(var i = 0; i < orightFootItem.length; i++){
			orightFootItem[i].style.display = 'block';
		}
		d('commodity_operator').value = "";									//运营方
		d('commodity_operator').name = "";									//运营方
		d('commodity_num').value = "";										//商品编号
		d('commodity_name').value = "";										//商品名称
		d('commodity_price').value = "";									//标准价格
		d('commodity_shelf').value = "";									//保质期
		for(var i = 0; i < d('model_multiple').children.length-1; i++){		//货道规格
			d('model_multiple').children[i].children[0].checked = false;
		}
		for(var i = 0; i < c('detailed_operator_star').length; i++){		//推荐星值
			c('detailed_operator_star')[i].children[0].src = "image/dxs.png";
		}
		operatorStars = 0;
		d('commodity_code').value = "";										//条形编码
		d('commodity_Infrared').value = "0";								//红外加热
		d('commodity_microwave').value = "0";								//微博加热
		d('commodity_cooling').value = "15";								//散热时间
		d('commodity_cooking').value = "0";									//烹饪温度
		d('commodity_supplier').value = "";									//供应商
		c('detailed_operator_pickimg')[0].innerHTML = "";					//选餐图片
		d('detailed_operator_pickimg').value = "";					
		d('detailed_operator_pickimg').setAttribute('data-url','');					
		c('detailed_operator_orderimg')[0].innerHTML = "";					//下单图片
		d('detailed_operator_orderimg').value = "";
		d('detailed_operator_orderimg').setAttribute('data-url','');					
		c('detailed_operator_ingredientimg')[0].innerHTML = "";				//商品介绍
		d('detailed_operator_ingredientimg').value = "";
		d('detailed_operator_ingredientimg').setAttribute('data-url','');			
		d('commodity_remark').value = "";									//备注
		d('detailed_operator_stop').checked = false;						//停用启用
		
		var BodyLeftList = c('operator_body_left_list');
		for(var j = 0; j < BodyLeftList.length; j++){
			BodyLeftList[j].style.backgroundColor = "rgba(0,0,0,0)";
		}

		//渲染运营方下拉框
		var operatorSelect = c('operator_select')[0];
		var operatorSelectUl = c('operator_select_ul')[0];
		if(operatorSelectUl != undefined){
			operatorSelectUl.parentNode.removeChild(operatorSelectUl);
		};
		function operatorSel(){
			var ul = creat('ul');
			ul.className = "operator_select_ul";
			ul.style.minWidth = operatorSelect.clientWidth + 'px';
			for(i = 0; i < DATALEFT.length; i++){
				var li = creat('li');
				li.innerHTML = DATALEFT[i].text;
				li.setAttribute('data-value',DATALEFT[i].operatorID);
				ul.appendChild(li);
			}
			operatorSelect.parentNode.appendChild(ul);
			var operatorSelectUl = c('operator_select_ul')[0];
			operatorSelect.onfocus = function(){
				operatorSelectUl.style.display = "inline";
			}
			operatorSelect.onblur = function(){
				operatorSelectUl.style.display = "none";
			}
			operatorSelect.value = operatorSelectUl.children[0].innerHTML;
			operatorSelect.name = operatorSelectUl.children[0].dataset.value;
			for(var i = 0; i < operatorSelectUl.children.length; i++){
				operatorSelectUl.children[i].onmousedown = function(){
					operatorSelect.value = this.innerHTML;
					operatorSelect.name = this.dataset.value;
				}
			}
		}
		if(loginUserName.operatorID == 1){
			operatorSel();
		}else{
			$.ajax({
				type: 'post',
				url: URLS + '/operate/getOperate.json',
				data: {
					operatorID: loginUserName.operatorID,
				},
				success: function(data){

					var ul = creat('ul');
					ul.className = "operator_select_ul";
					ul.style.minWidth = operatorSelect.clientWidth + 'px';
					var li = creat('li');
					li.innerHTML = data.operator;
					li.setAttribute('data-value',data.operatorID);
					ul.appendChild(li);
					operatorSelect.parentNode.appendChild(ul);
					var operatorSelectUl = c('operator_select_ul')[0];
					operatorSelect.onfocus = function(){
						operatorSelectUl.style.display = "inline";
					}
					operatorSelect.onblur = function(){
						operatorSelectUl.style.display = "none";
					}
					operatorSelect.value = operatorSelectUl.children[0].innerHTML;
					operatorSelect.name = operatorSelectUl.children[0].dataset.value;
					for(var i = 0; i < operatorSelectUl.children.length; i++){
						operatorSelectUl.children[i].onmousedown = function(){
							operatorSelect.value = this.innerHTML;
							operatorSelect.name = this.dataset.value;
						}
					}
				}
			})
		}
	}
	bodySubmit.onclick = function(){
		//详细信息提交
		var commodityOperator = d('commodity_operator').name;			//运营方ID
		var commodityOperatorV = d('commodity_operator').value;			//运营方名称
		var commodityNum = d('commodity_num').value;					//商品编号
		var commodityName = d('commodity_name').value;					//商品名称
		var commodityPrice = d('commodity_price').value;				//标准价格
		var commodityShelf = d('commodity_shelf').value;				//保质期
		var modelMultipleDiv = "";										//货道规格
		for(var i = 0; i < c('model_multiple_div').length; i++){
			if(c('model_multiple_div')[i].children[0].checked){
				modelMultipleDiv += c('model_multiple_div')[i].children[0].name + ",";
			}
		}
		var modelMultipleDivs = "";
		for(var i = 0; i < modelMultipleDiv.length-1; i++){
			modelMultipleDivs += modelMultipleDiv[i];
		}								//推荐星值
		var commodityCode = d('commodity_code').value;					//条形编码
		var commodityInfrared = d('commodity_Infrared').value;			//红外加热
		var commodityMicrowave = d('commodity_microwave').value;		//微博加热
		var commodityCooling = d('commodity_cooling').value;			//散热时间
		var commodityCooking = d('commodity_cooking').value;			//烹饪温度
		var commoditySupplier = d('commodity_supplier').value;			//供应商
		var commodityType = d('commodity_type').dataset.value;			//工艺类型(编号)
		var commodityTypeName = d('commodity_type').value;				//工艺类型(名称)
		OperatorPickimgBase = d('detailed_operator_pickimg').dataset.url;			//创建选餐图片
		OperatorOrderimgBase = d('detailed_operator_orderimg').dataset.url;			//创建下单图片
		OperatorIngredientimgBase = d('detailed_operator_ingredientimg').dataset.url;	//创建商品介绍
		var OperatorPickimgBases = d('detailed_operator_pickimg').dataset.url;			//修改选餐图片
		var OperatorOrderimgBases = d('detailed_operator_orderimg').dataset.url;		//修改下单图片
		var OperatorIngredientimgBases = d('detailed_operator_ingredientimg').dataset.url;	//修改商品介绍
		var commodityRemark = d('commodity_remark').value;				//备注
	 	if(d('detailed_operator_stop').checked){						//停用启用
	 		var detailedOperatorStop = 0;
	 	}else{
	 		var detailedOperatorStop = 1;
	 	}
	 	var commodityError = "";

		if(d('commodity_operator').value == ""||d('commodity_operator').name== ""){
			commodityError += '运营方不能为空<br/>';
		}
		if(d('commodity_name').value == ""){
			commodityError += '商品名称不能为空<br/>';
		}
		if(d('commodity_price').value == ""){
			commodityError += '标准价格不能为空<br/>';
		}
		if(modelMultipleDivs == ""){
			commodityError += '货道规格不能为空<br/>';
		}
		if(d('commodity_shelf').value == ""){
			commodityError += '保质期不能为空<br/>';
		}
		if(commodityError != ""){
			alern(commodityError);
			return false;
		}
		loading();
		//检测条码是否重复
		$.ajax({
			type: 'post',
			url: URLZ + '/jf/bg/basic/gdsm/check.json',
			data: {
				opreatorId: d('commodity_operator').name,
				barCodeNo: d('commodity_code').value,
			},
			async: false,
			success: function(data){
				if(data.obj != 0){
					if(data.obj.waresId != commodityNum){
						alern('条码与'+data.obj.waresName+'重复!');
						d('commodity_code').value = "";
						loadingClear();
						return false;
					}
				}
				
				var commodityobj = new Object();
				commodityobj.operatorID = commodityOperator;
				commodityobj.operParty = commodityOperatorV;
				commodityobj.waresId = commodityNum;
				commodityobj.waresName = commodityName;
				commodityobj.waresPrice = commodityPrice;
				commodityobj.quaGuaPeriod = commodityShelf;
				commodityobj.theGoodsModel = modelMultipleDivs;
				commodityobj.starValue = operatorStars;
				commodityobj.barCodeNo = commodityCode;
				commodityobj.infraredheating = commodityInfrared;
				commodityobj.microwaveheating = commodityMicrowave;
				commodityobj.heatDissipationTime = commodityCooling;
				commodityobj.cooking = commodityCooking;
				commodityobj.supplier = commoditySupplier;
				commodityobj.workmanshipId = commodityType;
				commodityobj.workmanshipName = commodityTypeName;
				commodityobj.remark = commodityRemark;
				commodityobj.dltflag = detailedOperatorStop;
				commodityobj.updateBy = loginUserName.empcode;
				if(type == 1){
					$.ajax({
						type: 'post',
						url: URLS + '/jf/bg/basic/gdsm/add.json',
						data: {
							obj: JSON.stringify(commodityobj),
							picture1: OperatorPickimgBase,
							picture2: OperatorOrderimgBase,
							picture3: OperatorIngredientimgBase,
						},
						success: function(data){
							alert('保存成功');
							loadingClear();
							startbody();
							c('operator_home_head_submit')[0].click();
						}
					})
				}else if(type == 0){
					if(OperatorPickimgBase != ""){
						OperatorPickimgBases = OperatorPickimgBase;
					}
					if(OperatorOrderimgBase != ""){
						OperatorOrderimgBases = OperatorOrderimgBase;
					}
					if(OperatorIngredientimgBase != ""){
						OperatorIngredientimgBases = OperatorIngredientimgBase;
					}
					$.ajax({
						type: 'post',
						url: URLS + '/jf/bg/basic/gdsm/update.json',
						data: {
							obj: JSON.stringify(commodityobj),
							picture1: OperatorPickimgBases,
							picture2: OperatorOrderimgBases,
							picture3: OperatorIngredientimgBases,
						},
						success: function(data){
							for(let i = 0; i < detailedOperatorImg.length; i++){
								if(detailedOperatorImg[i].dataset.url){
									$.ajax({
										type: 'post',
										url: URLS + '/oss/upload/deleteOssUrl.json',
										data: {
											ossUrl: detailedOperatorImg[i].dataset.url,
											setUrl: 'offical-web/hontech-rdcenter/commodity_board/',
										},
										async: false,
										success: function(data){
											if(data.result === 1){
												console.log('OSS资源删除成功！');
											}else if(data.result === 0){
												console.log('OSS资源删除失败！');
											}else{
												console.log('OSS资源删除出现未知错误！');
											}
										}
									})
								}
							}
							for(let i = 0; i < detailedOperatorImgS.length; i++){
								if(detailedOperatorImgS[i].dataset.url){
									$.ajax({
										type: 'post',
										url: URLS + '/oss/upload/deleteOssUrl.json',
										data: {
											ossUrl: detailedOperatorImgS[i].dataset.url,
											setUrl: 'offical-web/hontech-rdcenter/commodity_board/',
										},
										async: false,
										success: function(data){
											if(data.result === 1){
												console.log('OSS资源删除成功！');
											}else if(data.result === 0){
												console.log('OSS资源删除失败！');
											}else{
												console.log('OSS资源删除出现未知错误！');
											}
										}
									})
								}
							}
							alert('保存成功');
							loadingClear();
							startbody();
							c('operator_home_head_submit')[0].click();
						}
					})
				}else{
					alern('请先点击创建或选择商品！');
				}
			}
		})
	}
}

//删除商品事件
d('detailed_operator_delete').onclick = function(){
	var CommodityNum = d('commodity_num').value;	//商品编号
	var DetailedOperatorPickimg = c('detailed_operator_pickimg')[0].innerHTML;				//商品图片
	var DetailedOperatorOrderimg = c('detailed_operator_orderimg')[0].innerHTML;			//下单图片
	var DetailedOperatorIngredientimg = c('detailed_operator_ingredientimg')[0].innerHTML;	//商品介绍
	CommodityNum?commodityGetData(1):commodityGetData(2);

	function commodityGetData(num){
		if(num == 1){
			$.ajax({
				type: 'post',
				url: URLS + '/jf/bg/basic/gdsm/judge.json',
				data: {
					id: CommodityNum,
				},
				success: function(data){
					console.log(data);
					if(data.code == 10001||data.code == 10002){
						if(confirm(data.msg)){
							loading();
							$.ajax({
								type: 'post',
								url: URLS + '/jf/bg/basic/gdsm/remove.json',
								data: {
									id: CommodityNum,
								},
								success: function(msg){
									alern(msg.msg);
									loadingClear();
									startbody();
									c('operator_home_head_submit')[0].click();
									if(msg.code == 10001){
										var DetailedOperatorImages = [];
										DetailedOperatorPickimg?DetailedOperatorImages.push(DetailedOperatorPickimg):false;
										DetailedOperatorOrderimg?DetailedOperatorImages.push(DetailedOperatorOrderimg):false;
										DetailedOperatorIngredientimg?DetailedOperatorImages.push(DetailedOperatorIngredientimg):false;
										console.log(DetailedOperatorImages);
										for(var i = 0; i < DetailedOperatorImages.length; i++){
											$.ajax({
												type: 'post',
												url: URLS + '/oss/upload/deleteOssUrl.json',
												data: {
													ossUrl: DetailedOperatorImages[i],
													setUrl: 'offical-web/hontech-rdcenter/commodity_board/',
												},
												async: false,
												success: function(data){
													if(data.result === 1){
														console.log('OSS资源删除成功！');
													}else if(data.result === 0){
														console.log('OSS资源删除失败！');
													}else{
														console.log('OSS资源删除出现未知错误！');
													}
												}
											})
										}
									}
								}
							})
						}
					}else{
						alern(data.msg);
					}
				}
			});
		}else if(num == 2){
			alern('没有指定要删除的商品！');
			return false;
		}
	}
}

start();
startbody();

submit();