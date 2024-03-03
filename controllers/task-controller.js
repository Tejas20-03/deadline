import mongoose from "mongoose";
import Task from "../model/Task.js";
import User from "../model/User.js";

export const createTask = async (req, res) => {
  const { title, description, assignedTo, dueDate } = req.body;

  let existingUser;
  try {
    existingUser = await User.findById(assignedTo);
  } catch (err) {
    return console.log(err);
  }

  if (!existingUser) {
    return res.status(400).json({ message: "Unable to find User" });
  }

  const task = new Task({
    title,
    description,
    assignedTo,
    dueDate,
  });

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await task.save({ session });
    existingUser.tasks.push(task);
    await existingUser.save({ session });
    await session.commitTransaction();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
  return res.status(200).json({ task });
};

export const getAllTask = async (req, res) => {
  let tasks;
  try {
    tasks = await Task.find();
  } catch (error) {
    console.log(error);
    return console.log(error);
  }
  if (!tasks) {
    return res.status(404).json({ message: "No Tasks Found" });
  }
  return res.status(200).json({ tasks });
};

export const updateTask = async (req, res) => {
  const { title, description } = req.body;
  const taskId = req.params.id;
  let task;
  try {
    task = await Task.findByIdAndUpdate(taskId, { title, description });
  } catch (error) {
    console.log(error);
  }
  if (!task) {
    return res.status(500).json({ message: "Unable to Update" });
  }
  return res.status(200).json({ task });
};

export const getById = async (req, res) => {
  const id = req.params.id;
  let task;
  try {
    task = await Task.findById(id);
  } catch (error) {
    return console.log(error);
  }
  if (!task) {
    return res.status(404).json({ message: "No Task Found" });
  }
  return res.status(200).json({ task });
};

export const deleteTask = async (req, res) => {
  const id = req.params.id;
  let task;
  try {
    task = await Task.findByIdAndDelete(id).populate("assignedTo");
    await task.assignedTo.tasks.pull(task);
    await task.assignedTo.save();
  } catch (error) {
    return console.log(error);
  }
  if (!task) {
    res.status(500).json({ message: "Unable to Delete" });
  }
  return res.status(200).json({ message: "Successfull Deleted" });
};

export const getByUserId = async (req, res) => {
  const userId = req.params.id;
  let userTasks;
  try {
    userTasks = await User.findById(userId).populate("tasks");
  } catch (error) {
    return console.log(error);
  }
  if (!userTasks) {
    return res.status(404).json({ message: "No Tasks Found" });
  }
  return res.status(200).json({ tasks: userTasks });
};
