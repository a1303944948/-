//页面顶部下拉菜单
/*var nav =[
	[
		{"icon":"image/navClone/nav_001.png","menuid":"100000","src":"index.html","value":"1","statu":"1","text":"首页"},
		[]
	],[
		{"icon":"image/navClone/nav_002.png","menuid":"200000","src":"javascript:void(0)","value":"1","statu":"0","text":"管理"},
		[
			[
				{"icon":"image/navClone/icon/icon_001.png","menuid":"201000","perent":"200000","src":"device_grouping.html","value":"1","statu":"0","text":"区域分组"},
				[
					{"menuid":"201001","perent":"201000","value":"1","statu":"0","text":"详细信息"},
				]
			],
			[
				{"icon":"image/navClone/icon/icon_002.png","menuid":"202000","perent":"200000","src":"user_manage.html","value":"1","statu":"0","text":"用户管理"},
				[
					{"menuid":"202001","perent":"202000","value":"1","statu":"1","text":"详细信息"},
					{"menuid":"202002","perent":"202000","value":"1","statu":"1","text":"权限分配"},
				]
			],
			[
				{"icon":"image/navClone/icon/icon_003.png","menuid":"203000","perent":"200000","src":"commodity_board.html","value":"1","statu":"0","text":"商品管理"},
				[
					{"menuid":"203001","perent":"203000","value":"1","statu":"1","text":"详细信息"},
				]
			],
			[
				{"icon":"image/navClone/icon/icon_004.png","menuid":"204000","perent":"200000","src":"machine_board.html","value":"1","statu":"0","text":"设备管理"},
				[
					{"menuid":"204001","perent":"204000","value":"1","statu":"1","text":"详细信息"},
				]
			],
			[
				{"icon":"image/navClone/icon/icon_005.png","menuid":"205000","perent":"200000","src":"operator.html","value":"1","statu":"0","text":"运营方"},
				[
					{"menuid":"205001","perent":"205000","value":"1","statu":"0","text":"详细信息"},
					{"menuid":"205002","perent":"205000","value":"1","statu":"0","text":"账户配置"},
					{"menuid":"205003","perent":"205000","value":"1","statu":"0","text":"设置"},
				]
			],
			[
				{"icon":"image/navClone/icon/icon_006.png","menuid":"206000","perent":"200000","src":"cargoroad.html","value":"1","statu":"0","text":"货道管理"},
				[
					{"menuid":"206001","perent":"206000","value":"1","statu":"0","text":"详细信息"},
				]
			],
			[
				{"icon":"image/navClone/icon/icon_007.png","menuid":"207000","perent":"200000","src":"modeltype","value":"1","statu":"0","text":"机型管理"},
				[
					{"menuid":"207001","perent":"207000","value":"1","statu":"0","text":"详细信息"},
				]
			],
		]
	],[
		{"icon":"image/navClone/nav_003.png","menuid":"300000","src":"javascript:void(0)","value":"1","statu":"0","text":"业务"},
		[
			[
				{"icon":"image/navClone/icon/icon_008.png","menuid":"301000","perent":"300000","src":"machine.html","value":"1","statu":"0","text":"售货机"},
				[
					{"menuid":"301001","perent":"301000","value":"1","statu":"0","text":"详细信息"},
					{"menuid":"301002","perent":"301000","value":"1","statu":"0","text":"货道配置"},
					{"menuid":"301003","perent":"301000","value":"1","statu":"0","text":"商品配置"},
					{"menuid":"301004","perent":"301000","value":"1","statu":"0","text":"补货管理"},
					{"menuid":"301005","perent":"301000","value":"1","statu":"0","text":"在售管理"},
					{"menuid":"301006","perent":"301000","value":"1","statu":"0","text":"远程控制"},
					{"menuid":"301007","perent":"301000","value":"1","statu":"0","text":"警报"},
				]
			],
			[
				{"icon":"image/navClone/icon/icon_009.png","menuid":"302000","perent":"300000","src":"machine_status.html","value":"1","statu":"0","text":"售货机状态"},
				[]
			],
			[
				{"icon":"image/navClone/icon/icon_010.png","menuid":"303000","perent":"300000","src":"javascript:void(0)","value":"0","statu":"0","text":"交易监视器"},
				[]
			],
			[
				{"icon":"image/navClone/icon/icon_011.png","menuid":"304000","perent":"300000","src":"sales_analysis.html","value":"1","statu":"0","text":"销售分析"},
				[]
			],
			[
				{"icon":"image/navClone/icon/icon_012.png","menuid":"305000","perent":"300000","src":"sales_report.html","value":"1","statu":"0","text":"销售报告"},
				[]
			],
		]
	],[
		{"icon":"image/navClone/nav_004.png","menuid":"400000","src":"javascript:void(0)","value":"1","statu":"0","text":"营销"},
		[
			[
				{"icon":"image/navClone/icon/icon_013.png","menuid":"401000","perent":"400000","src":"javascript:void(0)","value":"1","statu":"0","text":"促销活动"},
				[]
			],
			[
				{"icon":"image/navClone/icon/icon_014.png","menuid":"402000","perent":"400000","src":"javascript:void(0)","value":"0","statu":"0","text":"会员"},
				[]
			],
			[
				{"icon":"image/navClone/icon/icon_015.png","menuid":"403000","perent":"400000","src":"javascript:void(0)","value":"1","statu":"0","text":"广告管理"},
				[]
			],
		]
	]
];*/

if(sessionStorage.loginUserName != undefined){
	var loginUserName = JSON.parse(sessionStorage.loginUserName);
}else{
	alert('请登录');
	window.location.href = 'login.html';
}

var loginTimeOut = 0;
var Timoers = setInterval(function(){
	loginTimeOut += 1;
	if(loginTimeOut >= 12){
		sessionStorage.removeItem("loginUserName");
		alert('用户长时间未操作,请重新登录!');
		clearInterval(Timoers);
		window.location.href = 'login.html';
	}
},50000);
window.onmousemove = function(){
	loginTimeOut = 0;
	clearInterval(Timoers);
	Timoers = setInterval(function(){
		loginTimeOut += 1;
		if(loginTimeOut >= 12){
			sessionStorage.removeItem("loginUserName");
			alert('用户长时间未操作,请重新登录!');
			clearInterval(Timoers);
			window.location.href = 'login.html';
		}
	},50000);
}

var KIT;		//数据结构
var KITSEARCH;	//搜索后产生的数据结构
var KITSort;	//排序后的数据结构
var KITSorted;	//排序后不动的数据结构
var KITEXTR;	//BOM结构提取方法 对应方法为BOMAll(bom,qid) bom为要提取的数据源 qid为要提取的数据区域
var KITANALYSIS;	//BOM结构提取方法	 对应方法为groupanalysis(kit,qid,array)	kit为要提取的数据源 qid为传入的父级ID不传或传空默认提取所有数据 array(数组)为要提取的类型
var KITASSIGN;		//BOM结构获取指定类型方法	对应方法为groupitemlevel(num,bom) num为要获取的类型 bom为要提取的数据源
//以上方法请前往header.js查找
//页面请求数据抬头
// var URLS = 'http://10.1.8.34:8080/bg-uc';
// var URLX = 'http://10.1.8.36:8080/bg-uc';
// var URLZ = 'http://10.1.8.45:8080/bg-uc';
// var URLY = 'http://10.1.8.45:8080/bg-uc';
/*var URLS = 'http://10.1.8.36:8080/bg-uc';
var URLX = 'http://10.1.8.36:8080/bg-uc';
var URLZ = 'http://10.1.8.36:8080/bg-uc';
var URLY = 'http://10.1.8.36:8080/bg-uc';
var OSSURL = 'http://hf-web.oss-cn-shanghai.aliyuncs.com/';*/
/*var URLS = 'http://hfrd.hontech-rdcenter.com:8080/hontechgroup';
var URLX = 'http://hfrd.hontech-rdcenter.com:8080/hontechgroup';
var URLZ = 'http://hfrd.hontech-rdcenter.com:8080/hontechgroup';
var URLY = 'http://hfrd.hontech-rdcenter.com:8080/hontechgroup';
var OSSURL = 'http://hf-web.oss-cn-shanghai.aliyuncs.com/';*/
/*var URLS = 'http://test.hontech-rdcenter.com:8080/bg-uc';
var URLX = 'http://test.hontech-rdcenter.com:8080/bg-uc';
var URLZ = 'http://test.hontech-rdcenter.com:8080/bg-uc';
var URLY = 'http://test.hontech-rdcenter.com:8080/bg-uc';
var OSSURL = 'http://hf-web.oss-cn-shanghai.aliyuncs.com/';*/
var URLS = 'https://api.hontech-rdcenter.com:8443/bg-uc';
var URLX = 'https://api.hontech-rdcenter.com:8443/bg-uc';
var URLZ = 'https://api.hontech-rdcenter.com:8443/bg-uc';
var URLY = 'https://api.hontech-rdcenter.com:8443/bg-uc';
var OSSURL = 'https://hf-web.oss-cn-shanghai.aliyuncs.com/';

/*var URLS = 'http://7daqrw.natappfree.cc/bg-uc';
var URLX = 'http://7daqrw.natappfree.cc/bg-uc';
var URLZ = 'http://7daqrw.natappfree.cc/bg-uc';
var URLY = 'http://7daqrw.natappfree.cc/bg-uc';
var OSSURL = 'http://hf-web.oss-cn-shanghai.aliyuncs.com/';*/
/*var URLS = 'http://10.1.8.34:8080/bg-uc';
var URLX = 'http://10.1.8.34:8080/bg-uc';
var URLZ = 'http://10.1.8.34:8080/bg-uc';
var URLY = 'http://10.1.8.34:8080/bg-uc';
var OSSURL = 'http://hf-web.oss-cn-shanghai.aliyuncs.com/';*/
/*var URLS = 'http://9n2sjp.natappfree.cc/bg-uc';
var URLX = 'http://9n2sjp.natappfree.cc/bg-uc';
var URLZ = 'http://9n2sjp.natappfree.cc/bg-uc';
var URLY = 'http://9n2sjp.natappfree.cc/bg-uc';
var OSSURL = 'http://hf-web.oss-cn-shanghai.aliyuncs.com/';*/
var URLTEST = 'http://10.1.8.34:8080/bg-uc';
//禁用页面log,要恢复调试请注释
//console.log = ()=>{};

//销售分析页面数据
var LIST = [
	['按销售金额','按销量'],
	['今天','昨天','本周','最近10天','上周','本月','最近30天','上个月','今年','去年','自定时间间隔'],
]
var LISTS = [
	[{text:'小时',value: 'hour'},{text:'日',value: 'date'},{text:'星期',value: 'week'},{text:'月份',value: 'month'}],
]
var LISTGROUP = [];	//要提交的设备汇总

//售货机状态页面数据
var OBJ = [
	//[{text:'金牛座',value: 'VMC0401002'},{text:'双子座',value: 'VMC08855W0'},{text:'白羊座',value: 'FC02'},{text:'弹簧机',value: 'YQC001'},{text:'熟食机',value: 'HT-spring'}],
	[{text:'正常',value: 'normal'},{text:'异常',value: 'abnormal'},{text:'故障',value: 'malfunction'}],
]		//Select使用
var OBJECT = [];		//主体数据
var OBJECTITEM = [];	//展开数据
var OBJECTHISTORICAL = [
	['今天','昨天','最近三天','最近七天'],
];
var OBJECTSTATUS = [
	['今天','昨天','最近三天','最近七天'],
];
//历史温度页面数据
var TEM = [
	['今天','昨天','最近三天','最近七天'],
];

//运营方页面数据
var DATA = [
	[{text: '启用', value: 1},{text: '停用', value: 0}]
];	  //Select使用
var DATALEFT; //运营方展示
var DATAHEAD = []; //右边table选项卡

//设备分组页面数据
var KITSTOP = [{text: '启用', value: 1},{text: '停用', value: 0}];
var KITHEAD = []; //右边table选项卡

//user页面数据
var USER;	//数据结构
var USERS;	//数据结构复
var USERSTOP = [{text: '启用', value: 1},{text: '停用', value: 0}];
var USERHEAD = []; //右边table选项卡
var USERWE;		//登录用户权限
var USEROTHER;	//被操作用户权限
var USEROBJECT;	//要上传的数据
var USEROBJECTS;//额外需要上传的数据
var USEREMPCODE;//被操作的人员编号

//售货机页面数据
var MACHOBJECT;	//售货机的全局属性
var MACH;		//数据结构
var MACHS;		//数据结构复
var MACHROAD;	//货道类型
var MACHROADS;	//货道数据渲染
var MACHCOMMOD; //商品数据结构
var MACHUSER;	//库存预警右边人员列表
var MACHALARM;	//警报选项卡左边数据
var MACHALARMS = [];	//警报选项卡右边数据
var MACHROADOBJ = [];	//警报接收人隐藏提交的人
var MACHSTOP = [
	//[{text: '启用', value: 1},{text: '停用', value: 0}],
	[{text: '十分钟', value: 1},{text: '三十分钟', value: 1},{text: '一小时', value: 0},{text: '全部', value: ""}]
];
var MACHHEAD = []; //右边table选项卡

//库存分析页面
var OBJS = [
	['按设备','按商品'],
]

//广告管理页面设备编号
var ADMACHCODE;