/**
 * Logic for a todo list
 */
import { TodoItem } from "./TodoItem";

export class TodoList {
    #id: number;
    #title: string;
    #todos: TodoItem[];

    constructor(title: string) {
        this.#id = new Date().valueOf(); // Generate a unique ID
        this.#title = title;
        this.#todos = [];
    }

    // Getters and setters:
    // ID is read-only
    get id(): number {
        return this.#id;
    }

    get title(): string {
        return this.#title;
    }

    set title(title: string) {
        this.#title = title;
    }

    get todos(): TodoItem[] {
        return this.#todos;
    }

    /**
     * Add a todo item to the list
     * @param title Title of the todo item
     * @param description Description of the todo item
     * @param dueDate Due date of the todo item
     * @returns The todo item that was added
     */
    addTodoItem(title: string, description: string, dueDate: Date): TodoItem {
        const todoItem = new TodoItem(title, description, dueDate);
        this.#todos.push(todoItem);
        return todoItem;
    }

    /**
     * Remove a todo item from the list
     * @param id ID of the todo item to remove
     * @returns The todo item that was removed, or undefined if no item was removed
     */
    removeTodoItem(id: number): TodoItem | undefined {
        let returnItem: TodoItem | undefined = undefined;
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
