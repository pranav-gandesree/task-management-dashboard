'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { Task, TaskStatus } from '@/types/task'

interface TaskContextType {
  tasks: Task[]
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void
  updateTask: (id: string, updates: Partial<Task>) => void
  deleteTask: (id: string) => void
  moveTask: (id: string, newStatus: TaskStatus) => void
  setTasks: (tasks: Task[]) => void
}

const TaskContext = createContext<TaskContextType | undefined>(undefined)

export const useTaskContext = () => {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider')
  }
  return context
}

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks')
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date(),
    }
    setTasks([...tasks, newTask])
  }

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, ...updates } : task))
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const moveTask = (id: string, newStatus: TaskStatus) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, status: newStatus } : task))
  }

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, moveTask,setTasks }}>
      {children}
    </TaskContext.Provider>
  )
}






























