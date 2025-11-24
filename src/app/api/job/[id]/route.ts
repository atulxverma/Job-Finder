import { getUserFromCookies } from "@/hooks/helper";
import db from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: {
    params: Promise<{
        id: string;
    }>
}) {
    const pr = await params
    const id = pr.id;

    try {
        const job = await db.openings.findUnique({
            where: {
                id: id
            },
            include: {
                company: true,
            }
        }
        )
        if (job) {
            return NextResponse.json({
                success: true,
                data: job,
            })
        } else {
            return NextResponse.json({
                success: false,
                message: "job not found ;-;"
            })
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong!"
        })
    }

}

export async function DELETE(req: NextRequest, { params }: {
    params: Promise<{
        id: string
    }>
}) {
    try {
        const pr = await params;
        const jobId = pr.id;

        await db.application.deleteMany({
            where: { job_id: jobId },
        });

        const res = await db.openings.delete({
            where: {
                id: jobId,
            }
        });
        return NextResponse.json({
            success: true,
            message: "Deleted successfully!"
        })
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong!"
        })
    }
}

export async function POST(req: NextRequest, { params }: {
    params: Promise<{
        id: string
    }>
}) {
    const pr = await params
    const jobId = pr.id;
    const body = await req.json();
    try {
        const res = await db.openings.update({
            where: {
                id: jobId,
            },
            data: {
                title: body.title,
                description: body.description,
                location: body.location,
                salary: body.salary,
                job_type: body.job_type
            }
        })
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong"
        })
    }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const ps = await params;
        const user = await getUserFromCookies();
        if (!user) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const jobToUpdate = await db.openings.findUnique({
            where: { id: ps.id },
            include: { company: true },
        });

        if (jobToUpdate?.company.ownerId !== user.id) {
            return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 });
        }

        const body = await req.json();

        const updatedJob = await db.openings.update({
            where: {
                id: ps.id,
            },
            data: {
                title: body.title,
                description: body.description,
                location: body.location,
                salary: body.salary,
                employment_type: body.employment_type,
                job_type: body.job_type
            },
        });

        return NextResponse.json({ success: true, data: updatedJob });

    } catch (error) {
        console.error("Update Error:", error);
        return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 });
    }
}