import { addTodo, removeTodo, editTodo, createTodoElement } from "./core";
import mockDom from "../test/dom";


let mockDOM = mockDom.mockDom;

console.log('testEnvironment:',testEnvironment);
describe("addTodo", () => {
  beforeEach(() => {
    document.body.innerHTML = mockDOM;
  });

  test("vérifie l'existence d'un élément dans le document", () => {
    // console.log(document.body.innerHTML);
    // Créez un élément div et ajoutez-le au document
    const div = document.createElement("div");
    document.body.appendChild(div);

    // Vérifiez que l'élément existe dans le document
    const elementExiste = document.querySelector("div") !== null;
    expect(elementExiste).toBe(true);
  });

  test("ajouter une todo", () => {
    // Arrange

    const titre = "ajouter un nouveau titre";
    const description = "ajouter une nouvelle description";
    const isChecked = true;
    // Act
    addTodo(titre, description, isChecked);

    // Assert
    const li = document.querySelector("li:last-child");
    const titreCreated = li.querySelector("p");
    expect(titreCreated.innerHTML).toBe(titre);
    const descriptionCreated = li.querySelector("p:last-child");
    expect(descriptionCreated.innerHTML).toBe(description);
    const checkboxCreated = li.querySelector("input");
    expect(checkboxCreated.checked).toBe(true);
  });

  test("erreur si ajout d un todo sans titre", () => {
    const titre = "";
    const description = "ajouter une description";
    const isChecked = true;

    expect(() => addTodo(titre, description, isChecked)).toThrowError(
      "titre absent ou vide"
    );
  });

  test("valide si ajout d un todo sans description", () => {
    const titre = "ajouter un titre";
    const isChecked = true;

    addTodo(titre, undefined, isChecked);
    const li = document.querySelector("li:last-child");
    const titreCreated = li.querySelector("p");
    expect(titreCreated.innerHTML).toBe(titre);
    const descriptionCreated = li.querySelector("p:last-child");
    expect(descriptionCreated.innerHTML).toBe("");
    const checkboxCreated = li.querySelector("input");
    expect(checkboxCreated.checked).toBe(true);
  });

  test("creer un element sur le DOM a la fin de la liste", () => {
    // Act
   
        console.log('first')
      const todo = {
        titre: "ajouter un titre",
        description: "ajouter une description",
        isChecked: true,
      };

      createTodoElement(todo, 10);
      console.log(document.querySelector("li:last-child"));
      // expect(document.querySelector("li:last-child")).innerHtml).toBe('<li class="border-2 rounded-lg border-green-500 overflow-hidden my-4 flex-wrap"><div class="flex flex-row justify-between p-2 gap-4 "><div class="flex items-center mb-4"><input class="bg-green-200 checked:bg-green-600 h-8 w-8  " type="checkbox" id="test1" /><label class="bg-green-500 text-green-200" for="test1" aria-describedby="label"></label></div><div class="flex-auto justify-center"><p class="text-center text-3xl  text-white mx-4">ajouter un titre</p><p class="text-justify line-clamp-4 hover:line-clamp-none">ajouter une description</p></div><div class="flex items-center gap-2 flex-auto"><button class="box-decoration-slice border-green-500 border bg-green-500 rounded text-white p-2">editer</button><button class="box-decoration-slice border-red-500 border bg-red-500 rounded text-white p-2">Supprimer</button></div></div></li>')
    });
  
});

describe("remove", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
    const ul = document.createElement("ul");
    const li1 = document.createElement("li");
    li1.innerHTML = "todo1";

    const li2 = document.createElement("li");
    li2.innerHTML = "todo2";
    const li3 = document.createElement("li");
    li3.innerHTML = "todo3";
    ul.appendChild(li1);
    ul.appendChild(li2);

    ul.appendChild(li3);
    document.body.appendChild(ul);
  });

  test("supprimer une tâche en dehors de la liste", () => {
    // Act
    const index = 10;
    expect(() => removeTodo(index)).toThrowError("index out of range");
  });

  test("supprimer une tâche de la liste", () => {
    // Act
    const index = 1;

    //act
    removeTodo(index);

    expect(document.body.innerHTML).toBe(
      "<ul><li>todo1</li><li>todo3</li></ul>"
    );
  });

  test("supprimer une tâche sur list vide li absente", () => {
    // Act
    //document.body.innerHTML='';
    document.body.innerHTML = "";
    const ul = document.createElement("ul");
    //console.log(document.body);
    const index = 1;
    expect(() => removeTodo(index)).toThrowError("aucune todo à supprimer");
  });
});
