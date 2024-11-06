// Salva a tarefa no localStorage
function saveTaskToLocalStorage(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Carrega as tarefas do localStorage ao carregar a página
function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        addTaskToTable(task);
    });
}

// Adiciona uma tarefa na tabela
function addTaskToTable(task) {
    const table = document.getElementById('taskTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    newRow.insertCell(0).textContent = task.id;
    newRow.insertCell(1).textContent = task.titulo;
    newRow.insertCell(2).textContent = task.descricao;
    newRow.insertCell(3).textContent = task.horario;
    newRow.insertCell(4).textContent = task.status;

    const actionsCell = newRow.insertCell(5);
    actionsCell.innerHTML = `
        <i class="fas fa-trash" onclick="deleteTask(this)" style="color: red;"></i>
        <i class="fas fa-check-circle" onclick="completeTask(this)" style="color: green;"></i>
    `;
}

// Deleta uma tarefa
function deleteTask(element) {
    const row = element.parentElement.parentElement;
    const id = row.cells[0].textContent;
    row.parentNode.removeChild(row);
    removeTaskFromLocalStorage(id);
}

// Remove a tarefa do localStorage
function removeTaskFromLocalStorage(id) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasks.filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}

// Marca uma tarefa como concluída
function completeTask(element) {
    const row = element.parentElement.parentElement;
    const id = row.cells[0].textContent;
    row.cells[4].textContent = 'Concluído';
    updateTaskStatusInLocalStorage(id, 'Concluído');
}

// Atualiza o status da tarefa no localStorage
function updateTaskStatusInLocalStorage(id, newStatus) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasks.map(task => {
        if (task.id === id) {
            task.status = newStatus;
        }
        return task;
    });
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}

// Evento para carregar as tarefas quando a página for carregada
window.onload = loadTasksFromLocalStorage;

// Evento para adicionar uma nova tarefa
document.getElementById('formulario').addEventListener('submit', function(event) {
    event.preventDefault();

    const id = document.getElementById('id').value;
    const titulo = document.getElementById('titulo').value;
    const descricao = document.getElementById('descricao').value;
    const horario = document.getElementById('horario').value;
    const status = 'Pendente';

    const task = { id, titulo, descricao, horario, status };

    saveTaskToLocalStorage(task);
    addTaskToTable(task);
    document.getElementById('formulario').reset();
});
