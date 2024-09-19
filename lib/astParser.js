const acorn = require("acorn");
const fs = require("fs");

// Function to parse JavaScript code using Acorn (supports ES6+)
function parseCode(filePath) {
  const code = fs.readFileSync(filePath, "utf8");
  const ast = acorn.parse(code, {
    ecmaVersion: "latest",
    sourceType: "module", // In case the project uses ES modules (import/export)
  });
  //   console.log(`AST for ${filePath}:`, JSON.stringify(ast, null, 2)); // print the AST

  return ast;
}

// Extract all functions from AST
function extractFunctionsFromAST(ast) {
  const functions = [];

  function traverse(node) {
    if (node.type === "FunctionDeclaration") {
      functions.push(node.id.name);
    }

    // Handle arrow functions or function expressions
    if (
      node.type === "VariableDeclarator" &&
      node.init &&
      node.init.type === "ArrowFunctionExpression"
    ) {
      functions.push(node.id.name);
    }

    // Handle class methods
    if (node.type === "MethodDefinition") {
      functions.push(node.key.name);
    }

    // Recursively traverse the AST
    for (let key in node) {
      if (node[key] && typeof node[key] === "object") {
        traverse(node[key]);
      }
    }
  }

  traverse(ast);
  return functions;
}

// Extract all function calls from AST
function extractFunctionCallsFromAST(ast) {
  const functionCalls = [];

  function traverse(node) {
    if (node.type === "CallExpression" && node.callee.type === "Identifier") {
      functionCalls.push(node.callee.name);
    }
    for (let key in node) {
      if (node[key] && typeof node[key] === "object") {
        traverse(node[key]);
      }
    }
  }

  traverse(ast);
  return functionCalls;
}

// Build a function call graph
function buildCallGraph(ast) {
  const callGraph = {};

  function traverse(node, currentFunction = null) {
    if (node.type === "FunctionDeclaration") {
      currentFunction = node.id.name;
      callGraph[currentFunction] = [];
    }

    if (node.type === "CallExpression" && node.callee.type === "Identifier") {
      if (currentFunction) {
        callGraph[currentFunction].push(node.callee.name);
      }
    }

    // Handle class methods
    if (node.type === "MethodDefinition") {
      currentFunction = node.key.name;
      callGraph[currentFunction] = [];
    }

    for (let key in node) {
      if (node[key] && typeof node[key] === "object") {
        traverse(node[key], currentFunction);
      }
    }
  }

  traverse(ast);
  return callGraph;
}

// Function to recursively traverse the call graph and generate all possible sequences
function generateSequences(callGraph) {
  const sequences = [];

  function traverse(functionName, path) {
    path.push(functionName);

    // Check if the function exists in the callGraph and if it has calls
    if (!callGraph[functionName] || callGraph[functionName].length === 0) {
      sequences.push([...path]); // Push a copy of the path
    } else {
      // Recursively explore each called function
      callGraph[functionName].forEach((calledFunction) => {
        traverse(calledFunction, path);
      });
    }

    path.pop(); // Backtrack
  }

  // Start traversal from each function in the call graph
  Object.keys(callGraph).forEach((functionName) => {
    traverse(functionName, []);
  });

  return sequences;
}

module.exports = {
  parseCode,
  extractFunctionsFromAST,
  extractFunctionCallsFromAST,
  buildCallGraph,
  generateSequences,
};
