import { addTodo, removeTodo,editTodo } from "./core";
import mockDom from "../test/dom";

let mockDOM = mockDom;

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
});

describe("remove", () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    const ul = document.createElement("ul");
    const li1 = document.createElement("li");
    const li2 = document.createElement("li");
    const li3 = document.createElement("li");
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

   test("supprimer une tâche sur list vide li absente", () => {
     // Act
     //document.body.innerHTML='';
   document.body.innerHTML = "";
    const ul = document.createElement("ul");
    console.log(document.body);
     const index = 1;
     expect(() => removeTodo(index)).toThrowError("aucune todo à supprimer");
   });
});
