// "use client"

// import { useEffect, useState } from "react";
// import { Draggable, DropResult, Droppable } from "react-beautiful-dnd";
// import { DndContext } from '@/context/DndContext'

// interface Task {
//   id: number;
//   name: string;
//   status: "todo" | "inProgress" | "completed";
// }

// interface Column {
//   id: number;
//   title: string;
//   components: Task[];
// }

// const KanbanBoard = () => {
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [data, setData] = useState<Column[]>([
//     { id: 0, title: "To Do", components: [] },
//     { id: 1, title: "In Progress", components: [] },
//     { id: 2, title: "Completed", components: [] },
//   ]);

//   useEffect(() => {
//     const fetchTasks = async () => {
//       const token = localStorage.getItem("token");
//       try {
//         const response = await fetch("http://localhost:4000/api/tasks/gettasks", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch tasks");
//         }

//         const fetchedTasks = await response.json();
//         console.log("Fetched Tasks: ", fetchedTasks);  // Check if tasks are fetched correctly
//         setTasks(fetchedTasks);
//       } catch (error) {
//         console.error("Error fetching tasks:", error);
//       }
//     };

//     fetchTasks();
//   }, []);

//   // Group tasks by their status
//   useEffect(() => {
//     if (tasks.length) {
//       console.log("Grouping tasks by status...");
//       const groupedTasks: Column[] = [
//         { id: 0, title: "To Do", components: tasks.filter(task => task.status === "todo") },
//         { id: 1, title: "In Progress", components: tasks.filter(task => task.status === "inProgress") },
//         { id: 2, title: "Completed", components: tasks.filter(task => task.status === "completed") },
//       ];
//       console.log("Grouped Tasks: ", groupedTasks);  // Check if tasks are grouped correctly
//       setData(groupedTasks);
//     }
//   }, [tasks]);

//   const onDragEnd = (result: DropResult) => {
//     const { source, destination } = result;
//     if (!destination) return;

//     if (source.droppableId !== destination.droppableId) {
//       const newData = [...data];
//       const oldDroppableIndex = parseInt(source.droppableId.split("droppable")[1]);
//       const newDroppableIndex = parseInt(destination.droppableId.split("droppable")[1]);

//       const [item] = newData[oldDroppableIndex].components.splice(source.index, 1);
//       newData[newDroppableIndex].components.splice(destination.index, 0, item);

//       setData([...newData]);
//     } else {
//       const newData = [...data];
//       const droppableIndex = parseInt(source.droppableId.split("droppable")[1]);

//       const [item] = newData[droppableIndex].components.splice(source.index, 1);
//       newData[droppableIndex].components.splice(destination.index, 0, item);

//       setData([...newData]);
//     }
//   };

//   return (
//     <DndContext onDragEnd={onDragEnd}>
//       <h1 className="text-center mt-8 mb-3 font-bold text-[25px]">Drag and Drop Application</h1>
//       <div className="flex gap-4 justify-between my-20 mx-4 flex-col lg:flex-row">
//         {data.map((column, index) => (
//           <Droppable key={index} droppableId={`droppable${index}`}>
//             {(provided) => (
//               <div
//                 className="p-5 lg:w-1/3 w-full bg-white border-gray-400 border border-dashed"
//                 {...provided.droppableProps}
//                 ref={provided.innerRef}
//               >
//                 <h2 className="text-center font-bold mb-6 text-black">{column.title}</h2>
//                 {column.components?.map((task, index) => (
//                   task?.id ? (
//                     <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
//                       {(provided) => (
//                         <div
//                           className="bg-gray-200 mx-1 px-4 py-3 my-3"
//                           {...provided.dragHandleProps}
//                           {...provided.draggableProps}
//                           ref={provided.innerRef}
//                         >
//                           {task.name}
//                         </div>
//                       )}
//                     </Draggable>
//                   ) : null
//                 ))}
//                 {provided.placeholder}
//               </div>
//             )}
//           </Droppable>
//         ))}
//       </div>
//     </DndContext>
//   );
// };

// export default KanbanBoard;
























import KanbanBoard from '@/components/canvas/KanbanBoard'
import React from 'react'

const page = () => {
  return (
    <div>
      <KanbanBoard/>
    </div>
  )
}

export default page
