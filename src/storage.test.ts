// storage.test.ts
import { beforeAll, test, expect } from "vitest";
import "fake-indexeddb/auto";
import {
    add_list,
    get_lists,
    get_current_list,
    delete_list,
    rename_list,
    add_todo_item,
    delete_todo_item,
    toggle_todo_item,
    update_todo_item,
} from "./storage";
import localForage from "localforage";
import { List } from "./models/List";

// Set the localForage driver to IndexedDB
localForage.config({
    driver: localForage.INDEXEDDB,
});

beforeAll(async () => {
    await localForage.clear(); // Clear localForage before running tests
});

// Write tests here
test("add_list and get_lists", async () => {
    await add_list("New List");
    const lists = await get_lists();
    expect(lists.length).toBe(5);
});

test("get_current_list", async () => {
    const currentList = await get_current_list();
    expect(currentList).toBeInstanceOf(List);
});

test("delete_list", async () => {
    const currentList = await get_current_list();
    await delete_list(currentList.id);
    const lists = await get_lists();
    expect(lists.length).toBe(4);
});

test("rename_list", async () => {
    const currentList = await get_current_list();
    await rename_list(currentList.id, "Renamed List");
    const renamedList = await get_current_list();
    expect(renamedList.name).toBe("Renamed List");
});

test("add_todo_item and delete_todo_item", async () => {
    await add_todo_item("New Todo", "Description", new Date());
    const currentList = await get_current_list();
    expect(currentList.todos.length).toBe(1);
    expect(currentList.todos[0].title).toBe("New Todo");

    await delete_todo_item(currentList.todos[0].id);
    const updatedList = await get_current_list();
    expect(updatedList.todos.length).toBe(0);
});

test("toggle_todo_item", async () => {
    await add_todo_item("New Todo", "Description", new Date());
    const currentList = await get_current_list();
    const todoItem = currentList.todos[0];
    expect(todoItem.complete).toBe(false);

    await toggle_todo_item(todoItem.id);
    const updatedList = await get_current_list();
    expect(updatedList.todos[0].complete).toBe(true);
});

test("update_todo_item", async () => {
    await add_todo_item("New Todo", "Description", new Date());
    const currentList = await get_current_list();
    const todoItem = currentList.todos[0];

    await update_todo_item(
        todoItem.id,
        "Updated Todo",
        "Updated Description",
        new Date()
    );
    const updatedList = await get_current_list();
    const updatedTodoItem = updatedList.todos[0];
    expect(updatedTodoItem.title).toBe("Updated Todo");
    expect(updatedTodoItem.description).toBe("Updated Description");
});
