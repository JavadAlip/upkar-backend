import Category from '../../models/categories/categories.js';

// CREATE CATEGORY

export const createCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;

    if (!categoryName) {
      return res
        .status(400)
        .json({ success: false, message: 'Category name is required' });
    }

    const exists = await Category.findOne({ categoryName });
    if (exists) {
      return res
        .status(409)
        .json({ success: false, message: 'Category already exists' });
    }

    const category = await Category.create({ categoryName });

    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      category,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

//  GET ALL

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      categories,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET SINGLE CATEGORY

export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);
    if (!category)
      return res
        .status(404)
        .json({ success: false, message: 'Category not found' });

    res.status(200).json({ success: true, category });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// UPDATE CATEGORY

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { categoryName } = req.body;

    const category = await Category.findById(id);
    if (!category)
      return res
        .status(404)
        .json({ success: false, message: 'Category not found' });

    if (categoryName) category.categoryName = categoryName;

    await category.save();

    res.status(200).json({
      success: true,
      message: 'Category updated successfully',
      category,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE CATEGORY

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);
    if (!category)
      return res
        .status(404)
        .json({ success: false, message: 'Category not found' });

    await Category.deleteOne({ _id: id });

    res.status(200).json({
      success: true,
      message: 'Category deleted successfully',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
};
