const asyncHandler = require("express-async-handler");
const Hint = require("../models/Hintmodel");

const hints = {
  create: asyncHandler(async (req, res) => {
    const { code, hint } = req.body;
    if (!code || !hint) {
      throw new Error("Please all fields are required");
    }
    const dbhint = await Hint.create({
      code,
      hint,
    });
    res.json({
      code: dbhint.code,
      hint: dbhint.hint,
      id: dbhint._id,
    });
  }),
  getHint: asyncHandler(async (req, res) => {
    const { code } = req.params;
    if (!code) {
      throw new Error("Please enter the code to get hint");
    }
    const dbhint = await Hint.findOne({ code });
    if (!dbhint) {
      throw new Error("Please check and enter the correct code");
    }
    res.json({
      hint: dbhint.hint,
    })
    }),
};
module.exports = hints;
