// A recursive function example
function factorial(n) {
  if (n === 0) return 1; // Base case
  console.log(`Calculating factorial(${n})`);
  return n * factorial(n - 1); // Recursive call
}

// A function with an if-else condition
function checkEvenOrOdd(num) {
  if (num % 2 === 0) {
    console.log(`${num} is even`);
  } else {
    console.log(`${num} is odd`);
  }
}

// A function with a loop
function printNumbersUpTo(limit) {
  console.log(`Printing numbers from 0 to ${limit}`);
  for (let i = 0; i <= limit; i++) {
    console.log(i);
  }
}

// Main function to tie everything together
function main() {
  console.log("Starting main function");

  // Test recursive function
  const factResult = factorial(5);
  console.log(`Factorial result: ${factResult}`);

  // Test if-else condition
  checkEvenOrOdd(4);
  checkEvenOrOdd(7);

  // Test loop
  printNumbersUpTo(5);
}

// Run the main function
main();

// function countdown(n) {
//   if (n <= 0) {
//     console.log("Countdown finished");
//     return;
//   }
//   console.log(`Counting down: ${n}`);
//   countdown(n - 1); // Recursive call
// }

// // A function with an if-else condition
// function isPositive(num) {
//   if (num > 0) {
//     console.log(`${num} is positive`);
//   } else {
//     console.log(`${num} is not positive`);
//   }
// }

// // A function with a loop
// function repeatMessage(times) {
//   for (let i = 0; i < times; i++) {
//     console.log("Repeating message");
//   }
// }

// // Main function to tie everything together
// function main() {
//   console.log("Starting main function");

//   // Test recursive function
//   countdown(3);

//   // Test if-else condition
//   isPositive(5);
//   isPositive(-3);

//   // Test loop
//   repeatMessage(2);
// }

// // Run the main function
// main();
