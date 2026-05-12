import type { Task } from "../models/Task";

const API_URL = import.meta.env.VITE_API_URL;

export const taskService = {
    getAll: async (): Promise<Task[]> => {
        const response = await fetch(`${API_URL}/tasks`);
        if (!response.ok) throw new Error('Error al obtener tareas');
        const result = await response.json();
        return result.data || result;
    },

    create: async (taskData: Partial<Task>): Promise<Task> => {
        const response = await fetch(`${API_URL}/tasks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(taskData)
        });
        if (!response.ok) throw new Error('Error al crear tarea');
        const result = await response.json();
        return result.data || result;
    },

    update: async (id: number, taskData: Partial<Task>): Promise<Task> => {
        const response = await fetch(`${API_URL}/tasks/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(taskData)
        });
        if (!response.ok) throw new Error('Error al actualizar tarea');
        const result = await response.json();
        return result.data || result;
    },

    delete: async (id: number): Promise<void> => {
        const response = await fetch(`${API_URL}/tasks/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Error al eliminar tarea');
    },

    getById: async (id: number): Promise<Task> => {
        const response = await fetch(`${API_URL}/tasks/${id}`);
        if (!response.ok) throw new Error('Error al obtener la tarea');
        const result = await response.json();
        return result.data || result;
    }
};