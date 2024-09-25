//Post and delete reqs.
import { without } from 'lodash';
import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';
import { NextApiRequest, NextApiResponse } from 'next';

//bir filmi favorilere ekleme - çıkarma . 
// & db güncelleme
// 1. kimlik sorgusu, 2. filmi tespit, 3. db güncelleme

export default async function handler(req: NextApiRequest, res:NextApiResponse) {
    console.log("sayfaya geldik");
    try{
        console.log("try dayız");

        //filmi favorilere ekle
        if(req.method === "POST"){

            // 1. kimlik sorgusu
            const { currentUser } = await serverAuth(req);
            console.log("current found");

            if (!currentUser) {
                return res.status(401).json({ error: "Unauthorized! serverAuth" });
            }

            // 2. filmi tespit
            const { movieId } = req.body;
            const existingMovie = await prismadb.movie.findUnique({
                where: {
                    id: movieId,
                }
            });
            console.log("existingMovie bulundu favorite.ts");

            if(!existingMovie){
                console.log("existing movie yok");
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
            console.log("db güncellendi");
            return res.status(200).json(user);
}

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
                throw new Error("Invalid ID");
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

    }catch(error){
        console.log(error);
        return res.status(500).json({ error: error.message || "Something went wrong" });
    } 
}

