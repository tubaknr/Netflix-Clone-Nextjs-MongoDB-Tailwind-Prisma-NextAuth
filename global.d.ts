import { PrismaClient } from "@prisma/client"

declare global {
    namespace gloablThis {
        var prismadb: PrismaClient
    }   
}
