//防抖（触发事件后在 n 秒内函数只能执行一次，如果在 n 秒内又触发了事件，则会重新计算函数执行时间）
function debounce(func, wait){
    var timeout;
    return function(){
        clearTimeout(timeout);
        timeout = setTimeout(()=>{
            func.apply(this, arguments);
        },wait)
    }
}


    //节流（连续触发事件但是在 n 秒中只执行一次函数。节流会稀释函数的执行频率。）
    function throttle(func, wait){
    var pre = 0;
    return function(){
        let now = new Date();
        if(now-pre>wait){
            func.apply(this,arguments);
            pre = now;
        }
    }
}

