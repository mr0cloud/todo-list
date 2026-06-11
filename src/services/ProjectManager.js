import { Project } from "../models/Project.js";
import { Task } from "../models/Task.js";
import { Storage } from "./Storage.js";

export class ProjectManager {
    constructor() {
        this.projects = Storage.loadProjects();
        this.selectedProjectId = null;
    }

    setSelectedProject(projectId) {
        this.selectedProjectId = projectId;
    }

    getSelectedProject() {
        return this.projects.find(
            p => p.id === this.selectedProjectId
        );
    }

    save() {
        Storage.save(this.projects);
    }
    clearProjects() {
        Storage.clear();
        this.projects = [];
        this.save()
    }

    createProject(name) {
        const project = new Project(name);
        this.projects.push(project);
        this.selectedProjectId = project.id; 
        this.save();
        return project;
    }

    removeProject(projectId) {
        this.projects = this.projects.filter(
            project => project.id !== projectId
        );
        this.save();
    }


    getProject(projectId) {
        return this.projects.find(
            project => project.id === projectId
        );
    }

    getTask(projectId, taskId) {
        const project = this.getProject(projectId);

        if (!project) throw new Error("Project not found");;

        return project.tasks.find(
            task => task.id === taskId
        );
    }

    addTask(title, description, priority, dueDate) {
        const project = this.getSelectedProject();

        if (!project) throw new Error("Project not found");;

        const task = new Task(
            title,
            description,
            dueDate,
            priority
        );

        project.addTask(task);
        this.save();
        return task;
    }

    removeTask(taskId) {
        const project = this.getSelectedProject();

        if (!project) throw new Error("Project not found");;

        project.removeTask(taskId);
        this.save();
    }

    toggleTask(projectId, taskId) {
        const task = this.getTask(projectId, taskId);

        if (!task) throw new Error("Task not found");;

        task.toggleComplete();
        this.save();
    }
}
