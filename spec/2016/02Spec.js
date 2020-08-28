describe('KeyFinder', function(){
    const KeyFinder = require('../../2016/02/KeyFinder');
    var keyFinder

    beforeEach(function(){
        keyFinder = new KeyFinder;
    });

    describe('getNewKeyMovingUp', function(){

        it('shoud return null if no input is given', function(){
            expect(keyFinder.getNewKeyMovingUp('')).toBeFalsy();
        });
       

    });
});