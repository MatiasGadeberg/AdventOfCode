class KeyFinder {
    constructor() {
        this.rows = [[1], [2, 3, 4], [5, 6, 7, 8, 9], ['A', 'B', 'C'], ['D']];
        this.columns = [[5], [2, 6, 'A'], [1, 3, 7, 'B', 'D'], [4, 8, 'C'], [9]];
    }
 
    //function getCode: Given a list of list of directions, return a list containing the code combination
    getCode(listOfDirections){
        //initialize currentkey = 5
        var currentKey = 5;

        //Loop over all directionlists
        var code = listOfDirections.map(direction => {
            //For each directionlist call getCodeKey with direction sequence and last current key 
            const codeKey = this.getCodeKey(currentKey,direction);
            
            //Update last key to be the final key
            currentKey = codeKey;
            return codeKey;
        })

        //return combination list
        return code
    }

    // function getCodeKey: Given direction sequence and current key, return final key
    getCodeKey(startingKey, directionList){
        var currentKey = startingKey;
        //Loop over all directions in direction sequence,
        for (let i = 0; i < directionList.length; i++) {
            currentKey = this.getNewKeyFromDirection(directionList[i], currentKey);
        }
        
        //return final current key which is the desired key
        return currentKey
    }

    //function getNewKeyFromDirection: Given current key and direction, return new key
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

    //Moving up down
        //locate column key is in
        //if index === 1 moving up return number
        //if index === col.length moving down return number
        //return col[i+1] if moving down, col[i-1] moving up
    //Moving left right
        //Locate row key is in
        //if index === 1 moving left return number
        //if index === row.length moving right return number
        //return row[i-1] moving left, row[i+1] moving right
    
        getColumnAndIndex(currentKey) {
        var colIndex;
        this.columns.forEach((el, idx) => {
            if (el.includes(currentKey)){
                colIndex = idx;
            }
        });

        if (!colIndex) {
            return null;
        }
        
        const index = this.columns[colIndex].findIndex(el => el === currentKey);

        return [colIndex, index]
    }

    //function getNewKeyMovingUp/Down/Left/Right: Given current key move up/down/left/right, return new key
    getNewKeyMovingUp(currentKey) {
        var col, index;

        if (!currentKey) {
            return null;
        }
        
        [col, index] = this.getColumnAndIndex(currentKey);

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