const KeyFinder = require("./02/KeyFinder");
const RoomFinder = require("./04/RoomFinder");
const CoordinateFinder = require("./01/CoordinateFinder");

class SantaSpy {
    constructor() {
        this.keyFinder = new KeyFinder();
        this.roomFinder = new RoomFinder();
        this.coordinateFinder = new CoordinateFinder();
    }

    findHQ(walkingPattern){
        console.log(`The bunny HQ is ${this.coordinateFinder.findHQ(walkingPattern)} steps from the starting point`)
    }
    
    findRealHQ(){
        console.log(`The REAL bunny HQ is ${this.coordinateFinder.findRealHQ()} steps from the starting point`)
    }

    getKeycode(listOfDirections) {
        console.log(`The code to the door is ${this.keyFinder.getCode(listOfDirections)}`)
    }

    findPossibleTriangles(triangleList) {
        console.log(`There are ${this.countPossibleTriangles(triangleList)} possible triangles`);
    }

    findPossibleTrianglesInColumns(triangleList) {
        const newtriangleList = this.convertInputTriangleList(triangleList);
        console.log(`There are ${this.countPossibleTriangles(newtriangleList)} possible triangles counting in columns`);
    }

    convertInputTriangleList(triangleList) {
        var newTrianlgeList = [];
        for (let i = 0; i < triangleList.length-2; i+=3) {
            for (let j = 0; j < 3; j++) {
                newTrianlgeList.push([triangleList[i][j], triangleList[i+1][j], triangleList[i+2][j]]);  
            }   
        }
        return newTrianlgeList
    }
    
    countPossibleTriangles(triangleList) {
        var count = 0;
        triangleList.forEach(triangle => {
            if (this.isTrianglePossible(triangle)){
                count ++
            }
        }, this);
    
        return count
    }
    
    isTrianglePossible(triangle) {
        var a, b, c
        [a, b, c] = this.triSort(triangle);
    
        if (a + b > c) {
            return true
        }
    
        return false
    }
    
    triSort(triangle) {
        return triangle.sort((a,b) => a-b);
    }
}

module.exports = SantaSpy;