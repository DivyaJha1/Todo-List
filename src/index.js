import "./styles.css";

/// Store tasks in an array
let tasks = [];

// Get DOM elements
const descriptionInput = document.getElementById("description");
const categoryInput = document.getElementById("category");
const deadlineInput = document.getElementById("deadline");
const addTaskButton = document.getElementById("addTask");
const deleteTaskButton = document.getElementById("deleteTask");
const taskList = document.getElementById("taskList");
const totalTasksElement = document.getElementById("totalTasks");
const completedTasksElement = document.getElementById("completedTasks");

// Add task event listener
addTaskButton.addEventListener("click", addTask);

// Delete task event listener
deleteTaskButton.addEventListener("click", deleteTask);

// Add task function
function addTask() {
  const description = descriptionInput.value;
  const category = categoryInput.value;
  const deadline = deadlineInput.value;

  if (description.trim() === "") {
    alert("Please enter a task description");
    return;
  }

  const task = {
    description,
    category,
    deadline,
    completed: false
  };

  tasks.push(task);

  renderTasks();
  updateStats();
  clearInputs();
}

// Delete task function
function deleteTask() {
  tasks = tasks.filter((task) => !task.completed);

  renderTasks();
  updateStats();
}

// Render tasks function
function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const taskItem = document.createElement("div");
    taskItem.className = "task";
    if (task.completed) {
      taskItem.classList.add("completed");
    }

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => toggleTaskComplete(index));

    const description = document.createElement("span");
    description.textContent = task.description;

    const category = document.createElement("span");
    category.textContent = task.category;

    const deadlineContainer = document.createElement("span");
    deadlineContainer.className = "deadline-container";

    const day = document.createElement("span");
    day.className = "date-day";
    day.textContent = moment(task.deadline).format("DD");

    const month = document.createElement("span");
    month.className = "date-month";
    month.textContent = moment(task.deadline).format("MMM");

    const year = document.createElement("span");
    year.className = "date-year";
    year.textContent = moment(task.deadline).format("YYYY");

    deadlineContainer.appendChild(day);
    deadlineContainer.appendChild(month);
    deadlineContainer.appendChild(year);

    const markCompleteButton = document.createElement("button");
    markCompleteButton.className = "mark-complete-btn";
    markCompleteButton.innerHTML = "&#10004;";
    markCompleteButton.addEventListener("click", () => markTaskComplete(index));

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-btn";
    deleteButton.innerHTML = "&#128465;";
    deleteButton.addEventListener("click", () => deleteTaskAtIndex(index));

    taskItem.appendChild(checkbox);
    taskItem.appendChild(description);
    taskItem.appendChild(category);
    taskItem.appendChild(deadlineContainer);
    taskItem.appendChild(markCompleteButton);
    taskItem.appendChild(deleteButton);

    taskList.appendChild(taskItem);
  });

  adjustListWidth(); // Adjust the width of the taskList to match the table width
}

// Toggle task complete function
function toggleTaskComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
  updateStats();
}

// Mark task as complete
function markTaskComplete(index) {
  tasks[index].completed = true;
  renderTasks();
  updateStats();
}

// Delete task at index
function deleteTaskAtIndex(index) {
  tasks.splice(index, 1);
  renderTasks();
  updateStats();
}

// Format date function
function formatDate(date) {
  const formattedDate = moment(date).format("DD MMM YYYY");
  return formattedDate;
}

// Adjust the width of the taskList to match the table width
function adjustListWidth() {
  const tableWidth = taskList.parentElement.offsetWidth; // Get the width of the table container
  taskList.style.width = `${tableWidth}px`;
}

// Update statistics function
function updateStats() {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;

  totalTasksElement.textContent = totalTasks;
  completedTasksElement.textContent = completedTasks;
}

// Clear input fields
function clearInputs() {
  descriptionInput.value = "";
  categoryInput.value = "";
  deadlineInput.value = "";
}

// Initial render
renderTasks();
updateStats();
