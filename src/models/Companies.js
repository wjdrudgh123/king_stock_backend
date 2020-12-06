import mongoose from "mongoose";

const CompaniesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Company Name is required",
  },
  catalyst: [
    {
      type: mongoose.Schema.Types.String,
      ref: "Catalyst",
    },
  ],
});

const model = mongoose.model("Company", CompaniesSchema);

export default model;
