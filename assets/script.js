let botaoAdd = document.querySelector(".input-area-button");
const chaveLocalStorage = "tarefas";

function generateRandomId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function tarefaAdd() {
    botaoAdd.addEventListener("click", () => {
        let inputValor = document.querySelector("input").value;
        let tarefaContainer = document.querySelector("ul");

        if (inputValor === "") {
            alert("Input vazio!");
            return;
        }

        let tarefaRandomId = generateRandomId();
        let tarefaRandomConcluida = generateRandomId();
        let tarefaRandomDelete = generateRandomId();

        let tarefaLi = document.createElement("li");
        tarefaLi.classList.add("tarefa-item");
        tarefaLi.id = tarefaRandomId;

        tarefaLi.innerHTML = `
            ${inputValor}
            <div class="tarefa-item-buttons">
                <button id="${tarefaRandomConcluida}" class="button-concluir"><i class="fa-solid fa-check"></i></button>
                <button id="${tarefaRandomDelete}" class="button-delete"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;

        tarefaContainer.appendChild(tarefaLi);
        document.querySelector("input").value = "";

        let tarefasArmazenadas = JSON.parse(localStorage.getItem(chaveLocalStorage) || "[]");
        tarefasArmazenadas.push({
            id: tarefaRandomId,
            texto: inputValor
        });
        localStorage.setItem(chaveLocalStorage, JSON.stringify(tarefasArmazenadas));

        let botaoConcluir = document.getElementById(tarefaRandomConcluida);
        botaoConcluir.addEventListener("click", () => {
            botaoConcluir.style.backgroundColor = "#5cc04b";
        });

        let botaoDeletar = document.getElementById(tarefaRandomDelete);
        botaoDeletar.addEventListener("click", () => {
            tarefaContainer.removeChild(tarefaLi);

            let tarefasArmazenadas = JSON.parse(localStorage.getItem(chaveLocalStorage) || "[]");
            tarefasArmazenadas = tarefasArmazenadas.filter(t => t.id !== tarefaRandomId);
            localStorage.setItem(chaveLocalStorage, JSON.stringify(tarefasArmazenadas));
        });
    });
}

function carregarTarefas() {
    let tarefaContainer = document.querySelector("ul");
    let tarefasArmazenadas = JSON.parse(localStorage.getItem(chaveLocalStorage) || "[]");

    tarefasArmazenadas.forEach(tarefa => {
        let tarefaLi = document.createElement("li");
        tarefaLi.classList.add("tarefa-item");
        tarefaLi.id = tarefa.id;

        let tarefaRandomConcluida = generateRandomId();
        let tarefaRandomDelete = generateRandomId();

        tarefaLi.innerHTML = `
            ${tarefa.texto}
            <div class="tarefa-item-buttons">
                <button id="${tarefaRandomConcluida}" class="button-concluir"><i class="fa-solid fa-check"></i></button>
                <button id="${tarefaRandomDelete}" class="button-delete"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;

        tarefaContainer.appendChild(tarefaLi);

        let botaoConcluir = document.getElementById(tarefaRandomConcluida);
        botaoConcluir.addEventListener("click", () => {
            botaoConcluir.style.backgroundColor = "#5cc04b";
        });

        let botaoDeletar = document.getElementById(tarefaRandomDelete);
        botaoDeletar.addEventListener("click", () => {
            tarefaContainer.removeChild(tarefaLi);
            
            let tarefasArmazenadas = JSON.parse(localStorage.getItem(chaveLocalStorage) || "[]");
            tarefasArmazenadas = tarefasArmazenadas.filter(t => t.id !== tarefa.id);
            localStorage.setItem(chaveLocalStorage, JSON.stringify(tarefasArmazenadas));
        });
    });
}

tarefaAdd();
document.addEventListener("DOMContentLoaded", carregarTarefas);