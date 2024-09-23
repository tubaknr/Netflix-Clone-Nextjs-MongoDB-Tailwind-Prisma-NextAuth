import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';

//API route handler. 
export default async function handler(req: NextApiRequest, res: NextApiResponse){
    //request method check
    if (req.method !== "GET"){
        return res.status(405).end();
    }
    try{
        await serverAuth(req); //girdi mi girmedi mi. girmediyse throws error

        //total num of movies in the database.
        const movieCount = await prismadb.movie.count();

        //The multiplication by movieCount scales the random number to the range of available movies.
        const randomIndex = Math.floor(Math.random() * movieCount);
        
        //fetch a single move from db. 
        const randomMovies = await prismadb.movie.findMany({
            take: 1, //only take 1 movie
            skip: randomIndex //skip over a number of movies equal to randomIndex
        });
        return res.status(200).json(randomMovies[0]); //send back the random movie in JSON format
    } 
    catch(error){
        console.log(error);
        return res.status(400).end();
    }
}
