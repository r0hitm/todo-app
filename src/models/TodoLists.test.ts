import { describe, it, expect } from "vitest";
import { TodoLists } from "./TodoLists";
import { List } from "./List";

describe("TodoLists Tests", () => {
    it("loads default lists when no lists are provided", () => {
        const todoLists = new TodoLists(null);
        expect(todoLists.lists.length).toBe(4);
    });

    it("loads provided lists when lists are provided", () => {
        const lists = [
            new List("Personal"),
            new List("Work"),
            new List("School"),
            new List("Shopping"),
        ];
        const todoLists = new TodoLists(lists);
        expect(todoLists.lists).toBe(lists);
    });

    it("current list ID is set to the first list ID when an instance is created", () => {
        const todoLists = new TodoLists(null);
        expect(todoLists.currentListId).toBe(todoLists.lists[0].id);
    });

    it("Current list can be retrieved", () => {
        const todoLists = new TodoLists(null);
        expect(todoLists.currentList).toBe(
            todoLists.lists.find(list => list.id === todoLists.currentListId)
        );
    });

    it("current list ID can be changed", () => {
        const todoLists = new TodoLists(null);
        todoLists.currentListId = todoLists.lists[1].id;
        expect(todoLists.currentListId).toBe(todoLists.lists[1].id);
    });

    it("current list ID cannot be changed to an ID that does not exist", () => {
        const todoLists = new TodoLists(null);
        expect(() => {
            todoLists.currentListId = 999;
        }).toThrow();
    });

    it("can add a list", () => {
        const todoLists = new TodoLists(null);
        todoLists.add_list("New List");
        expect(todoLists.lists.length).toBe(5);
        expect(todoLists.currentListId).toBe(todoLists.lists[4].id);
        expect(todoLists.currentList.name).toBe("New List");
    });

    it("can delete a list", () => {
        const todoLists = new TodoLists(null);
        todoLists.delete_list(todoLists.lists[0].id);
        expect(todoLists.lists.length).toBe(3);
        expect(todoLists.currentListId).toBe(todoLists.lists[0].id);
    });

    it("cannot delete a list if there is only one list left", () => {
        const todoLists = new TodoLists(null);
        todoLists.delete_list(todoLists.currentListId);
        todoLists.delete_list(todoLists.currentListId);
        todoLists.delete_list(todoLists.currentListId);
        expect(todoLists.lists.length).toBe(1);
        todoLists.delete_list(todoLists.currentListId);
        expect(todoLists.lists.length).toBe(1);
    });

    it("can rename a list", () => {
        const todoLists = new TodoLists(null);
        todoLists.rename_list(todoLists.currentListId, "New Name");
        expect(todoLists.currentList.name).toBe("New Name");
    });

    it("cannot rename a list if the list ID is invalid", () => {
        const todoLists = new TodoLists(null);
        expect(() => {
            todoLists.rename_list(999, "New Name");
        }).toThrow();
    });
});
