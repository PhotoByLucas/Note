//bfs队列
function bfs(target, name){
    const quene = [...target];
    while(quene.length){
        const current = quene.shift();
        current.isTravel = true;
        if(current.children){
            quene.push(...current.children);
        }
        if(current.name === name){
            return current;
        }
    }
    return undefined;
}

//dfs栈（递归）
function dfs(target, name){
    var quene = [...target];
    while(quene.length){
        const current = quene.pop();
        current.isTravel = true;
        if(current.children){
            quene.push(...[...current.children].reverse())//保证从左到右遍历
        }
        if(current.name === name){
            return current;
        }
    }
    return undefined;
}