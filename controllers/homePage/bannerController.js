import Banner from '../../models/homePage/bannerModel.js';
import { uploadImageToCloudinary } from '../../config/cloudinaryUpload.js'; 

export const createBanner = async (req, res) => {
  try {
    const { title, subtitle } = req.body;

    if (!title || !req.file) {
      return res.status(400).json({ message: 'Title and image are required' });
    }

    // Upload image to Cloudinary
    const result = await uploadImageToCloudinary(req.file.buffer, 'banners');

    // Save banner with Cloudinary URL
    const banner = await Banner.create({
      title,
      subtitle,
      image: result.secure_url
    });

    res.status(201).json({
      message: 'Banner created successfully',
      banner
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getBanners = async (req, res) => {
  try {
    const banners = await Banner.find().sort({ createdAt: -1 });
    res.status(200).json(banners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
