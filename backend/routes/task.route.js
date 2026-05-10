import express from 'express';
import { deleteTask, getAllTasks, getByIdTask, postTask, putTask } from "../controllers/task.controller.js";
import { taskValidationPost, updateTaskValidation, idParamValidation } from '../validators/task.validator.js';

const router = express.Router();

router.post("/tasks", taskValidationPost, postTask);
router.put("/tasks/:id", updateTaskValidation, putTask);
router.delete("/tasks/:id", idParamValidation, deleteTask);
router.get("/tasks", getAllTasks);
router.get("/tasks/:id", getByIdTask);

export default router;