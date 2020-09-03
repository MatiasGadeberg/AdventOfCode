describe('RoomFinder', function(){
    const RoomFinder = require('../../2016/04/RoomFinder');
    const testRooms = require('../../2016/04/input').testRooms;
    var roomFinder;

    beforeEach(function(){
        roomFinder = new RoomFinder;
    });

    describe('findRoomFromDescription', function(){
        it('should return -1 if no room is found with the given description', function(){
            expect(roomFinder.findRoomFromDescription(testRooms, 'not a rooom')).toBe(-1)
        })
        
        it('should, given a list of rooms and a room name, return the ID of the room maching the name', function(){
            expect(roomFinder.findRoomFromDescription(testRooms, 'very encrypted name')).toBe(343)
        })
    });

    describe('decipherRoomName', function(){
        it('should return a deciphered room name with spaces instead of dashes', function(){
            expect(roomFinder.decipherRoomName('qzmt-zixmtkozy-ivhz', 343)).toBe('very encrypted name')
        });
    })

    describe('decipherWord', function(){
        it('should return a word with each letter rotated x times forward in the alphabet', function(){
            expect(roomFinder.decipherWord('qzmt', 343)).toBe('very')
            expect(roomFinder.decipherWord('gdkkn', 1)).toBe('hello')
        });
    })

    describe('decipherLetter', function(){
        it('should return the letter rotated x times forward in the alphabet', function(){
            expect(roomFinder.decipherLetter('a', 1)).toBe('b');
            expect(roomFinder.decipherLetter('a', 26)).toBe('a');
            expect(roomFinder.decipherLetter('a', 2)).toBe('c');
            expect(roomFinder.decipherLetter('q', 343)).toBe('v');
        })
    })

    describe('sumRealRooms', function(){
        it('should return the sum of sector IDs of real rooms given a list of rooms', function(){
            expect(roomFinder.sumRealRooms(testRooms)).toBe(1857);
        })
    });

    describe('isRealRoom', function(){
        realRoom = testRooms[0];
        notRealRoom = testRooms[3];
        

        it('should return if a room is real or not', function(){
            expect(roomFinder.isRealRoom(realRoom)).toBeTrue();
            expect(roomFinder.isRealRoom(notRealRoom)).toBeFalse();
        });
    });

    describe('sortLettersInRoomName', function(){
        it('should return the 5 most represented letters in a room name sorted by occurence and then alphabetticaly', function(){
            expect(roomFinder.sortLettersInRoomName('not-a-real-room')).toEqual(['o','a','r','e','l'])
            expect(roomFinder.sortLettersInRoomName('a-b-c-d-e-f-g-h')).toEqual(['a','b','c','d','e'])
            expect(roomFinder.sortLettersInRoomName('qzmt-zixmtkozy-ivhz')).toEqual(['z','i','m','t','h'])
        })
    });

    describe('indexOfMax', function(){
        it('should return the index of the maximum value in an array', function(){
            expect(roomFinder.indexOfMax([2,5,4,4,7])).toBe(4);
            expect(roomFinder.indexOfMax([2,3,4,4])).toBe(2);
        })
    })
    describe('letterCounter', function(){
        
        it('should return a sorted list of unique letters of a input string', function(){
            [uniqueLetters, lettercount] = roomFinder.letterCounter('aaaaa-bbb-z-y-x');
            expect(uniqueLetters).toEqual(['a', 'b', 'x', 'y', 'z']);
        });

        it('should return the count of each unique letters of a input string', function(){
            [uniqueLetters, lettercount] = roomFinder.letterCounter('aaaaa-bbb-z-y-x');
            expect(lettercount).toEqual([5, 3, 1, 1, 1]);
        });
    });

    describe('stripDashes', function(){
        it('should remove all dashes from an input string', function(){
            expect(roomFinder.stripDashes('aaaaa-bbb-z-y-x')).toEqual('aaaaabbbzyx')
        });
    })

    describe('countLetterOccurenceInString',function(){

        it('should return the number of times a letter occurs in a string', function(){
            expect(roomFinder.countLetterOccurenceInString('a', 'Abekatteparty')).toBe(3);
        });
    });

    describe('findUniqueLettersInString',function(){

        it('should return a list of unique letters in a string', function(){
            expect(roomFinder.findUniqueLettersInString('Abekatteparty')).toEqual(['a', 'b', 'e', 'k', 't', 'p', 'r', 'y'])
        })
    })

});