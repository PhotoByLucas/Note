for (var i = 0; i < 5; i++) {
  setTimeout(((index)=>{
    console.log(index)
  })(i),i*1000)
  
}