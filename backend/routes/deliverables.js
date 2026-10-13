
import express from "express";
import {
    getDeliverablesController,
    getDeliverableByIdController,
    createDeliverableController,
    updateDeliverableController,
    deleteDeliverableController,
} from "../controllers/deliverablesController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", getDeliverablesController);
router.get("/:id", getDeliverableByIdController);
router.post("/", createDeliverableController);
router.put("/:id", updateDeliverableController);
router.delete("/:id", deleteDeliverableController);

export default router;
