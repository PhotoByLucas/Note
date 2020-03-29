var Person=(function(){
  // 私有属性
  let _age=Symbol('age')
  class Person{
    constructor(name,age){
      this.name=name
      this[_age]=age
    }
    setAge(age){
      this[_age]=age
    }
    getAge(){
      return this[_age]
    }
  }

  return Person
})()

Teacher=(function(){
  let _studentCount=Symbol('studentCount')
  let _setStudentCount=Symbol('ssc')
  class Teacher extends Person{
    constructor(name,age,count){
      super(name,age)
      this[_setStudentCount](count)
    }

    [_setStudentCount](count){
      this[_studentCount]=count
    }
    getSC(){
      return this[_studentCount]
    }
  }

  return Teacher
})()

let t1=new Teacher('t',111,1)
console.log(t1.name)
console.log(t1.getAge())
console.log(t1._age)
console.log(t1.getSC())
console.log(t1._studentCount)