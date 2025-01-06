document.addEventListener('DOMContentLoaded', () => {
    const newTaskInput = document.getElementById('new-task');
    const addTaskButton = document.getElementById('add-task');
    const taskList = document.getElementById('task-list');
    const filters = document.querySelectorAll('.filters button');

    let tasks = [];

    addTaskButton.addEventListener('click', addTask);
    taskList.addEventListener('click', handleTaskClick);
    filters.forEach(filter => filter.addEventListener('click', filterTasks));

    function addTask() {
        const taskText = newTaskInput.value.trim();
        if (taskText) {
            tasks.push({ text: taskText, completed: false });
            newTaskInput.value = '';
            renderTasks();
        }
    }

    function handleTaskClick(event) {
        const target = event.target;
        const taskIndex = target.parentElement.dataset.index;

        if (target.tagName === 'BUTTON' && target.textContent === 'Delete') {
            tasks.splice(taskIndex, 1);
        } else if (target.tagName === 'BUTTON' && target.textContent === 'Complete') {
            tasks[taskIndex].completed = !tasks[taskIndex].completed;
        }

        renderTasks();
    }

    function filterTasks(event) {
        const filter = event.target.id;
        renderTasks(filter);
    }

    function renderTasks(filter = 'all') {
        taskList.innerHTML = '';
        tasks
            .filter(task => {
                if (filter === 'active') return !task.completed;
                if (filter === 'completed') return task.completed;
                return true;
            })
            .forEach((task, index) => {
                const taskItem = document.createElement('li');
                taskItem.textContent = task.text;
                taskItem.dataset.index = index;
                if (task.completed) taskItem.classList.add('completed');
                const completeButton = document.createElement('button');
                completeButton.textContent = 'Complete';
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                taskItem.appendChild(completeButton);
                taskItem.appendChild(deleteButton);
                taskList.appendChild(taskItem);
            });
    }
});

