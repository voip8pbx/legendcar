export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-center backdrop-blur-sm bg-black/20">
            <div className="text-2xl font-bold tracking-tighter text-brand font-sans">
                LEGACY<span className="text-chrome italic">DRIVE</span>
            </div>
            <ul className="hidden md:flex items-center space-x-12">
                {['Home', 'Collection', 'Garage', 'Heritage'].map((item) => (
                    <li key={item}>
                        <a className="group flex items-center space-x-2 transition-colors hover:text-brand" href="#">
                            <span className="text-sm uppercase tracking-widest font-bold font-sans">{item}</span>
                        </a>
                    </li>
                ))}
            </ul>
            <div className="flex items-center space-x-4">
                <button className="p-2 border border-white/20 rounded-[8px] hover:border-brand transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                    </svg>
                </button>
            </div>
        </nav>
    );
}
