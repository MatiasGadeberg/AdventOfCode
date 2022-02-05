const fs = require("fs");

let octopus = fs
  .readFileSync("example.txt", { encoding: "utf-8" })
  .split('\n')
  .map(line => line.split(''))
  .map(line=>line.map(x => parseInt(x)))
  .map(line => [10, ...line, 10])

const fillRow = new Array(octopus[0].length).fill(10)
octopus = [fillRow, ...octopus, fillRow]

//Step 1
const toCoordinate = (x, y) => {
    return [x, y].join(',')
}

const toXY = (coordinate) => {
    let [xstring, ystring] = coordinate.split(',')
    return [parseInt(xstring), parseInt(ystring)]
}

const flashOctopus = (octoArray) => {
    let flashed = []
    let toFlash = []
    for (let i = 1; i < octopus.length-1; i++) {
        for (let j = 1; j < octopus[0].length - 1; j++) {
            if (octopus[i][j] > 9)
                toFlash.push(toCoordinate(i,j))
        }
    }
    while (toFlash.length > 0) {
        let coordinate = toFlash.shift()
        let [x, y] = toXY(coordinate)
        //up left
        octoArray[x-1][y-1] ++
        if (octoArray[x-1][y-1] > 9 && !toFlash.includes(toCoordinate(x-1, y-1)) && !flashed.includes(toCoordinate(x-1, y-1))) {
            toFlash.push(toCoordinate(x-1,y-1))
        } 
        //up 
        octoArray[x-1][y-1] ++
        if (octoArray[x-1][y-1] > 9 && !toFlash.includes(toCoordinate(x-1, y-1)) && !flashed.includes(toCoordinate(x-1, y-1))) {
            toFlash.push(toCoordinate(x-1,y-1))
        } 
        //up right
        //right
        //left
        //down right
        //down 
        //down left
        octopus[x,y]

        flashed.push(coordinate)

    }
    return [flashed.length, octoArray]
}

const countFlash = (octopus, steps) => {
    let flashes = 0
    let step = 0
    while (step < steps) {
        let flash
        for (let i = 1; i < octopus.length-1; i++) {
            for (let j = 1; j < octopus[0].length-1; j++) {
                octopus[i][j] ++
            }
        }
        [flash, octopus] = flashOctopus(octopus)
        flashes += flash
        step ++
    }
    return flashes
}






console.table(countFlash(octopus, 1))