'use client'

import { useEffect, useState } from "react";
import { useTaskContext } from '@/context/TaskContext'
import { Task, TaskStatus, TaskPriority } from '@/types/task'

const TasksTable = () => {
    
    const [fetchedTasks, setFetchedTasks] = useState<Task[]>([])

      // Fetch tasks from the backend when component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token'); // Retrieve token from local storage
      const response = await fetch('http://localhost:4000/api/tasks/gettasks', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Include the token in the Authorization header
        }
      });
  
      if (!response.ok) {
        // Handle error if needed
        console.error('Failed to fetch tasks:', response.statusText);
        return;
      }
  
      const data = await response.json();
      console.log(data)
      setFetchedTasks(data); // Assuming your API returns a list of tasks
    };
  
    fetchTasks();
  }, []);
  
  
  return (
    <div>
      fetching taksssssm
    </div>
  )
}

export default TasksTable
