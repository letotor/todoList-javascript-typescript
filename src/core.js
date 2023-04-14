const addTodo = (titre, description, isChecked) => {
    if (titre==="" | titre===undefined) throw new Error("titre absent ou vide");
    if (description===undefined) description="";

    const li = document.querySelector("li");
    const liCopy = li.cloneNode(true);

    // Ajouter l'élément liCopy au DOM
    document.querySelector("ul").appendChild(liCopy);

    // Modifier le contenu d'un paragraphe dans l'élément liCopy
    const titreCreated = liCopy.querySelector("p");
    titreCreated.innerHTML = titre;

    const descriptionCreated = liCopy.querySelector("p:last-child");
    descriptionCreated.innerHTML = description;
    const checkboxCreated = liCopy.querySelector("input");
    checkboxCreated.checked = isChecked;
    };

const removeTodo = (index) => {
    const li = document.querySelectorAll("li");
    if (li?.length===0 | li ===undefined) throw new Error("aucune todo à supprimer");
    console.log(index,li.length);
    
    if (index>li?.length) throw new Error("index out of range");
    document.querySelector("ul").removeChild(li[index]);
    console.log('li remove',li);
}

const editTodo = (index, titre,description) => {
    const li = document.querySelectorAll("li");
   
    if (index>li?.length) throw new Error("index out of range");
    const liCopy = li[index].cloneNode(true);
    const titreCreated = liCopy.querySelector("p");
    titreCreated.innerHTML = titre;
    const descriptionCreated = liCopy.querySelector("p:last-child");
    descriptionCreated.innerHTML = description;
    document.querySelector("ul").replaceChild(liCopy,li[index]);
}

export { addTodo ,removeTodo,editTodo};
