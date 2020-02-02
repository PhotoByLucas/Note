// 题目：拼写单词

const words = ["cat","bt","hat","tree"]
const chars = "atach"
let temp ={}
let result=0
chars.split('').forEach(item=>{
  temp[item]?temp[item]+=1:temp[item]=1
})

words.forEach(item=>{
  let pre={...temp}  
  let isyes=true
  item.split('').forEach(word=>{
    pre[word]>=1?pre[word]-=1:isyes=false
  })
  if (isyes) {
    result+=item.length
  }
})

console.log(result)