import './App.css'
import { Routes, Route, Link } from 'react-router-dom';
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm';

function App() {

  return (
<div className="app-container">
      <nav style={{ padding: '10px', backgroundColor: '#222', display: 'flex', gap: '15px' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Inicio</Link>
        <Link to="/nueva" style={{ color: 'white', textDecoration: 'none' }}>Nueva Tarea</Link>
      </nav>

      <Routes>
        <Route path="/" element={<TaskList />} />
        
        <Route path="/nueva" element={<TaskForm onTaskCreated={() => {}} />} />
        
        <Route path="/editar/:id" element={<TaskForm onTaskCreated={() => {}} />} />
      </Routes>
    </div>
  )
}

export default App
