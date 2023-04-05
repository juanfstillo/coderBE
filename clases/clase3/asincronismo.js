// const escribirArchivo = require('./asincronismo.js')
// console.log('inicio del programa')
// escribirArchivo('Hola Mundo',()=>{
//     console.log('termine de escribir el archivo')
// })
// console.log('fin del programa')

const dividir = (dividendo,divisor) =>{
    return new Promise((resolve,reject)=>{
        if(divisor === 0){
            reject("No se puede hacer divisiones entre 0")
        }else{
            resolve(dividendo/divisor)
        }
    })
}


const funcionAsincronica = async() =>{
    try{
        let resultado = await dividir(10,5)
        console.log(resultado)
    }
    catch(error){
        console.log(error)
    }
}

funcionAsincronica()
    