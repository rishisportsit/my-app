
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "GET API CALL SUCCESS" });
}
export async function POST() {
  return NextResponse.json({ message: "POST API CALL SUCCESS" });
}
export async function PUT() {
  return NextResponse.json({ message: "PUT API CALL SUCCESS" });
}
export async function DELETE() {
  return NextResponse.json({ message: "DELETE API CALL SUCCESS" });
}
