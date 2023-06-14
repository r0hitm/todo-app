/**
 * Custom hook to manage the todo lists
 */
import { useReducer, useState } from "react";
import { TodoList } from "../models/TodoList";

type TodoListAction =
    | { type: "addTodoList"; title: string }
    | { type: "removeTodoList"; id: number }
    | {
          type: "addTodoItem";
          id: number;
          title: string;
          description: string;
          dueDate: Date;
      }
    | { type: "removeTodoItem"; id: number; todoId: number }
    | { type: "toggleTodoItem"; id: number; todoId: number }
    | { type: "editTodoItemTitle"; id: number; todoId: number; title: string }
    | {
          type: "editTodoItemDescription";
          id: number;
          todoId: number;
          description: string;
      }
    | { type: "editTodoItemDueDate"; id: number; todoId: number; dueDate: Date }
    | { type: "editTodoListTitle"; id: number; title: string };

/**
 * Reducer function for the todo lists
 * @param state Current state
 * @param action Action to perform
 * @returns New state
 */
const reducer = (state: TodoList[], action: TodoListAction): TodoList[] => {
    switch (action.type) {
        case "addTodoList": {
            return [...state, new TodoList(action.title)];
        }
        case "removeTodoList": {
            return state.filter(
                todoList =>
                    todoList.id !== action.id ||
                    (todoList.id === action.id && todoList.title !== "Default")
            );
        }
        case "addTodoItem": {
            return state.map(todoList => {
                if (todoList.id === action.id) {
                    todoList.addTodoItem(
                        action.title,
                        action.description,
                        action.dueDate
                    );
                }
                return todoList;
            });
        }
        case "removeTodoItem": {
            return state.map(todoList => {
                if (todoList.id === action.id) {
                    todoList.removeTodoItem(action.todoId);
                }
                return todoList;
            });
        }
        case "toggleTodoItem": {
            return state.map(todoList => {
                if (todoList.id === action.id) {
                    const todoItem = todoList.getTodoItem(action.todoId);
                    if (todoItem) {
                        todoItem.status = !todoItem.status;
                    }
                }
                return todoList;
            });
        }
        case "editTodoItemTitle": {
            return state.map(todoList => {
                if (todoList.id === action.id) {
                    const todoItem = todoList.getTodoItem(action.todoId);
                    if (todoItem) {
                        todoItem.title = action.title;
                    }
                }
                return todoList;
            });
        }
        case "editTodoItemDescription": {
            return state.map(todoList => {
                if (todoList.id === action.id) {
                    const todoItem = todoList.getTodoItem(action.todoId);
                    if (todoItem) {
                        todoItem.description = action.description;
                    }
                }
                return todoList;
            });
        }
        case "editTodoItemDueDate": {
            return state.map(todoList => {
                if (todoList.id === action.id) {
                    const todoItem = todoList.getTodoItem(action.todoId);
                    if (todoItem) {
                        todoItem.dueDate = action.dueDate;
                    }
                }
                return todoList;
            });
        }
        case "editTodoListTitle": {
            return state.map(todoList => {
                if (todoList.id === action.id) {
                    todoList.title = action.title;
                }
                return todoList;
            });
        }
    }
};

export const useTodos = () => {
    const [todos, dispatch] = useReducer(reducer, [new TodoList("Default")]);
    const [currentList, setCurrentList] = useState<number>(todos[0].id); // ID of the current list

    const getCurrentList = () =>
        todos.find(todoList => todoList.id === currentList);

    const changeCurrentList = (id: number) => {
        if (todos.find(todoList => todoList.id === id)) {
            setCurrentList(id);
        } else {
            throw new Error("Invalid list ID");
        }
    };

    // Action handlers
    const handleNewList = (title: string) => {
        dispatch({ type: "addTodoList", title });
    };

    const handleRemoveList = (id: number) => {
        dispatch({ type: "removeTodoList", id });
    };

    const handleNewTodoItem = (
        id: number | undefined,
        title: string,
        description: string,
        dueDate: Date
    ) => {
        if (!id) {
            throw new Error("Invalid list ID");
        }
        dispatch({ type: "addTodoItem", id, title, description, dueDate });
    };

    const handleRemoveTodoItem = (id: number, todoId: number) => {
        dispatch({ type: "removeTodoItem", id, todoId });
    };

    const handleToggleTodoItem = (id: number, todoId: number) => {
        dispatch({ type: "toggleTodoItem", id, todoId });
    };

    const handleEditTodoItemTitle = (
        id: number,
        todoId: number,
        title: string
    ) => {
        dispatch({ type: "editTodoItemTitle", id, todoId, title });
    };

    const handleEditTodoItemDescription = (
        id: number,
        todoId: number,
        description: string
    ) => {
        dispatch({ type: "editTodoItemDescription", id, todoId, description });
    };

    const handleEditTodoItemDueDate = (
        id: number,
        todoId: number,
        dueDate: Date
    ) => {
        dispatch({ type: "editTodoItemDueDate", id, todoId, dueDate });
    };

    const handleEditTodoListTitle = (id: number, title: string) => {
        dispatch({ type: "editTodoListTitle", id, title });
    };

    return {
        todos,
        getCurrentList,
        changeCurrentList,
        handleNewList,
        handleRemoveList,
        handleNewTodoItem,
        handleRemoveTodoItem,
        handleToggleTodoItem,
        handleEditTodoItemTitle,
        handleEditTodoItemDescription,
        handleEditTodoItemDueDate,
        handleEditTodoListTitle,
    };
};
