// Estado de la aplicación
let tasks = [];

// Elementos del DOM
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const errorMsg = document.getElementById('errorMsg');
const taskList = document.getElementById('taskList');
const counter = document.getElementById('counter');

// Función para renderizar la lista
function renderTasks() {
    // Limpiar la lista
    taskList.innerHTML = '';

    // Recorrer el array y crear cada elemento
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        if (task.completed) {
            li.classList.add('completed');
        }

        // Contenedor del texto (click para toggle)
        const textSpan = document.createElement('span');
        textSpan.className = 'task-text';
        textSpan.textContent = task.text;
        textSpan.addEventListener('click', () => toggleTask(index));

        // Botón eliminar
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerHTML = '✕';
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Evita que se dispare el toggle
            deleteTask(index);
        });

        li.appendChild(textSpan);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });

    // Actualizar contador
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    counter.textContent = `Total: ${total} | Completadas: ${completed}`;
}

// Función para agregar una tarea
function addTask(text) {
    // Validación: no vacío (trim elimina espacios al inicio/final)
    const trimmed = text.trim();
    if (trimmed === '') {
        errorMsg.textContent = '⚠️ No puedes agregar una tarea vacía.';
        return false;
    }

    errorMsg.textContent = ''; // Limpiar error

    // Agregar al array
    tasks.push({
        id: Date.now(),
        text: trimmed,
        completed: false
    });

    // Renderizar de nuevo
    renderTasks();
    taskInput.value = '';    // Limpiar input
    taskInput.focus();
    return true;
}

// Función para toggle (marcar/desmarcar como completada)
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

// Función para eliminar una tarea
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

// --- Eventos ---

// Submit del formulario
taskForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Evita recargar la página
    const text = taskInput.value;
    addTask(text);
});

// Validación en tiempo real: cuando el usuario escribe, limpiamos el error
taskInput.addEventListener('input', () => {
    if (errorMsg.textContent !== '') {
        errorMsg.textContent = '';
    }
});

// Opcional: ejemplo de datos iniciales para probar
// tasks = [
//     { id: 1, text: 'Aprender JavaScript', completed: false },
//     { id: 2, text: 'Hacer la mini-app', completed: true }
// ];
// renderTasks();
