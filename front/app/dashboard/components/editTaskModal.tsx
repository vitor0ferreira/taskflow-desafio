// app/dashboard/components/EditTaskModal.tsx
'use client'

import { useState, useEffect } from 'react';
import { Task } from '@/app/types/Task';

interface EditTaskModalProps {
    task: Task | null;
    isOpen: boolean;
    onClose: () => void;
    onSave: (updatedTask: Task) => Promise<void>;
}

type statusTask = 'pendente' | 'em andamento' | 'concluida'

export default function EditTaskModal({ task, isOpen, onClose, onSave }: EditTaskModalProps) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState<'pendente' | 'em andamento' | 'concluida'>('pendente');

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
            setStatus(task.status);
        }
    }, [task]);

    if (!isOpen || !task) return null;

    const handleSave = () => {
        const updatedTask = { ...task, title, description, status };
        onSave(updatedTask);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-neutral-800 p-6 rounded-lg w-full max-w-lg flex flex-col gap-4">
                <h2 className="text-white text-2xl font-bold">Editar Tarefa</h2>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="bg-neutral-700 text-white p-2 rounded-md border border-neutral-600"
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="bg-neutral-700 text-white p-2 rounded-md border border-neutral-600"
                    rows={4}
                />
                <select 
                    value={status}
                    onChange={(e) => setStatus(e.target.value as statusTask)}
                    className="bg-neutral-700 text-white p-2 rounded-md border border-neutral-600"
                >
                    <option value="pendente">Pendente</option>
                    <option value="em andamento">Em Andamento</option>
                    <option value="concluida">Concluída</option>
                </select>
                <div className="flex justify-end gap-3 mt-4">
                    <button onClick={onClose} className="bg-neutral-600 text-white py-2 px-4 rounded-md">Cancelar</button>
                    <button onClick={handleSave} className="bg-amber-500 text-black font-bold py-2 px-4 rounded-md">Salvar Alterações</button>
                </div>
            </div>
        </div>
    );
}