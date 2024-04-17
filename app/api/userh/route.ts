import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export async function GET() {
    const user = await client.user.findFirst({where:{}});
    return Response.json({ firstname: user?.firstName,lastname: user?.lastName, email: user?.email })
}