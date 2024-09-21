

// 'use client'

// import { useEffect } from 'react'
// import { useTaskContext } from '@/context/TaskContext'
// import { Task, TaskStatus } from '@/types/task'
// import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// const columns: TaskStatus[] = ['todo', 'inprogress', 'completed']

// export default function KanbanBoardPage() {
//   const { tasks, setTasks, moveTask } = useTaskContext()

//   useEffect(() => {
//     const fetchTasks = async () => {
//       const token = localStorage.getItem('token')
//       const response = await fetch('http://localhost:4000/api/tasks/gettasks', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         }
//       })

//       if (!response.ok) {
//         console.error('Failed to fetch tasks:', response.statusText)
//         return
//       }

//       const data = await response.json()
//       setTasks(data) // Update context with fetched tasks
//     }

//     fetchTasks()
//   }, [setTasks])

//   const onDragEnd = (result: DropResult) => {
//     const { destination, source, draggableId } = result

//     if (!destination) {
//       return
//     }

//     if (
//       destination.droppableId === source.droppableId &&
//       destination.index === source.index
//     ) {
//       return
//     }

//     const newStatus = destination.droppableId as TaskStatus
//     moveTask(draggableId, newStatus)
//   }

//   return (
//     <div className="space-y-4">
//       <h1 className="text-2xl font-bold">Kanban Board</h1>
//       <DragDropContext onDragEnd={onDragEnd}>
//         <div className="grid grid-cols-3 gap-4">
//           {columns.map((column) => (
//             <Droppable key={column} droppableId={column}>
//               {(provided) => (
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>{column.charAt(0).toUpperCase() + column.slice(1)}</CardTitle>
//                   </CardHeader>
//                   <CardContent 
//                     {...provided.droppableProps} 
//                     ref={provided.innerRef}
//                     className="min-h-[500px]"
//                   >
//                     {tasks
//                       .filter((task) => task.status === column)
//                       .map((task, index) => (
//                         <Draggable key={task.id} draggableId={task.id} index={index}>
//                           {(provided) => (
//                             <Card
//                               ref={provided.innerRef}
//                               {...provided.draggableProps}
//                               {...provided.dragHandleProps}
//                               className="mb-2 p-2"
//                             >
//                               <h3 className="font-semibold">{task.title}</h3>
//                               <p className="text-sm text-gray-500">{task.description}</p>
//                             </Card>
//                           )}
//                         </Draggable>
//                       ))}
//                     {provided.placeholder}
//                   </CardContent>
//                 </Card>
//               )}
//             </Droppable>
//           ))}
//         </div>
//       </DragDropContext>
//     </div>
//   )
// }



















// "use client"

// import { useEffect, useState } from "react";
// import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";

// interface Component {
//     id: number;
//     name: string;
// }

// interface Card {
//     id: number;
//     title: string;
//     components: Component[];
// }

// const KanbanBoard = () => {
//     const [data, setData] = useState<Card[]>([]);

//     const onDragEnd = (result: DropResult) => {
//         const { source, destination } = result;
//         if (!destination) return;

//         const newData = Array.from(data);

//         // Handle dragging between columns
//         if (source.droppableId !== destination.droppableId) {
//             const sourceIndex = parseInt(source.droppableId.replace('droppable', ''), 10);
//             const destIndex = parseInt(destination.droppableId.replace('droppable', ''), 10);
//             const [movedItem] = newData[sourceIndex].components.splice(source.index, 1);
//             newData[destIndex].components.splice(destination.index, 0, movedItem);
//         } else {
//             const droppableIndex = parseInt(source.droppableId.replace('droppable', ''), 10);
//             const [movedItem] = newData[droppableIndex].components.splice(source.index, 1);
//             newData[droppableIndex].components.splice(destination.index, 0, movedItem);
//         }

//         setData(newData);
//     };

//     useEffect(() => {
//         const fetchTasks = async () => {
//             const token = localStorage.getItem('token');
//             const response = await fetch('http://localhost:4000/api/tasks/gettasks', {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`
//                 }
//             });

//             if (!response.ok) {
//                 console.error('Failed to fetch tasks:', response.statusText);
//                 return;
//             }

//             const tasks = await response.json();
//             console.log('Fetched tasks:', tasks); // Check if tasks are fetched correctly
//             setData(tasks);
//         };

//         fetchTasks();
//     }, []);

//     return (
//         <DragDropContext onDragEnd={onDragEnd}>
//             <h1 className="text-center mt-8 mb-3 font-bold text-[25px]">Drag and Drop Application</h1>
//             <div className="flex gap-4 justify-between my-20 mx-4 flex-col lg:flex-row">
//                 {data.map((val) => (
//                     <Droppable key={val.id} droppableId={`droppable${val.id}`}>
//                         {(provided) => (
//                             <div
//                                 className="p-5 lg:w-1/3 w-full bg-white border-gray-400 border border-dashed"
//                                 {...provided.droppableProps}
//                                 ref={provided.innerRef}
//                             >
//                                 <h2 className="text-center font-bold mb-6 text-black">{val.title}</h2>
//                                 {Array.isArray(val.components) && val.components.map((component, index) => (
//                                     <Draggable key={component.id} draggableId={component.id.toString()} index={index}>
//                                         {(provided) => (
//                                             <div
//                                                 className="bg-gray-200 mx-1 px-4 py-3 my-3"
//                                                 {...provided.draggableProps}
//                                                 {...provided.dragHandleProps}
//                                                 ref={provided.innerRef}
//                                             >
//                                                 {component.name}
//                                             </div>
//                                         )}
//                                     </Draggable>
//                                 ))}
//                                 {provided.placeholder}
//                             </div>
//                         )}
//                     </Droppable>
//                 ))}
//             </div>
//         </DragDropContext>
//     );
// };

// export default KanbanBoard;



































// "use client"

// // import { cardsData } from "@/bin/CardsData";
// import { useEffect, useState } from "react";
// import { Draggable, DropResult, Droppable } from "react-beautiful-dnd";
// import { DndContext } from '@/context/DndContext'
// interface Cards {
//     id: number;
//     title: string;
//     components: {
//         id: number;
//         name: string;
//     }[];
// }
// const KanbanBoard = () => {

//   const [tasks,setTasks] = useState();


//   const cardsData = [
//     {
//       id: 0,
//       title: "todo",
//       components: [
//         {
//           id: 100,
//           name: tasks[0]['title']
//         },
//         {
//           id: 200,
//           name: "bootstrap"
//         },
//       ]
//     },
//     {
//       id: 1,
//       title: "inprogress",
//       components: [
//         {
//           id: 300,
//           name: "react"
//         },
//         {
//           id: 400,
//           name: "node"
//         },
//       ]
//     },
//     {
//       id: 2,
//       title: "completed",
//       components: [
//         {
//           id: 500,
//           name: "redux"
//         },
//         {
//           id: 600,
//           name: "recoil"
//         },
//       ]
//     }
  
  
//   ]
  



//     const [data, setData] = useState<Cards[] | []>([])
//     const onDragEnd = (result: DropResult) => {
//         const { source, destination } = result;
//         if (!destination) return;
//         if (source.droppableId !== destination.droppableId) {
//             const newData = [...JSON.parse(JSON.stringify(data))];//shallow copy concept
//             const oldDroppableIndex = newData.findIndex(x => x.id == source.droppableId.split("droppable")[1]);
//             const newDroppableIndex = newData.findIndex(x => x.id == destination.droppableId.split("droppable")[1])
//             const [item] = newData[oldDroppableIndex].components.splice(source.index, 1);
//             newData[newDroppableIndex].components.splice(destination.index, 0, item);
//             setData([...newData]);
//         } else {
//             const newData = [...JSON.parse(JSON.stringify(data))];//shallow copy concept
//             const droppableIndex = newData.findIndex(x => x.id == source.droppableId.split("droppable")[1]);
//             const [item] = newData[droppableIndex].components.splice(source.index, 1);
//             newData[droppableIndex].components.splice(destination.index, 0, item);
//             setData([...newData]);
//         }
//     };


//     useEffect(() => {
//         setData(cardsData)
//     }, [])




//      useEffect(() => {
//         const fetchTasks = async () => {
//             const token = localStorage.getItem('token');
//             const response = await fetch('http://localhost:4000/api/tasks/gettasks', {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`
//                 }
//             });

//             if (!response.ok) {
//                 console.error('Failed to fetch tasks:', response.statusText);
//                 return;
//             }

//             const tasks = await response.json();
        
//             console.log('Fetched tasks:', tasks); // Check if tasks are fetched correctly
//             setTasks(tasks);
//         };

//         fetchTasks();
//     }, []);




//     return (
//         <DndContext onDragEnd={onDragEnd}>
//             <h1 className="text-center mt-8 mb-3 font-bold text-[25px] ">Drag and Drop Application</h1>
//             <div className="flex gap-4 justify-between my-20 mx-4 flex-col lg:flex-row">
//                 {
//                     data.map((val, index) => {
//                         return (
//                             <Droppable key={index} droppableId={`droppable${index}`}>
//                                 {
//                                     (provided) => (
//                                         <div className="p-5 lg:w-1/3 w-full bg-white  border-gray-400 border border-dashed"
//                                             {...provided.droppableProps}
//                                             ref={provided.innerRef}
//                                         >
//                                             <h2 className="text-center font-bold mb-6 text-black">{val.title}</h2>
//                                             {
//                                                 val.components?.map((component, index) => (
//                                                     <Draggable key={component.id} draggableId={component.id.toString()} index={index}>
//                                                         {
//                                                             (provided) => (
//                                                                 <div className="bg-gray-200 mx-1 px-4 py-3 my-3"
//                                                                     {...provided.dragHandleProps}
//                                                                     {...provided.draggableProps}
//                                                                     ref={provided.innerRef}
//                                                                 >{component.name}</div>
//                                                             )
//                                                         }
//                                                     </Draggable>
//                                                 ))
//                                             }
//                                             {provided.placeholder}
//                                         </div>
//                                     )
//                                 }

//                             </Droppable>
//                         )
//                     })
//                 }


//             </div>
//         </DndContext>
//     )
// };

// export default KanbanBoard;







































"use client"

import { useEffect, useState } from "react";
import { Draggable, DropResult, Droppable } from "react-beautiful-dnd";
import { DndContext } from '@/context/DndContext'

interface Component {
    id: number;
    name: string;
}

interface Cards {
    id: number;
    title: string;
    components: Component[];
}

const KanbanBoard = () => {
    const [tasks, setTasks] = useState<Component[] | undefined>(undefined);

    const cardsData: Cards[] = [
        {
            id: 0,
            title: "Todo",
            components: [],
        },
        {
            id: 1,
            title: "In Progress",
            components: [],
        },
        {
            id: 2,
            title: "Completed",
            components: [],
        }
    ];

    const [data, setData] = useState<Cards[]>(cardsData);

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;
        if (!destination) return;

        const newData = [...data]; // Create a shallow copy

        const oldDroppableIndex = newData.findIndex(x => x.id === parseInt(source.droppableId.split("droppable")[1]));
        const newDroppableIndex = newData.findIndex(x => x.id === parseInt(destination.droppableId.split("droppable")[1]));

        const [item] = newData[oldDroppableIndex].components.splice(source.index, 1);
        newData[newDroppableIndex].components.splice(destination.index, 0, item);

        setData(newData);
    };

    useEffect(() => {
        const fetchTasks = async () => {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:4000/api/tasks/gettasks', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                console.error('Failed to fetch tasks:', response.statusText);
                return;
            }

            const fetchedTasks = await response.json();
            console.log('Fetched tasks:', fetchedTasks); // Check if tasks are fetched correctly

            // Assume tasks come as an array of components; assign them to the first column as an example
            if (Array.isArray(fetchedTasks)) {
                setData(prevData => {
                    const updatedData = [...prevData];
                    updatedData[0].components = fetchedTasks.map(task => ({
                        id: task.id,
                        name: task.title // Assuming the fetched task has a title
                    }));
                    return updatedData;
                });
            }
        };

        fetchTasks();
    }, []);

    return (
        <DndContext onDragEnd={onDragEnd}>
            <h1 className="text-center mt-8 mb-3 font-bold text-[25px]">Drag and Drop Application</h1>
            <div className="flex gap-4 justify-between my-20 mx-4 flex-col lg:flex-row">
                {data.map((val, index) => (
                    <Droppable key={val.id} droppableId={`droppable${val.id}`}>
                        {(provided) => (
                            <div className="p-5 lg:w-1/3 w-full bg-white border-gray-400 border border-dashed"
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                <h2 className="text-center font-bold mb-6 text-black">{val.title}</h2>
                                {val.components?.map((component, index) => {
                                    // Check if component and component.id are defined
                                    if (!component || component.id === undefined) {
                                        console.warn('Invalid component found:', component);
                                        return null; // Skip rendering this component
                                    }

                                    return (
                                        <Draggable key={component.id} draggableId={component.id.toString()} index={index}>
                                            {(provided) => (
                                                <div className="bg-gray-200 mx-1 px-4 py-3 my-3"
                                                    {...provided.dragHandleProps}
                                                    {...provided.draggableProps}
                                                    ref={provided.innerRef}
                                                >
                                                    {component.name}
                                                </div>
                                            )}
                                        </Draggable>
                                    );
                                })}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                ))}
            </div>
        </DndContext>
    );
};

export default KanbanBoard;
