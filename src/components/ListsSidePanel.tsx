/**
 * Side panel that shows all the lists and allows the user to create new lists
 */
import { useState } from "react";
import { List } from "../models/List";

export default function ListsSidePanel({
    lists,
    currentList,
    changeList,
    addList,
    closePanel,
    deleteList,
    renameList,
}: {
    lists: List[];
    currentList: List;
    changeList: (listId: number) => void;
    addList: (listName: string) => void;
    closePanel: () => void;
    deleteList: (listId: number) => void;
    renameList: (listId: number, listName: string) => void;
}) {
    const [renamingList, setRenamingList] = useState<List | null>(null);

    return (
        <>
            <nav className="lists">
                <h3>Lists</h3>
                <ul className="list-ul">
                    {lists?.map(list => (
                        <li
                            key={list.id}
                            className={
                                currentList.id === list.id
                                    ? "list-li active"
                                    : "list-li"
                            }
                        >
                            <span
                                className="list-item-name"
                                onClick={() => {
                                    console.log("changing list to: ", list.id);
                                    changeList(list.id);
                                    closePanel();
                                }}
                            >
                                {list.name}
                            </span>
                            <span className="list-item-actions">
                                <span
                                    className="material-symbols-rounded"
                                    onClick={() => {
                                        setRenamingList(list);
                                    }}
                                >
                                    edit
                                </span>
                                <span
                                    className="material-symbols-rounded"
                                    onClick={() => {
                                        if (
                                            confirm(
                                                "Are you sure you want to delete this list?"
                                            )
                                        ) {
                                            deleteList(list.id);
                                        }
                                    }}
                                >
                                    delete
                                </span>
                            </span>
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
                        const listName = formData.get("list-name") as string;
                        if (listName === "") {
                            form.reset();
                            return;
                        }
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
            {renamingList && (
                <ListRenameModal
                    list={renamingList}
                    renameList={renameList}
                    closeModal={() => setRenamingList(null)}
                />
            )}
        </>
    );
}

/**
 * List Modal component
 * Used to rename an existing list
 */
function ListRenameModal({
    list,
    renameList,
    closeModal,
}: {
    list: List;
    renameList: (listId: number, listName: string) => void;
    closeModal: () => void;
}) {
    return (
        <div className="modal">
            <div className="modal-content">
                <h3>Rename List</h3>
                <form
                    className="modal-form"
                    onSubmit={e => {
                        e.preventDefault();
                        const form = e.target as HTMLFormElement;
                        const formData = new FormData(form);
                        const listName = formData.get("list-name") as string;
                        if (listName === list.name || listName === "") {
                            closeModal();
                            form.reset();
                            return;
                        }
                        renameList(list.id, listName);
                        closeModal();
                        form.reset();
                    }}
                >
                    <input
                        type="text"
                        name="list-name"
                        placeholder="Enter List Name"
                        defaultValue={list.name}
                        autoFocus
                    />
                    <div className="modal-form-buttons">
                        <button type="submit">Rename</button>
                        <button type="button" onClick={closeModal}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
