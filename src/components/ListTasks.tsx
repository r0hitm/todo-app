import { useState } from "react";
import { List } from "../models/List";
import TodoItemView from "./TodoItemView";
import TaskForm from "./TaskForm";
import { TodoItem } from "../models/TodoItem";

export default function ListTasks({
    activeList,
    addNewTask,
    removeTask,
    toggleTask,
    renameTask,
    changeTaskDesc,
    changeTaskDueDate,
    viewingAllLists,
}: {
    activeList: List;
    addNewTask: (
        id: number,
        title: string,
        description: string,
        dueDate: Date
    ) => void;
    removeTask: (id: number, todoId: number) => void;
    toggleTask: (id: number, todoId: number) => void;
    renameTask: (id: number, todoId: number, title: string) => void;
    changeTaskDesc: (id: number, todoId: number, description: string) => void;
    changeTaskDueDate: (id: number, todoId: number, dueDate: Date | null) => void;
    viewingAllLists: boolean;
}) {
    const [addingTask, setAddingTask] = useState(false);
    const [editingTask, setEditingTask] = useState<TodoItem | null>(null);

    function toggle_task_handler(todoId: number) {
        toggleTask(activeList.id, todoId);
    }

    if (!viewingAllLists) {
        if (addingTask) {
            return (
                <TaskForm
                    submitHandler={e => {
                        e.preventDefault();
                        setAddingTask(false);

                        const title = (
                            document.getElementById("title") as HTMLInputElement
                        ).value;
                        const description = (
                            document.getElementById(
                                "description"
                            ) as HTMLInputElement
                        ).value;
                        const dueDate = (
                            document.getElementById(
                                "due-date"
                            ) as HTMLInputElement
                        ).valueAsDate;
                        if (title) {
                            addNewTask(
                                activeList.id,
                                title,
                                description ? description : "",
                                dueDate ? dueDate : new Date()
                            );
                        }
                    }}
                    cancelHandler={() => setAddingTask(false)}
                />
            );
        } else if (editingTask) {
            return (
                <TaskForm
                    submitHandler={e => {
                        e.preventDefault();
                        setEditingTask(null);

                        const title = (
                            document.getElementById("title") as HTMLInputElement
                        ).value.trim();
                        const description = (
                            document.getElementById(
                                "description"
                            ) as HTMLInputElement
                        ).value.trim();
                        const dueDate = (
                            document.getElementById(
                                "due-date"
                            ) as HTMLInputElement
                        ).valueAsDate;

                        title &&
                            renameTask(activeList.id, editingTask.id, title);
                        description
                            ? changeTaskDesc(
                                  activeList.id,
                                  editingTask.id,
                                  description
                              )
                            : changeTaskDesc(activeList.id, editingTask.id, "");
                        dueDate
                            ? changeTaskDueDate(
                                  activeList.id,
                                  editingTask.id,
                                  dueDate
                              )
                            : changeTaskDueDate(
                                  activeList.id,
                                  editingTask.id,
                                  null
                              );
                    }}
                    cancelHandler={() => setEditingTask(null)}
                    defaultValues={{
                        title: editingTask?.title,
                        description: editingTask?.description,
                    }}
                    deleteTask={() => {
                        removeTask(activeList.id, editingTask.id);
                        setEditingTask(null);
                    }}
                />
            );
        } else {
            return (
                <>
                    <div className="list-items">
                        {activeList.todos.map(item => (
                            <TodoItemView
                                key={item.id}
                                item={item}
                                toggler={toggle_task_handler}
                                editHandler={() => setEditingTask(item)}
                            />
                        ))}
                    </div>
                    <a className="add-task" onClick={() => setAddingTask(true)}>
                        <span className="material-symbols-rounded">
                            add_circle
                        </span>
                    </a>
                </>
            );
        }
    }
}
