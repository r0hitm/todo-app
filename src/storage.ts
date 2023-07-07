/**
 * This module contains the logic for storing and retrieving data from the browser's local storage.
 * Uses localForage package. This will be later replaced with firebase storage.
 */
// import localForage from "localforage"; // remove this line
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import { TodoLists } from "./models/TodoLists";
import { List } from "./models/List";

// Helper functions:
/**
 * Save to the firestore
 */
const set = async (todo_lists: TodoLists) => {
    const UID = auth.currentUser?.uid;
    if (UID) {
        const data = {
            data: todo_lists.serialize(),
        };
        await setDoc(doc(db, "userData", UID), data);
    }
};

/**
 * Retrieve the data
 * @returns The TodoLists object
 */
export async function getData(): Promise<TodoLists> {
    const UID = auth.currentUser?.uid;
    if (!UID) {
        throw new Error("User not logged in");
    }
    const docSnap = await getDoc(doc(db, "userData", UID));
    const data = docSnap.data()?.data;
    console.log("Data: ", data);

    if (data) {
        return TodoLists.deserialize(data);
    } else {
        const todo_lists = new TodoLists(null);
        await set(todo_lists);
        return todo_lists;
    }
}

/**
 * Get the current list
 * @returns The List object
 */
export const get_current_list = async (): Promise<List> => {
    const list = (await getData()).currentList;
    return list;
};

/**
 * Get all the lists
 * @returns All the lists
 */
export const get_lists = async (): Promise<List[]> => {
    return getData().then(todo_lists => todo_lists.lists);
};

/**
 * Add a new list
 * Note: It is responsibility of the caller to make sure that the name is not empty
 * @param name The name of the new list
 * @returns The new list
 */
export async function add_list(name: string): Promise<List> {
    const todo_lists = await getData();
    todo_lists.add_list(name);
    await set(todo_lists);
    return todo_lists.currentList;
}

/**
 * Delete a list
 * @param id The ID of the list to delete
 * @returns The new current list after deletion
 */
export async function delete_list(id: number): Promise<List> {
    const todo_lists = await getData();
    try {
        todo_lists.delete_list(id);
    } catch (error) {
        console.error(error);
    }
    await set(todo_lists);
    return todo_lists.currentList;
}

/**
 * Rename a list
 * @param id The ID of the list to rename
 * @param name The new name of the list
 */
export async function rename_list(id: number, name: string): Promise<void> {
    const todo_lists = await getData();
    todo_lists.rename_list(id, name);
    await set(todo_lists);
}

/**
 * Change the current list
 * @param id The ID of the list to set as current
 */
export async function change_list(id: number): Promise<void> {
    const todo_lists = await getData();
    todo_lists.currentListId = id;
    await set(todo_lists);
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
    const todo_lists = await getData();
    todo_lists.currentList.addTodoItem(name, description, due_date);
    await set(todo_lists);
}

/**
 * Delete a todo item from the current list
 * @param id The ID of the todo item to delete
 */
export async function delete_todo_item(id: number): Promise<void> {
    const todo_lists = await getData();
    todo_lists.currentList.removeTodoItem(id);
    await set(todo_lists);
}

/**
 * toggle a todo item from the current list
 * @param id The ID of the todo item to toggle
 */
export async function toggle_todo_item(id: number): Promise<void> {
    const todo_lists = await getData();
    todo_lists.currentList.todos.find(todo => todo.id === id)?.toggleComplete();
    await set(todo_lists);
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
    const todo_lists = await getData();
    const todo_item = todo_lists.currentList.todos.find(todo => todo.id === id);
    if (todo_item) {
        todo_item.title = name;
        todo_item.description = description;
        todo_item.dueDate = due_date;
    }
    await set(todo_lists);
}
