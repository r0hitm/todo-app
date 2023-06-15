import { TodoItem } from "../models/TodoItem";

export default function TodoItemView({
    item,
    toggler,
}: {
    item: TodoItem;
    toggler: (todoId: number) => void;
}) {
    return (
        <div className="todo-item">
            <div className="check-box-wrapper">
                <input
                    type="checkbox"
                    defaultChecked={item.complete}
                    onClick={() => toggler(item.id)}
                />
            </div>
            <div className="todo-details">
                <div className="todo-title">{item.title}</div>
                <div className="todo-desc">{item.description}</div>
                <div className="todo-due-date">
                    {item.dueDate.toDateString()}
                </div>
            </div>
        </div>
    );
}
