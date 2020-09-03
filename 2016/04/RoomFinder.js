class RoomFinder {
    constructor() {

    }

    findRoomFromDescription(roomList, description) {
        var realRoomID;
        for (let i = 0; i < roomList.length; i++) {
            const room = roomList[i];
            if (this.isRealRoom(room)) {
                var roomName, roomID, roomCheckSum
                [roomName, roomID, roomCheckSum] = room;
                var decipheredName = this.decipherRoomName(roomName, roomID);
                if (decipheredName === description) {
                    return roomID;
                }
            }
        }
        return -1
    }
 
    decipherRoomName(roomName, roomID) {
        var decipheredWords = [];
        const wordsInName = roomName.split('-');
        wordsInName.forEach(word => {
            var realWord = this.decipherWord(word, roomID);
            decipheredWords.push(realWord);
        })
        return decipheredWords.join(' ')
    }
        
        // for each word in wordsInName
            // realWord = dechipherWord(word, roomID)
            // decipheredName.concat(' ', realWord)
        // return decipheredName

    decipherWord(word, rotation) {
        var decipheredLetters = [];
        const letters = [...word];
        letters.forEach(letter => {
            var realLetter = this.decipherLetter(letter, rotation)
            decipheredLetters.push(realLetter)
        })
            
        return decipheredLetters.join('')
    }
        

    decipherLetter(letter, rotation) {
        var asciiLetter = letter.charCodeAt(0)
        var numberLetter = asciiLetter - 97 // ascii a = 97 - 97 = 0
        var rotatedNumber = (numberLetter + rotation) % 26
        var rotatedAscii = rotatedNumber + 97
        return String.fromCharCode(rotatedAscii)
    }
        

    sumRealRooms(roomList){
        var sum = 0;
        roomList.forEach(room => {
            if (this.isRealRoom(room)) {
                sum += room[1];
            }
        })
        return sum;
    }
    
    isRealRoom(room) {
        var roomName, roomID, roomChecksum
        [roomName, roomID, roomChecksum] = room;
        var sortedLetters = this.sortLettersInRoomName(roomName)
        return this.isArrayEqual(sortedLetters, roomChecksum)
    }
    
    isArrayEqual(arr, string) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] !== [...string][i]) {
                return false
            }
        }
        return true
    }
    
    sortLettersInRoomName(roomName) {
        var letters, count;

        [letters, count] = this.letterCounter(roomName);
        var sortedLetters = [];

        while (sortedLetters.length < 5 && letters.length > 0) {
            const maxIndex = this.indexOfMax(count)
            sortedLetters.push(letters[maxIndex])
            letters.splice(maxIndex,1)
            count.splice(maxIndex, 1)
        }

        return sortedLetters
    }

    indexOfMax(arr) {
        if (arr.length === 0) {
            return -1;
        }
    
        var max = arr[0];
        var maxIndex = 0;
    
        for (var i = 1; i < arr.length; i++) {
            if (arr[i] > max) {
                maxIndex = i;
                max = arr[i];
            }
        }
    
        return maxIndex;
    }

    letterCounter(roomName) {
        var cleanedName = this.stripDashes(roomName);
        const uniqueLetters = this.findUniqueLettersInString(cleanedName);
        uniqueLetters.sort();
        var letterCount = [];
        uniqueLetters.forEach(letter => {
            var count;
            count = this.countLetterOccurenceInString(letter, cleanedName);
            letterCount.push(count);
        });
        return [uniqueLetters, letterCount]
    }

    stripDashes(string) {
        return string.replace(/-/g, '');
    }

    findUniqueLettersInString(string) {
        var uniqueLetters = [];
        string = string.toLowerCase();
        [...string].forEach(letter => {
            if (!uniqueLetters.includes(letter)){
                uniqueLetters.push(letter);
            }
        });
        return uniqueLetters
    }

    countLetterOccurenceInString(letter, string) {
        var count = 0;
        string = string.toLowerCase();
        for (let position = 0; position < string.length; position++) {
            if (string.charAt(position) === letter) {
                count += 1
            }
        }
        return count
    }
}

module.exports = RoomFinder;