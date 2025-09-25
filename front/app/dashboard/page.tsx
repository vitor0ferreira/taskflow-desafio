'use client'

import { FaCircle } from "react-icons/fa";
import TaskBoard from "../components/TaskBoard";
import CreateTask from "./components/createTask";
import EditTaskModal from "./components/editTaskModal";
import { useAuth } from "../context/authContext";
import { useState, useEffect, useCallback } from "react";
import { Task } from "../types/Task";

export default function Dashboard() {

    const { userId, token, isAuthenticated } = useAuth();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    const fetchTasks = useCallback(async () => {
        if (userId && token) {
            setIsLoading(true);
            try {
                const res = await fetch(`/api/users/${userId}/tasks`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (!res.ok) throw new Error("Falha ao buscar tarefas");
                const data = await res.json();
                setTasks(data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }
    }, [userId, token]);

    useEffect(() => {
        if (isAuthenticated) {
            fetchTasks();
        } else {
            setIsLoading(false);
        }
    }, [isAuthenticated, fetchTasks]);

    const handleDeleteTask = async (taskId: number) => {
        if (!userId || !token) return;

        if (!confirm("Tem certeza que deseja excluir esta tarefa?")) {
            return;
        }

        try {
            const res = await fetch(`/api/users/${userId}/tasks/${taskId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!res.ok) {
                throw new Error("Falha ao excluir a tarefa.");
            }

            setTasks(currentTasks => currentTasks.filter(task => task.id !== taskId));
            alert("Tarefa excluída com sucesso!");

        } catch (error) {
            console.error(error);
            alert("Erro ao excluir a tarefa.");
        }
    };

    const handleOpenEditModal = (task: Task) => {
        setEditingTask(task);
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setEditingTask(null);
        setIsEditModalOpen(false);
    };

    const handleUpdateTask = async (updatedTask: Task) => {
        if (!userId || !token) return;

        try {
            const res = await fetch(`/api/users/${userId}/tasks/${updatedTask.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updatedTask)
            });

            if (!res.ok) throw new Error("Falha ao atualizar a tarefa.");

            await fetchTasks();
            handleCloseEditModal();
            alert("Tarefa atualizada com sucesso!");

        } catch (error) {
            console.error(error);
            alert("Erro ao atualizar a tarefa.");
        }
    };

    return (
        <main className="h-full w-full flex flex-col gap-4 items-center justify-start py-8 px-4">
            <h1 className="text-center font-bold text-white text-4xl sm:text-6xl md:text-8xl my-4">
                TaskFlow
            </h1>
            <div className="text-white flex flex-wrap items-center justify-center gap-4 mb-4">
                <h1 className="font-semibold text-lg">Legenda:</h1>
                <span className="flex items-center gap-1"> <FaCircle color="yellow" /> Em Andamento</span>
                <span className="flex items-center gap-1"> <FaCircle color="red" /> Pendente</span>
                <span className="flex items-center gap-1"> <FaCircle color="green" /> Concluída</span>
            </div>
            
            <CreateTask onTaskCreated={fetchTasks} />
            <TaskBoard 
                tasks={tasks} 
                isLoading={isLoading} 
                onDeleteTask={handleDeleteTask}
                onEditTask={handleOpenEditModal}
            />

            <EditTaskModal
                isOpen={isEditModalOpen}
                task={editingTask}
                onClose={handleCloseEditModal}
                onSave={handleUpdateTask}
            />
        </main>
    );
}