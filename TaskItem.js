import React from 'react';

function TaskItem({ task, markAsCompleted, deleteTask, startEditing }) {
  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div>
        <h3>{task.name}</h3>
        <p>{task.description}</p>
      </div>
      <div>
        <button onClick={() => markAsCompleted(task.id)}>
          <i className={task.completed ? 'fas fa-undo' : 'fas fa-check'}></i>
          {task.completed ? 'Non terminé' : 'Terminé'}
        </button>
        <button onClick={() => startEditing(task)}>
          <i className="fas fa-edit"></i>
          Modifier
        </button>
        <button className="delete" onClick={() => deleteTask(task.id)}>
          <i className="fas fa-trash-alt"></i>
          Supprimer
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
