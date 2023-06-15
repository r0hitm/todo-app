import { TodoItem } from "../models/TodoItem";

export default function TodoItemView({
    item,
    toggler,
    editHandler,
}: {
    item: TodoItem;
    toggler: (todoId: number) => void;
    editHandler: () => void;
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
                <div className="todo-title" onClick={editHandler}>{item.title}</div>
                <div className="todo-desc" onClick={editHandler}>{item.description}</div>
                <div className="todo-due-date">
                    {item.dueDate?.toDateString()}
                </div>
            </div>
        </div>
    );
}
