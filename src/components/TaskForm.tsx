export default function TaskForm({
    submitHandler,
    cancelHandler,
    deleteTask,
    defaultValues,
}: {
    submitHandler: (e: React.FormEvent<HTMLFormElement>) => void;
    cancelHandler: () => void;
    deleteTask?: () => void;
    defaultValues?: { title: string; description: string };
}) {
    return (
        <form className="new-task-form" onSubmit={e => submitHandler(e)}>
            <h3>Add New Task</h3>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    placeholder="Title"
                    autoFocus
                    defaultValue={defaultValues?.title}
                />
            </div>
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    placeholder="Description"
                    defaultValue={defaultValues?.description}
                />
            </div>
            <div className="form-group">
                <label htmlFor="due-date">Due Date</label>
                <input type="date" id="due-date" />
            </div>
            <div className="form-group">
                <button type="submit">Add</button>
                {deleteTask && (
                    <button type="button" onClick={deleteTask}>
                        Delete
                    </button>
                )}
                <button type="button" onClick={cancelHandler}>
                    Cancel
                </button>
            </div>
        </form>
    );
}
