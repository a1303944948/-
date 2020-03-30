function byStart(machCODE){
	var itemCommodity = c('user_body_right_foot_item_commodity');
	for(var i = 0; i < itemCommodity.length; i++){
		itemCommodity[i].style.height = window.innerHeight - 425 + 'px';
	}
	//商品配置
	$.ajax({
		type: 'post',
		url: URLS + '/rocars/getRecarsByMachCode.json',
		data: {
			machCode: machCODE,
		},
		async: false,
		dataType: 'json',
		success: function(data){
			MACHCOMMOD = data;
			var commodityaTbody = c('user_body_right_foot_item_commoditya_tbody')[0];
			commodityaTbody.innerHTML = "";
			for(var i = 0;i < MACHCOMMOD.length; i++){
				var tr = creat('tr');
				var tda = creat('td');
				var tdb = creat('td');
				var tdc = creat('td');
				var tdd = creat('td');
				tda.innerHTML = MACHCOMMOD[i].recars;
				tda.title = MACHCOMMOD[i].id;
				tdb.innerHTML = '<input class="user_body_right_foot_item_commoditya_tbody_inta" name="'+MACHCOMMOD[i].recarsType+'" value="'+MACHCOMMOD[i].goods+'" readonly="readonly" data-value="'+MACHCOMMOD[i].goodsId+'" placeholder="请选择商品..."/><span class="user_body_right_foot_item_commoditya_tbody_inta_close">×</span>';
				tdc.innerHTML = '<input class="user_body_right_foot_item_commoditya_tbody_intb" value="'+MACHCOMMOD[i].number+'" type="number"/>';
				var pride = MACHCOMMOD[i].price;
				if(pride == ""){
					pride = 1;
				}
				tdd.innerHTML = '<input class="user_body_right_foot_item_commoditya_tbody_intc" type="number" value="'+pride+'"/>';
				tr.appendChild(tda);
				tr.appendChild(tdb);
				tr.appendChild(tdc);
				tr.appendChild(tdd);
				commodityaTbody.appendChild(tr);
			}

			/*var commodityaDivTbody = c('user_body_right_foot_item_commoditya_div_tbody')[0];
			var ScrollTop = 0;
			commodityaDivTbody.onscroll = function(){
				ScrollTop = this.scrollTop;
			}*/
			var commodityaTbodyIntaClose = c('user_body_right_foot_item_commoditya_tbody_inta_close');
			var commodityaTbodyInta = c('user_body_right_foot_item_commoditya_tbody_inta');
			var commodityaTbodyIntb = c('user_body_right_foot_item_commoditya_tbody_intb');
			for(var i = 0; i < commodityaTbodyInta.length; i++){
				(function(q){
					commodityaTbodyIntaClose[q].onclick = function(){
						commodityaTbodyInta[q].value = "";
						commodityaTbodyInta[q].setAttribute('data-value','');
						commodityaTbodyIntb[q].value = "";
					}
					commodityaTbodyInta[q].onfocus = function(){
						var that = this;
						$.ajax({
							type: 'post',
							url: URLS + '/rocars/getGoodsByType.json',
							data: {
								operPartyID: MACHOBJECT.operatorID,
								recarsType: that.name,
							},
							success: function(msg){
								var intaMsg = msg;
								var ul = creat('ul');
								ul.className = 'user_body_right_foot_item_commoditya_tbody_ula';
								ul.setAttribute('data-list',q);
								ul.style.width = that.clientWidth + 'px';
								if(window.innerHeight < 650){
									ul.style.maxHeight = "120px";
								}
								var li = creat('li');
								li.innerHTML = '<input class="commodityaTbodyIntZ" placeholder="请输入..."/>';
								li.setAttribute('data-value','');
								li.style.color = '#999999';
								ul.appendChild(li);
								for(var j = 0; j < msg.length; j++){
									var li = creat('li');
									li.className = "user_body_right_foot_item_commoditya_tbody_ula_li";
									li.innerHTML = msg[j].goods;
									li.setAttribute('data-value',msg[j].goodsId);
									ul.appendChild(li);
								}
								that.parentNode.appendChild(ul);
								var commodityaTbodyUla = c('user_body_right_foot_item_commoditya_tbody_ula');
								var commodityaTbodyUlaLi = c('user_body_right_foot_item_commoditya_tbody_ula_li');
								var commodityaTbodyIntZ = c('commodityaTbodyIntZ');
								commodityaTbodyIntZ[0].onmousedown = function(e){
									e.stopPropagation();
									var commodityaTbodyIntZ = c('commodityaTbodyIntZ');
									setTimeout(function(){
										var ul = creat('ul');
										ul.className = 'user_body_right_foot_item_commoditya_tbody_ula';
										ul.setAttribute('data-list',q);
										ul.style.width = commodityaTbodyInta[q].clientWidth + 'px';
										var li = creat('li');
										li.innerHTML = '<input class="commodityaTbodyIntZ" placeholder="请输入..."/>';
										li.setAttribute('data-value','');
										li.style.color = '#999999';
										ul.appendChild(li);
										for(var j = 0; j < msg.length; j++){
											var li = creat('li');
											li.className = "user_body_right_foot_item_commoditya_tbody_ula_li";
											li.innerHTML = msg[j].goods;
											li.setAttribute('data-value',msg[j].goodsId);
											ul.appendChild(li);
										}
										var commodityaTbodyUla = c('user_body_right_foot_item_commoditya_tbody_ula');
										commodityaTbodyInta[q].parentNode.appendChild(ul);
										for(var j = 0; j < commodityaTbodyUla[0].children.length; j++){
											if(j !== 0){
												commodityaTbodyUla[0].children[j].onmousedown = function(){
													if(this.dataset.value == ''){
														that.value = '';
														that.setAttribute('data-value','');
													}else{
														that.value = this.innerHTML;
														that.setAttribute('data-value',this.dataset.value);
													}
												}
											}
										}
										commodityaTbodyIntZ[0].focus();
										commodityaTbodyIntZ[0].oninput = function(){
											var patt1 = new RegExp(commodityaTbodyIntZ[0].value);
											for(var j = commodityaTbodyUlaLi.length; j > 0; j--){
												commodityaTbodyUla[0].removeChild(commodityaTbodyUlaLi[j-1]);
											}
											for(var j = 0; j < intaMsg.length; j++){
												if(patt1.test(intaMsg[j].goods)){
													var li = creat('li');
													li.innerHTML = intaMsg[j].goods;
													li.className = "user_body_right_foot_item_commoditya_tbody_ula_li";
													li.setAttribute('data-value',intaMsg[j].goodsId);
													commodityaTbodyUla[0].appendChild(li);
												};
											}
											for(var j = 0; j < commodityaTbodyUla[0].children.length; j++){
												if(j !== 0) {
													commodityaTbodyUla[0].children[j].onmousedown = function () {
														if (this.dataset.value == '') {
															that.value = '';
															that.setAttribute('data-value', '');
														} else {
															that.value = this.innerHTML;
															that.setAttribute('data-value', this.dataset.value);
														}
														//commodityaTbodyUla[0].parentNode.removeChild(commodityaTbodyUla[0].parentNode.children[2]);
													}
												}
											}
										}
										commodityaTbodyIntZ[0].onblur = function(){
											if(that.name != "Aries"&&that.name != "Spring"&&commodityaTbodyInta[q].name != "CapsuleCoffee"&&that.value != ""){
												commodityaTbodyIntb[q].value = 1;
											}else if(commodityaTbodyInta[q].name == "CapsuleCoffee"){
												commodityaTbodyIntb[q].value = 7;
											}
											commodityaTbodyUla[0].parentNode.removeChild(commodityaTbodyUla[0].parentNode.children[2]);
										}
									},1);
								}
								//ul.style.height = that.parentNode.offsetParent.clientHeight - that.parentNode.offsetTop + ScrollTop - 40 + 'px';

								for(var j = 0; j < commodityaTbodyUla[0].children.length; j++){
									if(j !== 0){
										commodityaTbodyUla[0].children[j].onmousedown = function(){
											if(this.innerHTML == '请选择...'){
												that.value = '';
												that.setAttribute('data-value','');
											}else{
												that.value = this.innerHTML;
												that.setAttribute('data-value',this.dataset.value);
											}
										}
									}
								}
							}
						})
					}
					commodityaTbodyInta[q].onblur = function(){
						if(commodityaTbodyInta[q].name != "Aries"&&commodityaTbodyInta[q].name != "Spring"&&commodityaTbodyInta[q].name != "CapsuleCoffee"&&commodityaTbodyInta[q].value != ""){
							commodityaTbodyIntb[q].value = 1;
						}else if(commodityaTbodyInta[q].name == "CapsuleCoffee"){
							commodityaTbodyIntb[q].value = 7;
						}
						this.parentNode.removeChild(this.parentNode.children[2]);
					}
				})(i)
			}
		}
	})
	var itemBtnca = c('user_body_right_foot_item_btnca')[0];
	itemBtnca.onclick = function(){
		var itemCommodityaTbody = c('user_body_right_foot_item_commoditya_tbody')[0];
		var objTbody = [];	//被提交的数据集合
		var xsbwk = [];		//判断价格系数不能为空的数组
		var slbwk = [];		//商品存在则商品数量不能为空
		var spbwk = [];		//商品数量存在则商品不能为空
		var xsty = [];		//同商品的价格系数必须统一
		var objObject = [];	//将所有报错数据汇总到一起提示
		for(var i = 0; i < itemCommodityaTbody.children.length; i++){
			var objTbodys = [];
			if(itemCommodityaTbody.children[i].children[3].children[0].value == ""){
				xsbwk.push(itemCommodityaTbody.children[i].children[0].innerHTML + '价格系数不能为空!<br/>');
			}
			if(itemCommodityaTbody.children[i].children[1].children[0].value != ""&&itemCommodityaTbody.children[i].children[2].children[0].value == ""){
				slbwk.push(itemCommodityaTbody.children[i].children[0].innerHTML + '商品数量不能为空!<br/>')
			}
			if(itemCommodityaTbody.children[i].children[1].children[0].value == ""&&itemCommodityaTbody.children[i].children[2].children[0].value != ""){
				spbwk.push(itemCommodityaTbody.children[i].children[0].innerHTML + '商品不能为空!<br/>')
			}
			objTbodys.push(machCODE);																//设备编号
			objTbodys.push(itemCommodityaTbody.children[i].children[0].innerHTML);					//货道
			objTbodys.push(itemCommodityaTbody.children[i].children[1].children[0].value);			//商品名称
			objTbodys.push(itemCommodityaTbody.children[i].children[1].children[0].dataset.value);	//商品ID
			objTbodys.push(itemCommodityaTbody.children[i].children[1].children[0].name);			//货道类型
			objTbodys.push(itemCommodityaTbody.children[i].children[2].children[0].value);			//商品数量
			objTbodys.push(itemCommodityaTbody.children[i].children[3].children[0].value);			//价格系数
			objTbodys.push(itemCommodityaTbody.children[i].children[0].title);						//货道ID
			objTbody.push(objTbodys);
		};
		if(xsbwk != ''){
			alern(xsbwk.join(''));
			return false;
		};
		if(slbwk != ''){
			alern(slbwk.join(''));
			return false;
		};
		if(spbwk != ''){
			alern(spbwk.join(''));
			return false;
		};
		//筛选出商品为空的先排除
		var ceObjTbody = objTbody.slice(0);
		for(var i = objTbody.length-1; i > 0; i--){
			if(objTbody[i][2] == ""){
				ceObjTbody.splice(i,1)
			}
		}
		//筛选出不重复的商品列表
		var ceObjTbodys = [];
		for(var i = 0; i < ceObjTbody.length; i++){
			var count = 0;
			for(var j = 0; j < ceObjTbodys.length; j++){
				if(ceObjTbody[i][3] == ceObjTbodys[j][3]){
					count = 1;
				}
			}
			if(count == 0){
				ceObjTbodys.push(ceObjTbody[i]);
			}
		}
		//将商品相同的货道分类到一起
		for(var i = 0; i < ceObjTbodys.length; i++){
			var xstyObject = [];
			for(var j = 0; j < ceObjTbody.length; j++){
				if(ceObjTbodys[i][3] == ceObjTbody[j][3]){
					xstyObject.push(ceObjTbody[j]);
				}
			}
			xsty.push(xstyObject);
			xsty.push('<br/>');
		}
		for(var i = 0; i < xsty.length; i++){
			var count = 0;
			var xstyCount = [];
			xstyCount.push(xsty[i][0][2]);
			xstyCount.push('<div style="font-size: 14px; color: red; margin-bottom: 5px;">价格系数不一致</div>');
			for(var j = 0; j < xsty[i].length; j++){
				xstyCount.push(xsty[i][j][1] +'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;系数: '+ xsty[i][j][6] +'</br>');
				if(xsty[i][j][6] != xsty[i][0][6]){
					count = 1;
				}
			}
			xstyCount.push('</br>');
			if(count == 1){
				objObject.push(xstyCount.join(''));
			}
		}
		if(objObject != ''){
			alern(objObject.join(''));
			return false;
		}
		$.ajax({
			type: 'post',
			url: URLS + '/rocars/updateRecars.json',
			data: {
				machCode: machCODE,
				jsData: JSON.stringify(objTbody),
			},
			success: function(){
				alern('成功！');
				byStart(machCODE);
			},
			error: function(){
				alern('失败！');
			}
		})
	}
	//库存预警
	MACHUSER = [];
	for(var i = 0; i < MACH.length; i++){
		var datas = {};
		if(MACH[i].icon == 3){
			datas.id = MACH[i].empcode;
			datas.text = MACH[i].text;
			MACHUSER.push(datas);
		}
	}
	function inventoryWarning(userArr){
		var uitemCommoditybUl = c('user_body_right_foot_item_commodityb_ul')[0];	//库存预警人员载体
		var itemCommoditybInt = c('user_body_right_foot_item_commodityb_int')[0];	//库存预警值
		itemCommoditybInt.value = "";
		uitemCommoditybUl.innerHTML = "";
		for(var i = 0; i < userArr.length; i++){
			var li = creat('li');
			li.innerHTML = '<input type="checkbox" name="'+userArr[i].id+'"/><img src="image/grouping/004.png">' + userArr[i].text;
			uitemCommoditybUl.appendChild(li);
		}
		$.ajax({
			type: 'post',
			url: URLX + '/jf/com/inventorywarning/show.json',
			data: {
				machCode: machCODE,
			},
			success: function(data){
				if(data.inventoryWarning != undefined){
					var warningUser = JSON.parse(data.inventoryWarning.knowpeople);
					for(i = 0; i < uitemCommoditybUl.children.length; i++){
						for(var j = 0; j < warningUser.length; j++){
							if(uitemCommoditybUl.children[i].children[0].name == warningUser[j]){
								uitemCommoditybUl.children[i].children[0].checked = true;
								break;
							}
						}
					}
					itemCommoditybInt.value = data.inventoryWarning.stockparam;
				};
			}
		})
	}
	inventoryWarning(MACHUSER);

	//保存库存预警
	var itemCommoditybBtn = c('user_body_right_foot_item_commodityb_btn')[0];
	itemCommoditybBtn.onclick = function(){
		var uitemCommoditybUl = c('user_body_right_foot_item_commodityb_ul')[0];	//库存预警人员载体
		var itemCommoditybInt = c('user_body_right_foot_item_commodityb_int')[0];	//库存预警值
		var warningArr = [];
		var warningObj = new Object();
		for(var i = 0; i < uitemCommoditybUl.children.length; i++){
			if(uitemCommoditybUl.children[i].children[0].checked){
				warningArr.push(uitemCommoditybUl.children[i].children[0].name);
			}
		}
		warningObj.stockparam = itemCommoditybInt.value;
		warningObj.machCode = machCODE;
		warningObj.knowpeople = warningArr;
		$.ajax({
			type: 'post',
			url: URLX + '/jf/com/inventorywarning/add.json',
			data: {
				obj: JSON.stringify(warningObj),
			},
			success: function(data){
				alern(data.msg);
			}
		})
	}
}

/*补货管理*/
function hdStart(machCODE){
	var itemTonic = c('user_body_right_foot_item_tonic')[0];
	itemTonic.style.height = window.innerHeight - 430 + 'px';
	var tonicHeadTable = c('user_body_right_foot_item_tonic_head_table')[0];	//补货清单
	var tonicBodyaTbody = c('user_body_right_foot_item_tonic_bodya_tbody')[0];	//清出列表
	var tonicBodybTbody = c('user_body_right_foot_item_tonic_bodyb_tbody')[0];	//补入列表（按商品排列）
	var tonicBodycTbody = c('user_body_right_foot_item_tonic_bodyc_tbody')[0];	//补入列表（按货道排列）

	var itemBtncba = c('user_body_right_foot_item_btncba')[0];	//生成按钮
	var itemBtncbb = c('user_body_right_foot_item_btncbb')[0];	//补货完成按钮
	var itemBtncbc = c('user_body_right_foot_item_btncbc')[0];	//打印按钮
	var itemBtncbd = c('user_body_right_foot_item_btncbd')[0];	//导出为Excel
	function myPrint(obj){
	    //打开一个新窗口newWindow
	    var newWindow=window.open("打印页面","_blank");
	    //要打印的div的内容
	    var docStr = obj.innerHTML;
	    //打印内容写入newWindow文档
	    newWindow.document.write(docStr);
	    //关闭文档
	    newWindow.document.close();
	    //调用打印机
	    newWindow.print();
	    //关闭newWindow页面
	    newWindow.close();
	}
	itemBtncbc.onclick = function(){
		myPrint(c('user_body_right_foot_item_tonic')[0]);
	}
	function tableName(tableNmaeId,excelTable){
		var idTmr;
		function  getExplorer() {
		    var explorer = window.navigator.userAgent ;
		    //ie
		    if (explorer.indexOf("MSIE") >= 0) {
		        return 'ie';
		    }
		    //firefox
		    else if (explorer.indexOf("Firefox") >= 0) {
		        return 'Firefox';
		    }
		    //Chrome
		    else if(explorer.indexOf("Chrome") >= 0){
		        return 'Chrome';
		    }
		    //Opera
		    else if(explorer.indexOf("Opera") >= 0){
		        return 'Opera';
		    }
		    //Safari
		    else if(explorer.indexOf("Safari") >= 0){
		        return 'Safari';
		    }
		}
		function method1(tableid) {//整个表格拷贝到EXCEL中
		    if(getExplorer()=='ie') {
		        var curTbl = document.getElementById(tableid);
		        var oXL = new ActiveXObject("Excel.Application");

		        //创建AX对象excel
		        var oWB = oXL.Workbooks.Add();
		        //获取workbook对象
		        var xlsheet = oWB.Worksheets(1);
		        //激活当前sheet
		        var sel = document.body.createTextRange();
		        sel.moveToElementText(curTbl);
		        //把表格中的内容移到TextRange中
		        sel.select;
		        //全选TextRange中内容
		        sel.execCommand("Copy");
		        //复制TextRange中内容
		        xlsheet.Paste();
		        //粘贴到活动的EXCEL中
		        oXL.Visible = true;
		        //设置excel可见属性

		        try {
		            var fname = oXL.Application.GetSaveAsFilename("Excel.xls", "Excel Spreadsheets (*.xls), *.xls");
		        } catch (e) {
		            print("Nested catch caught " + e);
		        } finally {
		            oWB.SaveAs(fname);

		            oWB.Close(savechanges = false);
		            //xls.visible = false;
		            oXL.Quit();
		            oXL = null;
		            //结束excel进程，退出完成
		            //window.setInterval("Cleanup();",1);
		            idTmr = window.setInterval("Cleanup();", 1);
		        }
		    } else {
		        tableToExcel('ta')
		    }
		}
		function Cleanup() {
		    window.clearInterval(idTmr);
		    CollectGarbage();
		}

		/*
		    template ： 定义文档的类型，相当于html页面中顶部的<!DOCTYPE> 声明。（个人理解，不确定）
		    encodeURIComponent:解码
		    unescape() 函数：对通过 escape() 编码的字符串进行解码。
		    window.btoa(window.encodeURIComponent(str)):支持汉字进行解码。
		    \w ：匹配包括下划线的任何单词字符。等价于’[A-Za-z0-9_]’
		    replace()方法：用于在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串。
		    {(\w+)}：匹配所有 {1个或更多字符} 形式的字符串；此处匹配输出内容是 “worksheet”
		    正则中的() ：是为了提取匹配的字符串。表达式中有几个()就有几个相应的匹配字符串。
		    讲解(/{(\w+)}/g, function(m, p) { return c[p]; } ：
		        /{(\w+)}/g 匹配出所有形式为“{worksheet}”的字符串；
		        function参数：  m  正则所匹配到的内容，即“worksheet”；
		                        p  正则表达式中分组的内容,即“(\w+)”分组中匹配到的内容，为“worksheet”；
		        c ：为object，见下图3
		        c[p] : 为“worksheet”

		*/
		var tableToExcel = (function() {
			var uri = 'data:application/vnd.ms-excel;base64,',
			template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
			base64 = function(s) {
				return window.btoa(unescape(encodeURIComponent(s)))
			},
			// 下面这段函数作用是：将template中的变量替换为页面内容ctx获取到的值
			format = function(s, c) {
					return s.replace(/{(\w+)}/g,
									function(m, p) {
										return c[p];
									}
					)
			};
			return function(table, name) {
				table = document.getElementById(tableNmaeId);
				// 获取表单的名字和表单查询的内容
		 		var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML};
				// format()函数：通过格式操作使任意类型的数据转换成一个字符串
				// base64()：进行编码
				var link = document.createElement("A");
				link.href = uri + base64(format(template, ctx));
				var excelDate = new Date();

				var names = excelDate.getFullYear() + '-' + (excelDate.getMonth()+1) + '-' + excelDate.getDate();
				link.download = '补货清单' + names + '.xls';
				link.target = '_blank';
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
				document.body.removeChild(table);
				//window.location.href = uri + base64(format(template, ctx))
			}
		})()
		method1(excelTable);
	}
	var excelTable = d('user_body_right_foot_item_tonic');
	//渲染导出补货管理操作
	itemBtncbd.onclick = function(){
		var p1 = c('user_body_right_foot_item_tonic_p1')[0];
		var p2 = c('user_body_right_foot_item_tonic_p2')[0];
		var p3 = c('user_body_right_foot_item_tonic_p3')[0];
		var p4 = c('user_body_right_foot_item_tonic_p4')[0];
		var table1 = c('user_body_right_foot_item_tonic_head_table')[0];
		var table2 = c('user_body_right_foot_item_tonic_bodya_table')[0];
		var table3 = c('user_body_right_foot_item_tonic_bodyb_table')[0];
		var table4 = c('user_body_right_foot_item_tonic_bodyc_table')[0];
		var table = creat('table');
		table.id = 'user_body_right_foot_item_tonic_bodyc_table_total';
		function tbodyCreat(){
			var tra = creat('tr');
			var tda1 = creat('td');
			tda1.innerHTML = p1.innerHTML;
			tda1.colSpan = '5';
			tra.appendChild(tda1);
			table.appendChild(tra);
			for(var i = 0; i < table1.children.length;i++){
				var trb = creat('tr');
				var tdb1 = creat('td');
				var tdb2 = creat('td');
				var tdb3 = creat('td');
				var tdb4 = creat('td');
				tdb1.innerHTML = table1.children[i].children[0].innerHTML;
				tdb2.innerHTML = table1.children[i].children[1].innerHTML;
				tdb3.innerHTML = table1.children[i].children[2].innerHTML;
				tdb4.innerHTML = table1.children[i].children[3].innerHTML;
				tdb4.colSpan = '2';
				trb.appendChild(tdb1);
				trb.appendChild(tdb2);
				trb.appendChild(tdb3);
				trb.appendChild(tdb4);
				table.appendChild(trb);
			}
			var trc = creat('tr');
			var tdc1 = creat('td');
			tdc1.innerHTML = p2.innerHTML;
			tdc1.colSpan = '5';
			trc.appendChild(tdc1);
			table.appendChild(trc);
			var trd = creat('tr');
			var tdd1 = creat('td');
			var tdd2 = creat('td');
			var tdd3 = creat('td');
			var tdd4 = creat('td');
			var tdd5 = creat('td');
			tdd1.innerHTML = table2.children[0].children[0].children[0].innerHTML;
			tdd2.innerHTML = table2.children[0].children[0].children[1].innerHTML;
			tdd3.innerHTML = table2.children[0].children[0].children[2].innerHTML;
			tdd4.innerHTML = table2.children[0].children[0].children[3].innerHTML;
			tdd5.innerHTML = table2.children[0].children[0].children[4].innerHTML;
			trd.appendChild(tdd1);
			trd.appendChild(tdd2);
			trd.appendChild(tdd3);
			trd.appendChild(tdd4);
			trd.appendChild(tdd5);
			table.appendChild(trd);
			if(table2.children[1].children[0].children[0].innerHTML != "没有数据..."){
				for(var i = 0; i < table2.children[1].children.length; i++){
					var trds = creat('tr');
					var tdds1 = creat('td');
					var tdds2 = creat('td');
					var tdds3 = creat('td');
					var tdds4 = creat('td');
					var tdds5 = creat('td');
					tdds1.innerHTML = table2.children[1].children[i].children[0].innerHTML;
					tdds2.innerHTML = table2.children[1].children[i].children[1].innerHTML;
					tdds3.innerHTML = table2.children[1].children[i].children[2].innerHTML;
					tdds4.innerHTML = table2.children[1].children[i].children[3].innerHTML;
					tdds5.innerHTML = table2.children[1].children[i].children[4].innerHTML;
					trds.appendChild(tdds1);
					trds.appendChild(tdds2);
					trds.appendChild(tdds3);
					trds.appendChild(tdds4);
					trds.appendChild(tdds5);
					table.appendChild(trds);
				}
			}else{
				var trds = creat('tr');
				var tdds1 = creat('td');
				tdds1.innerHTML = "没有数据...";
				tdds1.colSpan = '5';
				trds.appendChild(tdds1);
				table.appendChild(trds);
			}
			var tre = creat('tr');
			var tde1 = creat('td');
			tde1.innerHTML = p3.innerHTML;
			tde1.colSpan = '5';
			tre.appendChild(tde1);
			table.appendChild(tre);
			var trf = creat('tr');
			var tdf1 = creat('td');
			var tdf2 = creat('td');
			var tdf3 = creat('td');
			tdf1.innerHTML = table3.children[0].children[0].children[0].innerHTML;
			tdf2.innerHTML = table3.children[0].children[0].children[1].innerHTML;
			tdf2.colSpan = '2';
			tdf3.innerHTML = table3.children[0].children[0].children[2].innerHTML;
			tdf3.colSpan = '2';
			trf.appendChild(tdf1);
			trf.appendChild(tdf2);
			trf.appendChild(tdf3);
			table.appendChild(trf);
			if(table3.children[1].children[0].children[0].innerHTML != "没有数据..."){
				for(var i = 0; i < table3.children[1].children.length; i++){
					var trfs = creat('tr');
					var tdfs1 = creat('td');
					var tdfs2 = creat('td');
					var tdfs3 = creat('td');
					tdfs1.innerHTML = table3.children[1].children[i].children[0].innerHTML;
					tdfs2.innerHTML = table3.children[1].children[i].children[1].innerHTML;
					tdfs2.colSpan = '2';
					tdfs3.innerHTML = table3.children[1].children[i].children[2].innerHTML;
					tdfs3.colSpan = '2';
					trfs.appendChild(tdfs1);
					trfs.appendChild(tdfs2);
					trfs.appendChild(tdfs3);
					table.appendChild(trfs);
				}
			}else{
				var trfs = creat('tr');
				var tdfs1 = creat('td');
				tdfs1.innerHTML = "没有数据...";
				tdfs1.colSpan = '5';
				trfs.appendChild(tdfs1);
				table.appendChild(trfs);
			}
			var trg = creat('tr');
			var tdg1 = creat('td');
			tdg1.innerHTML = p4.innerHTML;
			tdg1.colSpan = '5';
			trg.appendChild(tdg1);
			table.appendChild(trg);
			var trh = creat('tr');
			var tdh1 = creat('td');
			var tdh2 = creat('td');
			var tdh3 = creat('td');
			var tdh4 = creat('td');
			tdh1.innerHTML = table4.children[0].children[0].children[0].innerHTML;
			tdh2.innerHTML = table4.children[0].children[0].children[1].innerHTML;
			tdh3.innerHTML = table4.children[0].children[0].children[2].innerHTML;
			tdh3.colSpan = '2';
			tdh4.innerHTML = table4.children[0].children[0].children[3].innerHTML;
			trh.appendChild(tdh1);
			trh.appendChild(tdh2);
			trh.appendChild(tdh3);
			trh.appendChild(tdh4);
			table.appendChild(trh);
			if(table4.children[1].children[0].children[0].innerHTML != "没有数据..."){
				for(var i = 0; i < table4.children[1].children.length; i++){
					var trhs = creat('tr');
					var tdhs1 = creat('td');
					var tdhs2 = creat('td');
					var tdhs3 = creat('td');
					var tdhs4 = creat('td');
					tdhs1.innerHTML = table4.children[1].children[i].children[0].innerHTML;
					tdhs2.innerHTML = table4.children[1].children[i].children[1].innerHTML;
					tdhs3.innerHTML = table4.children[1].children[i].children[2].innerHTML;
					tdhs3.colSpan = '2';
					tdhs4.innerHTML = table4.children[1].children[i].children[3].innerHTML;
					trhs.appendChild(tdhs1);
					trhs.appendChild(tdhs2);
					trhs.appendChild(tdhs3);
					trhs.appendChild(tdhs4);
					table.appendChild(trhs);
				}
			}else{
				var trhs = creat('tr');
				var tdhs1 = creat('td');
				tdhs1.innerHTML = "没有数据...";
				tdhs1.colSpan = '5';
				trhs.appendChild(tdhs1);
				table.appendChild(trhs);
			}
			n('body')[0].appendChild(table);
			tableName('user_body_right_foot_item_tonic_bodyc_table_total',table);
		}
		tbodyCreat();
	}
	//补货管理初始渲染
	$.ajax({
		type: 'post',
		url: URLX + '/replenishment/created/view.json',
		data: {
			machCode: machCODE,
		},
		success: function(data){
			//补货清单详情
			tonicHeadTable.innerHTML = "";
			function buhuoqingdan(a,b,c,d){
				var tr = creat('tr');
				var tda = creat('td');
				var tdb = creat('td');
				var tdc = creat('td');
				var tdd = creat('td');
				tda.innerHTML = a;
				tdb.innerHTML = b;
				tdc.innerHTML = c;
				tdd.innerHTML = d;
				tr.appendChild(tda);
				tr.appendChild(tdb);
				tr.appendChild(tdc);
				tr.appendChild(tdd);
				tonicHeadTable.appendChild(tr);
			}
			data.timeBR?data.timeBR = worldDateTime(new Date(data.timeBR)):data.timeBR=data.timeBR;
			buhuoqingdan('设备编号:',data.machCode,'设备名称:',data.machName);
			buhuoqingdan('运营方:',data.operator,'创建时间:',data.timeBR);
			buhuoqingdan('机型:',data.model,'设备地址:',data.useAddr);
			//清出列表
			function qingchuliebiao(){
				tonicBodyaTbody.innerHTML = "";
				if(data.dataQC.length != 0){
					for(var i = 0; i < data.dataQC.length; i++){
						var tr = creat('tr');
						var tda = creat('td');
						var tdb = creat('td');
						var tdc = creat('td');
						var tdd = creat('td');
						var tde = creat('td');
						tda.innerHTML = i+1;
						tdb.innerHTML = '<' + data.dataQC[i].cargoDatan + '>';
						tdc.innerHTML = data.dataQC[i].waresName;
						tdd.innerHTML = data.dataQC[i].isPastdue;
						tde.innerHTML = data.dataQC[i].clearData;
						tr.appendChild(tda);
						tr.appendChild(tdb);
						tr.appendChild(tdc);
						tr.appendChild(tdd);
						tr.appendChild(tde);
						tonicBodyaTbody.appendChild(tr);
					}
				}else{
					var tr = creat('tr');
					var td= creat('td');
					td.innerHTML = "没有数据...";
					td.colSpan = 5;
					td.style.backgroundColor = "#ffffff";
					td.style.color = "#999999";
					tr.appendChild(td);
					tonicBodyaTbody.appendChild(tr);
				}
				
			}
			qingchuliebiao();
			//补入商品汇总
			function burushangpinhuizong(){
				tonicBodybTbody.innerHTML = "";
				if(data.dataZBR.length != 0){
					for(var i = 0; i < data.dataZBR.length; i++){
						var tr = creat('tr');
						var tda = creat('td');
						var tdb = creat('td');
						var tdc = creat('td');
						tda.innerHTML = i+1;
						tdb.innerHTML = data.dataZBR[i].goodsName;
						tdc.innerHTML = data.dataZBR[i].isExist;
						tr.appendChild(tda);
						tr.appendChild(tdb);
						tr.appendChild(tdc);
						tonicBodybTbody.appendChild(tr);
					}
					var tr = creat('tr');
					var tda = creat('td');
					var tdb = creat('td');
					var tdc = creat('td');
					tda.innerHTML = "";
					tdb.innerHTML = "总计";
					tdc.innerHTML = data.totalBR;
					tr.appendChild(tda);
					tr.appendChild(tdb);
					tr.appendChild(tdc);
					tonicBodybTbody.appendChild(tr);
				}else{
					var tr = creat('tr');
					var td= creat('td');
					td.innerHTML = "没有数据...";
					td.colSpan = 3;
					td.style.backgroundColor = "#ffffff";
					td.style.color = "#999999";
					tr.appendChild(td);
					tonicBodybTbody.appendChild(tr);
				}
			}
			burushangpinhuizong();
			//补入明细
			function burumingxi(){
				tonicBodycTbody.innerHTML = "";
				if(data.dataBR.length != 0){
					for(var i = 0; i < data.dataBR.length; i++){
						var tr = creat('tr');
						var tda = creat('td');
						var tdb = creat('td');
						var tdc = creat('td');
						var tdd = creat('td');
						tda.innerHTML = i+1;
						tdb.innerHTML = '<' + data.dataBR[i].cargoData + '>';
						tdc.innerHTML = data.dataBR[i].goodsName;
						tdd.innerHTML = data.dataBR[i].isExist;
						tr.appendChild(tda);
						tr.appendChild(tdb);
						tr.appendChild(tdc);
						tr.appendChild(tdd);
						tonicBodycTbody.appendChild(tr);
					}
				}else{
					var tr = creat('tr');
					var td= creat('td');
					td.innerHTML = "没有数据...";
					td.colSpan = 4;
					td.style.backgroundColor = "#ffffff";
					td.style.color = "#999999";
					tr.appendChild(td);
					tonicBodycTbody.appendChild(tr);
				}
			}
			burumingxi();
		}
	})
	//补货管理点击生成按钮后渲染
	itemBtncba.onclick = function(){
		if(confirm('是否生成?')){
			$.ajax({
				type: 'post',
				url: URLX + '/replenishment/web_sys/form/list.json',
				data: {
					machCode: machCODE,
				},
				success: function(data){
					//补货清单详情
					tonicHeadTable.innerHTML = "";
					tonicBodyaTbody.innerHTML = "";
					tonicBodybTbody.innerHTML = "";
					tonicBodycTbody.innerHTML = "";
					function buhuoqingdan(a,b,c,d){
						var tr = creat('tr');
						var tda = creat('td');
						var tdb = creat('td');
						var tdc = creat('td');
						var tdd = creat('td');
						tda.innerHTML = a;
						tdb.innerHTML = b;
						tdc.innerHTML = c;
						tdd.innerHTML = d;
						tr.appendChild(tda);
						tr.appendChild(tdb);
						tr.appendChild(tdc);
						tr.appendChild(tdd);
						tonicHeadTable.appendChild(tr);
					}
					data.timeBR?data.timeBR = worldDateTime(new Date(data.timeBR)):data.timeBR=data.timeBR;
					buhuoqingdan('设备编号:',data.machCode,'设备名称:',data.machName);
					buhuoqingdan('运营方:',data.operator,'创建时间:',data.timeBR);
					buhuoqingdan('机型:',data.model,'设备地址:',data.useAddr);
					//清出列表
					function qingchuliebiao(){
						if(data.dataQC.length != 0){
							for(var i = 0; i < data.dataQC.length; i++){
								var tr = creat('tr');
								var tda = creat('td');
								var tdb = creat('td');
								var tdc = creat('td');
								var tdd = creat('td');
								var tde = creat('td');
								tda.innerHTML = i+1;
								tdb.innerHTML = '<' + data.dataQC[i].cargoDatan + '>';
								tdc.innerHTML = data.dataQC[i].waresName;
								tdd.innerHTML = data.dataQC[i].isPastdue;
								tde.innerHTML = data.dataQC[i].clearData;
								tr.appendChild(tda);
								tr.appendChild(tdb);
								tr.appendChild(tdc);
								tr.appendChild(tdd);
								tr.appendChild(tde);
								tonicBodyaTbody.appendChild(tr);
							}
						}else{
							var tr = creat('tr');
							var td= creat('td');
							td.innerHTML = "没有数据...";
							td.colSpan = 5;
							td.style.backgroundColor = "#ffffff";
							td.style.color = "#999999";
							tr.appendChild(td);
							tonicBodyaTbody.appendChild(tr);
						}
						
					}
					qingchuliebiao();
					//补入商品汇总
					function burushangpinhuizong(){
						if(data.dataZBR.length != 0){
							for(var i = 0; i < data.dataZBR.length; i++){
								var tr = creat('tr');
								var tda = creat('td');
								var tdb = creat('td');
								var tdc = creat('td');
								tda.innerHTML = i+1;
								tdb.innerHTML = data.dataZBR[i].goodsName;
								tdc.innerHTML = data.dataZBR[i].isExist;
								tr.appendChild(tda);
								tr.appendChild(tdb);
								tr.appendChild(tdc);
								tonicBodybTbody.appendChild(tr);
							}
							var tr = creat('tr');
							var tda = creat('td');
							var tdb = creat('td');
							var tdc = creat('td');
							tda.innerHTML = "";
							tdb.innerHTML = "总计";
							tdc.innerHTML = data.totalBR;
							tr.appendChild(tda);
							tr.appendChild(tdb);
							tr.appendChild(tdc);
							tonicBodybTbody.appendChild(tr);
						}else{
							var tr = creat('tr');
							var td= creat('td');
							td.innerHTML = "没有数据...";
							td.colSpan = 3;
							td.style.backgroundColor = "#ffffff";
							td.style.color = "#999999";
							tr.appendChild(td);
							tonicBodybTbody.appendChild(tr);
						}
					}
					burushangpinhuizong();
					//补入明细
					function burumingxi(){
						if(data.dataBR.length != 0){
							for(var i = 0; i < data.dataBR.length; i++){
								var tr = creat('tr');
								var tda = creat('td');
								var tdb = creat('td');
								var tdc = creat('td');
								var tdd = creat('td');
								tda.innerHTML = i+1;
								tdb.innerHTML = '<' + data.dataBR[i].cargoData + '>';
								tdc.innerHTML = data.dataBR[i].goodsName;
								tdd.innerHTML = data.dataBR[i].isExist;
								tr.appendChild(tda);
								tr.appendChild(tdb);
								tr.appendChild(tdc);
								tr.appendChild(tdd);
								tonicBodycTbody.appendChild(tr);
							}
						}else{
							var tr = creat('tr');
							var td= creat('td');
							td.innerHTML = "没有数据...";
							td.colSpan = 4;
							td.style.backgroundColor = "#ffffff";
							td.style.color = "#999999";
							tr.appendChild(td);
							tonicBodycTbody.appendChild(tr);
						}
					}
					burumingxi();
				}
			})
		}
	}
	//补货完成按钮
	itemBtncbb.onclick = function(){
		if(confirm('您确认设备上已经进行补货了吗？')){
			$.ajax({
				type: 'post',
				url: URLX + "/replenishment/auto-vendmach/web-btn/finish.json",
				data: {
					machCode: machCODE,
				},
				success: function (data) {
					alern('完成');
					zsStart(machCODE);
					tonicBodyaTbody.innerHTML = "";
					tonicBodybTbody.innerHTML = "";
					tonicBodycTbody.innerHTML = "";

					//清出列表
					function qingchuliebiao() {
						var tr = creat('tr');
						var td = creat('td');
						td.innerHTML = "没有数据...";
						td.colSpan = 5;
						td.style.backgroundColor = "#ffffff";
						td.style.color = "#999999";
						tr.appendChild(td);
						tonicBodyaTbody.appendChild(tr);
					}

					qingchuliebiao();

					//补入商品汇总
					function burushangpinhuizong() {
						var tr = creat('tr');
						var td = creat('td');
						td.innerHTML = "没有数据...";
						td.colSpan = 3;
						td.style.backgroundColor = "#ffffff";
						td.style.color = "#999999";
						tr.appendChild(td);
						tonicBodybTbody.appendChild(tr);
					}

					burushangpinhuizong();

					//补入明细
					function burumingxi() {
						var tr = creat('tr');
						var td = creat('td');
						td.innerHTML = "没有数据...";
						td.colSpan = 4;
						td.style.backgroundColor = "#ffffff";
						td.style.color = "#999999";
						tr.appendChild(td);
						tonicBodycTbody.appendChild(tr);
					}

					burumingxi();
				}
			})
		}
	}
}

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
						machModelID: MACHOBJECT.machModelID,
						macAddr: MACHOBJECT.macAddr,
						machName: MACHOBJECT.machName,
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
				remoteXuan(data[i].startTime,data[i].endTime,data[i].start,data[i].end,data[i].more);
			};
		}
	})
	remoteTitleAdd.onclick = function(){
		remoteXuan('','','','','');
	}

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
	c('user_body_right_foot_item_remote_title_submit')[0].onclick = function(){
		var itemRemoteTbodysc = c('user_body_right_foot_item_remote_tbodysc');
		var startTime = c('startTime');			//开始时间
		var endTime = c('endTime');				//结束时间
		var topRemote = c('topRemote');			//温度上限
		var bottomRemote = c('bottomRemote');	//温度下限
		var remoteTimeOut = c('remoteTimeOut');	//温度超时
		var remoteArr = [];
		var remoteErr = "";
		for(var i = 0; i < itemRemoteTbodysc.length; i++){
			var remoteObj = new Object();
			if(startTime[i].value == ""){
				remoteErr += 'No.' + (i+1) + '起时间不能为空!<br/>';
			}
			if(endTime[i].value == ""){
				remoteErr += 'No.' + (i+1) + '止时间不能为空!<br/>';
			}
			if(topRemote[i].value == ""){
				remoteErr += 'No.' + (i+1) + '上限不能为空!<br/>';
			}
			if(bottomRemote[i].value == ""){
				remoteErr += 'No.' + (i+1) + '下限不能为空!<br/>';
			}
			if(remoteTimeOut[i].value == ""){
				remoteErr += 'No.' + (i+1) + '工作时间不能为空!<br/>';
			}
			remoteObj.startTime = startTime[i].value;
			remoteObj.endTime = endTime[i].value;
			remoteObj.start = topRemote[i].value;
			remoteObj.end = bottomRemote[i].value;
			remoteObj.more = remoteTimeOut[i].value;
			remoteObj.machCode = machCODE;
			remoteArr.push(remoteObj);
		}
		if(remoteErr != ""){
			alern(remoteErr);
			return false;
		}
		$.ajax({
			type: 'post',
			url: URLS + '/worn/set.json',
			data: {
				string: JSON.stringify(remoteArr),
				machCode: machCODE,
			},
			success: function(data){
				if(data.a){
					alern('成功');
				};
			}
		})
	}
}