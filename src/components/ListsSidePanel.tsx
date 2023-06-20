/**
 * Side panel that shows all the lists and allows the user to create new lists
 */
import { List } from "../models/List";

export default function ListsSidePanel({
    lists,
    currentList,
    changeList,
    addList,
    closePanel,
}: {
    lists: List[];
    currentList: List;
    changeList: (listId: number) => void;
    addList: (listName: string) => void;
    closePanel: () => void;
}) {
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
                            onClick={() => {
                                console.log("changing list to: ", list.id);
                                changeList(list.id);
                                closePanel();
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
                        const listName = formData.get("list-name") as string;
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
        </>
    );
}
