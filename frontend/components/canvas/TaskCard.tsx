// import React from "react";
// import { Button } from "@/components/ui/button"; 
// import Image from "next/image"; 
// import deleteIcon from "../assets/delete.png";

// interface TaskCardProps {
//   title: string;
//   tags: string[];
//   handleDelete: (index: number) => void;
//   index: number;
// }

// const TaskCard: React.FC<TaskCardProps> = ({ title, tags, handleDelete, index }) => {
//   return (
//     <article className="w-full min-h-[100px] border border-gray-300 rounded-lg p-4 my-4">
//       <p className="text-lg font-semibold mb-4">{title}</p>

//       <div className="flex items-center justify-between">
//         <div className="flex space-x-2">
//           {tags.map((tag, idx) => (
//             <span 
//               key={idx} 
//               className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm">
//               {tag}
//             </span>
//           ))}
//         </div>

//         <Button 
//           variant="ghost" 
//           className="p-2 rounded-full hover:bg-gray-200" 
//           onClick={() => handleDelete(index)}
//         >
//           <Image src={deleteIcon} alt="delete" width={20} height={20} className="opacity-50 hover:opacity-80 transition-opacity" />
//         </Button>
//       </div>
//     </article>
//   );
// };

// export default TaskCard;


















// TaskCard.tsx
import React from 'react';
import { Task } from '@/types/task';

interface TaskCardProps {
  task: Task;
  handleDelete: (id: string) => void;
  setActiveCard: (index: number | null) => void; 
  index: number;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, handleDelete, setActiveCard, index }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 cursor-grab active:opacity-70 active:border border-black" draggable onDragStart={()=> setActiveCard(index)} onDragEnd={()=> setActiveCard(null)}>
      <h3 className="text-xl font-semibold mb-2">{task.title}</h3>
      <p className="text-gray-600 mb-2">{task.description}</p>
     
      <button
        onClick={() => handleDelete(task.id)}
        className="mt-4 bg-red-500 text-white py-1 px-4 rounded"
      >
        Delete
      </button>
    </div>
  );
};

export default TaskCard;
