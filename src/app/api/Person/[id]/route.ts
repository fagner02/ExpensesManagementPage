import { prisma } from "@/lib/db";
import { HttpStatusCode } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const { id } = await params;
        const body = await req.json();
        if (!body)
            return NextResponse.json(
                { details: "No body provided" },
                { status: HttpStatusCode.InternalServerError },
            );
        await prisma.person.update({
            where: { id },
            data: body,
        });
        return NextResponse.json(
            { created: body },
            {
                status: HttpStatusCode.Ok,
            },
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

export async function DELETE(
    _: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const { id } = await params;
        await prisma.person.delete({ where: { id } });
        return NextResponse.json({}, { status: HttpStatusCode.Ok });
    } catch (e) {
        return NextResponse.json(
            {
                details: (e as Error).message,
            },
            { status: HttpStatusCode.InternalServerError },
        );
    }
}
