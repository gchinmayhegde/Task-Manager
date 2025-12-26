import { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { getPriorityColor, formatDate } from '../utils/helpers';
import { PRIORITY_LEVELS } from '../utils/constants';
import './TaskItem.css';

function TaskItem({ task }) {
  const { toggleTask, deleteTask, editTask } = useTaskContext();
  const [isEditing, setIsEditing] = useState(false);
  
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description,
    priority: task.priority
  });

  const handleEdit = () => {
    if (editData.title.trim()) {
      editTask(task.id, editData);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditData({
      title: task.title,
      description: task.description,
      priority: task.priority
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(task.id);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Editing mode UI
  if (isEditing) {
    return (
      <div className="task-item editing">
        <div className="edit-form">
          <input
            type="text"
            name="title"
            value={editData.title}
            onChange={handleChange}
            placeholder="Task title..."
            autoFocus
          />

          <textarea
            name="description"
            value={editData.description}
            onChange={handleChange}
            placeholder="Task description..."
            rows="3"
          />

          <select
            name="priority"
            value={editData.priority}
            onChange={handleChange}
          >
            <option value={PRIORITY_LEVELS.LOW}>Low</option>
            <option value={PRIORITY_LEVELS.MEDIUM}>Medium</option>
            <option value={PRIORITY_LEVELS.HIGH}>High</option>
          </select>

          <div className="edit-actions">
            <button onClick={handleEdit} className="save-btn">
              Save
            </button>
            <button onClick={handleCancel} className="cancel-btn">
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Display mode UI
  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        <div className="task-header">
          <h3>{task.title}</h3>
          <span
            className="priority-badge"
            style={{ backgroundColor: getPriorityColor(task.priority) }}
          >
            {task.priority}
          </span>
        </div>

        {task.description && (
          <p className="task-description">{task.description}</p>
        )}

        <div className="task-metadata">
          <small>Created: {formatDate(task.createdAt)}</small>
        </div>

        <div className="task-actions">
          <button
            onClick={() => toggleTask(task.id)}
            className={`toggle-btn ${task.completed ? 'completed' : ''}`}
            title={task.completed ? 'Mark as pending' : 'Mark as completed'}
          >
            {task.completed ? '✓ Completed' : '○ Pending'}
          </button>
          <button
            onClick={() => setIsEditing(true)}
            className="edit-btn"
            title="Edit task"
          >
            ✎ Edit
          </button>
          <button
            onClick={handleDelete}
            className="delete-btn"
            title="Delete task"
          >
            ✕ Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskItem;