import Banner from '../../models/homePage/bannerModel.js';
import { uploadImageToCloudinary } from '../../config/cloudinaryUpload.js';

export const createBanner = async (req, res) => {
  try {
    const { title, subtitle } = req.body;

    if (!title || !req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ message: 'Title and at least one image required' });
    }

    if (req.files.length > 10) {
      return res.status(400).json({ message: 'Maximum 5 images allowed' });
    }

    const uploadedImages = [];

    for (const file of req.files) {
      const result = await uploadImageToCloudinary(file.buffer, 'banners');
      uploadedImages.push(result.secure_url);
    }

    const banner = await Banner.create({
      title,
      subtitle,
      images: uploadedImages,
    });

    res.status(201).json({
      message: 'Banner created successfully',
      banner,
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

// export const updateBanner = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title, subtitle } = req.body;

//     const banner = await Banner.findById(id);

//     if (!banner) {
//       return res.status(404).json({ message: 'Banner not found' });
//     }

//     if (req.files && req.files.length > 0) {
//       const uploadedImages = [];

//       for (const file of req.files) {
//         const result = await uploadImageToCloudinary(file.buffer, 'banners');
//         uploadedImages.push(result.secure_url);
//       }

//       banner.images = uploadedImages;
//     }

//     if (title) banner.title = title;
//     if (subtitle) banner.subtitle = subtitle;

//     await banner.save();

//     res.status(200).json({
//       message: 'Banner updated successfully',
//       banner,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: error.message });
//   }
// };

export const updateBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, subtitle, removeImages } = req.body; // 👈 add removeImages

    const banner = await Banner.findById(id);
    if (!banner) {
      return res.status(404).json({ message: 'Banner not found' });
    }

    // Handle removal of existing images
    if (removeImages) {
      const toRemove = Array.isArray(removeImages)
        ? removeImages
        : [removeImages];
      banner.images = banner.images.filter((img) => !toRemove.includes(img));
    }

    // Upload and append new images
    if (req.files && req.files.length > 0) {
      const uploadedImages = [];
      for (const file of req.files) {
        const result = await uploadImageToCloudinary(file.buffer, 'banners');
        uploadedImages.push(result.secure_url);
      }

      // Combine kept + new, enforce max 10
      const combined = [...banner.images, ...uploadedImages];
      if (combined.length > 10) {
        return res.status(400).json({ message: 'Maximum 10 images allowed' });
      }
      banner.images = combined;
    }

    if (title) banner.title = title;
    if (subtitle) banner.subtitle = subtitle;

    await banner.save();
    res.status(200).json({ message: 'Banner updated successfully', banner });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Banner ID is required' });
    }
    const banner = await Banner.findById(id);
    if (!banner) {
      return res.status(404).json({ message: 'Banner not found' });
    }
    await Banner.deleteOne({ _id: id });
    res.status(200).json({ message: 'Banner deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
