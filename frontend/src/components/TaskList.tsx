import { useEffect, useState } from 'react';
import type{ Task } from '../models/Task';
import { taskService } from '../services/taskService'; 
import TaskCard from './TaskCard';
import TaskModal from './TaskModal';

type FilterType = 'todas' | 'pendientes' | 'completadas';
function TaskList() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [filter, setFilter] = useState<FilterType>('todas'); 

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                setIsLoading(true);
                const data = await taskService.getAll();
                setTasks(data);
            } catch (error) {
                console.error("Error al cargar:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchTasks();
    }, []);

    const handleToggleTask = async (task: Task) => {
        const newStatus = !task.completed;

        setTasks(prev => prev.map(t => 
            t.id === task.id ? { ...t, completed: newStatus } : t
        ));

        try {
            await taskService.update(task.id!, { completed: newStatus });
        } catch (error) {
            setTasks(prev => prev.map(t => 
                t.id === task.id ? { ...t, completed: !newStatus } : t
            ));
            alert("Error al sincronizar con el servidor");
        }
    };

    const handleUpdateList = (updatedTask: Task) => {
        setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
        setTaskToEdit(null);
    };

    const handleDelete = async (id: number) => {
        if (window.confirm("¿Eliminar esta tarea?")) {
            try {
                await taskService.delete(id);
                setTasks(prev => prev.filter(t => t.id !== id));
                if (taskToEdit?.id === id) setTaskToEdit(null);
            } catch (error) {
                console.error("Error al eliminar:", error);
            }
        }
    };
    const handleEditRequest = async (task: Task) => {
    try {
        const taskFromServer = await taskService.getById(task.id!);
        
        setTaskToEdit(taskFromServer);
    } catch (error) {
        console.error("No se pudo obtener el detalle de la tarea:", error);
        alert("Error al conectar con el servidor para obtener los datos.");
    }
    };

    const tasksFiltradas = tasks.filter(t => {
        if (filter === 'pendientes') return !t.completed;
        if (filter === 'completadas') return t.completed;
        return true;
    });
    return (
        <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
            <div style={{ flex: 1 }}>
                <h1>Mis Tareas</h1>
                
                <div style={{ marginBottom: '15px', display: 'flex', gap: '10px' }}>
                    {(['todas', 'pendientes', 'completadas'] as FilterType[]).map((f) => (
                        <button 
                            key={f}
                            onClick={() => setFilter(f)}
                            style={{
                                padding: '5px 12px',
                                borderRadius: '20px',
                                border: '1px solid #ccc',
                                backgroundColor: filter === f ? '#007bff' : '#fff',
                                color: filter === f ? '#fff' : '#333',
                                cursor: 'pointer',
                                textTransform: 'capitalize'
                            }}
                        >
                            {f}
                        </button>
                    ))}
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {isLoading ? (
                        <p>Cargando tareas...</p>
                    ) : tasksFiltradas.map(t => (
                        <TaskCard 
                            key={t.id} 
                            task={t} 
                            onEdit={handleEditRequest} 
                            onDelete={handleDelete}
                            onToggle={handleToggleTask}
                        />
                    ))}
                </div>
            </div>

            {taskToEdit && (
                <div style={{ 
                    width: '350px', 
                    position: 'sticky', 
                    top: '20px', 
                    border: '1px solid #ddd', 
                    padding: '20px',
                    borderRadius: '10px',
                    backgroundColor: '#fff'
                }}>
                    <TaskModal 
                        task={taskToEdit} 
                        onClose={() => setTaskToEdit(null)} 
                        onUpdate={handleUpdateList}
                    />
                </div>
            )}
        </div>
    );
}

export default TaskList;