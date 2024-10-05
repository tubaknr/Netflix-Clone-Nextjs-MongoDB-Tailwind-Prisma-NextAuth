import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useMovie = (id: string) => {
    const {data, error, isLoading} = useSWR(id ? `/api/movies/${id}` : "no idddd", fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    return{
        data,
        error,
        isLoading,
    }
} 

export default useMovie;
