import { useState } from 'react';
import { taskService } from '../services/taskService';
import type{ Task } from '../models/Task';

interface Props {
    task: Task;
    onClose: () => void;
    onUpdate: (updatedTask: Task) => void;
}

function TaskModal({ task, onClose, onUpdate }: Props) {
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description || '');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const updated = await taskService.update(task.id!, { title, description });
        if (updated) {
            onUpdate(updated);
            onClose();
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Editar Tarea</h2>
                <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                    <label htmlFor="">Titulo</label>
                    <input 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        placeholder="Título"
                    />
                    <label htmlFor="">Descripcion</label>
                    <textarea 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Descripción"
                    />
                    <div className="modal-buttons" style={{display: 'contents', padding: '10px'}}>
                        <button type="submit">Guardar Cambios</button>
                        <button type="button" onClick={onClose}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default TaskModal;