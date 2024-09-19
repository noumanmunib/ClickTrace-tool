const fs = require("fs");
const path = require("path");
const {
  parseCode,
  buildCallGraph,
  generateSequences,
} = require("./lib/astParser");

// Define the directory containing JavaScript files (with subfolders)
const jsDirectory = "./test";

// Function to recursively parse all JavaScript files in a directory and its subdirectories
function parseAllFiles(directory) {
  const combinedAst = {
    type: "Program",
    body: [],
  };

  const files = fs.readdirSync(directory);

  files.forEach((file) => {
    const filePath = path.join(directory, file);

    // If it's a directory, recursively parse files inside
    if (fs.lstatSync(filePath).isDirectory()) {
      const subAst = parseAllFiles(filePath);
      combinedAst.body = combinedAst.body.concat(subAst.body);
    } else if (path.extname(file) === ".js") {
      console.log(`Parsing ${file}...`);
      const ast = parseCode(filePath);
      combinedAst.body = combinedAst.body.concat(ast.body); // Combine ASTs
    }
  });

  return combinedAst;
}

// Parse all JS files in the directory (and subdirectories)
const combinedAst = parseAllFiles(jsDirectory);

// Build the call graph from the combined AST
const callGraph = buildCallGraph(combinedAst);

// Generate all possible sequences
const sequences = generateSequences(callGraph);

// Output the results
console.log("Call Graph:", callGraph);
console.log("All Possible Function Call Sequences:");
sequences.forEach((sequence, index) => {
  console.log(`Sequence ${index + 1}: ${sequence.join(" -> ")}`);
});
