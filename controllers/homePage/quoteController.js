import Quote from '../../models/homePage/QuoteModel.js';

// Create Quote
export const createQuote = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: 'Quote text is required' });
    }

    const newQuote = await Quote.create({ text });

    res.status(201).json({ message: 'Quote created successfully', quote: newQuote });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Get All Quotes
export const getAllQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find().sort({ createdAt: -1 });
    res.status(200).json(quotes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Update Quote
export const updateQuote = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    if (!id) return res.status(400).json({ message: 'Quote ID is required' });

    const updatedFields = {};
    if (text) updatedFields.text = text;

    const updatedQuote = await Quote.findByIdAndUpdate(id, updatedFields, { new: true });
    if (!updatedQuote) return res.status(404).json({ message: 'Quote not found' });

    res.status(200).json({ message: 'Quote updated successfully', quote: updatedQuote });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Delete Quote
export const deleteQuote = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: 'Quote ID is required' });

    const quote = await Quote.findById(id);
    if (!quote) return res.status(404).json({ message: 'Quote not found' });

    await Quote.deleteOne({ _id: id });
    res.status(200).json({ message: 'Quote deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
