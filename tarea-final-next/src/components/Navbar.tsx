"use client";
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { t, setLang, lang } = useLanguage();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={`${styles.logoLink} group`}>
          <div className={styles.logoTextContainer}>
            <span className={styles.logoTitle}>POKEDEX</span>
            <span className={styles.logoSubtitle}>David Segura Edition</span>
          </div>
        </Link>

        {/* Links navegación */}
        <nav className={styles.nav}>
            <Link href="/" className={styles.navLink}>
                {t.home}
            </Link>
            
             <div className={styles.dropdownContainer}>
                <button className={styles.dropdownButton}>
                  {t.generations}
                  <span className="text-[10px] text-yellow-400">▼</span>
                </button>
                <div className={styles.dropdownMenu}>
                  <div className={styles.dropdownContent}>
                    <Link href="/generacion/primera" className={styles.dropdownItem}>
                         {t.gen1}
                    </Link>
                    <Link href="/generacion/segunda" className={styles.dropdownItem}>
                         {t.gen2}
                    </Link>
                    
                    {/* Submenú -  */}
                    <div className={`${styles.dropdownItem} ${styles.nestedParent} group/nested`}>
                        <div className="flex justify-between items-center w-full">
                            {t.others}
                            <span className="text-[10px]">▶</span>
                        </div>
                        
                        <div className={styles.nestedMenu}>
                            <Link href="/generacion/tercera" className={styles.nestedItem}>
                                {t.third_season}
                            </Link>
                            <Link href="/generacion/cuarta" className={styles.nestedItem}>
                                {t.fourth_season}
                            </Link>
                        </div>
                    </div>
                  </div>
                </div>
            </div>

            <Link href="/contacto" className={styles.navLink}>
                {t.contact}
            </Link>
        </nav>

        {/* Selector idioma estilo gameboy */}
        <div className={styles.langContainer}>
          {['es', 'en', 'fr'].map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`${styles.langButton} ${
                  lang === l ? styles.langButtonActive : ''
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}