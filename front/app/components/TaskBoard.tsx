'use client'

import TaskCard from "./TaskCard";
import { Task } from "../types/Task";

interface TaskBoardProps {
    tasks: Task[];
    isLoading: boolean;
    onDeleteTask: (taskId: number) => void;
    onEditTask: (task: Task) => void;
}

export default function TaskBoard({ tasks, isLoading, onDeleteTask, onEditTask }: TaskBoardProps) {
    if (isLoading) {
        return <div className="text-white text-center">Carregando tarefas...</div>;
    }

    if (tasks.length === 0) {
        return <div className="text-white text-center">Nenhuma tarefa encontrada. Crie uma nova!</div>;
    }

    return (
        <section
            className="container mx-auto p-4 grid gap-4 
                      grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
                      border-2 border-neutral-700 rounded-lg"
        >
            {tasks.map((task) => (
                <TaskCard 
                    key={task.id} 
                    task={task} 
                    onDelete={onDeleteTask} 
                    onEdit={onEditTask} 
                />
            ))}
        </section>
    );
}