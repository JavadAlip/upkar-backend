import EventPage from '../../models/eventsPage/eventPageModel.js';
import { uploadImageToCloudinary } from '../../config/cloudinaryUpload.js';

export const createOrUpdateEventPage = async (req, res) => {
  try {
    const { mainTitle, mainDescription, subTitle, subDescription } = req.body;

    if (!mainTitle || !mainDescription || !subTitle || !subDescription) {
      return res.status(400).json({
        success: false,
        message: 'All text fields are required',
      });
    }

    let eventPage = await EventPage.findOne();

    if (!eventPage) {
      if (!req.files?.mainImage || !req.files?.subImage) {
        return res.status(400).json({
          success: false,
          message: 'Both images are required for first time creation',
        });
      }

      const mainImgRes = await uploadImageToCloudinary(
        req.files.mainImage[0].buffer,
        'events',
      );

      const subImgRes = await uploadImageToCloudinary(
        req.files.subImage[0].buffer,
        'events',
      );

      eventPage = await EventPage.create({
        mainTitle,
        mainDescription,
        mainImage: mainImgRes.secure_url,
        subTitle,
        subDescription,
        subImage: subImgRes.secure_url,
      });

      return res.status(200).json({
        success: true,
        message: 'Event page created successfully',
        eventPage,
      });
    }

    eventPage.mainTitle = mainTitle;
    eventPage.mainDescription = mainDescription;
    eventPage.subTitle = subTitle;
    eventPage.subDescription = subDescription;

    if (req.files?.mainImage) {
      const mainImgRes = await uploadImageToCloudinary(
        req.files.mainImage[0].buffer,
        'events',
      );
      eventPage.mainImage = mainImgRes.secure_url;
    }

    if (req.files?.subImage) {
      const subImgRes = await uploadImageToCloudinary(
        req.files.subImage[0].buffer,
        'events',
      );
      eventPage.subImage = subImgRes.secure_url;
    }

    await eventPage.save();

    res.status(200).json({
      success: true,
      message: 'Event page updated successfully',
      eventPage,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getEventPage = async (req, res) => {
  try {
    const eventPage = await EventPage.findOne();
    res.status(200).json({ success: true, eventPage });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
