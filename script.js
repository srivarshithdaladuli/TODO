// Load todos from Local Storage on page load
document.addEventListener('DOMContentLoaded', () => {
    loadTodos();
});

// Function to add a new to-do item
function addTodo() {
    try {
        const todoInput = document.getElementById('todoInput');
        const task = todoInput.value.trim();

        // Check for empty input
        if (!task) {
            alert('Please enter a task!');
            return;
        }

        // Get existing todos or initialize empty array
        let todos = getTodosFromStorage();

        // Add new todo
        todos.push(task);
        
        // Save to Local Storage
        saveTodosToStorage(todos);

        // Add to UI
        addTodoToUI(task);

        // Clear input
        todoInput.value = '';
    } catch (error) {
        console.error('Error adding todo:', error);
        alert('An error occurred while adding the task. Please try again.');
    }
}

// Function to load todos from Local Storage
function loadTodos() {
    try {
        const todos = getTodosFromStorage();
        todos.forEach(todo => addTodoToUI(todo));
    } catch (error) {
        console.error('Error loading todos:', error);
        alert('An error occurred while loading tasks. Please refresh the page.');
    }
}

// Function to get todos from Local Storage
function getTodosFromStorage() {
    try {
        const todos = localStorage.getItem('todos');
        return todos ? JSON.parse(todos) : [];
    } catch (error) {
        console.error('Error reading from Local Storage:', error);
        return [];
    }
}

// Function to save todos to Local Storage
function saveTodosToStorage(todos) {
    try {
        localStorage.setItem('todos', JSON.stringify(todos));
    } catch (error) {
        console.error('Error saving to Local Storage:', error);
        throw error;
    }
}

// Function to add a todo item to the UI
function addTodoToUI(task) {
    try {
        const todoList = document.getElementById('todoList');
        const li = document.createElement('li');
        li.textContent = task;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteTodo(task, li);

        li.appendChild(deleteButton);
        todoList.appendChild(li);
    } catch (error) {
        console.error('Error adding todo to UI:', error);
    }
}

// Function to delete a specific todo item
function deleteTodo(task, liElement) {
    try {
        let todos = getTodosFromStorage();
        todos = todos.filter(todo => todo !== task);
        saveTodosToStorage(todos);
        liElement.remove();
    } catch (error) {
        console.error('Error deleting todo:', error);
        alert('An error occurred while deleting the task. Please try again.');
    }
}

// Function to clear all todos
function clearAllTodos() {
    try {
        if (confirm('Are you sure you want to clear all tasks?')) {
            localStorage.removeItem('todos');
            document.getElementById('todoList').innerHTML = '';
        }
    } catch (error) {
        console.error('Error clearing todos:', error);
        alert('An error occurred while clearing tasks. Please try again.');
    }
}