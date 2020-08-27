stepList = ["R4", "R5", "L5", "L5", "L3", "R2", "R1", "R1", "L5", "R5", "R2", "L1", "L3", "L4", "R3", "L1", "L1", "R2", "R3", "R3", "R1", "L3", "L5", "R3", "R1", "L1", "R1", "R2", "L1", "L4", "L5", "R4", "R2", "L192", "R5", "L2", "R53", "R1", "L5", "R73", "R5", "L5", "R186", "L3", "L2", "R1", "R3", "L3", "L3", "R1", "L4", "L2", "R3", "L5", "R4", "R3", "R1", "L1", "R5", "R2", "R1", "R1", "R1", "R3", "R2", "L1", "R5", "R1", "L5", "R2", "L2", "L4", "R3", "L1", "R4", "L5", "R4", "R3", "L5", "L3", "R4", "R2", "L5", "L5", "R2", "R3", "R5", "R4", "R2", "R1", "L1", "L5", "L2", "L3", "L4", "L5", "L4", "L5", "L1", "R3", "R4", "R5", "R3", "L5", "L4", "L3", "L1", "L4", "R2", "R5", "R5", "R4", "L2", "L4", "R3", "R1", "L2", "R5", "L5", "R1", "R1", "L1", "L5", "L5", "L2", "L1", "R5", "R2", "L4", "L1", "R4", "R3", "L3", "R1", "R5", "L1", "L4", "R2", "L3", "R5", "R3", "R1", "L3"];
testList1 = ["R2", "L3"];

var x, y, facingDirection;

const findHQ = walkingPattern => {
    x = [0];
    y = [0];
    facingDirection = 1;
    walk(walkingPattern);
    distanceToHQ = distanceToStart(lastElement(x), lastElement(y));
    console.log(`The bunny HQ is ${distanceToHQ} steps from your starting point`)
};

const walk = stepList => {
    stepList.forEach(takeStep)
};

const distanceToStart = (x,y) => {
    return Math.abs(x) + Math.abs(y);
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
    
    if (facingDirection === 1) {
        walkNorth(stepLength);
    } else if (facingDirection === 2) {
        walkEast(stepLength);
    } else if (facingDirection === 3) {
        walkSouth(stepLength);
    } else if (facingDirection === 4) {
        walkWest(stepLength);
    }
    
};

const walkNorth = stepLength => {
    y.push(lastElement(y) + stepLength);
};
const walkSouth = stepLength => {
    y.push(lastElement(y) - stepLength);
};
const walkEast = stepLength => {
    x.push(lastElement(x) + stepLength);
};
const walkWest = stepLength => {
    x.push(lastElement(x) - stepLength);
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

