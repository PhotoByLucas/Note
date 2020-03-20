// https://leetcode-cn.com/problems/add-two-numbers/
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
  var result = new ListNode(NaN);
  var temp = result;
  var jinWei = 0;
  var index1 = l1,
    index2 = l2;

  while (index1 && index2) {
    let sum = index1.val + index2.val + jinWei;
    if (sum >= 10) {
      jinWei = 1;
    } else {
      jinWei = 0;
    }
    let tempNode = new ListNode(sum % 10);
    temp.next = tempNode;
    temp = temp.next;
    index1 = index1.next;
    index2 = index2.next;
  }

  function stillHasNode(node) {
    while (node) {
      temp.next = new ListNode((node.val + jinWei) % 10);
      jinWei = node.val + jinWei > 9 ? 1 : 0;
      temp = temp.next;
      node = node.next;
    }
  }

  stillHasNode(index1);
  stillHasNode(index2);
  // 要注意判定余下的进位否则会出现 88+12 =00
  if (jinWei) {
    temp.next = new ListNode(jinWei);
    jinWei = 0;
    temp = temp.next;
  }

  return result.next;
};
