
// 'use client';

// import { useEffect, useState } from 'react';
// import { useTaskContext } from '@/context/TaskContext'; // Assuming TaskContext is set up
// import TaskColumn from './TaskColumn'; // Import your TaskColumn component
// import { Task } from '@/types/task';

// const TaskBoard: React.FC = () => {
//   const { setTasks } = useTaskContext(); // Assuming your TaskContext provides setTasks method
//   const [fetchedTasks, setFetchedTasks] = useState<Task[]>([]);
//   const [activeCard, setActiveCard] = useState<number | null>(null);

//   useEffect(() => {
//     const fetchTasks = async () => {
//       const token = localStorage.getItem('token'); // Retrieve token from local storage
//       const response = await fetch('http://localhost:4000/api/tasks/gettasks', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
//         },
//       });

//       if (!response.ok) {
//         console.error('Failed to fetch tasks:', response.statusText);
//         return;
//       }

//       const data = await response.json();
//       setFetchedTasks(data);
//       localStorage.setItem('tasks', JSON.stringify(data)); // Store tasks in local storage
//       setTasks(data); // Update the context if necessary
//     };

//     fetchTasks();
//   }, [setTasks]);

//   const handleDelete = async (id: string): Promise<void> => {
//     // Implement delete logic here
//   };

//   const updateLocalStorage = (tasks: Task[]) => {
//     localStorage.setItem('tasks', JSON.stringify(tasks));
//     setTasks(tasks); // Update the context if necessary
//   };

//   const onDrop = (status: any, index: number) => {
//     if (activeCard === null) return;

//     const taskToMove = fetchedTasks[activeCard];
//     const updatedTasks = fetchedTasks.filter((_, i) => i !== activeCard); // Remove the task from its current position

//     // Update task status and insert it at the new index
//     const updatedTask = { ...taskToMove, status }; // Change status to the new one
//     updatedTasks.splice(index, 0, updatedTask); // Insert at the new position

//     // Update local storage first for a fast response
//     updateLocalStorage(updatedTasks);
// };


//   return (
//     <div>
//       <div className="flex">
//         <TaskColumn
//           title="To Do"
//           status="todo"
//           tasks={fetchedTasks.filter(task => task.status === 'todo')}
//           handleDelete={handleDelete}
//           setActiveCard={setActiveCard}
//           onDrop={onDrop}
//         />
//         <TaskColumn
//           title="In Progress"
//           status="inprogress"
//           tasks={fetchedTasks.filter(task => task.status === 'inprogress')}
//           handleDelete={handleDelete}
//           setActiveCard={setActiveCard}
//           onDrop={onDrop}
//         />
//         <TaskColumn
//           title="Completed"
//           status="completed"
//           tasks={fetchedTasks.filter(task => task.status === 'completed')}
//           handleDelete={handleDelete}
//           setActiveCard={setActiveCard}
//           onDrop={onDrop}
//         />
//       </div>
//     </div>
//   );
// };

// export default TaskBoard;

















'use client';

import { useEffect, useState } from 'react';
import { useTaskContext } from '@/context/TaskContext';
import TaskColumn from './TaskColumn';
import { Task } from '@/types/task';
import { motion } from 'framer-motion';


const TaskBoard: React.FC = () => {
  const { setTasks } = useTaskContext();
  const [fetchedTasks, setFetchedTasks] = useState<Task[]>([]);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [newTask, setNewTask] = useState({ title: '', description: '' });

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        // Redirect to sign-in page if no token found
        window.location.href = '/signin'; // Adjust the path as necessary
        return;
      }
      
      try {
        const response = await fetch('http://localhost:4000/api/tasks/gettasks', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }

        const data = await response.json();
        setFetchedTasks(data);
        localStorage.setItem('tasks', JSON.stringify(data));
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [setTasks]);

  const handleDelete = async (id: string): Promise<void> => {
    const updatedTasks = fetchedTasks.filter(task => task.id !== id);
    updateLocalStorage(updatedTasks);
  };

  const updateLocalStorage = (tasks: Task[]) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    setFetchedTasks(tasks);
    setTasks(tasks);
  };

  const onDrop = (status: 'todo' | 'inprogress' | 'completed', index: number) => {
    if (activeCard === null) return;

    const taskToMove = fetchedTasks[activeCard];
    const updatedTasks = fetchedTasks.filter((_, i) => i !== activeCard);

    const updatedTask = { ...taskToMove, status };
    updatedTasks.splice(index, 0, updatedTask);

    updateLocalStorage(updatedTasks);
  };

  const handleAddTask = () => {
    if (newTask.title.trim() === '') return;

    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      status: 'todo',
      priority: 'medium',
      createdAt: new Date()
    };

    const updatedTasks = [...fetchedTasks, task];
    updateLocalStorage(updatedTasks);
    setNewTask({ title: '', description: '' });
    // setIsDialogOpen(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4"
    >
      <h1 className="text-3xl font-bold text-center mb-8">Task Board</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TaskColumn
          title="To Do"
          status="todo"
          tasks={fetchedTasks.filter(task => task.status === 'todo')}
          handleDelete={handleDelete}
          setActiveCard={setActiveCard}
          onDrop={onDrop}
        />
        <TaskColumn
          title="In Progress"
          status="inprogress"
          tasks={fetchedTasks.filter(task => task.status === 'inprogress')}
          handleDelete={handleDelete}
          setActiveCard={setActiveCard}
          onDrop={onDrop}
        />
        <TaskColumn
          title="Completed"
          status="completed"
          tasks={fetchedTasks.filter(task => task.status === 'completed')}
          handleDelete={handleDelete}
          setActiveCard={setActiveCard}
          onDrop={onDrop}
        />
      </div>
    </motion.div>
  );
};

export default TaskBoard;
