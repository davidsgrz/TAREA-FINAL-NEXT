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
                    {[1, 2, 3].map((num) => (
                      <Link key={num} href={`/generacion/${num}`} className={styles.dropdownItem}>
                        {t[`gen${num}`]}
                      </Link>
                    ))}
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