import { getUserFromCookies } from "@/hooks/helper";
import db from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest,{params}:{
    params: Promise<{
        id: string,
    }>
}){
    const pr = await params;
    const companyId = pr.id;

    try{
        const reviews = await db.review.findMany({
            where:{
                company_id: companyId,
            },
            include: {
                user: true,
            }
        });
        return NextResponse.json({
            success: true,
            data: reviews
        })
    }catch(error){
        console.error(error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong",
        })
    }
}

export async function POST(req: NextRequest, {params}:{
    params: Promise<{
        id: string,
    }>
}){
    const pr = await params;
    const companyId = pr.id;
    try{
        const body = await req.json();
        const res = await db.review.create({
            data: body
        });
        return NextResponse.json({
            success: true,
            data: res
        })
    }catch(error){
        console.error(error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong!",
        })
    }

}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getUserFromCookies();
    if (!user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { reviewId } = body;

    if (!reviewId) {
        return NextResponse.json({ success: false, message: "Review ID is required." }, { status: 400 });
    }

    const reviewToDelete = await db.review.findUnique({
      where: { id: reviewId }, 
    });

    if (!reviewToDelete) {
      return NextResponse.json({ success: false, message: "Review not found" }, { status: 404 });
    }
    if (reviewToDelete.user_id !== user.id) {
      return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 });
    }

    await db.review.delete({
      where: { id: reviewId },
    });

    return NextResponse.json({ success: true, message: "Review deleted successfully" });

  } catch (error) {
    console.error("DELETE /api/company/review error:", error);
    return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 });
  }
}