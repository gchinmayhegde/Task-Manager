import { useState } from "react";
import { useTaskContext } from "../context/TaskContext";
import "./TaskItem.css";

function TaskItem({task}) {
  const {toggleTask,deleteTask,editTask} = useTaskContext();
  const [isEditing,setIsEditing] = useState(false);
  const [editData,setEditData] = useState({
    title:task.title,
    description:task.description,
    priority:task.priority
  });

  const handlEdit = ()=>{
    editTask(task.id,editData);
    setIsEditing(false);
  };

  const handleCancel = ()=>{
    setIsEditing(false);
    setEditData({
      title:task.title,
      description:task.description,
      priority:task.priority
    });
  }

  const getPriorityColor = (priority)=>{
    switch(priority){
      case 'high':
        return '#ff2828ff';
      case 'medium':
        return '#ff7700ff';
      case 'low':
        return '#28ff28ff';
      default:
        return '#ccccccff';
    }
  }

  if(isEditing){
    return(
      <div className="task-item editing">
        <input  value={editData.title} 
        onChange={(e)=>setEditData(prev=>({...prev,title:e.target.value}))} 
        placeholder="Task Title..."/>
      

      <textarea value={editData.description}
      onChange={(e)=>setEditData(prev=>({...prev,description:e.target.value}))} 
      placeholder="Task Description..."/>

      <select value={editData.priority} onChange={(e)=>setEditData(prev=>({...prev,priority:e.target.value}))}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <div className="edit-actions">
        <button onClick={handlEdit}>Save</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>

    </div>
    )
  }

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        <div className="task-header">
          <h3>{task.title}</h3>
          <span className="priority-badge" style={{backgroundColor:getPriorityColor(task.priority)}}>
            {task.priority}
          </span>
        </div>
        {task.description && <p>{task.description}</p>}

        <div className="class-metadata">
          <small>
            Created At: {new Date(task.createdAt).toLocaleDateString()}
          </small>
        </div>

        <div className="task-actions">
          <button onClick={()=>toggleTask(task.id)}
            className={`toggle-btn ${task.completed ? 'completed' : ''}`}>{task.completed?'complted':'pending'}</button>
          <button onClick={()=>setIsEditing(true)} className="edit-btn">Edit</button>  
          <button onClick={()=>deleteTask(task.id)} className="delete-btn">Delete</button>
        </div>
      </div>
    </div>
  )
}

export default TaskItem;