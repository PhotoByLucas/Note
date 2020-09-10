function fulltree(tree){
    if(tree === null){
        return false;
    }
    var queue = [];
    queue.push(tree);
    while(!queue.isEmpty()){
        current = queue.pop();
        if(current.left&&current.right){
            queue.push(current.left);
            queue.push(current.right);
        }else if(current.left&&!current.right){
            queue.push(current.left);
            if(current.left.left||current.left.right){
                return false;
            }
        }else if(!current.left&&current.right){
            return false;
        }
    }
    return true;
}