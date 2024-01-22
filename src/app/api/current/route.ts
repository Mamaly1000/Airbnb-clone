import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function GET(_requst: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.error();
  }
  return NextResponse.json(user);
}
