import { TodoItem } from "../models/TodoItem";

export default function TodoItemView({ item }: { item: TodoItem }) {
    return (
        <div className="todo-item">
            <div className="check-box-wrapper">
                <input type="checkbox" checked={item.status} />
            </div>
            <div className="todo-details">
                <div className="todo-title">{item.title}</div>
                <div className="todo-desc">{item.description}</div>
                {/* Due Date */}
            </div>
        </div>
    );
}
