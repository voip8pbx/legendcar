/**
 * Example: How to Call the Backend API from Frontend
 * This file shows different patterns for fetching car data
 * 
 * Place this code in: frontend/src/hooks/useCarData.ts
 * Or modify frontend/src/components/CarGallery.tsx to use these patterns
 */

// ============================================
// Pattern 1: Using useEffect Hook (React)
// ============================================

'use client'; // Required for Next.js App Router

import { useEffect, useState } from 'react';

interface Car {
  id: number;
  year: string;
  model: string;
  image: string;
}

export function CarGalleryWithEffect() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        
        // Get API URL from environment variable
        // In production: https://your-app.vercel.app/api
        // In development: http://localhost:3000/api
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
        
        const response = await fetch(`${apiUrl}/cars`);
        
        if (!response.ok) {
          throw new Error(`API Error: ${response.statusText}`);
        }
        
        const data = await response.json();
        setCars(data.data || []);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch cars');
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading) return <div>Loading cars...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="car-gallery">
      {cars.map(car => (
        <div key={car.id} className="car-card">
          <img src={car.image} alt={car.model} />
          <h3>{car.year} {car.model}</h3>
        </div>
      ))}
    </div>
  );
}


// ============================================
// Pattern 2: Using Fetch in Server Component
// ============================================

export async function CarGalleryServer() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
    
    const response = await fetch(`${apiUrl}/cars`, {
      // Recommended for ISR (Incremental Static Regeneration)
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    const data = await response.json();
    const cars: Car[] = data.data || [];

    return (
      <div className="car-gallery">
        {cars.map(car => (
          <div key={car.id} className="car-card">
            <img src={car.image} alt={car.model} />
            <h3>{car.year} {car.model}</h3>
          </div>
        ))}
      </div>
    );
  } catch (error) {
    console.error('Failed to fetch cars:', error);
    return <div>Failed to load cars. Please try again later.</div>;
  }
}


// ============================================
// Pattern 3: Custom Hook for Reusability
// ============================================

export function useCars() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCars = async () => {
    try {
      setLoading(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
      const response = await fetch(`${apiUrl}/cars`);
      
      if (!response.ok) throw new Error('Failed to fetch');
      
      const data = await response.json();
      setCars(data.data || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching cars');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return { cars, loading, error, refetch: fetchCars };
}


// ============================================
// Pattern 4: Health Check Function
// ============================================

export async function checkApiHealth() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
    const response = await fetch(`${apiUrl}/health`);
    const data = await response.json();
    
    return {
      healthy: response.ok,
      status: data.status,
      timestamp: data.timestamp,
      environment: data.environment
    };
  } catch (error) {
    return {
      healthy: false,
      error: 'API unreachable'
    };
  }
}


// ============================================
// Pattern 5: Usage in Next.js Page Component
// ============================================

export async function CarListPage() {
  // This runs on the server (ISR)
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
    
    const response = await fetch(`${apiUrl}/cars`, {
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch cars');
    }

    const result = await response.json();
    const cars: Car[] = result.data || [];

    return (
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold mb-8">Classic Car Collection</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map(car => (
            <div key={car.id} className="border rounded-lg overflow-hidden shadow-lg">
              <img 
                src={car.image} 
                alt={car.model}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold">
                  {car.year} {car.model}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    return <div>Failed to load cars</div>;
  }
}


// ============================================
// Example: Update your CarGallery.tsx
// ============================================

/*
// In frontend/src/components/CarGallery.tsx:

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCars = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
        const response = await fetch(`${apiUrl}/cars`);
        const result = await response.json();
        setCars(result.data || []);
      } catch (error) {
        console.error('Failed to fetch cars:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCars();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="gallery">
      {cars.map(car => (
        <div key={car.id}>
          <img src={car.image} alt={car.model} />
          <h3>{car.year} {car.model}</h3>
        </div>
      ))}
    </div>
  );
}
*/
