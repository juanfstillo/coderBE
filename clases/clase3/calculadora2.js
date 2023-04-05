const suma = (a, b) => new Promise((resolve, reject) => (a === 0 || b === 0) ? reject("Operación innecesaria") : (a + b < 0) ? reject("La calculadora sólo debe devolver valores positivos") : resolve(a + b));

const resta = (a, b) => new Promise((resolve, reject) => (a === 0 || b === 0) ? reject("Operación inválida") : (a - b < 0) ? reject("La calculadora sólo puede devolver valores positivos") : resolve(a - b));

const multiplicacion = (a, b) => new Promise((resolve, reject) => (a < 0 || b < 0) ? reject("La calculadora sólo puede devolver valores positivos") : resolve(a * b));

const division = (a, b) => new Promise((resolve, reject) => (b === 0) ? reject("No se puede dividir por cero") : resolve(a / b));

async function calculos(a, b) {
  try {
    const resultadoSuma = await suma(a, b);
    console.log("Resultado suma: ", resultadoSuma);
    const resultadoResta = await resta(a, b);
    console.log("Resultado resta: ", resultadoResta);
    const resultadoMultiplicacion = await multiplicacion(a, b);
    console.log("Resultado multiplicacion: ", resultadoMultiplicacion);
    const resultadoDivision = await division(a, b);
    console.log("Resultado division: ", resultadoDivision);
  } catch (error) {
    console.error(error);
  }
}

calculos(10, 5);
