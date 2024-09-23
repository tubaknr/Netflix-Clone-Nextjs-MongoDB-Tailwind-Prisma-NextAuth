import React from 'react'
import {getSession} from "next-auth/react";
import Navbar from "@/components/Navbar";
import "./globals.css";
import Billboard from '@/components/Billboard';
import MovieList from '@/components/MovieList';
import useMovieList from '@/hooks/useMovieList';

//ERROR:email basıyor, name bassın.
//ERROR: github giriş her zaman girmiyor, googe da öyle.
//kayıt olmuş olan kulancı giremiyor

import { NextPageContext } from 'next';

export async function getServerSideProps(context: NextPageContext){
    const session = await getSession(context);

    if (!session){ //hesaba girilmemişse
        return{
            redirect: {
                destination: '/auth', //hesaba girmeden siteye ulaşamaz 
                permanent: false,
            }
        }
    }

    return{
        props: {}
    }
}




export default function Home() {
    const { data: movies = [] } = useMovieList();

    return (
        <>
        <Navbar/>
        <Billboard/>
        <div className='pb-40'>
            <MovieList title='Trending Now' data={movies}/>
        </div>
        </>
  )
}
