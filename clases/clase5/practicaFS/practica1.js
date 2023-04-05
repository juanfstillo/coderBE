const fs = require('fs');

// fs.writeFile('data1.json','ingreso de datos',(error)=>{
// if(error){
//     console.log('Error',error)
// }
// })

// fs.readFile('data1.txt','utf-8',(error,data)=>{
//     if(!error){
//         console.log(data)
//     }else{
//         console.log(error)
//     }
// })

// fs.appendFile('data1.txt','\nnuevo texto',(error)=>{
//     if(!error){
//         console.log("Contenido agregado");
//     }else{
//         console.log("Error",error)
//     }
// })

// fs.createReadStream('data1.txt').pipe(fs.createWriteStream('data2.txt'))

// fs.unlink('data2.txt',(error)=>{
//     if(error){
//         console.log(Error)
//     }
// })

fs.readdir('./',(error,archivos)=>{
    archivos.forEach(archivo =>{
        console.log(archivo);
    })
})