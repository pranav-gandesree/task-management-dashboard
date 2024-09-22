


'use client'

import { useState, useEffect } from 'react'
import { useTaskContext } from '@/context/TaskContext'
import { Task, TaskStatus, TaskPriority } from '@/types/task'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DialogDescription } from "@radix-ui/react-dialog";
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useUser } from '@/context/UserContext'
import { redirect } from 'next/navigation'

export default function TaskListPage() {
  const { tasks, addTask, updateTask, deleteTask, setTasks } = useTaskContext()
  const [filter, setFilter] = useState<TaskStatus | 'All'>('All')
  const [sort, setSort] = useState<'createdAt' | 'title'>('createdAt')
  const [isAddingTask, setIsAddingTask] = useState(false)
  const [newTask, setNewTask] = useState({
    title: '', 
    description: '', 
    status: 'todo' as TaskStatus,
    priority: 'low' as TaskPriority
  })
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [fetchedTasks, setFetchedTasks] = useState<Task[]>([])

  const { user } = useUser();

    // Include user ID in the newTask object
    const taskToAdd = {
      ...newTask,
      userId: user?.id // Add user ID if user is defined
    };
  

  if (!user) {
    redirect('/signin')
  }



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
}, [setTasks]);


  const filteredTasks = fetchedTasks
    .filter(task => filter === 'All' || task.status === filter)
    .sort((a, b) => sort === 'createdAt'
      ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      : a.title.localeCompare(b.title)
    )


    const handleAddTask = async () => {
      const token = localStorage.getItem('token');
      
      try {
        const response = await fetch('http://localhost:4000/api/tasks/addtask', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(taskToAdd)
        });
        
        if (!response.ok) {
          throw new Error('Failed to add task');
        }
    
        const result = await response.json();
        setFetchedTasks(prevTasks => [...prevTasks, result]);
        // setNewTask({ title: '', description: '', status: 'todo', priority: 'low' });
           // Add the task to the TaskContext
       addTask(result);
        setIsAddingTask(false);
      } catch (error) {
        console.error(error);
        // Optionally, display an error message to the user
      }
    };
    


  const handleUpdateTask = async () => {
    if (editingTask) {
      await fetch(`/api/tasks/${editingTask.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingTask)
      })
      setFetchedTasks(prevTasks => prevTasks.map(task => task.id === editingTask.id ? editingTask : task))
      setEditingTask(null)
    }
  }

  const handleDeleteTask = async (taskId: string) => {
    await fetch(`/api/tasks/deletetasks/${taskId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })
    setFetchedTasks(prevTasks => prevTasks.filter(task => task.id !== taskId))
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Task List</h1>
      <h1>Welcome, {user?.username}!</h1>
      <p>Email: {user?.email}</p>
      <div className="flex justify-between items-center">
        <div className="space-x-2">
          <Select onValueChange={(value) => setFilter(value as TaskStatus | 'All')}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="todo">To Do</SelectItem>
              <SelectItem value="inrogress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={(value) => setSort(value as 'createdAt' | 'title')}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="createdAt">Date Created</SelectItem>
              <SelectItem value="title">Title</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Dialog open={isAddingTask} onOpenChange={setIsAddingTask}>
          <DialogTrigger asChild>
            <Button>Add Task</Button>
          </DialogTrigger>
          <DialogContent>
          <DialogHeader>

    <DialogTitle>Add New Task</DialogTitle>
    <DialogDescription>Please fill out the form below to add a new task.</DialogDescription>
  </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select onValueChange={(value) => setNewTask({ ...newTask, status: value as TaskStatus })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todoo">To Do</SelectItem>
                    <SelectItem value="inprogress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="priority">Priority</Label>
                <Select onValueChange={(value) => setNewTask({ ...newTask, priority: value as TaskPriority })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleAddTask}>Add Task</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>{task.title}</TableCell>
              <TableCell>{task.description}</TableCell>
              <TableCell>{task.status}</TableCell>
              <TableCell>{task.priority}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="mr-2">Edit</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Task</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="edit-title">Title</Label>
                        <Input
                          id="edit-title"
                          value={editingTask?.title || ''}
                          onChange={(e) => setEditingTask(prev => prev ? { ...prev, title: e.target.value } : null)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="edit-description">Description</Label>
                        <Textarea
                          id="edit-description"
                          value={editingTask?.description || ''}
                          onChange={(e) => setEditingTask(prev => prev ? { ...prev, description: e.target.value } : null)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="edit-status">Status</Label>
                        <Select onValueChange={(value) => setEditingTask(prev => prev ? { ...prev, status: value as TaskStatus } : null)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="todo">To Do</SelectItem>
                            <SelectItem value="inprogress">In Progress</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="edit-priority">Priority</Label>
                        <Select onValueChange={(value) => setEditingTask(prev => prev ? { ...prev, priority: value as TaskPriority } : null)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button onClick={handleUpdateTask}>Update Task</Button>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button variant="destructive" onClick={() => handleDeleteTask(task.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
