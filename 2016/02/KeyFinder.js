class KeyFinder {
    constructor() {
        this.rows = [[1], [2, 3, 4], [5, 6, 7, 8, 9], ['A', 'B', 'C'], ['D']];
        this.columns = [[5], [2, 6, 'A'], [1, 3, 7, 'B', 'D'], [4, 8, 'C'], [9]];
        this.validKeys = [1,2,3,4,5,6,7,8,9,'A','B','C','D'];
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

    getColumnAndIndex(currentKey) {
        var colIndex;
        
        for (let i = 0; i < this.columns.length; i++) {
            
            if (this.columns[i].includes(currentKey)) {
                colIndex = i;
                break
            }
        }

        if (!colIndex && colIndex !== 0) {
            return null;
        }
        
        const index = this.columns[colIndex].findIndex(el => el === currentKey);

        return [colIndex, index]
    }
    
    getRowAndIndex(currentKey) {
        var rowIndex;
        
        for (let i = 0; i < this.rows.length; i++) {
            
            if (this.rows[i].includes(currentKey)) {
                rowIndex = i;
                break
            }
        }
        
        if (!rowIndex && rowIndex !== 0) {
            return null;
        }
        
        const index = this.rows[rowIndex].findIndex(el => el === currentKey);
        
        return [rowIndex, index]
    }
    
    getNewKeyMovingUp(currentKey) {
        var col, index;

        if (!currentKey || !this.validKeys.includes(currentKey)) {
            return null;
        }
        
        [col, index] = this.getColumnAndIndex(currentKey);

        if (index === 0) {
            return currentKey
        } else {
            return this.columns[col][index-1];
        }

    }

    getNewKeyMovingDown(currentKey) {
        var col, index;

        if (!currentKey || !this.validKeys.includes(currentKey)) {
            return null;
        }
        
        [col, index] = this.getColumnAndIndex(currentKey);

        if (index === this.columns[col].length - 1) {
            return currentKey;
        } else {
            return this.columns[col][index+1];
        }
    }
    
    getNewKeyMovingLeft(currentKey) {
        var row, index;
        
        if (!currentKey || !this.validKeys.includes(currentKey)) {
            return null;
        }

        [row, index] = this.getRowAndIndex(currentKey);

        if (index === 0) {
            return currentKey;
        } else {
            return this.rows[row][index - 1];
        }
    }

    getNewKeyMovingRight(currentKey) {
        var row, index;
        
        if (!currentKey || !this.validKeys.includes(currentKey)) {
            return null;
        }

        [row, index] = this.getRowAndIndex(currentKey);

        if (index === this.rows[row].length - 1) {
            return currentKey;
        } else {
            return this.rows[row][index + 1];
        }
    }

}

module.exports = KeyFinder;