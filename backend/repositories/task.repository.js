import { AppDataSource } from "../config/database.js";
import { TaskSchema } from "../models/task.model.js";

export const TaskRepository = AppDataSource.getRepository(TaskSchema).extend({

    findCompleted() {
        return this.find({ where: { completed: true } });
    }
});