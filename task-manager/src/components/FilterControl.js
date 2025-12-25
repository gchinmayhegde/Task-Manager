import { useTaskContext } from '../context/TaskContext';
import { FILTER_OPTIONS } from '../utils/constants';
import './FilterControl.css';

function FilterControl() {
  const { 
    filter, 
    setFilter, 
    searchTerm, 
    setSearch, 
    undoTask, 
    canUndo,
    clearAllTasks,
    allTasks
  } = useTaskContext();

  const filterButtons = [
    { value: FILTER_OPTIONS.ALL, label: 'All' },
    { value: FILTER_OPTIONS.COMPLETED, label: 'Completed' },
    { value: FILTER_OPTIONS.PENDING, label: 'Pending' }
  ];

  return (
    <div className="filter-controls">
      <div className="search-section">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tasks..."
          className="search-input"
          aria-label="Search tasks"
        />
      </div>

      <div className="filter-section">
        <label>Filter:</label>
        <div className="filter-buttons">
          {filterButtons.map(({ value, label }) => (
            <button
              key={value}
              className={filter === value ? 'active' : ''}
              onClick={() => setFilter(value)}
              aria-pressed={filter === value}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="action-section">
        <button
          onClick={undoTask}
          disabled={!canUndo}
          className="undo-btn"
          title="Undo last action"
        >
          ↶ Undo
        </button>
        <button
          onClick={clearAllTasks}
          disabled={allTasks.length === 0}
          className="clear-btn"
          title="Clear all tasks"
        >
          Clear All
        </button>
      </div>
    </div>
  );
}

export default FilterControl;
