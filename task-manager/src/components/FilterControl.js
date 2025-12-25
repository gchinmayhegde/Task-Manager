import { useTaskContext } from "../context/TaskContext";
import "./FilterControl.css";

function FilterControl() {

  const {filter,setFilter,searchTerm,setSearch,undoTask,canUndo} = useTaskContext();
  return(
    <div className="filter-controls">
      <div className="search-section">
        <input type="text" 
        value={searchTerm} 
        onChange={(e)=>setSearch(e.target.value)} 
        placeholder="Search tasks..."
        className="search-input"/>
      </div>

      <div className="filter-section">
        <label>Filter:</label>
        <div className="filter-buttons">

          {['all','completed','pending'].map((filterOption)=>(
          <button
            key={filterOption}
            className={filter === filterOption ? 'active' : ''}
            onClick={()=>setFilter(filterOption)}>
            {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
          </button>  
          ))}


        </div>
      </div>

      <div className="action-section">
          <button onClick={undoTask} disabled={!canUndo} className="undo-btn">
            Undo
          </button>
      </div>
    </div>
  )      
}

export default FilterControl;