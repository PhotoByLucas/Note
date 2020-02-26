## html

- 列表

  1. 有序列表 无序列表

     ```
     <!-- 有序 -->
     <ol>
     <li>内容一</li>
     <li>内容二</li>
     </ol>
     <!-- 无序 -->
     <ul>
     <li>内容一</li>
     <li>内容二</li>
     </ul>
     ```

  2. 定义列表 dl

     dl 是 definition list 的缩写  
     dt 是 definition title 的缩写  
     dd 是 definition description 的缩写  
     **dd 会在 dt 后面缩进**

     ```
     <dl>
       <dt>中国城市</dt>
         <dd>北京 </dd>
         <dd>上海 </dd>
         <dd>广州 </dd>
       <dt>美国城市</dt>
         <dd>华盛顿 </dd>
         <dd>芝加哥 </dd>
         <dd>纽约 </dd>
     </dl>
     ```

- 表单
  1. form
  ~~~
  <form action="html.do" method="get">
    <input type="text"/>
  </form>
  ~~~
- 表格 table
  ~~~
  <table border="1">
    <tr>
      <th>Month</th>
      <th>Savings</th>
    </tr>
    <tr>
      <td>January</td>
      <td>$100</td>
    </tr>
  </table>
  ~~~

  tr row 一行  
  th head 表头  
  td detail 内容

## h5

1. 支持 ie9 起
2. 新元素
   - canvas
   - 多媒体元素
     - audio
     - video
     - source 定义上面这两个
     - embed 嵌入内容，如插件
     - track 为诸如 video 和 audio 元素之类的媒介规定外部文本轨道。
   - 表单元素
