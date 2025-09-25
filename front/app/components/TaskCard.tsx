import { Task } from "../types/Task";
import { FaCircle, FaTrash, FaPencilAlt } from "react-icons/fa";

const statusMap = {
    pendente: { color: "red", text: "Pendente" },
    "em andamento": { color: "yellow", text: "Em Andamento" },
    concluida: { color: "green", text: "Concluída" },
};

interface TaskCardProps {
    task: Task,
    onDelete: (taskId: number) => void,
    onEdit: (task: Task) => void,
}

export default function TaskCard({ task, onDelete, onEdit }: TaskCardProps) {
    const { title, description, status } = task;
    const statusInfo = statusMap[status] || { color: "gray", text: "Desconhecido" };

    return (
        <div className="bg-neutral-700 rounded-xl flex flex-col text-white overflow-hidden shadow-lg">
            <header className="font-semibold p-3 bg-neutral-800 flex justify-between items-center">
                <h3 className="truncate">{title}</h3>
                <div className="flex items-center gap-2">
                    {/* Botão de editar */}
                    <button onClick={() => onEdit(task)} className="hover:text-blue-400" title="Editar">
                        <FaPencilAlt/>
                    </button>
                    {/* Botão de excluir */}
                    <button onClick={() => onDelete(task.id)} className="hover:text-red-500" title="Excluir">
                        <FaTrash/>
                    </button>
                </div>
            </header>
            <div className="p-3 flex-1">
                <p className="text-sm text-neutral-300">
                    {description}
                </p>
            </div>
            <footer className="p-2 bg-neutral-800 text-xs flex items-center justify-end gap-2">
                <FaCircle color={statusInfo.color} />
                <span>{statusInfo.text}</span>
            </footer>
        </div>
    )
}