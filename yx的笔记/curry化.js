function curry(fn,args){
    var length = fn.length;
    args = args||[];
    return function(){
        args = [...args, ...arguments];
        return args.length < length ? curry.call(this,fn,args) : fn.call(this,args);
    }
}
var cur = curry(function(a,b,c){
    console.log([a,b,c]);
})
cur(1,2)(3)