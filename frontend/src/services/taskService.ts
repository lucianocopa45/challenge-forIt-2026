import type { Task } from "../models/Task";
import api from "../api/axios";

export const taskService = {
    getAll: async (): Promise<Task[]> => {
        const response = await api.get("/tasks");
        return response.data.data || response.data; 
    },

    create: async (taskData: any): Promise<Task> => { 
        const response = await api.post("/tasks", taskData);
        return response.data.data || response.data;
    },

    update: async (id: number, taskData: Partial<Task>): Promise<Task> => {
        const response = await api.put(`/tasks/${id}`, taskData);
        return response.data.data || response.data;
    },

    delete: async (id: number): Promise<void> => { 
        await api.delete(`/tasks/${id}`);
    },
    getById: async (id: number): Promise<Task> => {
        const response = await api.get(`/tasks/${id}`);
        return response.data.data || response.data;    
    }
}
