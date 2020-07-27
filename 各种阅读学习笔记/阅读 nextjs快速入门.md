1. 页面间导航

   - 约定式路由
   - 客户端导航 `<Link>`

     在生产环境中，通过该标签 `预取` 链接对应页面，之后使用 js 进行页面转换（没有重新加载整个页面）

2. 资源、元数据与 CSS
3. 预渲染与数据获取

   - 预渲染的两种形式

     1. 静态生成：构建时生成 html 预渲染， `请求时重用`
     2. 服务端渲染：在 `每个请求上分别渲染` HTML

   - 有数据情况下的静态生成

     - 生成步骤

       next build => fetch data => generate after fetch data

     - `getStaticProps`

       ```
       // page/home.js
       export const getStaticProps = async (context) => {
         const data = getData()
         return {
           // 作为组件的props
           props:{
             data
           }
         }
       }

       // page/home.js
       export default Home({data}) { ... }
       ```

       在函数中，使用一个异步函数 `getStaticProps` 来获取数据，next将保证在执行该函数后才开始渲染页面
      
       将数据返回到props中，并在子组件home中引用
     - `getStaticPaths` 静态生成使用**动态路由**的页面

        ~~~
        export async function getStaticPaths() {
          return {
            // 静态生成时将生成 page/1 和 page/2 
            paths: [
              { params: { id: '1' } },
              { params: { id: '2' } },
            ],
            // false 未返回为path的路径都将为404
            // true 不会为404，会有后备页面响应路径
            fallback: true or false 
          };
        }
        ~~~

       如果页面使用动态路由并使用`getStaticProps`，则必须定义在构建时必须预渲染的路由路径，该函数返回的path中所有params的路径都将在构建时被预渲染
     - 服务端渲染则使用 `getServerSideProps` 

4. 动态路由