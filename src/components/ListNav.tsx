import { useContext } from "react";
import ActiveListContext from "../ActiveListContext";

const viewAllLists = () => {
    // TODO
    console.log("TODO: Add a component to View all lists");
};

export default function ListNav() {
    //     {
    //     renameList,
    //     deleteList,
    // }: {
    //     renameList: (id: number, title: string) => void;
    //     deleteList: (id: number) => void;
    // }
    const activeList = useContext(ActiveListContext);

    return (
        <div className="list-nav">
            <a href="#" className="icon-button" onClick={viewAllLists}>
                <span className="material-symbols-rounded">
                    format_list_bulleted
                </span>
            </a>
            <div className="list-name">
                <h2>{activeList?.title}</h2>
            </div>
            <div className="list-actions">
                <a href="#" className="icon-button">
                    {/* Add event to convert the <h2> into <input> for rename action */}
                    <span className="material-symbols-rounded">
                        edit_square
                    </span>
                </a>
                <a href="#" className="icon-button">
                    {" "}
                    {/* Add event to delete the list if it's not the only list */}
                    <span className="material-symbols-rounded">delete</span>
                </a>
            </div>
        </div>
    );
}
