import { format, parseISO } from "date-fns";


export const uiTaskManager = {

    get taskContainer() {
        return document.getElementById("task-container");
    },

    get taskForm() {
        return document.getElementById("taskFormDiv");
    },


    openTaskForm() {
        this.taskForm.style.display = "block";
    },

    closeTaskForm() {
        this.taskForm.style.display = "none";
    },

    checkTask(titleEl, completed) {
        if (completed) {
            titleEl.style.color = "#4f5d2f93";
            titleEl.style.textDecoration = "line-through";
        } else {
            titleEl.style.color = "";
            titleEl.style.textDecoration = "";
        }
    },

    createTask(task, onDelete, onToggle) {

        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task");


        const taskInfo = document.createElement("div");
        taskInfo.classList.add("task-info");

        const taskTitle = document.createElement("h3");
        taskTitle.classList.add("title");
        taskTitle.textContent = task.title;

        const taskDesc = document.createElement("p");
        taskDesc.classList.add("desc");
        taskDesc.textContent = task.description;

        const taskPriority = document.createElement("p");
        taskPriority.classList.add("priority");
        taskPriority.textContent = task.priority;

        const priorityClasses = {
            "High": "priority-high",
            "Medium": "priority-medium",
            "Low": "priority-low"
        };
        taskPriority.classList.add(priorityClasses[task.priority] ?? "priority-high");

        taskInfo.appendChild(taskTitle);
        taskInfo.appendChild(taskDesc);
        taskInfo.appendChild(taskPriority);


        const taskRightSide = document.createElement("div");
        taskRightSide.classList.add("task-right-side");

        const taskDate = document.createElement("p");
        taskDate.classList.add("dueDate");
        taskDate.textContent = task.dueDate
    ? format(parseISO(task.dueDate), "d MMM, yyyy"): "NO date";

        const taskActions = document.createElement("div");
        taskActions.classList.add("task-actions");

        const taskCheck = document.createElement("input");
        taskCheck.type = "checkbox";
        taskCheck.classList.add("complete");

        taskCheck.checked = task.completed;
        if (task.completed) this.checkTask(taskTitle, true);

        taskCheck.addEventListener("change", () => {
            onToggle(task.id);
            this.checkTask(taskTitle, taskCheck.checked);
        });


        const taskDeleteBtn = document.createElement("button");
        taskDeleteBtn.classList.add("deleteTaskBtn");
        taskDeleteBtn.textContent = "Delete";

        taskDeleteBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            onDelete(task.id);
        });

        taskActions.appendChild(taskCheck);
        taskActions.appendChild(taskDeleteBtn);

        taskRightSide.appendChild(taskDate);
        taskRightSide.appendChild(taskActions);


        taskDiv.appendChild(taskInfo);
        taskDiv.appendChild(taskRightSide);


        this.taskContainer.appendChild(taskDiv);
    },

    clearTasks() {
        this.taskContainer.innerHTML = "";
    },

    renderTasks(tasks, onDelete, onToggle) {
        this.clearTasks();
        tasks.forEach(task => {
            this.createTask(task, onDelete, onToggle);
        });
    }
}
