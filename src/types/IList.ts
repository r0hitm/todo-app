import { ITodo } from "./ITodo";

export interface IList {
    id: number;
    title: string;
    todos: ITodo[];
}