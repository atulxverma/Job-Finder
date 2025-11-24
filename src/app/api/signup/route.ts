import { createToken } from "@/services/jwt";
import db from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const user = await db.user.create({
      data: {
        email: body.email,
        password: body.password,
        role: "user",
      }
    });

    const token = createToken({ id: user.id });

    const res = NextResponse.json({
      success: true,
      message: "Registration successful!"
    });

    res.cookies.set("token", token, {
      httpOnly: true,
      secure: false,
      path: "/",
    });

    return res;
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong!"
    });
  }
}
