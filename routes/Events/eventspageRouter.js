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

const router = express.Router();

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

export default router;
