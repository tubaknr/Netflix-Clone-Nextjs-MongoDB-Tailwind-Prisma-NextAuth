import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/lib/serverAuth";

// GET the current user
export default async function handler(req: NextApiRequest, res:NextApiResponse){
    if (req.method !== "GET"){
        return res.status(405).end();
    }

    try{
        // OTURUM DOĞRULAMASI & KULLANICININ VERİTABANINDAKİ BİLGİLERİ
        const { currentUser } = await serverAuth(req);
        return res.status(200).json(currentUser);

    }catch(error){
        console.log(error);
        return res.status(400).end();
    }
}


