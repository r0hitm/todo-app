/**
 * Custom hook to manage the todo lists
 */
import { useReducer, useState } from "react";
import { List } from "../models/List";

type TodoListAction =
    | { type: "addList"; name: string }
    | { type: "removeList"; listId: number }
    | { type: "renameList"; listId: number; name: string }
    | {
          type: "addTask";
          listId: number;
          title: string;
          description: string;
          dueDate: Date;
      }
    | { type: "removeTask"; listId: number; todoId: number }
    | { type: "toggleComplete"; listId: number; todoId: number }
    | {
          type: "renameTask";
          listId: number;
          todoId: number;
          title: string;
      }
    | {
          type: "changeTaskDescription";
          listId: number;
          todoId: number;
          description: string;
      }
    | {
          type: "changeTaskDueDate";
          listId: number;
          todoId: number;
          dueDate: Date;
      };

/**
 * Reducer function for the todo lists
 * @param state Current state
 * @param action Action to perform
 * @returns New state
 */
const reducer = (state: List[], action: TodoListAction): List[] => {
    switch (action.type) {
        case "addList": {
            return [...state, new List(action.name)];
        }
        case "removeList": {
            if (state.length === 1) return state; // Don't allow removing the last list
            return state.filter(todoList => todoList.id !== action.listId);
        }
        case "renameList": {
            return state.map(todoList => {
                if (todoList.id === action.listId) {
                    todoList.name = action.name;
                }
                return todoList;
            });
        }
        case "addTask": {
            return state.map(todoList => {
                if (todoList.id === action.listId) {
                    const updatedList = new List(todoList); // make a copy
                    updatedList.addTodoItem(
                        action.title,
                        action.description,
                        action.dueDate
                    );
                    return updatedList;
                }
                return todoList;
            });
        }
        case "removeTask": {
            return state.map(todoList => {
                if (todoList.id === action.listId) {
                    todoList.removeTodoItem(action.todoId);
                }
                return todoList;
            });
        }
        case "toggleComplete": {
            return state.map(todoList => {
                if (todoList.id === action.listId) {
                    const todoItem = todoList.getTodoItem(action.todoId);
                    todoItem?.toggleComplete();
                }
                return todoList;
            });
        }
        case "renameTask": {
            return state.map(todoList => {
                if (todoList.id === action.listId) {
                    const todoItem = todoList.getTodoItem(action.todoId);
                    if (todoItem) {
                        todoItem.title = action.title;
                    }
                }
                return todoList;
            });
        }
        case "changeTaskDescription": {
            return state.map(todoList => {
                if (todoList.id === action.listId) {
                    const todoItem = todoList.getTodoItem(action.todoId);
                    if (todoItem) {
                        todoItem.description = action.description;
                    }
                }
                return todoList;
            });
        }
        case "changeTaskDueDate": {
            return state.map(todoList => {
                if (todoList.id === action.listId) {
                    const todoItem = todoList.getTodoItem(action.todoId);
                    if (todoItem) {
                        todoItem.dueDate = action.dueDate;
                    }
                }
                return todoList;
            });
        }
    }
};

export const useTodos = () => {
    const [lists, dispatch] = useReducer(reducer, [
        new List("Personal"),
        new List("Work"),
        new List("School"),
        new List("Shopping"),
    ]);
    const [activeListId, setActiveListId] = useState<number>(lists[0].id); // ID of the current list

    /**
     * Get the active list
     * @returns The active list
     */
    const get_active_list = (): List =>
        lists.find(todoList => todoList.id === activeListId) as List;

    /**
     * Change the active list
     * @param id ID of the list to change to
     * @throws Error if the list ID is invalid
     * @returns void
     */
    const change_active_list = (id: number): void => {
        if (lists.find(todoList => todoList.id === id)) {
            setActiveListId(id);
        } else {
            throw new Error("Invalid list ID");
        }
    };

    // Action handlers
    const add_new_list = (name: string) => {
        dispatch({ type: "addList", name });
        setActiveListId(lists[lists.length - 1].id); // Set the new list as active
    };

    // Only the current list can be removed
    const remove_list = (id: number) => {
        if (id === activeListId && lists.length > 1) {
            dispatch({ type: "removeList", listId: id });
            setActiveListId((lists.find(l => l.id !== id) as List).id); // Set the first list as active
        }
    };

    const rename_list = (id: number, new_name: string) => {
        dispatch({ type: "renameList", listId: id, name: new_name });
    };

    const add_new_task = (
        id: number,
        title: string,
        description: string,
        dueDate: Date
    ) => {
        dispatch({ type: "addTask", listId: id, title, description, dueDate });
    };

    const remove_task = (id: number, todoId: number) => {
        dispatch({ type: "removeTask", listId: id, todoId });
    };

    const toggle_task = (id: number, todoId: number) => {
        dispatch({ type: "toggleComplete", listId: id, todoId });
    };

    const rename_task = (id: number, todoId: number, title: string) => {
        dispatch({ type: "renameTask", listId: id, todoId, title });
    };

    const change_task_desc = (
        id: number,
        todoId: number,
        description: string
    ) => {
        dispatch({
            type: "changeTaskDescription",
            listId: id,
            todoId,
            description,
        });
    };

    const change_task_due_date = (
        id: number,
        todoId: number,
        dueDate: Date
    ) => {
        dispatch({ type: "changeTaskDueDate", listId: id, todoId, dueDate });
    };

    return {
        lists,
        get_active_list,
        change_active_list,
        add_new_list,
        rename_list,
        remove_list,
        add_new_task,
        remove_task,
        toggle_task,
        rename_task,
        change_task_desc,
        change_task_due_date,
    };
};
