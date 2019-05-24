const mongoose = require("mongoose");

const facSchema = new mongoose.Schema({
  fac: {
    type: Number,
    required: true
  },
  category: {
    type: Number,
    required: true
  },
  insertedAt: {
    type: Date,
    default: new Date()
  }
});

module.exports = mongoose.model("facs", facSchema);
