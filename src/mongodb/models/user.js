const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userDataSchema   = new Schema({
    username:  { type: String, default: '' },
    email: { type: String, default: '' }
},  {collection: 'user'});

module.exports = mongoose.model('users', userDataSchema);

// const Comment = new Schema({
//     name: { type: String, default: 'hahaha' },
//     age: { type: Number, min: 18, index: true },
//     bio: { type: String, match: /[a-z]/ },
//     date: { type: Date, default: Date.now },
//     buff: Buffer
//   });