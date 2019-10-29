let str='2001-04-01'
var dayOfYear = function(date) {
  let tempArray=date.split('-')
  
  
  let year=parseInt(tempArray[0])
  let month=parseInt(tempArray[1])
  let day=parseInt(tempArray[2])

  let result = day
  // 闰年
  let isRun= year%400===0 || (year%100!==0&&year%4===0)

  let monthArray=[0,31,28,31,30,31,30,31,31,30,31,30,31]

  // 月份数
  for(let i=0;i<month;i++){
    result+=monthArray[i]
  }
  
  if(isRun&&month>2){result+=1}
  
  return result
}
console.log(dayOfYear(str))