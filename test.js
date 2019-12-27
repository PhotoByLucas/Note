let input =  [7,6,4,2,3]
let tag1 = input[0]//买入
let tag2 = input[1]
for(let i =0;i<input.length-1;i++){
    //得到买入时最小的价
    if(tag1>input[i]){
        tag1=input[i]
        tag2=input[i+1]
    }
    
    
    for(let j = i+1;j<input.length;j++){
        //检验出买入后的中 最大的
        if(tag2<input[j]){
            tag2=input[j]
        }
    }
}

console.log(tag1,tag2)
console.log(tag2>tag1?tag2-tag1:0)