const fs = require("fs");

let fish = fs
  .readFileSync("input.txt", { encoding: "utf-8" }).split(",").map(x=> parseInt(x))

const generations = 256
let i = 1
let fishObj = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0
}

for (let i = 0; i < fish.length; i++) {
    fishObj[fish[i]]++
    
}

while (i < generations+ 1) {
    let newFish = fishObj[0]
    for (let j = 1; j < 9; j++) {
        fishObj[j-1] = fishObj[j]   
    }
    fishObj[8] = newFish
    fishObj[6] += newFish
    i ++
}

let sum = 0;

for (const [key, value] of Object.entries(fishObj)) {
    sum += value
}
console.log(sum)
