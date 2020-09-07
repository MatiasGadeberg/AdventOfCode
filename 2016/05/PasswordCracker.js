const md5 = require("blueimp-md5");

class PasswordCracker {
    constructor() {
        this.password = ['','','','','','','',''];
    }

    resetPassword() {
        this.password = ['','','','','','','',''];
    };

    findPasswordAdvanced(doorID) {
        var count = 1;
        while( !this.isFilled(this.password) && count < 10^12) {
            var modifiedID = doorID + count;
            var hash = md5(modifiedID);
            if (this.isFirstFiveZero(hash)){
                var index = hash.charAt(5);
                if (index >= 0 && index < 8 && !this.password[index]) {
                    this.password[index] = hash.charAt(6);
                    console.log(this.password)
                }
            }
            count ++
        }
    };

    isFilled(password){
        for (let i = 0; i < password.length; i++) {
            if (!password[i]) {
                return false
            }
        }
        return true
    }

    isFirstFiveZero(string) {
        var chars = string.slice(0,5);
        if (chars === '00000') {
            return true
        }
        return false;
    };
}

module.exports = PasswordCracker;