import { useState } from "react";
import { List } from "../models/List";

export default function ListNav({
    lists,
    activeList,
    changeActiveList,
    addNewList,
    renameList,
    deleteList,
    viewAllLists,
    setViewAllLists,
}: {
    lists: List[];
    activeList: List;
    changeActiveList: (id: number) => void;
    addNewList: (name: string) => void;
    renameList: (id: number, new_name: string) => void;
    deleteList: (id: number) => void;
    viewAllLists: boolean;
    setViewAllLists: (view: boolean) => void;
}) {
    const [isRenaming, setIsRenaming] = useState(false);

    function handleListRename(newName: string) {
        newName = newName.trim();
        if (newName !== "") {
            renameList(activeList.id, newName);
        } else {
            alert("List name cannot be empty");
        }
        setIsRenaming(false);
    }

    if (viewAllLists) {
        return (
            <div className="all-lists-view">
                <div className="list-name">
                    <h2>All Lists</h2>
                </div>
                <ul className="all-lists">
                    {lists.map(list => (
                        <li
                            key={list.id}
                            className={
                                list.name === activeList.name ? "active" : ""
                            }
                        >
                            <a
                                href="#"
                                onClick={() => {
                                    changeActiveList(list.id);
                                    setViewAllLists(false);
                                }}
                            >
                                {list.name}
                            </a>
                        </li>
                    ))}
                </ul>
                <form
                    className="add-list-form"
                    onSubmit={e => {
                        e.preventDefault();
                        const input = document.querySelector(
                            "input[name=new-list]"
                        ) as HTMLInputElement;
                        if (input.value.trim() !== "") {
                            addNewList(input.value);
                            input.value = "";
                        }
                    }}
                >
                    <h3>Add New List</h3>
                    <div className="add-list-input">
                        <input
                            name="new-list"
                            type="text"
                            placeholder="New List"
                        />
                        <button type="submit">Add</button>
                    </div>
                </form>
            </div>
        );
    } else {
        return (
            <div className="list-nav">
                <a
                    href="#"
                    className="icon-button"
                    onClick={() =>
                        viewAllLists
                            ? setViewAllLists(false)
                            : setViewAllLists(true)
                    }
                >
                    <span className="material-symbols-rounded">
                        format_list_bulleted
                    </span>
                </a>
                <div className="list-name">
                    {isRenaming ? (
                        <input
                            id="list-rename-input"
                            type="text"
                            onBlur={evn => handleListRename(evn.target.value)}
                            onKeyDown={e => {
                                if (e.key === "Enter") {
                                    const newName = document.getElementById(
                                        "list-rename-input"
                                    ) as HTMLInputElement;
                                    handleListRename(newName.value);
                                }
                            }}
                            defaultValue={activeList.name}
                            autoFocus
                        />
                    ) : (
                        <h2>{activeList.name}</h2>
                    )}
                </div>
                <div className="list-actions">
                    <a
                        href="#"
                        className="icon-button"
                        onClick={() => setIsRenaming(true)}
                    >
                        <span className="material-symbols-rounded">
                            edit_square
                        </span>
                    </a>
                    <a
                        href="#"
                        className="icon-button"
                        onClick={() => deleteList(activeList.id)}
                    >
                        <span className="material-symbols-rounded">delete</span>
                    </a>
                </div>
            </div>
        );
    }
}
