//ID选择器
function d(id){
	return document.getElementById(id);
}

//class选择器
function c(cls){
	return document.getElementsByClassName(cls);
}

//元素选择器
function n(name){
	return document.getElementsByTagName(name);
}

//query选择器
function wm(string){	//传入任意CSS选择器即可
	if(string.indexOf("#") != -1){
		return document.querySelector(string);
	}else{
		return document.querySelectorAll(string);
	}
}

//创建元素器
function creat(string){	//传入需要创建的元素
	return document.createElement(string);
}

//批量创建元素器
function creats(string,num){	//string为要创建的元素 num为要创建的元素数量
	var domArr = [];
	for(var i = 0; i < num; i++){
		domArr.push(document.createElement(string));
	}
	return domArr;	//返回一个包含所有元素的数组集合
}

//添加事件触发器
HTMLElement.prototype.Add = function(even,method){	//even为事件名称 emthod为传入一个方法function(){}
	this.addEventListener(even,function(e){
		method(this,e);
	});
}


/*常用的js选择器封装*/
//选择前面所有兄弟元素
HTMLElement.prototype.prevAll = function(){
	var parent = this.parentNode;
	var chilitem = parent.children;
	var chilArr = [];
	for(var i = 0; i < chilitem.length; i++){
		if(chilitem[i] === this){
			break;
		}
		chilArr.push(chilitem[i]);
	}
	return chilArr;
}

//选择所有兄弟元素(不包含自己)
HTMLElement.prototype.siblingAll = function(){
	var parent = this.parentNode;
	var chilitem = parent.children;
	var chilArr = [];
	for(var i = 0; i < chilitem.length; i++){
		if(chilitem[i] !== this){
			chilArr.push(chilitem[i]);
		}
	}
	return chilArr;
}

//选择所有兄弟元素(包含自己)
HTMLElement.prototype.siblingsAll = function(){
	var parent = this.parentNode;
	var chilitem = parent.children;
	var chilArr = [];
	for(var i = 0; i < chilitem.length; i++){
		chilArr.push(chilitem[i]);
	}
	return chilArr;
}

//选择后面所有兄弟元素
HTMLElement.prototype.nextAll = function(){
	var parent = this.parentNode;
	var chilitem = parent.children;
	var chilArr = [];
	var count = 0;
	for(var i = 0; i < chilitem.length; i++){
		if(count === 1){
			chilArr.push(chilitem[i]);
		}
		if(chilitem[i] === this){
			count = 1;
		}
	}
	return chilArr;
}
//选择上一个兄弟元素		e是指想查第几个类似于数组的下标
HTMLElement.prototype.prev = function(e){
	var count = this.previousElementSibling;
	e?e = e:e = 0;
	for(var i = 0; i < e; i++){
		count = count.previousElementSibling;
	}
	return count;
}
//选择下一个兄弟元素		e是指想查第几个类似于数组的下标
HTMLElement.prototype.next = function(e){
	var count = this.nextElementSibling;
	e?e = e:e = 0;
	for(var i = 0; i < e; i++){
		count = count.nextElementSibling;
	}
	return count;
}

//封装获取URL参数方法
function getUrlVal(name){	//name为要获取的URL参数名
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"),
	r = window.location.search.substr(1).match(reg);
	if(r!=null)return  decodeURI(r[2]); return null;
}

//封装log方法
var log = console.log,
	dir = console.dir;

//弹窗
function alern(text,name,btn,btns){	//text为要弹出的提示文字 name为提示窗的标题 btn为确认按钮 btns为取消按钮
	if(text === undefined){
		text = '';
	}
	if(name === undefined||name === ''){
		name = '温馨提醒';
	}
	if(btn === undefined||btn === ''){
		btn = '确定';
	}
	if(btns === ''){
		btns = '取消';
	}
	var body = n('body')[0],
	fixed = creat('div'),
	div = creat('div');
	if(c('fixed').length > 0){
		c('fixed')[0].parentNode.removeChild(c('fixed')[0]);
	}
	fixed.className = 'fixed';
	fixed.setCss({width: '100%',height: '100%',position: 'fixed',top: '0px',left: '0px',zIndex: '9999999',backgroundColor: 'rgba(0,0,0,0.7)'});

	div.className = 'fixed_body';
	div.setCss({display: 'inline-block',width: 'auto',height: 'auto',minWidth: '300px',maxWidth: '500px',minHeight: '200px',position: 'absolute',top: '50%',left: '50%',backgroundColor: '#ffffff',boxShadow: '0px 0px 3px #a4a4a4'});
	var divHead = creat('p'),
	 	divbody = creat('div'),
	 	divbtn = creat('button'),
	 	divbtns = creat('button');
	divHead.innerHTML = name;
	divHead.setCss({width: '97%',height: '39px',lineHeight: '39px',paddingLeft: '3%',borderBottom: '1px #e5e5e5 solid'});

	divbody.innerHTML = text;
	divbody.setCss({width: '90%',height: 'auto',minHeight: '60px',maxHeight: window.innerHeight - 400 + 'px',overflowY: 'auto',marginLeft: '5%',marginTop: '20px',marginBottom: '20px',fontSize: '15px'});

	divbtn.innerHTML = btn;
	divbtn.setCss({width: '100px',height: '40px',textAlign: 'center',lineHeight: '40px',backgroundColor: '#0D6FB8',color: '#ffffff',border: 'none',outline: 'none',cursor: 'pointer',float: 'right',marginBottom: '20px',marginRight: '20px',borderRadius: '5px'});

	divbtns.innerHTML = btns;
	divbtns.setCss({width: '100px',height: '40px',textAlign: 'center',lineHeight: '40px',backgroundColor: '#0D6FB8',color: '#ffffff',border: 'none',outline: 'none',cursor: 'pointer',float: 'right',marginBottom: '20px',marginRight: '20px',borderRadius: '5px'});
	div.appendChild(divHead);
	div.appendChild(divbody);
	div.appendChild(divbtns);
	div.appendChild(divbtn);
	if(btns === undefined){
		divbtns.style.display = 'none';
	}
	fixed.appendChild(div);
	body.appendChild(fixed);
	div.style.marginTop = -div.clientHeight/2 + 'px';
	div.style.marginLeft = -div.clientWidth/2 + 'px';
	divbtn.onmouseover = function(){
		divbtn.style.backgroundColor = '#0E76C6';
	};
	divbtn.onmouseout = function(){
		divbtn.style.backgroundColor = '#0D6FB8';
	};
	divbtn.onmousedown = function(){
		divbtn.style.backgroundColor = '#0D6FB8';
	};
	divbtn.onmouseup = function(){
		fixed.parentNode.removeChild(fixed);
		divbtn.style.backgroundColor = '#0E76C6';
		document.onkeydown = function(){};
	};
	divbtns.onmouseover = function(){
		divbtn.style.backgroundColor = '#0E76C6';
	};
	divbtns.onmouseout = function(){
		divbtn.style.backgroundColor = '#0D6FB8';
	};
	divbtns.onmousedown = function(){
		divbtn.style.backgroundColor = '#0D6FB8';
	};
	divbtns.onmouseup = function(){
		fixed.parentNode.removeChild(fixed);
		divbtn.style.backgroundColor = '#0E76C6';
		document.onkeydown = function(){};
	};
	document.onkeydown = function(e){
		e = e || window.event;
		key = e.keyCode || e.which || e.charCode;
		if(key === 13){
		fixed.parentNode.removeChild(fixed);
			document.onkeydown = function(){};
			if(e && e.preventDefault){
				e.preventDefault();
			}else{//IE阻止默认事件
				window.event.returnValue = false;
				return false;
			}
		}
		if(key === 32){
		fixed.parentNode.removeChild(fixed);
			document.onkeydown = function(){};
			if(e && e.preventDefault){
				e.preventDefault();
			}else{//IE阻止默认事件
				window.event.returnValue = false;
				return false;
			}
		}
	}
}

//加载动画
var loadingTiMore;
function loading(text){	//text为加载提示文字
	if(text === undefined){
		text = "加载中";
	}
	var body = n('body')[0],
		load = creat('div');
	load.className = "body_load";
	load.setCss({width: '100%',height: '100%',position: 'fixed',left: '0px',top: '0px',backgroundColor: 'rgba(0,0,0,0.7)',zIndex: '9999999'});
	var loadDiv = creat('div');
	loadDiv.setCss({width: '160px',height: '160px',position: 'absolute',top: '50%',left: '50%',marginTop: '-80px',marginLeft: '-80px'});
	var loadDivItem = creat('div');
	loadDivItem.setCss({width: '160px',height: '160px',position: 'absolute',top: '0px',left: '0px',textAlign: 'center',fontSize: '12px',lineHeight: '160px',color: '#ffffff'});
	loadDiv.appendChild(loadDivItem);
	loadDivItem.innerHTML = text;
	var loadCount = 0;
	loadingTiMore = setInterval(function(){
		loadCount++;
		if(loadCount === 1){
			loadDivItem.innerHTML = text + '●';
		}
		if(loadCount === 2){
			loadDivItem.innerHTML = text + '●●';
		}
		if(loadCount === 3){
			loadDivItem.innerHTML = text + '●●●';
			loadCount = 0;
		}
	},300);
	var loadDivImg = new Image();
	loadDivImg.src = 'image/loading.png';
	loadDivImg.className = 'body_load_div_image';
	loadDivImg.setCss({width: '100%',height: '100%',position: 'absolute',top: '0px',left: '0px'});
	loadDiv.appendChild(loadDivImg);
	load.appendChild(loadDiv);
	if(body !== undefined){
		body.appendChild(load);
	}
}

//关闭加载动画
function loadingClear(){
	clearInterval(loadingTiMore);
	var body = n('body')[0],
		load = c('body_load')[0];
	if(load){
		body.removeChild(load);
	};
}

//阻止浏览器默认事件
function BlockDefault(e){
	if(e && e.preventDefault){
		e.preventDefault();
	}else{//IE阻止默认事件
		window.event.returnValue = false;
		return false;
	}
}

//ajax请求
function ajax(obj){	//type为设置请求方法 url为请求的地址 data为传递的参数 succ为成功时执行的操作 error为失败时执行的操作 json只能传入一个json字符串，代表将接收到的数据转换为json对象 header为设置请求头部信息 async为是否异步传入默认异步
	var xhr = new XMLHttpRequest();
	if(obj.async !== true&&obj.async !== false){
		obj.async = true;
	}
	xhr.open(obj.type,obj.url,obj.async);
	if(obj.header){
		xhr.setRequestHeader("Content-Type",obj.header);
	}else{
		xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	}
	if(obj.setHeader){
		for(var i in obj.setHeader){
			xhr.setRequestHeader(i,obj.setHeader[i]);
		}
	}
	var objData = '';
	for(var i in obj.data){
		objData += i;
		objData += '=';
		objData += obj.data[i];
		objData += '&';
	}
	objData = objData.substring(0,objData.length-1);
	xhr.send(objData);
	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4){
			if(xhr.status === 200){
				if(obj.dataType === 'json'){
					obj.success(JSON.parse(xhr.responseText));
				}else{
					if(typeof JSON.parse(xhr.responseText) == "object"){
						obj.success(JSON.parse(xhr.responseText));
					}else{
						obj.success(xhr.responseText);
					}
				}
			}else{
				obj.error(xhr.status);
			}
		}
	}
}

//当obj对象的name属性被更改或者是被使用时会调用的方法体	obj传入一个对象 name传入对象内部要被监听的值 setFun与getFun为方法,决定被set或者是被get时调用的方法
function objChange(obj,name,setFun,getFun){
	Object.defineProperty(obj,name,{
		get: function(){
			getFun();
		},
		set: function(){
			setFun();
		},
		enumerable : true,
		configurable : true,
	})
}
/*var objS = {'name': 1,'text': 1,kill: 1};
objChange(objS,'name',function(){console.log('name发生变化了')});
objChange(objS,'text',function(){console.log('text发生变化了')});
objChange(objS,'kill',function(){console.log('kill发生变化了')});
objS.name = 2;
objS.text = 2;
objS.kill = 2;*/

//js中批量给元素添加innerHTML方法封装
function setHTML(domArr,objArr){	//domArr为dom数组集合 objArr为被添加的字符串组成的数组
	for(var i = 0; i < domArr.length; i++){
		domArr[i].innerHTML = objArr[i];
	}
}
//js中批量修改样式的方法封装
HTMLElement.prototype.setCss = function(json){	//json为要更改的样式键值对
	for(var i in json){
		if(!json.hasOwnProperty(i)) continue;
		this.style[i] = json[i];
	}
}
//js中批量设置className方法封装
function setClass(domArr,objArr){
	if(typeof(objArr) != 'string'){
		for(var i = 0; i < domArr.length; i++){
			domArr[i].className = objArr[i];
		}
	}else{
		for(var i = 0; i < domArr.length; i++){
			domArr[i].className = objArr;
		}
	}
}
//js中批量修改样式的方法封装(主要用于页面准备样式添加)
function setStyleX(text){
	var wmHead = n('head')[0];
	if(c('wmStyle')[0] === undefined){
		var wmStyle = creat('style');
		wmStyle.type = 'text/css';
		wmStyle.className = 'wmStyle';
		wmHead.appendChild(wmStyle);
	}
	c('wmStyle')[0].innerHTML = c('wmStyle')[0].innerHTML + text;
}

//添加页面需要的样式
setStyleX('/*加载动画Class*/.body_load_div_image{animation: loadDiv 0.8s linear 0s infinite;}@keyframes loadDiv{0%{transform: rotate(0deg)}100%{transform: rotate(360deg)}}/*下拉框样式渲染*/.wm_select_mark{width: 0px;height: 0px;border: 5px rgba(0,0,0,0) solid;border-top: 5px #666666 solid;pointer-events: none;position: absolute;}.wm_select_item{height: auto;position: absolute;border: 1px #e5e5e5 solid;background-color: #ffffff;border-bottom-left-radius: 5px;border-bottom-right-radius: 5px;display: none;z-index: 999;overflow-y: auto;}.wm_select_item_list{width: 100%;height: auto;padding: 8px 5px;box-sizing: border-box;font-size: 14px;cursor: pointer;user-select: none;}/*复选下拉框样式渲染*/.wm_check_mark{width: 0px;height: 0px;border: 5px rgba(0,0,0,0) solid;border-top: 5px #666666 solid;pointer-events: none;position: absolute;}.wm_check_item{height: auto;position: absolute;border: 1px #e5e5e5 solid;background-color: #ffffff;border-bottom-left-radius: 5px;border-bottom-right-radius: 5px;display: none;z-index: 999;overflow-y: auto;}.wm_check_item_list{width: 100%;height: auto;padding: 8px 5px;box-sizing: border-box;font-size: 14px;cursor: pointer;user-select: none;}/*日期（时间）选择器样式渲染*/.wm_datapicker{outline: none;}.ui_datapicker{width: 210px;height: auto;position: absolute;border: 1px #e5e5e5 solid;background-color: #ffffff;border-radius: 4px;padding: 3px;}.wm_datapicker_mark{width: 0px;height: 0px;border: 5px rgba(0,0,0,0) solid;border-top: 5px #666666 solid;pointer-events: none;position: absolute;}.ui_datapicker_table{width: 100%;height: 40px;border-collapse:collapse;font-family: "Microsoft YaHei,Segoe UI,Lucida Grande,Helvetica, Arial,sans-serif";background-color: "#e5e5e5";}.ui_datapicker_table tr>th,.ui_datapicker_table tr>td{width: 30px;height: 30px;border-radius: 4px;padding: 5px; box-sizing: border-box;border: none;cursor: pointer;color: #333333;font-size: 14px;}.ui_datapicker_table tr>td:hover{background-color: #e5e5e5;}.ui_datapicker_table_edit{outline: none;}/*分页样式渲染*/.wm_pagemark{border: 1px #e5e5e5 solid;border-radius: 5px;background-color: #ffffff;margin-left: auto;margin-right: auto; position: relative;opacity: 0;}.wm_pagemark_body{width: 100%;height: 100%;text-align: center;}.wm_pagemark_body>button{height: 30px; line-height:30px; background-color: #3498Db;color: #ffffff;border: none; border-radius: 5px; padding-left: 10px; padding-right: 10px; margin-right: 15px;}.wm_pagemark_body>button:hover{background-color: #258BCF;}.wm_pagemark_body>button:active{background-color: #3498DB;}.wm_pagemark_body>button:last-child{margin-right: 0;}.wm_pagemark_body>span>input{width: 34px; height: 30px; text-align: center; margin-left:5px; margin-right: 5px;border: 1px #e5e5e5 solid; padding: 5px; box-sizing: border-box; border-radius: 3px; background-color: #ffffff;}.wm_pagemark_body>span{font-size: 12px;display: inline-block;vertical-align: bottom;text-align: center;padding-right: 15px;color: #a4a4a4;}');


//批量append目标
HTMLElement.prototype.setAppend = function(arr){
	for(var i = 0; i < arr.length; i++){
		this.appendChild(arr[i]);
	}
}

//基础下拉框
function WmStartSelect(){
	var wmSelect = c('wm_select');
	if(c('wm_select_item').length > 0){
		for(var i = c('wm_select_item').length-1; i >= 0; i--){
			c('wm_select_item')[i].parentNode.removeChild(c('wm_select_item')[i]);
		}
	}
	if(c('wm_select_mark').length > 0){
		for(var i = c('wm_select_mark').length-1; i >= 0; i--){
			c('wm_select_mark')[i].parentNode.removeChild(c('wm_select_mark')[i]);
		}
	}
	for(var i = 0; i < wmSelect.length; i++){
		wmSelect[i].style.cursor = 'pointer';
		wmSelect[i].style.userSelect = 'none';
		wmSelect[i].readOnly = false;
		//添加下拉倒三角标记
		var mark = creat('div');
		mark.className = 'wm_select_mark';
		mark.style.top = wmSelect[i].offsetTop + wmSelect[i].clientHeight/2 - 1 + 'px';
		mark.style.left = wmSelect[i].offsetLeft + wmSelect[i].clientWidth - 15 + 'px';
		wmSelect[i].parentNode.appendChild(mark);

		wmSelect[i].readOnly = true;
		var wmSelectArr;
		if(wmSelect[i].dataset.select !== undefined){
			wmSelectArr = wmSelect[i].dataset.select;
		}else{
			wmSelectArr = [];
		}
		wmSelectArr = eval(wmSelectArr);
		var wmSelectArray = [],
			wmSelectObj = {};
		wmSelectObj.index = i;
		wmSelectObj.name = '请选择...';
		wmSelectObj.value = '';
		wmSelectArray.push(wmSelectObj);
		for(var j = 0; j < wmSelectArr.length; j++){
			var wmSelectObj = {};
			wmSelectObj.index = i;
			wmSelectObj.name = wmSelectArr[j].name;
			wmSelectObj.value = wmSelectArr[j].value;
			wmSelectArray.push(wmSelectObj);
		}
		var div = creat('div');
		div.className = 'wm_select_item';
		div.style.minWidth = wmSelect[i].clientWidth + 'px';
		div.style.maxHeight =window.innerHeight - wmSelect[i].offsetTop - wmSelect[i].offsetHeight - 100 + 'px';
		div.style.top = wmSelect[i].offsetTop + wmSelect[i].clientHeight + 2 + 'px';
		div.style.left = wmSelect[i].offsetLeft + 'px';
		for(var j = 0; j < wmSelectArray.length; j++){
			var list = creat('div');
			list.className = 'wm_select_item_list';
			list.innerHTML = wmSelectArray[j].name;
			if(wmSelectArray[j].value === '请选择...'){
				list.style.color = '#666666';
			}
			list.setAttribute('data-index',wmSelectArray[j].index);
			list.setAttribute('data-value',wmSelectArray[j].value);
			list.onmouseover = function(){
				this.style.backgroundColor = '#e5e5e5';
			};
			list.onmouseout = function(){
				this.style.backgroundColor = '#ffffff';
			};
			list.onmousedown = function(){
				if(this.dataset.value === ''){
					wmSelect[this.dataset.index].value = "";
					wmSelect[this.dataset.index].setAttribute('data-value',this.dataset.value);
				}else{
					wmSelect[this.dataset.index].value = this.innerText;
					wmSelect[this.dataset.index].setAttribute('data-value',this.dataset.value);
				}
			};
			div.appendChild(list);
		}
		wmSelect[i].parentNode.appendChild(div);
		(function(q){
			wmSelect[q].Add('focus',function(){
				c('wm_select_item')[q].style.display = 'block';
			});
			wmSelect[q].Add('blur',function(){
				c('wm_select_item')[q].style.display = 'none';
			});
		})(i);
	}
}

//复选下拉框
function WmCheckSelect(){
	var wmCheck = c('wm_check');
	if(c('wm_check_item').length > 0){
		for(var i = c('wm_check_item').length-1; i >= 0; i--){
			c('wm_check_item')[i].parentNode.removeChild(c('wm_check_item')[i]);
		}
	}
	if(c('wm_check_mark').length > 0){
		for(var i = c('wm_check_mark').length-1; i >= 0; i--){
			c('wm_check_mark')[i].parentNode.removeChild(c('wm_check_mark')[i]);
		}
	}
	for(var i = 0; i < wmCheck.length; i++){
		wmCheck[i].style.cursor = 'pointer';
		wmCheck[i].style.userSelect = 'none';
		wmCheck[i].readOnly = false;
		//添加下拉倒三角标记
		var mark = creat('div');
		mark.className = 'wm_check_mark';
		mark.style.top = wmCheck[i].offsetTop + wmCheck[i].clientHeight/2 - 1 + 'px';
		mark.style.left = wmCheck[i].offsetLeft + wmCheck[i].clientWidth - 15 + 'px';
		wmCheck[i].parentNode.appendChild(mark);

		wmCheck[i].readOnly = true;
		var wmCheckArr;
		if(wmCheck[i].dataset.select !== undefined){
			wmCheckArr = wmCheck[i].dataset.select;
		}else{
			wmCheckArr = [];
		}
		wmCheckArr = eval(wmCheckArr);
		var wmCheckArray = [];
		for(var j = 0; j < wmCheckArr.length; j++){
			var wmCheckObj = {};
			wmCheckObj.index = i;
			wmCheckObj.name = wmCheckArr[j].name;
			wmCheckObj.value = wmCheckArr[j].value;
			wmCheckArray.push(wmCheckObj);
		}
		var div = creat('div');
		div.className = 'wm_check_item';
		div.style.width = wmCheck[i].clientWidth + 'px';
		div.style.maxHeight =window.innerHeight - wmCheck[i].offsetTop - wmCheck[i].offsetHeight - 100 + 'px';
		div.style.top = wmCheck[i].offsetTop + wmCheck[i].clientHeight + 2 + 'px';
		div.style.left = wmCheck[i].offsetLeft + 'px';
		for(var j = 0; j < wmCheckArray.length; j++){
			var list = creat('div');
			list.className = 'wm_check_item_list';
			list.innerHTML = '<input class="wm_check_item_list_check" type="checkbox" data-index="'+wmCheckArray[j].index+'" data-value="'+wmCheckArray[j].value+'" data-name="'+wmCheckArray[j].name+'"/>' + wmCheckArray[j].name;
			list.onmousedown = function(e){
				BlockDefault(e);
			};
			div.appendChild(list);
		}
		wmCheck[i].parentNode.appendChild(div);
		(function(q){
			wmCheck[q].onfocus = function(){
				c('wm_check_item')[q].style.display = 'block';
			};
			wmCheck[q].onblur = function(){
				c('wm_check_item')[q].style.display = 'none';
			};
		})(i);
	}
	var wmCheckItemListCheck = c('wm_check_item_list_check');
	if(wmCheckItemListCheck.length > 0){
		for(var i = 0; i < wmCheckItemListCheck.length; i++){
			(function(q){
				c('wm_check_item_list_check')[q].onchange = function(e){
					var that = this,
						wmCheckSumArr = [],
						wmCheckView;
					if(c('wm_check')[that.dataset.index].dataset.value !== undefined&&c('wm_check')[that.dataset.index].dataset.value !== ''){
						wmCheckView = JSON.parse(c('wm_check')[that.dataset.index].dataset.value);
						for(var j in wmCheckView){
							wmCheckSumArr.push(wmCheckView[j]);
						}
					}
					if(that.checked){
						var wmCheckSumObj = {};
						wmCheckSumObj.name = that.dataset.name;
						wmCheckSumObj.value = that.dataset.value;
						wmCheckSumArr.push(wmCheckSumObj);
						var wmCheckSumArrView = [];
						for(var j in wmCheckSumArr){
							wmCheckSumArrView.push(wmCheckSumArr[j].name);
						}
						c('wm_check')[that.dataset.index].value = wmCheckSumArrView.join(',');
						c('wm_check')[that.dataset.index].setAttribute('data-value',JSON.stringify(wmCheckSumArr));
					}else{
						for(var j in wmCheckSumArr){
							if(that.dataset.value === wmCheckSumArr[j].value){
								wmCheckSumArr.splice(j,1);
							}
						}
						var wmCheckSumArrView = [];
						for(var j in wmCheckSumArr){
							wmCheckSumArrView.push(wmCheckSumArr[j].name);
						}
						c('wm_check')[that.dataset.index].value = wmCheckSumArrView.join(',');
						c('wm_check')[that.dataset.index].setAttribute('data-value',JSON.stringify(wmCheckSumArr));
					}
					BlockDefault(e);
				}
			})(i)
		}
	}
}

//日期(时间)选择器封装
function WmStartDatapicker(){
	var wmPack = c('wm_pack')[0],
		wmDataPicker = c('wm_datapicker'),
		wmDate = new Date();
	if(wmDataPicker.length > 0&& wmPack !== undefined){
		for(var i = 0; i < wmDataPicker.length; i++){
			wmDataPicker[i].style.cursor = 'pointer';
			wmDataPicker[i].style.userSelect = 'none';
			wmDataPicker[i].readOnly = true;

			//加入input框下拉标识
			var mark = creat('div');
			mark.className = 'wm_datapicker_mark';
			mark.style.top = wmDataPicker[i].offsetTop + wmDataPicker[i].clientHeight/2 - 1 + 'px';
			mark.style.left = wmDataPicker[i].offsetLeft + wmDataPicker[i].clientWidth - 15 + 'px';
			wmPack.appendChild(mark);

			var div = creat('div');
			div.className = 'ui_datapicker';
			div.style.display = 'none';
			div.style.top = wmDataPicker[i].offsetTop + wmDataPicker[i].clientHeight + 2 + 'px';
			div.style.left = wmDataPicker[i].offsetLeft + 'px';
			div.setAttribute('data-block','1');
			var table = creat('table');
			table.className = 'ui_datapicker_table';
			var thead = creat('thead');
			function wmTheadA(){
				var tra = creat('tr'),
					thaA = creat('td'),
					thaB = creat('th'),
					thaC = creat('th'),
					thaD = creat('td');
				thaA.innerHTML = '«';
				thaA.onmousedown = function(){
					if(Number(this.nextSibling.nextSibling.innerHTML)>1){
						this.nextSibling.nextSibling.innerHTML = Number(this.nextSibling.nextSibling.innerHTML) - 1;
						this.nextSibling.nextSibling.innerHTML.length === 1?this.nextSibling.nextSibling.innerHTML = '0' + this.nextSibling.nextSibling.innerHTML:this.nextSibling.nextSibling.innerHTML = this.nextSibling.nextSibling.innerHTML;
					}else{
						this.nextSibling.nextSibling.innerHTML = 12;
						this.nextSibling.innerHTML = Number(this.nextSibling.innerHTML) - 1;
					}
				}
				thaB.colSpan = '3';
				thaB.innerHTML = wmDate.getFullYear();
				thaB.style.fontWeight = '500';
				thaB.className = 'ui_datapicker_table_edit';
				thaB.setAttribute('contenteditable',true);
				thaB.oninput = function(){
					this.innerHTML=this.innerHTML.replace(/\D/g,'');
					if(this.innerHTML.length > 4){
						this.innerHTML = this.innerHTML.substring(1,this.innerHTML.length);
					}else if(this.innerHTML.length < 4){
						var count = '';
						for(var j = this.innerHTML.length; j < 4; j++){
							count += '0';
						}
						this.innerHTML = count + this.innerHTML;
					}
					window.getSelection().collapse(this,1);
				}
				thaC.colSpan = '2';
				var wmDateGetMonth = (wmDate.getMonth() + 1) + '';
				wmDateGetMonth.length === 1?wmDateGetMonth = '0' + wmDateGetMonth:wmDateGetMonth = wmDateGetMonth;
				thaC.innerHTML =  wmDateGetMonth;
				thaC.style.fontWeight = '500';
				thaC.className = 'ui_datapicker_table_edit';
				thaC.setAttribute('contenteditable',true);
				thaC.oninput = function(){
					this.innerHTML=this.innerHTML.replace(/\D/g,'');
					if(this.innerHTML.length > 2){
						this.innerHTML = this.innerHTML.substring(1,this.innerHTML.length);
					}
					if(this.innerHTML.length < 2){
						this.innerHTML = '0' + this.innerHTML;
					}
					window.getSelection().collapse(this,1);
				}
				thaC.Add('blur',function(that,e){
					console.log(Number(that.innerHTML) === 0);
					if(Number(that.innerHTML) === 0){
						that.innerHTML = '01';
					}
				})
				thaD.innerHTML = '»';
				thaD.onmousedown = function(){
					if(Number(this.previousSibling.innerHTML)<12){
						this.previousSibling.innerHTML = Number(this.previousSibling.innerHTML) + 1;
						this.previousSibling.innerHTML.length === 1?this.previousSibling.innerHTML = '0' + this.previousSibling.innerHTML:this.previousSibling.innerHTML = this.previousSibling.innerHTML;
					}else{
						this.previousSibling.innerHTML = '01';
						this.previousSibling.previousSibling.innerHTML = Number(this.previousSibling.previousSibling.innerHTML) + 1;
					}
				}
				tra.setAppend([thaA,thaB,thaC,thaD]);
				thead.appendChild(tra);
				var trb = creat('tr'),
				 	thbA = creat('th'),
				 	thbB = creat('th'),
				 	thbC = creat('th'),
				 	thbD = creat('th'),
				 	thbE = creat('th'),
				 	thbF = creat('th'),
				 	thbG = creat('th');
				setHTML([thbA,thbB,thbC,thbD,thbE,thbF,thbG],['一','二','三','四','五','六','七']);
				trb.setAppend([thbA,thbB,thbC,thbD,thbE,thbF,thbG]);
				thead.appendChild(trb);
			}
			wmTheadA();
			var tbody = creat('tbody');
			function wmTbody(){
				for(var i = 0; i < 6; i++){
					var tr = creat('tr');
					for(var j = 0; j < 7; j++){
						var td = creat('td');
						tr.appendChild(td);
					}
					tbody.appendChild(tr);
				}
			}
			wmTbody();

			function wmTfoot(){
				var tr = creat('tr'),
					tha = creat('th'),
					thb = creat('th'),
					thc = creat('th'),
					thd = creat('th'),
					the = creat('th');
				thb.colSpan = '2';
				dir(wmDate);
				log(wmDate.getHours());
				log(wmDate.getMinutes());
				var wmDateGetHours = wmDate.getHours() + '';
				wmDateGetHours.length === 1?wmDateGetHours = '0' + wmDateGetHours:wmDateGetHours = wmDateGetHours;
				thb.innerHTML = wmDateGetHours;
				thb.style.fontWeight = '500';
				thb.className = 'ui_datapicker_table_edit';
				thb.setAttribute('contenteditable',true);
				thb.oninput = function(){
					this.innerHTML=this.innerHTML.replace(/\D/g,'');
					if(this.innerHTML.length > 2){
						this.innerHTML = this.innerHTML.substring(1,this.innerHTML.length);
					}
					if(this.innerHTML.length < 2){
						this.innerHTML = '0' + this.innerHTML;
					}
					window.getSelection().collapse(this,1);
				}
				thc.innerHTML = ':';
				thc.style.fontWeight = '500';
				thd.colSpan = '2';
				var wmDateGetMinutes = wmDate.getMinutes() + '';
				wmDateGetMinutes.length === 1?wmDateGetMinutes = '0' + wmDateGetMinutes:wmDateGetMinutes = wmDateGetMinutes;
				thd.innerHTML = wmDateGetMinutes;
				thd.style.fontWeight = '500';
				thd.className = 'ui_datapicker_table_edit';
				thd.setAttribute('contenteditable',true);
				thd.oninput = function(){
					this.innerHTML=this.innerHTML.replace(/\D/g,'');
					if(this.innerHTML.length > 2){
						this.innerHTML = this.innerHTML.substring(1,this.innerHTML.length);
					}
					if(this.innerHTML.length < 2){
						this.innerHTML = '0' + this.innerHTML;
					}
					window.getSelection().collapse(this,1);
				}
				tr.setAppend([tha,thb,thc,thd,the]);
				tbody.appendChild(tr);
			}
			var wmDataPickerTimeIfArr = wmDataPicker[i].className.split(' ');
			for(var j = 0; j < wmDataPickerTimeIfArr.length; j++){
				if(wmDataPickerTimeIfArr[j] === 'wm_datapicker_time'){
					wmTfoot();
				};
			}
			table.appendChild(thead);
			table.appendChild(tbody);
			div.appendChild(table);
			wmPack.appendChild(div);
			table.Add('mousedown',function(that,e){
				BlockDefault(e);
			});
			(function(q){
				wmDataPicker[q].onfocus = function(){
					c('ui_datapicker')[q].style.display = 'block';
				};
				wmDataPicker[q].onblur = function(){
					if(c('ui_datapicker')[q].dataset.block === '1'){
						c('ui_datapicker')[q].style.display = 'none';
					}
				};
			})(i);
		}

		for(var i = 0; i < c('ui_datapicker_table_edit').length; i++){
			c('ui_datapicker_table_edit')[i].onmousedown = function(e){
				if(this.parentNode.parentNode.parentNode.parentNode.dataset.block === '0'){
					this.parentNode.parentNode.parentNode.parentNode.setAttribute('data-block','2');
					this.focus();
					window.getSelection().collapse(this,1);
				}else{
					this.parentNode.parentNode.parentNode.parentNode.setAttribute('data-block','0');
					this.focus();
					window.getSelection().collapse(this,1);
				}
			};
			c('ui_datapicker_table_edit')[i].Add('blur',function(that,e){
				log(that.parentNode.parentNode.parentNode.parentNode.dataset.block);
				if(that.parentNode.parentNode.parentNode.parentNode.dataset.block === '0'){
					that.parentNode.parentNode.parentNode.parentNode.setAttribute('data-block','1');
					that.parentNode.parentNode.parentNode.parentNode.style.display = 'none';
				}else{
					that.parentNode.parentNode.parentNode.parentNode.setAttribute('data-block','0');
				}
			})
		}
		function WmStartDatapickerDate(year,month){
			var WmStartDatapickerDateArray = [];
		}
	}
}
/*for(var j = 0; j < wmDatapicker[i].classList.length; j++){
	log(wmDatapicker[i].classList[j] == 'wm_datapicker_time');
}*/

//分页实现
function WmPageMark(){
	var wmPageMark = c('wm_pagemark');
	if(c('wm_pagemark_body').length > 0){
		for(var i = c('wm_pagemark_body').length;i > 0; i--){
			c('wm_pagemark_body')[i-1].parentNode.removeChild(c('wm_pagemark_body')[i-1]);
		}
	}
	for(var i = 0; i < wmPageMark.length; i++){
		var datasetLength = JSON.parse(wmPageMark[i].dataset.length);
		var datasetType = Number(wmPageMark[i].dataset.pagetype);
		var Width,Height;
		!wmPageMark[i].dataset.width?Width = '480px':Width = wmPageMark[i].dataset.width;
		!wmPageMark[i].dataset.height?Height = '40px':Height = wmPageMark[i].dataset.height;
		wmPageMark[i].style.height = Height;
		wmPageMark[i].style.width = Width;
		wmPageMark[i].style.opacity = 1;
		var wmPageMarkBody = creat('div');
		setClass([wmPageMarkBody],['wm_pagemark_body']);
		setHTML([wmPageMarkBody],['<button onclick="WmPageMarkItem(this,1,'+datasetType+')" style="margin-top:'+(Height-30)/2+'px;">首页</button><button onclick="WmPageMarkItem(this,2,'+datasetType+')" style="margin-top:'+(Height-30)/2+'px;">上一页</button><span>共'+Math.ceil(datasetLength[0]/datasetLength[2])<0?0:Math.ceil(datasetLength[0]/datasetLength[2])+'页，到第<input type="number" style="margin-top:'+(Height-30)/2+'px;" value="'+datasetLength[1]+'"/>页</span><button onclick="WmPageMarkItem(this,3,'+datasetType+')" style="margin-top:'+(Height-30)/2+'px;">Go</button><button onclick="WmPageMarkItem(this,4,'+datasetType+')" style="margin-top:'+(Height-30)/2+'px;">下一页</button><button onclick="WmPageMarkItem(this,5,'+datasetType+')" style="margin-top:'+(Height-30)/2+'px;">尾页</button>']);
		setAppend(wmPageMark[i],[wmPageMarkBody]);
		log(wmPageMark[i]);
	}
}
//分页的按钮触发事件
function WmPageMarkItem(that,num,type){
	var datasetLength = JSON.parse(that.parentNode.parentNode.dataset.length);
	switch(num){
		case 1:
			if(Number(that.parentNode.children[2].children[0].value) !== 1){
				that.parentNode.children[2].children[0].value = 1;
				WmPageMarkItemGo();
			}
			break;
		case 2:
			that.parentNode.children[2].children[0].value = Number(that.parentNode.children[2].children[0].value)-1;
			WmPageMarkItemGo();
			break;
		case 3:
			WmPageMarkItemGo();
			break;
		case 4:
			that.parentNode.children[2].children[0].value = Number(that.parentNode.children[2].children[0].value)+1;
			WmPageMarkItemGo();
			break;
		case 5:
			if(Number(that.parentNode.children[2].children[0].value) !== Math.ceil(datasetLength[0]/datasetLength[2])){
				that.parentNode.children[2].children[0].value = Math.ceil(datasetLength[0]/datasetLength[2]);
				WmPageMarkItemGo();
			}
			break;
		default:
			break;
	}
	function WmPageMarkItemGo(){
		if(Number(that.parentNode.children[2].children[0].value) <= Math.ceil(datasetLength[0]/datasetLength[2])&&Number(that.parentNode.children[2].children[0].value)>0){
			datasetLength[1] = Number(that.parentNode.children[2].children[0].value);
			that.parentNode.parentNode.setAttribute('data-length',JSON.stringify(datasetLength));
			WmPageMarkStart(JSON.parse(that.parentNode.parentNode.dataset.length)[1],type);
		}else{
			if(Number(that.parentNode.children[2].children[0].value)>0){
				that.parentNode.children[2].children[0].value = Math.ceil(datasetLength[0]/datasetLength[2]);
			}else{
				that.parentNode.children[2].children[0].value = 1;
			}
		}
	}
}

//时间戳转换为时间方法
function wmDateTime(dateTime){	//传入一个13位时间戳
    var dateTimeS = new Date(dateTime);
    var nian = dateTimeS.getFullYear();
    var yue = (dateTimeS.getMonth()+1)<10?'0'+(dateTimeS.getMonth()+1):(dateTimeS.getMonth()+1);
    var ri = dateTimeS.getDate()<10?'0'+dateTimeS.getDate():dateTimeS.getDate();
    var shi = dateTimeS.getHours()<10?'0'+dateTimeS.getHours():dateTimeS.getHours();
    var fen = dateTimeS.getMinutes()<10?'0'+dateTimeS.getMinutes():dateTimeS.getMinutes();
    var miao = dateTimeS.getSeconds()<10?'0'+dateTimeS.getSeconds():dateTimeS.getSeconds();
    return nian +'-'+ yue +'-'+ ri +' '+ shi +':'+ fen +':'+ miao;
}


//日期国际化且全部转换为北京时间作为参考进行转换（因业务转变将算法全部归零）
//将北京时间转换为任意时区时间（展示时使用）
function worldDateTime(dateTime){	//传入一个13位时间戳
    var num = new Date().getTimezoneOffset();
    num = 0;//(num + 480) * 60
    dateTime = new Date(dateTime - num * 1000);
    var nian = dateTime.getFullYear();
    var yue = (dateTime.getMonth()+1)<10?'0'+(dateTime.getMonth()+1):(dateTime.getMonth()+1);
    var ri = dateTime.getDate()<10?'0'+dateTime.getDate():dateTime.getDate();
    var shi = dateTime.getHours()<10?'0'+dateTime.getHours():dateTime.getHours();
    var fen = dateTime.getMinutes()<10?'0'+dateTime.getMinutes():dateTime.getMinutes();
    var miao = dateTime.getSeconds()<10?'0'+dateTime.getSeconds():dateTime.getSeconds();
    return nian +'-'+ yue +'-'+ ri +' '+ shi +':'+ fen +':'+ miao;
}

//将任意时区时间转换为北京时间（搜索与保存时使用）
function worldDate(dateTime){	//传入一个13位时间戳
    var num = new Date().getTimezoneOffset();
    num = 0;
    dateTime = new Date(dateTime + num * 1000);
    var nian = dateTime.getFullYear();
    var yue = (dateTime.getMonth()+1)<10?'0'+(dateTime.getMonth()+1):(dateTime.getMonth()+1);
    var ri = dateTime.getDate()<10?'0'+dateTime.getDate():dateTime.getDate();
    return nian +'-'+ yue +'-'+ ri;
}
//将任意时区时间转换为北京时间（搜索与保存时使用）	该方法为上面方法的复刻版本，主要提供给需要精确到时分秒的地方使用
function worldDates(dateTime){	//传入一个13位时间戳
    var num = new Date().getTimezoneOffset();
    num = 0;
    dateTime = new Date(dateTime + num * 1000);
    var nian = dateTime.getFullYear();
    var yue = (dateTime.getMonth()+1)<10?'0'+(dateTime.getMonth()+1):(dateTime.getMonth()+1);
    var ri = dateTime.getDate()<10?'0'+dateTime.getDate():dateTime.getDate();
    var shi = dateTime.getHours()<10?'0'+dateTime.getHours():dateTime.getHours();
    var fen = dateTime.getMinutes()<10?'0'+dateTime.getMinutes():dateTime.getMinutes();
    var miao = dateTime.getSeconds()<10?'0'+dateTime.getSeconds():dateTime.getSeconds();
    return nian +'-'+ yue +'-'+ ri +' '+ shi +':'+ fen +':'+ miao;
}

//日期国际化且全部转换为北京时间作为参考进行转换（明三喜状态部分依旧保留算法）
//将北京时间转换为任意时区时间（展示时使用）
function worldDateTimeA(dateTime){	//传入一个13位时间戳
    var num = new Date().getTimezoneOffset();
    num = (num + 480) * 60;
    dateTime = new Date(dateTime - num * 1000);
    var nian = dateTime.getFullYear();
    var yue = (dateTime.getMonth()+1)<10?'0'+(dateTime.getMonth()+1):(dateTime.getMonth()+1);
    var ri = dateTime.getDate()<10?'0'+dateTime.getDate():dateTime.getDate();
    var shi = dateTime.getHours()<10?'0'+dateTime.getHours():dateTime.getHours();
    var fen = dateTime.getMinutes()<10?'0'+dateTime.getMinutes():dateTime.getMinutes();
    var miao = dateTime.getSeconds()<10?'0'+dateTime.getSeconds():dateTime.getSeconds();
    return nian +'-'+ yue +'-'+ ri +' '+ shi +':'+ fen +':'+ miao;
}

//将任意时区时间转换为北京时间（搜索与保存时使用）
function worldDateA(dateTime){	//传入一个13位时间戳
    var num = new Date().getTimezoneOffset();
    num = (num + 480) * 60;
    dateTime = new Date(dateTime + num * 1000);
    var nian = dateTime.getFullYear();
    var yue = (dateTime.getMonth()+1)<10?'0'+(dateTime.getMonth()+1):(dateTime.getMonth()+1);
    var ri = dateTime.getDate()<10?'0'+dateTime.getDate():dateTime.getDate();
    return nian +'-'+ yue +'-'+ ri;
}