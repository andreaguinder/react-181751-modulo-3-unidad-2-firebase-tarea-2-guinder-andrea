import { collection, doc, addDoc, setDoc, updateDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
import { useState, useEffect } from 'react';

import styles from "./AdminPanel.module.scss";

const AdminPanel = () => {
  const [productos, setProductos] = useState([]);
  const [ultimoCambio, setUltimoCambio] = useState('');

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'productos'),
      (snapshot) => {
        const lista = snapshot.docs.map(docSnap => ({
          id: docSnap.id,
          ...docSnap.data()
        }));
        setProductos(lista);
      },
      (error) => {
        console.error("Error al escuchar en tiempo real:", error);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleAddDocumento = async () => {
    try {
      const docRef = await addDoc(collection(db, 'productos'), {
        title: 'Rosa',
        price: 20.8,
        category: "Nueva Category",
        image: "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2t.png"
      });
      setUltimoCambio(` Creado nuevo producto con ID automático: ${docRef.id}`);
    } catch (err) {
      console.error("Error al agregar documento", err);
    }
  };

  const handleSetDocumentoDefinido = async () => {
    try {

      await setDoc(doc(db, "productos", "4LLO3ASeB77NDgJT0nvA"), {
        title: "CELESTE",
        price: 15.2,
        category: "Nueva Category"
      });
      setUltimoCambio(" Reemplazado / Creado 'titulo CELESTE' con setDoc");
    } catch (err) {
      console.error("Error al usar setDoc", err);
    }
  };

  const handleSetDocumentoMerge = async () => {
    try {
      await setDoc(
        doc(db, 'productos', 'BovsVvGRZ6n0vwcasiZB'),
        { price: 24.2 }, 
        { merge: true }
      );
      setUltimoCambio(" Modificado precio de 'Rain Jacket Women Windbreaker Striped Climbing Raincoats' (merge: true)");
    } catch (err) {
      console.error("Error al actualizar con merge:", err);
    }
  };

  const handleUpdateDocumento = async () => {
    try {
      await updateDoc(doc(db, 'productos', 'iEPU65WGrjkExeFdHBq5'), {
        title: 'VIOLETA'
      });
      setUltimoCambio(" Nombre de 'Chaqueta VIOLETA Cambiada' cambiado a VIOLETA");
    } catch (err) {
      console.error("Error al actualizar con updateDoc:", err);
    }
  };

  const handleDeleteDocumento = async () => {
    try {
      await deleteDoc(doc(db, 'productos', 'lOn6qkrykuC1iEjkUSpa'));
      setUltimoCambio(" Eliminado documento 'Rosa'");
    } catch (err) {
      console.error("Error al eliminar documento:", err);
    }
  };

  return (
    <div className={styles.containerBotonera}>
      <h3>Panel de Pruebas CRUD</h3>
      <div className={styles.botonera}>
        <button onClick={handleAddDocumento}>Creo producto con addDoc</button>
        <button onClick={handleSetDocumentoDefinido}>Creo ID fijo con setDoc</button>
        <button onClick={handleSetDocumentoMerge}>Modifico precio con setDoc</button>
        <button onClick={handleUpdateDocumento}>Cambio nombre con updateDoc</button>
        <button onClick={handleDeleteDocumento}>Borro producto con deleteDoc</button>
      </div>

      {ultimoCambio && (
        <p style={{ color: '#d32f2f', fontWeight: 'bold', marginTop: '10px' }}>
          Último cambio en tiempo real: {ultimoCambio}
        </p>
      )}

      <p className={styles.todosLosProductos}>
        <strong>Total de productos leídos en tiempo real:</strong> {productos.length}
      </p>
    </div>
  );
};

export default AdminPanel;