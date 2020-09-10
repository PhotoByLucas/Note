Function.prototype.call = function(context){
    const cxt = context||window;
    cxt.func = this;
    const args = Array.from(arguments).slice(1);
    const res = arguments.length > 1?cxt.func(...args):cxt.func();
    delete cxt.func;
    return res;
}

Function.prototype.apply = function(context){
    const cxt = context||window;
    cxt.func = this;
    const res = arguments[1]?cxt.func(...arguments[1]):cxt.func();
    delete cxt.func;
    return res;
}
Function.prototype.bind = function(context){
    var self = this;
    var args = Array.from(arguments).slice(1);
    return function(){
        const args2 = [...arguments];
        return self.apply(context, args.concat(args2))
    }
}