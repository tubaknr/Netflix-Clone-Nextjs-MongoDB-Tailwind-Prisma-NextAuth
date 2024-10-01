//Post and delete reqs.
import { without } from 'lodash';
import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from "next-auth/react";

//bir filmi favorilere ekleme - çıkarma . 
// & db güncelleme
// 1. kimlik sorgusu, 2. filmi tespit, 3. db güncelleme

export default async function handler(req: NextApiRequest, res:NextApiResponse) {
    try{
        const session = await getSession({ req });
        // console.log("SESSIONNNNN object:", session); // Log the session object
        //signed in or not
        if (!session){
            throw new Error("Session not foundddddddddddddddddddddddddddddddddddddddddd");
        }
//-----------------------------------------------------------------------------------------------------------POST---------------------------------------------------------
        //filmi favorilere ekle
        if(req.method === "POST"){

            // 1. kimlik sorgusu
            const { currentUser } = await serverAuth(req);

            if (!currentUser) {
                return res.status(401).json({ error: "Unauthorized! serverAuth" });
            }

            // 2. filmi tespit
            const { movieId } = req.body; //payload

            const existingMovie = await prismadb.movie.findUnique({
                where: {
                    id: movieId,
                }
            });
            if(!existingMovie){
                throw new Error("Invalid ID");
            }

            // 3. db güncelleme
            const user = await prismadb.user.update({
                where: {
                    email: currentUser.email || '',
                },
                data: {
                    favoriteIds: {
                        push: movieId, //filmi favorilere ekle, db içinde
                    }
                }
            });
            return res.status(200).json(user);
}
//------------------------------------------------------------------------------------------DELETE----------------------------------------------------------
        //filmi favorilerden çıkar
        if(req.method === "DELETE"){

            // 1. kimlik sorgusu
            const { currentUser } = await serverAuth(req);

            // 2. filmi tespit
            const { movieId } = req.body;
            const existingMovie = await prismadb.movie.findUnique({
                where: {
                    id: movieId, //filmin id'sinden hangi film olduğunu bul
                }
            });
            if(!existingMovie){
                throw new Error(`Movie with ID ${movieId} not found`);
            };
 
            // 3. db güncelleme
            const updatedFavoriteIds = without(currentUser.favoriteIds, movieId);
            const updatedUser = await prismadb.user.update({
                where: {
                    email: currentUser.email || '',
                },
                data: {
                    favoriteIds: updatedFavoriteIds,
                }
            });

            return res.status(200).json(updatedUser);
        }

        //eğer psot yada delete req değilse
        return res.status(405).end(); 

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------
    }catch(error){
        console.log(error);
        return res.status(500).json({ error: error.message || "Something went wrong" });
    } 
}

