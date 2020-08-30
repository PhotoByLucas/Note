1. 使用Promise实现每隔1秒输出1,2,3
2. Promise 串行执行

    上一个状态为resolve的Promise将作为pre
    ~~~
    [1, 2, 3, 4].reduce((pre, next) => {
      return pre.then(() => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            console.log(next)
            resolve()
          }, 1000)
        })
      })
    } , Promise.resolve())
    ~~~

3. Promise 并行执行

    ~~~
    const p1 = () => new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('1')
        resolve(1)
      }, 1000)
    })

    const p2 = () => new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('2')
        resolve(2)
      }, 2000)
    })

    Promise.all([p1(), p2()]).then((res) => {
      console.log(res)
    })
    ~~~

4. Promise.all

    ~~~
    function promiseAll(promises) {
      return new Promise(function(resolve, reject) {
        if (!isArray(promises)) {
          return reject(new TypeError('arguments must be an array'));
        }
        var resolvedCounter = 0;
        var promiseNum = promises.length;
        var resolvedValues = new Array(promiseNum);
        for (var i = 0; i < promiseNum; i++) {
          (function(i) {
            Promise.resolve(promises[i]).then(function(value) {
              resolvedCounter++
              resolvedValues[i] = value
              if (resolvedCounter == promiseNum) {
                return resolve(resolvedValues)
              }
            }, function(reason) {
              return reject(reason)
            })
          })(i)
        }
      })
    }
    ~~~
