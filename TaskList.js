import React, { useState, useEffect } from 'react';
import TaskForm from '../TaskForm';
import TaskItem from '../TaskItem';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (name, description) => {
    const newTask = {
      id: Date.now(),
      name,
      description,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  const editTask = (id, name, description) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, name, description } : task
    ));
    setTaskToEdit(null);
  };

  const deleteTask = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette tâche?')) {
      setTasks(tasks.filter(task => task.id !== id));
    }
  };

  const markAsCompleted = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const startEditing = (task) => {
    setTaskToEdit(task);
  };

  return (
    <div>
      <TaskForm 
        addTask={addTask} 
        editTask={editTask} 
        taskToEdit={taskToEdit} 
      />
      {tasks.map(task => (
        <TaskItem 
          key={task.id} 
          task={task} 
          markAsCompleted={markAsCompleted} 
          deleteTask={deleteTask} 
          startEditing={startEditing} 
        />
      ))}
    </div>
  );
}

export default TaskList;
