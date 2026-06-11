import { Project } from "../models/Project.js";
import { Task } from "../models/Task.js";



export const Storage = {
    save(projects) {
        localStorage.setItem("projects", JSON.stringify(projects));
    },

    clear() {
        localStorage.clear();
    },

    loadProjects() {
        try {
            const rawData = localStorage.getItem("projects");

            if (!rawData) return [];
            const data = JSON.parse(rawData);

            return data.map(projectData => {
                const project = new Project(projectData.name);
                project.id = projectData.id;

                project.tasks = projectData.tasks.map(taskData => {
                    const task = new Task(
                        taskData.title,
                        taskData.description,
                        taskData.priority,
                        taskData.dueDate
                    );
                    task.id = taskData.id;
                    task.completed = taskData.completed;
                    return task;
                });
                return project
            });
        } catch (err) {
            console.error("Storage corrupted", err);
            return [];
        }
    }
}
