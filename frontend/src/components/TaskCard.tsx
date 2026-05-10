import type{ Task } from '../models/Task';

interface Props {
    task: Task;
    onEdit: (task: Task) => void;
    onDelete: (id: number) => void;
    onToggle: (task: Task) => void;
}

function TaskCard({ task, onEdit, onDelete, onToggle }: Props) {
    return (
        <div className="card" style={{ 
            border: '1px solid #eee', 
            padding: '15px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            borderRadius: '8px',
            backgroundColor: task.completed ? '#fcfcfc' : '#fff'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <input 
                    type="checkbox" 
                    checked={task.completed} 
                    onChange={() => onToggle(task)}
                    style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <div>
                    <h2 style={{ 
                        fontSize: '18px', 
                        margin: 0,
                        textDecoration: task.completed ? 'line-through' : 'none',
                        color: task.completed ? '#aaa' : '#333'
                    }}>
                        {task.title}
                    </h2>
                    <p style={{ 
                        margin: '4px 0 0', 
                        fontSize: '14px', 
                        color: '#777',
                        textDecoration: task.completed ? 'line-through' : 'none'
                    }}>
                        {task.description}
                    </p>
                </div>
            </div>
            
            <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => onEdit(task)}>Editar</button>
                <button onClick={() => onDelete(task.id!)}>Eliminar</button>
            </div>
        </div>
    );
}

export default TaskCard;