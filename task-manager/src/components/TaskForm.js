import { useTaskContext } from '../context/TaskContext';
import { useForm } from '../hooks/useForm';
import { PRIORITY_LEVELS } from '../utils/constants';
import { validateTask } from '../utils/helpers';
import './TaskForm.css';

function TaskForm() {
  const { addTask } = useTaskContext();
  
  const { values, handleChange, resetForm } = useForm({
    title: '',
    description: '',
    priority: PRIORITY_LEVELS.MEDIUM
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateTask(values)) {
      return;
    }

    addTask(values);
    resetForm();
  };

  const isSubmitDisabled = !values.title.trim();

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
          value={values.title}
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
          value={values.description}
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
          value={values.priority}
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
