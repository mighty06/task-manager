function addTask() {
    let input = document.getElementById("taskInput");
    let dateInput = document.getElementById("dueDate");
    let priorityInput = document.getElementById("priority");

    let taskText = input.value.trim();
    let dueDate = dateInput.value;
    let priority = priorityInput.value;

    if (taskText === "") return;

    let li = document.createElement("li");

    li.innerHTML = `
        <div class="task-info" onclick="toggleTask(this)">
            <span>${taskText}</span>
            <small class="date">${dueDate ? "Due: " + dueDate : ""}</small>
            <span class="priority ${priority.toLowerCase()}">${priority}</span>
        </div>
        <div>
            <button class="edit-btn" onclick="editTask(this)">Edit</button>
            <button class="delete-btn" onclick="deleteTask(this)">X</button>
        </div>
    `;

    document.getElementById("taskList").appendChild(li);

    saveTasks();
    updateCount();

    input.value = "";
    dateInput.value = "";
}

function deleteTask(btn) {
    btn.parentElement.remove();
    saveTasks();
    updateCount();
}

function toggleTask(element) {
    element.parentElement.classList.toggle("completed");
    saveTasks();
}

function editTask(btn) {
    let taskDiv = btn.parentElement.previousElementSibling;
    let textElement = taskDiv.querySelector("span");

    let newText = prompt("Edit your task:", textElement.innerText);

    if (newText !== null && newText.trim() !== "") {
        textElement.innerText = newText;
        saveTasks();
    }
}

function filterTasks(type) {
    let tasks = document.querySelectorAll("#taskList li");

    tasks.forEach(task => {
        let isCompleted = task.classList.contains("completed");

        if (type === "all") {
            task.style.display = "flex";
        } 
        else if (type === "completed") {
            task.style.display = isCompleted ? "flex" : "none";
        } 
        else if (type === "pending") {
            task.style.display = !isCompleted ? "flex" : "none";
        }
    });
}

function saveTasks() {
    localStorage.setItem("tasks", document.getElementById("taskList").innerHTML);
}

function loadTasks() {
    document.getElementById("taskList").innerHTML = localStorage.getItem("tasks") || "";
    updateCount();
}

function updateCount() {
    let count = document.querySelectorAll("#taskList li").length;
    document.getElementById("taskCount").innerText = "Total Tasks: " + count;
}

document.getElementById("taskInput").addEventListener("keypress", function(e) {
    if (e.key === "Enter") addTask();
});

window.onload = loadTasks;