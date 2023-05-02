const socket = io();
// Escuchar el evento emitido por el servidor con los datos para el listado
socket.on('listData', (data) => {
    // Obtener la referencia a la tabla mediante querySelector
    const tabla = document.querySelector("#productos-tabla");
    // Obtener la referencia al cuerpo de la tabla
    const cuerpoTabla = tabla.tBodies[0];
    // Eliminar todas las filas del cuerpo de la tabla
    while (cuerpoTabla.rows.length > 0) {
        cuerpoTabla.deleteRow(0);
    }
    // Obtenemos el cuerpo de la tabla
    const productosTablaCuerpo = document.querySelector("#productos-tabla tbody");
    // Recorremos el objeto de objetos utilizando Object.entries()
    Object.entries(data).forEach(([clave, { id, title, price }]) => {
      
        // Creamos una fila para el producto
      const productoFila = document.createElement("tr");
      
      // Creamos las celdas para el nombre y el precio
      const productoIdCelda = document.createElement("td");
      productoIdCelda.textContent = id;
      const productoNombreCelda = document.createElement("td");
      productoNombreCelda.textContent = title;
      const productoPrecioCelda = document.createElement("td");
      productoPrecioCelda.textContent = price;

      // Agregamos las celdas a la fila del producto
      productoFila.appendChild(productoIdCelda);
      productoFila.appendChild(productoNombreCelda);
      productoFila.appendChild(productoPrecioCelda);

      // Agregamos la fila del producto al cuerpo de la tabla
      productosTablaCuerpo.appendChild(productoFila);
    });

});