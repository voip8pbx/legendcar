export default function Footer() {
    return (
        <footer className="relative bg-black text-white pt-20 pb-10 overflow-hidden border-t border-white/10">
            <div className="max-w-7xl mx-auto px-8 relative z-10">
                <div className="grid md:grid-cols-3 gap-12 mb-20">
                    <div className="md:col-span-2">
                        <h3 className="text-brand font-bold tracking-[0.3em] uppercase text-sm mb-8">Voice of the Road</h3>
                        <div className="space-y-12">
                            <blockquote className="border-l-2 border-brand/40 pl-8">
                                <p className="font-serif text-2xl italic text-white/80 leading-relaxed mb-4">"There's a soul in these machines that modern cars just can't replicate. LEGACY DRIVE captures that essence perfectly."</p>
                                <cite className="text-brand uppercase tracking-widest text-xs font-bold">— James R., Collector</cite>
                            </blockquote>
                            <blockquote className="border-l-2 border-brand/40 pl-8">
                                <p className="font-serif text-2xl italic text-white/80 leading-relaxed mb-4">"The scent of gasoline and old leather is the best perfume. This collection is a masterpiece of curation."</p>
                                <cite className="text-brand uppercase tracking-widest text-xs font-bold">— Sarah L., Restorer</cite>
                            </blockquote>
                        </div>
                    </div>
                    <div className="bg-white/5 p-8 rounded-[8px] border border-white/10 backdrop-blur-sm self-start">
                        <h3 className="text-brand font-bold tracking-widest uppercase text-xs mb-4">Did You Know?</h3>
                        <p className="text-chrome text-sm leading-loose">
                            The 1964 Pontiac GTO is widely considered the first true "Muscle Car." It was originally an options package for the Pontiac Tempest, defying GM's ban on large engines in mid-sized cars.
                        </p>
                        <div className="mt-6 h-px w-12 bg-brand"></div>
                    </div>
                </div>
                <div className="grid md:grid-cols-2 gap-16 items-center py-16 border-t border-white/5">
                    <div>
                        <h2 className="font-serif text-4xl mb-4 italic">Share Your Story</h2>
                        <p className="text-chrome/60 max-w-md">Have a vintage legend in your garage? Or just want to talk shop? Drop us a line below.</p>
                    </div>
                    <form className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                className="bg-transparent border-white/20 border-0 border-b-2 focus:border-brand focus:ring-0 text-white placeholder-white/30 py-3 transition-colors w-full"
                                placeholder="Name"
                                type="text"
                            />
                            <input
                                className="bg-transparent border-white/20 border-0 border-b-2 focus:border-brand focus:ring-0 text-white placeholder-white/30 py-3 transition-colors w-full"
                                placeholder="Email"
                                type="email"
                            />
                        </div>
                        <textarea
                            className="bg-transparent border-white/20 border-0 border-b-2 focus:border-brand focus:ring-0 text-white placeholder-white/30 py-3 transition-colors w-full block"
                            placeholder="Your Message"
                            rows={1}
                        />
                        <button className="mt-4 text-brand uppercase tracking-[0.3em] font-bold text-xs hover:text-white transition-colors flex items-center group" type="submit">
                            Send Dispatch
                            <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                            </svg>
                        </button>
                    </form>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-white/10 text-[10px] uppercase tracking-[0.5em] text-chrome/40">
                    <div className="mb-4 md:mb-0">© 2024 LEGACY DRIVE. All Rights Reserved.</div>
                    <div className="flex space-x-8">
                        <a className="hover:text-brand transition-colors" href="#">Privacy</a>
                        <a className="hover:text-brand transition-colors" href="#">Terms</a>
                        <a className="hover:text-brand transition-colors" href="#">Archive</a>
                    </div>
                </div>
            </div>
            <div className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-brand/5 blur-[120px] rounded-full -mb-32 -mr-32"></div>
        </footer>
    );
}
