const express = require('express');
// const path = require('path');
const app = express();

const PORT = process.env.PORT || 3001;

const htmlRoutes = require('./routes/index')
const apiRoutes = require('./routes/notes')

app.use(express.static("public"));
//parsing middleware; essential for form handling
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', htmlRoutes)
app.use('/api/notes', apiRoutes)

app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);