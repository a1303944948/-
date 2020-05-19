//input下拉框渲染
function start(){
	//BOM获取

	var sales_head = c('sales_head')[0];
	var selects = c('sales_head_selects');	//第一种类input下拉框(不携带value值的下拉框)
	var selects_ul = c('sales_head_selects_ul');


	group();
	groupanalysis(KIT,"",['0','1']);

	BOMAll(KIT,loginUserName.scopeofauthority);
	groupitemlevel(4,KITEXTR);
	LISTGROUP = [];		//每次点击时清空内容
	for(var i = 0; i < KITASSIGN.length; i++){
		LISTGROUP.push(KITASSIGN[i].devicecode);
	}

	//区域选择下拉框
	var Groupingz = c('device_head_groupingz')[0];
	var ul = creat('ul');
	ul.className = "device_head_ul";
	var li = "";
	for(var j = 0; j < KITANALYSIS.length; j++){
		li += (KITANALYSIS[j]);
	}
	ul.innerHTML = li;
	ul.style.minWidth = Groupingz.clientWidth + 'px';
	sales_head.appendChild(ul);
	function strDom(string){
		var ulDom = creat('ul');
		ulDom.innerHTML = string;
		return ulDom.children[0];
	}
	Groupingz.value = strDom(KITANALYSIS[0]).children[1].innerHTML;
	Groupingz.name = strDom(KITANALYSIS[0]).children[1].dataset.id;

	var headUlz = c('device_head_ul');
	Groupingz.onfocus = function(){
		headUlz[0].style.display = "inline-block";
		headUlz[0].style.left = this.offsetParent.offsetLeft + 5 + 'px';
		headUlz[0].style.top = this.offsetParent.offsetTop + this.clientHeight + 5 + 'px';
		headUlz[0].style.maxHeight = window.innerHeight - Groupingz.offsetParent.offsetTop - 200 + 'px';
	}
	Groupingz.onblur = function(){
		headUlz[0].style.display = "none";
	}

	for(var j = 0; j < headUlz[0].children.length; j++){
		headUlz[0].children[j].children[1].onmousedown = function(){
			Groupingz.value = this.innerHTML;
			Groupingz.name = this.dataset.id;
			BOMAll(KIT,this.dataset.id);
			groupitemlevel(4,KITEXTR);
			LISTGROUP = [];
			for(var i = 0; i < KITASSIGN.length; i++){
				LISTGROUP.push(KITASSIGN[i].devicecode);
			}
			console.log(LISTGROUP);
		}
	}

	WmStartSelect();
	//第一种类渲染
	//给下拉框元素创建下拉内容（不携带value值得下拉框）
	LIST = [
		['今天','昨天','本周','最近10天'],
	]
	for(var i = 0; i < selects.length; i++){
		var ul = creat('ul');
		ul.className = 'sales_head_selects_ul';
		ul.setAttribute('data-list',i);
		console.log(LIST);
		for(var j = 0; j < LIST[i].length; j++){
			var li = creat('li');
			var br = creat('br');
			li.innerHTML = LIST[i][j];
			ul.appendChild(li);
			ul.appendChild(br);
		}
		sales_head.appendChild(ul);
	}

	//渲染点击事件
	for(var i = 0; i < selects.length; i++){
		selects_ul[i].style.left = selects[i].offsetParent.offsetLeft + 5 + 'px';
		selects_ul[i].style.top = selects[i].offsetParent.offsetTop + selects[i].offsetParent.clientHeight - 4 + 'px';
		(function(q){
			//点击input框时的显示隐藏
			selects[q].onfocus = function(){
				selects_ul[q].style.display = 'inline-block';
			}
			selects[q].onblur = function(){
				selects_ul[q].style.display = 'none';
			}
			//点击ul时的显示隐藏
			selects[q].parentNode.children[1].onfocus = function(){
				selects_ul[q].style.display = 'inline-block';
			}
			selects[q].parentNode.children[1].onblur = function(){
				selects_ul[q].style.display = 'none';
			}
		})(i)
		//将ul中选中的数据渲染到input框中
		for(var j = 0; j < selects_ul[i].children.length; j++){
			if(j%2 == 0){
				selects_ul[i].children[j].onmousedown = function(){
					selects[this.offsetParent.dataset.list].value = this.innerHTML;
				}
			};
		}

		//给下拉框元素默认选中第一个值
		selects[i].value = selects_ul[i].children[0].innerHTML;
	}


	//第二种类渲染
	var selectz = c('sales_head_selectz');	//第二种类input下拉框(携带value值的下拉框)
	var selects_ulz = c('sales_head_selects_ulz');

	for(var i = 0; i < selectz.length; i++){
		var ul = creat('ul');
		ul.className = 'sales_head_selects_ulz';
		ul.setAttribute('data-list',i);
		console.log(LISTS);
		for(var j = 0; j < LISTS[i].length; j++){
			var li = creat('li');
			var br = creat('br');
			li.setAttribute("data-value", LISTS[i][j].value)
			li.innerHTML = LISTS[i][j].text;
			ul.appendChild(li);
			ul.appendChild(br);
		}
		sales_head.appendChild(ul);
	}


	//渲染点击事件
	for(var i = 0; i < selectz.length; i++){

		//给下拉框元素默认选中第一个值
		var avoid = [0];	//此数组可以避免被执行默认选中
		var avoids = 0;
		for(var j = 0; j < avoid.length; j++){
			if(avoid[j] == i){
				avoids = 1;
			}
		}
		if(avoids != 1){
				selectz[i].value = selects_ulz[i].children[0].innerHTML;
				selectz[i].name = selects_ulz[i].children[0].dataset.value;
		}else{
			var br = creat('br');
			var newItem = creat('li');
			newItem.innerHTML = '请选择...';
			newItem.style.color = '#666666';
			newItem.setAttribute("data-value", '');
			selects_ulz[i].insertBefore(br,selects_ulz[i].childNodes[0]);
			selects_ulz[i].insertBefore(newItem,selects_ulz[i].childNodes[0]);
		}

		selects_ulz[i].style.left = selectz[i].offsetParent.offsetLeft + 5 + 'px';
		selects_ulz[i].style.top = selectz[i].offsetParent.offsetTop + selectz[i].offsetParent.clientHeight - 4 + 'px';
		(function(q){
			//点击input框时的显示隐藏
			selectz[q].onfocus = function(){
						selects_ulz[q].style.display = 'inline-block';
			}
			selectz[q].onblur = function(){
						selects_ulz[q].style.display = 'none';
			}
			//点击ul时的显示隐藏
			selectz[q].parentNode.children[1].onfocus = function(){
				selects_ulz[q].style.display = 'inline-block';
			}
			selectz[q].parentNode.children[1].onblur = function(){
				selects_ulz[q].style.display = 'none';
			}
		})(i)
		//将ul中选中的数据渲染到input框中
		for(var j = 0; j < selects_ulz[i].children.length; j++){
			if(j%2 == 0){
				selects_ulz[i].children[j].onmousedown = function(){
					selectz[this.offsetParent.dataset.list].value = this.innerHTML;
					selectz[this.offsetParent.dataset.list].name = this.dataset.value;
				}
			};
		}
	}

	//点击页面任意处关闭下拉框
	/*document.onclick = function(){
		for(var j = 0; j < selects_ul.length; j++){
			selects_ul[j].style.display = 'none';
		}
		for(var j = 0; j < selects_ulz.length; j++){
			selects_ulz[j].style.display = 'none';
		}
	}*/
}


var startDate;	//开始时间
var endDate;	//结束时间

//日期渲染	如果input框发生改变时要跟着改变
function datepicke(){

	var date_select = c('sales_head_selects')[0];	//日期input
	var date_selectUl = c('sales_head_selects_ul')[0];	//日期input
	var date_selectList = date_selectUl.children;			//日期input下拉框
	var headStart = c('sales_head_date_start');
	var headEnd = c('sales_head_date_end');
	var date = new Date();
	var nian;
	var yue;
	var ri;

	//页面加载时获取默认时间
	startDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
	endDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate() + 1);

	var zhou = date.getDay();
	if(date.getDay() == 0){
		zhou = 7;
	}
	var hao = date.getDate()-1;
	var tian = 86400000;
	for(var i = 0; i < date_selectList.length; i++){
		(function(q){
			date_selectList[q].onmousedown = function(){
				date_select.value = this.innerHTML;
				if(this.innerHTML == '今天'){
					nian = date.getFullYear();
					yue = date.getMonth() + 1;
					ri = date.getDate();
					startDate = String(nian) + '-' + String(yue) + '-' + String(ri);
					endDate = String(nian) + '-' + String(yue) + '-' + String(ri+1);
				}else if(this.innerHTML == '昨天'){
					var dates = new Date(new Date - tian);
					nian = dates.getFullYear();
					yue = dates.getMonth() + 1;
					ri = dates.getDate();
					startDate = String(nian) + '-' + String(yue) + '-' + String(ri);
					endDate = String(nian) + '-' + String(yue) + '-' + String(ri+1);
				}else if(this.innerHTML == '本周'){
					var dates = new Date(new Date - tian*(zhou));
					nian = dates.getFullYear();
					yue = dates.getMonth() + 1;
					ri = dates.getDate();
					startDate = String(nian) + '-' + String(yue) + '-' + String(ri);
					nian = date.getFullYear();
					yue = date.getMonth() + 1;
					ri = date.getDate();
					endDate = String(nian) + '-' + String(yue) + '-' + String(ri+1);
				}else if(this.innerHTML == '最近10天'){
					var dates = new Date(new Date - tian*9);
					nian = dates.getFullYear();
					yue = dates.getMonth() + 1;
					ri = dates.getDate();
					startDate = String(nian) + '-' + String(yue) + '-' + String(ri);
					nian = date.getFullYear();
					yue = date.getMonth() + 1;
					ri = date.getDate();
					endDate = String(nian) + '-' + String(yue) + '-' + String(ri+1);
				}
			}
		})(i)
	}
}

var switchArray;

//数据请求
function selesForm(){
	var submit = c('sales_head_tbody_submit')[0];

	submit.onclick = function(){
		var device_head_groupingz = c('device_head_groupingz')[0].name;
		var methods = c('statisticalMethods')[0].dataset.value;				//统计方式数据
		var salesBody = c('sales_body')[0];							//底部渲染数据部分
		var Start = startDate;
		var End = endDate;
		var orderId = c('sales_head_order')[0].value;

		if(!methods){
			methods = ['','',''];
		}else{
			methods = methods.split(',');
		}
		log(device_head_groupingz);
		log(methods);
		log(Start,End);

		var object = {};
		object.empcode = loginUserName.empcode;
		object.state = methods[0];
		object.refundStatus = methods[1];
		object.settledStatus = methods[2];
		object.startTime = Start;
		object.endTime = End;
		object.orderId = orderId;

		ajax({
			type: 'get',
			url: URLS + orderBatch(object),
			setHeader: {
				username: loginUserName.empcode,
				token: loginUserName.token,
			},
			success: function(data){
				log(data);
				switchArray = data.resultObject;
				tableRendering(switchArray,0);
			}
		})
	}
}

start();
datepicke();
selesForm();

var switchCount = 1;
c('sales_body_switch')[0].onclick = function(){
	if(switchCount == 1){
		tableRendering(switchArray,switchCount);
		switchCount = 0;
	}else{
		tableRendering(switchArray,switchCount);
		switchCount = 1;
	}
}

//底部table渲染
function tableRendering(allDate,Type){
	log(allDate);
	var table = c('sales_body_table_tbody')[0];
	table.innerHTML = '';
	if(Type == 0){
		for(var i = 0; i < allDate.length; i++){
			var tr = creat('tr');
			var td1 = creat('td');
			var td2 = creat('td');
			var td3 = creat('td');
			var td4 = creat('td');
			var td5 = creat('td');
			var td6 = creat('td');
			var td7 = creat('td');
			var td8 = creat('td');
			var td9 = creat('td');
			var td10 = creat('td');
			var td11 = creat('td');
			td1.innerHTML = allDate[i].orderSourceText;
			td2.innerHTML = allDate[i].shopName;
			td3.innerHTML = allDate[i].orderId;
			td4.innerHTML = "<button class='order_center_shipping_fixed_btn' data-value='"+JSON.stringify(allDate[i].items)+"'>查看商品</button>";
			td5.innerHTML = allDate[i].totalPrice;
			td6.innerHTML = allDate[i].consignee;
			td7.innerHTML = allDate[i].phones.userPhone;
			td8.innerHTML = allDate[i].deliveryPoiAddress;
			td9.innerHTML = wmDateTime(allDate[i].activeAt);
			td10.innerHTML = allDate[i].finished;
			td11.innerHTML = allDate[i].orderRefund.reason?allDate[i].orderRefund.reason:'无';
			tr.setAppend([td1,td2,td3,td4,td5,td6,td7,td8,td9,td10,td11]);
			table.appendChild(tr);
			td4.children[0].onmousedown = function(){
				shippingList(this);
			}
		}
	}else{
		for(var i = 0; i < allDate.length; i++){
			for(var j = 0; j < allDate[i].items.length; j++){
				var tr = creat('tr');
				var td1 = creat('td');
				var td2 = creat('td');
				var td3 = creat('td');
				var td4 = creat('td');
				var td5 = creat('td');
				var td6 = creat('td');
				var td7 = creat('td');
				var td8 = creat('td');
				var td9 = creat('td');
				var td10 = creat('td');
				var td11 = creat('td');
				td1.innerHTML = allDate[i].orderSourceText;
				td2.innerHTML = allDate[i].shopName;
				td3.innerHTML = allDate[i].orderId;
				td4.innerHTML = allDate[i].items[j].name + '*' + allDate[i].items[j].quantity;
				td5.innerHTML = allDate[i].totalPrice;
				td6.innerHTML = allDate[i].consignee;
				td7.innerHTML = allDate[i].phones.userPhone;
				td8.innerHTML = allDate[i].deliveryPoiAddress;
				td9.innerHTML = wmDateTime(allDate[i].activeAt);
				td10.innerHTML = allDate[i].finished;
				td11.innerHTML = allDate[i].orderRefund.reason?allDate[i].orderRefund.reason:'无';
				tr.setAppend([td1,td2,td3,td4,td5,td6,td7,td8,td9,td10,td11]);
				table.appendChild(tr);
			}
			
		}
	}
	
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
			return s.replace(/{(\w+)}/g,function(m, p) {
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
			link.download = '销售报告' + names + '.xls';
			link.target = '_blank';
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			//window.location.href = uri + base64(format(template, ctx))
		}
	})()
	method1(excelTable);
}
var excelTable = d('sales_body_table');
var excelBtn = c('sales_body_excel_btn')[0];
excelBtn.onclick = function(){
	tableName('sales_body_table',excelTable);
}
//渲染商品列表
function shippingList(that){
	log(that);
	var thatValue = JSON.parse(that.dataset.value);
	var orderCenterShippingFixedMain = c('order_center_shipping_fixed_main')[0];
	var orderCenterShippingFixedHead = c('order_center_shipping_fixed_head')[0];
	orderCenterShippingFixedMain.innerHTML = "";
	orderCenterShippingFixedHead.innerHTML = "";
	var tr = creat('tr');
	var tha = creat('th');
	var thb = creat('th');
	var thc = creat('th');
	var thd = creat('th');
	var the = creat('th');
	tha.innerHTML = '名称';
	thb.innerHTML = '数量';
	thc.innerHTML = '价格';
	tr.setAppend([tha,thb,thc,thd,the]);
	orderCenterShippingFixedHead.appendChild(tr);
	for(var i of thatValue){
		for(var j of i.lanes){
			var trs = creat('tr');
			var tda = creat('td');
			var tdb = creat('td');
			var tdc = creat('td');
			tda.innerHTML = i.name;
			tdb.innerHTML = '*1';
			tdc.innerHTML = i.price;
			trs.setAppend([tda,tdb,tdc]);
			orderCenterShippingFixedMain.appendChild(trs);
		}
	}
	c('order_center_shipping_fixed')[0].style.display = 'block';
}
//点击关闭商品列表按钮
c('order_center_shipping_fixed_clear')[0].onclick = function(){
	this.parentNode.parentNode.style.display = 'none';
}