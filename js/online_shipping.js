//input下拉框渲染
function start(){
  //BOM获取

  var sales_head = c('sales_head')[0];
  var selects = c('sales_head_selects');  //第一种类input下拉框(不携带value值的下拉框)
  var selects_ul = c('sales_head_selects_ul');


  group();
  groupanalysis(KIT,"",['4']);

  BOMAll(KIT,loginUserName.scopeofauthority);
  groupitemlevel(4,KITEXTR);
  LISTGROUP = [];   //每次点击时清空内容
  for(var i = 0; i < KITASSIGN.length; i++){
    LISTGROUP.push(KITASSIGN[i].devicecode);
  }

  //渲染table底部数据
  ajax({
    type: 'get',
    url: URLS + '/stock/for/shipping/offline?userId='+loginUserName.empcode,
    success: function(data){
      log(data);
      tableRendering(data.resultObject);
    }
  })
}

start();
//底部table渲染
function tableRendering(allDate){
  var table = c('sales_body_table_tbody')[0];
  var numTotol = 0; //商品总计
  table.innerHTML = '';
  for(var i = 0; i < allDate.length; i++){
    var tr = creat('tr');
    var td = creats('td',7);
    td[0].innerHTML = allDate[i].machName;
    td[1].innerHTML = allDate[i].deviceId;
    td[2].innerHTML = allDate[i].itemName;
    td[3].innerHTML = allDate[i].itemId;
    td[4].innerHTML = allDate[i].outGoods?'是':'否';
    td[5].innerHTML = allDate[i].stockNum;
    td[6].innerHTML = '<input type="number" class="sales_body_table_tbody_num" oninput="this.value>'+allDate[i].stockNum+'?this.value='+allDate[i].stockNum+':this.value=this.value;this.value<0?this.value=0:this.value=this.value" data-value=\''+JSON.stringify(allDate[i])+'\'/>';
    tr.setAppend(td)
    table.appendChild(tr);
    numTotol += allDate[i].stockNum;
  }
}

//一键出货
var mark;
var timeMac;
var salesBodyTableTbodyNumArr = [];
var iconMark = 0;
var iconTimore;
c('sales_body_btn')[0].onclick = function(){
  if(iconMark > 0){
    log('请不要重新点击');
    return false;
  }
  iconMark = 3;
  c('sales_body_btn')[0].style.backgroundColor = '#a4a4a4';
  iconTimore = setInterval(function(){
    if(iconMark <= 0){
      c('sales_body_btn')[0].style.backgroundColor = '#0C64A8';
      c('sales_body_btn')[0].children[0].innerHTML = '';
      clearInterval(iconTimore);
    }else{
      c('sales_body_btn')[0].children[0].innerHTML = iconMark;
    }
    iconMark--;
  },1000);
  var salesBodyTableTbodyNum = c('sales_body_table_tbody_num');
  salesBodyTableTbodyNumArr = [];
  for(var i = 0; i < salesBodyTableTbodyNum.length; i++){
    if(salesBodyTableTbodyNum[i].value != ''&&salesBodyTableTbodyNum[i].value != 0&&salesBodyTableTbodyNum[i].value != null&&salesBodyTableTbodyNum[i].value != undefined){
      var salesBodyTableTbodyNumObj = JSON.parse(salesBodyTableTbodyNum[i].dataset.value);
      salesBodyTableTbodyNumObj.shippingNo = Number(salesBodyTableTbodyNum[i].value);
      salesBodyTableTbodyNumArr.push(salesBodyTableTbodyNumObj);
    }
  }
  if(salesBodyTableTbodyNumArr.length > 0){
    mark = 1;
    ajax({
      type: 'post',
      url: URLS + '/stock/shipping/detect',
      data: {
        orders: '[]',
        userId: loginUserName.empcode,
      },
      success: function(data){
        if(data.status == 40003){
          timeMac = setTimeout(function(){
            if(mark == 1){
              alern('连接超时，请重试！');
            }
          },3000);
        }else{
          alern(data.msg);
          start();
        }
      }
    })
  }
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
            //检测售货机状态是否繁忙
            case 'match_status':
              clearTimeout(timeMac);
              if(responsData.ready){
                mark = 2;
                ajax({
                  type: 'post',
                  url: URLS + '/stock/shipping/offline',
                  data: {
                    obj: JSON.stringify(salesBodyTableTbodyNumArr),
                  },
                  setHeader: {
                    username: loginUserName.empcode,
                    token: loginUserName.token,
                  },
                  success: function(data){
                    data.resultObject?alern(data.resultObject):alern(data.msg);
                    start();
                  }
                })
              }else{
                alern('设备正忙或故障，无法出货！');
              }
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