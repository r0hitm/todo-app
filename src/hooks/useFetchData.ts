import { useState, useEffect } from "react";
import { getData } from "../storage";
import { TodoLists } from "../models/TodoLists";

export default function useFetchData() {
    const [data, setData] = useState<null | TodoLists>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchData() {
            const data = await getData();
            setData(data);
            setLoading(false);
        }

        fetchData();
    }, []);

    return { data, loading };
}
