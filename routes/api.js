const express = require("express");
const router = express.Router();

// get note list types
router.get("/list-types", function(request, response) {

});

// get notes lists
router.get("/lists", function(request, response) {

});

// add new notes list
router.post("/lists", function(request, response) {

});

// get (notes of a) list
router.get("/list/:list_id", function(request, response) {

});

// delete a list (requires list to be empty)
router.delete("/list/:list_id", function(request, response) {

});

// add a new note item to a list
router.post("/list/:list_id", function(request, response) {

});

// update a note
router.put("/list/:list_id/note/:note_id", function(request, response) {

});

// delete a note
router.delete("/list/:list_id/note/:note_id", function(request, response) {

});

module.exports = router;