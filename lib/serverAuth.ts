import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";

import prismadb from '@/lib/prismadb';

const serverAuth = async (req: NextApiRequest) => {
    const session = await getSession({ req });

    //signed in or not
    if (!session?.user?.email){
        throw new Error("Not signed in");
    }

    const currentUser = await prismadb.user.findUnique({
        where: {
            email: session.user.email,
        }
    });

    //found user or not
    if(!currentUser){
        throw new Error("Not signed in");
    }

    return { currentUser };
}

export default serverAuth;


