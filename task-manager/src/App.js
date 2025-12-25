import './App.css'
import {TaskProvider} from './context/TaskContext';
import FilterControl from './components/FilterControl';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App()
{
  return(

    <TaskProvider>
      <div className='App'>
        <header className='app-header'>
          <h1>Task Manager</h1>
          <p>Manage your tasks efficiently</p>
        </header>
        <main className='app-main'>
          <div className='sidebar'>
            <TaskForm/>
          </div>
          <div className='content'>
            <FilterControl/>
            <TaskList/>
          </div>
        </main>
      </div>
    </TaskProvider>
  )
}

export default App;