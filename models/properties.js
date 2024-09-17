const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.ObjectId;
const property = new mongoose.Schema(
  {
    userId: { type: ObjectId, required: true },
    userEmail: { type: String, required: true },
    propertyName: { type: String, required: true },
    propertyNumber: { type: String, required: true },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Property", property);