function getCookie(name) {
    let value = `; ${document.cookie}`;
    let parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function loadTodos() {
    let todos = getCookie('todos');
    if (todos) {
        todos = JSON.parse(todos);
        for (let todo of todos) {
            addTodoToList(todo);
        }
    }
}

function saveTodos() {
    let todos = [];
    $('#ft_list .todo').each(function() {
        todos.push($(this).text().replace('Delete', '').trim());
    });
    setCookie('todos', JSON.stringify(todos), 7); // Save for 7 days
}

function addTodoToList(todoText) {
    let todoItem = $('<div class="todo"></div>').text(todoText);
    let deleteButton = $('<button>Delete</button>');

    deleteButton.click(function() {
        if (confirm('Are you sure you want to delete this item?')) {
            $(this).parent().remove();
            saveTodos(); // Save changes after deletion
        }
    });

    todoItem.append(deleteButton);
    $('#ft_list').prepend(todoItem);
}

$(document).ready(function() {
    loadTodos();

    $('#new').click(function() {
        let newTodo = prompt("Enter a new todo:");
        if (newTodo) {
            addTodoToList(newTodo);
            saveTodos(); // Save changes after adding new todo
        }
    });
});
