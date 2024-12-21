let taskList = JSON.parse(localStorage.getItem("tasks")) || [];

document.addEventListener("DOMContentLoaded", renderTasks);

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskName = taskInput.value.trim();
  if (taskName === "") {
    alert("Please enter a task!");
    return;
  }
  taskList.push({ name: taskName, completed: false });
  taskInput.value = "";
  saveTasks();
  renderTasks();
}

function renderTasks() {
  const ul = document.getElementById("taskList");
  ul.innerHTML = "";
  taskList.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    li.innerHTML = `
      <span>${task.name}</span>
      <div>
        <button class="edit" onclick="editTask(${index})">Edit</button>
        <button onclick="toggleComplete(${index})">${
      task.completed ? "Undo" : "Complete"
    }</button>
        <button onclick="deleteTask(${index})">Delete</button>
      </div>
    `;
    ul.appendChild(li);
  });
}

function toggleComplete(index) {
  taskList[index].completed = !taskList[index].completed;
  saveTasks();
  renderTasks();
}

function editTask(index) {
  const newName = prompt("Edit task name:", taskList[index].name);
  if (newName && newName.trim() !== "") {
    taskList[index].name = newName.trim();
    saveTasks();
    renderTasks();
  }
}

function deleteTask(index) {
  taskList.splice(index, 1);
  saveTasks();
  renderTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(taskList));
}
