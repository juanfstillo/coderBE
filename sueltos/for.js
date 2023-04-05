console.log('The for...in statement iterates over all enumerable string properties of an object')

for (const property in object) {
  console.log(`${property}: ${object[property]}`);
}

// Expected output:
// "a: 1"
// "b: 2"
// "c: 3"

console.log('The for await...of statement creates a loop iterating over async iterable objects as well as sync iterables')

async function* foo() {
    yield 1;
    yield 2;
  }
  
  (async function() {
    for await (const num of foo()) {
      console.log(num);
      // Expected output: 1
  
      break; // Closes iterator, triggers return
    }
  })();

console.log('The for...of statement executes a loop that operates on a sequence of values sourced from an iterable object')
  