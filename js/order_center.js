//导航栏切换功能
function orderNav(){
	var orderCenterHeaderUlLi = c('order_center_header_ul_li');
	var orderCenterMainPages = c('order_center_main_pages');
	var count = 0;

	for(var i = 0; i < orderCenterHeaderUlLi.length; i++){
		(function(q){
			orderCenterHeaderUlLi[q].onmousedown = function(){
				if(Object.is(count,q)){
					return false;
				}
				for(var k of orderCenterHeaderUlLi){
					k.style.borderBottom = 'none';
					k.classList.add("order_center_header_ul_lis");
				}
				this.classList.remove("order_center_header_ul_lis");
				this.style.borderBottom = '3px #0C64A8 solid';
				for(var j of orderCenterMainPages){
					j.style.display = 'none';
				}
				orderCenterMainPages[q].style.display = 'block';
				count = q;
			}
		})(i)
	}
}
orderNav();

//百度语音播报功能
function doTTS(text){
    // 这样为什么替换不了播放内容
    //var ssrcc = 'http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=10&text='+ttsText;
    //document.getElementById('tts_source_id').src=ssrcc;
     
    // 这样就可实现播放内容的替换了
    var bdttsDivId = d('bdtts_div_id'); 
    var au1 = '<audio id="tts_autio_id">';
    var sss = '<source id="tts_source_id" src="http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=6&text='+text+'&per=4"/>';
    // var sss = '<source id="tts_source_id" src="http://tts.baidu.com/text2audio?cuid=baike&lan=ZH&ctp=1&pdt=301&vol=9&spd=8&rate=32&per=0&tex='+text;
    var eee = '<embed id="tts_embed_id" height="0" width="0" src="">';
    var au2 = '</audio>';
    bdttsDivId.innerHTML = au1 + sss + eee + au2;
    d('tts_autio_id').play();
}

//待接单
function Waiting(){
	var param = {};
	param.empcode = loginUserName.empcode;
	param.state = 'unprocessed';
	param.refundStatus = 'noRefund';
	param.settledStatus = '';
	param.startTime = '';
	param.endTime = '';
	param.orderId = '';
	ajax({
		type: 'get',
		url: URLS + orderBatch(param),
		setHeader: {
			username: loginUserName.empcode,
			token: loginUserName.token,
		},
		success: function(data){
			if(data.status == 10001){
				var orderCenterMainPendingOrders = d('order_center_main_pending_orders');
				var newOrder = c('new_order')[0];
				newOrder.innerHTML = data.resultObject.length;
				Object.is(data.resultObject.length,0)?newOrder.style.display = 'none':newOrder.style.display = 'block';
				orderCenterMainPendingOrders.innerHTML = "";
				for(var i = 0; i < data.resultObject.length; i++){
					var tr = creat('tr');
					var tda = creat('td'),
						tdb = creat('td'),
						tdc = creat('td'),
						tdd = creat('td'),
						tde = creat('td'),
						tdf = creat('td'),
						tdg = creat('td'),
						tdh = creat('td'),
						tdi = creat('td');
					tda.innerHTML = data.resultObject[i].orderSourceText;
					tdb.innerHTML = data.resultObject[i].orderId;
					tdc.innerHTML = "<button class='order_center_main_pending_btn' data-value='"+JSON.stringify(data.resultObject[i].items)+"'>查看商品</button>";
					tdd.innerHTML = data.resultObject[i].totalPrice;
					tde.innerHTML = data.resultObject[i].consignee;
					tdf.innerHTML = data.resultObject[i].phones.userPhone;
					tdg.innerHTML = data.resultObject[i].deliveryPoiAddress;
					tdh.innerHTML = wmDateTime(data.resultObject[i].createdAt);
					tdi.innerHTML = "<button class='order_center_main_pending_btn' data-value='"+JSON.stringify(data.resultObject[i])+"'>接单</button><button class='order_center_main_pending_btn' data-value='"+JSON.stringify(data.resultObject[i])+"'>拒绝</button>";
					//查看商品
					tdc.children[0].onmousedown = function(){
						shippingList(this,2);
					}
					//接单按钮
					tdi.children[0].onmousedown = function(){
						var thisData = JSON.parse(this.dataset.value);
						loading('接单中');
						ajax({
							type: 'post',
							url: URLS + '/dy/confirm/order',
							data: {
								shopId: thisData.shopId,
								orderId:thisData.orderId,
							},
							setHeader: {
								username: loginUserName.empcode,
								token: loginUserName.token,
								shopId: thisData.shopId,
							},
							success: function(data){
								if(data.status != 10001){
									alern(data.msg);
									loadingClear();
									Waiting();	//待接单
									Shipping();	//待出货（已接单）
								}
							}
						})
					}

					//拒接单
					tdi.children[1].onmousedown = function(){
						var thisData = JSON.parse(this.dataset.value);
						refuseCancel(thisData,1);
						Waiting();
					}
					tr.setAppend([tda,tdb,tdc,tdd,tde,tdf,tdg,tdh,tdi]);
					orderCenterMainPendingOrders.appendChild(tr);
				}
			}
		}
	})
}

//待出货
function Shipping(){
	var param = {};
	param.empcode = loginUserName.empcode;
	param.state = 'valid';
	param.refundStatus = 'noRefund';
	param.settledStatus = '';
	param.startTime = '';
	param.endTime = '';
	param.orderId = '';
	ajax({
		type: 'get',
		url: URLS + orderBatch(param),
		setHeader: {
			username: loginUserName.empcode,
			token: loginUserName.token,
		},
		success: function(data){
			log(data);
			if(data.status == 10001){
				var orderCenterMainPendingShipping = wm('#order_center_main_pending_shipping');
				orderCenterMainPendingShipping.innerHTML = "";
				for(var i = 0; i < data.resultObject.length; i++){
					var tr = creat('tr');
					var tda = creat('td'),
						tdb = creat('td'),
						tdc = creat('td'),
						tdd = creat('td'),
						tde = creat('td'),
						tdf = creat('td'),
						tdg = creat('td'),
						tdh = creat('td'),
						tdi = creat('td'),
						tdj = creat('td');
					tda.innerHTML = "<input class='order_center_main_pending_check' type='checkbox' name='"+ data.resultObject[i].orderId +"' />";
					tdb.innerHTML = data.resultObject[i].orderSourceText;
					tdc.innerHTML = data.resultObject[i].orderId;
					tdd.innerHTML = "<button class='order_center_main_pending_btn' data-value='"+JSON.stringify(data.resultObject[i].items)+"'>查看商品</button>";
					tde.innerHTML = data.resultObject[i].totalPrice;
					tdf.innerHTML = data.resultObject[i].consignee;
					tdg.innerHTML = data.resultObject[i].phones.userPhone;
					tdh.innerHTML = data.resultObject[i].deliveryPoiAddress;
					tdi.innerHTML = wmDateTime(data.resultObject[i].createdAt);
					tdj.innerHTML = "<button class='order_center_main_pending_btn order_center_main_pending_print' data-value='"+JSON.stringify(data.resultObject[i])+"'>打印</button><button class='order_center_main_pending_btn order_center_main_pending_print_view' data-value='"+JSON.stringify(data.resultObject[i])+"'>打印预览</button>";
					//查看商品
					tdd.children[0].onmousedown = function(){
						shippingList(this,1);
					}
					//打印小票
					tdj.children[0].onmousedown = function(){
						var thatData = JSON.parse(this.dataset.value);
						orderItem(thatData);
				        document.body.innerHTML = c('order_center_print_receipt_home')[0].innerHTML; //构建新网页
				        c('order_center_print_receipt')[0].style.top = '0px';
				        c('order_center_print_receipt')[0].style.left = '0px';
				        c('order_center_print_receipt')[0].style.marginTop = '0px';
				        c('order_center_print_receipt')[0].style.marginLeft = '0px';
				        window.print();
				        window.location = location;
					}
					//打印小票（预览）
					tdj.children[1].onmousedown = function(){
						var thatData = JSON.parse(this.dataset.value);
						orderItem(thatData);
					}

					tr.setAppend([tda,tdb,tdc,tdd,tde,tdf,tdg,tdh,tdi,tdj]);
					orderCenterMainPendingShipping.appendChild(tr);
				}
			}
		}
	})
}

//取消单
function Cancel(){
	var param = {};
	param.empcode = loginUserName.empcode;
	param.state = 'valid';
	param.refundStatus = 'applied';
	param.settledStatus = '';
	param.startTime = '';
	param.endTime = '';
	param.orderId = '';
	ajax({
		type: 'get',
		url: URLS + orderBatch(param),
		setHeader: {
			username: loginUserName.empcode,
			token: loginUserName.token,
		},
		success: function(data){
			if(data.status == 10001){
				var orderCenterMainPendingCancel = d('order_center_main_pending_cancel');
				orderCenterMainPendingCancel.innerHTML = "";
				var cancelOrder = c('cancel_order')[0];
				cancelOrder.innerHTML = data.resultObject.length;
				Object.is(data.resultObject.length,0)?cancelOrder.style.display = 'none':cancelOrder.style.display = 'block';
				for(var i = 0; i < data.resultObject.length; i++){
					var tr = creat('tr');
					var tda = creat('td'),
						tdb = creat('td'),
						tdc = creat('td'),
						tdd = creat('td'),
						tde = creat('td'),
						tdf = creat('td'),
						tdg = creat('td'),
						tdh = creat('td'),
						tdi = creat('td');
					tda.innerHTML = data.resultObject[i].orderSourceText;
					tdb.innerHTML = data.resultObject[i].orderId;
					tdc.innerHTML = "<button class='order_center_main_pending_btn' data-value='"+JSON.stringify(data.resultObject[i].items)+"'>查看商品</button>";
					tdd.innerHTML = data.resultObject[i].totalPrice;
					tde.innerHTML = data.resultObject[i].consignee;
					tdf.innerHTML = data.resultObject[i].phones.userPhone;
					tdg.innerHTML = data.resultObject[i].deliveryPoiAddress;
					tdh.innerHTML = wmDateTime(data.resultObject[i].createdAt);
					tdi.innerHTML = "<button class='order_center_main_pending_btn' data-value='"+JSON.stringify(data.resultObject[i])+"'>同意</button><button class='order_center_main_pending_btn' data-value='"+JSON.stringify(data.resultObject[i])+"'>拒绝</button>";
					//查看商品
					tdc.children[0].onmousedown = function(){
						shippingList(this,1);
					}

					//同意取消订单
					tdi.children[0].onmousedown = function(){
						var thisData = JSON.parse(this.dataset.value);
						agreeCancel(thisData,1);
					}

					//拒绝取消订单
					tdi.children[1].onmousedown = function(){
						var thisData = JSON.parse(this.dataset.value);
						refuseCancel(thisData,2);
					}
					tr.setAppend([tda,tdb,tdc,tdd,tde,tdf,tdg,tdh,tdi]);
					orderCenterMainPendingCancel.appendChild(tr);
				}
			}
		}
	})
}

//退单
function Retreat(){
	var param = {};
	param.empcode = loginUserName.empcode;
	param.state = 'settled';
	param.refundStatus = 'applied';
	param.settledStatus = '';
	param.startTime = '';
	param.endTime = '';
	param.orderId = '';
	//退单
	ajax({
		type: 'get',
		url: URLS + orderBatch(param),
		setHeader: {
			username: loginUserName.empcode,
			token: loginUserName.token,
		},
		success: function(data){
			if(data.status == 10001){
				var orderCenterMainPendingRetreat = wm('#order_center_main_pending_retreat');
				orderCenterMainPendingRetreat.innerHTML = "";
				var retreatOrder = c('retreat_order')[0];
				retreatOrder.innerHTML = data.resultObject.length;
				Object.is(data.resultObject.length,0)?retreatOrder.style.display = 'none':retreatOrder.style.display = 'block';
				for(var i = 0; i < data.resultObject.length; i++){
					var tr = creat('tr');
					var tda = creat('td'),
						tdb = creat('td'),
						tdc = creat('td'),
						tdd = creat('td'),
						tde = creat('td'),
						tdf = creat('td'),
						tdg = creat('td'),
						tdh = creat('td'),
						tdi = creat('td');
					tda.innerHTML = data.resultObject[i].orderSourceText;
					tdb.innerHTML = data.resultObject[i].orderId;
					tdc.innerHTML = "<button class='order_center_main_pending_btn' data-value='"+JSON.stringify(data.resultObject[i].items)+"'>查看商品</button>";
					tdd.innerHTML = data.resultObject[i].totalPrice;
					tde.innerHTML = data.resultObject[i].consignee;
					tdf.innerHTML = data.resultObject[i].phones.userPhone;
					tdg.innerHTML = data.resultObject[i].deliveryPoiAddress;
					tdh.innerHTML = wmDateTime(data.resultObject[i].createdAt);
					tdi.innerHTML = "<button class='order_center_main_pending_btn' data-value='"+JSON.stringify(data.resultObject[i])+"'>同意</button><button class='order_center_main_pending_btn' data-value='"+JSON.stringify(data.resultObject[i])+"'>拒绝</button>";

					//查看商品
					tdc.children[0].onmousedown = function(){
						shippingList(this,1);
					}

					//同意退单
					tdi.children[0].onmousedown = function(){
						var thisData = JSON.parse(this.dataset.value);
						agreeCancel(thisData,2);
					}

					//拒绝退单
					tdi.children[1].onmousedown = function(){
						var thisData = JSON.parse(this.dataset.value);
						refuseCancel(thisData,3);
					}
					tr.setAppend([tda,tdb,tdc,tdd,tde,tdf,tdg,tdh,tdi]);
					orderCenterMainPendingRetreat.appendChild(tr);
				}
			}
		}
	})
}

Waiting();	//待接单
Shipping();	//待出货（已接单）
Cancel();	//取消单
Retreat();	//退单


//渲染商品列表
function shippingList(that,type){
	var thatValue = JSON.parse(that.dataset.value);
	var orderCenterShippingFixedMain = c('order_center_shipping_fixed_main')[0];
	var orderCenterShippingFixedHead = c('order_center_shipping_fixed_head')[0];
	orderCenterShippingFixedMain.innerHTML = "";
	orderCenterShippingFixedHead.innerHTML = "";
	var tr = creat('tr');
	var tha = creat('th');
	var thb = creat('th');
	var thc = creat('th');
	tha.innerHTML = '名称';
	thb.innerHTML = '数量';
	thc.innerHTML = '价格';
	if(Object.is(type,1)){
		var thd = creat('th');
		var the = creat('th');
		thd.innerHTML = '货道';
		the.innerHTML = '设备';
		tr.setAppend([tha,thb,thc,thd,the]);
	}else{
		tr.setAppend([tha,thb,thc]);
	}
	orderCenterShippingFixedHead.appendChild(tr);
	log(thatValue);
	for(var i of thatValue){
		for(var j of i.lanes){
			var trs = creat('tr');
			var tda = creat('td');
			var tdb = creat('td');
			var tdc = creat('td');
			tda.innerHTML = i.name;
			tdb.innerHTML = '*1';
			tdc.innerHTML = i.price;
			if(Object.is(type,1)){
				var tdd = creat('td');
				var tde = creat('td');
				tdd.innerHTML = j.goodsLane;
				tde.innerHTML = j.deviceId;
				trs.setAppend([tda,tdb,tdc,tdd,tde]);
			}else{
				trs.setAppend([tda,tdb,tdc]);
			}
			orderCenterShippingFixedMain.appendChild(trs);
		}
	}
	c('order_center_shipping_fixed')[0].style.display = 'block';
}

//渲染订单
function orderItem(that){
	var orderCenterPrintReceiptOrder = d('order_center_print_receipt_order');
	var orderCenterPrintReceiptShop = d('order_center_print_receipt_shop');
	var orderCenterPrintReceiptTime = d('order_center_print_receipt_time');
	var orderCenterPrintReceiptOrdernum = d('order_center_print_receipt_ordernum');
	var orderCenterPrintReceiptThead = d('order_center_print_receipt_thead');
	var orderCenterPrintReceiptDelivery = d('order_center_print_receipt_delivery');
	var orderCenterPrintReceiptPackaging = d('order_center_print_receipt_packaging');
	var orderCenterPrintReceiptTotal = d('order_center_print_receipt_total');
	var orderCenterPrintReceiptAddr = d('order_center_print_receipt_addr');
	var orderCenterPrintReceiptUsername = d('order_center_print_receipt_username');
	var orderCenterPrintReceiptPhone = d('order_center_print_receipt_phone');
	var orderCenterPrintReceiptRemake = d('order_center_print_receipt_remake');
	var orderCenterPrintReceiptMark = d('order_center_print_receipt_mark');

	orderCenterPrintReceiptOrder.innerHTML = '#' + that.daySn + that.orderSourceText + '订单';
	orderCenterPrintReceiptShop.innerHTML = '【店铺】' + that.shopName;
	orderCenterPrintReceiptTime.innerHTML = '【下单时间】' + wmDateTime(that.activeAt);
	orderCenterPrintReceiptOrdernum.innerHTML = '【订单号】' + that.phones.orderId;
	orderCenterPrintReceiptThead.innerHTML = "";
	for(var i of that.items){
		var tr = creat('tr');
		var tda = creat('td');
		var tdb = creat('td');
		var tdc = creat('td');
		tda.innerHTML = i.name;
		tdb.innerHTML = '*' + i.quantity;
		tdc.innerHTML = i.total;
		tr.setAppend([tda,tdb,tdc]);
		orderCenterPrintReceiptThead.appendChild(tr);
	}
	orderCenterPrintReceiptDelivery.innerHTML = that.deliverFee;
	orderCenterPrintReceiptPackaging.innerHTML = that.packageFee;
	orderCenterPrintReceiptTotal.innerHTML = that.totalPrice;
	orderCenterPrintReceiptAddr.innerHTML = '【地址】' + that.deliveryPoiAddress;
	orderCenterPrintReceiptUsername.innerHTML = '【姓名】' + that.consignee;
	orderCenterPrintReceiptPhone.innerHTML = '【电话】' + that.phones.userPhone;
	orderCenterPrintReceiptRemake.innerHTML = Object.is(that.description,'')?that.description:'【备注】' + that.description;
	orderCenterPrintReceiptMark.innerHTML = '***********#'+ that.daySn +'完***********';
	c('order_center_print_receipt')[0].style.display = 'block';
}

//同意取消单/同意退单
function agreeCancel(that,type){
	if(confirm('确认执行取消单/退单？')){
		ajax({
			type: 'post',
			url: URLS + '/dy/order/verify',
			data: {
				orderId: that.orderId,
			},
			setHeader: {
				username: loginUserName.empcode,
				token: loginUserName.token,
				shopId: that.shopId,
			},
			success: function(msg){
				if(Object.is(msg.status,30009)){
					if(confirm(msg.msg + ',是否确认退款')){
						ajax({
							type: 'post',
							url: URLS + '/dy/agree/refund/order',
							data: {
								shopId: that.shopId,
								orderId: that.orderId,
							},
							setHeader: {
								username: loginUserName.empcode,
								token: loginUserName.token,
								shopId: that.shopId,
							},
							success: function(data){
								if(Object.is(data.status,10001)){
									alern(data.msg);
								}else{
									data.msg;
								}
							}
						})
					}
				}else{
					ajax({
						type: 'post',
						url: URLS + '/dy/agree/refund/order',
						data: {
							shopId: that.shopId,
							orderId: that.orderId,
						},
						setHeader: {
							username: loginUserName.empcode,
							token: loginUserName.token,
							shopId: that.shopId,
						},
						success: function(data){
							if(Object.is(data.status,10001)){
								alern(data.msg);
							}else{
								data.msg;
							}
						}
					})
				}
			}
		})
	}
}

//拒绝取消单/拒绝退单
function refuseCancel(that,type){
	c('order_center_cancel')[0].style.display = 'block';

	var orderCenterCancelBodySelect = c('order_center_cancel_body_select')[0];
	var orderCenterCancelBodyTextarea = c('order_center_cancel_body_textarea')[0];

	var reason;

	if(Object.is(type,1)){
		orderCenterCancelBodySelect.setAttribute('data-select',"[{name: '联系不上用户',value: 'contactUserFailed'},{name:'商品已经售完',value: 'foodSoldOut'},{name:'商家已经打烊',value: 'restaurantClosed'},{name:'超出配送范围',value: 'distanceTooFar'},{name:'商家现在太忙',value: 'restaurantTooBusy'},{name:'不满足起送要求',value: 'notSatisfiedDeliveryRequirement'},{name:'无骑手接单',value: 'noRiderOrder'},{name:'其他原因',value: 'others'}]");
		WmStartSelect();
		orderCenterCancelBodyTextarea.style.display = 'inline';
		orderCenterCancelBodySelect.style.display = 'inline';
	}else if(Object.is(type,2)){
		orderCenterCancelBodySelect.setAttribute('data-select',"[{name: '美食已下锅',value: '1'},{name:'美食已备好',value: '2'},{name:'商品已送出',value: '3'},{name:'商品已送达',value: '4'},{name:'已与用户沟通不在取消订单',value: '5'}]");
		WmStartSelect();
		orderCenterCancelBodyTextarea.style.display = 'none';
		orderCenterCancelBodySelect.style.display = 'inline';
	}else{
		orderCenterCancelBodyTextarea.style.display = 'inline';
		orderCenterCancelBodySelect.style.display = 'none';
	}

	var cancelObj = {};
	cancelObj.shopId = that.shopId;
	cancelObj.orderId = that.orderId;
	c('order_center_cancel_body_submit')[0].setAttribute('data-value',JSON.stringify(cancelObj));
	c('order_center_cancel_body_submit')[0].onclick = function(){
		log(this.dataset.value);
		var thatValue = JSON.parse(this.dataset.value);
		if(Object.is(type,1)){
			if(orderCenterCancelBodySelect.value){
				var selectValue = orderCenterCancelBodySelect;
				var textareaValue = orderCenterCancelBodyTextarea.value;
				if(!textareaValue){
					textareaValue = selectValue.value;
				}
				ajax({
					type: 'post',
					url: URLS + '/dy/cancel/order',
					data: {
						shopId: thatValue.shopId,
						orderId: thatValue.orderId,
						type: selectValue.dataset.value,
						remark: textareaValue,
					},
					setHeader: {
						username: loginUserName.empcode,
						token: loginUserName.token,
						shopId: thisData.shopId,
					},
					success: function(data){
						log(data);
						if(Object.is(data.status,10001)){
							alern(data.msg);
						}else{
							alern(data.msg);
						}
						Cancel();	//取消单
						c('order_center_cancel')[0].style.display = 'none';
					}
				})
			}else{
				alern('请选择拒绝理由在提交...');
			}
		}else if(Object.is(type,2)){
			if(orderCenterCancelBodySelect.value){
				ajax({
					type: 'post',
					url: URLS + '/dy/disagree/refund/order',
					data: {
						shopId: thatValue.shopId,
						orderId: thatValue.orderId,
						reason: orderCenterCancelBodySelect.value,
					},
					setHeader: {
						username: loginUserName.empcode,
						token: loginUserName.token,
						shopId: thisData.shopId,
					},
					success: function(data){
						log(data);
						if(Object.is(data.status,10001)){
							alern(data.msg);
						}else{
							alern(data.msg);
						}
						Retreat();	//退单
						c('order_center_cancel')[0].style.display = 'none';
					}
				})
			}else{
				alern('请选择拒绝理由在提交...');
			}
		}else{
			if(orderCenterCancelBodyTextarea.value){
				ajax({
					type: 'post',
					url: URLS + '/dy/disagree/refund/order',
					data: {
						shopId: thatValue.shopId,
						orderId: thatValue.orderId,
						reason: orderCenterCancelBodyTextarea.value,
					},
					setHeader: {
						username: loginUserName.empcode,
						token: loginUserName.token,
						shopId: thisData.shopId,
					},
					success: function(data){
						log(data);
						if(Object.is(data.status,10001)){
							alern(data.msg);
						}else{
							alern(data.msg);
						}
					}
				})
			}else{
				alern('请输入拒绝说明在提交...');
			}
		}
	}
	/*ajax({
		type: 'post',
		url: URLS + '/dy/agree/refund/order',
		data: {
			shopId: that.shopId,
			orderId:that.orderId,
		},
		setHeader: {
			username: loginUserName.empcode,
			token: loginUserName.token,
			shopId: that.shopId,
		},
		success: function(data){
			log(data);
		}
	})*/
}

//全局计时（用于检测客户端是否返回websocket）
var timeMac;
var orderCheckArr = [];
//按钮事件集合点
function totalBtn(){
	//点击关闭商品列表按钮
	c('order_center_shipping_fixed_clear')[0].onclick = function(){
		this.parentNode.parentNode.style.display = 'none';
	}
	//点击关闭小票弹窗按钮
	c('order_center_print_receipt_clear')[0].onclick = function(){
		this.parentNode.style.display = 'none';
	}
	//关闭拒绝理由弹窗按钮
	c('order_center_cancel_clear')[0].onclick = function(){
		this.parentNode.parentNode.style.display = 'none';
	}
	c('order_center_cancel_body_clear')[0].onclick = function(){
		c('order_center_cancel_clear')[0].click();
	}
	//一键出货按钮
	c('order_center_order_shipping_btn')[0].onclick = function(){
		var orderCenterMainPendingCheck = c('order_center_main_pending_check');
		orderCheckArr = [];
		for(var i of orderCenterMainPendingCheck){
			if(i.checked){
				orderCheckArr.push(i.name);
			}
		}
		if(orderCheckArr.length == 0){
			alern('请先勾选要出货的订单！');
			return false;
		}
		if(confirm('确认要为勾选的订单出货吗？')){
			ajax({
				type: 'post',
				url: URLS + '/stock/shipping/detect',
				data: {
					orders: JSON.stringify(orderCheckArr),
					userId: loginUserName.empcode,
				},
				success: function(data){
					if(data.status == 40003){
						timeMac = setTimeout(function(){
							alern('连接超时，请重试！');
						},3000);
					}else{
						alern(data.msg);
					}
				}
			})
		}
	}
}
totalBtn();

//初始页面渲染
function Layout(){
	if(c('order_center_main')[0]){
		c('order_center_main')[0].style.maxHeight = (window.innerHeight - 300) + 'px';
	}
}

window.onload = function(){
	Layout();
}
window.onresize = function(){
	Layout();
}

function WebSocketp2p(){
	if("WebSocket" in window){
		//打开一个 web socket
		var ws = new WebSocket('ws://new.daoyin.tech:6801/websocket?Id=' + loginUserName.empcode);

		function fremeArrs(num){
			var frameObj = {};
			frameObj.type = num;
			return frameObj;
		}

		var timore;

		ws.onopen = function(){
		// Web Socket 已连接上，使用 send() 方法发送数据
			log('已连接!');
			timore = setInterval(function(){
				ws.send(JSON.stringify(fremeArrs(0)));
			},2500);
		};
 
		ws.onmessage = function (evt){
			var respons = JSON.parse(evt.data);
			log(respons);
			switch(respons.type){
				case 129:
					ws.send(JSON.stringify(fremeArrs(2)));
					var responsData;
					responsData = respons.body.data;
					switch(respons.body.type){
						//新订单
						case 'unprocessed':
							doTTS('您有新的饿了么订单，请及时处理！');
							Waiting();
							break;
						//商户接单
						case 'merchant_orders':
							loadingClear();
							alern(responsData.msg);
							Waiting();	//待接单
							Shipping();	//待出货（已接单）
							break;
						//强制无效(用户下单1分钟之内取消订单时刷新页面)(无需商家同意)
						case 'force_invalid':
							Waiting();	//待接单
							break;
						//置为无效(饿了么平台将订单置为无效)(无需我们处理,仅更新数据即可)
						case 'passive_cancellation':
							Waiting();	//待接单
							Shipping();	//待出货（已接单）
							Cancel();	//取消单
							Retreat();	//退单
							break;
						//商户接单前用户取消了订单(无需商家同意)
						case 'active_cancellation':
							Waiting();	//待接单
							break;
						//用户申请了退单（需经过商家同意）
						case 'refund_order':
							doTTS('您有新的退单申请，请及时处理！');
							Shipping();	//待出货（已接单）
							Retreat();	//退单
							break;
						//用户申请了取消单（需经过商家同意）
						case 'cancel_order':
							doTTS('您有新的取消单申请，请及时处理！');
							Shipping();	//待出货（已接单）
							Cancel();	//取消单
							break;
						//商家同意取消单/退单
						case 'agree_cancel_orders':
							Cancel();	//取消单
							Retreat();	//退单
							break;
						//检测售货机状态是否繁忙
						case 'match_status':
							if(responsData.ready){
								clearTimeout(timeMac);
								ajax({
									type: 'post',
									url: URLS + '/stock/shipping/execute',
									data: {
										orders: JSON.stringify(orderCheckArr),
									},
									success: function(data){
										if(data.status == 40003){
											alern(data.msg);
											Shipping();	//待出货（已接单）
										}else{
											alern(data.msg);
										}
									}
								})
							}else{
								alern('设备正忙或故障，无法出货！');
							}
							break;
						case 'order_shipping_fail':
							log(responsData);
							var stringFail = '出货失败订单列表：<br/>';
							for(var i of responsData){
								stringFail += i + '<br/>';
							}
							alern(stringFail);
							break;
					}
					break; 
			}
		};

		ws.onerror = function(e){
			alern('连接发生了错误！');
		}

		ws.onclose = function(e){
			// 关闭 websocket
			log(e);
			clearInterval(timore);
			alern('连接已被关闭！');
		};
	}else{
		// 浏览器不支持 WebSocket
		alern("您的浏览器不支持 WebSocket!");
	}
}
WebSocketp2p();
		
//var obj = {'name': '张三','age': 25,'sex': '男'};
// obj = JSON.stringify(obj);
// obj = JSON.parse(obj);
