import express from 'express';
import { AdminToken } from '../../middlewares/authMiddleware.js';
import upload from '../../middlewares/upload.js';

import {
  createContactMain,
  getContactMain,
  updateContactMain,
  deleteContactMain,
} from '../../controllers/contactPage/contactMainController.js';

import {
  createLocation,
  getAllLocations,
  updateLocation,
  deleteLocation,
} from '../../controllers/contactPage/locationController.js';

import {
  createContactEnquiry,
  getAllContactEnquiries,
  deleteContactEnquiry,
} from '../../controllers/contactPage/contactEnquiryController.js';

const router = express.Router();

// contact main
router.post(
  '/create-contactmain',
  AdminToken,
  upload.single('mainImage'),
  createContactMain,
);
router.get('/get-contactmain', getContactMain);
router.put(
  '/update-contactmain',
  AdminToken,
  upload.single('mainImage'),
  updateContactMain,
);
router.delete('/delete-contactmain', AdminToken, deleteContactMain);

//location
router.post('/create-location', AdminToken, createLocation);
router.get('/get-all-locations', getAllLocations);
router.put('/update-location/:id', AdminToken, updateLocation);
router.delete('/delete-location/:id', AdminToken, deleteLocation);

// contact enquiry
router.post('/create-contact-enquiry', createContactEnquiry);
router.get('/all-contact-enquiry', AdminToken, getAllContactEnquiries);
router.delete('/delete-contact-enquiry/:id', AdminToken, deleteContactEnquiry);

export default router;
