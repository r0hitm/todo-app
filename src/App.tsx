import { useState } from "react";
import { useContext } from "react";
import AuthContext from "./AuthContext";
import { signOutUser } from "./firebase";

import useFetchData from "./hooks/useFetchData";
import useUpdateData from "./hooks/useUpdateData";
import ListsSidePanel from "./components/ListsSidePanel";
import TasksView from "./components/TasksView";
import Welcome from "./components/Welcome";

import { List } from "./models/List";

function App() {
    const user = useContext(AuthContext);
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

    if (!user) {
        return <Welcome />;
    }

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
            <span
                className="material-symbols-rounded logout"
                onClick={signOutUser}
                title="Sign Out"
            >
                logout
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
