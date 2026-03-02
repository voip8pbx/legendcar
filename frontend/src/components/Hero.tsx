export default function Hero() {
    return (
        <main className="relative min-h-screen w-full flex items-center justify-center overflow-hidden" data-purpose="hero-section">
            <div className="absolute inset-0 z-0">
                <img
                    alt="Classic Vintage Muscle Car"
                    className="w-full h-full object-cover scale-105 filter brightness-[0.4] contrast-125 saturate-[0.8]"
                    src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=2070"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black z-10"></div>
                <div className="absolute inset-0 light-leak z-20"></div>
                <div className="absolute inset-0 vignette z-30"></div>
            </div>
            <section className="relative z-50 text-center px-4 max-w-6xl mx-auto">
                <div className="mb-6 overflow-hidden">
                    <p className="text-brand font-bold tracking-[0.4em] text-xs sm:text-sm uppercase opacity-90 animate-fade-in-down">
                        A Tribute to the Golden Era of Machines
                    </p>
                </div>
                <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl font-black mb-10 tracking-tighter leading-none italic animate-fade-in">
                    <span className="block chrome-text">LEGENDS</span>
                    <span className="block text-white/90 transform -translate-y-4">NEVER FADE</span>
                </h1>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8">
                    <button className="group relative px-10 py-5 bg-brand text-black font-bold uppercase tracking-widest text-sm rounded-[8px] overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(236,109,19,0.4)]">
                        <span className="relative z-10">Explore the Collection</span>
                        <div className="absolute top-0 left-0 w-full h-full bg-white/30 transform -skew-x-[20deg] -translate-x-full group-hover:animate-shine"></div>
                    </button>
                    <button className="px-10 py-5 border border-white/30 hover:border-white text-white font-bold uppercase tracking-widest text-sm rounded-[8px] transition-all duration-300 backdrop-blur-md">
                        View Garage
                    </button>
                </div>
            </section>
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 animate-bounce">
                <div className="w-px h-20 bg-gradient-to-b from-brand to-transparent"></div>
            </div>
        </main>
    );
}
