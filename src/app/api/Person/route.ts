import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const people = await prisma.$queryRaw`SELECT 
        p.id, p.name, p.age, p.phone, p.email,
        COALESCE(SUM(CASE WHEN t."transactionType" = 'REVENUE' THEN t.value ELSE 0 END), 0) AS "revenue",
        COALESCE(SUM(CASE WHEN t."transactionType" = 'EXPENSE' THEN t.value ELSE 0 END), 0) AS "expense",
        COALESCE(SUM(CASE WHEN t."transactionType" = 'REVENUE' THEN t.value ELSE 0 END), 0) - 
        COALESCE(SUM(CASE WHEN t."transactionType" = 'EXPENSE' THEN t.value ELSE 0 END), 0) AS "balance"
        FROM "Person" p
        RIGHT JOIN "Transaction" t ON p.id = t."personId" 
        GROUP BY p.id`;
        return NextResponse.json(people);
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
