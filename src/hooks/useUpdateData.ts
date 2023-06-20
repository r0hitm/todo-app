import { useCallback } from "react";
import {
    add_list,
    delete_list,
    rename_list,
    change_list,
    add_todo_item,
    delete_todo_item,
    toggle_todo_item,
    update_todo_item,
} from "../storage";

export default function useUpdateData(refresh: () => void) {
    const addList = useCallback(
        async (name: string) => {
            await add_list(name);
            refresh();
        },
        [refresh]
    );

    const deleteList = useCallback(
        async (id: number) => {
            await delete_list(id);
            refresh();
        },
        [refresh]
    );

    const renameList = useCallback(
        async (id: number, name: string) => {
            await rename_list(id, name);
            refresh();
        },
        [refresh]
    );

    const changeList = useCallback(
        async (id: number) => {
            await change_list(id);
            refresh();
        },
        [refresh]
    );

    const addTodoItem = useCallback(
        async (name: string, description: string, due_date: Date) => {
            await add_todo_item(name, description, due_date);
            refresh();
        },
        [refresh]
    );

    const deleteTodoItem = useCallback(
        async (id: number) => {
            await delete_todo_item(id);
            refresh();
        },
        [refresh]
    );

    const toggleTodoItem = useCallback(
        async (id: number) => {
            await toggle_todo_item(id);
            refresh();
        },
        [refresh]
    );

    const updateTodoItem = useCallback(
        async (
            id: number,
            name: string,
            description: string,
            due_date: Date
        ) => {
            await update_todo_item(id, name, description, due_date);
            refresh();
        },
        [refresh]
    );

    return {
        addList,
        deleteList,
        renameList,
        changeList,
        addTodoItem,
        deleteTodoItem,
        toggleTodoItem,
        updateTodoItem,
    };
}
