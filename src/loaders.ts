/**
 * Loaders
 * Defines all loaders that will be executed when routes are visited
 */
import { get_lists, get_current_list } from "./storage";
import { List } from "./models/List";

export type IrootLoader = {
    lists: List[],
    current_list: List
}

/**
 * Load all the lists
 */
export const root_loader = async (): Promise<IrootLoader> => {
    const lists = await get_lists();
    const current_list = await get_current_list();
    return { lists, current_list };
}
