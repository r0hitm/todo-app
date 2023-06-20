/**
 * Component that shows the contents of the current list
 */
import { List } from "../models/List";

export default function TasksView({
    currentList,
    toggleTodoItem,
    addTodoItem,
}: {
    currentList: List;
    toggleTodoItem: (id: number) => void;
    addTodoItem: (title: string, description: string, dueDate: Date) => void;
}) {
    return (
        <div className="list-tasks">
            <header>
                <h1>{currentList.name}</h1>
            </header>
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
                        </div>
                    ))}
                </div>
                <div className="add-todo-item">
                    <h3>Add Todo Item</h3>
                    <form
                        className="add-todo-item-form"
                        onSubmit={e => {
                            e.preventDefault();
                            const form = e.target as HTMLFormElement;
                            const formData = new FormData(form);
                            const title = formData.get(
                                "todo-item-title"
                            ) as string;
                            const description = formData.get(
                                "todo-item-description"
                            ) as string;
                            const dueDate = formData.get(
                                "todo-item-due-date"
                            ) as string;
                            addTodoItem(title, description, new Date(dueDate));
                            form.reset();
                        }}
                    >
                        <input
                            type="text"
                            name="todo-item-title"
                            placeholder="Enter Todo Item Title"
                        />
                        <input
                            type="text"
                            name="todo-item-description"
                            placeholder="Enter Todo Item Description"
                        />
                        <input
                            type="date"
                            name="todo-item-due-date"
                            placeholder="Enter Todo Item Due Date"
                        />
                        <button type="submit">Add</button>
                    </form>
                </div>
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
                </div>
            </div>
        </div>
    );
}
