export const uiProjectManager = {

    get projectContainer() {
        return document.getElementById("projects-content");
    },

    get projectForm() {
        return document.getElementById("projectFormDiv");
    },

    setActive(btn) {
        this.projectContainer
            .querySelectorAll(".ProjectBtn")
            .forEach(b => b.classList.remove("active-project"));
        btn.classList.add("active-project");
    },

    createProject(name, id, onSelect, onDelete) {
        const btn = document.createElement("button");
        btn.textContent = name;
        btn.classList.add("ProjectBtn");
        btn.dataset.id = id;

        btn.addEventListener("click", () => {
            this.setActive(btn);
            onSelect(id);
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "✕";
        deleteBtn.classList.add("deleteProjectBtn");
        deleteBtn.addEventListener("click", (e) => {
            e.stopPropagation(); // don't trigger onSelect
            onDelete(id);
        });

        btn.appendChild(deleteBtn);

        this.projectContainer.appendChild(btn);
        return btn;
    },

    openProjectForm() { this.projectForm.style.display = "block"; },
    closeProjectForm() { this.projectForm.style.display = "none"; }
};
