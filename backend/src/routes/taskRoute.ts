import express, {NextFunction, Request, Response} from "express";
import verifyToken from "../middleware";
import { createTask, deleteTask, getTasks } from "../controllers/taskController";
import Task from "../models/Task";


const router = express.Router();

router.post('/addtask', verifyToken, createTask);
router.route('/gettasks').get(verifyToken, getTasks)
router.delete('/deletetasks/:id', verifyToken, deleteTask)


      
 


export default router;