# BookHive

BookHive es una aplicación de e-commerce para la venta de libros. Esta aplicación está construida utilizando React y Firebase para la autenticación y la gestión de la base de datos.

## Características

- Registro e inicio de sesión de usuarios
- Añadir, editar y eliminar productos (disponible solo para administradores)
- Carrito de compras persistente vinculado al usuario autenticado
- Filtrado y ordenación de productos

## Datos útiles para manipular el proyecto:

- A pesar de que los usuarios pueden ser creados, la cuenta predeterminada de un usuario es "usuario@gmail.com", de contraseña "user123".
- Para poder manipular la base de datos directamente se necesita estar admitido en la misma. Sin embargo, éste es el enlace: https://console.firebase.google.com/u/0/project/bookhive28/firestore/databases/-default-/data/~2Forders~2F1?hl=es-419
- Existe un ReadMe dentro del proyecto con más información a ser consultada.

## Tecnologías utilizadas

- React
- Firebase (Firestore, Authentication)
- CSS tradicional, CSS Modules y styled-components para los estilos
- Ant Design para algunos componentes

## Estructura del proyecto

- `src/components`: Contiene los componentes React.
- `src/pages`: Contiene las páginas de la aplicación.
- `src/styles`: Contiene los archivos CSS.
- `src/components`: Contiene los componentes jsx.
- `src/firebaseConfig.js`: Configuración de Firebase.
