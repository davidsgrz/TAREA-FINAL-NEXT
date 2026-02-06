import styles from './NotFound.module.css';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <img src="/404-error.jpg" alt="404 Not Found" className="w-96 mb-8 drop-shadow-lg" />
      <p className={styles.message}>¡Vaya! Este Pokémon se ha escapado (Página no encontrada).</p>
      <a href="/" className={styles.link}>Volver al inicio</a>
    </div>
  );
}