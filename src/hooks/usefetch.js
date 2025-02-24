import { useEffect } from 'react';

function UseFetch(url, setState) {
    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(data => setState(data.results))
    }, [url, setState])
}
export default UseFetch ;