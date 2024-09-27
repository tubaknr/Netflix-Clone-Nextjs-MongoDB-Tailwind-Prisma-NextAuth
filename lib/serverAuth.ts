import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";

import prismadb from '@/lib/prismadb';

const serverAuth = async (req: NextApiRequest) => {
    const session = await getSession({ req });
    console.log("Session object:", session); // Log the session object

    //signed in or not
    if (!session?.user?.email){
        throw new Error("Session not found");
    }

    const currentUser = await prismadb.user.findUnique({
        where: {
            email: session.user.email,
        }
    });

    console.log(currentUser);
    console.log(currentUser.data);
    
    //found user or not
    if(!currentUser){
        throw new Error("user not founddd! serverAuth");
    }

    return { currentUser };
}

export default serverAuth;


