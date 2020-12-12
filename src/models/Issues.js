import mongoose from "mongoose";

const IssuesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Company Name is required",
  },
  companies: [
    {
      type: mongoose.Schema.Types.String,
      ref: "Companies",
    },
  ],
});

const model = mongoose.model("Issue", IssuesSchema);

export default model;
