import { useState } from "react";
import useFetchData from "./hooks/useFetchData";
import useUpdateData from "./hooks/useUpdateData";

// import "./App.css";

function App() {
    const [toggleListNav, setToggleListNav] = useState(false);

    const { data, loading, refresh } = useFetchData();
    const {
        addList,
        deleteList,
        renameList,
        changeList,
        addTodoItem,
        deleteTodoItem,
        toggleTodoItem,
        updateTodoItem,
    } = useUpdateData(refresh);

    console.log("App component rendered"); // Add this line

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className={toggleListNav ? "lists-nav" : "lists-nav hidden"}>
                <nav className="lists">
                    <h3>Lists</h3>
                    <ul className="list-ul">
                        {data?.lists.map(list => (
                            <li
                                key={list.id}
                                className={
                                    data.currentList.id === list.id
                                        ? "list-li active"
                                        : "list-li"
                                }
                                onClick={() => {
                                    console.log("changing list to: ", list.id);
                                    changeList(list.id);
                                    setToggleListNav(false);
                                }}
                            >
                                {list.name}
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="add-list">
                    <h3>Add List</h3>
                    <form
                        className="add-list-form"
                        onSubmit={e => {
                            e.preventDefault();
                            const form = e.target as HTMLFormElement;
                            const formData = new FormData(form);
                            const listName = formData.get(
                                "list-name"
                            ) as string;
                            addList(listName);
                            form.reset();
                        }}
                    >
                        <input
                            type="text"
                            name="list-name"
                            placeholder="Enter List Name"
                        />
                        <button type="submit">Add</button>
                    </form>
                </div>
            </div>
            <div className="list-tasks">
                <header>
                    {/* {!toggleListNav ? (
                        <span
                            className="material-symbols-rounded"
                            onClick={() => {
                                toggleListNav
                                    ? setToggleListNav(false)
                                    : setToggleListNav(true);
                            }}
                        >
                            arrow_back
                        </span>
                    ) : ( */}
                    <span
                        className="material-symbols-rounded hamburger"
                        onClick={() => {
                            toggleListNav
                                ? setToggleListNav(false)
                                : setToggleListNav(true);
                        }}
                    >
                        format_list_bulleted
                    </span>
                    <h1>{data?.currentList.name}</h1>
                    {/* <span>Edit</span> */}
                </header>
                <div className="tasks">
                    <div className="list-items">
                        {data?.currentList.todos.map(todo_item => (
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
                                addTodoItem(
                                    title,
                                    description,
                                    new Date(dueDate)
                                );
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
        </>
    );
}

export default App;
