var testCode = require('./input').testCode;
var keyPadCode = require('./input').keyPadCode;


//function getCode: Given a list of list of directions, return a list containing the code combination
    //initialize empty combination list
    //initialize lastKey = 5

    //Loop over all directionlists
        //For each directionlist call getCodeKey with direction sequence and last current key 
        //Push final key to combination list
        //Update last key to be the final key
    
    //return combination list

// function getCodeKey: Given direction sequence and current key, return final key
    //Loop over all directions in direction sequence,
        //function getNewKeyFromDirection: Given current key and direction, return new key
            //function getNewKeyMovingUp/Down/Left/Right: Given current key move up/down/left/right, return new key
    //return final current key which is the desired key

