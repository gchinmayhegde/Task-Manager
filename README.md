# Task Manager Application

> A professional React task management app built with Context API and useReducer for efficient state management.

## 🔗 Live Demo

> https://task-manager-zeta-three-16.vercel.app/

---

### ✅ Completed Features

1. **Context API Implementation**
   - Global state management with TaskContext
   - Provider wrapping entire application
   - Custom hook (useTaskContext) for easy access

2. **useReducer Hook**
   - Centralized reducer logic for all state updates
   - Action types: ADD_TASK, DELETE_TASK, TOGGLE_TASK, EDIT_TASK, CLEAR_ALL_TASKS
   - Predictable state transitions

3. **Core Components**
   - **TaskForm**: Add new tasks with title, description, and priority
   - **TaskList**: Display all tasks with statistics
   - **TaskItem**: Individual task with edit, delete, and toggle functionality
   - **FilterControl**: Search, filter, and undo operations

4. **Task Operations**
   - ✅ Add tasks
   - ✅ Edit tasks (inline editing)
   - ✅ Delete tasks (with confirmation)
   - ✅ Mark as complete/incomplete
   - ✅ Clear all tasks

5. **Additional Features**
   - Search functionality
   - Filter by status (All/Completed/Pending)
   - Undo last action
   - Priority levels (Low/Medium/High)
   - Task statistics display

6. **Professional Styling**
   - Modern, clean UI design
   - Responsive layout (mobile, tablet, desktop)
   - Hover effects and animations
   - Color-coded priority system
   - Completed tasks styled differently

---

## 🚀 Quick Start

### Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/react-essentials-assignment.git

# Navigate to project directory
cd react-essentials-assignment

# Install dependencies
npm install

# Start development server
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure
```
src/
├── components/          # React components (TaskForm, TaskItem, TaskList, FilterControl)
├── context/            # Context provider and reducer logic
├── utils/              # Helper functions and constants
├── App.js              # Main application component
└── index.js            # Application entry point
```

---

## 🎯 Key Technical Highlights

- **State Management**: Context API + useReducer pattern
- **Code Organization**: Separated concerns (components, context, utils)
- **Pure Functions**: Utility helpers for filtering, formatting, validation
- **Responsive Design**: Mobile-first approach with breakpoints
- **Performance**: Memoized computed values to prevent unnecessary re-renders