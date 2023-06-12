/**
 * Logic for a todo item
 */
export class TodoItem {
    #id: number;
    #title: string;
    #status: boolean;
    #description: string;
    #dueDate: Date;

    constructor(title: string, description: string, dueDate: Date) {
        this.#id = new Date().valueOf() + Math.floor(Math.random() * 1000); // Generate a unique ID
        this.#title = title;
        this.#status = false;
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

    get status(): boolean {
        return this.#status;
    }

    set status(status: boolean) {
        this.#status = status;
    }

    get description(): string {
        return this.#description;
    }

    set description(description: string) {
        this.#description = description;
    }

    get dueDate(): Date {
        return this.#dueDate;
    }

    set dueDate(dueDate: Date) {
        this.#dueDate = dueDate;
    }
}