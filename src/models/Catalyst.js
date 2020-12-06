import mongoose from "mongoose";

const CatalystSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Company Name is required",
  },
  items: [
    {
      type: mongoose.Schema.Types.String,
      ref: "Companies",
    },
  ],
});

const model = mongoose.model("Catalyst", CatalystSchema);

export default model;
