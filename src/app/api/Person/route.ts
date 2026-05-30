import { prisma } from "@/lib/db";
import { HttpStatusCode } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const params = req.nextUrl.searchParams;
        const page = parseInt(params.get("page") ?? "0");
        const pageSize = parseInt(params.get("pageSize") ?? "5");
        const people = await prisma.$queryRaw`SELECT 
        p.*,
        COALESCE(SUM(CASE WHEN t."transactionType" = 'REVENUE' THEN t.value ELSE 0 END), 0) AS "revenue",
        COALESCE(SUM(CASE WHEN t."transactionType" = 'EXPENSE' THEN t.value ELSE 0 END), 0) AS "expense",
        COALESCE(SUM(CASE WHEN t."transactionType" = 'REVENUE' THEN t.value ELSE 0 END), 0) - 
        COALESCE(SUM(CASE WHEN t."transactionType" = 'EXPENSE' THEN t.value ELSE 0 END), 0) AS "balance"
        FROM "Person" p 
        LEFT JOIN "Transaction" t ON p.id = t."personId" 
        GROUP BY p.id LIMIT ${pageSize} OFFSET ${page * pageSize}`;
        const count = await prisma.person.count();
        return NextResponse.json({ people, totalCount: count });
    } catch (e) {
        return NextResponse.json(
            {
                error: "Database error",
                details: (e as Error).message,
            },
            { status: HttpStatusCode.InternalServerError },
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        body.id = undefined;
        await prisma.person.create({ data: body });
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
