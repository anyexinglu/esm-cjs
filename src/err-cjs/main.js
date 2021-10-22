// # main.js

// 三种引入方式都不行，因为没有打包工具加以处理，浏览器不认识 cjs 引入方式
const lib = require("./lib"); // Uncaught ReferenceError: require is not defined
// import lib from "./lib"; // Uncaught SyntaxError: The requested module './lib' does not provide an export named 'default'
// import * as lib from "./lib"; // Uncaught ReferenceError: module is not defined

console.log("cjs/lib.a:", lib.a);
console.log("cjs/lib.a:", lib.b);
