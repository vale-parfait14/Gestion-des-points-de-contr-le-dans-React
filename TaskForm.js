import React, { useState, useEffect } from 'react';

function TaskForm({ addTask, editTask, taskToEdit }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (taskToEdit) {
      setName(taskToEdit.name);
      setDescription(taskToEdit.description);
    } else {
      setName('');
      setDescription('');
    }
  }, [taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !description) {
      setError('Les deux champs doivent être remplis');
      return;
    }
    if (taskToEdit) {
      editTask(taskToEdit.id, name, description);
    } else {
      addTask(name, description);
    }
    setName('');
    setDescription('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Nom de la tâche" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      <textarea 
        placeholder="Description de la tâche" 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
      />
      {error && <p className="error">{error}</p>}
      <button type="submit">
        <i className="fas fa-save"></i>
        {taskToEdit ? 'Modifier' : 'Ajouter'} la tâche
      </button>
    </form>
  );
}

export default TaskForm;
