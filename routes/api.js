const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const List = require("../models/list");
const Note = require("../models/note");
const ObjectId = mongoose.Schema.Types.ObjectId;

mongoose.connect("mongodb://localhost/myNotes");
let db = mongoose.connection;

db.on("error", function(err) {
  console.error("connection error:", err);
});

db.once("open", function() {
  console.log("connected to database.");
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
   response.sendStatus(500);
 })
});

// get (notes of a) list
router.get("/list/:list_id", function(request, response) {
  List.find({
    _id: request.params.list_id
  }, function(err, lists) {
    if (err) {
      console.log(err);
      response.sendStatus(404);
    } else {
      response.send(lists);
    }
  })
});

// delete a list (requires list to be empty)
router.delete("/list/:list_id", function(request, response) {

});

// add a new note item to a list
router.post("/list/:list_id/note", function(request, response) {
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

  let editedNote = {};
  (["caption", "type", "done", "hexColor", "due", "quantity", "details"]).map(key => {
    if (request.body[key]) {
      editedNote["items.$." + key] = request.body[key]
    }
  });
  List.findOne({_id: request.params.list_id}, function(err, list) {
    list.items.filter(item => item._id == request.params.note_id)
      .map(item => {
        (["caption", "type", "done", "hexColor", "due", "quantity", "details"]).map(key => {
          if (request.body[key]) {
            item[key] = request.body[key];
          }
        });
      });
    console.log(list);
    list.save();
    response.sendStatus(200);
  });
  /*
  List.update(
    {
      _id: request.params.list_id,
      "items._id": request.params.note_id
    },
    { "$set": editedNote },
    function (err, a) {
      console.log(err, a);
      if (err) {
        console.warn(err);
        response.sendStatus(500);
      } else {
        response.sendStatus(200);
      }
    }
  );
*/
  /*
  Note.findAndModify({ _id: request.params.note_id },
    request.body,
    function(err, result) {
      if (err) {
        console.warn(err);
        response.sendStatus(500);
      } else {
        console.log(result);
        response.sendStatus(200);
      }
    }
  );*/
});


// delete a note
router.delete("/list/:list_id/note/:note_id", function(request, response) {

});


module.exports = router;