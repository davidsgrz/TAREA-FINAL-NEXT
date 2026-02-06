"use client";
import { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import PokemonCard from '@/components/PokemonCard';

export default function HomePage() {
  const context = useLanguage();
  const [pokemon, setPokemon] = useState<any>(null);

  // Verificar que --> contexto existe -->evita errores
  if (!context) return null;
  const { t } = context;

  useEffect(() => {
    // Genera Pokémon aleatorio primera gen e bienvenida
    const randomId = Math.floor(Math.random() * 151) + 1;
    fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`)
      .then(res => res.json())
      .then(data => setPokemon(data));
  }, []);

  return (
    <main className="p-8 text-center flex flex-col items-center justify-center min-h-[70vh]">
      <h1 className="text-3xl md:text-5xl font-black mb-12 text-slate-800 drop-shadow-sm tracking-tighter uppercase">
        {t.welcome} <span className="text-[#ff1f1f]">!</span>
      </h1>
      
      <div className="max-w-sm w-full">
        {/* showButton={false} asi no  botón en el inicio */}
        {pokemon && (
          <PokemonCard 
            pokemon={pokemon} 
            showButton={false} 
          />
        )}
      </div>
    </main>
  );
}