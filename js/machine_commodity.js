//在售管理
function zsStart(machCODE){
	var priceDiv = c('user_body_right_foot_item_price')[0];
	var stockDiv = c('user_body_right_foot_item_stock')[0];
	priceDiv.style.height = window.innerHeight - 430 + 'px';
	stockDiv.style.height = window.innerHeight - 430 + 'px';

	var priceTbody = c('user_body_right_foot_item_price_tbody')[0];	//价格
	var stockTbody = c('user_body_right_foot_item_stock_tbody')[0];	//库存

	var itemBtnda = c('user_body_right_foot_item_btnda')[0];		//一键清空
	var itemBtndb = c('user_body_right_foot_item_btndb')[0];		//保存

	$.ajax({
		type: 'post',
		url: URLX + '/jf/com/besale/web/list.json',
		data: {
			machCode: machCODE,
		},
		success: function(data){
			//价格渲染
			function priceList(){
				priceTbody.innerHTML = "";
				if(data.dataPrice.length != 0){
					for(var i = 0; i < data.dataPrice.length; i++){
						var tr = creat('tr');
						var tda = creat('td');
						var tdb = creat('td');
						var tdc = creat('td');
						tda.innerHTML = data.dataPrice[i].goodsName;
						tdb.innerHTML = data.dataPrice[i].goodsId;
						tdc.innerHTML = '<input class="user_body_right_foot_item_price_tbody_int" type="text" name="'+data.dataPrice[i].goodsId+'" value="'+data.dataPrice[i].goodPrice+'" />';
						tr.appendChild(tda);
						tr.appendChild(tdb);
						tr.appendChild(tdc);
						priceTbody.appendChild(tr);
					}
				}else{
					var tr = creat('tr');
					var td = creat('td');
					td.innerHTML = "没有数据...";
					td.style.backgroundColor = "#ffffff";
					td.style.color = '#999999';
					td.colSpan = 3;
					tr.appendChild(td);
					priceTbody.appendChild(tr);
				}
			}
			priceList();
			//库存渲染
			function stockList(){
				stockTbody.innerHTML = "";
				if(data.dataStock.length != 0){
					for(var i = 0; i < data.dataStock.length; i++){
						var tr = creat('tr');
						var tda = creat('td');
						var tdb = creat('td');
						var tdc = creat('td');
						var tdd = creat('td');
						var tde = creat('td');
						tda.innerHTML = data.dataStock[i].cargoData;
						tdb.innerHTML = data.dataStock[i].goodsName;
						tdc.innerHTML = data.dataStock[i].goodsId;
						tdd.innerHTML = worldDateTime(new Date(data.dataStock[i].reenterDate).getTime());
						tde.innerHTML = '<input class="user_body_right_foot_item_stock_tbody_int" type="text" name="'+data.dataStock[i].stateId+'" value="'+data.dataStock[i].isExist+'" />';
						tr.appendChild(tda);
						tr.appendChild(tdb);
						tr.appendChild(tdc);
						tr.appendChild(tdd);
						tr.appendChild(tde);
						stockTbody.appendChild(tr);
					}
				}else{
					var tr = creat('tr');
					var td = creat('td');
					td.innerHTML = "没有数据...";
					td.style.backgroundColor = "#ffffff";
					td.style.color = '#999999';
					td.colSpan = 5;
					tr.appendChild(td);
					stockTbody.appendChild(tr);
				}
			}
			stockList();
		}
	})

	//一键清空
	itemBtnda.onclick = function(){
		if(confirm('一键清空吗?')){
			$.ajax({
				type: 'post',
				url: URLX + '/jf/com/besale/web/clear.json',
				data: {
					machCode: machCODE,
				},
				success: function(data){
					alern(data.msg);
					zsStart(machCODE);
				},
				error: function(){
					alern('清空失败!');
				}
			})
		}
	}

	//保存
	itemBtndb.onclick = function(){
		//保存价格
		var priceTbodyInt = c('user_body_right_foot_item_price_tbody_int');
		var priceObj = [];
		for(var i = 0; i < priceTbodyInt.length; i++){
			var priceObject = new Object();
			priceObject.machcode = machCODE;
			priceObject.goodsId = priceTbodyInt[i].name;
			priceObject.goodPrice = priceTbodyInt[i].value;
			priceObj.push(priceObject);
		}

		//保存库存
		var stockTbodyInt = c('user_body_right_foot_item_stock_tbody_int');
		var stockObj = [];
		for(var i = 0; i <stockTbodyInt.length; i++){
			var stockObject = new Object();
			stockObject.stateId = stockTbodyInt[i].name;
			stockObject.isExist = stockTbodyInt[i].value;
			stockObj.push(stockObject);
		}
		if(JSON.stringify(priceObj) == '[]'&&JSON.stringify(stockObj) == '[]'){
			alern('没有数据!');
			return false;
		};
		$.ajax({
			type: 'post',
			url: URLX + '/jf/com/besale/priceandstock/update.json',
			data: {
				machCode: machCODE,
				objprice: JSON.stringify(priceObj),
				objstock: JSON.stringify(stockObj),
			},
			success: function(data){
				alern(data.msg);
			},
			error: function(){
				alern('失败');
			}
		})
	}
}

//远程控制
function ycStart(machCODE,mobleId){
	var initRestart = c('init_restart')[0];	//初始化&重新启动打包
	var init = c('init')[0];		//初始化
	var restart = c('restart')[0];	//重新启动
	var locks = c('locks')[0];		//电子锁
	var magnet = c('magnet')[0];	//开门电磁铁
	//var status = c('status')[0];	//售卖状态
	var door = c('door')[0];		//远程开取物门
	var itemRemoteTbodyb = c('user_body_right_foot_item_remote_tbodyb');	//远程出货

	if(mobleId == 'VMC0401002'){
		initRestart.style.display = 'table-row';
		init.style.display = 'table-cell';
		init.colSpan = 2;
		init.style.height = '36px';
		restart.style.display = 'none';
		locks.style.display = 'table-row';
		magnet.style.display = 'table-row';
		door.style.display = 'table-row';
		for(var i = 0; i < itemRemoteTbodyb.length; i++){
			itemRemoteTbodyb[i].style.display = 'table-row';
		}
	}else if(mobleId == 'FC02'){
		initRestart.style.display = 'table-row';
		init.style.display = 'none';
		restart.colSpan = 2;
		restart.style.display = 'table-cell';
		restart.style.height = '36px';
		locks.style.display = 'none';
		magnet.style.display = 'none';
		door.style.display = 'none';
		for(var i = 0; i < itemRemoteTbodyb.length; i++){
			itemRemoteTbodyb[i].style.display = 'none';
		}
	}else{//mobleId == 'VMC08855W0'&&mobleId == 'YQC001'&&mobleId == 'HT-spring'
		initRestart.style.display = 'none';
		locks.style.display = 'none';
		magnet.style.display = 'none';
		door.style.display = 'none';
		for(var i = 0; i < itemRemoteTbodyb.length; i++){
			itemRemoteTbodyb[i].style.display = 'none';
		}
	}
	var remoteIniti = c('remote_initi')[0];			//初始化按钮
	var remoteElect = c('remote_elect')[0];			//开门电磁铁按钮
	var remoteLocks = c('remote_locks')[0];			//电子锁按钮
	var remotePick = c('remote_pick')[0];			//远程取物门按钮
	var remoteRestart = c('remote_restart')[0];		//重新启动按钮
	var remoteShipment = c('remote_shipment')[0];	//远程出货按钮 
	//渲染页面开关滑动按钮
	var remoteScroll = c('remote_scroll');
	var remoteScrollStatus;
	$.ajax({
		type: 'post',
		url: URLX + '/jf/bg/basic/long-control/web/checkzt.json',
		data: {
			machCode: machCODE,
		},
		success: function(data){
			if(data.status == 1){
				remoteScroll[0].children[1].innerHTML = '开';
				remoteScroll[0].children[1].style.float = 'right';
				remoteScroll[0].children[0].style.float = 'right';
				remoteScroll[0].style.backgroundColor = '#0C64A8';
			}else{
				remoteScroll[0].children[1].innerHTML = '关';
				remoteScroll[0].children[1].style.float = 'left';
				remoteScroll[0].children[0].style.float = 'left';
				remoteScroll[0].style.backgroundColor = '#BDC1C2';
			};
		}
	})
	for(var i = 0; i < remoteScroll.length; i++){
		(function(q){
			remoteScroll[q].onclick = function(){
				var that = this;
				if(that.children[1].innerHTML == '关'){
					remoteScrollStatus = 1;
					that.children[1].innerHTML = '开';
					that.children[1].style.float = 'right';
					that.children[0].style.float = 'right';
					that.style.backgroundColor = '#0C64A8';
				}else{
					remoteScrollStatus = 0;
					that.children[1].innerHTML = '关';
					that.children[1].style.float = 'left';
					that.children[0].style.float = 'left';
					that.style.backgroundColor = '#BDC1C2';
				}
				$.ajax({
					type: 'post',
					url: URLX + '/jf/bg/basic/long-control/web/status.json',
					data: {
						machCode: MACHOBJECT.machCode,
						name: loginUserName.name,
						status: remoteScrollStatus,
					},
					success: function(data){
						alern(data.msg);
						if(data.msg != "操作成功！<br> SUCCESS!"){
							if(remoteScrollStatus == 1){
								remoteScrollStatus = 0;
								that.children[1].innerHTML = '关';
								that.children[1].style.float = 'left';
								that.children[0].style.float = 'left';
								that.style.backgroundColor = '#BDC1C2';
							}else{
								remoteScrollStatus = 1;
								that.children[1].innerHTML = '开';
								that.children[1].style.float = 'right';
								that.children[0].style.float = 'right';
								that.style.backgroundColor = '#0C64A8';
							}
						}
					}
				})
			}
		})(i)
	}
	//渲染页面远程出货订单号与取物层效果
	var remoteShipmentInt = c('remote_shipment_int')[0];			//订单号
	var remoteShipmentSelecta = c('remote_shipment_selecta')[0];	//取物层(层)
	var remoteShipmentSelectb = c('remote_shipment_selectb')[0];	//取物层(列)
	var remoteShipmentIsData = true;
	remoteShipmentInt.onfocus = function(){
		remoteShipmentSelecta.style.display = "none";
		remoteShipmentSelectb.style.display = "none";
	}
	remoteShipmentInt.onblur = function(){
		if(remoteShipmentInt.value == ""){
			remoteShipmentIsData =	true;
			remoteShipmentSelecta.style.display = "inline";
			remoteShipmentSelectb.style.display = "inline";
		}else{
			remoteShipmentIsData =	false;
			remoteShipmentSelecta.style.display = "none";
			remoteShipmentSelectb.style.display = "none";
		}
	}

	//点击初始化按钮
	var displaya = 0;
	remoteIniti.onclick = function(){
		if(displaya == 0){
			displaya = 60;
			remoteIniti.children[0].innerHTML = '(' + displaya + ')';
			remoteIniti.style.backgroundColor = "#e5e5e5";
			var timoer = setInterval(function(){
				displaya --;
				if(displaya >= 1){
					remoteIniti.children[0].innerHTML = '(' + displaya + ')';
				}else{
					displaya = 0;
					remoteIniti.children[0].innerHTML = "";
					remoteIniti.style.backgroundColor = "#ffffff";
					clearInterval(timoer);
				}
			},1000)
			$.ajax({
				type: 'post',
				url: URLX + '/jf/bg/basic/long-control/web/init.json',
				data: {
					machCode: MACHOBJECT.machCode,
					machModelID: MACHOBJECT.machModelID,
					macAddr: MACHOBJECT.macAddr,
					machName: MACHOBJECT.machName,
					name: loginUserName.name,
				},
				success: function(data){
					if(data.msg == undefined){
						alern('操作超时!');
						displaya = 0;
						remoteIniti.children[0].innerHTML = "";
						remoteIniti.style.backgroundColor = "#ffffff";
					}else{
						alern('初始化' + data.msg);
					}
				},
				error: function(){
					displaya = 0;
					remoteIniti.children[0].innerHTML = "";
					remoteIniti.style.backgroundColor = "#ffffff";
				}
			})
		}
	}

	//点击开门电磁铁开启按钮
	var displayb = 0;
	remoteElect.onclick = function(){
		if(displayb == 0){
			displayb = 10;
			remoteElect.children[0].innerHTML = '(' + displayb + ')';
			remoteElect.style.backgroundColor = "#e5e5e5";
			var timoer = setInterval(function(){
				displayb --;
				if(displayb >= 1){
					remoteElect.children[0].innerHTML = '(' + displayb + ')';
				}else{
					displayb = 0;
					remoteElect.children[0].innerHTML = "";
					remoteElect.style.backgroundColor = "#ffffff";
					clearInterval(timoer);
				}
			},1000)
			$.ajax({
				type: 'post',
				url: URLX + '/jf/bg/basic/long-control/web/magnet.json',
				data: {
					machCode: MACHOBJECT.machCode,
					machModelID: MACHOBJECT.machModelID,
					macAddr: MACHOBJECT.macAddr,
					machName: MACHOBJECT.machName,
					name: loginUserName.name,
				},
				success: function(data){
					if(data.msg == undefined){
						alern('操作超时!');
						displayb = 0;
						remoteElect.children[0].innerHTML = "";
						remoteElect.style.backgroundColor = "#ffffff";
					}else{
						alern('开门电磁铁' + data.msg);
					}
				},
				error: function(){
					displayb = 0;
					remoteElect.children[0].innerHTML = "";
					remoteElect.style.backgroundColor = "#ffffff";
				}
			})
		}
	}

	//点击电子锁开启按钮
	var displayc = 0;
	remoteLocks.onclick = function(){
		if(displayc == 0){
			displayc = 10;
			remoteLocks.children[0].innerHTML = '(' + displayc + ')';
			remoteLocks.style.backgroundColor = "#e5e5e5";
			var timoer = setInterval(function(){
				displayc --;
				if(displayc >= 1){
					remoteLocks.children[0].innerHTML = '(' + displayc + ')';
				}else{
					displayc = 0;
					remoteLocks.children[0].innerHTML = "";
					remoteLocks.style.backgroundColor = "#ffffff";
					clearInterval(timoer);
				}
			},1000)
			$.ajax({
				type: 'post',
				url: URLX + '/jf/bg/basic/long-control/web/electro.json',
				data: {
					machCode: MACHOBJECT.machCode,
					machModelID: MACHOBJECT.machModelID,
					macAddr: MACHOBJECT.macAddr,
					machName: MACHOBJECT.machName,
					name: loginUserName.name,
				},
				success: function(data){
					if(data.msg == undefined){
						alern('操作超时!');
						displayc = 0;
						remoteLocks.children[0].innerHTML = "";
						remoteLocks.style.backgroundColor = "#ffffff";
					}else{
						alern('开启电子锁' + data.msg);
					}
				},
				error: function(){
					displayc = 0;
					remoteLocks.children[0].innerHTML = "";
					remoteLocks.style.backgroundColor = "#ffffff";
				}
			})
		}
	}

	//点击远程取物门开启按钮
	var displayd = 0;
	remotePick.onclick = function(){
		var remoteSelecta = c('remote_selecta')[0];		//开门时间
		var remoteSelectb = c('remote_selectb')[0];		//开门层号
		if(displayd == 0){
			displayd = 60;
			remotePick.children[0].innerHTML = '(' + displayd + ')';
			remotePick.style.backgroundColor = "#e5e5e5";
			var timoer = setInterval(function(){
				displayd --;
				if(displayd >= 1){
					remotePick.children[0].innerHTML = '(' + displayd + ')';
				}else{
					displayd = 0;
					remotePick.children[0].innerHTML = "";
					remotePick.style.backgroundColor = "#ffffff";
					clearInterval(timoer);
				}
			},1000)
			$.ajax({
				type: 'post',
				url: URLX + '/jf/bg/basic/long-control/web/getobjdoor.json',
				data: {
					machCode: MACHOBJECT.machCode,
					machModelID: MACHOBJECT.machModelID,
					macAddr: MACHOBJECT.macAddr,
					machName: MACHOBJECT.machName,
					name: loginUserName.name,
					openTime: remoteSelecta.value,
					QWM: remoteSelectb.value,
				},
				success: function(data){
					if(data.msg == undefined){
						alern('操作超时!');
						displayd = 0;
						remotePick.children[0].innerHTML = "";
						remotePick.style.backgroundColor = "#ffffff";
					}else{
						alern('开启取物门' + data.msg);
					}
				},
				error: function(){
					displayd = 0;
					remotePick.children[0].innerHTML = "";
					remotePick.style.backgroundColor = "#ffffff";
				}
			})
		}
	}

	//点击重新启动按钮
	var displaye = 0;
	remoteRestart.onclick = function(){
		if(displaye == 0){
			displaye = 60;
			remoteRestart.children[0].innerHTML = '(' + displaye + ')';
			remoteRestart.style.backgroundColor = "#e5e5e5";
			var timoer = setInterval(function(){
				displaye --;
				if(displaye >= 1){
					remoteRestart.children[0].innerHTML = '(' + displaye + ')';
				}else{
					displaye = 0;
					remoteRestart.children[0].innerHTML = "";
					remoteRestart.style.backgroundColor = "#ffffff";
					clearInterval(timoer);
				}
			},1000)
			$.ajax({
				type: 'post',
				url: URLX + '/jf/bg/basic/long-control/web/restart.json',
				data: {
					machCode: MACHOBJECT.machCode,
					machModelID: MACHOBJECT.machModelID,
					macAddr: MACHOBJECT.macAddr,
					machName: MACHOBJECT.machName,
					name: loginUserName.name,
				},
				success: function(data){
					if(data.msg == undefined){
						alern('操作超时!');
						displaye = 0;
						remoteRestart.children[0].innerHTML = "";
						remoteRestart.style.backgroundColor = "#ffffff";
					}else{
						alern('重新启动' + data.msg);
					}
				},
				error: function(){
					displaye = 0;
					remoteRestart.children[0].innerHTML = "";
					remoteRestart.style.backgroundColor = "#ffffff";
				}
			})
		}
	}

	//点击远程出货按钮
	var displayf = 0;
	remoteShipment.onclick = function(){
		if(displayf == 0){
			displayf = 1;
			remoteShipment.children[0].innerHTML = '(' + displayf + ')';
			remoteShipment.style.backgroundColor = "#e5e5e5";
			var timoer = setInterval(function(){
				displayf --;
				if(displayf >= 1){
					remoteShipment.children[0].innerHTML = '(' + displayf + ')';
				}else{
					displayf = 0;
					remoteShipment.children[0].innerHTML = "";
					remoteShipment.style.backgroundColor = "#ffffff";
					clearInterval(timoer);
				}
			},1000);
			$.ajax({
				type: 'post',
				url: URLX + '/jf/bg/basic/long-control/web/shipment.json',
				data: {
					machCode: MACHOBJECT.machCode,
					machModelID: MACHOBJECT.machModelID,
					macAddr: MACHOBJECT.macAddr,
					machName: MACHOBJECT.machName,
					name: loginUserName.name,
					isDD: remoteShipmentIsData,
					hang: remoteShipmentSelecta.value,
					lie: remoteShipmentSelectb.value,
					out_trade_no: remoteShipmentInt.value,
				},
				success: function(data){
					if(data.msg == undefined){
						alern('操作超时!');
						displayf = 0;
						remoteShipment.children[0].innerHTML = "";
						remoteShipment.style.backgroundColor = "#ffffff";
					}else{
						alern('远程出货' + data.msg);
					}
				},
				error: function(){
					displayf = 0;
					remoteShipment.children[0].innerHTML = "";
					remoteShipment.style.backgroundColor = "#ffffff";
				}
			})
		}
	}

	//保存取物门开门时间
	c('remote_time_save')[0].onclick = function(){
		remoteSelectcValue = c('remote_selectc')[0].value;
		$.ajax({
			type: 'post',
			url: URLS + '/jf/bg/basic/long-control/web/setpickuptime.json',
			data: {
				machCode: machCODE,
				pickupdoor: Number(remoteSelectcValue),
			},
			success: function(data){
				alern(data.text);
			}
		})
	}

	//温度设置模块
	var remoteTitleAdd = c('user_body_right_foot_item_remote_title_add')[0];	//添加温度条目按钮
	var itemRemoteTbodys = c('user_body_right_foot_item_remote_tbodys')[0];		//温度设置载体
	//Get温度列表
	$.ajax({
		type: 'post',
		url: URLS + '/worn/giveTempture.json',
		data: {
			machCode: machCODE,
		},
		success: function(data){
			var itemRemoteTbodysc = c('user_body_right_foot_item_remote_tbodysc');
			if(itemRemoteTbodysc.length != undefined){
				for(var i = itemRemoteTbodysc.length; i > 0;i--){
					itemRemoteTbodysc[i-1].parentNode.removeChild(itemRemoteTbodysc[i-1]);
				}
			}
			for(var i = 0; i < data.length; i++){
				remoteXuan(data[i].startTime,data[i].endTime,9,4,data[i].more);
			};
		}
	})
	// remoteTitleAdd.onclick = function(){
	// 	remoteXuan('','','','','');
	// }

	function remoteXuan(Arra,Arrb,Arrc,Arrd,Arre){
		var itemRemoteTbodysc = c('user_body_right_foot_item_remote_tbodysc');
		if(itemRemoteTbodysc.length >= 5){
			alern('最多不能超过5条!');
			return false;
		};
		var tr = creat('tr');
		tr.className = 'user_body_right_foot_item_remote_tbodysc';
		var tda = creat('td');
		var tdb = creat('td');
		var tdc = creat('td');
		var tdd = creat('td');
		var tde = creat('td');
		var tdf = creat('td');
		tda.className = 'user_body_right_foot_item_remote_tbodysc_one';
		tdb.className = 'user_body_right_foot_item_remote_tbodysc_two';
		tdc.className = 'user_body_right_foot_item_remote_tbodysc_there';
		tdd.className = 'user_body_right_foot_item_remote_tbodysc_four';
		tde.className = 'user_body_right_foot_item_remote_tbodysc_five';
		tdf.className = 'user_body_right_foot_item_remote_tbodysc_six';
		tda.innerHTML = '起：<input class="startTime" type="text" readonly="readonly" style="cursor: pointer" value="'+Arra+'"/><div class="startTimeDick"><div class="startTimeDick_left"><div class="startTimeDick_left_top"><b></b></div><div class="startTimeDick_left_center"><input type="number" value="00"/>:</div><div class="startTimeDick_left_bottom"><b></b></div></div><div class="startTimeDick_right"><div class="startTimeDick_right_top"><b></b></div><div class="startTimeDick_right_center"><input type="number" value="00"/></div><div class="startTimeDick_right_bottom"><b></b></div></div><div class="clear"></div><div class="startTimeDick_bottom">确认<div></div>';
		tdb.innerHTML = '止：<input class="endTime" type="text" readonly="readonly" style="cursor: pointer" value="'+Arrb+'"/><div class="endTimeDick"><div class="endTimeDick_left"><div class="endTimeDick_left_top"><b></b></div><div class="endTimeDick_left_center"><input type="number" value="00"/>:</div><div class="endTimeDick_left_bottom"><b></b></div></div><div class="endTimeDick_right"><div class="endTimeDick_right_top"><b></b></div><div class="endTimeDick_right_center"><input type="number" value="00"/></div><div class="endTimeDick_right_bottom"><b></b></div></div><div class="clear"></div><div class="endTimeDick_bottom">确认<div></div>';
		tdc.innerHTML = '上限(℃)：<input class="topRemote" type="number" value="'+Arrc+'"/>';
		tdd.innerHTML = '下限(℃)：<input class="bottomRemote" type="number" value="'+Arrd+'"/>';
		tde.innerHTML = '工作时间(min)：<input class="remoteTimeOut" type="number" value="'+Arre+'"/>';
		tdf.innerHTML = '<button class="user_body_right_foot_item_remote_tbodysc_btn"><img src="image/sc.png"/>删除</button>';
		tr.appendChild(tda);
		tr.appendChild(tdb);
		tr.appendChild(tdc);
		tr.appendChild(tdd);
		tr.appendChild(tde);
		tr.appendChild(tdf);
		itemRemoteTbodys.appendChild(tr);

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
						if(endTime[q-1] != undefined &&endTime[q-1].value != ""){
							if(Number(startTime[q].value.split(':')[0]) < Number(endTime[q-1].value.split(':')[0])){
								alern('开始时间必须大于上一条记录的结束时间!');
								startTime[q].value = "";
								startTimeDick[q].style.display = "none";
								return false;
							}else if(Number(startTime[q].value.split(':')[0]) == Number(endTime[q-1].value.split(':')[0])&&Number(startTime[q].value.split(':')[1]) <= Number(endTime[q-1].value.split(':')[1])){
								alern('开始时间必须大于上一条记录的结束时间');
								startTime[q].value = "";
								startTimeDick[q].style.display = "none";
								return false;
							}
						}
						if(endTime[q].value.split(':')[0] != ""){
							if(Number(startTime[q].value.split(':')[0]) > Number(endTime[q].value.split(':')[0])){
								alern('开始时间必须小于结束时间!');
								startTime[q].value = "";
							}else if(Number(startTime[q].value.split(':')[0]) == Number(endTime[q].value.split(':')[0])&&Number(startTime[q].value.split(':')[1])>=Number(endTime[q].value.split(':')[1])){
								alern('开始时间必须小于结束时间!');
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
						if(startTime[q+1] != undefined &&startTime[q+1].value != ""){
							if(Number(startTime[q+1].value.split(':')[0]) < Number(endTime[q].value.split(':')[0])){
								alern('结束时间必须小于下一条记录的开始时间！');
								endTime[q].value = "";
								endTimeDick[q].style.display = "none";
								return false;
							}else if(Number(startTime[q+1].value.split(':')[0]) == Number(endTime[q].value.split(':')[0])&&Number(startTime[q+1].value.split(':')[1]) <= Number(endTime[q].value.split(':')[1])){
								alern('结束时间必须小于下一条记录的开始时间！');
								endTime[q].value = "";
								endTimeDick[q].style.display = "none";
								return false;
							}
						}
						if(startTime[q].value.split(':')[0] != ""){
							if(Number(startTime[q].value.split(':')[0]) > Number(endTime[q].value.split(':')[0])){
								alern('开始时间必须小于结束时间!');
								endTime[q].value = "";
							}else if(Number(startTime[q].value.split(':')[0]) == Number(endTime[q].value.split(':')[0])&&Number(startTime[q].value.split(':')[1])>=Number(endTime[q].value.split(':')[1])){
								alern('开始时间必须小于结束时间!');
								endTime[q].value = "";
							}
						}
						endTimeDick[q].style.display = "none";
					}
				}

				//温度上下限判断
				var topRemote = c('topRemote');
				var bottomRemote = c('bottomRemote');
				topRemote[q].onchange = function(){
					if(bottomRemote[q].value != ""){
						if(Number(bottomRemote[q].value) > Number(topRemote[q].value)||(topRemote[q].value - bottomRemote[q].value) < 5){
							topRemote[q].value = "";
							alern('上限必须比下限多5℃以上!');
						}
					}
				}
				bottomRemote[q].onchange = function(){
					if(topRemote[q].value != ""){
						if(Number(bottomRemote[q].value) > Number(topRemote[q].value)||(topRemote[q].value - bottomRemote[q].value) < 5){
							bottomRemote[q].value = "";
							alern('上限必须比下限多5℃以上!');
						}
					}
				}
			})(i)
		}

		//点击删除去掉此条记录
		var itemRemoteTbodyscBtn = c('user_body_right_foot_item_remote_tbodysc_btn');
		for(var i = 0; i < itemRemoteTbodyscBtn.length; i++){
			(function(q){
				itemRemoteTbodyscBtn[q].onclick = function(){
					itemRemoteTbodys.removeChild(this.parentNode.parentNode);
				}
			})(i)
		}
	}

	//保存温度设置
	// c('user_body_right_foot_item_remote_title_submit')[0].onclick = function(){
	// 	var itemRemoteTbodysc = c('user_body_right_foot_item_remote_tbodysc');
	// 	var startTime = c('startTime');			//开始时间
	// 	var endTime = c('endTime');				//结束时间
	// 	var topRemote = c('topRemote');			//温度上限
	// 	var bottomRemote = c('bottomRemote');	//温度下限
	// 	var remoteTimeOut = c('remoteTimeOut');	//温度超时
	// 	var remoteArr = [];
	// 	var remoteErr = "";
	// 	for(var i = 0; i < itemRemoteTbodysc.length; i++){
	// 		var remoteObj = new Object();
	// 		if(startTime[i].value == ""){
	// 			remoteErr += 'No.' + (i+1) + '起时间不能为空!<br/>';
	// 		}
	// 		if(endTime[i].value == ""){
	// 			remoteErr += 'No.' + (i+1) + '止时间不能为空!<br/>';
	// 		}
	// 		if(topRemote[i].value == ""){
	// 			remoteErr += 'No.' + (i+1) + '上限不能为空!<br/>';
	// 		}
	// 		if(bottomRemote[i].value == ""){
	// 			remoteErr += 'No.' + (i+1) + '下限不能为空!<br/>';
	// 		}
	// 		if(remoteTimeOut[i].value == ""){
	// 			remoteErr += 'No.' + (i+1) + '工作时间不能为空!<br/>';
	// 		}
	// 		remoteObj.startTime = startTime[i].value;
	// 		remoteObj.endTime = endTime[i].value;
	// 		remoteObj.start = topRemote[i].value;
	// 		remoteObj.end = bottomRemote[i].value;
	// 		remoteObj.more = remoteTimeOut[i].value;
	// 		remoteObj.machCode = machCODE;
	// 		remoteArr.push(remoteObj);
	// 	}
	// 	if(remoteErr != ""){
	// 		alern(remoteErr);
	// 		return false;
	// 	}
	// 	$.ajax({
	// 		type: 'post',
	// 		url: URLS + '/worn/set.json',
	// 		data: {
	// 			string: JSON.stringify(remoteArr),
	// 			machCode: machCODE,
	// 		},
	// 		success: function(data){
	// 			if(data.a){
	// 				alern('成功');
	// 			};
	// 		}
	// 	})
	// }
}