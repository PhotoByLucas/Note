let a = {
  value: 1
}
function getValue(name, age) {
  console.log(name)
  console.log(age)
  console.log(this.value)
}
// getValue.call(a, 'yck', '24')
// getValue.apply(a, ['yck', '24'])

(bind(a,'yck','24'))()