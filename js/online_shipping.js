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
c('sales_body_btn')[0].onclick = function(){
  var salesBodyTableTbodyNum = c('sales_body_table_tbody_num');
  var salesBodyTableTbodyNumArr = [];
  for(var i = 0; i < salesBodyTableTbodyNum.length; i++){
    if(salesBodyTableTbodyNum[i].value != ''&&salesBodyTableTbodyNum[i].value != 0&&salesBodyTableTbodyNum[i].value != null&&salesBodyTableTbodyNum[i].value != undefined){
      var salesBodyTableTbodyNumObj = JSON.parse(salesBodyTableTbodyNum[i].dataset.value);
      salesBodyTableTbodyNumObj.shippingNo = Number(salesBodyTableTbodyNum[i].value);
      salesBodyTableTbodyNumArr.push(salesBodyTableTbodyNumObj);
    }
  }
  log(salesBodyTableTbodyNumArr.length);
  if(salesBodyTableTbodyNumArr.length > 0){
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
  }
}