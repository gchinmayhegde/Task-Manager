// Action types for task reducer
export const ACTIONS = {
  ADD_TASK: 'ADD_TASK',
  DELETE_TASK: 'DELETE_TASK',
  TOGGLE_TASK: 'TOGGLE_TASK',
  EDIT_TASK: 'EDIT_TASK',
  SET_FILTER: 'SET_FILTER',
  SET_SEARCH: 'SET_SEARCH',
  UNDO_TASK: 'UNDO_TASK',
  SET_LOADING: 'SET_LOADING',
  CLEAR_ALL_TASKS: 'CLEAR_ALL_TASKS'
};

// Filter options
export const FILTER_OPTIONS = {
  ALL: 'all',
  COMPLETED: 'completed',
  PENDING: 'pending'
};

// Priority levels
export const PRIORITY_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high'
};

// Initial state for the application
export const initialState = {
  tasks: [],
  filter: FILTER_OPTIONS.ALL,
  searchTerm: '',
  isLoading: false,
  history: [] // For UNDO functionality
};
