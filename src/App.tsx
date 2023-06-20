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
                    {/* <NavLink to="/list/new">Add List</NavLink> */}
                    <h3>Add List</h3>
                    <form
                        className="add-list-form"
                        // TODO
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
        </>
    );
}

export default App;
