import { describe, it, expect } from "vitest";
import { TodoItem } from "./TodoItem";

describe("TodoItem", () => {
    it("should create a TodoItem instance with the given data with unique id", () => {
        const testTodoItem = new TodoItem(
            "Test Title",
            "Test Description",
            new Date()
        );
        expect(testTodoItem.title).toBe("Test Title");
        expect(testTodoItem.description).toBe("Test Description");
        expect(testTodoItem.dueDate).toBeInstanceOf(Date);
    });

    it("ID should be unique for each TodoItem", () => {
        const testTodoItem1 = new TodoItem(
            "Test Title",
            "Test Description",
            new Date()
        );
        const testTodoItem2 = new TodoItem(
            "Test Title",
            "Test Description",
            new Date()
        );
        expect(testTodoItem1.id).not.toBe(testTodoItem2.id);
    });

    it("should toggle the complete status of the TodoItem", () => {
        const testTodoItem = new TodoItem(
            "Test Title",
            "Test Description",
            new Date()
        );
        expect(testTodoItem.complete).toBe(false);
        testTodoItem.toggleComplete();
        expect(testTodoItem.complete).toBe(true);
        testTodoItem.toggleComplete();
        expect(testTodoItem.complete).toBe(false);
    });

    it("should serialize the TodoItem to JSON", () => {
        const testTodoItem = new TodoItem(
            "Test Title",
            "Test Description",
            new Date()
        );
        const serializedTodoItem = testTodoItem.serialize();
        expect(serializedTodoItem).toBe(
            JSON.stringify({
                id: testTodoItem.id,
                title: testTodoItem.title,
                complete: testTodoItem.complete,
                description: testTodoItem.description,
                dueDate: testTodoItem.dueDate,
            })
        );
    });

    it("should deserialize the TodoItem from JSON", () => {
        const testTodoItem = new TodoItem(
            "Test Title",
            "Test Description",
            new Date()
        );
        const serializedTodoItem = testTodoItem.serialize();
        const deserializedTodoItem = TodoItem.deserialize(serializedTodoItem);
        expect(deserializedTodoItem).toBeInstanceOf(TodoItem);
        expect(deserializedTodoItem.id).toBe(testTodoItem.id);
        expect(deserializedTodoItem.title).toBe(testTodoItem.title);
        expect(deserializedTodoItem.complete).toBe(testTodoItem.complete);
        expect(deserializedTodoItem.description).toBe(testTodoItem.description);
        expect(deserializedTodoItem.dueDate).toStrictEqual(testTodoItem.dueDate);
    });
});
