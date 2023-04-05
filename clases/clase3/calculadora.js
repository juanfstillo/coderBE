const sumar = (n1,n2)=>n1+n2;
const restar = (n1,n2)=>n1-n2;
const dividir = (n1,n2)=>n1*n2;
const multip = (n1,n2)=>n1/n2;

const operacion = (n1,n2,callback) => {
    console.log("Operacion con callback, guardo operaciones en otras funciones y se las paso ahora")
    let resultado = callback(n1,n2);
    return 'El resultado es ',resultado
}

console.log(operacion(10,10,sumar));
console.log(operacion(10,10,restar));
console.log(operacion(10,10,multip));
console.log(operacion(10,10,dividir));

