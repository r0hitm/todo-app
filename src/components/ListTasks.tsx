import { useState } from "react";
import { List } from "../models/List";
import TodoItemView from "./TodoItemView";

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
    changeTaskDueDate: (id: number, todoId: number, dueDate: Date) => void;
    viewingAllLists: boolean;
}) {
    const [addingTask, setAddingTask] = useState(false);

    function toggle_task_handler(todoId: number) {
        toggleTask(activeList.id, todoId);
    }

    if (!viewingAllLists) {
        if (addingTask) {
            return (
                <form
                    className="new-task-form"
                    onSubmit={e => {
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
                >
                    <h3>Add New Task</h3>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" placeholder="Title" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea id="description" placeholder="Description" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="due-date">Due Date</label>
                        <input type="date" id="due-date" />
                    </div>
                    <div className="form-group">
                        <button type="submit">Add</button>
                        <button
                            type="button"
                            onClick={() => setAddingTask(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
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
