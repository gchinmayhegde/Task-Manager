import { TaskProvider } from './context/TaskContext';
import TaskForm from './components/TaskForm';
import FilterControl from './components/FilterControl';
import TaskList from './components/TaskList';
import './App.css';


function App() {
  return (
    <TaskProvider>
      <div className="App">
        <header className="app-header">
          <div className="header-content">
            <h1>Task Manager</h1>
            <p>Organize your tasks efficiently with React Context API & useReducer</p>
          </div>
        </header>

        <main className="app-main">
          <aside className="sidebar">
            <TaskForm />
          </aside>

          <section className="content">
            <FilterControl />
            <TaskList />
          </section>
        </main>

        <footer className="app-footer">
          <p>Built with React Context API & useReducer</p>
        </footer>
      </div>
    </TaskProvider>
  );
}

export default App;
