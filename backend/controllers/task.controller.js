import { createTask, deleteById, updateTask, listTask, findByIdTaks } from "../services/task.service.js";

export const postTask = async (req, res) => {
    try {
        const valuesTask = req.body;
        const dataTask = await createTask(valuesTask);

        if (!dataTask) {
            return res.status(400).json({ message: "No se pudo crear la tarea" });
        }
        return res.status(201).json(dataTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const putTask = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedTask = await updateTask(id, req.body);

        if (!updatedTask) {
            return res.status(404).json({ message: "Tarea no encontrada" });
        }

        return res.status(200).json(updatedTask); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteValue = await deleteById(id);

        if (!deleteValue) {
            return res.status(404).json({ message: `Tarea con ID ${id} no encontrada` });
        }
        return res.status(200).json({ message: `Tarea con ID ${id} eliminada correctamente` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const getAllTasks = async (req, res) => {
    try {
        const values = await listTask();
        return res.status(200).json(values);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const getByIdTask = async (req, res) => {
    try {
        const { id } = req.params;
        const values = await findByIdTaks(id);

        if (!values) {
            return res.status(404).json({ message: `Tarea con ID ${id} no encontrada` });
        }
        return res.status(200).json(values);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};