import { getUserFromCookies } from "@/hooks/helper";
import db from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: {
    params: Promise<{
        id: string;
    }>
}) {
    const pr = await params;
    const id = pr.id;
    const company = await db.company.findUnique({
        where: {
            id: id,
        },
        include: {
            owner: true,
        }
    });

    if (!company) {
        return NextResponse.json({
            success: false,
            message: "Company not found",
            data: null
        });
    }
    return NextResponse.json({
        success: true,
        data: company
    })
}

export async function DELETE(req: NextRequest, { params }: {
    params: Promise<{ id: string }>
}) {
    try {
        const pr = await params;
        const id = pr.id;
        const user = await getUserFromCookies();
        if (id == user?.company?.id) {
            const openings = await db.openings.findMany({
                where: { company_id: id },
                select: { id: true },
            });

            const openingIds = openings.map(o => o.id);

            await db.application.deleteMany({
                where: { job_id: { in: openingIds } },
            });

            await db.openings.deleteMany({
                where: { company_id: id },
            });

            const res = await db.company.delete({
                where: { id },
            });

            return NextResponse.json({
                success: true,
                message: `company: ${res?.title} deleted!`
            })
        }
        return NextResponse.json({
            success: false,
            message: `unable to delete company`
        })
    } catch (error) {
        console.error("something went wrong:", error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong!"
        })
    }
}