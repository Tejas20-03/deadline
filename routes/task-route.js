import express from "express";
import {
  createTask,
  deleteTask,
  getAllTask,
  getById,
  getByUserId,
  updateTask,
} from "../controllers/task-controller.js";

const taskRouter = express.Router();

taskRouter.get("/", getAllTask);
taskRouter.post("/create", createTask);
taskRouter.put("/update/:id", updateTask);
taskRouter.get("/:id", getById);
taskRouter.delete("/:id", deleteTask);
taskRouter.get("/user/:id", getByUserId);

export default taskRouter;
