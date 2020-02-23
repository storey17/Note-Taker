const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const db = require('./db/db.json')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});

// require("./routes/apiRoutes")(app);
// require("./routes/htmlRoutes")(app);

// array for the notes input
let notesData = [];

app.get("/api/notes", function (err, res) {
  try {
    notesData = db
  }
  catch (err) {
    console.log(err);
  }
  res.json(notesData);
});
let idCount = 0;
// writes note to the json file
app.post("/api/notes", function (req, res) {
  try {
    const { title, text } = req.body;
    let newObj = { title, text, id: idCount };
    db.push(newObj);
    idCount++;
    res.json(db);
  } catch (err) {
    throw err;
    console.log(err);
  }
});

// deletes a note

app.delete("/api/notes/:id", function (req, res) {
  try {
    notesData = notesData.filter(function (note) {
      return newObj.id != req.params.id;
    });
  } catch (err) {
    throw err;
    console.log(err);
  }
});

// the get request from the website when the button is clicked
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});
app.get("/api/notes", function (req, res) {
  return res.sendFile(path.json(__dirname, "./db/db.json"));
});
// default route
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
})
