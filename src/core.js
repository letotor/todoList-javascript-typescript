import mockDom from "../test/dom.js";
//document.body.innerHTML = mockDom.mockDom;

const todos = [
  {
    titre: "ajouter un #1",
    description: "ajouter une nouvelle description",
    isChecked: true,
    isEditMode: false,
  },
];

// recuperation des nodes prinicpaux
const ul = document.querySelector("ul");
const form = document.querySelector("form");
const input = document.querySelector("form>input");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let todo = {
    titre: input.value,
    description: "ajouter une nouvelle description",
    isChecked: false,
    isEditMode: false,
    isDone: true,
  };
  addTodo(todo);
});

// initialisation des todos
const addTodo = (todo, index = todos.length) => {
  todos.splice(index, 0, todo);
  diplayTodos(todos);
};

const editTodo = (inputTitre,inputDescription,index) => {
  console.log("updateTodo");
  let todo = {
    titre: inputTitre,
    description: inputDescription,
    isChecked: todos[index].isChecked,
    isEditMode: false,
  };
  todos.splice(index, 1, todo);
  diplayTodos(todos);
};

const deleteTodo = (index) => {
  todos.splice(index, 1);
  diplayTodos(todos);
};

const toggleTodo = (index) => {
  if (index > todos.length) throw new Error("index out of range");
  todos[index].isEditMode = !todos[index].isEditMode;
  console.log("toole switch isEditmode ", todos[index].isEditMode);
  diplayTodos(todos);
};

function toggleClass(element, className) {
  if (element.classList.contains(className)) {
    element.classList.remove(className);
  } else {
    element.classList.add(className);
  }
}

// affichage des todo nouvellement creer  ou modifier dans le dom
const diplayTodos = (todos) => {
  if (!todos) throw new Error("pas de todo a afficher");
  const todosNode = todos?.map((todo, index) => {
    console.log("diplayTodos", todo);
    if (todo.isEditMode) {
      return modifyTodoElement(todo, index);
    } else {
      return createTodoElement(todo, index);
    }
  });
  ul.innerHTML = "";
  ul.append(...todosNode);
};

// fonction pour creer un element li todo
const createTodoElement = (todo, index) => {
  console.log("createTodoElement");
  const li = document.createElement("li");
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
  const inputIsChecked = document.createElement("input");
  inputIsChecked.classList.add(
    "bg-green-200",
    "checked:bg-green-600",
    "h-8",
    "w-8"
  );
  inputIsChecked.type = "checkbox";
  inputIsChecked.id = `test${index}`;
  inputIsChecked.checked = todo.isChecked;
  const label = document.createElement("label");
  label.classList.add("bg-green-500", "text-green-200");
  label.htmlFor = `test${index}`;
  label.setAttribute("aria-describedby", "label");
  label.classList.add("bg-green-500", "text-green-200");
  const div2 = document.createElement("div");
  div2.classList.add("flex-auto", "justify-center");
  const pTitre = document.createElement("p");
  pTitre.classList.add("text-center", "text-3xl", "text-white", "mx-4");
  pTitre.innerHTML = todo.titre;
  pTitre.id = `titre${index}`;

  const pDescription = document.createElement("p");
  pDescription.classList.add(
    "text-justify",
    "line-clamp-4",
    "hover:line-clamp-none"
  );
  pDescription.innerHTML = todo.description;
  pDescription.id = `description${index}`;

  const div3 = document.createElement("div");
  div3.classList.add("flex", "items-center", "gap-2", "flex-auto");
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
  buttonEdit.setAttribute("data-index", index);
  buttonEdit.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleClass(buttonEdit, "pulse");
    buttonEdit.classList.add("pulse");
    toggleTodo(index);
    console.log("click edit button", buttonEdit.getAttribute("data-index"));

    //updateTodo(todo, buttonEdit.getAttribute("data-index"));
    console.log("edit cliick");
  });

  const buttonDelete = document.createElement("button");
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
  buttonDelete.setAttribute("data-index", index);
  buttonDelete.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(
      "click suppresion button",
      buttonDelete.getAttribute("data-index")
    );
    deleteTodo(buttonDelete.getAttribute("data-index"));
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
const modifyTodoElement = (todo, index) => {
  todo.isEditMode = true;
  console.log("modifyTodoElement");
  let li = document.querySelectorAll("li");
  console.log(li);
  if (index > li?.length) throw new Error("index out of range");
  let liSelect = li[index];

  //recuperation des element a modifier
  const pTitre = liSelect.querySelector("p:first-child");
  const pDescription = liSelect.querySelector("p:last-child");
  const buttonEdit = liSelect.querySelector("button:first-child");
  const buttonDelete = liSelect.querySelector("button:last-child");
  const isChecked = liSelect.querySelector("input:first-child");
  
  // modification des elements
  pTitre.innerText = todo.titre;
  pDescription.innerText = todo.description;
  buttonEdit.textContent = "save";

  //creation des nouveau input p
  const inputTitre = document.createElement("input");
  inputTitre.classList.add(
    "text-center",
    "text-xl",
    "rounded",
    "text-blue-500",
    "px-2"
  );
  inputTitre.value = todo.titre;
  inputTitre.id = `titre${index}`;
  
    const inputDescription = document.createElement("input");
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

    inputDescription.addEventListener
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
 editTodo(inputTitre.value, inputDescription.value, index);
  });

  buttonCancel.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("click cancel button", buttonEdit.getAttribute("data-index"));
    editTodo(pTitre.innerText, pDescription.innerText, index);
  });

const div2 = pTitre.parentElement;
div2.classList.add("flex", "flex-col",  "gap-2");
div2.replaceChild(inputTitre, pTitre);
div2.replaceChild(inputDescription, pDescription);



const div3= div2.nextElementSibling;
div3.replaceChild(buttonSave, buttonEdit);
div3.replaceChild(buttonCancel, buttonDelete);


  return liSelect;
};

// fonction pour supprimer une todo sur le dom
const deleteTodoElement = (index) => {
  const li = document.querySelectorAll("li");
  if (index > li?.length) throw new Error("index out of range");
  document.querySelector("ul").removeChild(li[index]);
};

const editTodoElement = (index, titre, description) => {
  const li = document.querySelectorAll("li");

  if (index > li?.length) throw new Error("index out of range");
  const liCopy = li[index].cloneNode(true);
  const titreCreated = liCopy.querySelector("p");
  titreCreated.innerHTML = titre;
  const descriptionCreated = liCopy.querySelector("p:last-child");
  descriptionCreated.innerHTML = description;
  document.querySelector("ul").replaceChild(liCopy, li[index]);
};

export { addTodo, deleteTodo, editTodo, createTodoElement };
