const fs = require('fs'); // volvemos a utilizar fs , sin el no podemos trabajar con  archivos

async function appendToFile() {
  try {
    const additionalContent = '\nEste texto se agregó posteriormente.';
    await fs.appendFile(fileName, additionalContent, { encoding: 'utf8' });
    console.log('El archivo ha sido actualizado');
  } catch (err) {
    console.error(`Error al actualizar el archivo: ${err}`);
  }
}