import useSWR from 'swr';
import fetcher from '@/lib/fetcher';


const useBillboard = () => {
    const { data, error, isLoading } = useSWR('/api/random', fetcher, { //random filmi çeker
        // first argument '/api/random' is the API ENDPOINT from which to fetch data.
        // The second argument, fetcher, is the function that SWR will call to fetch data from the specified endpoint.
        revalidateIfStale: false, // This setting prevents the hook from revalidating the data if it is stale. Normally, SWR would automatically refetch data after a certain period if it considers it stale.
        revalidateOnFocus: false,  // the data won't be revalidated when the window regains focus. Typically, SWR would refetch data to ensure freshness when a user returns to the tab.
        revalidateOnReconnect: false, // prevents data from being revalidated when the user reconnects to the internet. By default, SWR would refetch the data upon reconnection.
    });

    return{
        data, //fetched data from the API endpoint. random movie.
        error, // If the fetch was successful, this will be undefined.
        isLoading // A boolean indicating whether the request is currently in progress. Note that isLoading is not a built-in property of SWR, so it might be derived from checking if data is undefined and error is null.
    }
}

export default useBillboard;
