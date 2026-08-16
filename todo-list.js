const taskInput = document.getElementById("task-input");
const taskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");

let taskListArray = {
  name: "Praying 5 times!",
};

// Load tasks from localStorage on page load
function loadTasks() {
  const saved = localStorage.getItem("taskListArray");
  if (saved) {
    taskListArray = JSON.parse(saved);
  }
  // Always render all tasks (default or saved)
  Object.entries(taskListArray).forEach(([taskKey, taskText]) => {
    renderTask(taskKey, taskText);
  });
}

// Render a single task in the DOM
function renderTask(taskKey, taskText) {
  const li = document.createElement("li");
  li.setAttribute("data-task-key", taskKey);

  const span = document.createElement("span");
  span.textContent = taskText;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "delete-btn";
  deleteBtn.style.marginLeft = "10px";
  deleteBtn.onclick = () => deleteTask(taskKey, li);

  li.appendChild(span);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem("taskListArray", JSON.stringify(taskListArray));
}

function addTask() {
  const inputValue = taskInput.value.trim();

  if (inputValue !== "") {
    // Add to taskListArray
    const taskNumber = Object.keys(taskListArray).length;
    const taskKey = `name${taskNumber}`;
    taskListArray[taskKey] = inputValue;

    // Display as <li> tag with delete button
    renderTask(taskKey, inputValue);

    // Clear input
    taskInput.value = "";

    // Save to localStorage
    saveTasks();
    console.log(taskListArray);
  }
}

function deleteTask(taskKey, liElement) {
  // Remove from taskListArray
  delete taskListArray[taskKey];

  // Remove from DOM
  liElement.remove();

  // Save to localStorage
  saveTasks();
  console.log(taskListArray);
}

// Load tasks when page loads
window.addEventListener("DOMContentLoaded", loadTasks);
