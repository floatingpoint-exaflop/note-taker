const express = require('express');
const fs = require('fs');
const uuid = require('../helpers/uuid');
const router = express.Router();

//GET
app.get('/api/notes', (req, res) => {
  fs.readFile("./db/db.json", "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read notes data.' });
    }
    res.status(200).json(JSON.parse(data))
  })
});

//POST NEW ITEM
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

//DELETE ITEM (Trashcan button)
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

module.exports = router;