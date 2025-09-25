import { NextResponse, NextRequest } from "next/server";
import api from "@/app/lib/axios";

export async function GET(req: NextRequest, { params }: { params: { userId: string; taskId: string } }) {
  const { userId, taskId } = params

  const token = req.headers.get("Authorization")?.split(" ")[1]

  if (!token)
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  try {
    const { data } = await api.get(`/users/${userId}/tasks/${taskId}`, {
      headers: { AuthorizationToken: token },
    });
    return NextResponse.json(data)
    
  } catch (error) {
    return NextResponse.json({ error, status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: { userId: string; taskId: string } }) {
  const { userId, taskId } = params;

  const body = await req.json()
  const token = req.headers.get("Authorization")?.split(" ")[1]

  if (!token)
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  try {
    const { data } = await api.put(`/users/${userId}/tasks/${taskId}`, body, {
      headers: { AuthorizationToken: token },
    });
    return NextResponse.json(data)

  } catch (error) {
    return NextResponse.json({ error, status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { userId: string; taskId: string } }) {
  const { userId, taskId } = params;

  const token = req.headers.get("Authorization")?.split(" ")[1]

  if (!token) return NextResponse.json({ error: "Não autorizado" }, { status: 401 })

  try {
    const { data } = await api.delete(`/users/${userId}/tasks/${taskId}`, {
      headers: { AuthorizationToken: token },
    });
    return NextResponse.json(data);

  } catch (error) {
    return NextResponse.json({ error, status: 500 });
  }
}