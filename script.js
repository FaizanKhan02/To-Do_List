// Select the input box, button, and task list
const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");

// Load saved tasks from localStorage when the page loads
document.addEventListener("DOMContentLoaded", () => {
  loadTasks();
  taskInput.focus();
});

// Event listener to add a new task
addTaskButton.addEventListener("click", addTask);

// Event listener to add a new task when the ENTER key is pressed
taskInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task.");
    return;
  }

  // for preventing duplicate tasks
  const existingTasks = Array.from(taskList.querySelectorAll("li")).map(
    (item) => item.textContent.replace("Delete", "").trim()
  );
  if (existingTasks.includes(taskText)) {
    alert("Task already exists.");
    return;
  }

  // Create a new task element
  const taskItem = document.createElement("li");

  // Create a circle element to appear to the left of the task text
  const circle = document.createElement("div");
  circle.classList.add("circle");

  // Creating a text node for the task and append it
  const taskTextNode = document.createTextNode(taskText);
  taskItem.appendChild(circle);
  taskItem.appendChild(taskTextNode);

  // Add a "completed" toggle on click
  taskItem.addEventListener("click", function () {
    taskItem.classList.toggle("completed");
    saveTasks();
  });

  // Create a delete icon
  const deleteIcon = document.createElement("i");
  deleteIcon.classList.add("fas", "fa-trash-alt");

  //Styling the icon
  deleteIcon.style.cursor = "pointer";
  deleteIcon.style.marginLeft = "10px";

  // Adding delete icon event listener
  deleteIcon.addEventListener("click", function (event) {
    event.stopPropagation();
    taskList.removeChild(taskItem);
    saveTasks();
  });

  // Append the delete icon
  taskItem.appendChild(deleteIcon);

  // Append the task to the list
  taskList.appendChild(taskItem);

  // Save tasks to localStorage
  saveTasks();

  // Clear the input box
  taskInput.value = "";
}

function saveTasks() {
  const tasks = [];
  const taskItems = taskList.querySelectorAll("li");

  taskItems.forEach((item) => {
    const task = {
      text: item.textContent.replace("Delete", "").trim(),
      completed: item.classList.contains("completed"),
    };
    tasks.push(task);
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  if (tasks.length === 0) {
    const noTasksMessage = document.createElement("p");
    noTasksMessage.id = "noTaskMessage";
    noTasksMessage.textContent = "No tasks to show. Add a new task!";
    noTasksMessage.style.color = "#bbb";
    noTasksMessage.style.textAlign = "center";
    taskList.appendChild(noTasksMessage);
  }

  tasks.forEach((task) => {
    const taskItem = document.createElement("li");

    // Create the circle
    const circle = document.createElement("div");
    circle.classList.add("circle");

    // Adding text content
    const taskTextNode = document.createTextNode(task.text);
    taskItem.appendChild(circle);
    taskItem.appendChild(taskTextNode);

    // Mark task as completed if necessary
    if (task.completed) {
      taskItem.classList.add("completed");
    }

    // Create the delete icon
    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fas", "fa-trash-alt");
    deleteIcon.style.cursor = "pointer";
    deleteIcon.style.marginLeft = "10px";

    deleteIcon.addEventListener("click", function (event) {
      event.stopPropagation();
      taskList.removeChild(taskItem);
      saveTasks();
    });

    taskItem.appendChild(deleteIcon);
    taskItem.addEventListener("click", function () {
      taskItem.classList.toggle("completed");
      saveTasks();
    });

    // Append the task to the list
    taskList.appendChild(taskItem);
  });
}

const toggleButton = document.getElementById("toggle");

document.addEventListener("DOMContentLoaded", () => {
  const isDarkMode = JSON.parse(localStorage.getItem("darkMode")) || false;
  if (isDarkMode) {
    document.body.classList.add("dark-mode");
    toggleButton.innerHTML = '<span class="toggle-icon">🌞</span> Light Mode';
  } else {
    toggleButton.innerHTML = '<span class="toggle-icon">🌙</span> Dark Mode';
  }
});

toggleButton.addEventListener("click", () => {
  const isDarkMode = document.body.classList.toggle("dark-mode");
  localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
  toggleButton.innerHTML = isDarkMode
    ? '<span class="toggle-icon">🌞</span> Light Mode'
    : '<span class="toggle-icon">🌙</span> Dark Mode';
});
