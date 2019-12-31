function Num1(n) {

  var state={
    processTypes: [], // 所有的进程类型
    fieldsValue:{}, // 表单数据
  }
  
  var fieldsValue  = {
    name:'aaa',
    de:'bbbb'
  }
  console.log(Object.assign({},state,{fieldsValue}));
}

Num1()