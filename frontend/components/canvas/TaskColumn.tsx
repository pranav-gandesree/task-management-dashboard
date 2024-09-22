



// // TaskColumn.tsx
// import React from 'react';
// import TaskCard from './TaskCard';
// import { Task } from '@/types/task';
// import DropArea from './DropArea';


// type OnDropType = (status: 'todo' | 'inprogress' | 'completed', index: number) => void;


// interface TaskColumnProps {
//   title: string;
//   status: 'todo' | 'inprogress' | 'completed';
//   tasks: Task[];
//   handleDelete: (id: string) => void;
//   setActiveCard: (index: number | null) => void; 
//   onDrop: OnDropType 
// }

// const TaskColumn: React.FC<TaskColumnProps> = ({ title, status, tasks, handleDelete, setActiveCard, onDrop }) => {
//   const filteredTasks = tasks.filter((task) => task.status === status);

//   return (
//     <div className="w-1/3 px-4">
//       <h2 className="text-2xl font-bold mb-4">{title}</h2>
//       <DropArea onDrop={() => onDrop(status, -1)} />

//       {filteredTasks.length > 0 ? (
//         filteredTasks.map((task, index ) => (
//             <React.Fragment key={task.id}>
//                 <TaskCard key={task.id} task={task} handleDelete={handleDelete} setActiveCard={setActiveCard} index={index} />
//                 <DropArea onDrop= {()=>{ onDrop(status, index+1)}} />
//             </React.Fragment>
//         ))
//       ) : (
//         <p className="text-gray-500">No tasks here!</p>
//       )}
//     </div>
//   );
// };

// export default TaskColumn;









import React from 'react'
import TaskCard from './TaskCard'
import { Task } from '@/types/task'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type OnDropType = (status: 'todo' | 'inprogress' | 'completed', index: number) => void

interface TaskColumnProps {
  title: string
  status: 'todo' | 'inprogress' | 'completed'
  tasks: Task[]
  handleDelete: (id: string) => void
  setActiveCard: (index: number | null) => void
  onDrop: OnDropType
}

const TaskColumn: React.FC<TaskColumnProps> = ({ title, status, tasks, handleDelete, setActiveCard, onDrop }) => {
  const filteredTasks = tasks.filter((task) => task.status === status)

  return (
    <Card className="h-full bg-transparent text-white border border-none">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => onDrop(status, -1)}
        >
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task, index) => (
              <React.Fragment key={task.id}>
                <TaskCard
                  task={task}
                  handleDelete={handleDelete}
                  setActiveCard={setActiveCard}
                  index={tasks.findIndex(t => t.id === task.id)}
                />
                <motion.div
                  className="h-2"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => onDrop(status, index + 1)}
                />
              </React.Fragment>
            ))
          ) : (
            <p className="text-gray-500 text-center">No tasks here!</p>
          )}
        </motion.div>
      </CardContent>
    </Card>
  )
}

export default TaskColumn