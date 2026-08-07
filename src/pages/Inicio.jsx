import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard/ProductCard';
import styles from '../styles/Pages.module.scss';
import Loader from '../components/Loader/Loader';
import AdminPanel from '../components/AdminPanel/AdminPanel';

// Firestore imports
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

const Inicio = () => {
  const [productos, setProductos] = useState(null);

  useEffect(() => {
    const productosRef = collection(db, 'productos');

    const unsubscribe = onSnapshot(
      productosRef,
      (snapshot) => {
        const docs = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProductos(docs);
      },
      (err) => {
        console.error("Error al escuchar productos de Firestore:", err);
      }
    );

    return () => unsubscribe();
  }, []);

  if (!productos) return <Loader />;

  return (
    <div className={styles.containerGeneral}>
      <AdminPanel />

      <h1>Nuestros Productos</h1>

      <div className={styles.containerProductosInicio}>
        {productos.map(prod => (
          <ProductCard
            key={prod.id}
            id={prod.id}
            image={prod.image}
            title={prod.title}
            price={prod.price}
          />
        ))}
      </div>
    </div>
  );
};

export default Inicio;