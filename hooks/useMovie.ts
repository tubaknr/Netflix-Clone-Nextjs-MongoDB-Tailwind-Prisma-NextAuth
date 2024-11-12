import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useMovie = (id: string) => {
    // console.log("IDDD USEMOVIE.TSSSSSS: ",id); //CORRECT
    const {data, error, isLoading} = useSWR(id ? "/api/movies/" + id : "", fetcher, {
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
