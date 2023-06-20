/**
 * Modal to edit a task
 */
import { TodoItem } from "../models/TodoItem";

export function EditTaskModal({
    todo_item,
    updateTodoItem,
    deleteTodoItem,
    closeModal,
}: {
    todo_item: TodoItem;
    deleteTodoItem: (id: number) => void;
    updateTodoItem: (
        id: number,
        title: string,
        description: string,
        dueDate: Date
    ) => void;
    closeModal: () => void;
}) {
    return (
        <div className="modal">
            <div className="modal-content">
                <h2 className="modal-header">Edit Task</h2>
                <form
                    className="modal-form"
                    onSubmit={e => {
                        e.preventDefault();
                        const form = e.target as HTMLFormElement;
                        const formData = new FormData(form);
                        const title = formData.get("title") as string;
                        if (title === "") {
                            alert("Title cannot be empty");
                            closeModal();
                            return;
                        }
                        const description = formData.get(
                            "description"
                        ) as string;
                        const dueDate = formData.get("due-date") as string;
                        updateTodoItem(
                            todo_item.id,
                            title,
                            description,
                            new Date(dueDate)
                        );
                        form.reset();
                        closeModal();
                    }}
                >
                    <input
                        type="text"
                        name="title"
                        placeholder="Enter Task Title"
                        defaultValue={todo_item.title}
                    />
                    <input
                        type="text"
                        name="description"
                        placeholder="Enter Task Description"
                        defaultValue={todo_item.description}
                    />
                    <input
                        type="date"
                        name="due-date"
                        placeholder="Enter Task Due Date"
                        defaultValue={todo_item.dueDate?.toDateString()}
                    />
                    <div className="modal-form-buttons">
                        <button type="submit">Save</button>
                        <button
                            type="button"
                            onClick={() => {
                                deleteTodoItem(todo_item.id);
                                closeModal();
                            }}
                        >
                            Delete
                        </button>
                        <button type="button" onClick={() => closeModal()}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

/**
 * Modal to add a task
 */
export function AddTaskModal({
    addTodoItem,
    closeModal,
}: {
    addTodoItem: (title: string, description: string, dueDate: Date) => void;
    closeModal: () => void;
}) {
    return (
        <div className="modal">
            <div className="modal-content">
                <h2 className="modal-header">Add Task</h2>
                <form
                    className="modal-form"
                    onSubmit={e => {
                        e.preventDefault();
                        const form = e.target as HTMLFormElement;
                        const formData = new FormData(form);
                        const title = formData.get("title") as string;
                        if (title === "") {
                            alert("Title cannot be empty");
                            closeModal();
                            return;
                        }
                        const description = formData.get(
                            "description"
                        ) as string;
                        const dueDate = formData.get("due-date") as string;
                        addTodoItem(title, description, new Date(dueDate));
                        form.reset();
                        closeModal();
                    }}
                >
                    <input
                        type="text"
                        name="title"
                        placeholder="Enter Task Title"
                    />
                    <input
                        type="text"
                        name="description"
                        placeholder="Enter Task Description"
                    />
                    <input
                        type="date"
                        name="due-date"
                        placeholder="Enter Task Due Date"
                    />
                    <div className="modal-form-buttons">
                        <button type="submit">Add</button>
                        <button type="button" onClick={() => closeModal()}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
