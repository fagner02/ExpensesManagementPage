import { PrismaClient } from "@/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg(process.env.NEXT_PUBLIC_DATABASE_URL!);
export const prisma = new PrismaClient({ adapter });
