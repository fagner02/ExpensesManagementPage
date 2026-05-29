import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const transactions = await prisma.transaction.findMany();
        const res = NextResponse.json(transactions);
        return res;
    } catch (e) {
        return NextResponse.json(
            {
                error: "Database error",
                details: (e as Error).message,
            },
            { status: 500 },
        );
    }
}
