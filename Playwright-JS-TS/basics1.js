var a=29
console.log("before reassignment A:",a)
a=40
console.log("after reassignment A:",a)
var a=45
console.log("after redeclared A:",a)




let c=20
console.log("before reassignment C:",c)
c=30
console.log("after reassignment C:",c)
c=34
console.log("after redeclared C:",c)



const e=50
console.log("before reassignment E:",e)


// e=60
console.log("before reassignment E:",e)
//   error :cannot reassignement also block-scoped variable e

//const e=60 error :cannot redeclare block-scoped variable e
console.log("after redeclareed E:",e)


// #const e=60  error :cannot redeclare block-scoped variable e
work=123
worl1="srinu"
work3=45.8
work4=true
console.log("work:",typeof(work))
console.log("worl1:",typeof(worl1))
console.log("work3:",typeof(work3))
console.log("work4:",typeof(work4))