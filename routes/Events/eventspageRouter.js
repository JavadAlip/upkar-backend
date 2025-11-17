import express from "express";
import { AdminToken } from "../../middlewares/authMiddleware.js";
import upload from "../../middlewares/upload.js";
import { createEvent, getAllEvents, updateEvent, deleteEvent } from "../../controllers/eventsPage/eventController.js";

const router = express.Router();

router.post(
    "/create-event",
    AdminToken,
    upload.single("eventImage"),
    createEvent
);
router.get("/get-all-events", getAllEvents);
router.put(
    "/update-event/:id",
    AdminToken,
    upload.single("eventImage"),
    updateEvent
);
router.delete("/delete-event/:id", AdminToken, deleteEvent);

export default router;
