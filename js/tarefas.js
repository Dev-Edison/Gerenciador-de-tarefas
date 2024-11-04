function saveTaskToLocalStorage(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
function criarCookie(nome, valor, dias) {
    let expires = "";
    if (dias) {
        const data = new Date();
        data.setTime(data.getTime() + (dias * 24 * 60 * 60 * 1000)); // Converte dias para milissegundos
        expires = "; expires=" + data.toUTCString();
    }
    document.cookie = nome + "=" + (valor || "") + expires + "; path=/"; // Define o cookie
}

function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        addTaskToTable(task);
    });
}
function addTaskToTable(task) {
    const table = document.getElementById('taskTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    newRow.insertCell(0).textContent = task.id;
    newRow.insertCell(1).textContent = task.titulo;
    newRow.insertCell(2).textContent = task.descricao;
    newRow.insertCell(3).textContent = task.horario;
    newRow.insertCell(4).textContent = task.status;

    // Cria a célula de ações
    const actionsCell = newRow.insertCell(5);
    actionsCell.innerHTML = `
        <i class="fas fa-trash" onclick="deleteItem(this)" style="cursor: pointer; color: red; margin-right:10px"></i>
        <i class="fas fa-check-circle" onclick="completeTask(this)" style="cursor: pointer; color: green;"></i>
    `;
}
function updateTaskStatusInLocalStorage(id, newStatus) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasks.map(task => {
        if (task.id === id) {
            task.status = newStatus; // Altera o status
        }
        return task;
    });
    localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Salva as alterações
}
function completeTask(element) {
    // A linha que contém o ícone de conclusão
    const row = element.parentElement.parentElement;
    
    // Obtém o ID da tarefa na primeira célula
    const id = row.cells[0].textContent;
    
    // Atualiza o status na coluna correspondente
    row.cells[4].textContent = "Acabado";

    // Atualiza o status no Local Storage
    updateTaskStatusInLocalStorage(id, "Acabado");
}

 // Função para mostrar a mensagem
function mostrarMensagem() {
    alert("Bem Vindo ao Gerenciador de Tarefas")
}


function removeTaskFromLocalStorage(id) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasks.filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}
function onload(){
    bloquearDatasEHorasPassadas();
    loadTasksFromLocalStorage();
}
window.onload=onload();

function deleteItem(element) {
    const row = element.parentElement.parentElement;
    const id = row.cells[0].textContent;

    // Remove a linha da tabela
    row.parentNode.removeChild(row);

    // Remove a tarefa do Local Storage
    removeTaskFromLocalStorage(id);
}

function bloquearDatasEHorasPassadas() {
    const agora = new Date();
    const datetimeInput = document.getElementById('horario');

    // Formata a data e hora atual no formato adequado para datetime-local
    const ano = agora.getFullYear();
    const mes = String(agora.getMonth() + 1).padStart(2, '0'); // Meses começam em 0
    const dia = String(agora.getDate()).padStart(2, '0');
    const horas = String(agora.getHours()).padStart(2, '0');
    const minutos = String(agora.getMinutes()).padStart(2, '0');

    // Cria a string no formato YYYY-MM-DDTHH:MM
    const dataHoraAtual = `${ano}-${mes}-${dia}T${horas}:${minutos}`;

    // Define o valor mínimo do input datetime-local
    datetimeInput.min = dataHoraAtual; // Bloqueia datas e horas passadas
}


// Configura o temporizador para 5 segundos (5000 milissegundos)
setTimeout(mostrarMensagem, 5000);
$("#button_submit").on("click",function(event){
    event.preventDefault(); // Previne o envio do formulário

    // Obtém os valores dos inputs
    const id = document.getElementById('id').value;
    const titulo = document.getElementById('titulo').value;
    const descricao = document.getElementById('descricao').value;
    const horario = document.getElementById('horario').value;
    const status= "Pendente";
    // Salva a tarefa no Local Storage
    saveTaskToLocalStorage({ id, titulo, descricao, horario, status });

    // Adiciona a tarefa na tabela
    addTaskToTable({ id, titulo, descricao, horario, status });

    // Limpa os campos do formulário
    document.getElementById('formulario').reset();
    criarCookie("Evento", "titulo", 30);

});

