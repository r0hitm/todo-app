/**
 * Model for TodoLists
 * List of List objects
 */
import { List } from "./List";

export class TodoLists {
    #lists: List[];
    #currentListId: number;

    constructor(list: List[] | null) {
        if (list) {
            // console.log("Loading lists from argument");
            this.#lists = list;
            this.#currentListId = list[0].id;
            return;
        }
        // console.log("Creating new lists");
        this.#lists = [
            new List("Personal"),
            new List("Work"),
            new List("School"),
            new List("Shopping"),
        ];
        this.#currentListId = this.#lists[0].id;
    }

    // Getters and setters:
    get lists(): List[] {
        return this.#lists;
    }

    get currentListId(): number {
        return this.#currentListId;
    }

    set currentListId(id: number) {
        // console.log({ id, lists: this.#lists });

        if (!this.#lists.some(list => list.id === id)) {
            throw new Error(`List with ID ${id} does not exist`);
        }
        this.#currentListId = id;
    }

    get currentList(): List {
        return this.#lists.find(
            list => list.id === this.#currentListId
        ) as List;
    }

    /**
     * Adds a new list to the lists array. Sets the current list ID to the new list ID.
     * @param name The name of the new list.
     */
    add_list(name: string): void {
        const new_list = new List(name);
        this.#lists.push(new_list);
        this.#currentListId = new_list.id;
    }

    /**
     * Deletes a list from the lists array. Sets the current list ID to the first list ID.
     * Skips if there is only one list left.
     * @param id The ID of the list to delete.
     * @throws Error if the list ID is invalid.
     */
    delete_list(id: number): void {
        if (!this.#lists.some(list => list.id === id)) {
            throw new Error(`Delete Failed: List with ID ${id} does not exist`);
        }
        if (this.#lists.length === 1) {
            return;
        }
        this.#lists = this.#lists.filter(list => list.id !== id);
        this.#currentListId = this.#lists[0].id;
    }

    /**
     * Renames a list.
     * @param id list ID to be renamed
     * @param name new name of the list
     * @throws Error if the list ID is invalid.
     */
    rename_list(id: number, name: string): void {
        const list = this.#lists.find(list => list.id === id);
        if (!list) {
            throw new Error(`Rename Failed: List with ID ${id} does not exist`);
        }
        list.name = name;
    }

    /**
     * Serialize
     * @returns The JSON serialized string of the object
     */
    serialize(): string {
        return JSON.stringify({
            lists: this.#lists.map(list => list.serialize()),
            currentListId: this.#currentListId,
        });
    }

    /**
     * Deserialize
     * @param json The JSON serialized string of the object
     * @returns The TodoLists object
     */
    static deserialize(json: string): TodoLists {
        const parsed = JSON.parse(json);
        const lists = parsed.lists.map((list: string) =>
            List.deserialize(list)
        );
        const currentListId = parsed.currentListId;
        const todo_lists = new TodoLists(lists);
        todo_lists.currentListId = currentListId;
        return todo_lists;
    }
}
