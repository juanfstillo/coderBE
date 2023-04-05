let arregloDePrueba = [1,2,3,4,5]
const miFuncionMap = (arreglo,callback) =>{
    let nuevoArreglo = [];
    for (let i = 0; i < arreglo.length; i++) {
        let nuevoValor = callback(arreglo[i]);
        nuevoArreglo.push(nuevoValor)
    }
    return nuevoArreglo;   
}

let nuevoArregloPropio = miFuncionMap(arregloDePrueba, x=>x*2)
let nuevoArregloMap = arregloDePrueba.map(x=>x*2);

console.log(nuevoArregloPropio)
console.log(nuevoArregloMap)
