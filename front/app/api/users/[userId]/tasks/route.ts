import { NextResponse, NextRequest } from "next/server";
import api from "@/app/lib/axios";


export async function GET(req: NextRequest, { params } : { params: { userId: string } }) {
  const { userId } = await params;
  
  const authorizationToken = req.headers.get("Authorization")?.split(" ")[1];

  if (!authorizationToken) {
    return NextResponse.json({ error: "Token não fornecido" }, { status: 401 });
  }

  try {
    const { data } = await api.get(`/users/${userId}/tasks`, {
      headers: { AuthorizationToken: authorizationToken },
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error, status: 500 });
  }
}

export async function POST(req: NextRequest, { params }: { params: { userId: string } }) {
  const { userId } = await params;
  const body = await req.json();
  
  const authorizationToken = req.headers.get("Authorization")?.split(" ")[1];

  if (!authorizationToken) {
    return NextResponse.json({ error: "Token não fornecido" }, { status: 401 });
  }

  try {
    const { data } = await api.post(`/users/${userId}/tasks`, body, {
      headers: { AuthorizationToken: authorizationToken },
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error, status: 500 });
  }
}