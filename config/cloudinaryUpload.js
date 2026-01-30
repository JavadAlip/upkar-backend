// import cloudinary from '../config/cloudinaryConfig.js';
// import streamifier from 'streamifier';

// export const uploadImageToCloudinary = (fileBuffer, folder) => {
//   return new Promise((resolve, reject) => {
//     const stream = cloudinary.uploader.upload_stream(
//       { folder },
//       (error, result) => {
//         if (result) resolve(result);
//         else reject(error);
//       }
//     );
//     streamifier.createReadStream(fileBuffer).pipe(stream);
//   });
// };

import cloudinary from '../config/cloudinaryConfig.js';
import streamifier from 'streamifier';

// For IMAGES
export const uploadImageToCloudinary = (fileBuffer, folder) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'image',
      },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      },
    );

    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

// For PDF / DOC / BROCHURE
export const uploadRawToCloudinary = (fileBuffer, folder) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'raw', //  THIS IS THE KEY
      },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      },
    );

    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};
