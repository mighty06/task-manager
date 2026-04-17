function addTask() {
    let input = document.getElementById("taskInput");
    let taskText = input.value.trim();

    if (taskText === "") return;

    let li = document.createElement("li");

    li.innerHTML = `
        <span onclick="toggleTask(this)">${taskText}</span>
        <button class="delete-btn" onclick="deleteTask(this)">X</button>
    `;

    document.getElementById("taskList").appendChild(li);

    saveTasks();
    input.value = "";
}

function deleteTask(btn) {
    btn.parentElement.remove();
    saveTasks();
}

function toggleTask(span) {
    span.parentElement.classList.toggle("completed");
    saveTasks();
}

function saveTasks() {
    localStorage.setItem("tasks", document.getElementById("taskList").innerHTML);
}

function loadTasks() {
    document.getElementById("taskList").innerHTML = localStorage.getItem("tasks") || "";
}

window.onload = loadTasks;