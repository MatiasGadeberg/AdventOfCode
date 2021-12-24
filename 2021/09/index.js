const fs = require("fs");

let heightMap = fs
  .readFileSync("input.txt", { encoding: "utf-8" })
  .split("\n")
  .map(line => line.split(""))
  .map(line=>line.map(x => parseInt(x)))
  .map(line => [10, ...line, 10])

const fillRow = new Array(heightMap[0].length).fill(10)

//Part 1
heightMap = [fillRow, ...heightMap, fillRow]
function riskLevel(heightMap) {
    let riskLevel = 0
    for (let i = 1; i < heightMap.length-1; i++) {
        for (let j = 1; j < heightMap[0].length-1; j++) {
            let here = heightMap[i][j]
            let up = heightMap[i-1][j]
            let down = heightMap[i+1][j]
            let left = heightMap[i][j-1]
            let right = heightMap[i][j+1]
            if (here < up && here < down && here < left && here < right) {
                riskLevel += here+1
            }
        }
    }
    return riskLevel
}

console.log(riskLevel(heightMap))

//Part 2

const countBasin = (a, b, heightMap) => {
    let toVisit = []
    let visited = []

    toVisit.push([a,b].join(','))
    while (toVisit.length > 0) {
        let [xstring, ystring] = toVisit.shift().split(',')
        let x = parseInt(xstring)
        let y = parseInt(ystring)
        //check left
        let left = heightMap[x][y-1]
        if (left < 9 && !(visited.includes([x, y-1].join(',')))) {
            if (!(toVisit.includes([[x,y-1]].join(',')))){
                toVisit.push([x,y-1].join(','))
            }
        }
        //check right
        let right = heightMap[x][y+1]
        if (right < 9 && !(visited.includes([x, y+1].join(',')))) {
            if (!(toVisit.includes([[x,y+1]].join(',')))){
                toVisit.push([x,y+1].join(','))
            }
        }
        //check up
        let up = heightMap[x-1][y]
        if (up < 9 && !(visited.includes([x-1, y].join(',')))) {
            if (!(toVisit.includes([[x-1,y]].join(',')))){
                toVisit.push([x-1,y].join(','))
            }
        }
        //check down
        let down = heightMap[x+1][y]
        if (down < 9 && !(visited.includes([x+1, y].join(',')))) {
            if (!(toVisit.includes([[x+1,y]].join(',')))){
                toVisit.push([x+1,y].join(','))
            }
        }
        visited.push([x,y].join(','))
    }
    return visited.length
}

function largeBasins(heightMap) {
    let basinArray = []
    for (let i = 1; i < heightMap.length-1; i++) {
        for (let j = 1; j < heightMap[0].length-1; j++) {
            let here = heightMap[i][j]
            let up = heightMap[i-1][j]
            let down = heightMap[i+1][j]
            let left = heightMap[i][j-1]
            let right = heightMap[i][j+1]
            if (here < up && here < down && here < left && here < right) {
                let basin = countBasin(i,j,heightMap)
                basinArray.push(basin)
            }
        }
    }
    basinArray.sort((a,b) => a-b).reverse()
    const topThree = basinArray.slice(0,3)
    return topThree.reduce((a,b) => a * b, 1)
}

console.log(largeBasins(heightMap))