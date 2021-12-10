/***************
 * Prepare Spy
 ***************/
var SantaSpy = require('./SantaSpy')
const santaSpy = new SantaSpy();

/***************
 * Problem 1
 ***************/
const stepList = require('./01/input').stepList;

santaSpy.findHQ(stepList);
santaSpy.findRealHQ();

/***************
 * Problem 2
 ***************/
const keyPadCode = require('./02/input').keyPadCode;

santaSpy.getKeycode(keyPadCode);

/***************
 * Problem 3
 ***************/
const triangles = require('./03/input').triangles;


// santaSpy.findPossibleTriangles(triangles);
santaSpy.findPossibleTrianglesInColumns(triangles);

/***************
 * Problem 4
 ***************/
const roomList = require('./04/input').roomList;

santaSpy.getSumOfRealRoomIDs(roomList);
santaSpy.findRoomFromDescription(roomList, 'northpole object storage');

/***************
 * Problem 5
 ***************/

santaSpy.decryptPassword('cxdnnyjw')

/***************
 * Problem 6
 ***************/

 

