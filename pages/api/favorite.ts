//Post and delete reqs.
import { without } from 'lodash';
import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';
import { NextApiRequest, NextApiResponse } from 'next';

//bir filmi favorilere ekleme - çıkarma . 
// & db güncelleme
// 1. kimlik sorgusu, 2. filmi tespit, 3. db güncelleme

export default async function handler(req: NextApiRequest, res:NextApiResponse) {
    try{

        //filmi favorilere ekle
        if(req.method === "POST"){
            const { currentUser } = await serverAuth(req);
            
            const { movieId } = req.body;

            // öyle bir film var mı gerçekten
            const existingMovie = await prismadb.movie.findUnique({
                where: {
                    id: movieId,
                }
            });

            if(!existingMovie){
                throw new Error("Invalid ID");
            }

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

        //filmi favorilerden çıkar
        if(req.method === "DELETE"){
            const { currentUser } = await serverAuth(req);

            const { movieId } = req.body;

            const existingMovie = await prismadb.movie.findUnique({
                where: {
                    id: movieId, //filmin id'sinden hangi film olduğunu bul
                }
            });
            if(!existingMovie){
                throw new Error("Invalid ID");
            };

            //o filmi çıkar
            const updatedFavoriteIds = without(currentUser.favoriteIds, movieId);

            //database i güncelle update et
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

    }catch(error){
        console.log(error);
        return res.status(400).end();
    } 
}

