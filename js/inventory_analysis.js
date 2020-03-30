//初始化函数

function start(){

	//BOM获取

	var sales_head = c('machine_home_head')[0];


	group();
	groupanalysis(KIT,"",['0','1','2','4']);

	//获取初始设备数据
	BOMAll(KIT,loginUserName.scopeofauthority);
	groupitemlevel(4,KITEXTR);
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
			LISTGROUP = [];		//每次点击时清空内容
			for(var i = 0; i < KITASSIGN.length; i++){
				LISTGROUP.push(KITASSIGN[i].devicecode);
			}
		}
	}

	var machineHead = c('machine_home_head')[0];
	for(var i = 0; i < OBJS.length; i++){
		var ul = creat('ul');
		ul.className = 'machine_home_head_ul';
		ul.setAttribute("data-list", i);
		for(var j = 0; j < OBJS[i].length; j++){
			var li = creat('li');
			li.innerHTML = OBJS[i][j];
			ul.appendChild(li);
		}
		machineHead.appendChild(ul);
	}

	var machineUl = c('machine_home_head_ul');
	var list = c('machine_home_head_table_list');
	for(var i = 0; i < list.length; i++){
		machineUl[i].style.width = list[i].children[0].clientWidth + 'px';
		machineUl[i].style.left = list[i].offsetLeft + 5 + 'px';
		machineUl[i].style.top = list[i].offsetTop + list[i].clientHeight - 3 + 'px';

		(function(q){
			list[q].children[0].onfocus = function(){
				machineUl[q].style.display = 'inline-block';
			}
			list[q].children[0].onblur = function(){
				machineUl[q].style.display = 'none';
			}
		})(i)

		list[0].children[0].value = machineUl[i].children[0].innerHTML;
		for(var j = 0; j < machineUl[i].children.length; j++){
			machineUl[i].children[j].onmousedown = function(){
				list[this.parentNode.dataset.list].children[0].value = this.innerHTML;
			}
		}
	}
}

function submit(){
	var sum = c('machine_home_head_submit')[0];
	var status;		//售货机状态

	sum.onclick = function(){
		status = c('machine_home_head_table_status')[0].value;		//售货机状态

		/*var groupitemKit = groupitem(4);
		var groupitemArrays = [];	//状态清单
		for(var i = 0; i < groupitemKit.length; i++){
			if(groupitemKit[i].stop == 1){
				groupitemArrays.push(groupitemKit[i].devicecode);
			}
		}*/

		//请求售货机列表
		$.ajax({
			type: 'post',
			url: URLX + '/jf/com/inventory/analyse.json',
			data: {
				machArr: JSON.stringify(LISTGROUP),
				machCode: "",
				waresId: ""
			},
			async: false,
			//dataType: 'json',
			success: function(data){
				OBJECT = data;
			}
		})
		/*OBJECT = [
			[['金牛座1号',0],['tasdssd001', 0],['金牛座',0,'jiniu'],['正常',0],['在售',0],['10℃',0],[5,0],['2018-8-10',2],['2018-8-10',2],['2018-8-10',2],['2018-8-10',2],['2018-8-10',1],['10.0.0.1-10.0.1.0',2],['1.0.0-1.0.1',0]],
			[['金牛座2号',0],['tasdssd002', 0],['金牛座',0,'jiniu'],['异常',1],['停售',2],['15℃',1],[4,0],['2018-8-18',2],['2018-8-10',2],['2018-8-10',2],['2018-8-28',0],['2018-8-10',1],['10.0.0.1-10.0.1.0',2],['1.0.0-1.0.1',0]],
			[['金牛座3号',0],['tasdssd003', 0],['金牛座',0,'jiniu'],['故障',2],['停售',2],['18℃',2],[2,1],['2018-8-27',0],['2018-8-10',2],['2018-8-10',2],['2018-8-27',0],['2018-8-10',1],['10.0.0.9-10.0.1.0',0],['0.9.9-1.0.1',0]],
			[['双子座1号',0],['gasdssd001', 0],['双子座',0,'shuangzi'],['正常',0],['在售',0],['25℃',1],[0,2],['2018-8-26',1],['2018-8-10',2],['2018-8-10',2],['2018-8-20',2],['2018-8-10',1],['10.0.0.5-10.0.1.0',1],['0.9.7-1.0.1',1]],
			[['双子座2号',0],['gasdssd002', 0],['双子座',0,'shuangzi'],['故障',2],['在售',0],['28℃',0],[3,0],['2018-8-20',2],['2018-8-10',2],['2018-8-10',2],['2018-8-18',2],['2018-8-10',1],['10.0.0.6-10.0.1.0',1],['0.9.5-1.0.1',2]],
			[['白羊座1号',0],['basdssd001', 0],['白羊座',0,'shuangzi'],['故障',2],['在售',0],['28℃',0],[3,0],['2018-8-20',2],['2018-8-10',2],['2018-8-10',2],['2018-8-18',2],['2018-8-10',1],['10.0.0.6-10.0.1.0',1],['0.9.5-1.0.1',2]],
			[['熟食机1号',0],['sasdssd001', 0],['熟食机',0,'shuangzi'],['故障',2],['在售',0],['28℃',0],[3,0],['2018-8-20',2],['2018-8-10',2],['2018-8-10',2],['2018-8-18',2],['2018-8-10',1],['10.0.0.6-10.0.1.0',1],['0.9.5-1.0.1',2]],
		]*/
		/*OBJECTITEM = [
			[{name: '门状态',text: '关闭'},{name: '旋转电机',text: '正常'},{name: '旋转零点',text: '正常'},{name: '温度传感器',text: '正常'},{name: '取物门1',text: '正常'},{name: '取物门2',text: '正常'},{name: '取物门3',text: '正常'},{name: '取物门4',text: '正常'},{name: '取物门5',text: '正常'},{name: '取物门6',text: '正常'},{name: '取物门7',text: '正常'},{name: '取物门8',text: '正常'},{name: '取物门9',text: '正常'},{name: '取物门10',text: '正常'}],
			[{name: '门状态',text: '关闭'},{name: '旋转电机',text: '正常'},{name: '旋转零点',text: '正常'},{name: '温度传感器',text: '正常'},{name: '取物门1',text: '正常'},{name: '取物门2',text: '正常'},{name: '取物门3',text: '正常'},{name: '取物门4',text: '正常'},{name: '取物门5',text: '故障'},{name: '取物门6',text: '正常'},{name: '取物门7',text: '正常'},{name: '取物门8',text: '正常'},{name: '取物门9',text: '正常'},{name: '取物门10',text: '正常'}],
			[{name: '门状态',text: '关闭'},{name: '旋转电机',text: '堵转'},{name: '旋转零点',text: '正常'},{name: '温度传感器',text: '正常'},{name: '取物门1',text: '正常'},{name: '取物门2',text: '正常'},{name: '取物门3',text: '正常'},{name: '取物门4',text: '正常'},{name: '取物门5',text: '正常'},{name: '取物门6',text: '正常'},{name: '取物门7',text: '正常'},{name: '取物门8',text: '故障'},{name: '取物门9',text: '正常'},{name: '取物门10',text: '正常'}],
			[{name: '门状态',text: '关闭'},{name: '旋转电机',text: '正常'},{name: '无货',text: '否'},{name: '内升降零点',text: '正常'},{name: '内升降',text: '正常'},{name: '内推货',text: '正常'},{name: '保温门',text: '关闭'},{name: '红外检测',text: '外升降'},{name: '微波炉',text: '正常'},{name: '取物门',text: '正常'},{name: '外推货',text: '正常'},{name: '防夹手',text: '正常'}],
			[{name: '门状态',text: '关闭'},{name: '旋转电机',text: '正常'},{name: '无货',text: '否'},{name: '内升降零点',text: '正常'},{name: '内升降',text: '正常'},{name: '内推货',text: '正常'},{name: '保温门',text: '关闭'},{name: '红外检测',text: '外升降'},{name: '微波炉',text: '正常'},{name: '取物门',text: '正常'},{name: '外推货',text: '正常'},{name: '防夹手',text: '正常'}],
			[{name: '门状态',text: '关闭'},{name: '冰箱门',text: '关闭'},{name: '冰箱状态',text: '正常'}],
			[{name: '热柜温度',text: '35℃'},{name: '热柜湿度',text: '50%'},{name: '冷柜温度',text: '-5℃'},{name: '冷柜湿度',text: '80%'},{name: '异常类型',text: '无'},{name: '异常描述',text: '无'}]
		];*/
		tableObj();
	}
}

//渲染表格样式
function tableStyle(){
	var header = c('machine_home_foot_header')[0];
	var headerItem = c('machine_home_foot_header_item');
	for(var i = 0; i < headerItem.length; i++){
		headerItem[i].style.width = 100 / headerItem.length + '%';
	}

	var fbody = c('machine_home_foot_body')[0];
	fbody.style.height = window.innerHeight - (header.offsetTop + header.clientHeight + 12) + 'px';
}
function tableObj(){
	var ftable = c('machine_home_foot_body_table')[0];
	var headTableStatus = c('machine_home_head_table_status')[0];	//统计方式
	var footTotal = d('machine_home_foot_total');					//记录数
	ftable.innerHTML = '';
	if(headTableStatus.value == '按设备'){
		footTotal.innerHTML = OBJECT.machOrientGroup.length;
		for(var i = 0; i < OBJECT.machOrientGroup.length; i++){
			var div = creat('div');
			div.className = 'machine_home_foot_body_table_list';
			var diva = creat('div');
			var divb = creat('div');
			var divc = creat('div');
			var divd = creat('div');
			diva.className = 'machine_home_foot_body_table_item';
			divb.className = 'machine_home_foot_body_table_item';
			divc.className = 'machine_home_foot_body_table_item';
			divd.className = 'machine_home_foot_body_table_item';
			diva.innerHTML = OBJECT.machOrientGroup[i].machName;
			divb.innerHTML = OBJECT.machOrientGroup[i].machCode;
			divc.innerHTML = OBJECT.machOrientGroup[i].number;
			divd.innerHTML = OBJECT.machOrientGroup[i].totalPrice;
			diva.style.width = 100 / 4 + '%';
			divb.style.width = 100 / 4 + '%';
			divc.style.width = 100 / 4 + '%';
			divd.style.width = 100 / 4 + '%';
			div.appendChild(diva);
			div.appendChild(divb);
			div.appendChild(divc);
			div.appendChild(divd);
			ftable.appendChild(div);
		}
	}else{
		footTotal.innerHTML = OBJECT.waresOrientGroup.length;
		for(var i = 0; i < OBJECT.waresOrientGroup.length; i++){
			var div = creat('div');
			div.className = 'machine_home_foot_body_table_list';
			var diva = creat('div');
			var divb = creat('div');
			var divc = creat('div');
			var divd = creat('div');
			diva.className = 'machine_home_foot_body_table_item';
			divb.className = 'machine_home_foot_body_table_item';
			divc.className = 'machine_home_foot_body_table_item';
			divd.className = 'machine_home_foot_body_table_item';
			diva.innerHTML = OBJECT.waresOrientGroup[i].waresName;
			divb.innerHTML = OBJECT.waresOrientGroup[i].waresId;
			divc.innerHTML = OBJECT.waresOrientGroup[i].number;
			divd.innerHTML = OBJECT.waresOrientGroup[i].totalPrice;
			diva.style.width = 100 / 4 + '%';
			divb.style.width = 100 / 4 + '%';
			divc.style.width = 100 / 4 + '%';
			divd.style.width = 100 / 4 + '%';
			div.appendChild(diva);
			div.appendChild(divb);
			div.appendChild(divc);
			div.appendChild(divd);
			ftable.appendChild(div);
		}
	}

	//渲染点击列表后出现的数据
	var div = c('machine_home_foot_body_table_list');
	for(var i = 0; i < div.length; i++){
		(function(q){
			var show = null;
			div[q].onclick = function(){
				if(headTableStatus.value == '按设备'){
					//请求机器内容
					$.ajax({
						type: 'post',
						url: URLX + '/jf/com/inventory/analyse.json',
						data: {
							machArr: "[]",
							machCode: OBJECT.machOrientGroup[q].machCode,
							waresId: "",
						},
						async: false,
						success: function(data){
							OBJECTITEM = data;
						}
					})
					var divxx = c('machine_home_foot_body_table_listx');
					if(show != q){
						show = q;
						for(var j = 0; j < divxx.length; j++){
							ftable.removeChild(divxx[j]);
						}
						var divx = creat('div');
						divx.innerHTML = '<div class="machine_home_foot_body_table_listx_head"></div><div class="machine_home_foot_body_table_listx_foot"></div>';
						divx.className = 'machine_home_foot_body_table_listx';
						ftable.insertBefore(divx,div[q+1]);
						var listxHead = c('machine_home_foot_body_table_listx_head')[0];
						var table = creat('table');
						var tr = creat('tr');
						var tha = creat('th');
						var thb = creat('th');
						var thc = creat('th');
						var thd = creat('th');
						tha.innerHTML = '商品名称';
						thb.innerHTML = '商品编号';
						thc.innerHTML = '数量';
						thd.innerHTML = '总价';
						tr.appendChild(tha);
						tr.appendChild(thb);
						tr.appendChild(thc);
						tr.appendChild(thd);
						table.appendChild(tr);
						for(var j = 0; j < OBJECTITEM.machOrientEntity.length; j++){
							var tr = creat('tr');
							var tda = creat('td');
							var tdb = creat('td');
							var tdc = creat('td');
							var tdd = creat('td');
							tda.innerHTML = OBJECTITEM.machOrientEntity[j].waresName;
							tdb.innerHTML = OBJECTITEM.machOrientEntity[j].waresId;
							tdc.innerHTML = OBJECTITEM.machOrientEntity[j].number;
							tdd.innerHTML = OBJECTITEM.machOrientEntity[j].waresPrice;
							tr.appendChild(tda);
							tr.appendChild(tdb);
							tr.appendChild(tdc);
							tr.appendChild(tdd);
							table.appendChild(tr);	
						}
						listxHead.appendChild(table);
						var listxHeadTable = c('machine_home_foot_body_table_listx_head')[0].children;
						if(listxHeadTable[listxHeadTable.length-2] != undefined && listxHeadTable[listxHeadTable.length-1] != undefined){
							listxHeadTable[listxHeadTable.length-1].style.top = listxHeadTable[listxHeadTable.length-1].clientHeight - listxHeadTable[listxHeadTable.length-2].clientHeight + 'px';
						}
					}else{
						show = null;
						for(var j = 0; j < divxx.length; j++){
							ftable.removeChild(divxx[j]);
						}
					}
				}else{
					//请求机器内容
					$.ajax({
						type: 'post',
						url: URLX + '/jf/com/inventory/analyse.json',
						data: {
							machArr: JSON.stringify(LISTGROUP),
							machCode: "",
							waresId: OBJECT.waresOrientGroup[q].waresId,
						},
						async: false,
						success: function(data){
							OBJECTITEM = data;
						}
					})
					var divxx = c('machine_home_foot_body_table_listx');
					if(show != q){
						show = q;
						for(var j = 0; j < divxx.length; j++){
							ftable.removeChild(divxx[j]);
						}
						var divx = creat('div');
						divx.innerHTML = '<div class="machine_home_foot_body_table_listx_head"></div><div class="machine_home_foot_body_table_listx_foot"></div>';
						divx.className = 'machine_home_foot_body_table_listx';
						ftable.insertBefore(divx,div[q+1]);
						var listxHead = c('machine_home_foot_body_table_listx_head')[0];
						var table = creat('table');
						var tr = creat('tr');
						var tha = creat('th');
						var thb = creat('th');
						var thc = creat('th');
						var thd = creat('th');
						tha.innerHTML = '设备名称';
						thb.innerHTML = '设备编号';
						thc.innerHTML = '数量';
						thd.innerHTML = '总价';
						tr.appendChild(tha);
						tr.appendChild(thb);
						tr.appendChild(thc);
						tr.appendChild(thd);
						table.appendChild(tr);
						for(var j = 0; j < OBJECTITEM.waresOrientEntity.length; j++){
							var tr = creat('tr');
							var tda = creat('td');
							var tdb = creat('td');
							var tdc = creat('td');
							var tdd = creat('td');
							tda.innerHTML = OBJECTITEM.waresOrientEntity[j].machName;
							tdb.innerHTML = OBJECTITEM.waresOrientEntity[j].machCode;
							tdc.innerHTML = OBJECTITEM.waresOrientEntity[j].number;
							tdd.innerHTML = OBJECTITEM.waresOrientEntity[j].waresPrice;
							tr.appendChild(tda);
							tr.appendChild(tdb);
							tr.appendChild(tdc);
							tr.appendChild(tdd);
							table.appendChild(tr);	
						}
						listxHead.appendChild(table);
						var listxHeadTable = c('machine_home_foot_body_table_listx_head')[0].children;
						if(listxHeadTable[listxHeadTable.length-2] != undefined && listxHeadTable[listxHeadTable.length-1] != undefined){
							listxHeadTable[listxHeadTable.length-1].style.top = listxHeadTable[listxHeadTable.length-1].clientHeight - listxHeadTable[listxHeadTable.length-2].clientHeight + 'px';
						}
					}else{
						show = null;
						for(var j = 0; j < divxx.length; j++){
							ftable.removeChild(divxx[j]);
						}
					}
				}
			}
		})(i)
	}
}


window.onresize = function(){
	//浏览器加载时动态调整下面框架大小
	var header = c('machine_home_foot_header')[0];
	var headerItem = c('machine_home_foot_header_item');
	var fbody = c('machine_home_foot_body')[0];
	fbody.style.height = window.innerHeight - (header.offsetTop + header.clientHeight + 12) + 'px';
}
start();
submit();
tableStyle();