import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    if(req.method !== "GET"){
        return res.status(405).end();
    }
    try{
        await serverAuth(req);
        const { movieId } = req.query;
        console.log("MOVIEIDDDDDDDDD PAGES/MOVIES/[MOVIEID].TS: ", movieId);
        
        if(typeof movieId !== 'string'){
            throw new Error("Movie ID is not a string! Inalid ID!");
        }
        if(!movieId){
            throw new Error("There is no movieID !");
        }

        const movie = await prismadb.movie.findUnique({
            where: {
                id: movieId,
            }
        });
        console.log("MOVIEEEEEE PAGES/MOVIES/[MOVIEID].TS: ", movie);

        if(!movie){
            throw new Error("There is no movie with this ID!!!");
        }

        return res.status(200).json(movie);

    } catch(error){
        console.log(error);
        return res.status(400).end();
    }
}

