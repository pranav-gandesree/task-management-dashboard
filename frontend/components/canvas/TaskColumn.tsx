
// import React from "react";
// import Image, { StaticImageData } from "next/image";
// import TaskCard from "./TaskCard"; // Import the TaskCard component you converted
// import Todo from "../assets/direct-hit.png"; // Import your icon asset

// interface Task {
//   task: string;
//   tags: string[];
//   status: string;
// }

// interface TaskColumnProps {
//   title: string;
//   icon: StaticImageData; // Update the icon type to StaticImageData
//   tasks: Task[];
//   status: string;
//   handleDelete: (index: number) => void;
// }

// const TaskColumn: React.FC<TaskColumnProps> = ({ title, icon, tasks, status, handleDelete }) => {
//   return (
//     <section className="w-full p-4 border border-gray-300 rounded-lg">
//       <h2 className="flex items-center text-xl font-semibold mb-4">
//         <Image src={icon} alt={title} width={30} height={30} className="mr-2" />
//         {title}
//       </h2>

//       {tasks.map((task, index) =>
//         task.status === status ? (
//           <TaskCard
//             key={index}
//             title={task.task}
//             tags={task.tags}
//             handleDelete={handleDelete}
//             index={index}
//           />
//         ) : null
//       )}
//     </section>
//   );
// };

// export default TaskColumn;



















// TaskColumn.tsx
import React from 'react';
import TaskCard from './TaskCard';
import { Task } from '@/types/task';
import DropArea from './DropArea';


type OnDropType = (status: 'todo' | 'inprogress' | 'completed', index: number) => void;


interface TaskColumnProps {
  title: string;
  status: 'todo' | 'inprogress' | 'completed';
  tasks: Task[];
  handleDelete: (id: string) => void;
  setActiveCard: (index: number | null) => void; 
  onDrop: OnDropType 
}

const TaskColumn: React.FC<TaskColumnProps> = ({ title, status, tasks, handleDelete, setActiveCard, onDrop }) => {
  const filteredTasks = tasks.filter((task) => task.status === status);

  return (
    <div className="w-1/3 px-4">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <DropArea onDrop={() => onDrop(status, -1)} />

      {filteredTasks.length > 0 ? (
        filteredTasks.map((task, index ) => (
            <React.Fragment key={task.id}>
                <TaskCard key={task.id} task={task} handleDelete={handleDelete} setActiveCard={setActiveCard} index={index} />
                <DropArea onDrop= {()=>{ onDrop(status, index+1)}} />
            </React.Fragment>
        ))
      ) : (
        <p className="text-gray-500">No tasks here!</p>
      )}
    </div>
  );
};

export default TaskColumn;
