import { TaskRepository } from "../repositories/task.repository.js";

export const createTask = async(data) => {
    const { title, description } = data;

    const newTask = TaskRepository.create({
        title,
        description,
        completed: false
    });
    const savedTask = await TaskRepository.save(newTask);

    return savedTask;
}

export const updateTask = async(id, data) => {
    const byIdTask = await TaskRepository.findOne({where: {id: parseInt(id)}});

    if (!byIdTask) {
        return null;
    }

    byIdTask.title = data.title;
    byIdTask.description = data.description;
    byIdTask.completed = data.completed;

    const savedTaskPut = await TaskRepository.save(byIdTask);

    return savedTaskPut;
}

export const findByIdTaks = async (id) => {
    const byIdTask = await TaskRepository.findOne({where: {id: parseInt(id)}});
    if (!byIdTask) {
        return null;
    }
    return byIdTask;
}

export const deleteById = async (id) => {
    const byIdTaskDelete = await TaskRepository.findOne({where: {id: parseInt(id)}});

    if (!byIdTaskDelete) {
        return null;
    }
    const deleteTask = await TaskRepository.remove(byIdTaskDelete);

    return deleteTask;
}

export const listTask = async () => {
    const allData = await TaskRepository.find({ order: { createdAt: "DESC" } });
    
    return allData;
}