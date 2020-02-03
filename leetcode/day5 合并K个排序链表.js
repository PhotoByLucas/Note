// 23. 合并K个排序链表
// https://leetcode-cn.com/problems/merge-k-sorted-lists/submissions/

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function(lists) {
  let res = new ListNode(0);
  let tempArray = new Array();
  //   取出所有的数字
  lists.forEach(element => {
    while (element) {
      tempArray.push(element.val);
      element = element.next;
    }
  });
  //   排序后生成链表
  tempArray.sort((a, b) => a - b);
  let currentNode = res;
  for (let i = 0; i < tempArray.length; i++) {
    currentNode.next = new ListNode(tempArray[i]);
    currentNode = currentNode.next;
  }
  console.log(tempArray);
  return res.next;
};
