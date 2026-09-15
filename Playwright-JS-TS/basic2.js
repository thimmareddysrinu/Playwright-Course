class Person{
    static age=20
    // object 
    static get location(){
        return "canada"

    }

    constructor(firstname,lastname){
        this.firstname=firstname
        this.lastname=lastname

    }
    fullname(){
        return  this.firstname + ""+this.lastname

    }
}
let person= new Person("srinu","thimmareddy")
let person1= new Person("ashok","reddy")
console.log(Person.age)
console.log(Person.location)
console.log(person1.fullname())
console.log(person.fullname())