
import verifyToken from '../middleware';
import { createTask, deleteTask, getTasks, updateTasks } from '../controllers/taskController';
import router from './authRoute';

router.post('/addtask', verifyToken, createTask);
router.route('/gettasks').get(verifyToken, getTasks)
router.delete('/deletetasks/:id', verifyToken, deleteTask)
router.delete('/updatetasks/', verifyToken, updateTasks)

export default router;