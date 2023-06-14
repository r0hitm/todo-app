import { TodoList } from "../models/TodoList";
import TodoItemView from "./TodoItemView";

export default function ListTasks({
    activeList,
}: {
    activeList: TodoList | undefined;
}) {
    return (
        <>
            <div className="list-items">
                {activeList?.todos.map(item => (
                    <TodoItemView item={item} />
                ))}
            </div>
            <a href="#"> {/* Add event to add new task */}
                <span className="material-symbols-rounded add-task">
                    add_circle
                </span>
            </a>
        </>
    );
}
