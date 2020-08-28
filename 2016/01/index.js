stepList = ["R4", "R5", "L5", "L5", "L3", "R2", "R1", "R1", "L5", "R5", "R2", "L1", "L3", "L4", "R3", "L1", "L1", "R2", "R3", "R3", "R1", "L3", "L5", "R3", "R1", "L1", "R1", "R2", "L1", "L4", "L5", "R4", "R2", "L192", "R5", "L2", "R53", "R1", "L5", "R73", "R5", "L5", "R186", "L3", "L2", "R1", "R3", "L3", "L3", "R1", "L4", "L2", "R3", "L5", "R4", "R3", "R1", "L1", "R5", "R2", "R1", "R1", "R1", "R3", "R2", "L1", "R5", "R1", "L5", "R2", "L2", "L4", "R3", "L1", "R4", "L5", "R4", "R3", "L5", "L3", "R4", "R2", "L5", "L5", "R2", "R3", "R5", "R4", "R2", "R1", "L1", "L5", "L2", "L3", "L4", "L5", "L4", "L5", "L1", "R3", "R4", "R5", "R3", "L5", "L4", "L3", "L1", "L4", "R2", "R5", "R5", "R4", "L2", "L4", "R3", "R1", "L2", "R5", "L5", "R1", "R1", "L1", "L5", "L5", "L2", "L1", "R5", "R2", "L4", "L1", "R4", "R3", "L3", "R1", "R5", "L1", "L4", "R2", "L3", "R5", "R3", "R1", "L3"];
testList1 = ["R8", "R4", "R4", "R8"];

var coordinates, facingDirection;

const findRealHQ = () => {
    var visitedCoordinates = [];
    var HQcoordinates;
    for (let i = 0; i < coordinates.length-1; i++) {
        var newVisitedCoordinates = findVisitedCoordinates(coordinates[i], coordinates[i+1]);
        
        newVisitedCoordinates.forEach(el => {
            if (coordinateIsInListOfCoordinates(el, visitedCoordinates)) {
                HQcoordinates = el;
            }
        });

        if (HQcoordinates) {
            break;
        }

        visitedCoordinates.push(...newVisitedCoordinates);
    }
    const realDistance = distanceToStart(HQcoordinates)
    console.log(`The real bunny HQ is ${realDistance} steps from your starting point`)
};

const coordinateIsInListOfCoordinates = (coordinate, listOfCoordinates) => {
    var coordianteInArray = false;

    for (let i = 0; i < listOfCoordinates.length; i++) {
        if (coordinate[0] === listOfCoordinates[i][0] && coordinate[1] === listOfCoordinates[i][1]) {
            coordianteInArray = true;
            break;
        }
    }
    return coordianteInArray
};

const findVisitedCoordinates = (coordinatesBeforeStep, coordinatesAfterStep) => {
    const changedCoordinate = coordinatesBeforeStep[0] !== coordinatesAfterStep[0] ? 0 : 1;
    const changeDirection = coordinatesAfterStep[changedCoordinate] - coordinatesBeforeStep[changedCoordinate] > 0 ? 'increase' : 'decrease';
    const stepLength = Math.abs(coordinatesAfterStep[changedCoordinate] - coordinatesBeforeStep[changedCoordinate]);
    
    var visitedCoordinates = [coordinatesBeforeStep];

    for (let i = 0; i < stepLength; i++) {
        
        var coordinate = getXYfromCoordinates(lastElement(visitedCoordinates));
        
        if (changeDirection === 'increase') {
            coordinate[changedCoordinate]++;
        } else {
            coordinate[changedCoordinate]--;
        }
        
        visitedCoordinates.push(coordinate);
    }

    return visitedCoordinates.slice(1)
    
};

const findHQ = walkingPattern => {
    coordinates = [[0,0]];
    facingDirection = 1;
    walk(walkingPattern);
    distanceToHQ = distanceToStart(lastElement(coordinates));
    console.log(`The false bunny HQ is ${distanceToHQ} steps from your starting point`)
};

const walk = stepList => {
    stepList.forEach(takeStep)
};

const distanceToStart = (coord) => {
    return Math.abs(coord[0]) + Math.abs(coord[1]);
};

const takeStep = stepString => {
    [turnDirection, stepLength] = splitInput(stepString);
    turn(turnDirection);
    takeStepInDirection(stepLength);
};

const splitInput = step => {
    turnDirection = step.slice(0,1);
    stepLength = step.slice(1);
    return [turnDirection, parseInt(stepLength)]
};

const takeStepInDirection = stepLength => {
    
    [x, y] = getXYfromCoordinates(lastElement(coordinates));

    if (facingDirection === 1) {
        y += stepLength;
    } else if (facingDirection === 2) {
        x += stepLength;
    } else if (facingDirection === 3) {
        y -= stepLength;
    } else if (facingDirection === 4) {
        x -= stepLength;
    }
    
    coordinates.push([x,y]);

};

const getXYfromCoordinates = (coordinate) => {
    var x = coordinate[0];
    var y = coordinate[1];
    return [x,y]
};

const lastElement = arr => {
    return arr[arr.length-1];
}

const turn = turnDirection => {
    turnDirection === "R" ? turnRight() : turnLeft();
};

const turnLeft = () => {
    facingDirection === 1 ? facingDirection = 4 : facingDirection -= 1;
};

const turnRight = () => {
    facingDirection === 4 ? facingDirection = 1 : facingDirection += 1;
};

findHQ(stepList);
findRealHQ();

