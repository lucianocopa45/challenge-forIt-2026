import { useState } from 'react';
import { taskService } from '../services/taskService';
import type{ Task } from '../models/Task';

interface Props {
    onTaskCreated: (newTask: Task) => void;
}

function TaskForm({ onTaskCreated }: Props) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim()) {
            setError("el título es obligatorio");
            return;
        }
        if (title.trim().length < 3) {
            setError("el título debe tener al menos 3 caracteres");
            return;
        }

        setIsSubmitting(true);
        setError(null); 

        try {
            const newTaskData = {
                title,
                description,
                completed: false
            };

            const createdTask = await taskService.create(newTaskData);
            
            onTaskCreated(createdTask);

            setTitle('');
            setDescription('');
        } catch (err) {
            console.error("Error al crear tarea:", err);
            setError("no se pudo conectar con el servidor");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ 
            marginBottom: '30px', 
            padding: '20px', 
            border: '1px solid #eee', 
            borderRadius: '10px',
            backgroundColor: '#fdfdfd',
            width: '50%'
        }}>
            <h3 style={{ marginTop: 0 }}>Nueva Tarea</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input 
                    type="text" 
                    placeholder="¿Qué hay que hacer?" 
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                        if (error) setError(null); 
                    }}
                    style={{ 
                        padding: '10px', 
                        borderRadius: '5px', 
                        border: error ? '2px solid #dc3545' : '1px solid #ccc', 
                        outline: 'none'
                    }}
                />
                
                {error && (
                    <span style={{ color: '#dc3545', fontSize: '13px', marginTop: '-5px' }}>
                        {error}
                    </span>
                )}

                <textarea 
                    placeholder="Descripción (opcional)" 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={{ 
                        padding: '10px', 
                        borderRadius: '5px', 
                        border: '1px solid #ccc', 
                        minHeight: '60px',
                        resize: 'vertical'
                    }}
                />
                
                <button 
                    type="submit" 
                    disabled={isSubmitting || !title.trim()} 
                    style={{ 
                        padding: '10px', 
                        backgroundColor: isSubmitting ? '#6c757d' : '#28a745', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '5px',
                        cursor: (isSubmitting || !title.trim()) ? 'not-allowed' : 'pointer',
                        fontWeight: 'bold',
                        transition: 'background-color 0.2s'
                    }}
                >
                    {isSubmitting ? 'Guardando...' : 'Añadir Tarea'}
                </button>
            </div>
        </form>
    );
}

export default TaskForm;