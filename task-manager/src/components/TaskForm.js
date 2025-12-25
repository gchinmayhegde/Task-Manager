/*
-A Controlled form component that manages its own local state for task title and description inputs.
-integration with context Api to add new tasks globally.
-form validation and UX features
*/ 

import {useState} from 'react';
import {useTaskContext} from '../context/TaskContext';
import './TaskForm.css';

function TaskForm()
{
  const {addTask} = useTaskContext();

  const [formData,setFormData] = useState({
    title:'',
    description:'',
    priority:'medium'
  });

  const handleSubmit = (e)=>{
    e.preventDefault();
    if(!formData.title.trim()) return;
    addTask(formData);

    setFormData({
      title:'',
      description:'',
      priority:'medium'
    });
  }

  const handleChange = (e)=>{
    const {name,value} = e.target;

    setFormData(prev=>({
      ...prev,
      [name]:value
    }));
  }

  return(
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>Add New Task</h2>
      <div className="form-group">
        <label htmlFor='title'>Title *</label>
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
        <label htmlFor='description'>Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter task description"
          rows="3"
        ></textarea>
      </div>

      <div className="form-group">
        <label htmlFor='priority'>Priority</label>
        <select
          id="priority"
          name="priority"
          value={formData.priority}
          onChange={handleChange}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <button type="submit" disabled={!formData.title.trim()} className="add-task-btn">Add Task</button>

    </form>
  )
}  

export default TaskForm;