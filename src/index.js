import { ProjectManager } from "./services/ProjectManager.js";
import { uiProjectManager } from "./ui/uiProjectManager.js";
import { uiTaskManager } from "./ui/uiTaskManager.js";
import "./styles.css";



const manager = new ProjectManager()

///////////////////Default project///////////////
if (manager.projects.length === 0) {
    const defaultProject = manager.createProject("Default Project");
    manager.addTask("Default Task", "Testing this project", "High", "2026-01-01");
}

manager.projects.forEach(project => {
    const btn = uiProjectManager.createProject(project.name, project.id, selectProject, onDeleteProject);
});


const firstProject = manager.projects[0];
const firstBtn = document.querySelector(`[data-id="${firstProject.id}"]`);
uiProjectManager.setActive(firstBtn);
selectProject(firstProject.id);


function selectProject(id) {
    manager.setSelectedProject(id);
    const project = manager.getSelectedProject();
    uiTaskManager.renderTasks(project.tasks, onDeleteTask, onToggleTask);
}

function onToggleTask(taskId) {
    manager.toggleTask(manager.getSelectedProject().id, taskId);
}

function onDeleteTask(taskId) {
    manager.removeTask(taskId);
    selectProject(manager.getSelectedProject().id);
}
function onDeleteProject(projectId) {
    const wasActive = manager.getSelectedProject()?.id === projectId;
    manager.removeProject(projectId);

    const btn = document.querySelector(`[data-id="${projectId}"]`);
    if (btn) btn.remove();

    if (wasActive) {
        const remaining = manager.projects;
        if (remaining.length > 0) {
            const next = remaining[0];
            const nextBtn = document.querySelector(`[data-id="${next.id}"]`);
            uiProjectManager.setActive(nextBtn);
            selectProject(next.id);
        } else {
            uiTaskManager.clearTasks();
        }
    }
}


const projectFormBtn = document.getElementById("addProject");
const projectForm = document.getElementById("projectForm");
const projectName = document.getElementById("projectName");


projectFormBtn.addEventListener("click", () => {
    uiProjectManager.openProjectForm();
});

projectForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const project = manager.createProject(projectName.value);
    const btn = uiProjectManager.createProject(project.name, project.id, selectProject, onDeleteProject); // ← add onDeleteProject
    uiProjectManager.setActive(btn);

    uiProjectManager.closeProjectForm();

    projectName.value = "";
});



const taskFormBtn = document.getElementById("openTaskForm");
const taskForm = document.getElementById("taskForm");

const taskTitle = document.getElementById("title");
const taskDesc = document.getElementById("desc");
const taskPriority = document.getElementById("priority");
const taskDate = document.getElementById("dueDate");

taskFormBtn.addEventListener("click", () => {
    uiTaskManager.openTaskForm();
});

taskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    manager.addTask(taskTitle.value, taskDesc.value, taskPriority.value, taskDate.value);
    selectProject(manager.getSelectedProject().id);

    uiTaskManager.closeTaskForm();
    taskTitle.value = "";
    taskDesc.value = "";
    taskDate.value = "";
});

