var keyPadCode = require('./input').keyPadCode;
var KeyFinder = require('./KeyFinder')


keyFinder = new KeyFinder()

code = keyFinder.getCode(keyPadCode);

console.log(code);



