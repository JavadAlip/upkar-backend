import Question from '../../models/homePage/questionModel.js';

// Create Question
export const createQuestion = async (req, res) => {
  try {
    const { question, answer } = req.body;

    if (!question || !answer) {
      return res.status(400).json({ message: 'Question and answer are required' });
    }

    const newQuestion = await Question.create({ question, answer });

    res.status(201).json({ message: 'Question created successfully', question: newQuestion });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Get All Questions
export const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find().sort({ createdAt: -1 });
    res.status(200).json(questions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Update Question
export const updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const { question, answer } = req.body;

    if (!id) return res.status(400).json({ message: 'Question ID is required' });

    const updatedFields = {};
    if (question) updatedFields.question = question;
    if (answer) updatedFields.answer = answer;

    const updatedQuestion = await Question.findByIdAndUpdate(id, updatedFields, { new: true });
    if (!updatedQuestion) return res.status(404).json({ message: 'Question not found' });

    res.status(200).json({ message: 'Question updated successfully', question: updatedQuestion });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Delete Question
export const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: 'Question ID is required' });

    const question = await Question.findById(id);
    if (!question) return res.status(404).json({ message: 'Question not found' });

    await Question.deleteOne({ _id: id });
    res.status(200).json({ message: 'Question deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
    