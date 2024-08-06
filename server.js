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
app.get('/api/notes', (req, res) => {
  fs.readFile("./db/db.json", "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read notes data.' });
    }
    res.status(200).json(JSON.parse(data))
  })
});


app.post('/api/notes', (req, res) => {
  const { title, text } = req.body;
  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuid()
    };

    const noteItem = { title: newNote.title, text: newNote.text, id: newNote.id };

    // Read list of notes and replace it with new version that contains new note
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to read notes data.' });
      }
      
      let existingNotes = data ? JSON.parse(data) : [];
      existingNotes.push(noteItem);

      fs.writeFile("./db/db.json", JSON.stringify(existingNotes), (err) => {
        if (err) {
          return res.status(500).json({ error: 'Failed to write notes data' });
        }
        res.status(201).json({ message: 'Note added successfully!', note: noteItem });
      });
    });
  } else {
    res.status(400).json({ error: 'Title and text are required' });
  }
});

app.delete('/api/notes/:id', (req, res) => {
  const { id } = req.params;

    // Read list of notes and replace it with new version that contains one less (the deleted) note
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to read notes data.' });
      }
      
      let existingNotes = data ? JSON.parse(data) : [];
      const noteNumber = existingNotes.findIndex(note => note.id === id);
      //we need to find the index to delete the undesired item.
      if (noteNumber === -1) {
        return res.status(404).json({ error: 'This note does not exist and could not be located.'})
      }
      existingNotes.splice(noteNumber, 1);

      fs.writeFile("./db/db.json", JSON.stringify(existingNotes), (err) => {
        if (err) {
          return res.status(500).json({ error: 'Failed to write notes data.' });
        }
        res.status(200).json({ message: 'Note deleted successfully!' });
      });
    });
});



app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);