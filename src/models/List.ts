/**
 * Model for a List
 * List of TodoItem objects
 */
import { TodoItem } from "./TodoItem";

export class List {
    #id: number;
    #name: string;
    #todos: TodoItem[];

    // Creates a new list with a unique ID or copy of an existing list
    constructor(name: string | List) {
        if (typeof name === "string") {
            this.#id = new Date().valueOf() + Math.floor(Math.random() * 1000); // Generate a unique ID
            this.#name = name;
            this.#todos = [];
        } else {
            this.#id = name.id;
            this.#name = name.name;
            this.#todos = [...name.todos];
        }
    }

    // Getters and setters:
    // ID is read-only
    get id(): number {
        return this.#id;
    }

    get name(): string {
        return this.#name;
    }

    set name(title: string) {
        this.#name = title;
    }

    get todos(): TodoItem[] {
        return this.#todos;
    }

    // cannot set todos directly

    /**
     * Add a todo item to the list
     * @param title Title of the todo item
     * @param description Description of the todo item
     * @param dueDate Due date of the todo item
     * @returns The todo item that was added
     */
    addTodoItem(
        title: string,
        description: string,
        dueDate: Date = new Date()
    ): TodoItem {
        const todoItem = new TodoItem(title, description, dueDate);
        this.#todos.push(todoItem);
        return todoItem;
    }

    /**
     * Remove a todo item from the list
     * @param id ID of the todo item to remove
     * @returns The todo item that was removed, or false if no item was removed
     */
    removeTodoItem(id: number): TodoItem | false {
        let returnItem: TodoItem | false = false;
        this.#todos = this.#todos.filter(todoItem => {
            if (todoItem.id === id) {
                returnItem = todoItem;
                return false;
            }
            return true;
        });
        return returnItem;
    }

    /**
     * Get a todo item from the list
     * @param id ID of the todo item to get
     * @returns The todo item that was retrieved, or undefined if no item was found
     * Note: This does not return a copy of the todo item, but the actual todo item
     */
    getTodoItem(id: number): TodoItem | undefined {
        return this.#todos.find(todoItem => todoItem.id === id);
    }
}
