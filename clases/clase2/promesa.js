const promesa = new Promise((resolve, reject) => {
    const numeroAleatorio = Math.floor(Math.random() * 10);
    if (numeroAleatorio % 2 === 0) {
      resolve(numeroAleatorio);
    } else {
      reject(new Error('El número es impar'));
    }
  });
  
  promesa.then((numero) => {
    console.log(`El número ${numero} es par`);
  }).catch((error) => {
    console.error(error.message);
  });