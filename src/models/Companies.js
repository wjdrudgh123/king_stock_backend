import mongoose from "mongoose";

const CompaniesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Company Name is required",
  },
  issues: [
    {
      type: mongoose.Schema.Types.String,
      ref: "Issues",
    },
  ],
});

const model = mongoose.model("Company", CompaniesSchema);

export default model;
