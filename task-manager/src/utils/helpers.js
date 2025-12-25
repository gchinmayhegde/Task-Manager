export const generateId = () => Date.now();

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const getPriorityColor = (priority) => {
  const colors = {
    high: '#ef4444',
    medium: '#f59e0b',
    low: '#10b981'
  };
  return colors[priority] || '#6b7280';
};


export const validateTask = (taskData) => {
  return taskData.title && taskData.title.trim().length > 0;
};


export const filterTasks = (tasks, filter, searchTerm) => {
  return tasks.filter(task => {
    const matchesFilter = 
      filter === 'all' ||
      (filter === 'completed' && task.completed) ||
      (filter === 'pending' && !task.completed);

    const matchesSearch = 
      searchTerm === '' ||
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesFilter && matchesSearch;
  });
};


export const calculateTaskStats = (tasks) => {
  return {
    total: tasks.length,
    completed: tasks.filter(task => task.completed).length,
    pending: tasks.filter(task => !task.completed).length
  };
};
