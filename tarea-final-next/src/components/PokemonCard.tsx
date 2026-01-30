"use client";
import { useLanguage } from '@/context/LanguageContext';
import styles from './PokemonCard.module.css';

export default function PokemonCard({ pokemon, showButton = true }: { pokemon: any, showButton?: boolean }) {
  const { t } = useLanguage();

  return (
    <div className={`${styles.card} group animate-card`}>
      {/* Pantalla */}
      <div className={styles.screen}>
        <span className={styles.idNumber}>
          No. {pokemon.id.toString().padStart(3, '0')}
        </span>
        
        <div className={styles.screenInner}>
             {/* Pixel art para el efecto en el grid */}
             <div className={styles.gridOverlay}></div>
             
          <img 
            src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default} 
            alt={pokemon.name} 
            className={styles.image}
          />
        </div>
      </div>

      <div className={styles.infoContainer}>
          <p className={styles.type}>
            {pokemon.types[0].type.name}
          </p>
          <h3 className={styles.name}>
            {pokemon.name}
          </h3>
          
          {showButton && (
            <button className={styles.button}>
              {t.details}
            </button>
          )}
      </div>
    </div>
  );
}