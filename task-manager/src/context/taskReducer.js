import { ACTIONS } from '../utils/constants';
import { generateId } from '../utils/helpers';

const saveToHistory = (currentState) => {
  // Create a snapshot of the current state before changes
  const snapshot = {
    tasks: [...currentState.tasks],
    filter: currentState.filter
  };
  
  return {
    ...currentState,
    history: [snapshot, ...currentState.history.slice(0, 9)] // Keep last 10 states
  };
};

export const taskReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TASK: {
      const newTask = {
        id: generateId(),
        title: action.payload.title,
        description: action.payload.description || '',
        completed: false,
        priority: action.payload.priority || 'medium',
        createdAt: new Date().toISOString()
      };

      const newState = saveToHistory(state);
      return {
        ...newState,
        tasks: [...state.tasks, newTask]
      };
    }

    case ACTIONS.DELETE_TASK: {
      const newState = saveToHistory(state);
      return {
        ...newState,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      };
    }

    case ACTIONS.TOGGLE_TASK: {
      const newState = saveToHistory(state);
      return {
        ...newState,
        tasks: state.tasks.map(task =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        )
      };
    }

    case ACTIONS.EDIT_TASK: {
      const newState = saveToHistory(state);
      return {
        ...newState,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id
            ? { ...task, ...action.payload.updates }
            : task
        )
      };
    }

    case ACTIONS.CLEAR_ALL_TASKS: {
      const newState = saveToHistory(state);
      return {
        ...newState,
        tasks: []
      };
    }

    case ACTIONS.SET_FILTER:
      return {
        ...state,
        filter: action.payload
      };

    case ACTIONS.SET_SEARCH:
      return {
        ...state,
        searchTerm: action.payload
      };

    case ACTIONS.UNDO_TASK:
      if (state.history.length > 0) {
        const [previousState, ...restHistory] = state.history;
        return {
          ...state,
          tasks: previousState.tasks,
          filter: previousState.filter,
          history: restHistory
        };
      }
      return state;

    case ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};