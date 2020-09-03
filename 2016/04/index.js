const RoomFinder = require('./RoomFinder')
const roomList = require('./input').roomList;

roomFinder = new RoomFinder;

console.log(roomFinder.sumRealRooms(roomList));
console.log(roomFinder.findRoomFromDescription(roomList, 'northpole object storage'));