import { prisma } from "@/lib/db";
import { HttpStatusCode } from "axios";
import { NextRequest, NextResponse } from "next/server";

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

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        body.id = undefined;
        await prisma.transaction.create({ data: body });
        return NextResponse.json(
            { created: body },
            { status: HttpStatusCode.Created },
        );
    } catch (e) {
        return NextResponse.json(
            {
                details: (e as Error).message,
            },
            { status: HttpStatusCode.InternalServerError },
        );
    }
}
