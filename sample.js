
const taskInput = document.getElementById("task-input");
const taskDatetime = document.getElementById("task-datetime");
const taskList = document.getElementById("task-list");

window.onload = function() {
    loadTasks();
};


function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    taskList.innerHTML = "";
    tasks.forEach(task => renderTask(task));
}


function addTask() {
    const taskText = taskInput.value.trim();
    const taskDate = taskDatetime.value;

    if (!taskText) {
        alert("Please enter a task.");
        return;
    }

    const newTask = {
        text: taskText,
        completed: false,
        date: taskDate,
        id: Date.now()
    };

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    renderTask(newTask);
    taskInput.value = "";
    taskDatetime.value = "";
}

function renderTask(task) {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);

    const taskText = document.createElement("span");
    taskText.textContent = task.text;
    if (task.completed) {
        taskText.classList.add("completed");
    }

    const taskDate = document.createElement("span");
    taskDate.textContent = task.date ? new Date(task.date).toLocaleString() : "No due date";

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("edit-btn");
    editButton.onclick = () => editTask(task.id);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-btn");
    deleteButton.onclick = () => deleteTask(task.id);

    const completeButton = document.createElement("button");
    completeButton.textContent = task.completed ? "Undo" : "Complete";
    completeButton.onclick = () => toggleComplete(task.id);

    li.appendChild(taskText);
    li.appendChild(taskDate);
    li.appendChild(editButton);
    li.appendChild(deleteButton);
    li.appendChild(completeButton);
    taskList.appendChild(li);
}

function toggleComplete(taskId) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex >= 0) {
        tasks[taskIndex].completed = !tasks[taskIndex].completed;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        loadTasks();
    }
}


function deleteTask(taskId) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    loadTasks();
}


function editTask(taskId) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const task = tasks.find(task => task.id === taskId);

    if (task) {
        const newText = prompt("Edit your task:", task.text);
        const newDate = prompt("Set new due date (YYYY-MM-DD HH:MM):", task.date || "");

        if (newText !== null && newText !== "") {
            task.text = newText;
        }
        if (newDate !== null && newDate !== "") {
            task.date = newDate;
        }

        localStorage.setItem("tasks", JSON.stringify(tasks));
        loadTasks();
    }
}
