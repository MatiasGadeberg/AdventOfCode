const CoordinateFinder = require("./01/CoordinateFinder");
const KeyFinder = require("./02/KeyFinder");
const TriangleCounter = require('./03/TriangleCounter');
const RoomFinder = require("./04/RoomFinder");
const PasswordCracker = require("./05/PasswordCracker");
const CommunicationFixer = require("./06/CommunicationFixer");


class SantaSpy {
    constructor() {
        this.coordinateFinder = new CoordinateFinder();
        this.keyFinder = new KeyFinder();
        this.triangleCounter = new TriangleCounter();
        this.roomFinder = new RoomFinder();
        this.passwordCracker = new PasswordCracker();
        this.communicationFixer = new CommunicationFixer();
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

    getSumOfRealRoomIDs(listOfRooms){
        console.log(`Summing ID's of all real rooms gives ${this.roomFinder.sumRealRooms(listOfRooms)}`);
    }

    findRoomFromDescription(listOfRooms, roomDescription) {
        console.log(`The ID for the room containing ${roomDescription} is ${this.roomFinder.findRoomFromDescription(listOfRooms, roomDescription)}`)
    }

    decryptPassword(doorID){
        console.log(`Initiating password cracking sequence`);
        this.passwordCracker.findPasswordAdvanced(doorID);
    }
}

module.exports = SantaSpy;