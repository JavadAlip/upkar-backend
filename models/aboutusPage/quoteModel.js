import mongoose from "mongoose";

const QuoteSchema = new mongoose.Schema(
  {
    quoteContent: { type: String, required: true },
    name: { type: String, required: true },
    position: { type: String, required: true },
  },
  { timestamps: true }
);

const Quote = mongoose.model("Quote", QuoteSchema);

export default Quote;
