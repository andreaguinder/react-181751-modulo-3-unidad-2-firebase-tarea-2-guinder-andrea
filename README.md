# Mini Dashboard y Ecommerce en React con Firebase 2

## Descripción del Proyecto

Esta aplicación es una tienda y mini dashboard interactivo desarrollado con React, Vite, Sass Modules y **Firebase (Cloud Firestore)**. El proyecto implementa un sistema de navegación con **React Router DOM** (rutas públicas, dinámicas y protegidas con `ProtectedRoute` y `AuthContext`), sumado a una integración completa con Cloud Firestore para la gestión de datos en tiempo real y operaciones CRUD.

Para cumplir con la consigna, la pantalla de inicio integra un **Panel de Pruebas CRUD (`AdminPanel`)** que permite ejecutar de forma visual todas las escrituras y actualizaciones en la base de datos, reflejando las modificaciones de manera instantánea en la interfaz sin necesidad de recargar la página.

---

## Operaciones CRUD e Integración con Firestore

El proyecto implementa todas las operaciones fundamentales sobre la colección `productos` en Cloud Firestore:

* **Lectura de Datos:**
  * **Un único documento por ID (`getDoc`):** Implementado en la vista de detalle de producto (`Producto.jsx`) mediante parámetros dinámicos de URL (`/producto/:id`).
  * **Escucha en tiempo real (`onSnapshot`):** Utilizado en la vista principal (`Inicio.jsx`) y en el panel de control (`AdminPanel.jsx`). Permite suscribirse a los cambios de la colección para que la interfaz agregue, modifique o borre tarjetas automáticamente ante cualquier evento en Firestore.

* **Inserción de Datos:**
  * **Con ID automático (`addDoc`):** Permite crear un nuevo documento dentro de la colección `productos` asignando un identificador aleatorio generado por Firebase.
  * **Con ID definido (`setDoc`):** Permite crear o reemplazar un documento especificando manualmente su identificador único (por ejemplo, `producto001`).

* **Actualización de Datos:**
  * **Con `setDoc` y `{ merge: true }`:** Modifica o añade únicamente los campos especificados dentro de un documento existente sin sobrescribir el resto de sus propiedades.
  * **Con `updateDoc`:** Actualiza campos específicos de un documento ya existente de forma directa.

* **Eliminación de Datos:**
  * **Con `deleteDoc`:** Elimina un documento específico mediante su ID. Al estar enlazado con la suscripción en tiempo real (`onSnapshot`), el elemento desaparece de la vista en vivo inmediatamente.

* **Seguridad y Control de Acceso (Prueba de Reglas):**
  * Se testeó el comportamiento de seguridad restrictivo (`allow write: if request.auth != null;`), comprobando que Firestore bloquea las peticiones no autenticadas en la consola del navegador (`Missing or insufficient permissions`).
  * **Nota de Corrección:** Para facilitar la evaluación del proyecto, las reglas actuales de Firestore se mantienen con permisos de lectura y escritura habilitados (`allow read, write: if true;`), permitiendo probar libremente cada botón del panel CRUD sin bloqueos de permisos.

---

## Funcionalidades Implementadas

* **Panel de Pruebas CRUD (`AdminPanel`):** Botonera integrada en la pantalla principal para probar interactivamente `addDoc`, `setDoc`, `updateDoc`, `deleteDoc` y verificar la actualización en tiempo real con indicador de eventos.
* **Suscripción Live (`onSnapshot`):** Sincronización continua entre la base de datos y la interfaz de usuario.
* **Layout Anidado (`MainLayout`):** Estructura visual persistente con `Header` y `Footer` utilizando `<Outlet />`.
* **Detalle de Producto Dinámico (`/producto/:id`):** Consulta por ID de documento mediante `useParams` y `getDoc`.
* **Protección de Rutas (`ProtectedRoute`):** Intercepción y redirección inteligente de usuarios no autenticados que intentan ingresar a rutas privadas (`/checkout`).
* **Variables de Entorno Seguras:** Configuración centralizada del SDK de Firebase mediante archivo `.env`.

---

## Estructura de Archivos Principal

* `src/config/`:
  * `firebaseConfig.js`: Inicialización y exportación centralizada de Firebase y Firestore (`db`).
* `src/context/`:
  * `AuthContext.jsx`: Proveedor del estado global de autenticación (`isLoggedIn`, `login`, `logout`).
* `src/components/`:
  * `AdminPanel/`: Botonera e interfaz de pruebas con todos los métodos CRUD de Firestore.
  * `Header/`: Navegación principal con enlaces condicionales según estado de sesión.
  * `Footer/`: Pie de página.
  * `MainLayout/`: Contenedor principal con `<Outlet />`.
  * `ProtectedRoute/`: Componente guardián de rutas privadas.
  * `ProductCard/`: Tarjeta visual para renderizar cada producto individual.
  * `ProductDetail/`: Vista detallada de la información del producto.
  * `Loader/`: Indicador visual de estado de carga.
* `src/pages/`:
  * `Inicio.jsx`: Vista principal que suscribe la colección de productos en tiempo real (`onSnapshot`) e integra el `AdminPanel`.
  * `Producto.jsx`: Vista dinámica (`/producto/:id`) con lectura por ID individual (`getDoc`).
  * `Contacto.jsx`: Vista de contacto con validación nativa y modal de confirmación.
  * `Login.jsx`: Página de inicio de sesión con redirección post-login.
  * `Checkout.jsx`: Vista protegida privada.
* `src/styles/`: Estilos globales y módulos Sass (`.module.scss`).

---


## Instrucciones para Ejecutar el Proyecto Localmente

Para clonar, instalar las dependencias y ejecutar este proyecto en tu entorno local, seguí estos pasos desde tu terminal:

1. **Clonar el repositorio:**
   ```bash
   git clone <https://github.com/andreaguinder/react-181751-modulo-3-unidad-2-firebase-tarea-2-guinder-andrea.git>

2. **Ingresar a la carpeta del proyecto**
Luego moverse del directorio que se creó con el nombre del proyecto:
    ```bash
    cd react-181751-modulo-2-unidad-3-enrutamiento-tarea-guinder-andrea

3. **Instalar las dependencias**
Instalar todos los paquetes necesarios especificados en el package.json (incluyendo React y las herramientas de desarrollo como SASS):
    ```bash
    npm install

4. **Ejecutar el servidor de desarrollo**
Iniciar el entorno de desarrollo local para ver la aplicación en el navegador:
    ```bash
    npm run dev

5. Abrir en el navegador
Una vez que la terminal te indique que el servidor está corriendo, abre tu navegador e ingresa la dirección que te figure ejemplo:

http://localhost:5173

---

##  Capturas de pantalla

En /src/proyecto adjunto capturas de pantalla de mobile y desktop de como se visualiza el proyecto en el navegador y también el pdf de la tarea, incluido una captura d ela consola de firebase con los productos.

---

##  Créditos del Autor

Estudiante: Andrea Guinder

Curso: React (Comisión 181751)

Módulo 3 - Unidad 2: Firebase- Tarea N° 2

Institución: Universidad Tecnológica Nacional

---

##  Fuentes y Referencias

* Material teórico y práctico proporcionado por la Universidad Tecnológica Nacional (UTN).

* Material teórico y práctico de CoderHouse de curso de React.js

* Asistencia de IA: Soporte técnico y resolución de dudas mediante Gemini.
