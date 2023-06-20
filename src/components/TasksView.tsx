/**
 * Component that shows the contents of the current list
 */
import { useState } from "react";
import { List } from "../models/List";
import { TodoItem } from "../models/TodoItem";
import { EditTaskModal, AddTaskModal } from "./TaskModals";

export default function TasksView({
    currentList,
    toggleTodoItem,
    addTodoItem,
    deleteTodoItem,
    updateTodoItem,
}: {
    currentList: List;
    toggleTodoItem: (id: number) => void;
    addTodoItem: (title: string, description: string, dueDate: Date) => void;
    deleteTodoItem: (id: number) => void;
    updateTodoItem: (
        id: number,
        title: string,
        description: string,
        dueDate: Date
    ) => void;
}) {
    const [editingTask, setEditingTask] = useState<null | TodoItem>(null);
    const [addingTask, setAddingTask] = useState<boolean>(false);

    return (
        <div className="list-tasks">
            <h1>{currentList.name}</h1>
            <div className="tasks">
                <div className="list-items">
                    {currentList.todos.map(todo_item => (
                        <div className="list-item" key={todo_item.id}>
                            <div className="checkbox">
                                <input
                                    type="checkbox"
                                    checked={todo_item.complete}
                                    onChange={() => {
                                        toggleTodoItem(todo_item.id);
                                    }}
                                />
                            </div>
                            <div className="todo-item">
                                <div className="todo-item-name">
                                    {todo_item.title}
                                </div>
                                <div className="todo-item-description">
                                    {todo_item.description}
                                </div>
                                <div className="todo-item-due-date">
                                    {todo_item.dueDate?.toDateString()}
                                </div>
                            </div>
                            <span
                                className="material-symbols-rounded edit-task"
                                onClick={() => setEditingTask(todo_item)}
                            >
                                more_vert
                            </span>
                        </div>
                    ))}
                </div>
                {editingTask && (
                    <EditTaskModal
                        todo_item={editingTask}
                        deleteTodoItem={deleteTodoItem}
                        updateTodoItem={updateTodoItem}
                        closeModal={() => setEditingTask(null)}
                    />
                )}
                {addingTask && (
                    <AddTaskModal
                        addTodoItem={addTodoItem}
                        closeModal={() => setAddingTask(false)}
                    />
                )}
                <button
                    className="add-task"
                    onClick={() => setAddingTask(true)}
                >
                    <span className="material-symbols-rounded">add</span>
                </button>
                <div className="attributions">
                    <a
                        target="_blank"
                        href="https://icons8.com/icon/tIUSbVurTTrH/todo-list"
                    >
                        Todo
                    </a>{" "}
                    icon by{" "}
                    <a target="_blank" href="https://icons8.com">
                        Icons8
                    </a>
                    b
                </div>
            </div>
        </div>
    );
}
