class CoordinateFinder {
    constructor() {
        this.visitedCoordinates = [];
        this.coordinates = [[0,0]];
        this.facingDirection = 1;
    }

    resetWalker(){
        this.visitedCoordinates = [];
        this.coordinates = [[0,0]];
        this.facingDirection = 1;
    }
    
    findRealHQ(){
        var HQcoordinates;
        for (let i = 0; i < this.coordinates.length-1; i++) {
            var newVisitedCoordinates = this.findVisitedCoordinates(this.coordinates[i], this.coordinates[i+1]);
            
            newVisitedCoordinates.forEach(el => {
                if (this.coordinateIsInListOfCoordinates(el, this.visitedCoordinates)) {
                    HQcoordinates = el;
                }
            });
    
            if (HQcoordinates) {
                break;
            }
    
            this.visitedCoordinates.push(...newVisitedCoordinates);
        }
        const realDistance = this.distanceToStart(HQcoordinates)
        return realDistance
    };
    
    coordinateIsInListOfCoordinates(coordinate, listOfCoordinates){
        var coordianteInArray = false;
    
        for (let i = 0; i < listOfCoordinates.length; i++) {
            if (coordinate[0] === listOfCoordinates[i][0] && coordinate[1] === listOfCoordinates[i][1]) {
                coordianteInArray = true;
                break;
            }
        }
        return coordianteInArray
    };
    
    findVisitedCoordinates(coordinatesBeforeStep, coordinatesAfterStep){
        const changedCoordinate = coordinatesBeforeStep[0] !== coordinatesAfterStep[0] ? 0 : 1;
        const changeDirection = coordinatesAfterStep[changedCoordinate] - coordinatesBeforeStep[changedCoordinate] > 0 ? 'increase' : 'decrease';
        const stepLength = Math.abs(coordinatesAfterStep[changedCoordinate] - coordinatesBeforeStep[changedCoordinate]);
        
        var visitedCoordinates = [coordinatesBeforeStep];

        for (let i = 0; i < stepLength; i++) {
            
            var coordinate = this.getXYFromCoordinate(this.lastElement(visitedCoordinates));
            
            if (changeDirection === 'increase') {
                coordinate[changedCoordinate]++;
            } else {
                coordinate[changedCoordinate]--;
            }
    
            visitedCoordinates.push(coordinate);
        }
    
        return visitedCoordinates.slice(1)
        
    };

    getXYFromCoordinate(coordinate){
        return [coordinate[0], coordinate[1]]
    }
    
    findHQ(walkingPattern){
        this.walk(walkingPattern);
        const distanceToHQ = this.distanceToStart(this.lastElement(this.coordinates));
        return distanceToHQ;
    };
    
    walk(stepList){
        stepList.forEach(this.takeStep, this)
    };
    
    distanceToStart(coord){
        return Math.abs(coord[0]) + Math.abs(coord[1]);
    };
    
    takeStep(stepString){
        var turnDirection, stepLength;
        [turnDirection, stepLength] = this.splitInput(stepString);
        this.turn(turnDirection);
        this.takeStepInDirection(stepLength);
    };
    
    splitInput(step){
        const turnDirection = step.slice(0,1);
        const stepLength = step.slice(1);
        return [turnDirection, parseInt(stepLength)]
    };
    
    takeStepInDirection(stepLength){
        var x, y;
        [x, y] = this.lastElement(this.coordinates);
    
        if (this.facingDirection === 1) {
            y += stepLength;
        } else if (this.facingDirection === 2) {
            x += stepLength;
        } else if (this.facingDirection === 3) {
            y -= stepLength;
        } else if (this.facingDirection === 4) {
            x -= stepLength;
        }
        
        this.coordinates.push([x,y]);
    
    };
    
    lastElement(arr){
        return arr[arr.length-1];
    }
    
    turn(turnDirection){
        turnDirection === "R" ? this.turnRight() : this.turnLeft();
    };
    
    turnLeft(){
        this.facingDirection === 1 ? this.facingDirection = 4 : this.facingDirection -= 1;
    };
    
    turnRight(){
        this.facingDirection === 4 ? this.facingDirection = 1 : this.facingDirection += 1;
    };
}

module.exports = CoordinateFinder;