Promise.prototype.all = function(promises){
    let result = [];
    let count = 0;
    let len = promises.length;
    return new Promise((resolve,reject)=>{
        for(let val of promises){
            Promise.resolve(val).then(res=>{
                count++;
                result[i] = res;
                if(count === len){
                    return resolve(result)
                }
            },err=>{return reject(err)})
        }
    })
}