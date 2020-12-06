import mongoose from "mongoose";

const RealTimeSchema = new mongoose.Schema({
  site: {
    type: String,
    required: "Site Name is required",
  },
  companies: [String],
});

const model = mongoose.model("RealTime", RealTimeSchema);

export default model;
