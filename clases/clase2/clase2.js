//Tipo de datos y obj
let autos = [
    {
      "id":3,
      "color": "morado",
      "tipo": "minivan",
      "registroDia": new Date('2017-01-03'),
      "capacidad": 7
    },
    {
      "id":4,
      "color": "rojo",
      "tipo": "camioneta",
      "registroDia": new Date('2018-03-03'),
      "capacidad": 5
    },
  ]

  let auto = autos.find(c=>{
    let test;
    test = c.id === 3;
    return test;
  })

  console.log(auto);

  let i = 0;
  function foo(){
    i = 1;
    let j = 2;
    if(true){
      console.log(i);
      console.log(j);
    }
  }
foo();

  function foo2(){
    let i =0;
    if(true){
    let i =1;
    console.log("estoy en otro bloque")
      console.log(i)
    }
    console.log("estoy en el bloque de afuera")

    console.log(i)
  }

  foo2();

//Mutations
  const user = {name:"cristan"};
  user.name = "jorge"
  console.log(user.name)

//funciones clásicas y flecha

function sumar (param1,param2){
  console.log("Soy una función clásica");
  return param1+param2;
}
//Sin llaves existe el return implícito
const sumarFlecha = (param1,param2)=>param1+param2;

const resultadoClasica = sumar(10,10);
console.log(resultadoClasica)

const resultadoFlecha = sumarFlecha(20,20);
console.log(resultadoFlecha)

//Sin llaves existe el return implícito
let funcionFlecha = arg=> arg+1

let resultadoFlecha2 = funcionFlecha(1)
console.log(resultadoFlecha2)

//función mostrar lista
function mostrarLista(lista){
  console.log("funcion lista")
  let nuevaLista = [];
  if(lista.length > 0){
    for (i = 0; i < lista.length; i++) {
      console.log(`Sumamos el elemento = ${lista[i]} del tipo ${typeof(lista[i])}`)
      nuevaLista.push(lista[i]);
    } 
    return nuevaLista;
  }else{
    return "la lista esta vacia"
  }
}
arreglo = ["1",2,3,4,5]
vacia = []
const resultado = mostrarLista(arreglo)
console.log(resultado)
const resultado2 = mostrarLista(vacia)
console.log(resultado2)

//Obj
//Defino una clase persona
class Persona{
  constructor(nombre){
    this.nombre = nombre;
  }
  static categoria = "humano";
  saludar(){
    console.log(`Soy ${this.nombre}`);
  }
  categoria=()=>{
    console.log(`Soy ${Persona.categoria}`)
  }
}
//Instanciación
let persona1 = new Persona("Jose");
console.log(persona1.categoria)
persona1.saludar();
persona1.categoria();

let persona2 = new Persona("Maria")
let persona3 = new Persona("Cristian U")


