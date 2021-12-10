let steerDown = (posArray, n) => {
  posArray[2] = posArray[2] + n;
  return posArray;
};
let steerUp = (posArray, n) => {
  posArray[2] = posArray[2] - n;
  return posArray;
};

let steerForward = (posArray, n) => {
  posArray[0] = posArray[0] + n;
  posArray[1] = posArray[1] + posArray[2] * n;
  return posArray;
};

let followRoute = (routeArray) => {
  position = [0, 0, 0];
  routeArray.forEach((route) => {
    switch (route[0]) {
      case "forward":
        position = steerForward(position, route[1]);
        break;
      case "down":
        position = steerDown(position, route[1]);
        break;
      case "up":
        position = steerUp(position, route[1]);
        break;
    }
  });
  return position;
};

module.exports = { steerDown, steerUp, steerForward, followRoute };

const { directions } = require("./input.js");
let [pos, depth] = followRoute(directions);
console.log(
  `End Horizontal position: ${pos}, and depth: ${depth}. Multiplied gives: ${
    pos * depth
  }`
);
