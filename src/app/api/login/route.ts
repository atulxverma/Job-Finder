//@ts-nocheck
import { createToken } from "@/services/jwt";
import db from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const user = await db.user.findUnique({
      where: { email: body.email }
    });

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "User not found!"
      });
    }

    if (user.password === body.password) {
      const token = createToken({ id: user.id });

      const res = NextResponse.json({
        success: true,
        user
      });

      res.cookies.set("token", token, {
        httpOnly: true,
        secure: false,
        path: "/"
      });

      return res;
    }
  } catch (err) {
    console.error(err);
  }

  return NextResponse.json({
    success: false,
    message: "Invalid credentials"
  });
}
