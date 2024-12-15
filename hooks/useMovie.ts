import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useMovie = (id: string) => {
    // console.log("IDDD USEMOVIE.TSSSSSS: ",id); //CORRECT
    const {data, error, isLoading} = useSWR(id ? `/api/movies/${id}` : "", fetcher);

    console.log("USEMOVIE DATA: ", data);
    console.log("ERROR USEMOVIE: ", error);
    
    return{
        data,
        error,
        isLoading,
    }
} 

export default useMovie;
