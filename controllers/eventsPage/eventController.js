// import Event from '../../models/eventsPage/eventModel.js';
// import { uploadImageToCloudinary } from '../../config/cloudinaryUpload.js';

// export const createEvent = async (req, res) => {
//   try {
//     const { eventTitle, eventDescription, eventLocation, eventDate } = req.body;

//     if (!eventTitle || !eventDescription || !eventLocation || !eventDate) {
//       return res
//         .status(400)
//         .json({ success: false, message: 'All fields are required' });
//     }

//     if (!req.file) {
//       return res
//         .status(400)
//         .json({ success: false, message: 'Event image is required' });
//     }

//     const imgRes = await uploadImageToCloudinary(req.file.buffer, 'events');

//     const event = await Event.create({
//       eventTitle,
//       eventDescription,
//       eventLocation,
//       eventDate,
//       eventImage: imgRes.secure_url,
//     });

//     res
//       .status(201)
//       .json({ success: true, message: 'Event created successfully', event });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// export const getAllEvents = async (req, res) => {
//   try {
//     const events = await Event.find().sort({ eventDate: -1 });
//     res.status(200).json({ success: true, events });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// export const updateEvent = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { eventTitle, eventDescription, eventLocation, eventDate } = req.body;

//     const event = await Event.findById(id);
//     if (!event)
//       return res
//         .status(404)
//         .json({ success: false, message: 'Event not found' });

//     if (eventTitle) event.eventTitle = eventTitle;
//     if (eventDescription) event.eventDescription = eventDescription;
//     if (eventLocation) event.eventLocation = eventLocation;
//     if (eventDate) event.eventDate = eventDate;

//     if (req.file) {
//       const imgRes = await uploadImageToCloudinary(req.file.buffer, 'events');
//       event.eventImage = imgRes.secure_url;
//     }

//     await event.save();
//     res
//       .status(200)
//       .json({ success: true, message: 'Event updated successfully', event });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// export const deleteEvent = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const event = await Event.findById(id);
//     if (!event)
//       return res
//         .status(404)
//         .json({ success: false, message: 'Event not found' });

//     await Event.deleteOne({ _id: id });
//     res
//       .status(200)
//       .json({ success: true, message: 'Event deleted successfully' });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

import Event from '../../models/eventsPage/eventModel.js';
import { uploadImageToCloudinary } from '../../config/cloudinaryUpload.js';

export const createEvent = async (req, res) => {
  try {
    const { eventTitle, eventDescription, eventLocation, eventDate } = req.body;

    if (!eventTitle || !eventDescription || !eventLocation || !eventDate) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    if (!req.files?.eventImages) {
      return res.status(400).json({
        success: false,
        message: 'Event images required',
      });
    }

    if (req.files.eventImages.length > 5) {
      return res.status(400).json({
        success: false,
        message: 'Maximum 5 images allowed',
      });
    }

    const uploadedImages = [];

    for (const file of req.files.eventImages) {
      const imgRes = await uploadImageToCloudinary(file.buffer, 'events');
      uploadedImages.push(imgRes.secure_url);
    }

    const event = await Event.create({
      eventTitle,
      eventDescription,
      eventLocation,
      eventDate,
      eventImages: uploadedImages,
    });

    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      event,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ eventDate: -1 });
    res.status(200).json({ success: true, events });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findById(id);
    if (!event)
      return res.status(404).json({
        success: false,
        message: 'Event not found',
      });

    const {
      eventTitle,
      eventDescription,
      eventLocation,
      eventDate,
      existingImages,
    } = req.body;

    if (eventTitle) event.eventTitle = eventTitle;
    if (eventDescription) event.eventDescription = eventDescription;
    if (eventLocation) event.eventLocation = eventLocation;
    if (eventDate) event.eventDate = eventDate;

    // Step 1️⃣ Get remaining old images
    let finalImages = [];

    if (existingImages) {
      finalImages = JSON.parse(existingImages);
    }

    // Step 2️⃣ Upload new images (if any)
    if (req.files?.eventImages) {
      for (const file of req.files.eventImages) {
        const imgRes = await uploadImageToCloudinary(file.buffer, 'events');
        finalImages.push(imgRes.secure_url);
      }
    }

    // Step 3️⃣ Validation
    if (finalImages.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'At least one image required',
      });
    }

    if (finalImages.length > 5) {
      return res.status(400).json({
        success: false,
        message: 'Maximum 5 images allowed',
      });
    }

    // Step 4️⃣ Save merged images
    event.eventImages = finalImages;

    await event.save();

    res.status(200).json({
      success: true,
      message: 'Event updated successfully',
      event,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: 'Event deleted successfully',
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
