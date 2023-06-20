import { useState } from "react";
import { Link, Outlet, Form, useLoaderData } from "react-router-dom";
import { IrootLoader } from "../loaders";

/**
 * Root route, the default route for the application.
 * All other routes are nested within this route.
 */
export default function Root() {
    const [toggleListNav, setToggleListNav] = useState(false);
    const { lists, current_list } = useLoaderData() as IrootLoader;

    return (
        <>
            <div className={toggleListNav ? "lists-nav" : "lists-nav hidden"}>
                <nav className="lists">
                    <h3>Lists</h3>
                    <ul className="list-ul">
                        {lists.map(list => (
                            <li
                                key={list.id}
                                className={
                                    current_list.id === list.id
                                        ? "list-li active"
                                        : "list-li"
                                }
                            >
                                <Link to={`/list/${list.id}`}>{list.name}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="add-list">
                    {/* <NavLink to="/list/new">Add List</NavLink> */}
                    <h3>Add List</h3>
                    <Form
                        className="add-list-form"
                        // TODO
                    >
                        <input
                            type="text"
                            name="list-name"
                            placeholder="Enter List Name"
                        />
                        <button type="submit">Add</button>
                    </Form>
                </div>
            </div>
            <div className="list-tasks">
                <header>
                    {/* {!toggleListNav ? (
                        <span
                            className="material-symbols-rounded"
                            onClick={() => {
                                toggleListNav
                                    ? setToggleListNav(false)
                                    : setToggleListNav(true);
                            }}
                        >
                            arrow_back
                        </span>
                    ) : ( */}
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
                    <h1>{current_list.name}</h1>
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
