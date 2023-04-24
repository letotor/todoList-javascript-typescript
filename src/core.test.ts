import {
  addTodo,
  editTodo,
  deleteTodo,
  toggleTodo,
  toggleTodoChecked,
  todos,
} from "./core";
import Todo from "./interfaces/Todo.interface";

describe("addTodo function", () => {
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
    addTodo(todo);
    expect(todos).toEqual(todoResult);
  });
});

describe("editTodo function", () => {
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
    editTodo(0, "titreModif", "descriptionModif", false);
    expect(todos).toEqual(todoResult);
  });
});

describe("deleteTodo function", () => {
  it("should delete a todo with 1 ", () => {
    todos.length = 0;
    todos.push({
      titre: "titre1",
      description: "description1",
      isChecked: false,
      isEditMode: false,
    });
    let todoResult: Todo[] = [];
    deleteTodo(0);
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
    deleteTodo(todos.length - 1);
    expect(todos).toEqual(todoResult);
  });
});

describe("toggleTodo function", () => {
  it("should throw an error when index is out of range", () => {
    todos.length = 0;
    expect(() => toggleTodo(0)).toThrowError("index out of range");
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
    toggleTodo(1);
    expect(todos).toEqual(todoResult);
  });
});

describe("toggleTodo Checked function", () => {
  it("should throw an error when index is out of range", () => {
    todos.length = 0;
    expect(() => toggleTodo(0)).toThrowError("index out of range");
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
    toggleTodoChecked(1);
    expect(todos).toEqual(todoResult);
  });
});
