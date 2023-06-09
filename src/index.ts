import "./style/tailwind.css";
import Todo from "./interfaces/Todo.interface";
import {todos, addTodo, editTodo, deleteTodo, toggleTodo, toggleTodoChecked } from "./core";

 
console.info('todos##', todos);

const ul: HTMLUListElement = document.querySelector("ul")!;
const form: HTMLFormElement = document.querySelector("form")!;
const input: HTMLInputElement = document.querySelector<HTMLInputElement>("form>input")!;

form.addEventListener("submit", (e): void => {
    e.preventDefault();
    let todo = {
        titre: input.value,
        description: "ajouter une nouvelle description",
        isChecked: false,
        isEditMode: false,
        isDone: true,
    };
    addTodo(todo);
    render(todos);
});


// affichage des todo nouvellement creer  ou modifier dans le dom
const render = (todos: Todo[]) => {
    if (!todos) throw new Error("pas de todo a afficher");
    const todosNode: HTMLLIElement[] = todos?.map((todo, index) => {
        console.log("render", todo);
        if (todo.isEditMode) {
            return modifyTodoElement(todo, index);
        } else {
            return createTodoElement(todo, index);
        }
    });
    ul.innerHTML = "";
    ul.append(...todosNode);
};



const toggleClass = (element: HTMLElement, className: string) => {
    if (element.classList.contains(className)) {
        element.classList.remove(className);
    } else {
        element.classList.add(className);
    }
}


const createTodoElement = (todo: Todo, index: number) => {

    console.log("createTodoElement fichier typescript");
    const li: HTMLLIElement = document.createElement("li");
    li.classList.add(
        "border-2",
        "rounded-lg",
        "border-green-500",
        "overflow-hidden",
        "my-4",
        "flex-wrap"
    );

    const div = document.createElement("div");
    div.classList.add("flex", "flex-row", "justify-between", "p-2", "gap-4");
    const div1 = document.createElement("div");
    div1.classList.add("flex", "items-center", "mb-4");
    const inputIsChecked: HTMLInputElement = document.createElement("input");
    inputIsChecked.classList.add(
        "bg-green-200",
        "checked:bg-green-600",
        "h-8",
        "w-8"
    );
    inputIsChecked.type = "checkbox";
    inputIsChecked.id = `test${index}`;
    inputIsChecked.checked = todo.isChecked;
    const label: HTMLLabelElement = document.createElement("label");
    label.classList.add("bg-green-500", "text-green-200");
    label.htmlFor = `test${index}`;
    label.setAttribute("aria-describedby", "label");
    label.classList.add("bg-green-500", "text-green-200");
    const div2 = document.createElement("div");
    div2.classList.add("flex-auto", "justify-center");
    const pTitre: HTMLParagraphElement = document.createElement("p");
    pTitre.classList.add("text-center", "text-3xl", "text-white", "mx-4", "line-clamp-1");
    pTitre.innerHTML = todo.titre;
    pTitre.id = `titre${index}`;


    const pDescription: HTMLParagraphElement = document.createElement("p");
    pDescription.classList.add(
        "text-justify",
        "line-clamp-1",
    );
    pDescription.innerHTML = todo.description;
    pDescription.id = `description${index}`;
    pDescription.addEventListener('mouseenter', (e) => {
        e.preventDefault();
        toggleClass(pDescription, "line-clamp-none");
    });
    pDescription.addEventListener("mouseleave", (e) => {
        e.preventDefault();
        toggleClass(pDescription, "line-clamp-none");
    });


    const div3 = document.createElement("div");
    div3.classList.add("flex", "items-center", "gap-2");
    const buttonEdit = document.createElement("button");
    buttonEdit.classList.add(
        "box-decoration-slice",
        "border-green-500",
        "border",
        "bg-green-500",
        "rounded",
        "text-white",
        "p-2"
    );
    buttonEdit.innerHTML = "editer";
    buttonEdit.setAttribute("data-index", index + "");
    buttonEdit.addEventListener("click", (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggleClass(buttonEdit, "pulse");
        buttonEdit.classList.add("pulse");
        toggleTodo(index);
        console.log("click edit button", buttonEdit.getAttribute("data-index"));

        //updateTodo(todo, buttonEdit.getAttribute("data-index"));
        console.log("edit cliick");
        render(todos);
    });

    try {
        inputIsChecked
    .addEventListener("click", (e: MouseEvent) => {
        console.debug("click inputIsChecked");
        e.preventDefault();
        e.stopPropagation();
        toggleTodoChecked(index);
        render(todos);
    });
    } catch (error) {

    }
    const buttonDelete: HTMLButtonElement = document.createElement("button");
    buttonDelete.classList.add(
        "box-decoration-slice",
        "border-red-500",
        "border",
        "bg-red-500",
        "rounded",
        "text-white",
        "p-2"
    );
    buttonDelete.innerHTML = "Supprimer";
    buttonDelete.setAttribute("data-index", index + "");
    buttonDelete.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.debug(' click button delete')
        deleteTodo(index);
        render(todos);
    });
    // construction des noeuds
    div1.appendChild(inputIsChecked);
    div1.appendChild(label);
    div2.appendChild(pTitre);
    div2.appendChild(pDescription);
    div3.appendChild(buttonEdit);
    div3.appendChild(buttonDelete);
    div.appendChild(div1);
    div.appendChild(div2);
    div.appendChild(div3);
    li.appendChild(div);
    return li;
};

// fonction pour modifier une todo sur le dom
const modifyTodoElement = (todo: Todo, index: number): HTMLLIElement => {
    todo.isEditMode = true;
    console.log("modifyTodoElement");
    const nodeList: NodeListOf<HTMLLIElement> = document.querySelectorAll<HTMLLIElement>("li");
    // Copier les éléments du NodeList dans le tableau
    const li: HTMLLIElement[] = [];
    if (nodeList.length === 0) throw new Error("nodeList is empty");
    for (let i = 0; i < nodeList.length; i++) {
        li.push(nodeList[i]);
    }
    console.log(li);
    if (index > li?.length) throw new Error("index out of range");
    let liSelect = li[index];

    //recuperation des element a modifier


    const pTitre: HTMLParagraphElement = liSelect.querySelector<HTMLParagraphElement>("p:first-child")!;

    const pDescription: HTMLParagraphElement = liSelect.querySelector<HTMLParagraphElement>("p:last-child")!;
    const buttonEdit: HTMLButtonElement = liSelect.querySelector<HTMLButtonElement>("button:first-child")!;
    const buttonDelete: HTMLButtonElement = liSelect.querySelector<HTMLButtonElement>("button:last-child")!;
    const isChecked: HTMLInputElement = liSelect.querySelector<HTMLInputElement>("input:first-child")!;
    isChecked.disabled = true;

    pTitre.innerText = todo.titre;
    pDescription.innerText = todo.description;

    //creation des nouveau input 
    const inputTitre: HTMLInputElement = document.createElement("input");
    inputTitre.classList.add(
        "text-center",
        "text-xl",
        "rounded",
        "text-blue-500",
        "px-2"
    );
    inputTitre.value = todo.titre;
    inputTitre.id = `titre${index}`;

    const inputDescription: HTMLInputElement = document.createElement("input");
    inputDescription.classList.add(
        "text-justify",
        "line-clamp-4",
        "rounded",
        "px-2",
        "hover:line-clamp-none",
        "text-green-500"
    );
    inputDescription.value = todo.description;
    inputDescription.id = `description${index}`;
    inputDescription.addEventListener('mouseenter', (e) => {
        e.preventDefault();
        toggleClass(inputDescription, "line-clamp-none");
    });

    const buttonCancel = document.createElement("button");
    buttonCancel.classList.add(
        "box-decoration-slice",
        "border-red-500",
        "border",
        "bg-red-500",
        "rounded",
        "text-white",
        "p-2"
    );
    buttonCancel.innerHTML = "Annuler";

    const buttonSave = document.createElement("button");
    buttonSave.classList.add(
        "box-decoration-slice",
        "border-green-500",
        "border",
        "bg-green-500",
        "rounded",
        "text-white",
        "p-2",
        "pulse"
    );
    buttonSave.innerHTML = "Save";
    buttonSave.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        isChecked.disabled = false;
        editTodo(index, inputTitre.value, inputDescription.value, todos[index].isChecked );
        render(todos);
    });

    buttonCancel.addEventListener("click", (e) => {
        if (pTitre === undefined || pDescription === undefined) return;
        e.preventDefault();
        e.stopPropagation();
        editTodo(index, pTitre.innerText, pDescription?.innerText, todos[index].isChecked);
        render(todos);
    });


    const div2 = pTitre.parentElement!;
    div2.classList.add("flex", "flex-col", "gap-2");
    div2.replaceChild(inputTitre, pTitre);
    div2.replaceChild(inputDescription, pDescription);



    const div3 = div2.nextElementSibling!;
    div3.replaceChild(buttonSave, buttonEdit);
    div3.replaceChild(buttonCancel, buttonDelete);


    return liSelect;
};
