function bubbleSort(arr){
        for(var i = arr.length-1; i > 0; i--){
            for(var j = 0; j < i; j++){
                if(arr[j] > arr[j+1]){
                    [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
                }
            }
    }
    return arr;
}

function selectSort(){
        for(var i = 0; i < arr.length - 1; i++){
            var min = i;
            for(var j = i + 1; j < arr.length; j++){
                min = arr[j] < arr[min] ? j : min;
            }
            [arr[i], arr[min]] = [arr[min], arr[i]];
        }
    return arr;
}

function insertSort(){
        for(var i = 1; i < arr.length; i++){
            var pre = i - 1;
            var cur = arr[i];
            while(pre >= 0 && arr[pre] > cur){
                arr[pre + 1] = arr[pre];
                pre--;
            }
            arr[pre + 1] = cur;
        }
        return arr;
}

function quickSort(){
    if(arr.length <= 1) return arr;
    var left = [], right = [];
    var numIndex = Math.floor(arr.length/2);
    var num = arr.splice(numIndex, 1)[0];
    for(var i = 0; i < arr.length; i++){
        if(arr[i] > num)
        right.push(arr[i]);
        else
        left.push(arr[i]);
    }
    return [...quickSort(left), num, ...quickSort(right)];
}

function mergeSort(arr){
    if(arr.length < 2){
        return arr;
    }
    var middle = Math.floor(arr.length/2),
    left = arr.slice(0, middle),
    right = arr.slice(middle);
    return merge(mergeSort(left), mergeSort(right));
}
function merge(left, right){
    var result = [];
    while(left.length && right.length){
        left[0] < right[0] ? result.push(left.shift()):result.push(right.shift());
    }
    return result.concat(left, right);
}