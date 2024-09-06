const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@fullstack.uibsh.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');

    // Define your schema and model
    const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
    })

    const Note = mongoose.model('Note', noteSchema);

    const note = new Note({
        content: 'HTML is easy',
        important: true,
      })

    return Note.find({});
  })
  .then(result => {
    result.forEach(note => console.log(note));
  })
  .catch(err => {
    console.error('Error connecting to MongoDB or retrieving notes:', err);
  })
  .finally(() => {
    mongoose.connection.close();  // Ensure connection is closed properly after all operations
  });

// mongoose.connect(url)

// const noteSchema = new mongoose.Schema({
//   content: String,
//   important: Boolean,
// })

// const Note = mongoose.model('Note', noteSchema)

// const note = new Note({
//   content: 'HTML is easy',
//   important: true,
// })

// This creates a database in mongoDB
// note.save().then(result => {
//     console.log('note saved!')
//     mongoose.connection.close()
//   })

//   Note.find({}).then(result => {
//     console.log(result)
//     mongoose.connection.close()
//   }).then(() => {
//     return note.save();
//   })