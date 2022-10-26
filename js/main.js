// let carrito = [];
// // let total = 0;
// let productsContainer = document.querySelector(".shop-items");
// let totalComprado = document.querySelector(".cart-total-title");
// //petcion de productos, borrar
// let resp = await fetch("https://api.escuelajs.co/api/v1/products");
// let data = await resp.json();

// let productos = [
//   {
//     id: 1,
//     nombre: "Purmamarca",
//     tipo: "Malbec",
//     precio: 1300,
//     stock: 100,
//     img: "../images/purma.jpg",
//   },
//   {
//     id: 2,
//     nombre: "Tilcara",
//     tipo: "Cabernet",
//     precio: 1500,
//     stock: 100,
//     img: "../images/tilcara.jpg",
//   },
//   {
//     id: 3,
//     nombre: "Maimara",
//     tipo: "Cabernet-Malbec",
//     precio: 1800,
//     stock: 100,
//     img: "../images/maimara.jpg",
//   },
// ]; //aqui armar el array de vinos

// //Imprimo los items en pantalla

// agregarItems();

// //escucho cuando se click en el boton agregar
// let btnAgregar = document.querySelectorAll(".shop-item-button");
// btnAgregar = [...btnAgregar];

// let cartContainer = document.querySelector(".cart-items");

// btnAgregar.forEach((el) => {
//   el.addEventListener("click", (e) => {
//     //Buscar el ID del producto
//     let id = parseInt(e.target.parentNode.parentNode.id);

//     //con el ID encontrar el objeto actual
//     let prodActual = productos.find((item) => item.id == id);

//     if (prodActual.quantity === undefined) {
//       prodActual.quantity = 1;
//     }

//     //Pregunto si el producto ya existe
//     let existe = false;
//     carrito.forEach((el) => {
//       if (id == el.id) {
//         existe = true;
//       }
//     });
//     existe ? prodActual.quantity++ : carrito.push(prodActual);
    
//     //Agregar el producot al carrito
//     agregarProductos();
//     //Actualizar el total
//     getTotal();
//   });
// });

// function agregarItems() {
//   productos.forEach((el) => {
//     //aqui dibujo los items en pantalla
//     productsContainer.innerHTML += ` 
//           <div class="shop-item" id ="${el.id}">
//               <span class="shop-item-title">${el.nombre}</span>
//               <img class="shop-item-image" src="${el.img}">
//               <div class="shop-item-details">
//                   <span class="shop-item-price">$${el.precio}</span>
//                   <button class="btn btn-primary shop-item-button" type="button">AGREGAR</button>
//               </div>
//           </div>`;
//   });
// }

// function getTotal() {
//   let sumTotal;
//   let total = carrito.reduce((sum, item) => {
//     sumTotal = sum + item.quantity * item.precio;
//     return sumTotal;
//   }, 0);
//   totalComprado.innerText = `$${total}`;
// }

// function agregarProductos() {
//   cartContainer.innerHTML = "";
//   carrito.forEach((el) => {
//     cartContainer.innerHTML += `
//             <div class="cart-row">
//                 <div class="cart-item cart-column">
//                     <img class="cart-item-image" src="${el.img}" width="100" height="100">
//                     <span class="cart-item-title">${el.nombre}</span>
//                 </div>
//                 <span class="cart-price cart-column">$${el.precio}</span>
//                 <div class="cart-quantity cart-column">
//                     <input class="cart-quantity-input" min="1" type="number" value="${el.quantity}">
//                     <button class="btn btn-danger" type="button">REMOVE</button>
//                 </div>
//             </div>`;
//   });
// }

// function updateNumItems() {
//   console.log("Entro");
//   let inputNumber = document.querySelectorAll('.cart-quantity-input');

//   inputNumber = [...inputNumber]

//   inputNumber.forEach(item => {
//     item.addEventListener("click", (event)=>{
//       console.log(event);
//     });
//   });
  
 
// }
// updateNumItems();
//QUEDA PENDIENTE MULTIPLICAR AL HACER CLICK EN EL INPUT DE CANTIDAD

//-----------------------------------------------------------------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {

  // Variables
  const vinos = [
      {
            id: 1,
            nombre: "Purma",
            tipo: "Malbec",
            precio: 1300,
            stock: 100,
            img: "../images/purma.jpg"
      },
      {
            id: 2,
            nombre: "Tilcara",
            tipo: "Cabernet",
            precio: 1500,
            stock: 100,
            img: "../images/tilcara.jpg"
      },
      {
            id: 3,
            nombre: "Maimara",
            tipo: "Cabernet-Malbec",
            precio: 1800,
            stock: 100,
            img: "../images/maimara.jpg"
      }
  ];

  let carrito = [];
  const DOMitems = document.querySelector('#items');
  const DOMcarrito = document.querySelector('#carrito');
  const DOMtotal = document.querySelector('#total');
  const DOMbotonVaciar = document.querySelector('#boton-vaciar');
  const DOMbotonComprar = document.querySelector('#boton-comprar');
  const miLocalStorage = window.localStorage;

  // Funciones

  /**
  * Dibuja todos los productos a partir de la base de datos. No confundir con el carrito
  */
  function renderizarProductos() {
      vinos.forEach((info) => {
          // Estructura
          const miNodo = document.createElement('div');
          miNodo.classList.add('card', 'col-sm-4');
          // Body
          const miNodoCardBody = document.createElement('div');
          miNodoCardBody.classList.add('card-body');
          // Titulo
          const miNodoTitle = document.createElement('h5');
          miNodoTitle.classList.add('card-title');
          miNodoTitle.textContent = info.nombre;
          // Imagen
          const miNodoImagen = document.createElement('img');
          miNodoImagen.classList.add('img-fluid');
          miNodoImagen.setAttribute('src', info.img);
          // Precio
          const miNodoPrecio = document.createElement('p');
          miNodoPrecio.classList.add('card-text');
          miNodoPrecio.textContent = `$${info.precio}`;
          // Boton 
          const miNodoBoton = document.createElement('button');
          miNodoBoton.classList.add('btn', 'btn-primary');
          miNodoBoton.textContent = '+';
          miNodoBoton.setAttribute('marcador', info.id);
          miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
          // Insertamos
          miNodoCardBody.appendChild(miNodoImagen);
          miNodoCardBody.appendChild(miNodoTitle);
          miNodoCardBody.appendChild(miNodoPrecio);
          miNodoCardBody.appendChild(miNodoBoton);
          miNodo.appendChild(miNodoCardBody);
          DOMitems.appendChild(miNodo);
      });
  }

  /**
  * Evento para añadir un producto al carrito de la compra
  */
  function anyadirProductoAlCarrito(evento) {
      // Anyadimos el Nodo a nuestro carrito
      carrito.push(evento.target.getAttribute('marcador'))
      // Actualizamos el carrito 
      renderizarCarrito();
      // Actualizamos el LocalStorage
      guardarCarritoEnLocalStorage();
  }

  /**
  * Dibuja todos los productos guardados en el carrito
  */
  function renderizarCarrito() {
      // Vaciamos todo el html
      DOMcarrito.textContent = '';
      // Quitamos los duplicados
      const carritoSinDuplicados = [...new Set(carrito)];
      // Generamos los Nodos a partir de carrito
      carritoSinDuplicados.forEach((item) => {
          // Obtenemos el item que necesitamos de la variable base de datos
          const miItem = vinos.filter((itemVinos) => {
              // ¿Coincide las id? Solo puede existir un caso
              return itemVinos.id === parseInt(item);
          });
          // Cuenta el número de veces que se repite el producto
          const numeroUnidadesItem = carrito.reduce((total, itemId) => {
              // ¿Coincide las id? Incremento el contador, en caso contrario lo mantengo
              return itemId === item ? total += 1 : total;
          }, 0);
          // Creamos el nodo del item del carrito
          const miNodo = document.createElement('li');
          miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
          miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - $${miItem[0].precio}`;
          // Boton de borrar
          const miBoton = document.createElement('button');
          miBoton.classList.add('btn', 'btn-danger', 'mx-5');
          miBoton.textContent = 'X';
          miBoton.style.marginLeft = '1rem';
          miBoton.dataset.item = item;
          miBoton.addEventListener('click', borrarItemCarrito);
          // Mezclamos nodos
          miNodo.appendChild(miBoton);
          DOMcarrito.appendChild(miNodo);
      });
      // Renderizamos el precio total en el HTML
      DOMtotal.textContent = calcularTotal();
  }

  /**
  * Evento para borrar un elemento del carrito
  */
  function borrarItemCarrito(evento) {
      // Obtenemos el producto ID que hay en el boton pulsado
      const id = evento.target.dataset.item;
      // Borramos todos los productos
      carrito = carrito.filter((carritoId) => {
          return carritoId !== id;
      });
      // volvemos a renderizar
      renderizarCarrito();
      // Actualizamos el LocalStorage
      guardarCarritoEnLocalStorage();

  }

  /**
   * Calcula el precio total teniendo en cuenta los productos repetidos
   */
  function calcularTotal() {
      // Recorremos el array del carrito 
      return carrito.reduce((total, item) => {
          // De cada elemento obtenemos su precio
          const miItem = vinos.filter((itemBaseDatos) => {
              return itemBaseDatos.id === parseInt(item);
          });
          // Los sumamos al total
          return total + miItem[0].precio;
      }, 0).toFixed(2);
  }
  /**
   * Emulo el resultado de una compra
   */
  function comprar() {
    alert("Muchas gracias por su compra!");
    vaciarCarrito();
    
    
  }

  /**
  * Vacia el carrito y vuelve a dibujarlo
  */
  function vaciarCarrito() {
      // Limpiamos los productos guardados
      carrito = [];
      // Renderizamos los cambios
      renderizarCarrito();
      // Borra LocalStorage
      localStorage.clear();

  }

  function guardarCarritoEnLocalStorage () {
      miLocalStorage.setItem('carrito', JSON.stringify(carrito));
  }

  function cargarCarritoDeLocalStorage () {
      // ¿Existe un carrito previo guardado en LocalStorage?
      if (miLocalStorage.getItem('carrito') !== null) {
          // Carga la información
          carrito = JSON.parse(miLocalStorage.getItem('carrito'));
      }
  }

  // Eventos
  DOMbotonVaciar.addEventListener('click', vaciarCarrito);
  DOMbotonComprar.addEventListener('click', comprar);

  // Inicio
  cargarCarritoDeLocalStorage();
  renderizarProductos();
  renderizarCarrito();
});
