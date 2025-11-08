const Banner = require('../../models/homePage/bannerModel');

const createBanner = async (req, res) => {
  try {
    const { title, subtitle, image } = req.body;

    if (!title || !image) {
      return res.status(400).json({ message: 'Title and image are required' });
    }

    const banner = await Banner.create({ title, subtitle, image });
    res.status(201).json({
      message: 'Banner created successfully',
      banner
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBanners = async (req, res) => {
  try {
    const banners = await Banner.find().sort({ createdAt: -1 });
    res.status(200).json(banners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createBanner, getBanners };
