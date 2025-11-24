import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        console.log("hi")
        const userCookies = await cookies();
        userCookies.delete('token');

        return NextResponse.json({ success: true, message: "Logged out" });

    } catch (error) {
        console.error(error)
        return NextResponse.json({ success: false, message: "Something went wrong" });
    }
}