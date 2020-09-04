const CoordinateFinder = require("./01/CoordinateFinder");
const KeyFinder = require("./02/KeyFinder");
const TriangleCounter = require('./03/TriangleCounter');
const RoomFinder = require("./04/RoomFinder");


class SantaSpy {
    constructor() {
        this.coordinateFinder = new CoordinateFinder();
        this.keyFinder = new KeyFinder();
        this.roomFinder = new RoomFinder();
        this.triangleCounter = new TriangleCounter();
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
        console.log(`There are ${this.triangleCounter.countPossibleTriangles(triangleList)} possible triangles`);
    }

    findPossibleTrianglesInColumns(triangleList) {
        const newList = this.triangleCounter.convertInputTriangleList(triangleList)
        console.log(`There are ${this.triangleCounter.countPossibleTriangles(newList)} possible triangles counting in columns`);
    }

}

module.exports = SantaSpy;