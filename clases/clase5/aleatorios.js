const min = 1;
const max = 20;
const count = 10000;

const randomNumbers = []
const repetidos = {}

for (let i = 0; i < count; i++) {
    const randomNumber = Math.floor(Math.random()*(max-min +1))+min;
    randomNumbers.push(randomNumber)
}

randomNumbers.forEach(function(numero){
    repetidos[numero] = (repetidos[numero] || 0) + 1;
  });

  console.log(repetidos)