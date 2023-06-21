import { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

import useFetchData from "./hooks/useFetchData";
import useUpdateData from "./hooks/useUpdateData";
import ListsSidePanel from "./components/ListsSidePanel";
import TasksView from "./components/TasksView";

import { List } from "./models/List";
import { redirect } from "react-router-dom";

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

    onAuthStateChanged(auth, user => {
        if (user) {
            const uid = user.uid;
            console.log("User is signed in");
        } else {
            console.log("User is signed out");
        }
    });

    console.log("App component rendered"); // Add this line

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="anch">
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
            <div
                className={
                    toggleListNav
                        ? "lists-view-container show"
                        : "lists-view-container"
                }
            >
                <ListsSidePanel
                    lists={data?.lists as List[]}
                    currentList={data?.currentList as List}
                    changeList={changeList}
                    addList={addList}
                    closePanel={() => setToggleListNav(false)}
                    deleteList={deleteList}
                    renameList={renameList}
                />
            </div>
            <TasksView
                currentList={data?.currentList as List}
                toggleTodoItem={toggleTodoItem}
                addTodoItem={addTodoItem}
                deleteTodoItem={deleteTodoItem}
                updateTodoItem={updateTodoItem}
            />
            <div className="attributions">
                <p>
                    Made by <a href="https://github.com/r0hitm">Rohit Mehta</a>
                </p>
                <p>
                    View on{" "}
                    <a href="https://github.com/r0hitm/todo-app">Github</a>
                </p>
                <p>
                    <a
                        target="_blank"
                        href="https://icons8.com/icon/tIUSbVurTTrH/todo-list"
                    >
                        Todo Icon
                    </a>{" "}
                    by{" "}
                    <a target="_blank" href="https://icons8.com">
                        Icons8
                    </a>
                </p>
            </div>
        </div>
    );
}

export default App;
