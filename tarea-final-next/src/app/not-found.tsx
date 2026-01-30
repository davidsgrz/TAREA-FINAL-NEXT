import styles from './NotFound.module.css';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.message}>¡Vaya! Este Pokémon se ha escapado (Página no encontrada).</p>
      <a href="/" className={styles.link}>Volver al inicio</a>
    </div>
  );
}