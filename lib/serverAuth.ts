import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";

import prismadb from '@/lib/prismadb';

const serverAuth = async (req: NextApiRequest) => {
    console.log("girddikkk:");

    const session = await getSession({ req });

    console.log("session:", session);

    //signed in or not
    if (!session?.user?.email){
        console.log("serverAuth.ts:  if (!session?.user?.email){");
        throw new Error("Unauthorizedddd serverAuth");
    }

    const currentUser = await prismadb.user.findUnique({
        where: {
            email: session.user.email,
        }
    });

    console.log("Current user fetched:", currentUser);

    //found user or not
    if(!currentUser){
        console.log("serverAuth.ts: !currentUser");
        throw new Error("user not founddd! serverAuth");
    }

    console.log("current user found", currentUser);
    return { currentUser };
}

export default serverAuth;


