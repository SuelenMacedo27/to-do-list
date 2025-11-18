// Seleção de elementos

const todoform = document.querySelector("#todo-form");
const todoinput = document.querySelector("#todo-input");
const todolist = document.querySelector("#todo-list");
const editform = document.querySelector("#edit-form");
const editinput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");

let oldInputValue; //variável para armazenar o valor antigo da tarefa que está sendo editada

// Funções

const saveTodo = (text) => {
    const todo = document.createElement("div"); //cria uma div para a tarefa
    todo.classList.add("todo"); //adiciona a classe "todo" à div

    const todoTitle = document.createElement("h3"); //cria um elemento h3 para o título da tarefa
    todoTitle.innerText = text; //define o texto do título como o valor passado para a função que vem do evento de submit
    todo.appendChild(todoTitle); //adiciona o título à div da tarefa

    const doneBtn = document.createElement("button"); //cria o botão de concluir
    doneBtn.classList.add("finish-todo"); //adiciona a classe ao botão
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>'; //adiciona o ícone ao botão
    todo.appendChild(doneBtn); //adiciona o botão à div da tarefa

    const editBtn = document.createElement("button"); //cria o botão de concluir
    editBtn.classList.add("edit-todo"); //adiciona a classe ao botão
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'; //adiciona o ícone ao botão
    todo.appendChild(editBtn); //adiciona o botão à div da tarefa

    const deleteBtn = document.createElement("button"); //cria o botão de concluir
    deleteBtn.classList.add("remove-todo"); //adiciona a classe ao botão
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'; //adiciona o ícone ao botão
    todo.appendChild(deleteBtn); //adiciona o botão à div da tarefa

    todolist.appendChild(todo); //adiciona a div da tarefa à lista de tarefas

    todoinput.value = ""; //limpa o campo de input após adicionar a tarefa
    todoinput.focus(); //deixa o cursor no campo de input após adicionar a tarefa

}

const toggleForms = () => {
    editform.classList.toggle("hide"); //adiciona ou remove a classe "hide" do formulário de edição
    todoform.classList.toggle("hide"); //adiciona ou remove a classe "hide" do formulário de adicionar tarefa
    todolist.classList.toggle("hide"); //adiciona ou remove a classe "hide" da lista de tarefas

}

const updateTodo = (text) => {
    const todos = document.querySelectorAll(".todo"); //seleciona todas as tarefas
    todos.forEach((todo) => { //percorre todas as tarefas
        let todoTitle = todo.querySelector("h3"); //seleciona o título da tarefa
        if(todoTitle.innerText === oldInputValue) { //verifica se o título da tarefa é igual ao valor antigo
            todoTitle.innerHTML = text; //atualiza o título da tarefa com o novo valor
        } 
    });
};


//Eventos

// Primeiro evento: adicionar tarefa
todoform.addEventListener("submit", (e) => { //evento referente ao campo "Adicione a sua tarefa"
    e.preventDefault(); //não envia o formulario para o backend
    
    const inputValue = todoinput.value; //pega o valor digitado no input

    if(inputValue) { //verifica se o valor não está vazio
        saveTodo(inputValue); //chama a função para salvar a tarefa
    }
});

// Segundo evento: clicar em algum botão da tarefa (check, editar, deletar)
document.addEventListener("click", (e) => {
    const targetEl = e.target; //pega o elemento clicado
    const parentEl = targetEl.closest("div"); //pega o elemento pai mais próximo do elemento clicado
    let todoTitle; //declara a variável que vai armazenar o título da tarefa

    //pega o título da tarefa
    if(parentEl && parentEl.querySelector("h3")) { //verifica se o elemento pai existe e se ele tem um elemento h3
        todoTitle = parentEl.querySelector("h3").innerText; //pega o texto do título da tarefa
    } 

    //botão check
    if(targetEl.classList.contains("finish-todo")){ //verifica se o elemento clicado é o botão de check
        parentEl.classList.toggle("done"); //adiciona ou remove a classe "done" da tarefa (ação de marcar e desmarcar o botão check)
    }

    //botão remove
    if(targetEl.classList.contains("remove-todo")){ //verifica se o elemento clicado é o botão de remover
        parentEl.remove(); //remove a tarefa da lista
    }

    //botão editar
    if(targetEl.classList.contains("edit-todo")){ //verifica se o elemento clicado é o botão de editar
        toggleForms(); //chama a função para alternar entre os formulários

        editinput.value = todoTitle; //coloca o título da tarefa no campo de edição
        oldInputValue = todoTitle; //armazena o valor antigo da tarefa que está sendo editada

    }
});

// Terceiro evento: cancelar edição
cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault(); //não envia o formulario para o backend
    toggleForms(); //chama a função para alternar entre os formulários
});

editform.addEventListener("submit", (e) => {
    e.preventDefault(); //não envia o formulario para o backend
    const editInputValue = editinput.value; //pega o valor digitado no input de edição

    if(editInputValue) { //verifica se o valor não está vazio
        updateTodo(editInputValue); //chama a função para atualizar a tarefa
}
    toggleForms(); //chama a função para alternar entre os formulários
});

