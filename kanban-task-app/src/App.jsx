
import React, { useState, useEffect } from 'react';
import KanbanBoard from './components/KanbanBoard';
import Header from './components/Header'; 
import AuthForm from './components/AuthForm';
import TaskModal from './components/TaskModal';
import { User } from 'lucide-react';
import './App.css'; // Assuming you have a CSS file for global styles
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import KanbanColumn from './components/KanbanColumn';




const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);
  const [users, setUsers] = useState([]);
  const [boards, setBoards] = useState({});
  const [draggedTask, setDraggedTask] = useState(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [newTask, setNewTask] = useState({
    title: '', description: '', priority: 'medium', dueDate: '', dueTime: '', tags: '', attachments: []
  });

  const defaultBoard = {
    todo: { title: 'To Do', tasks: [] },
    inProgress: { title: 'In Progress', tasks: [] },
    review: { title: 'Review', tasks: [] },
    done: { title: 'Done', tasks: [] }
  };

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem('kanban_users') || '[]');
    const savedBoards = JSON.parse(localStorage.getItem('kanban_boards') || '{}');
    const savedCurrentUser = localStorage.getItem('kanban_current_user');
    
    setUsers(savedUsers);
    setBoards(savedBoards);
    if (savedCurrentUser && savedUsers.find(u => u.email === savedCurrentUser)) {
      setCurrentUser(savedCurrentUser);
      setShowLogin(false);
    }
  }, []);

  useEffect(() => { localStorage.setItem('kanban_users', JSON.stringify(users)); }, [users]);
  useEffect(() => { localStorage.setItem('kanban_boards', JSON.stringify(boards)); }, [boards]);
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('kanban_current_user', currentUser);
    } else {
      localStorage.removeItem('kanban_current_user');
    }
  }, [currentUser]);

  const handleAuth = (email, password, isLogin) => {
    if (isLogin) {
      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        setCurrentUser(email);
        setShowLogin(false);
        if (!boards[email]) {
          setBoards(prev => ({ ...prev, [email]: { ...defaultBoard } }));
        }
      } else {
        alert('Invalid credentials');
      }
    } else {
      if (users.find(u => u.email === email)) {
        alert('User already exists');
        return;
      }
      const newUser = { email, password, name: email.split('@')[0] };
      setUsers(prev => [...prev, newUser]);
      setCurrentUser(email);
      setShowLogin(false);
      setBoards(prev => ({ ...prev, [email]: { ...defaultBoard } }));
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setShowLogin(true);
  };

  const openAddTaskModal = (columnId) => {
    setEditingTask(null);
    setNewTask({ title: '', description: '', priority: 'medium', dueDate: '', dueTime: '', tags: '', attachments: [] });
    setShowTaskModal(true);
  };

  const openEditTaskModal = (task, columnId) => {
    setEditingTask({ ...task, columnId });
    setNewTask({
      title: task.title,
      description: task.description,
      priority: task.priority,
      dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
      dueTime: task.dueDate ? task.dueDate.split('T')[1]?.substring(0, 5) || '' : '',
      tags: task.tags?.join(', ') || '',
      attachments: task.attachments || []
    });
    setShowTaskModal(true);
  };

  const saveTask = () => {
    if (!newTask.title.trim()) return;

    let fullDueDate = '';
    if (newTask.dueDate) {
      fullDueDate = newTask.dueTime ? `${newTask.dueDate}T${newTask.dueTime}:00` : `${newTask.dueDate}T23:59:59`;
    }

    const taskPayload = {
      id: editingTask?.id || Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      priority: newTask.priority,
      dueDate: fullDueDate,
      tags: newTask.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      attachments: newTask.attachments || [],
      createdAt: editingTask?.createdAt || new Date().toISOString()
    };

    setBoards(prev => {
      const updated = { ...prev };
      const userBoard = { ...updated[currentUser] };

      if (editingTask) {
        userBoard[editingTask.columnId].tasks = userBoard[editingTask.columnId].tasks.filter(t => t.id !== editingTask.id);
        const targetColumn = editingTask.columnId;
        userBoard[targetColumn].tasks.push(taskPayload);
      } else {
        userBoard.todo.tasks.push(taskPayload);
      }

      updated[currentUser] = userBoard;
      return updated;
    });

    setShowTaskModal(false);
    setEditingTask(null);
  };

  const deleteTask = (taskId, columnId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setBoards(prev => {
        const updated = { ...prev };
        const userBoard = { ...updated[currentUser] };
        userBoard[columnId].tasks = userBoard[columnId].tasks.filter(t => t.id !== taskId);
        updated[currentUser] = userBoard;
        return updated;
      });
    }
  };

  const handleDragStart = (e, task, columnId) => {
    setDraggedTask({ ...task, sourceColumn: columnId });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetColumnId) => {
    e.preventDefault();
    if (!draggedTask || draggedTask.sourceColumn === targetColumnId) {
      setDraggedTask(null);
      return;
    }

    setBoards(prev => {
      const updated = { ...prev };
      const userBoard = { ...updated[currentUser] };
      
      userBoard[draggedTask.sourceColumn].tasks = userBoard[draggedTask.sourceColumn].tasks.filter(t => t.id !== draggedTask.id);
      
      const { sourceColumn, ...taskWithoutSource } = draggedTask;
      userBoard[targetColumnId].tasks.push(taskWithoutSource);
      
      updated[currentUser] = userBoard;
      return updated;
    });

    setDraggedTask(null);
  };

  if (showLogin) {
    return (
      <div className="ml-96 mt-8 mb-8 min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Kanban</h1>
            <p className="text-gray-600">Manage your tasks with ease</p>
          </div>
          <AuthForm onAuth={handleAuth} />
        </div>
      </div>
    );
  }

  const userBoard = boards[currentUser] || defaultBoard;

  return (
    <div className="min-h-screen ml-64 bg-gray-50">
      <Header currentUser={currentUser} onLogout={logout} />
      <KanbanBoard
        userBoard={userBoard}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onAddTask={openAddTaskModal}
        onEditTask={openEditTaskModal}
        onDeleteTask={deleteTask}
        onDragStart={handleDragStart}
      />
      <TaskModal
        show={showTaskModal}
        onClose={() => setShowTaskModal(false)}
        onSave={saveTask}
        task={newTask}
        setTask={setNewTask}
        editingTask={editingTask}
      />
    </div>
  );
};

export default App;

