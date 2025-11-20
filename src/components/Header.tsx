export const Header = () => {
    return (
        <header className="bg-linear-to-r from-lime-600 to-lime-500 py-6 shadow-md w-full">
            <div className="max-w-4xl mx-auto flex items-center justify-between px-4">
                <h1 className="text-2xl font-extrabold text-white tracking-wide uppercase drop-shadow">
                    Contador de Calorías
                </h1>
                <nav className="hidden sm:flex gap-4">
                    <button className="cursor-pointer bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-xl backdrop-blur transition font-medium">
                        Inicio
                    </button>
                    <button className="cursor-pointer bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-xl backdrop-blur transition font-medium">
                        Actividades
                    </button>
                </nav>
            </div>
        </header>
    )
}