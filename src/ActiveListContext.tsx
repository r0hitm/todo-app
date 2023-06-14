import { createContext } from "react";
import { TodoList } from "./models/TodoList";

const ActiveListContext = createContext<TodoList | undefined>(undefined); // Default list has ID 0
export default ActiveListContext;
