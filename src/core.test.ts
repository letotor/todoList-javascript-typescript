import {
  addTodo,
  editTodo,
  deleteTodo,
  toggleTodo,
  toggleTodoChecked,
} from "./core";
// import todos from "./data/todoInit";
import Todo from "./interfaces/Todo.interface";

describe("addTodo function", () => {
  const todos: Todo[] = [];
  beforeEach(() => {
    todos.length = 0;
    todos.push(
      {
        titre: "titre1",
        description: "description1",
        isChecked: false,
        isEditMode: false,
      },
      {
        titre: "titre2",
        description: "description2",
        isChecked: false,
        isEditMode: false,
      }
    );
  });

  it("addTodo function", () => {
    const todo = {
      titre: "ajout",
      description: "description",
      isChecked: false,
      isEditMode: false,
    };
    let todoResult: Todo[] = [...todos, todo];
    addTodo(todos, todo);
    expect(todos).toEqual(todoResult);
  });
});

describe("editTodo function", () => {
  const todos: Todo[] = [];
  beforeEach(() => {
    todos.length = 0;
    todos.push(
      {
        titre: "titre1",
        description: "description1",
        isChecked: false,
        isEditMode: true,
      },
      {
        titre: "titre2",
        description: "description2",
        isChecked: false,
        isEditMode: false,
      }
    );
  });

  it("should throw an error when todolist is empty", () => {
    todos.length = 0;
    const task = {
      titre: "titreModif",
      description: "descriptionModif",
    };
    expect(() => editTodo(todos, task, 0)).toThrowError("index out of range");
  });

  it("should throw an error when index is out of range", () => {
    const task = {
      titre: "titreModif",
      description: "descriptionModif",
    };
    expect(() => editTodo(todos, task, todos.length + 1)).toThrowError(
      "index out of range"
    );
  });

  it("should modifiy title and description todo", () => {
    let todoResult: Todo[] = [
      {
        titre: "titreModif",
        description: "descriptionModif",
        isChecked: false,
        isEditMode: false,
      },
      {
        titre: "titre2",
        description: "description2",
        isChecked: false,
        isEditMode: false,
      },
    ];
    const task = {
      titre: "titreModif",
      description: "descriptionModif",
    };
    editTodo(todos, task, 0);
    expect(todos).toEqual(todoResult);
  });
});

describe("deleteTodo function", () => {
  const todos: Todo[] = [];
  it("should delete a todo with 1 ", () => {
    todos.length = 0;
    todos.push({
      titre: "titre1",
      description: "description1",
      isChecked: false,
      isEditMode: false,
    });
    let todoResult: Todo[] = [];
    deleteTodo(todos, 0);
    expect(todos).toEqual(todoResult);
  });
  it("should delete last todo", () => {
    let todoResult: Todo[] = [...todos];
    todos.push({
      titre: "titre1",
      description: "description1",
      isChecked: false,
      isEditMode: false,
    });
    deleteTodo(todos, todos.length - 1);
    expect(todos).toEqual(todoResult);
  });
});

describe("toggleTodo function", () => {
  const todos: Todo[] = [];
  beforeEach(() => {
    todos.length = 0;
    todos.push(
      {
        titre: "titre1",
        description: "description1",
        isChecked: false,
        isEditMode: true,
      },
      {
        titre: "titre2",
        description: "description2",
        isChecked: false,
        isEditMode: false,
      }
    );
  });
  it("should throw an error when index is out of range", () => {
    todos.length = 0;
    expect(() => toggleTodo(todos, 0)).toThrowError("index out of range");
  });

  it("should toggle todo is isEditMode", () => {
    todos.length = 0;
    todos.push(
      {
        titre: "titre1",
        description: "description1",
        isChecked: false,
        isEditMode: false,
      },
      {
        titre: "titre2",
        description: "description2",
        isChecked: false,
        isEditMode: false,
      }
    );
    let todoResult: Todo[] = [
      {
        titre: "titre1",
        description: "description1",
        isChecked: false,
        isEditMode: false,
      },
      {
        titre: "titre2",
        description: "description2",
        isChecked: false,
        isEditMode: true,
      },
    ];
    toggleTodo(todos, 1);
    expect(todos).toEqual(todoResult);
  });
});

describe("toggleTodo Checked function", () => {
  const todos: Todo[] = [];
  beforeEach(() => {
    todos.length = 0;
    todos.push(
      {
        titre: "titre1",
        description: "description1",
        isChecked: false,
        isEditMode: true,
      },
      {
        titre: "titre2",
        description: "description2",
        isChecked: false,
        isEditMode: false,
      }
    );
  });
  it("should throw an error when index is out of range", () => {
    todos.length = 0;
    expect(() => toggleTodo(todos, 0)).toThrowError("index out of range");
  });

  it("should toggle todo is isChecked", () => {
    todos.length = 0;
    todos.push(
      {
        titre: "titre1",
        description: "description1",
        isChecked: false,
        isEditMode: false,
      },
      {
        titre: "titre2",
        description: "description2",
        isChecked: false,
        isEditMode: false,
      }
    );
    let todoResult: Todo[] = [
      {
        titre: "titre1",
        description: "description1",
        isChecked: false,
        isEditMode: false,
      },
      {
        titre: "titre2",
        description: "description2",
        isChecked: true,
        isEditMode: false,
      },
    ];
    toggleTodoChecked(todos, 1);
    expect(todos).toEqual(todoResult);
  });
});
