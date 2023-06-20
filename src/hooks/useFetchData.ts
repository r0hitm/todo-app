import { useState, useEffect } from "react";
import { getData } from "../storage";
import { TodoLists } from "../models/TodoLists";

export default function useFetchData() {
    const [data, setData] = useState<null | TodoLists>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [refreshCount, setRefreshCount] = useState<number>(0);

    useEffect(() => {
        async function fetchData() {
            const data = await getData();
            setData(data);
            setLoading(false);
        }

        fetchData();
    }, [refreshCount]);

    const refresh = () => {
        setRefreshCount(refreshCount + 1);
    };

    return { data, loading, refresh };
}
