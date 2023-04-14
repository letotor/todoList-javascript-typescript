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


export { addTodo };
