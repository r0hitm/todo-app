import { useState } from "react";
import useFetchData from "./hooks/useFetchData";
import useUpdateData from "./hooks/useUpdateData";
import ListsSidePanel from "./components/ListsSidePanel";
import TasksView from "./components/TasksView";

import { List } from "./models/List";
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
            <div className={toggleListNav ? "lists-view-container show" : "lists-view-container"}>
                <ListsSidePanel
                    lists={data?.lists as List[]}
                    currentList={data?.currentList as List}
                    changeList={changeList}
                    addList={addList}
                    closePanel={() => setToggleListNav(false)}
                />
            </div>
            <TasksView
                currentList={data?.currentList as List}
                toggleTodoItem={toggleTodoItem}
                addTodoItem={addTodoItem}
                deleteTodoItem={deleteTodoItem}
                updateTodoItem={updateTodoItem}
            />
        </>
    );
}

export default App;
