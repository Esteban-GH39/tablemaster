import { useCallback, useEffect, useState } from "react";

function useFetch(fetchFunction) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const reload = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetchFunction();
            setData(response);
            setError(null);
        } catch (error) {
            console.error(error);
            setError(error);
        } finally {
            setLoading(false);
        }
    }, [fetchFunction]);
    useEffect(() => {
        reload();
    }, [reload]);

    return {
        data,
        loading,
        error,
        reload
    };
}

export default useFetch;