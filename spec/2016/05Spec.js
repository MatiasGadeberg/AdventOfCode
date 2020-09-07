describe('PasswordCracker', function(){
    const PasswordCracker = require("../../2016/05/PasswordCracker");

    beforeEach(function(){
        passwordCracker = new PasswordCracker;
    });
    
    describe('isFilled', function(){
        it('should return true if all 8 spots of a password is filled', function(){
            expect(passwordCracker.isFilled([1,2,3,4,5,6,7,8])).toBeTrue();
            expect(passwordCracker.isFilled([1,2,3,4,5,6,,8])).toBeFalse();
            expect(passwordCracker.isFilled([,,,,,,,])).toBeFalse();
        })
    })

    describe('isFirstFiveZero', function(){
        it('should be true if the first five characters of a string are 0', function(){
            expect(passwordCracker.isFirstFiveZero('00001')).toBe(false);
            expect(passwordCracker.isFirstFiveZero('000001')).toBe(true);
        });
    });
});