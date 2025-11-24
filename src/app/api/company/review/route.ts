import { getUserFromCookies } from "@/hooks/helper";
import db from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    const user = await getUserFromCookies();
    const body = await req.json();
    const dataToSave = {
        ...body,
        user_id: user?.id
    }
    try{
        const review = await db.review.create({
            data: dataToSave
        });
        return NextResponse.json({
            success: true,
            data: review
        })
    }catch(error){
        console.error(error)
        return NextResponse.json({
            success: false,
            message: "Something went wrong",
        })
    }
}