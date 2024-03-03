import express from "express";
import { createTask, getAllTask } from "../controllers/task-controller.js";

const taskRouter = express.Router();

taskRouter.get("/", getAllTask);
taskRouter.post("/create", createTask);

export default taskRouter;
