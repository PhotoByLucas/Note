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