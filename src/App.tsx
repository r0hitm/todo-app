import { useState } from "react";
import { useTodos } from "./hooks/useTodos";
// import { List } from "./models/List";
import ListNav from "./components/ListNav";
import ListTasks from "./components/ListTasks";

import "./App.css";

function App() {
    const {
        lists,
        get_active_list,
        change_active_list,
        add_new_list,
        rename_list,
        remove_list,
        add_new_task,
        remove_task,
        toggle_task,
        rename_task,
        change_task_desc,
        change_task_due_date,
    } = useTodos();

    return (
        <>
            <ListNav
                activeList={get_active_list()}
                lists={lists}
                changeActiveList={change_active_list}
                addNewList={add_new_list}
                renameList={rename_list}
                deleteList={remove_list}
            />
            <ListTasks
                activeList={get_active_list()}
                addNewTask={add_new_task}
                removeTask={remove_task}
                toggleTask={toggle_task}
                renameTask={rename_task}
                changeTaskDesc={change_task_desc}
                changeTaskDueDate={change_task_due_date}
            />
        </>
    );
}

export default App;
