import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useMovie = (id: string) => {
<<<<<<< HEAD
    // console.log("IDDD USEMOVIE.TSSSSSS: ",id); //CORRECT
    const {data, error, isLoading} = useSWR(id ? "/api/movies/" + id : "", fetcher, {
=======
    const {data, error, isLoading} = useSWR(id ? `/api/movies/${id}` : "no idddd", fetcher, {
>>>>>>> refs/remotes/origin/main
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
