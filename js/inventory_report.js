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

  //区域选择下拉框
  var Groupingz = c('device_head_groupingz')[0];
  var ul = creat('ul');
  ul.className = "device_head_ul";
  var li = "";
  for(var j = 0; j < KITANALYSIS.length; j++){
    li += (KITANALYSIS[j]);
  }
  ul.innerHTML = li;
  for(var i = 0; i < ul.children.length; i++){
    ul.children[i].children[0].className = "";
  }
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
      Groupingz.name = this.dataset.mach;
      BOMAll(KIT,this.dataset.id);
      groupitemlevel(4,KITEXTR);
      LISTGROUP = [];   //每次点击时清空内容
      for(var i = 0; i < KITASSIGN.length; i++){
        LISTGROUP.push(KITASSIGN[i].devicecode);
      }
    }
  }

  //第一种类渲染  (不携带value值的下拉)
  //给下拉框元素创建下拉内容
  for(var i = 0; i < selects.length; i++){
    var ul = creat('ul');
    ul.className = 'sales_head_selects_ul';
    ul.setAttribute('data-list',i);
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
  var statisticalMethods = c('statisticalMethods')[0];
  var timeIntervalUnita = c('timeIntervalUnita')[0];
  var timeIntervalUnitb = c('timeIntervalUnitb')[0];
  for(var i = 0; i < selects.length; i++){
    selects_ul[i].style.left = selects[i].offsetParent.offsetLeft + 5 + 'px';
    selects_ul[i].style.top = selects[i].offsetParent.offsetTop + selects[i].offsetParent.clientHeight - 4 + 'px';
    (function(q){
      //点击input框时的显示隐藏
      selects[q].onfocus = function(){
        selects_ul[q].style.display = 'inline-block';
      }
      selects[q].onblur = function(){
        //交易类型的两种标签
        if(this.value == '销售'){
            timeIntervalUnita.style.visibility = 'visible';
            timeIntervalUnitb.style.visibility = 'hidden';
        }
        if(this.value == '退款'){
            timeIntervalUnita.style.visibility = 'hidden';
            timeIntervalUnitb.style.visibility = 'visible';
        }
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

  var selectz = c('sales_head_selectz');  //第二种类input下拉框(携带value值的下拉框)
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
    var avoid = [0];  //此数组可以避免被执行默认选中
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

  /*for(var i = 0; i < dateController.length; i++){
    (function(q){
    })(i)
  }*/
}



//数据请求
function selesForm(){
  var submit = c('sales_head_tbody_submit')[0];
  var deviceHeadGroupingz = d('device_head_groupingz');

  submit.onclick = function(){
    var salesBody = c('sales_body')[0];                         //底部渲染数据部分

    if(deviceHeadGroupingz.name == ""){
      alern('设备不能为空！');
      return false;
    }
    salesBody.style.display = 'block';
    $.ajax({
      type: 'post',
      url: URLX + '/jf/com/inventory/report.json',
      data: {
        machCode: deviceHeadGroupingz.name,
        mark: 'ASC',
      },
      dataType: 'json',
      success: function(data){
        console.log(data);
        tableRendering(data.reportEntity);
      }
    })
  }

  //根据货道排序
  c('sales_body_table_cargo')[0].onclick = function(){
    var count = 1;
    if(c('sales_body_table_cargo')[0].children[0].innerHTML == '↓' && count == 1){
      count = 0;
      c('sales_body_table_cargo')[0].children[0].innerHTML = '↑';
      $.ajax({
        type: 'post',
        url: URLX + '/jf/com/inventory/report.json',
        data: {
          machCode: deviceHeadGroupingz.name,
          mark: 'ASC',
        },
        dataType: 'json',
        success: function(data){
          count = 1;
          console.log(data);
          tableRendering(data.reportEntity);
        }
      })
    }
    if(c('sales_body_table_cargo')[0].children[0].innerHTML == '↑' && count == 1){
      count = 0;
      c('sales_body_table_cargo')[0].children[0].innerHTML = '↓';
      $.ajax({
        type: 'post',
        url: URLX + '/jf/com/inventory/report.json',
        data: {
          machCode: deviceHeadGroupingz.name,
          mark: 'DESC',
        },
        dataType: 'json',
        success: function(data){
          count = 1;
          console.log(data);
          tableRendering(data.reportEntity);
        }
      })
    }
  }
}

start();
selesForm();

//底部table渲染
function tableRendering(allDate){
  var table = c('sales_body_table_tbody')[0];
  table.innerHTML = '';
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
    td1.innerHTML = allDate[i].machName;
    td2.innerHTML = allDate[i].machCode;
    td3.innerHTML = allDate[i].cargo;
    td4.innerHTML = allDate[i].cargoType;
    td5.innerHTML = allDate[i].waresName;
    td6.innerHTML = allDate[i].waresId;
    td7.innerHTML = allDate[i].number;
    td8.innerHTML = allDate[i].waresPrice;
    td9.innerHTML = worldDateTime(new Date(allDate[i].addTime).getTime());
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);
    tr.appendChild(td7);
    tr.appendChild(td8);
    tr.appendChild(td9);
    table.appendChild(tr);
  }

  var salesBodyTableTbodyBtn = c('sales_body_table_tbody_btn');
  for(var i = 0; i < salesBodyTableTbodyBtn.length; i++){
    (function(q){
      salesBodyTableTbodyBtn[q].onclick = function(){
        var Type = this.parentNode.parentNode.dataset.type;
        if(Type == "wechat"){

        }else if(Type == "alipay"){

        }else if(Type == "SilverMerchant"){
          
        }else if(Type == "icbc"){
          
        }else{
          alern('该交易类型不支持退款！');
          return false;
        }
        d('refund_mark').value = "";
        c('refund_fixed')[0].style.display = 'block';
        var refundOrderId = d('refund_orderId');
        var refundComm = d('refund_comm');
        var refundTime = d('refund_time');
        var refundMoney = d('refund_money');
        var refundStatus = d('refund_status');
        var refundType = d('refund_type');
        var refundConsumer = d('refund_consumer');
        refundOrderId.innerHTML = this.parentNode.parentNode.dataset.orderid;
        refundOrderId.setAttribute('data-value',Type);
        refundComm.innerHTML = this.parentNode.parentNode.dataset.comm;
        refundTime.innerHTML = this.parentNode.parentNode.dataset.time;
        refundMoney.innerHTML = this.parentNode.parentNode.dataset.money;
        refundStatus.innerHTML = this.parentNode.parentNode.dataset.status;
        refundType.innerHTML = this.parentNode.parentNode.dataset.mark;
        refundConsumer.innerHTML = this.parentNode.parentNode.dataset.consumer;
      }
    })(i)
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

      // template ： 定义文档的类型，相当于html页面中顶部的<!DOCTYPE> 声明。（个人理解，不确定）
      // encodeURIComponent:解码
      // unescape() 函数：对通过 escape() 编码的字符串进行解码。
      // window.btoa(window.encodeURIComponent(str)):支持汉字进行解码。
      // \w ：匹配包括下划线的任何单词字符。等价于’[A-Za-z0-9_]’
      // replace()方法：用于在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串。
      // {(\w+)}：匹配所有 {1个或更多字符} 形式的字符串；此处匹配输出内容是 “worksheet”
      // 正则中的() ：是为了提取匹配的字符串。表达式中有几个()就有几个相应的匹配字符串。
      // 讲解(/{(\w+)}/g, function(m, p) { return c[p]; } ：
      //     /{(\w+)}/g 匹配出所有形式为“{worksheet}”的字符串；
      //     function参数：  m  正则所匹配到的内容，即“worksheet”；
      //                     p  正则表达式中分组的内容,即“(\w+)”分组中匹配到的内容，为“worksheet”；
      //     c ：为object，见下图3
      //     c[p] : 为“worksheet”

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
      link.download = '库存报告' + names + '.xls';
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
  /*var tableArray = tableArr(excelTable);
  tableArray.unshift(xlsxUtils.readDataHead(tableArray));
  var blob = xlsxUtils.export({"Sheet1": tableArray});

  var excelDate = new Date();
  var names = excelDate.getFullYear() + '-' + (excelDate.getMonth()+1) + '-' + excelDate.getDate();
  
  saveAs(URL.createObjectURL(blob), "库存报告"+names+".xlsx");
}

function tableArr(that){
  console.log(that);
  var thatChild = that.children;
  var tableArray = [];
  var tableHeadArr = [];
  for(var i = 0; i < thatChild[0].children[0].children.length; i++){
    tableHeadArr.push(thatChild[0].children[0].children[i].innerText);
  }
  for(var j = 0; j < thatChild[1].children.length; j++){
    var tableObject = {};
    for(var k = 0; k < thatChild[1].children[j].children.length; k++){
      tableObject[tableHeadArr[k]] = thatChild[1].children[j].children[k].innerText;
    }
    tableArray.push(tableObject);
  }
  return tableArray;
}*/