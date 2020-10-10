const socket_IO = require('socket.io');
const cookie = require('cookie');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/isRealString');
const Messages = require('./utils/messages');
const {Users} = require('./utils/users');

let users = new Users();
let self;

//https://socket.io/docs/
class SocketIO {

    constructor(server, sessionId, store) {
        this.sessionId = sessionId;
        this.session_store = store;
        
        this.instanceIO = socket_IO(server); 
        self = this;

        this.connection();        
    }

    connection() {
        self.instanceIO.set('authorization', this.authorization.bind(this));

        self.instanceIO.on('connection', (client) => {
            self.instanceClient = client;

            console.log("A new user just connected");
            // instanceClient.on('join', this.join);
            // instanceClient.on('createMessage', this.createMessage);
            this.messages = new Messages(self.instanceClient, self.instanceIO, users); 

            self.instanceClient.on('createLocationMessage', this.createLocationMessage);
            self.instanceClient.on('disconnect', this.disconnect);
        })
    }

    authorization(data, accept) {

        const cookie_string = data.headers.cookie;
        const parsed_cookies = cookie.parse(cookie_string);
        const connect_sid = parsed_cookies[this.sessionId];
        
        if (connect_sid) {
            //TODO: melhorar a maneira de pegar o nome do arquivo do cookie
            let nameFile = connect_sid.replace('s:', '');
            nameFile = nameFile.split('.')[0];

            this.session_store.get(nameFile, (error, session) => {
                if (error || !session) {
                    accept(null, false);
                } else {
                    data.session = session;
                    accept(null, true);
                }
            });
        }
    }

    createLocationMessage(coords) {
        let user = users.getUser(self.instanceClient.id);
    
        if(user){
            self.instanceIO.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.lat, coords.lng))
        }
    }

    disconnect () {
        let user = users.removeUser(self.instanceClient.id);
    
        if(user){
            self.instanceIO.to(user.room).emit('updateUsersList', users.getUserList(user.room));
            self.instanceIO.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left ${user.room} chat room.`))
        }
    }

}
module.exports = SocketIO;