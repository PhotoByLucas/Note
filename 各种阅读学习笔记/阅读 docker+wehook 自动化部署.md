[原文](https://juejin.im/post/5ef4c7eff265da230b52dfc5?utm_source=gold_browser_extension)

- 使用docker
  1. 编写 Dockerfile
  2. 创建 docker image

      image有两种获取方法
        - docker file 创建成的
          ~~~
          docker build . -t test-image:latest 

          - . 指使用当前文件夹下dockerfile
          - -t 使用tag标记版本
          - test-image:latest 创建一个名为test-image的镜像，版本为latest
          ~~~
        - 从dockerhub拉取
  3. 把镜像跑起来 

      - docker images 查看所有镜像
      - 跑起来！！！

        ~~~
        docker run -d -p 3000:80 --name test-container test-image:latest

        - -d 在后台跑起来
        - -p 指定端口映射，3000为服务器端口，80为容器端口
        - --name 给容器取名
        ~~~

      - docker ps -a 显示所有容器