import { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { PRIORITY_LEVELS } from '../utils/constants';
import { validateTask } from '../utils/helpers';
import './TaskForm.css';

function TaskForm() {
  const { addTask } = useTaskContext();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: PRIORITY_LEVELS.MEDIUM
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateTask(formData)) {
      return;
    }

    addTask(formData);
    setFormData({
      title: '',
      description: '',
      priority: PRIORITY_LEVELS.MEDIUM
    });
  };

  const isSubmitDisabled = !formData.title.trim();

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>Add New Task</h2>
      
      <div className="form-group">
        <label htmlFor="title">
          Title <span className="required">*</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter task title"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter task description (optional)"
          rows="3"
        />
      </div>

      <div className="form-group">
        <label htmlFor="priority">Priority</label>
        <select
          id="priority"
          name="priority"
          value={formData.priority}
          onChange={handleChange}
        >
          <option value={PRIORITY_LEVELS.LOW}>Low</option>
          <option value={PRIORITY_LEVELS.MEDIUM}>Medium</option>
          <option value={PRIORITY_LEVELS.HIGH}>High</option>
        </select>
      </div>

      <button 
        type="submit" 
        disabled={isSubmitDisabled} 
        className="add-task-btn"
      >
        Add Task
      </button>
    </form>
  );
}

export default TaskForm;