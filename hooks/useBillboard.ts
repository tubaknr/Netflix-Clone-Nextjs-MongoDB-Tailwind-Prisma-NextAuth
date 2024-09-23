import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

// Custom Hook called useBillboard. 
// Custom hooks allow you to encapsulate and reuse logic in your React components.

const useBillboard = () => {
    const { data, error, isLoading } = useSWR('/api/random', fetcher, { //random filmi çeker
        // first argument '/api/random' is the API ENDPOINT from which to fetch data.
        // The second argument, fetcher, is the function that SWR will call to fetch data from the specified endpoint.
        revalidateIfStale: false, // This setting prevents the hook from revalidating the data if it is stale. Normally, SWR would automatically refetch data after a certain period if it considers it stale.
        revalidateOnFocus: false,  // the data won't be revalidated when the window regains focus. Typically, SWR would refetch data to ensure freshness when a user returns to the tab.
        revalidateOnReconnect: false, // prevents data from being revalidated when the user reconnects to the internet. By default, SWR would refetch the data upon reconnection.
    });

    return{
        data,
        error,
        isLoading
    }
}

export default useBillboard;
