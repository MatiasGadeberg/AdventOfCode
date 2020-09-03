const md5 = require("blueimp-md5");

const findPassword = doorID => {
    var password = ['','','','','','','',''];
    var count = 1;
    while( !isFilled(password) && count < 10^12) {
        var modifiedID = doorID + count;
        var hash = md5(modifiedID);
        if (isFirstFiveZero(hash)){
            index = hash.charAt(5);
            if (index >= 0 && index < 8 && !password[index]) {
                password[index] = hash.charAt(6);
                console.log(password)
            }
        }
        count ++
    }
    return password
};

const isFilled = password => {
    for (let i = 0; i < password.length; i++) {
        if (!password[i]) {
            return false
        }
    }
    return true
}

const isFirstFiveZero = string => {
    var chars = string.slice(0,5);
    if (chars === '00000') {
        return true
    }
    return false;
};

findPassword('cxdnnyjw')