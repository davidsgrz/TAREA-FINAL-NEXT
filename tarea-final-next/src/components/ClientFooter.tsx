"use client";
import { useLanguage } from "@/context/LanguageContext";

import styles from './ClientFooter.module.css';

export default function ClientFooter() {
  const { t } = useLanguage();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
          <p className={styles.copyright}>{t.footer}</p>
          <p className={styles.credit}>{t.creator_credit}</p>
          <p className={styles.version}>PokeApp v2.0 - NextJS</p>
      </div>
    </footer>
  );
}
