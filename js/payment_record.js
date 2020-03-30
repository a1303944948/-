//input下拉框渲染
function start(){
  d('device_head_year').value = '';
  d('device_head_month').value = '';

  var preStartTimeYear = 2018;
  var preTimeYear = new Date().getFullYear();
  var preTimeYearArr = [];
  for(var i = 0; i < preTimeYear-preStartTimeYear+1; i++){
    preTimeYearArr.push(preStartTimeYear+i);
  }
  var preTimeYearArray = [];
  for(var i = 0; i < preTimeYearArr.length; i++){
    var preTimeYearObject = {};
    preTimeYearObject.name = preTimeYearArr[i];
    preTimeYearObject.value = preTimeYearArr[i];
    preTimeYearArray.push(preTimeYearObject);
  }
  var deviceHeadYear = d('device_head_year');
  deviceHeadYear.setAttribute('data-select',JSON.stringify(preTimeYearArray));
  WmStartSelect();
}

start();

c('sales_head_tbody_submit')[0].onclick = function(){
  var deviceHeadYear = d('device_head_year').dataset.value;
  var deviceHeadMonth = d('device_head_month').dataset.value;
  if(!deviceHeadYear){
    alern('请选择年！');
    return false;
  }
  if(!deviceHeadMonth){
    alern('请选择月！');
    return false;
  }
  var startTime = new Date(deviceHeadYear + '-' + deviceHeadMonth),
      startTime = startTime.getFullYear() + '-' + (startTime.getMonth() + 1) + '-' + startTime.getDate();
  var endTime = new Date(deviceHeadYear + '-' + deviceHeadMonth);
  if(endTime.getMonth() + 2 == 13){
      endTime = (endTime.getFullYear()+1) + '-' + 1 + '-' + endTime.getDate();
  }else{
      endTime = endTime.getFullYear() + '-' + (endTime.getMonth() + 2) + '-' + endTime.getDate();
  }

  ajax('post',URLS + '/jf/com/payment/recharge/statistical.json','startTime='+startTime+'&endTime=' + endTime,function(data){
    if(data.code == 10001){
      tableRendering(data.data);
    }else{
      alern(data.msg);
    }
  },'','json')
}

//底部table渲染
function tableRendering(allDate){
  c('sales_body')[0].style.display = 'block';
  var table = c('sales_body_table_tbody')[0];
  table.innerHTML = '';
  var totalRmb = 0;
  for(var i = 0; i < allDate.length; i++){
    totalRmb += allDate[i].total_amount;
    var tr = creat('tr');
    var td1 = creat('td');
    var td2 = creat('td');
    var td3 = creat('td');
    var td4 = creat('td');
    var td5 = creat('td');
    var td6 = creat('td');
    td1.innerHTML = i+1;
    td2.innerHTML = allDate[i].openid;
    td3.innerHTML = allDate[i].out_trade_no;
    td4.innerHTML = allDate[i].total_amount;
    td5.innerHTML = allDate[i].buyer_id;
    td6.innerHTML = allDate[i].paymentDate;
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);
    table.appendChild(tr);
  }
  var tr = creat('tr');
  var td1 = creat('td');
  var td2 = creat('td');
  var td3 = creat('td');
  var td4 = creat('td');
  td1.innerHTML = '总计';
  td1.colSpan = 3;
  td2.innerHTML = Number(totalRmb.toFixed(2));
  td3.innerHTML = '报表日期';
  var nowDate = new Date();
  td4.innerHTML = nowDate.getFullYear() + '-' + (nowDate.getMonth()+1) + '-' + nowDate.getDate();
  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);
  table.appendChild(tr);

/*  var salesBodyTableTbodyBtn = c('sales_body_table_tbody_btn');
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
  }*/
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

function myPrint(obj){
    //打开一个新窗口newWindow
    var newWindow=window.open("打印页面","_blank");
    //要打印的div的内容
    var docStr = obj.innerHTML;
    //打印内容写入newWindow文档
    newWindow.document.write('<table border="1" cellspacing="0">'+docStr+'</table>');
    //关闭文档
    newWindow.document.close();
    //调用打印机
    newWindow.print();
    //关闭newWindow页面
    newWindow.close();
}
c('sales_body_print_btn')[0].onclick = function(){
  myPrint(d('sales_body_table'));
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