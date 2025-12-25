import { createContext,useContext,useReducer } from "react";

//Initial State of Application

const initialState = {
  tasks:[
    {
    id:1,
    title:"Learn Machine Learning",
    description:"Understand prediction using ML",
    completed:false,
    priority:"high",
    createdAt:new Date().toISOString  
    },
    {
    id:2,
    title:"Learn Deep Learning",
    description:"Understand Neural Networks",
    completed:false,
    priority:"medium",
    createdAt:new Date().toISOString  
    },
  ],
  filter:'all', //all,completed or pending
  searchTerm:'',
  isLoading:false,
  history:[]  //for UNDO Functionality
};

//Action types = using constant prevent typos
export const ACTIONS = {
  ADD_TASK:'ADD_TASK',
  DELETE_TASK:'DELETE_TASK',
  TOGGLE_TASK:'TOGGLE_TASK',
  EDIT_TASK:'EDIT_TASK',
  SET_FILTER:'SET_FILTER',
  SET_SEARCH:'SET_SEARCH',
  UNDO_TASK:'UNDO_TASK',
  SET_LOADING:'SET_LOADING'
};

const taskReducer = (state,action)=>{

  //always save current state to history before making any changes
  const saveToHistory = (currentState)=>({
    ...currentState,
    history:[currentState,...currentState.history.slice(0,9)] //Keep last 10 states
  });

  switch(action.type){

    case ACTIONS.ADD_TASK:
      const newTask = {
        id:Date.now(),
        title: action.payload.title,
        description: action.payload.description,
        completed:false,
        priority:action.payload.priority || "medium",
        createdAt: new Date().toISOString()
      };

      return saveToHistory({
        ...state,
        tasks:[...state.tasks,newTask]
      });

      case ACTIONS.DELETE_TASK:
        return saveToHistory({
          ...state,
          tasks:state.tasks.filter(task => task.id !== action.payload)
        });

      case ACTIONS.TOGGLE_TASK:
        return saveToHistory({
          ...state,
          tasks:state.tasks.map(task=>
                task.id === action.payload ? {...task, completed:!task.completed}:task
          )
        });
        
      case ACTIONS.EDIT_TASK:
        return saveToHistory({
          ...state,
          tasks: state.tasks.map(task=>
            task.id === action.payload ? {...task, ...action.payload.updates}:task
          )
        });
        
      case ACTIONS.SET_FILTER:
        return {
          ...state,
          filter:action.payload
        };
        
      case ACTIONS.SET_SEARCH:
        return{
          ...state,
          searchTerm:action.payload
        };
        
      case ACTIONS.UNDO_TASK:
        if(state.history.length > 0){
          const [previousState,...restHistory]=state.history;
        return{
          ...previousState,
          history:restHistory
        }
      }
      return state;  
      
      case ACTIONS.SET_LOADING:
        return {
          ...state,
          isLoading:action.payload
        }
       
      default:
        throw new Error(`Unhandled Action Type : ${action.type}`);  
  }
}


//1. Context Creation
const TaskContext = createContext();

//2. Use Custom Hooks for Easier Usage

export const useTaskContext = ()=>{
  const context = useContext(TaskContext);
  if(!context){
    throw new Error('useTaskContext must be within the TaskProvider!!');
  }
  return context;
}

// 3. Task Provider

export const TaskProvider = ({children})=>{

  const [state,dispatch] = useReducer(taskReducer,initialState);
  
  const addTask = (taskData)=>{
    dispatch({type:ACTIONS.ADD_TASK,payload:taskData})
  }  

  const deleteTask = (taskId)=>{
    dispatch({type:ACTIONS.DELETE_TASK,payload:taskId})
  } 

  const toggleTask = (taskId)=>{
    dispatch({type:ACTIONS.TOGGLE_TASK,payload:taskId})
  }; 

  const editTask = (taskId,updates)=>{
    dispatch({type:ACTIONS.EDIT_TASK,payload:{id:taskId,updates}})
  };
  
  const setFilter = (filter)=>{
    dispatch({type:ACTIONS.SET_FILTER,payload:filter})
  }; 

  const setSearch = (searchTerm)=>{
    dispatch({type:ACTIONS.SET_SEARCH,payload:searchTerm})
  }; 

  const undoTask = ()=>{
    dispatch({type:ACTIONS.UNDO_TASK})
  };
  
  //Derived State- Computed Values based on current state

  const filteredTasks = state.tasks.filter(tasks=>{
    const matchesFilter = state.filter === 'all' ||
    (state.filter === 'completed' && tasks.completed) ||
    (state.filter === 'pending' && !tasks.completed);

    const matchesSearch = state.searchTerm === '' || tasks.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
    tasks.description.toLowerCase().includes(state.searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  })

  const taskStats = {
    total:state.tasks.length,
    completed:state.tasks.filter(task=>task.completed).length,
    pending:state.tasks.filter(task=>!task.completed).length
  }
  const value = {
    //state
    tasks:filteredTasks,
    filter:state.filter,
    searchTerm:state.searchTerm,
    isLoading:state.isLoading,
    taskStats,
    canUndo:state.history.length > 0,

    //actions
    addTask,
    deleteTask,
    toggleTask,
    editTask,
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
