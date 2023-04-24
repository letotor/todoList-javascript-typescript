import Todo from "./interfaces/Todo.interface";
import todos from "./data/todoInit";

function addTodo(todos: Todo[], task: Todo, index = todos.length): Todo[] {
  return todos.splice(index, 0, task);
}

function editTodo(todos: Todo[], task: Partial<Todo>, index: number) {
    if (index>todos.length-1) throw new Error("index out of range");
  let taskFind: Todo =
    todos[index] && todos[index].isEditMode === true ? todos[index] : null;
  if (!taskFind) throw new Error("task not found");
  taskFind = {
    ...taskFind,...task,
    isEditMode: false,
  }; // une fois le task modifier on le passe en mode lecture
  todos.splice(index, 1, taskFind);
}

function deleteTodo(todos : Todo[],index: number) {
  console.debug("deleteTodo", index, todos);
  todos.splice(index, 1);
}

function toggleTodo(index: number) {
  console.debug("todos", todos);
  if (index > todos?.length - 1) throw new Error("index out of range");
  todos[index].isEditMode = !todos[index].isEditMode;
  console.debug("todos", todos);
}

function toggleTodoChecked(index: number) {
  if (index > todos?.length - 1) throw new Error("index out of range");
  todos[index].isChecked = !todos[index].isChecked;
}

export { todos, addTodo, editTodo, deleteTodo, toggleTodo, toggleTodoChecked };
