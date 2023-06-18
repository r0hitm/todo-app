/**
 * @module storage
 * @description This module contains the logic for storing and retrieving data from the browser's local storage.
 * Uses localForage package. This will be later replaced with firebase storage.
 */
import localForage from "localforage";
import { TodoLists } from "./models/TodoLists";
import { List } from "./models/List";

const STORAGE_KEY = "todo-lists";

let todoLists: TodoLists | null = null;

// Helper functions:
/**
 * A helper function to set the data in the local storage.
 */
const set = (todo_lists: TodoLists) => {
    return localForage.setItem(STORAGE_KEY, {
        lists: todo_lists.lists,
        currentListId: todo_lists.currentListId,
    });
};

// Main functions:
/**
 * Initialize or retrieve the lists from the local storage
 * To be replaced with firebase storage later
 */
export async function init(): Promise<void> {
    const storedData = await localForage.getItem<{
        lists: List[];
        currentListId: number;
    }>(STORAGE_KEY);

    if (storedData === null) {
        todoLists = new TodoLists(null);
    } else {
        todoLists = new TodoLists(storedData.lists);
        todoLists.currentListId = storedData.currentListId;
    }

    await set(todoLists);
}

// After init(), functions below can be used:
/**
 * Get the current list
 * @returns The current list
 */
export const get_current_list = (): List => {
    if (todoLists === null) {
        throw new Error("Todo lists not initialized");
    }
    return todoLists.currentList;
};

/**
 * Get all the lists
 * @returns All the lists
 */
export const get_lists = (): List[] => {
    if (todoLists === null) {
        throw new Error("Todo lists not initialized");
    }
    return todoLists.lists;
};

/**
 * Add a new list
 * @param name The name of the new list
 * @returns The new list
 */
export async function add_list(name: string): Promise<List> {
    if (todoLists === null) {
        throw new Error("Todo lists not initialized");
    }
    todoLists.add_list(name);
    await set(todoLists);
    return todoLists.currentList;
}

/**
 * Delete a list
 * @param id The ID of the list to delete
 */
export async function delete_list(id: number): Promise<void> {
    if (todoLists === null) {
        throw new Error("Todo lists not initialized");
    }
    todoLists.delete_list(id);
    await set(todoLists);
}

/**
 * Rename a list
 * @param id The ID of the list to rename
 * @param name The new name of the list
 */
export async function rename_list(id: number, name: string): Promise<void> {
    if (todoLists === null) {
        throw new Error("Todo lists not initialized");
    }
    todoLists.rename_list(id, name);
    await set(todoLists);
}

/**
 * Add a new todo item to the current list
 * @param name The name of the new todo item
 * @param description The description of the new todo item
 * @param due_date The due date of the new todo item
 * @returns The new todo item
 */
export async function add_todo_item(
    name: string,
    description: string,
    due_date: Date
): Promise<void> {
    if (todoLists === null) {
        throw new Error("Todo lists not initialized");
    }
    todoLists.currentList.addTodoItem(name, description, due_date);
    await set(todoLists);
}

/**
 * Delete a todo item from the current list
 * @param id The ID of the todo item to delete
 */
export async function delete_todo_item(id: number): Promise<void> {
    if (todoLists === null) {
        throw new Error("Todo lists not initialized");
    }
    todoLists.currentList.removeTodoItem(id);
    await set(todoLists);
}

/**
 * toggle a todo item from the current list
 * @param id The ID of the todo item to toggle
 */
export async function toggle_todo_item(id: number): Promise<void> {
    if (todoLists === null) {
        throw new Error("Todo lists not initialized");
    }
    todoLists.currentList.todos.forEach(todo => {
        if (todo.id === id) {
            todo.toggleComplete();
        }
    });
    await set(todoLists);
}

/**
 * update a todo item from the current list
 * @param id The ID of the todo item to update
 * @param name The new name of the todo item
 * @param description The new description of the todo item
 * @param due_date The new due date of the todo item
 */
export async function update_todo_item(
    id: number,
    name: string,
    description: string,
    due_date: Date
): Promise<void> {
    if (todoLists === null) {
        throw new Error("Todo lists not initialized");
    }
    todoLists.currentList.todos.forEach(todo => {
        if (todo.id === id) {
            todo.title = name;
            todo.description = description;
            todo.dueDate = due_date;
        }
    });
    await set(todoLists);
}
