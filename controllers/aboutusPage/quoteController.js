import Quote from "../../models/aboutusPage/quoteModel.js";


export const createQuote = async (req, res) => {
  try {
    const { quoteContent, name, position } = req.body;

    if (!quoteContent || !name || !position) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const quote = await Quote.create({ quoteContent, name, position });
    res.status(201).json({ success: true, message: "Quote created successfully", quote });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const getAllQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, quotes });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const updateQuote = async (req, res) => {
  try {
    const { id } = req.params;
    const { quoteContent, name, position } = req.body;

    const quote = await Quote.findById(id);
    if (!quote) return res.status(404).json({ success: false, message: "Quote not found" });

    if (quoteContent) quote.quoteContent = quoteContent;
    if (name) quote.name = name;
    if (position) quote.position = position;

    await quote.save();
    res.status(200).json({ success: true, message: "Quote updated successfully", quote });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const deleteQuote = async (req, res) => {
  try {
    const { id } = req.params;
    const quote = await Quote.findById(id);
    if (!quote) return res.status(404).json({ success: false, message: "Quote not found" });

    await Quote.deleteOne({ _id: id });
    res.status(200).json({ success: true, message: "Quote deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
