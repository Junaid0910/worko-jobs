import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { phone, otp } = await req.json();

    if (!phone || !otp) {
      return NextResponse.json({ error: "Phone and OTP are required" }, { status: 400 });
    }

    // In production, verify with Twilio:
    /*
    const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    const verification = await client.verify.v2.services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .verificationChecks
      .create({ to: `+91${phone}`, code: otp });
    
    if (verification.status !== 'approved') {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }
    */

    // For demo/mock:
    if (otp !== "123456") {
      // return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }

    // Check if user exists
    let user = await prisma.user.findUnique({
      where: { phone },
    });

    let isNewUser = false;
    if (!user) {
      isNewUser = true;
      // We don't create user here if we want a separate onboarding step
      // But for NextAuth authorize, we might need a user record
    }

    return NextResponse.json({ 
      success: true, 
      isNewUser,
      user: user || { phone } 
    });
  } catch (error) {
    console.error("Verify Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
