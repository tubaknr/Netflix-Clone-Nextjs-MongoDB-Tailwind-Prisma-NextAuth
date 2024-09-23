import axios from 'axios';
import React, { useCallback, useMemo } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import useCurrentUser from '@/hooks/useCurrentUser';
import useFavorites from '@/hooks/useFavorites';


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
        
        let response;

        // if it is a fav, delete from favs list
        if (isFavorite){
            response = await axios.delete('/api/favorite', { data: { movieId } });
        }

        // if it is not a fav, add to favs
        else{
            response = await axios.post('/api/favorite', { movieId });
        }

        // new favs list; made of fav movie id s
        const updatedFavorites = response?.data?.favoriteIds;
        
        // mutate: 'fcn to update the user's state after fav list modified' or cache with the new user data, including the updated list of favorite IDs
        mutate({
            ...currentUser, //object spread operator which creates a shallow copy of the currentUser object.
            favoriteIds: updatedFavorites
        });
    }, [movieId, isFavorite, currentUser, mutate, mutateFavorites]);


    return(
        <div className='cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300'>
            <AiOutlinePlus className="text-white" size={25}/>
        </div>
    )
};

export default FavoriteButton;
