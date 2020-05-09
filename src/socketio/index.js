const socket_IO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/isRealString');
const {Users} = require('./utils/users');

let users = new Users();
let instanceSocket = null;
let instanceIO = null;

class SocketIO {

    constructor(server) {
        instanceIO = socket_IO(server);        
        this.connection();
    }

    connection() {
        // instanceIO.set('authorization', this.authorization);

        instanceIO.on('connection', (socket) => {
            instanceSocket = socket;
            console.log("A new user just connected");
            instanceSocket.on('join', this.join);
            instanceSocket.on('createMessage', this.createMessage);
            instanceSocket.on('createLocationMessage', this.createLocationMessage);
            instanceSocket.on('disconnect', this.disconnect);
        })
    }

    authorization(data, accept) {
        console.log(data, accept);

        cookie(data, {}, (err) => {
          if (!err) {
            var sessionID = data.signedCookies[KEY];
            store.get(sessionID, (err, session) => {
              if (err || !session) {
                accept(null, false);
              } else {
                data.session = session;
                accept(null, true);
              }
            });
          } else {
            accept(null, false);
          }
        });
    }

    join(params, callback) {
        if(!isRealString(params.name) || !isRealString(params.room)){
            return callback('Name and room are required');
        }
    
        this.join(params.room);
        users.removeUser(instanceSocket.id);
        users.addUser(instanceSocket.id, params.name, params.room);
        
        instanceIO.to(params.room).emit('updateUsersList', users.getUserList(params.room));
        instanceSocket.emit('newMessage', generateMessage('Admin', `Welocome to ${params.room}!`));
    
        instanceSocket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', "New User Joined!"));
    
        callback();
    }

    createMessage(message, callback) {
        let user = users.getUser(instanceSocket.id);
    
        if(user && isRealString(message.text)){
            instanceIO.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }
        callback('This is the server:');
    }

    createLocationMessage(coords) {
        let user = users.getUser(instanceSocket.id);
    
        if(user){
            instanceIO.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.lat, coords.lng))
        }
    }

    disconnect () {
        let user = users.removeUser(instanceSocket.id);
    
        if(user){
            instanceIO.to(user.room).emit('updateUsersList', users.getUserList(user.room));
            instanceIO.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left ${user.room} chat room.`))
        }
    }

}
module.exports = SocketIO;