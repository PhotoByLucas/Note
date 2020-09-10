class Node{
    constructor(data){
        this.data = data;
        this.root = this;
        this.left = null;
        this.right = right;
    }
}

class BST{
    constructor(){
        this.root = null;
    }
}

//插入节点
function insert(data){
    let newNode = new Node(data);
    let insertNode = (node, newNode) => {
        if(newNode.data < node.data){
            if(node.left === null)
            node.left = newNode;
            else
            insertNode(node.left, newNode);
        }else{
            if(node.right === null)
            node.right = newNode;
            else
            insertNode(node.right, newNode);
        }
    };
    if(!this.root){
        this.root = newNode;
    }else{
        insertNode(this.root, newNode);
    }
}
//前序遍历
function pre(tree) {
    if (tree === null) return;
    console.log(tree.data);
    pre(tree.left);
    pre(tree.right);
}
//中序遍历
function inorder(tree) {
    if (tree === null) return;
    pre(tree.left);
    console.log(tree.data);
    pre(tree.right);
}
//后序遍历
function back(tree) {
    if (tree === null) return;
    pre(tree.left);
    pre(tree.right);
    console.log(tree.data);
}

//查找最小值
function getMin(node){
    let minNode = node => {
        return node?(node.left?minNode(node.left):node):null;
    }
    return minNode(node || this.root);
}

//查找最大值
function getMax(node){
    let maxNode = node => {
        return node?(node.right?maxNode(node.right):node):null;
    }
    return maxNode(node || this.root);
}

//查找特定值
function find(data){
    let findNode = (node,data) => {
        if(node = null) return false;
        if(node.data === data) return node;
        return findNode((data < node.data)?node.left : node.right, data);
    }
    return findNode(this.root, data);
}

function remove(data){
    let removeNode = (node, data) => {
        if(node === null) return null;
        if (node.data === data){
            if(node.left === null && node.right === null) return null;
            if(node.left === null) return node.right;
            if(node.right === null) return node.left;
            if(node.left !== null && node.right !== null){
                let _node = this.getMin(node.right);
                node.data = _node.data;
                node.right = removeNode(node.right, data);
                return node;
            }
        }else if(data < node.data){
            node.left = removeNode(node.left, data);
            return node;
        }else{
            node.right = removeNode(node.right, data);
            return node;
        }
    }
   return removeNode(this.root, data); 
}