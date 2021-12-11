const { playBingo, playBingoLoser } = require("./bingoGame.js");
const { numbers, boards } = require("./input.js");
const { numbers1, boards1 } = require("./input1.js");

console.log(playBingo(boards, numbers));
console.log(playBingoLoser(boards1, numbers1));
