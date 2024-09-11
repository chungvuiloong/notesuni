const mongoose = require('mongoose')
require('dotenv').config()

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.env.MONGODB_PASSWORD
const cluster = process.env.MONGODB_CLUSTER
const db = process.env.MONGODB_DB
const url =
  `mongodb+srv://fullstack:${password}@${cluster}.uibsh.mongodb.net/${db}?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

// noteSchema.set('toJSON', {
//     transform: (document, returnedObject) => {
//       returnedObject.id = returnedObject._id.toString()
//       delete returnedObject._id
//       delete returnedObject.__v
//     }
// })

const note = new Note({
  content: '0001',
  important: true,
})

// module.exports = Note;

// This creates a database in mongoDB
// note.save().then(result => {
//     console.log('note saved!')
//     // mongoose.connection.close()
//   })



Note.find({}).then(result => {
    result.forEach(note => {
    console.log(note)
    })
    mongoose.connection.close()
})


// Note.find({ important: false }).then(result => {
//     result.forEach(note => {
//         console.log(note)
//         })
//         mongoose.connection.close()
// })