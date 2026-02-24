import express from 'express';
import { AdminToken } from '../../middlewares/authMiddleware.js';
import upload from '../../middlewares/upload.js';
import {
  createEvent,
  getAllEvents,
  updateEvent,
  deleteEvent,
} from '../../controllers/eventsPage/eventController.js';

import {
  createOrUpdateEventPage,
  getEventPage,
} from '../../controllers/eventsPage/eventPageController.js';

import {
  createEventEnquiry,
  getAllEventEnquiries,
  deleteEventEnquiry,
} from '../../controllers/eventsPage/eventEnquiryController.js';

const router = express.Router();

//events
router.post(
  '/create-event',
  AdminToken,
  upload.fields([{ name: 'eventImages', maxCount: 5 }]),
  createEvent,
);

router.get('/get-all-events', getAllEvents);
router.put(
  '/update-event/:id',
  AdminToken,
  upload.fields([{ name: 'eventImages', maxCount: 5 }]),
  updateEvent,
);
router.delete('/delete-event/:id', AdminToken, deleteEvent);

// events page top
router.post(
  '/update-event-page',
  AdminToken,
  upload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'subImage', maxCount: 1 },
  ]),
  createOrUpdateEventPage,
);

router.get('/get-event-page', getEventPage);

//event enquiry
router.post('/create-event-enquiry', createEventEnquiry);
router.get('/all-event-enquiry', getAllEventEnquiries);
router.delete('/delete-event-enquiry/:id', deleteEventEnquiry);
export default router;
