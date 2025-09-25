'use client'

import { useState } from "react";
import { useAuth } from "@/app/context/authContext";

interface CreateTaskProps {
    onTaskCreated: () => void;
}

export default function CreateTask({ onTaskCreated }: CreateTaskProps) {
    const { userId, token } = useAuth();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    const handleCreateTask = async () => {
        if (!title) {
            setError("O título é obrigatório.");
            return;
        }
        if (!userId || !token) {
            setError("Você precisa estar logado para criar uma tarefa.");
            return;
        }
        setError('');

        try {
            const res = await fetch(`/api/users/${userId}/tasks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ title, description, status: 'pendente' })
            });

            if (!res.ok) {
                throw new Error("Falha ao criar a tarefa.");
            }
            
            // Limpa os campos e notifica o componente pai
            setTitle('');
            setDescription('');
            onTaskCreated(); 

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            setError(error.message);
        }
    };

    return (
        <div className="bg-neutral-700 p-4 rounded-lg w-full max-w-2xl mb-8 flex flex-col gap-3">
            <h2 className="text-white font-semibold text-2xl">Criar Nova Tarefa</h2>
            <input
                type="text"
                placeholder="Título da Tarefa"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-neutral-800 text-white p-2 rounded-md border border-neutral-600 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <textarea
                placeholder="Descrição (opcional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-neutral-800 text-white p-2 rounded-md border border-neutral-600 focus:outline-none focus:ring-2 focus:ring-amber-400"
                rows={3}
            />
            <button
                onClick={handleCreateTask}
                className="bg-amber-500 text-black font-bold py-2 px-4 rounded-md hover:bg-amber-600 transition-colors"
            >
                Adicionar Tarefa
            </button>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
    )
}