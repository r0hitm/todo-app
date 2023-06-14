import { useState, createContext } from "react";
import { useTodos } from "./hooks/useTodos";
import { TodoList } from "./models/TodoList";
import ListNav from "./components/ListNav";
import ActiveListContext from "./ActiveListContext";

import "./App.css";

function App() {
    const {
        todos,
        getCurrentList,
        changeCurrentList,
        handleNewList,
        handleRemoveList,
        handleNewTodoItem,
        handleRemoveTodoItem,
        handleToggleTodoItem,
        handleEditTodoItemTitle,
        handleEditTodoItemDescription,
        handleEditTodoItemDueDate,
        handleEditTodoListTitle,
    } = useTodos();
    const [activeList, setActiveList] = useState<TodoList | undefined>(
        getCurrentList()
    );

    return (
        <ActiveListContext.Provider value={activeList}>
            <ListNav
                // renameList={handleEditTodoListTitle}
                // deleteList={handleRemoveList}
            />
            {/* TODO */}
        </ActiveListContext.Provider>
    );
}

export default App;
