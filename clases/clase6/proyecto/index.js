const moment = require('moment')
console.log(moment())

const hoy = moment()
const nacimiento=moment("1992-08-07");

if(nacimiento.isValid()){
const fecha = hoy.diff(nacimiento,"days")
console.log(fecha)
}