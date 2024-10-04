const addInput = document.getElementById('add');
        const submitBtn = document.getElementById('submitBtn');
        const taskList = document.querySelector('ul');
        const placeholder = document.getElementById('placeholder');
        const doneCount = document.getElementById('done');
        const remainingCount = document.getElementById('remaining');

        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to update task counters
        function updateCounters() {
        const doneTasks = tasks.filter(task => task.completed).length;
        const remainingTasks = tasks.length - doneTasks;
        doneCount.textContent = doneTasks;
        remainingCount.textContent = remainingTasks;
        }

// Function to save tasks to local storage
        function saveTasks() {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }

// Function to render tasks
        function renderTasks() {
            taskList.innerHTML = ''; // Clear task list
            tasks.forEach((task, index) => {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item pb-3';

        // Checkbox for task completion
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'form-check-input me-2';
            checkbox.checked = task.completed;
            checkbox.addEventListener('change', () => toggleTask(index));

        // Task description
            const taskText = document.createElement('span');
            taskText.textContent = task.name;
        if (task.completed) {
            taskText.style.textDecoration = 'line-through';
        }

        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-danger btn-sm float-end delete';
        deleteBtn.textContent = 'X';
        deleteBtn.addEventListener('click', () => deleteTask(index));

        listItem.appendChild(checkbox);
        listItem.appendChild(taskText);
        listItem.appendChild(deleteBtn);
        taskList.appendChild(listItem);
    });

    placeholder.style.display = tasks.length > 0 ? 'none' : 'block'; // Hide/show placeholder
    updateCounters();
}

// Function to add a new task
    function addTask() {
        const taskText = addInput.value.trim();
        if (taskText !== '') {
            tasks.push({ name: taskText, completed: false });
            addInput.value = ''; // Clear input field
            saveTasks();
            renderTasks();
        }
    }

    // Function to toggle task completion
    function toggleTask(index) {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    }

// Function to delete a task
    function deleteTask(index) {
        tasks.splice(index, 1); // Remove task from array
        saveTasks();
        renderTasks();
    }

// Event listener for submitting a new task
    submitBtn.addEventListener('click', function(event) {
        event.preventDefault();
        addTask();
    });

    renderTasks(); // Initial rendering of tasks