
// // TaskCard.tsx
// import React from 'react';
// import { Task } from '@/types/task';

// interface TaskCardProps {
//   task: Task;
//   handleDelete: (id: string) => void;
//   setActiveCard: (index: number | null) => void; 
//   index: number;
// }

// const TaskCard: React.FC<TaskCardProps> = ({ task, handleDelete, setActiveCard, index }) => {
//   return (
//     <div className="bg-white shadow-md rounded-lg p-4 mb-4 cursor-grab active:opacity-70 active:border border-black" draggable onDragStart={()=> setActiveCard(index)} onDragEnd={()=> setActiveCard(null)}>
//       <h3 className="text-xl font-semibold mb-2">{task.title}</h3>
//       <p className="text-gray-600 mb-2">{task.description}</p>
     
//       <button
//         onClick={() => handleDelete(task.id)}
//         className="mt-4 bg-red-500 text-white py-1 px-4 rounded"
//       >
//         Delete
//       </button>
//     </div>
//   );
// };

// export default TaskCard;








import React from 'react'
import { Task } from '@/types/task'
import { motion } from 'framer-motion'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2Icon } from 'lucide-react'

interface TaskCardProps {
  task: Task
  handleDelete: (id: string) => void
  setActiveCard: (index: number | null) => void
  index: number
}

const TaskCard: React.FC<TaskCardProps> = ({ task, handleDelete, setActiveCard, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDragStart={() => setActiveCard(index)}
      onDragEnd={() => setActiveCard(null)}
    >
      <Card className="mb-2 cursor-grab active:cursor-grabbing bg-transparent text-slate-200">
        <CardHeader>
          <CardTitle>{task.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">{task.description}</p>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button variant="destructive" size="sm" onClick={() => handleDelete(task.id)}>
            <Trash2Icon className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

export default TaskCard
