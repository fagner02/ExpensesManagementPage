import { prisma } from "@/lib/db";
import { HttpStatusCode } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const params = req.nextUrl.searchParams;
        const page = parseInt(params.get("page") ?? "0");
        const pageSize = parseInt(params.get("pageSize") ?? "5");

        const queryRes = await prisma.$transaction([
            prisma.transaction.count(),
            prisma.transaction.findMany({
                skip: page * pageSize,
                take: pageSize,
            }),
        ]);
        const res = NextResponse.json({
            totalCount: queryRes[0],
            transactions: queryRes[1],
        });
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
