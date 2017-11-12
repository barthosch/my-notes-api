const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const List = require("../models/list");
const Note = require("../models/note");

mongoose.connect("mongodb://localhost/myNotes");
let db = mongoose.connection;

db.on("error", function(err) {
  console.error("connection error:", err);
});

db.once("open", function() {
  console.log("connected to database.");
});


// get note list types
router.get("/list-types", function(request, response) {

});

// get notes lists
router.get("/lists", function(request, response) {
  List.find({}, function(err, lists) {
    if (err) {
      console.log(err);
    } else {
      response.send(lists);
    }
  })
});


// add new notes list
router.post("/lists", function(request, response) {
 List.create(request.body).then(function(list) {
   response.send(list);
 }).catch(function(error) {
   console.warn(error);
   response.status(500).end();
 })
});

// get (notes of a) list
router.get("/list/:list_id", function(request, response) {
  List.find({
    _id: request.params.list_id
  }, function(err, lists) {
    if (err) {
      console.log(err);
      response.status(404).end();
    } else {
      response.send(lists);
    }
  })
});

// delete a list (requires list to be empty)
router.delete("/list/:list_id", function(request, response) {

});

// add a new note item to a list
router.post("/list/:list_id/note/add", function(request, response) {
  List.findOne({ _id: request.params.list_id }, function(err, list) {
    const newNote = Note(request.body);
    list.items.push(newNote);
    list.save(function(res) {
      response.send(newNote);
    });
  });
});

// update a note
router.put("/list/:list_id/note/:note_id", function(request, response) {

});

// delete a note
router.delete("/list/:list_id/note/:note_id", function(request, response) {

});


module.exports = router;