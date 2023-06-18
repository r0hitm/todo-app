import { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { init, get_lists, get_current_list } from "../storage";

/**
 * Root route, the default route for the application.
 * All other routes are nested within this route.
 * @returns // TODO: Add return
 */
export default function Root() {
    const [toggleListNav, setToggleListNav] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        if (!isInitialized) {
            init()
                .then(() => {
                    setIsInitialized(true);
                })
                .catch(error => {
                    console.error("Error initializing storage:", error);
                });
        }
    }, [isInitialized]);

    return (
        <>
            <div className={toggleListNav ? "lists-nav hidden" : "lists-nav"}>
                <nav className="lists">
                    {isInitialized &&
                        get_lists().map(list => (
                            <NavLink to={`/list/${list.id}`} key={list.id}>
                                {list.name}
                            </NavLink>
                        ))}
                </nav>
                <div className="add-list">
                    {/* <NavLink to="/list/new">Add List</NavLink> */}
                    <h3>Add List</h3>
                </div>
            </div>
            <div className="list-tasks">
                <header>
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
                    {isInitialized && <h1>{get_current_list().name}</h1>}
                    {/* <span>Edit</span> */}
                </header>
                <Outlet />
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
