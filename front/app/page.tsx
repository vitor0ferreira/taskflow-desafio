import Link from "next/link";

export default function Home() {
  return (
      <main className="flex-1 w-full flex flex-col gap-4 items-center justify-center">
        <h1 className="text-center font-bold text-white text-6xl sm:text-8xl lg:text-9xl mb-4">TaskFlow</h1>
        <span className="text-amber-300 text-lg sm:text-2xl lg:text-4xl text-center font-semibold mx-2">Seu Mini-Gerenciador de Tarefas simplificado.</span>
        <nav className="flex gap-4 my-4">
          <Link href="/login" className="px-2 py-1 sm:px-3 sm:py-2 md:px-5 md:py-3 font-semibold text-lg sm:text-xl md:text-3xl bg-slate-300 rounded-md hover:bg-slate-400">Login</Link>
          <Link href="/register" className="px-2 py-1 sm:px-3 sm:py-2 md:px-5 md:py-3 font-semibold text-lg sm:text-xl md:text-3xl bg-slate-300 rounded-md hover:bg-slate-400">Criar conta</Link>
        </nav>
      </main>
  );
}
