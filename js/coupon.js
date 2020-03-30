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
		url: URLS + '/jf/com/free/auto/getnum.json',
		data: {},
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
					divd.innerHTML = datas[i].num;
					dive.innerHTML = datas[i].price;
					divf.innerHTML = datas[i].deadline;
					var datasI = JSON.stringify(datas[i]);
					divg.innerHTML = '<button data-value=\''+datasI+'\' onclick="startGetListView(this)">查看</button><button data-value=\''+datasI+'\' onclick="startGetListCreat(this)">生成</button><button data-value=\''+datasI+'\' onclick="startGetListDelete(this)">删除</button>';
					divh.innerHTML = '<button onclick="startGetListViewMach(this)" data-value=\''+datasI+'\'>查看设备</button>';
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


/*//列表修改按钮
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
}*/

//点击×关闭查看列表事件
c('coupon_fixed_body_clear')[0].onclick = function(){
	this.parentNode.parentNode.parentNode.style.display = 'none';
}


//列表查看按钮
function startGetListView(that){
	that = JSON.parse(that.dataset.value);
	$.ajax({
		type: 'post',
		url: URLS + '/jf/com/free/auto/getfree.json',
		data: {
			code: that.code,
		},
		success: function(data){
			if(data.code == 10001){
				var couponFixed = c('coupon_fixed')[0],
					couponFixedBodyHomeTbody = c('coupon_fixed_body_home_tbody')[0];
				couponFixed.style.display = 'block';
				couponFixedBodyHomeTbody.innerHTML = "";
				for(var i = 0; i < data.data.length; i++){
					var tr = creat('tr'),
						tda = creat('td'),
						tdb = creat('td'),
						tdc = creat('td'),
						tdd = creat('td');
						tde = creat('td');
						tdf = creat('td');
					tda.innerHTML = i + 1;
					tdb.innerHTML = data.data[i].name;
					tdc.innerHTML = data.data[i].numCode;
					tdd.innerHTML = data.data[i].code;
					tde.innerHTML = data.data[i].amount;
					tdf.innerHTML = that.deadline;
					tr.appendChild(tda);
					tr.appendChild(tdb);
					tr.appendChild(tdc);
					tr.appendChild(tdd);
					tr.appendChild(tde);
					tr.appendChild(tdf);
					couponFixedBodyHomeTbody.appendChild(tr);
				}
			}else{
				alern(data.msg);
			}
		},
		error: function(data){
			alern('发生错误，请重试！');
		}
	})
}

//列表生成按钮
function startGetListCreat(that){
	$.ajax({
		type: 'post',
		url: URLS + '/jf/com/free/auto/getfree.json',
		data: {
			code: JSON.parse(that.dataset.value).code,
		},
		success: function(data){
			if(data.code == 10001){
				var startTime = new Date(JSON.parse(that.dataset.value).deadline);
				var endTime = new Date();
				if(startTime.getTime() <= endTime.getTime()){
					alern('该优惠券已过期！');
					return false;
				}
				if(confirm('确认要生成该优惠券二维码吗？')){
					var arr = data.data;
				    var code = creat('div');
				    var newDate = new Date().getTime();
				    for(let i in arr){
				    	var qrcode = new QRCode(code, {
					        width: 100,//设置宽高
					        height: 100,
					    })
					    qrcode.makeCode(arr[i].code + '' + newDate + '&' + arr[i].code.length);
				    }
				    for(let i = code.children.length; i > 0; i--){
				    	i%2 != 0?code.removeChild(code.children[i-1]):false;
				    }
				    let down = d('down');
				    let arrImg = [];
				    for(let i in code.children){
				    	code.children[i].onload = function(){
				    		arrImg.push(this.src);
				    		Number(i) + 1 == arr.length?arrImgload():false;
				    	}
				    }
				    function download(name, href) {
					    var a = document.createElement("a"), //创建a标签
					        e = document.createEvent("MouseEvents"); //创建鼠标事件对象
					    e.initEvent("click", false, false); //初始化事件对象
					    a.href = href; //设置下载地址
					    a.download = name; //设置下载文件名
					    a.dispatchEvent(e); //给指定的元素，执行事件click事件
					}
				    function arrImgload(){
				    	let i = 0;
			    		var timeor = setInterval(function(){
			    			if(i < arrImg.length){
					    		download('优惠券' + arr[0].numCode + '(' + (Number(i) + 1) + ')' + '.png',arrImg[i]);
					    		i++;
			    			}else{
			    				clearInterval(timeor);
			    			}
			    		},10);
				    }
				}
			}
		}
	})
}

//列表删除按钮
function startGetListDelete(that){
	console.log(JSON.parse(that.dataset.value).code);
	if(confirm('确认要删除当前优惠券吗？')){
		loading('删除中');
		$.ajax({
			type: 'post',
			url: URLS + '/jf/com/free/auto/delete.json',
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

//列表查看设备按钮
function startGetListViewMach(that){
	var thatData = JSON.parse(that.dataset.value);
	var machCodeListArr = JSON.parse(thatData.arrmach);
	var machCodeList = [];
	for(var i = 0; i < machCodeListArr.length; i++){
		machCodeList.push(machCodeListArr[i]);
	}
	var machCodeListAlern = '',machCodeListAlernCount = 0;;
	machCodeListAlern = '<p style="font-size: 14px; margin-bottom: 10px;">该优惠券应用设备如下(共<span class="alern_span" style="color: #F05555; padding-left: 2px; padding-right: 2px;"></span>台)：</p>'
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
		d('coupon_name').value = "";	//优惠券名称
		d('coupon_num').value = "";		//优惠券数量
		d('coupon_money').value = "";	//优惠券金额
		d('coupon_date').value = "";	//过期日期
		c('discount_left_p_span')[0].innerHTML = '请选择设备...';
		c('discount_left_p_int')[0].checked = false;
		var discountLeftUlLiInt = c('discount_left_ul_li_int');	//设备编号
		for(var i = 0; i < discountLeftUlLiInt.length; i++){
			discountLeftUlLiInt[i].checked = false;
		}
		start(2);
	};

	d('discount_right_body_submit').onclick = function(){
		var couponName = d('coupon_name').value;	//优惠券名称
		var couponNum = Number(d('coupon_num').value);		//优惠券数量
		var couponMoney = Number(d('coupon_money').value);	//优惠券金额
		var couponDate = d('coupon_date').value;	//过期日期
		var discountLeftUlLiInt = c('discount_left_ul_li_int');	//设备编号
		var discountLeftUlLiIntString = '';			//最终被提交的设备编号字符串	
		for(var i = 0; i < discountLeftUlLiInt.length; i++){
			if(discountLeftUlLiInt[i].checked){
				discountLeftUlLiIntString += discountLeftUlLiInt[i].dataset.value + ',';
			}
		}
		discountLeftUlLiIntString = discountLeftUlLiIntString.substring(0,discountLeftUlLiIntString.length-1)

		var discountObject = {};
		var disconntError = "";

		discountObject.name = couponName;
		discountObject.num  = couponNum;
		discountObject.price = couponMoney;
		discountObject.deadline = couponDate;
		discountObject.arrMach = [];
		if(!couponName){
			disconntError += '优惠券名称不能为空！<br/>';
		}
		if(!couponNum){
			disconntError += '优惠券数量不能为空！<br/>';
		}
		if(!couponMoney){
			disconntError += '优惠券金额不能为空！<br/>';
		}
		if(!couponDate){
			disconntError += '有效截止日期不能为空！<br/>';
		}else{
			var startTime = new Date(couponDate);
			var endTime = new Date();
			if(startTime.getTime() <= endTime.getTime()){
				disconntError += '有效截止日期不正确！<br/>';
			}
		}
		if(discountLeftUlLiIntString){
			var discountLeftUlLiIntStringArr = discountLeftUlLiIntString.split(',');
			for(var i = 0; i < discountLeftUlLiIntStringArr.length; i++){
				discountObject.arrMach.push(discountLeftUlLiIntStringArr[i]);
			}
		}
		if(discountObject.arrMach.length <= 0){
			disconntError += '至少选择一台设备！<br/>';
		};
		if(disconntError){
			alern(disconntError);
			return false;
		}
		loading('保存中');
		$.ajax({
			type: 'post',
			url: URLS + '/jf/com/free/auto/add.json',
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