class KeyFinder {
    constructor() {
    }

    getCodeKey(startingKey, directionList){
        var currentKey = startingKey;
        for (let i = 0; i < directionList.length; i++) {
            currentKey = this.getNewKeyFromDirection(directionList[i], currentKey);
        }
        return currentKey
    }

    getNewKeyFromDirection(direction, currentKey){
        const validDirections = ['U', 'D', 'L', 'R'];
        
        if(arguments.length !== 2 || !validDirections.includes(direction) || currentKey < 1 || currentKey > 9) {
            return null;
        }

        if (direction === 'U') {
            return this.getNewKeyMovingUp(currentKey);
        } else if (direction === 'D') {
            return this.getNewKeyMovingDown(currentKey);
        } else if (direction === 'R') {
            return this.getNewKeyMovingRight(currentKey);
        } else if (direction === 'L') {
            return this.getNewKeyMovingLeft(currentKey);
        }
        
    }

    getNewKeyMovingUp(currentKey) {
        if (!currentKey || currentKey < 1 || currentKey > 9) {
            return null;
        }

        if (currentKey > 3){
            return currentKey - 3;
        } else {
            return currentKey;
        }
    }

    getNewKeyMovingDown(currentKey) {
        if (!currentKey || currentKey < 1 || currentKey > 9) {
            return null;
        }

        if (currentKey < 7){
            return currentKey + 3;
        } else {
            return currentKey;
        }
    }

    getNewKeyMovingLeft(currentKey) {
        if (!currentKey || currentKey < 1 || currentKey > 9) {
            return null;
        }

        if ((currentKey-1)%3 !== 0) {
            return currentKey - 1;
        } else {
            return currentKey;
        }
    }

    getNewKeyMovingRight(currentKey) {
        if (!currentKey || currentKey < 1 || currentKey > 9) {
            return null;
        }

        if(currentKey%3 === 0) {
            return currentKey;
        } else {
            return currentKey + 1; 
        }
    }

}

module.exports = KeyFinder;