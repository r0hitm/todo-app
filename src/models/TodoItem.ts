/**
 * Model for a TodoItem
 * Represents a single todo item in a list
 */
export class TodoItem {
    #id: number;
    #title: string;
    #complete: boolean;
    #description: string;
    #dueDate: Date | null;

    constructor(title: string, description: string, dueDate: Date) {
        this.#id = new Date().valueOf() + Math.floor(Math.random() * 1000); // Generate a unique ID
        this.#title = title;
        this.#complete = false;
        this.#description = description;
        this.#dueDate = dueDate;
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

    get complete(): boolean {
        return this.#complete;
    }

    toggleComplete(): void {
        this.#complete = !this.#complete;
    }

    get description(): string {
        return this.#description;
    }

    set description(description: string) {
        this.#description = description;
    }

    get dueDate(): Date | null {
        return this.#dueDate;
    }

    set dueDate(dueDate: Date | null) {
        this.#dueDate = dueDate;
    }
}
