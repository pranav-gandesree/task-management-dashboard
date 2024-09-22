

// 'use client'



// import { act, useEffect, useState } from 'react';
// import { useTaskContext } from '@/context/TaskContext'; // Assuming TaskContext is setup
// import TaskColumn from './TaskColumn'; // Import your TaskColumn component
// import { Task } from '@/types/task';

// const TaskBoard: React.FC = () => {
//   const { tasks, setTasks } = useTaskContext(); // Assuming your TaskContext provides setTasks method
//   const [fetchedTasks, setFetchedTasks] = useState<Task[]>([]);
//   const [activeCard, setActiveCard] = useState<number | null>(null);


//   useEffect(() => {
//     const fetchTasks = async () => {
//       const token = localStorage.getItem('token'); // Retrieve token from local storage
//       const response = await fetch('http://localhost:4000/api/tasks/gettasks', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}` // Include the token in the Authorization header
//         }
//       });
  
//       if (!response.ok) {
//         // Handle error if needed
//         console.error('Failed to fetch tasks:', response.statusText);
//         return;
//       }
  
//       const data = await response.json();
//       console.log(data)
//       setFetchedTasks(data); // Assuming your API returns a list of tasks
//     };
  
//     fetchTasks();
//   }, [setTasks]);
  
  

//   function handleDelete(id: string): void {
//     throw new Error('Function not implemented.');
//   }

//   // const onDrop = (status: any, index: any)=>{
//   //     console.log(`${activeCard} is going to be place into ${status} at position ${index}`)

//   //     if(activeCard == null || activeCard ===undefined) return;

//   //     const TaskToMove = tasks[activeCard]

//   //     const updatedTasks = tasks.filter((_, i) => i !== activeCard); 

//   //     updatedTasks.splice(index, 0, {
//   //       ...TaskToMove, 
//   //       status: status
//   //     })

//   //     setTasks(updatedTasks)
//   // }


//   const onDrop = async(status: any, index: number) => {
//     console.log(`${activeCard} is going to be placed into ${status} at position ${index}`);

//     if (activeCard === null || activeCard === undefined) return;

//     const taskToMove = fetchedTasks[activeCard]; // Use fetchedTasks to get the task
//     const updatedTasks = [...fetchedTasks.filter((_, i) => i !== activeCard)]; // Remove the task from the original position

//     // Add the task to the new position with updated status
//     updatedTasks.splice(index, 0, {
//         ...taskToMove,
//         status: status,
//     });

//     setFetchedTasks(updatedTasks); // Update fetchedTasks
//     setTasks(updatedTasks); // If you need to update the context as well

//         // // Update backend
//         // const token = localStorage.getItem('token');
//         // await fetch('http://localhost:4000/api/tasks/updatetasks', {
//         //     method: 'POST',
//         //     headers: {
//         //         'Content-Type': 'application/json',
//         //         'Authorization': `Bearer ${token}`,
//         //     },
//         //     body: JSON.stringify(updatedTasks),
//         // });


//         const updateTasks = async (tasks: any) => {
//           const token = localStorage.getItem('token'); // Retrieve token from local storage
//           const response = await fetch('http://localhost:4000/api/tasks/updatetasks', {
//             method: 'POST', // Use POST method
//             headers: {
//               'Content-Type': 'application/json',
//               'Authorization': `Bearer ${token}` // Include the token in the Authorization header
//             },
//             body: JSON.stringify(tasks), // Send your updated tasks
//           });
        
//           if (!response.ok) {
//             console.error('Failed to update tasks:', response.statusText);
//             return;
//           }
        
//           const data = await response.json();
//           console.log(data);
//         };

//         updateTasks(updatedTasks);
        
// };



//   return (
//     <div>

//     <div className="flex">
//       {/* Pass fetched tasks and handleDelete function to TaskColumn */}
//       <TaskColumn title="To Do" status="todo" tasks={fetchedTasks} handleDelete={handleDelete}  setActiveCard={setActiveCard} onDrop={onDrop} />
//       <TaskColumn title="In Progress" status="inprogress" tasks={fetchedTasks} handleDelete={handleDelete}  setActiveCard={setActiveCard} onDrop={onDrop}/>
//       <TaskColumn title="Completed" status="completed" tasks={fetchedTasks} handleDelete={handleDelete} setActiveCard={setActiveCard} onDrop={onDrop} />
//     </div>
//     {/* <h1 className='text-white'>active card - {activeCard}</h1> */}
//     </div>
//   );
// };

// export default TaskBoard;


























'use client';

import { useEffect, useState } from 'react';
import { useTaskContext } from '@/context/TaskContext'; // Assuming TaskContext is set up
import TaskColumn from './TaskColumn'; // Import your TaskColumn component
import { Task } from '@/types/task';

const TaskBoard: React.FC = () => {
  const { setTasks } = useTaskContext(); // Assuming your TaskContext provides setTasks method
  const [fetchedTasks, setFetchedTasks] = useState<Task[]>([]);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token'); // Retrieve token from local storage
      const response = await fetch('http://localhost:4000/api/tasks/gettasks', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
        },
      });

      if (!response.ok) {
        console.error('Failed to fetch tasks:', response.statusText);
        return;
      }

      const data = await response.json();
      setFetchedTasks(data);
      localStorage.setItem('tasks', JSON.stringify(data)); // Store tasks in local storage
      setTasks(data); // Update the context if necessary
    };

    fetchTasks();
  }, [setTasks]);

  const handleDelete = async (id: string): Promise<void> => {
    // Implement delete logic here
  };

  const updateLocalStorage = (tasks: Task[]) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    setTasks(tasks); // Update the context if necessary
  };

  const onDrop = (status: any, index: number) => {
    if (activeCard === null) return;

    const taskToMove = fetchedTasks[activeCard];
    const updatedTasks = fetchedTasks.filter((_, i) => i !== activeCard);

    // Update task status and insert it at the new index
    updatedTasks.splice(index, 0, { ...taskToMove, status });

    // Update local storage first for a fast response
    updateLocalStorage(updatedTasks);
  };

  return (
    <div>
      <div className="flex">
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
    </div>
  );
};

export default TaskBoard;
