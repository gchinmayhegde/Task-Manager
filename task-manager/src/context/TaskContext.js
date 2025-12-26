import { createContext, useContext, useReducer, useMemo } from 'react';
import { taskReducer } from './taskReducer';
import { initialState, ACTIONS } from '../utils/constants';
import { filterTasks, calculateTaskStats } from '../utils/helpers';

// Creating Context
const TaskContext = createContext();

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within TaskProvider');
  }
  return context;
};

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // Action creators
  const addTask = (taskData) => {
    dispatch({ type: ACTIONS.ADD_TASK, payload: taskData });
  };

  const deleteTask = (taskId) => {
    dispatch({ type: ACTIONS.DELETE_TASK, payload: taskId });
  };

  const toggleTask = (taskId) => {
    dispatch({ type: ACTIONS.TOGGLE_TASK, payload: taskId });
  };

  const editTask = (taskId, updates) => {
    dispatch({ type: ACTIONS.EDIT_TASK, payload: { id: taskId, updates } });
  };

  const clearAllTasks = () => {
    dispatch({ type: ACTIONS.CLEAR_ALL_TASKS });
  };

  const setFilter = (filter) => {
    dispatch({ type: ACTIONS.SET_FILTER, payload: filter });
  };

  const setSearch = (searchTerm) => {
    dispatch({ type: ACTIONS.SET_SEARCH, payload: searchTerm });
  };

  const undoTask = () => {
    dispatch({ type: ACTIONS.UNDO_TASK });
  };

  // Memoized computed values
  const filteredTasks = useMemo(
    () => filterTasks(state.tasks, state.filter, state.searchTerm),
    [state.tasks, state.filter, state.searchTerm]
  );

  const taskStats = useMemo(
    () => calculateTaskStats(state.tasks),
    [state.tasks]
  );

  const value = {
    // State
    tasks: filteredTasks,
    allTasks: state.tasks,
    filter: state.filter,
    searchTerm: state.searchTerm,
    isLoading: state.isLoading,
    taskStats,
    canUndo: state.history.length > 0,

    // Actions
    addTask,
    deleteTask,
    toggleTask,
    editTask,
    clearAllTasks,
    setFilter,
    setSearch,
    undoTask
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};