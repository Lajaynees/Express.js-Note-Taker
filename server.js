const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3001;
const { v4: uuidv4 } = require('uuid');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//APP.GET-POST-POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note
app.get('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', (err, data) => {
    if (err) throw err
    const parsed = JSON.parse(data)
    console.log(parsed)
    res.json(parsed)
  })
})
app.post('/api/notes', (req,res) => {
  const { title, text } = req.body
  const newNote = {
    title,
    text,
    id: uuidv4()
  }
  fs.readFile('./db/db.json', (err, data) => {
    if (err) throw err
    const notes = JSON.parse(data)
    notes.push(newNote)
    fs.writeFile('./db/db.json', JSON.stringify(notes), (err, data) => {
      if (err) throw err
    res.json(notes)
    })
  })
  
})

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
);
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
