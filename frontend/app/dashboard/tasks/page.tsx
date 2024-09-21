'use client'

import { useState } from 'react'
import { useTaskContext } from '@/context/TaskContext'
import { Task, TaskStatus } from '@/types/task'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function TaskListPage() {
  const { tasks, addTask, updateTask, deleteTask } = useTaskContext()
  const [filter, setFilter] = useState<TaskStatus | 'All'>('All')
  const [sort, setSort] = useState<'createdAt' | 'title'>('createdAt')
  const [isAddingTask, setIsAddingTask] = useState(false)
  const [newTask, setNewTask] = useState({ title: '', description: '', status: 'To Do' as TaskStatus })
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  const filteredTasks = tasks
    .filter(task => filter === 'All' || task.status === filter)
    .sort((a, b) => sort === 'createdAt' 
      ? b.createdAt.getTime() - a.createdAt.getTime()
      : a.title.localeCompare(b.title)
    )

  const handleAddTask = () => {
    addTask(newTask)
    setNewTask({ title: '', description: '', status: 'To Do' })
    setIsAddingTask(false)
  }

  const handleUpdateTask = () => {
    if (editingTask) {
      updateTask(editingTask.id, editingTask)
      setEditingTask(null)
    }
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Task List</h1>
      <div className="flex justify-between items-center">
        <div className="space-x-2">
          <Select onValueChange={(value) => setFilter(value as TaskStatus | 'All')}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="To Do">To Do</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
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
                    <SelectItem value="To Do">To Do</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
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
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>{task.title}</TableCell>
              <TableCell>{task.description}</TableCell>
              <TableCell>{task.status}</TableCell>
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
                            <SelectItem value="To Do">To Do</SelectItem>
                            <SelectItem value="In Progress">In Progress</SelectItem>
                            <SelectItem value="Completed">Completed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button onClick={handleUpdateTask}>Update Task</Button>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button variant="destructive" onClick={() => deleteTask(task.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}