'use client';
import { useEffect, useState } from 'react';

interface Car {
    id: number;
    year: string;
    model: string;
    image: string;
}

export default function CarGallery() {
    const [cars, setCars] = useState<Car[]>([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/cars')
            .then(res => res.json())
            .then(data => setCars(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <>
            <header className="py-16 px-6 text-center relative overflow-hidden" data-purpose="main-header">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-widest text-white uppercase mb-4" style={{ letterSpacing: '0.15em' }}>
                        The Timeless Collection
                    </h1>
                    <div className="chrome-divider w-1/3 mx-auto mb-6"></div>
                    <p className="text-chrome font-light uppercase tracking-[0.4em] text-sm">Curated Vintage Excellence</p>
                </div>
            </header>
            <main className="max-w-7xl mx-auto px-6 pb-24" data-purpose="car-gallery">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {cars.map((car) => (
                        <article
                            key={car.id}
                            className="car-card rounded-[8px] overflow-hidden flex flex-col group transition-all duration-500"
                        >
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    alt={car.model}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    src={car.image}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                            </div>
                            <div className="p-6">
                                <span className="text-brand font-bold text-xs tracking-widest uppercase">{car.year}</span>
                                <h2 className="text-2xl font-semibold mt-1 group-hover:text-brand transition-colors">{car.model}</h2>
                                <div className="mt-4 flex justify-between items-center">
                                    <button className="px-4 py-2 border border-chrome/30 rounded-[8px] text-xs uppercase tracking-widest hover:bg-brand hover:border-brand transition-all">View Details</button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </main>
        </>
    );
}
