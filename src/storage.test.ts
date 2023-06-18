// storage.test.ts
import { beforeAll, test, expect } from "vitest";
import "fake-indexeddb/auto";
import {
    init,
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

// Set the localForage driver to IndexedDB
localForage.config({
    driver: localForage.INDEXEDDB,
});

beforeAll(async () => {
    await localForage.clear(); // Clear localForage before running tests
    await init(); // Initialize the storage
});

test("add_list adds a new list and get_lists returns the lists", async () => {
    const newListName = "Test List";
    const newList = await add_list(newListName);

    // Check if the new list has the correct name
    expect(newList.name).toBe(newListName);

    // Check if get_lists returns an array containing the new list
    const lists = get_lists();
    expect(lists).toHaveLength(5);
    expect(lists[0]).toEqual(newList);
});

test("get_current_list returns the current list", () => {
    const currentList = get_current_list();
    expect(currentList).toEqual(get_lists()[0]);
});

test("delete_list removes a list", async () => {
    const listToRemoveId = get_current_list().id;
    await delete_list(listToRemoveId);

    // Check if the list has been removed
    const remainingLists = get_lists();
    expect(remainingLists).toHaveLength(4);
});

test("rename_list updates the name of a list", async () => {
    const newName = "Renamed List";
    const list = await add_list("List to Rename");
    await rename_list(list.id, newName);

    // Check if the list has been renamed
    const updatedList = get_current_list();
    expect(updatedList.name).toBe(newName);
});

test("add_todo_item and delete_todo_item work correctly", async () => {
    const newItemName = "Test Todo Item";
    const newItemDescription = "Test Description";
    const newItemDueDate = new Date();
    await add_todo_item(newItemName, newItemDescription, newItemDueDate);

    // Check if the new item has been added to the current list
    let currentList = get_current_list();
    expect(currentList.todos).toHaveLength(1);
    expect(currentList.todos[0].title).toBe(newItemName);

    // Check if the item can be deleted
    const itemIdToDelete = currentList.todos[0].id;
    await delete_todo_item(itemIdToDelete);
    currentList = get_current_list();
    expect(currentList.todos).toHaveLength(0);
});

test("toggle_todo_item updates the completion status of a todo item", async () => {
    const newItemName = "Test Todo Item";
    const newItemDescription = "Test Description";
    const newItemDueDate = new Date();
    await add_todo_item(newItemName, newItemDescription, newItemDueDate);

    // Check if the item has been added and is initially not completed
    let currentList = get_current_list();
    expect(currentList.todos).toHaveLength(1);
    expect(currentList.todos[0].complete).toBe(false);

    // Toggle the item's completion status
    const itemIdToToggle = currentList.todos[0].id;
    await toggle_todo_item(itemIdToToggle);
    currentList = get_current_list();
    expect(currentList.todos[0].complete).toBe(true);
});

test("update_todo_item updates a todo item", async () => {
    const newItemName = "Test Todo Item";
    const newItemDescription = "Test Description";
    const newItemDueDate = new Date();
    await add_todo_item(newItemName, newItemDescription, newItemDueDate);

    // Check if the new item has been added
    let currentList = get_current_list();
    expect(currentList.todos).toHaveLength(2);

    // Update the item
    const itemIdToUpdate = currentList.todos[0].id;
    const updatedName = "Updated Todo Item";
    const updatedDescription = "Updated Description";
    const updatedDueDate = new Date(
        newItemDueDate.getTime() + 24 * 60 * 60 * 1000
    );
    await update_todo_item(
        itemIdToUpdate,
        updatedName,
        updatedDescription,
        updatedDueDate
    );

    // Check if the item has been updated
    currentList = get_current_list();
    const updatedItem = currentList.todos[0];
    expect(updatedItem.title).toBe(updatedName);
    expect(updatedItem.description).toBe(updatedDescription);
    expect((updatedItem.dueDate as Date).getTime()).toBe(
        updatedDueDate.getTime()
    );
});
