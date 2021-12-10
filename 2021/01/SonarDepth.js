sonarDepth = function (array) {
  let count = 0;
  for (let i = 1; i < array.length; i++) {
    if (array[i] > array[i - 1]) {
      count++;
    }
  }
  return count;
};

slidingWindowSum = function (array, n) {
  let slidingArray = [];
  for (let i = 0; i < array.length - n + 1; i++) {
    let subArray = array.slice(i, i + n);
    let slidingSum = subArray.reduce((a, b) => a + b, 0);
    slidingArray.push(slidingSum);
  }
  return slidingArray;
};

const { sonarSweep } = require("./input.js");
slidingSweep = slidingWindowSum(sonarSweep, 3);
console.log(sonarDepth(sonarSweep));
console.log(sonarDepth(slidingSweep));

module.exports = { sonarDepth, slidingWindowSum };
