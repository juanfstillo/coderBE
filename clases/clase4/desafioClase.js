const fs = require('fs'); // volvemos a utilizar fs , sin el no podemos trabajar con  archivos
let now = new Date().toLocaleString();


fs.writeFile('./ejemploCallback.txt', now, (error) => {


    /**
     * Notemos que la operación es similar, el detalle es que ahora estamos
     * metiendo un callback para preguntar si algo salió mal
     * durante la operación de escritura del archivo 
     * 
     */

    if (error) return console.log('Error al escribir el archivo') //Pregunto si el error del callback existe

    fs.readFile('./ejemploCallback.txt', 'utf-8', (error, resultado) => {
        /**
         * 
         * Los mismos argumentos del readFileSync, sólo que esta vez
         * al final colocamos un callback, donde el primer parametro
         * sirve para saber si hubo un error al leer el archivo
         * el segundo parametro es el resultado de la lectura 
         */

        if (error) return console.log('Error al leer el archivo') //Nota que cada callback es consciente de su error!
        console.log(resultado)//en caso de no haber error, el resultado será : "Hola desde Callback"

    })
})



