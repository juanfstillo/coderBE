// const escribirArchivo = require('./asincronismo.js')
// console.log('inicio del programa')
// escribirArchivo('Hola Mundo',()=>{
//     console.log('termine de escribir el archivo')
// })
// console.log('fin del programa')

const mysql = require('mysql2/promise');
const pool = mysql.createPool({
  host: 'localhost',
  user: 'usuario',
  password: 'contraseña',
  database: 'nombre_db'
});

async function buscarUsuarioPorId(id) {
  try {
    const [rows, fields] = await pool.execute('SELECT * FROM usuarios WHERE id = ?', [id]);
    if (rows.length > 0) {
      return rows[0];
    } else {
      throw new Error(`No se encontró ningún usuario con ID ${id}`);
    }
  } catch (error) {
    console.error(error);
  }
}

(async () => {
  try {
    const usuario = await buscarUsuarioPorId(1);
    console.log(usuario);
  } catch (error) {
    console.error(error);
  } finally {
    await pool.end();
  }
})();