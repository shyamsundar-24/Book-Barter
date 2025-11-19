const mongoose = require("mongoose");

const transSchema = new mongoose.Schema({
  offeredBook: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
  requestedBook: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
  initiator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: { type: String, default: "Pending" }
});

module.exports = mongoose.model("Transaction", transSchema);
