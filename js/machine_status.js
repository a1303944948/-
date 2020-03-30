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



	//第二种类渲染
	//给下拉框元素创建下拉内容
	$.ajax({
		url: URLX + '/jf/com/report/dealtype.json',
		type: 'post',
		data: {},
		async: false,
		dataType: 'json',
		success: function(data){
			if(data.dealtypeJson.length != undefined){
				LISTS.unshift(data.dealtypeJson);
			}else{
				LISTS.unshift('');
			}
		}
	})

	var selectz = c('sales_head_selectz');	//第二种类input下拉框(携带value值的下拉框)
	var selects_ulz = c('sales_head_selects_ulz');

	for(var i = 0; i < selectz.length; i++){
		var ul = creat('ul');
		ul.className = 'sales_head_selects_ulz';
		ul.setAttribute('data-list',i);
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


	//请求头部下拉框机器型号内容
	$.ajax({
		type: 'post',
		url: URLS + '/status/getJXZD.json',
		async: false,
		data: {},
		dataType: 'json',
		success: function (data){
			//这里使用unshift的原因是OBJ的第二条值是自己手动定义的，所以第一条值需要这样插入
			OBJ.unshift(data);
		}
	})
	//给下拉框添加请选择
	for(var i = 0; i < OBJ.length; i++){
		OBJ[i].unshift({'text': '请选择...',value: ''});
	}
	var machineHead = c('machine_home_head')[0];
	for(var i = 0; i < OBJ.length; i++){
		var ul = creat('ul');
		ul.className = 'machine_home_head_ul';
		ul.setAttribute("data-list", i);
		for(var j = 0; j < OBJ[i].length; j++){
			var li = creat('li');
			li.innerHTML = OBJ[i][j].text;
			li.setAttribute("data-value", OBJ[i][j].value);
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

		for(var j = 0; j < machineUl[i].children.length; j++){
			machineUl[i].children[j].onmousedown = function(){
				list[this.parentNode.dataset.list].children[0].value = this.innerHTML;
				list[this.parentNode.dataset.list].children[0].name = this.dataset.value;
			}
		}
	}
}

function submit(){
	var sum = c('machine_home_head_submit')[0];
	sum.onclick = function(){
		/*var groupitemKit = groupitem(4);
		var groupitemArrays = [];	//状态清单
		for(var i = 0; i < groupitemKit.length; i++){
			if(groupitemKit[i].stop == 1){
				groupitemArrays.push(groupitemKit[i].devicecode);
			}
		}*/

		loading();

		let model,status; 		//机器型号,售货机状态
		model = c('machine_home_head_table_model')[0].name; 		//机器型号
		status = c('machine_home_head_table_status')[0].name;		//售货机状态

		$.ajax({
			type: 'post',
			url: URLS + '/status/getTotalStatus.json',
			data: {
				strArray: JSON.stringify(LISTGROUP),
				machType: model, 
				status: status,
			},
			async: false,
			//dataType: 'json',
			success: function(data){
				OBJECT = data;
				loadingClear();
			}
		})
		tableObj();

		/*WmPageMarkStart(JSON.parse(d('page_mark').dataset.length)[1]);*/

		//请求售货机列表
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
	}
}

/*function WmPageMarkStart(num,type){
	//分页功能实现
	let pageMark = d('page_mark');
	let pagemarkArr = JSON.parse(pageMark.dataset.length);
	let count = pagemarkArr[2];
	let model,status; 		//机器型号,售货机状态
	model = c('machine_home_head_table_model')[0].name; 		//机器型号
	status = c('machine_home_head_table_status')[0].name;		//售货机状态

	loading();

	pagemarkArr[0] = LISTGROUP.length;
	pageMark.setAttribute('data-length',JSON.stringify(pagemarkArr));
	let LISTGROUPArr = [];
	for(let i = 0; i < count; i++){
		if(LISTGROUP[(num-1)*count+i]){
			LISTGROUPArr.push(LISTGROUP[(num-1)*count+i]);
		}
	}
	console.log(LISTGROUPArr);

	$.ajax({
		type: 'post',
		url: URLS + '/status/getTotalStatus.json',
		data: {
			strArray: JSON.stringify(LISTGROUPArr),
			machType: model, 
			status: status,
		},
		async: false,
		//dataType: 'json',
		success: function(data){
			console.log(data);
			OBJECT = data;
			loadingClear();
		}
	})

	WmPageMark();
	tableObj();
}*/

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
//表格内容渲染
function tableObj(){
	var ftable = c('machine_home_foot_body_table')[0];
	ftable.innerHTML = '';
	//渲染列表数据
	d('machine_home_foot_total').innerHTML = OBJECT.length;
	for(var i = 0; i < OBJECT.length; i++){
		var div = creat('div');
		div.className = 'machine_home_foot_body_table_list';
		for(var j = 0; j < OBJECT[i].length;j++){
			if(j == 0){
				var divs = creat('div');
				divs.className = 'machine_home_foot_body_table_item';
				divs.innerHTML = OBJECT[i][j][0];
				divs.style.width = 100 / OBJECT[i].length + '%';
				divs.style.backgroundColor = '#C8EDF8';
				div.appendChild(divs);
			//信号内容修改
			}else if(j == 6){
				var divs = creat('div');
				var divss = creat('div');
				var divssa = creat('div');
				var divssb = creat('div');
				var divssc = creat('div');
				var divssd = creat('div');
				var divsse = creat('div');
				var divssClear = creat('div');
				divss.style.position = 'relative';
				divssa.className = 'machine_home_foot_body_table_item_son';
				divssb.className = 'machine_home_foot_body_table_item_son';
				divssc.className = 'machine_home_foot_body_table_item_son';
				divssd.className = 'machine_home_foot_body_table_item_son';
				divsse.className = 'machine_home_foot_body_table_item_son';
				divssa.style.height = '6px';
				divssb.style.height = '8px';
				divssc.style.height = '11px';
				divssd.style.height = '14px';
				divsse.style.height = '18px';
				divs.className = 'machine_home_foot_body_table_item machine_home_foot_body_table_item_sign';
				divs.style.width = 100 / OBJECT[i].length + '%';
				divss.appendChild(divssa);
				divss.appendChild(divssb);
				divss.appendChild(divssc);
				divss.appendChild(divssd);
				divss.appendChild(divsse);
				if(OBJECT[i][j][0] == '-'){
					divss.innerHTML = '-';
				}else{
					for(var k = 0; k < OBJECT[i][j][0]; k++){
						switch(k){
							case 0:
								divssa.style.backgroundColor = 'green';
								break;
							case 1:
								divssb.style.backgroundColor = 'green';
								break;
							case 2:
								divssc.style.backgroundColor = 'green';
								break;
							case 3:
								divssd.style.backgroundColor = 'green';
								break;
							case 4:
								divsse.style.backgroundColor = 'green';
								break;
						}
					}
				}
				if(OBJECT[i][j][1] == 0){
					divs.style.backgroundColor = '#B5F09B';
				}else if(OBJECT[i][j][1] == 1){
					divs.style.backgroundColor = '#FFA500';
				}else if(OBJECT[i][j][1] == 2){
					divs.style.backgroundColor = '#D30009';
					divs.style.color = '#ffffff';
				}else if(OBJECT[i][j][1] == 3){
					divs.style.backgroundColor = '#f0f0f0';
				}
				divs.appendChild(divss);
				div.appendChild(divs);
			}else if(j == 7||j == 8){
				var divs = creat('div');
				divs.className = 'machine_home_foot_body_table_item';
				if(OBJECT[i][j][0] != '-'){
					OBJECT[i][j][0] = worldDateTimeA(new Date(OBJECT[i][j][0]).getTime());
				};
				divs.innerHTML = OBJECT[i][j][0];
				divs.style.width = 100 / OBJECT[i].length + '%';
				if(OBJECT[i][j][1] == 0){
					divs.style.backgroundColor = '#B5F09B';
				}else if(OBJECT[i][j][1] == 1){
					divs.style.backgroundColor = '#FFA500';
				}else if(OBJECT[i][j][1] == 2){
					divs.style.backgroundColor = '#D30009';
					divs.style.color = '#ffffff';
				}else if(OBJECT[i][j][1] == 3){
					divs.style.backgroundColor = '#f0f0f0';
				}
				div.appendChild(divs);
			}else if(j == 10||j == 11){
				var divs = creat('div');
				divs.className = 'machine_home_foot_body_table_item';
				if(OBJECT[i][j][0] != '-'){
					OBJECT[i][j][0] = worldDateTime(new Date(OBJECT[i][j][0]).getTime());
				};
				divs.innerHTML = OBJECT[i][j][0];
				divs.style.width = 100 / OBJECT[i].length + '%';
				if(OBJECT[i][j][1] == 0){
					divs.style.backgroundColor = '#B5F09B';
				}else if(OBJECT[i][j][1] == 1){
					divs.style.backgroundColor = '#FFA500';
				}else if(OBJECT[i][j][1] == 2){
					divs.style.backgroundColor = '#D30009';
					divs.style.color = '#ffffff';
				}else if(OBJECT[i][j][1] == 3){
					divs.style.backgroundColor = '#f0f0f0';
				}
				div.appendChild(divs);
			}else{
				var divs = creat('div');
				divs.className = 'machine_home_foot_body_table_item';
				divs.innerHTML = OBJECT[i][j][0];
				divs.style.width = 100 / OBJECT[i].length + '%';
				if(OBJECT[i][j][1] == 0){
					divs.style.backgroundColor = '#B5F09B';
				}else if(OBJECT[i][j][1] == 1){
					divs.style.backgroundColor = '#FFA500';
				}else if(OBJECT[i][j][1] == 2){
					divs.style.backgroundColor = '#D30009';
					divs.style.color = '#ffffff';
				}else if(OBJECT[i][j][1] == 3){
					divs.style.backgroundColor = '#f0f0f0';
				}
				div.appendChild(divs);
			}
			ftable.appendChild(div);
		}
		var divc = creat('div');
		divc.className = 'clear';
		div.appendChild(divc);
		ftable.appendChild(div);
	}

	//渲染点击列表后出现的数据
	var div = c('machine_home_foot_body_table_list');
	for(var i = 0; i < div.length; i++){
		(function(q){
			var show = null;
			div[q].onclick = function(){
				var divxx = c('machine_home_foot_body_table_listx');
				if(show != q){
					//请求机器内容
					$.ajax({
						type: 'post',
						url: URLS + '/status/getAlone.json',
						data: {
							machCode: OBJECT[q][1][0],
							machType: OBJECT[q][2][2],
						},
						async: false,
						success: function(data){
							OBJECTITEM = data;
						}
					})
					show = q;
					for(var j = 0; j < divxx.length; j++){
						ftable.removeChild(divxx[j]);
					}
					var divx = creat('div');
					divx.innerHTML = '<div class="machine_home_foot_body_table_listx_head"></div><div class="machine_home_foot_body_table_listx_foot"><button class="machine_home_foot_body_table_historical">历史温度</button><button class="machine_home_foot_body_table_status">最近状态</button></div>'
					divx.className = 'machine_home_foot_body_table_listx';
					ftable.insertBefore(divx,div[q+1]);
					var listxHead = c('machine_home_foot_body_table_listx_head')[0];
					for(var j = 0; j < OBJECTITEM.length/7; j++){
						var table = creat('table');
						for(var k = 0; k < 7; k++){
							if(j*7 + k < OBJECTITEM.length){
								var tr = creat('tr');
								var tda = creat('td');
								var tdb = creat('td');
								tda.innerHTML = OBJECTITEM[j*7 + k].name + '：';
								tdb.innerHTML = OBJECTITEM[j*7 + k].text;
								tr.appendChild(tda);
								tr.appendChild(tdb);
								table.appendChild(tr);
							}
						}
						listxHead.appendChild(table);
					}
					var listxHeadTable = c('machine_home_foot_body_table_listx_head')[0].children;
					if(listxHeadTable[listxHeadTable.length-2] != undefined && listxHeadTable[listxHeadTable.length-1] != undefined){
						listxHeadTable[listxHeadTable.length-1].style.top = listxHeadTable[listxHeadTable.length-1].clientHeight - listxHeadTable[listxHeadTable.length-2].clientHeight + 'px';
					}

					var Historical = c('machine_home_foot_body_table_historical')[0];
					var Status = c('machine_home_foot_body_table_status')[0];
					//历史温度通道
					if(Historical != undefined){
						Historical.onclick = function(){
							window.open('mach_historyTem.html?machCode=' + OBJECT[q][1][0],'_blank','width=1280,height=768');
						}
					}
					if(Status != undefined){
						Status.onclick = function(){
							window.open('mach_recentStatus.html?machCode=' + OBJECT[q][1][0] + '&machType=' + OBJECT[q][2][2],'_blank','width=1280,height=768');
						}
					}
				}else{
					show = null;
					for(var j = 0; j < divxx.length; j++){
						ftable.removeChild(divxx[j]);
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