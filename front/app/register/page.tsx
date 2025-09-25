'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
    const [user, setUser] = useState<string>('');
    const [pass, setPass] = useState<string>('');
    const router = useRouter();

    async function handleRegister() {
        if (!user || !pass) {
            alert("Por favor, preencha usuário e senha.");
            return;
        }

        const res = await fetch("/api/users/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user, pass }),
        });

        const data = await res.json();

        if (res.ok) {
            alert("Cadastro realizado com sucesso!");
            router.push("/login");
        } else {
            const errorMessage = data.error?.message || JSON.stringify(data);
            alert("Erro no cadastro: " + errorMessage);
        }
    }

    return (
        <main className="flex flex-col items-center justify-center h-full">
            <div className="bg-slate-50 p-4 rounded-md flex flex-col items-center gap-3 w-full max-w-xs">
                <h1 className="text-center text-2xl font-semibold">Criar Conta</h1>
                <input
                    placeholder="Usuário"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    className="bg-slate-100 p-2 rounded-md w-full"
                />
                <input
                    placeholder="Senha"
                    type="password"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    className="bg-slate-100 p-2 rounded-md w-full"
                />
                <button onClick={handleRegister} className="bg-green-700 rounded-md w-full py-2 text-white font-semibold hover:bg-green-800">
                    Confirmar
                </button>
                <Link href="/login" className="text-sm text-blue-600 hover:underline">
                    Já tem uma conta? Faça login
                </Link>
            </div>
        </main>
    );
}