import express, { NextFunction, Request, Response } from "express";
import Task from "../models/Task";
import User from "../models/User";

// @desc  Get user tasks
// @route  GET /api/tasks

const getTasks = async (req: any, res: Response, next: NextFunction) => {
  console.log("GET /api/tasks/gettasks route hit");
  console.log("User:", req.user); // Log user information

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  try {
    const tasks = await Task.find({ user: req.user._id });
    res.status(200).json(tasks);
  } catch (error) {
    next(error); // Make sure to pass errors to the next middleware
  }
};



// @desc  Create task
// @route  POST /api/tasks
const createTask = async (req: any, res: Response) => {
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  const { title, description, status, priority, deadline } = req.body;

  try {
    const task = new Task({
      title,
      description,
      status,
      priority,
      deadline,
      createdAt: Date.now(),
      user: req.user._id,
    });
    await task.save();

    res.status(201).json({
      message: "succesfully created the task",
      task,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating task", error });
  }
};



// @desc  Delete task
// @route  DELETE /api/tasks/:id
const deleteTask = async (req: any, res: Response,next: NextFunction) => {
    if (!req.user) {
        res.status(401);
        throw new Error('User not found');
    }

    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        if (task.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await Task.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Task deleted' });
    } catch (error) {
        next(error); // Make sure to pass errors to the next middleware
    }
}





export { createTask, deleteTask, getTasks };