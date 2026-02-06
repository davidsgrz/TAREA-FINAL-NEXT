"use client";
import { useEffect, useState, use } from 'react';
import { notFound } from 'next/navigation';
import PokemonCard from '@/components/PokemonCard';
import { useLanguage } from '@/context/LanguageContext';
import styles from './GenerationPage.module.css';

const routeMap: Record<string, string> = {
  'primera': '1',
  'segunda': '2',
  'tercera': '3',
  'cuarta': '4',
  
  '1': '1',
  '2': '2',
  '3': '3',
  '4': '4'
};

const genRanges: any = {
  '1': { min: 1, max: 151 },
  '2': { min: 152, max: 251 },
  '4': { min: 387, max: 493 }
};

export default function GenerationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { t } = useLanguage();
  
  const numericId = routeMap[id];
  const range = genRanges[numericId];

  // Validar rango inmediatamente
  if (!range) {
    notFound();
  }

  const [pokemons, setPokemons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPokemon, setSelectedPokemon] = useState<any>(null);

  useEffect(() => {
    const fetchGen = async () => {
      setLoading(true);
      if (!range) return;

      // 1. Garantizamos 10 IDs únicos usando un Set
      const idsSet = new Set<number>();
      while (idsSet.size < 10) {
        const randomId = Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
        idsSet.add(randomId);
      }
      
      const ids = Array.from(idsSet);
      
      try {
        const results = await Promise.all(ids.map(pokemonId => 
          fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`).then(res => res.json())
        ));
        setPokemons(results);
      } catch (error) {
        console.error("Error fetching pokemons:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGen();
  }, [numericId]); // Depend on numericId

  if (loading) return (
    <div className={styles.loadingContainer}>
      <p className={styles.loadingText}>{t.loading}</p>
    </div>
  );

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        {t[`gen${numericId}`]}
      </h2>

      {/* Grid para los pokemn */}
      <div className={styles.grid}>
        {pokemons.map((p) => (
          <div 
            key={p.id} 
            onClick={() => setSelectedPokemon(p)} 
            className={styles.cardWrapper}
          >
            <PokemonCard pokemon={p} />
          </div>
        ))}
      </div>

      {/* Ventana Modal de Detalles */}
      {selectedPokemon && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button 
              onClick={() => setSelectedPokemon(null)}
              className={styles.closeButton}
            >
              &times;
            </button>
            
            <div className={styles.modalHeader}>
              <button 
                className={`${styles.navButton} ${styles.prevButton}`}
                onClick={(e) => {
                  e.stopPropagation();
                  const newId = Math.max(1, selectedPokemon.id - 1);
                  if (newId !== selectedPokemon.id) {
                     fetch(`https://pokeapi.co/api/v2/pokemon/${newId}`)
                       .then(res => res.json())
                       .then(data => setSelectedPokemon(data));
                  }
                }}
              >
                &lt; {t.prev_pokemon}
              </button>

              <img 
                src={selectedPokemon.sprites.other['official-artwork'].front_default || selectedPokemon.sprites.front_default} 
                className={styles.pokemonImage} 
                alt={selectedPokemon.name} 
              />

              <button 
                className={`${styles.navButton} ${styles.nextButton}`}
                onClick={(e) => {
                  e.stopPropagation();
                  const newId = Math.min(1000, selectedPokemon.id + 1);
                  if (newId !== selectedPokemon.id) {
                     fetch(`https://pokeapi.co/api/v2/pokemon/${newId}`)
                       .then(res => res.json())
                       .then(data => setSelectedPokemon(data));
                  }
                }}
              >
                {t.next_pokemon} &gt;
              </button>

              <p className={styles.pokemonId}>Nº {selectedPokemon.id}</p>
              <h2 className={styles.pokemonName}>{selectedPokemon.name}</h2>
            </div>

            <div className={styles.statsContainer}>
              {/* HP */}
              <div className={styles.statRow}>
                <span className={styles.statLabel}>{t.stats.hp}</span>
                <div className={styles.statBarContainer}>
                  <div 
                    className={`${styles.statBar} ${styles.hpBar}`} 
                    style={{ width: `${Math.min((selectedPokemon.stats[0].base_stat / 255) * 100, 100)}%` }}
                  ></div>
                </div>
                <span className={styles.statValue}>{selectedPokemon.stats[0].base_stat}</span>
              </div>

              {/* Attk */}
              <div className={styles.statRow}>
                <span className={styles.statLabel}>{t.stats.attack}</span>
                <div className={styles.statBarContainer}>
                  <div 
                    className={`${styles.statBar} ${styles.atkBar}`} 
                    style={{ width: `${Math.min((selectedPokemon.stats[1].base_stat / 255) * 100, 100)}%` }}
                  ></div>
                </div>
                <span className={styles.statValue}>{selectedPokemon.stats[1].base_stat}</span>
              </div>

              {/* Defens */}
              <div className={styles.statRow}>
                <span className={styles.statLabel}>{t.stats.defense}</span>
                <div className={styles.statBarContainer}>
                  <div 
                    className={`${styles.statBar} ${styles.defBar}`} 
                    style={{ width: `${Math.min((selectedPokemon.stats[2].base_stat / 255) * 100, 100)}%` }}
                  ></div>
                </div>
                <span className={styles.statValue}>{selectedPokemon.stats[2].base_stat}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}