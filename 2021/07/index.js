const fs = require("fs");

let crabs = fs
  .readFileSync("input.txt", { encoding: "utf-8" }).split(",").map(x=> parseInt(x))


let sum = crabs.reduce((a, b) => a + b, 0);
let avg = sum/crabs.length

const start = Math.floor(avg)
let maxStep = crabs.reduce((a, b) => a > b ? a : b, 0)
let minStep = 0
let found = false
let optimum
let fuel, fuelup, fueldown

let posn = start
let i = 0

while(!found && i < crabs.length) {
    fuel = fuelCalc(posn)
    fuelup = fuelCalc(posn + 1)
    fueldown = fuelCalc(posn - 1)
    if (fuel < fuelup && fuel < fueldown) {
        found = true
        optimum = posn
    } else if (fuel > fuelup && fuel < fueldown) {
        //Increase posn
        posn += 1
    } else if (fuel < fuelup && fuel > fueldown) {
        //decrese posn
        posn -= 1
    }
    i++
}

function fuelCalc(pos) {
    let fuel = 0;
    for (let i = 0; i < crabs.length; i++) {
        const dist = Math.abs(pos - crabs[i])
        for (let j = 0; j < dist + 1; j++) {
            fuel += j 
        }
    }
    return fuel
}

console.log(`The optimum position is ${optimum} where the fuel usage is ${fuel}`)