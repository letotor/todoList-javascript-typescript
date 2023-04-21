
import Todo from "./interfaces/Todo.interface";
import todos from "./data/todoInit";

function addTodo(todo: Todo, index = todos.length) {
    todos.splice(index, 0, todo);
};

function editTodo(
    index: number,
    inputTitre: string,
    inputDescription: string,
    inputIsChecked?: boolean,
) {
    let todo = {
        titre: inputTitre,
        description: inputDescription,
        isChecked: inputIsChecked ,
        isEditMode: false,// une fois le todo modifier on le passe en mode lecture
    };
    todos.splice(index, 1, todo);
};

function deleteTodo(index: number) {
    console.debug('deleteTodo', index, todos)
    todos.splice(index, 1);
};

function toggleTodo(index: number) {
    console.debug('todos', todos);
    if (index > todos?.length-1) throw new Error("index out of range");
    todos[index].isEditMode = !todos[index].isEditMode;
    console.debug('todos', todos);
};

function toggleTodoChecked(index: number) {
    if (index >= todos.length) throw new Error("index out of range");
    todos[index].isChecked = !todos[index].isChecked;
};


export { todos, addTodo, editTodo, deleteTodo, toggleTodo, toggleTodoChecked };
