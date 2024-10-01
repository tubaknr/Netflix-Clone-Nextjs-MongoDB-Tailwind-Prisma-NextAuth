import axios from 'axios';
import React, { useCallback, useMemo } from 'react';
import { AiOutlinePlus, AiOutlineCheck } from 'react-icons/ai';
import useCurrentUser from '@/hooks/useCurrentUser';
import useFavorites from '@/hooks/useFavorites';
import { getSession } from 'next-auth/react';


interface FavoriteButtonProps {
    movieId: string;
};


const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
    const { mutate: mutateFavorites } = useFavorites();
    
    const { data: currentUser, mutate } = useCurrentUser();

    // useMemo = memoization. optimize performance. will be called again if the deps change.
    const isFavorite = useMemo(() => {
        
        //check if currentUser exists; if exists, it reaches the favs.
        //if currentUser dooes not exist, it returns empty array [].
        const list = currentUser?.favoriteIds || []; 

        //check if the movieId is present in the favoriteIds array. 
        // returns true or false.
        return list.includes(movieId);
    }, [currentUser, movieId]); //dependencies


    // useCallback = memoization. 
    const toggleFavorites = useCallback(async() => {
        if (!movieId) {
            console.error("Movie ID is missing");
            return;
        }

        try{
            let response;
            console.log(movieId);

            // if it is a fav, delete from favs list
            if (isFavorite){
                response = await axios.delete('/api/favorite', { data: { movieId } });
                console.log(response.data);
            }

            // FAV EKLE
            else{
                response = await axios.post('/api/favorite', { movieId }, { withCredentials: true});
                console.log(response.data);
            }

            // new favs list; made of fav movie id s
            const updatedFavorites = response?.data?.favoriteIds;
                
            // mutate: 'fcn to update the user's state after fav list modified'
            // or cache with the new user data, including the updated list of favorite IDs
            mutate({ //useCurrentUser'dan gelen mutate
                ...currentUser, //object spread operator which creates a shallow copy of the currentUser object.
                favoriteIds: updatedFavorites
            });

            // mutateFavorites: A function to update the favorites UI or re-fetch data.
            mutateFavorites(); //useFavorites'den gelen mutate
            
        }catch(error){
            console.error("Error toggling favorites, FavoriteButton.tsx ", error);
        }
    }, [movieId, isFavorite, currentUser, mutate, mutateFavorites]);

    
    const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;

    return(
        <div onClick={toggleFavorites} 
             className='cursor-pointer
                        group/item
                        w-6 
                        h-6 
                        lg:w-10 
                        lg:h-10 
                        border-white 
                        border-2 
                        rounded-full 
                        flex 
                        justify-center 
                        items-center 
                        transition 
                        hover:border-neutral-300'>

            <Icon className="text-white" size={25}/>
        </div>
    )
};

export default FavoriteButton;
