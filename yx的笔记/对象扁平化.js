function flatten(data){
    var result = {};
    function recurse(cur, prop){
        if(Object(cur) != cur){
            result[prop] = cur;
        }else if(Array.isArray(cur)){
            for(let i = 0; i < cur.length; i++){
                recurse(cur[i], prop + '[' + i + ']');
            }
            if(cur.length === 0){
                result[prop] = [];
            }
        }else{
                var isEmpty = true;
                for(let i in cur){
                    isEmpty = false;
                    recurse(cur[i], prop?prop + '.' + p: p);
                }
                if(isEmpty&&prop){
                    result[prop] = {};
                }
            }
        }
    
    recurse(data, '');
    return result;
}