const mongoose = require("mongoose");
const HintSchema=new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    hint: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("hints",HintSchema);