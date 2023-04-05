function primero(segundo){
    setTimeout(function(){
        console.log("Primero");
        segundo()
    },3000);
}
function segundo (){
    console.log("Segundo");
}

primero(segundo);

function saludo(nombre,fn){
    console.log(`${nombre} primer parametro, Esta funciona llama al callback como parametro`);
    fn();
}

function callback(){
   console.log( "Hola, soy un callback");
}
saludo("pepe",callback);

