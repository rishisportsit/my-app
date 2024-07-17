export default async function RouteHandler(req, res) {
  try {
    // req.type = GET | POST | PUT | DELETE
    switch (req.type) {
      case "GET":
        return res.status(200).json({ message: "API CALL SUCCESS...!" });
      case "POST":
        return res.status(200).json({ message: "SUCCESS" });
      case "PUT":
        return res.status(200).json({})
      default:
        res.status(403).json({ message: "Method not allowed" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "API CALL SUCCESS" });
}

async function getHandler() {
  try {
  } catch (error) {}
}
