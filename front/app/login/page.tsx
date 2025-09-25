'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/authContext";

export default function Login(){
    const [user, setUser] = useState<string>('')
    const [pass, setPass] = useState<string>('')
    const router = useRouter()
    const { login } = useAuth()

    async function handleLogin() {

        const res = await fetch("/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user, pass }),
        });

        const data = await res.json();
        if (res.ok) {
            login(data.token)
            router.push("/dashboard")
            alert("Login realizado com sucesso!")
        } else {
            alert("Erro no login: " + JSON.stringify(data))
        }
    }

    return (
      <main className="flex flex-col items-center justify-center h-full">
        <div className="bg-slate-50 p-4 rounded-md flex flex-col items-center gap-3 w-full max-w-xs">
          <h1 className="text-center text-2xl font-semibold">Login</h1>
          <input
            placeholder="Usuário"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="bg-slate-200 p-2 rounded-md w-full"
          />
          <input
            placeholder="Senha"
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            className="bg-slate-200 p-2 rounded-md w-full"
          />
          <button onClick={handleLogin} className="bg-green-700 rounded-md w-full py-2 text-white font-semibold hover:bg-green-800">
            Confirmar
          </button>
        </div>
      </main>
    );
}