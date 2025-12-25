import { useTaskContext } from '../context/TaskContext';
import TaskItem from './TaskItem';
import './TaskList.css';

function TaskList() {
  const { tasks, taskStats, searchTerm, filter } = useTaskContext();

  // Empty state when no tasks exist
  if (taskStats.total === 0) {
    return (
      <div className="task-list">
        <div className="empty-state">
          <div className="empty-icon">📝</div>
          <h3>No tasks yet</h3>
          <p>Add your first task to get started!</p>
        </div>
      </div>
    );
  }

  // No results state when filtered/searched
  if (tasks.length === 0) {
    return (
      <div className="task-list">
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <h3>No tasks found</h3>
          <p>
            {searchTerm
              ? `No tasks match "${searchTerm}"`
              : `No ${filter} tasks`}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="task-list">
      <div className="task-stats">
        <div className="stat-item">
          <span className="stat-label">Total</span>
          <span className="stat-value">{taskStats.total}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Completed</span>
          <span className="stat-value completed">{taskStats.completed}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Pending</span>
          <span className="stat-value pending">{taskStats.pending}</span>
        </div>
      </div>

      <div className="tasks-container">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

export default TaskList;
