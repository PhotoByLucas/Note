// 创建一个对象person，他有两个指向属性age和name的引用
var person = {
  age: 12,
  name: 'aaaa'
};

person.name = null; // 虽然设置为null，但因为person对象还有指向name的引用，因此name不会回收

var p = person; 
person = 1;  

console.log(person,p)