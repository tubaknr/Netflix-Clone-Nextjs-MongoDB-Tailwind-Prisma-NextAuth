import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";

import prismadb from '@/lib/prismadb';

// serverAuth, gelen bir istekte (Next.js API request) oturum bilgilerini doğrular 
// ve kullanıcının veritabanındaki (Prisma ile) kaydını bulur.

const serverAuth = async (req: NextApiRequest) => {
    const session = await getSession({ req }); //OTURUM
    if (!session?.user?.email){
        throw new Error("Session not found");
    }

    // OTURUM VARSA prismadb üzerinden kullanıcının e-posta adresini kullanarak veritabanından ilgili kullanıcıyı bulur.
    const currentUser = await prismadb.user.findUnique({
        where: {
            email: session.user.email,
        }
    });
    if(!currentUser){
        throw new Error("user not founddd! serverAuth");
    }

    //OTURUM->USER & USER'I OBJE OLARAK DÖNDÜR.
    return { currentUser }; //prismadb deki haliyle obje olarak döndür. id, name, email, hashedpasswd, ....
}

export default serverAuth;


