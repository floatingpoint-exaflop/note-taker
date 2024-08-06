const express = require('express');
const path = require('path');
const app = express();
const db = require("./db/db.json");
const uuid = require('./helpers/uuid') //this will give the ids expected by public's index.js
const fs = require('fs');

const PORT = process.env.PORT || 3001;


app.use(express.static("public"));
//parsing middleware; essential for form handling
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//html routes; index is already defaulted and doesn't *need* to be specified.
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/notes.html'))
})

//data routes
app.get('/api/notes', (req, res) => res.json(db));
 
app.post('/api/notes', (req, res) => {
  const {title, text} = req.body;
  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuid()
    };
  const noteString = JSON.stringify(newNote);
  const noteItem = {title: newNote.title, id: newNote.id};
  
  //read list of notes
  fs.readFile("./db/db.json", "utf-8", (err, data) => {
    let existingNotes = data ? JSON.parse(data) : []  
    existingNotes.push(noteItem)
    fs.writeFile("./db/db.json", JSON.stringify(existingNotes), err => {
      err ? console.log(err) : console.log("Note added successfully!")
    })
  })


        fs.appendFile("./db/db.json", )
  fs.writeFile(`./db/db.json`)
  }


  


});
app.delete('/api/notes/:id', (req, res) => res.json(db)) ;





// app.get('/api/notes', (req, res) => {
//     fs.readFile("./db/db.json", "utf-8", (err, data) => {
//       res.status(200).json( JSON.parse(data) )
//     })
//   });




// app.get('/api/notes/:id', (req, res) => {
// fs.readFile(`./db/${req.params.id}.json`, "utf-8", (err, data) => {
//     res.status(200).json( JSON.parse(data) )
// })
// });

app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);