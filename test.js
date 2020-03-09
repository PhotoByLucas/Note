let obj = {
    a: 1,
    b: {
      c: 2,
      d: 3,
    },
    f:function(){console.log('a')}
  }

  let newObj = JSON.parse(JSON.stringify(obj))
  obj.f()
//   console.log(newObj.f())