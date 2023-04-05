//ES7
console.log("----ES7----")

let valoresBase = [1,2,3,4,5,6]
let nuevosValores = valoresBase.map((numero,indice)=>numero**indice);
console.log(nuevosValores);

let nombres = ['primero','segundo'];
console.log(nombres.includes('primero'))

//ES 8
console.log("----ES8----")

var Tax = {
    taxArg: '21',
    taxEsp: '23',
    taxUsa: '22'
};

console.log("Object entries, values, keys")

letParLlaveValor = Object.entries(Tax);
console.log(letParLlaveValor)

letLlave = Object.keys(Tax);
console.log(letLlave)

letLValor = Object.values(Tax);
console.log(letLValor)

//reduce
console.log("Reduce")
const array1 = [1, 2, 3, 4];

// 0 + 1 + 2 + 3 + 4
const initialValue = 0;
const sumWithInitial = array1.reduce(
  (accumulator, currentValue) => accumulator + currentValue
);

console.log(sumWithInitial);

//Sustrae los números del array empezando desde la izquierda
// 100-50-50
const numbers = [100, 50, 50];

function myFunc(total, num) {
  return total - num;
}


//map
console.log("Map")
const input = [1, 2, 3, 4, 5];
console.log(input.map((numero) => numero*numero));
const num = input.map((num) => Math.pow(num, 2));
console.log(num)


//filter
console.log("Filter")
const input2 = [1, -4, 12, 0, -3, 29, -150];

const result = input2.filter(pepe => pepe> 0);
console.log(result)
const sumaPositivos = result.reduce((accumulator,currentValue)=>accumulator+currentValue)
console.log(sumaPositivos)

//ejercicio 3
const input3 = [12, 46, 32, 64];
const suma = input3.reduce((accumulator,currentValue)=>accumulator+currentValue)
console.log(suma)
const mean = suma / input3.length
console.log('Mean:',mean)

const ordenados = input3.sort()
console.log(ordenados)
const input4 = [12, 46, 32, 64];

console.log(input4.sort((a, b) => a - b));

const input5 = [12, 46, 32, 64];
input.sort((a, b) => a - b);

input.reduce(
  (accumulator, currentValue, index, array) => {
    accumulator.mean += currentValue / array.length;

    if (array.length % 2 === 0) {
      // if the array has an even number of elements
      if (index === array.length / 2 - 1) {
        accumulator.median += currentValue;
      } else if (index === array.length / 2) {
        accumulator.median += currentValue;
        accumulator.median /= 2;
      }
    } else {
      // if the array has an odd number of elements
      if (index === (array.length - 1) / 2) {
        accumulator.median = currentValue;
      }
    }

    return accumulator;
  },
  { mean: 0, median: 0 }
);

console.log('Median:',mean)

console.log('Spread operator')
let objeto1 = {
  propiedad1:2,
  propiedad2:'b',
  propiedad3:true
}
let objeto2= {
  propiedad4:'c',
  propiedad5:false
}

console.log("destructuring")
let {propiedad1,propiedad2} = objeto1
console.log(propiedad1,propiedad2)

let objeto3 = {...objeto1,...objeto2}
console.log(objeto3)

console.log("Rest")

function sum(...theArgs) {
  let total = 0;
  for (const pepe of theArgs) {
    total += pepe;
  }
  return total;
}

console.log(sum(12,3,4,4,3,2,32))

let objRest = {
  a:1,
  b:2,
  c:3
}

let {a,...rest} = objRest
console.log(typeof(a))
console.log(rest)

console.log('--Tarea clase---')

const objetosVerdu =  [
	{
		manzanas:3,
		peras:2,
		carne:1,
		jugos:5,
		dulces:2
	},
	{
		manzanas:1,
		sandias:1,
		huevos:6,
		jugos:1,
		panes:4
	}
]

console.log(Object.keys(objetosVerdu))
