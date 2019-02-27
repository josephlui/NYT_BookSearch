const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
var API = require ("./util/API");
var mongoose = require("mongoose");
var db = require("./models");

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/googlebooks";

// Connect to the Mongo DB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });


// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// retrieve book from database
app.get("/api/books/saved", (req, res) => {
  console.log ("i am here searching saved books");
  // res.json({});
  db.Book.find({})
  .then(function(result) {
    res.json(result);
  }).catch (function(err){
    console.log ('Error reading the database ' + err);
    res.json({});
 })
});

// retrieve book from google
app.get("/api/books", (req, res) => {
  const searchTerms = req.query.q;
  API.search(searchTerms)
  .then(result => {
    res.json(result.data);
  }).catch(err =>{
    console.log ('error' + err);
  });
});



// add book
app.post("/api/books", (req, res) => {

  const authors = req.body.authors;
  const description = req.body.description;
  const image = req.body.image;
  const link = req.body.link;
  const title = req.body.title;
  const bookId = req.body.bookId;
  const result = {
    authors: authors,
    description: description,
    image: image,
    link: link,
    title: title,
    bookId: bookId
  }
  db.Book.create(result)
    .then(function(res) {
      console.log (res);
      res.json(res);
    }).catch (function(err){
      console.log ('Item cannot be saved' + err);
      res.json({});
   })
});

app.delete("/api/books/:id", (req,res) =>{
  const id = req.params.id;
  console.log (id);
  db.Book.deleteMany({bookId: id})
    .then(function(result) {
      console.log (JSON.stringify(result));
      res.json(result);
    }).catch (function (err){
      console.log ('error deleting the book');
      res.json({});
    })
});




// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
