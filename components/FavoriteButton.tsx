import axios from 'axios';
import React, { useCallback, useMemo } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import useCurrentUser from '@/hooks/useCurrentUser';
import useFavorites from '@/hooks/useFavorites';

interface FavoriteButtonProps {
    movieId: string;
};


const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
    return(
        <div className='cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300'>
            <AiOutlinePlus className="text-white" size={25}/>
        </div>
    )
};

export default FavoriteButton;
