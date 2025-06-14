const dialog = document.getElementById("modal");
const addTaskBtn = document.getElementById("add-task-btn");
const addTaskForm = document.getElementById("add-task");
const closeDialog = document.getElementById("close-dialog");
const taskInput = document.getElementById("task-input");

const todoList = document.getElementById("todo");
const doneList = document.getElementById("done-tasks");

let list = JSON.parse(localStorage.getItem("tasks")) || [];

let isOpen = false;

function closeOpenDialog() {
    isOpen = !isOpen;
    isOpen ? dialog.showModal() : dialog.close();
}

dialog.addEventListener('click', (e) => {
    if (e.target === dialog) {
        isOpen = false;
        dialog.close();
    }
});

// Add a task to the list and localStorage
function addTask(value) {
    if (value) {
        let id = '';
        for (let i = 0; i < 5; i++) {
            id += Math.floor(Math.random() * 10);
        }
        const newTask = { id, value, isDone: false };
        list.push(newTask);
        localStorage.setItem("tasks", JSON.stringify(list));

        render();
    }
}

function markDone(id) {
    list = list.map((item) =>
        item.id === id ? { ...item, isDone: true } : item
    );
    localStorage.setItem("tasks", JSON.stringify(list));

    render();
}

function render() {
    // Clear first
    todoList.innerHTML = "<h2>Todo</h2>";
    doneList.innerHTML = "<h2>Tasks Done</h2>";

    list
        .filter((item) => !item.isDone)
        .forEach((item) => {
            const li = document.createElement("li");

            li.innerHTML = `
                <span>${item.value}</span>
                <button aria-label="Mark ${item.value} as done" class="btn" data-id="${item.id}">Done</button>`;
            todoList.appendChild(li);
        });

    list
        .filter((item) => item.isDone)
        .forEach((item) => {
            const li = document.createElement("li");

            li.textContent = item.value;
            doneList.appendChild(li);
        });

    // Attach event handlers
    todoList.querySelectorAll("button").forEach((btn) => {
        btn.addEventListener("click", () => {
            const id = btn.dataset.id;
            markDone(id);
        });
    });
}

addTaskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const value = taskInput.value.trim();

    addTask(value);
    taskInput.value = ""; // clear after adding
    dialog.close();
    isOpen = false;
});

// Handle button to show modal
addTaskBtn.addEventListener("click", closeOpenDialog);
closeDialog.addEventListener("click", closeOpenDialog);

// Initial render
render();
