const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
  caption: {
    type: String,
    required: [true, "Caption is required"]
  },
  type: {
    type: String, //todo: type Object?
    default: "todo"
  },
  done: Boolean,
  hexColor: String,
  due: Date,
  quantity: Number,
  details: String
});

const Note = module.exports = mongoose.model("Note", NoteSchema);