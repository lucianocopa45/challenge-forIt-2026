import { create } from "axios";
import { EntitySchema } from "typeorm";

export class Task{
    constructor(id, title, description, completed, createdAt){
        this.id = id;
        this.description = description;
        this.completed = completed;
    }
}

export const TaskSchema = new EntitySchema({
    name: "Task",
    target: Task,
    tableName: "task",
    columns:{
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        title:{
            type: "varchar",
            length: 255

        },
        description: {
            type: "text",
            nullable: true,
        },
        completed: {
            type: "bit",
            default: false,
        },
        createdAt: {
            name: "created_at",
            type: "datetime",
            createDate: true,
        }
    }
})