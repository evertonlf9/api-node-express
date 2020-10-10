const {generateMessage} = require('./message');
const {isRealString} = require('./isRealString');

let self; 

class Messages {
    constructor(_instanceClient, _instanceIO, _users) {

        this.instanceClient =  _instanceClient;
        this.instanceIO =  _instanceIO;
        this.users = _users;
        self = this;

        this.instanceClient.on('join', this.join);
        this.instanceClient.on('createMessage', this.createMessage);
        this.instanceClient.on('private',this.private);
    }

    join(params, callback) {
        if(!isRealString(params.name) || !isRealString(params.room)){
            return callback('Name and room are required');
        }
    
        this.join(params.room);
        // self.instanceClient.join(params.room);
        self.users.removeUser(self.instanceClient.id);
        self.users.addUser(self.instanceClient.id, params.name, params.room);
        
        // self.instanceIO.to(params.room).emit('updateUsersList', self.users.getUserList(params.room));
        self.emitTo(params.room, 'updateUsersList', self.users.getUserList(params.room))
        self.emit('newMessage', generateMessage('Admin', `Welocome to ${params.room}!`));    
        self.broadcastRoom(params.room, 'newMessage', generateMessage('Admin', `${params.name} Joined the room!`));
    
        callback();
    }

    createMessage(message, callback) {
        let user = self.users.getUser(self.instanceClient.id);
    
        if(user && isRealString(message.text)){
            console.log(user.room, user.name, message.text);
            self.instanceIO.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }
        callback('This is the server:');
    }

    emitTo(to, type, msg) {
        self.instanceIO.to(to).emit(type, msg);
    }

    emit(type, msg) {
        self.instanceClient.emit(type, msg);
    }

    broadcastRoom(room, type, msg) {
        self.instanceClient.broadcast.to(room).emit(type, msg);
    }

    
    private(data) {
        const to = data.to,
                message = data.message;
    
        if(connectedUsers.hasOwnProperty(to)){
            connectedUsers[to].emit('private_chat',{
                //The sender's username
                username : socket.username,
    
                //Message sent to receiver
                message : message
            });
        }    
    }

}
module.exports = Messages;