import { sendCustomResp } from "@/hooks/helper";
import db from "@/services/prisma";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, {params}:{
    params: Promise<{
        id: string
    }>
}){
    const {id} = await params;

    try{
        const applications = await db.application.findMany({
            where:{
                user_id: id
            },
            include:{
                job: true,
            }
        });
    
        if(applications.length>0){
            return sendCustomResp(true, {applications});
        }
        return sendCustomResp(false, {message: "Can't find data"});
    }catch(error){
        console.error(error);
        return sendCustomResp(false, {message: "Server error"});
    }
}   