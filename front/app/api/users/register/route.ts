import { NextResponse } from "next/server";
import api from "@/app/lib/axios";

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const { data } = await api.post("/users/register", body);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error, status: 500 });
  }
}
