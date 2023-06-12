import { describe, it, expect } from "vitest";
import { TodoList } from "./TodoList";

describe("TodoList", () => {
    it("should create a TodoList instance with the given title", () => {
        const testTodoList = new TodoList("Test Title");
        expect(testTodoList.title).toBe("Test Title");
    });

    it("ID should be unique for each TodoList", () => {
        const testTodoList1 = new TodoList("Test Title");
        const testTodoList2 = new TodoList("Test Title");
        expect(testTodoList1.id).not.toBe(testTodoList2.id);
    });

    it("should add a TodoItem to the list", () => {
        const testTodoList = new TodoList("Test Title");
        const testTodoItem = testTodoList.addTodoItem(
            "Test Title",
            "Test Description",
            new Date()
        );
        expect(testTodoList.todos).toContain(testTodoItem);
    });

    it("should remove a TodoItem from the list", () => {
        const testTodoList = new TodoList("Test Title");
        const testTodoItem = testTodoList.addTodoItem(
            "Test Title",
            "Test Description",
            new Date()
        );
        testTodoList.removeTodoItem(testTodoItem.id);
        expect(testTodoList.todos).not.toContain(testTodoItem);
    });

    it("modifying a todo item should modify the todo item in the list", () => {
        const testTodoList = new TodoList("Test Title");
        const testTodoItem = testTodoList.addTodoItem(
            "Test Title",
            "Test Description",
            new Date()
        );
        const testTodoItemInList = testTodoList.getTodoItem(testTodoItem.id);
        if (testTodoItemInList) {
            testTodoItemInList.title = "New Title";
            expect(testTodoItemInList.title).toBe("New Title");
        }
    });
});
