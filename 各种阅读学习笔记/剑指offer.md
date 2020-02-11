3.  在二维数组中查找一个数字
4.  为字符串替换空格

    例子：将"hello world js !"中的空格替换为两个 0 -> "hello00world00js00!"

    O(n)步骤：

    1. 从头开始遍历字符串，确定其中空格的数量，并计算出最后要开辟的数组的长度
    2. 准备两个指针 P1(前)和 P2(后)，两个指针之间间隔的数量为 开辟的新数组长度-原来数组长度。
    3. 从最后开始遍历数组，

       - 在遇到空格之前，将每一个字都从前面的指针复制到后面的指针上
       - 在遇到空格时，P1 位置不变，在 P2 插入替换的字符串并将 P2 前移，直到 P1P2 重叠。

5.  从尾到头打印链表

    使用栈来存储链表的遍历 先进后出

6.  输入一棵树的前序和中序的结果，根据结果重建二叉树

    1. 取前序数组第一个(树的根节点)
    2. 遍历中序数组，找到前序数组的第一个，分出左右树
    3. 递归

7.  用两个栈(先进后出)实现队列(先进先出)

    - 入队：将元素进栈 stack1

    - 出队：判断栈 stack2 是否为空，
      - 如果为空，则将栈 stack1 中所有元素 pop，并 push 进栈 stack2，栈 stack2 出栈；
      - 如果不为空，栈 stack2 直接出栈。

8.  旋转数组的最小数字

    - 查找
      - 已排序/部分排序 ：二分查找
      - 哈希表
        - O(1)时间内查找到某一元素，效率最高
        - 需要额外空间
      - 二叉排序树查找 -> BST
    - 排序
    - 题目

      把一个数组最开始的若干个元素搬到数组的末尾，我们称之为**数组的旋转**。输入一个递增排序的数组的一个旋转，输出旋转数组的最小元素。

      例如数组{3,4,5,1,2}为{1,2,3,4,5}的一个旋转，该数组的最小值为 1。

    - O(log n)解决步骤

      1. 输入数组是部分有序的，可分为前后两段递增数组，且前段数组大于等于后段数组，故采用二分查找，在数组开始和结束分别设置两个指针 P1 和 P2
      2. 取中间的数字 tempNum，
         - 若 tempNum > P1，则说明中间的数组还在前段的递增数组中，故将 P1 移动到 tempNum 处
         - 反之，若 tempNum<= P1，则说明 tempNum 处于后段数组中，移动 P2 至 tempNum
      3. 继续执行知道 P1、P2 两个指针相邻

9.  斐波那契数列

    ```
        f(n) = f(n-1)+f(n-2)         (n>1)
            = 1                     (n=1)
            = 0                     (n=0)
    ```

    - 递归方法

    - O(n)解法

      ```
      function fbnc(n){
          if( n===1) return 0
          if (n===2) return 1

          if (n>2) {
              var num1=1 // 下一次循环中的较大数
              var num2=0 // 下一次循环中的较小数
              var fbncN=0
              for (let index = 2; index < n; index++) {
                  fbncN=num1+num2
                  num2=num1
                  num1=fbncN
              }
              return fbncN
          }
      }
      ```

10. 二进制中的 1 个数
    - 位运算
      - &与
      - |或
      - ^异或
      - n = n >> 1 右移


    - 题目

      给定一个数字，给出对应二进制中 1 的个数

    - 错误解法：位运算右移，但是会遇到负数陷入死循环

    - 正确解法
        ~~~
        function Num1(n) {
        var count = 0;

        // 加入一个flag属性，作为验证该数的某一位是否为1的依据
        // 二进制为  00000001
        var flag = 1;
        while (flag) {
            if (n & flag) {
            count++;
            }

            flag = flag << 1;
            // 会变为
            // 0000010
            // 0000100
            // 0001000
            // 知道超出32位
        }
        return count;
        }

        ~~~

    - 有x个1就O(x)的解法

        ~~~
        function Num1(n){
            var count=0
            while(n){
                count++

                // 1. 减法会使位运算中的数字中少去一个1
                // 2. 少去一个1的n与原来的n做且运算，前面有1的都会保留，不同的部分不回保留
                n=n & n-1
            }
            return count
        }
        ~~~

11. 数值的整数次方

    - 题目

    ```
    /**
    * @param {number} base 基数
    * @param {number} exponent 次方
    * @return {number} result = base^exponent
    */
    function Power(base,exponent){

    }
    ```

    - 坑点(边界问题)

      存在正数次方、负数次方、0 次方
    - O(n)

      ```
      for(let i=0;i<exponent;i++) {
          result*=base
      }
      ~~
      ```

    - O(log n)

      以 2 为例子，递归求 2^1,2^2,2^4,2^8...

12. 打印1到最大的n位数
    - 题目：输入3，则打印1,2,3,...999
    - 坑点：n可能是超过位数的大数，应该使用字符串，在字符串上模拟加法
    - 解法
        ~~~
        // 打印的位数
        let tag =1
        let myNumber=new Array()
        for(let i=0;i<n+1;i++){
            // 新建一个n+1长度的初始化为0的数组
            myNumber.push(0)
        }

        while(tag){
            print(tag)
            increase(n)
        }
        
        // 增长函数 立刻执行
        // n 为+1的数组位
        function increase(n){
            // 最高一位为1时，说明已经超过n位
            if(myNumber[0]!==0){tag=false} 

            myNumber[n]+=1
            if(myNumber[n]===10){
                // 进位
                increase(n-1)
                myNumber[n]=0
            }
        }

        function print(tag){
            let tempNum=myNumber.slice[n-tag+1,n]
            console.log(tempNum.join())
        }

        ~~~
12. O(1)删除链表节点
    - 题目：给定一个节点和一个链表，要求从链表中删除该节点
    - 注意：链表是否只有一个节点，即要将链表头指向空
    - 解法：
        - 遍历一遍后找到要删除的节点，按照常规方法删除 O(n)
        - O(1) 解法
            1. 直接将要删除的节点的下一个节点复制到要删除的节点中
            2. 移去下一个节点