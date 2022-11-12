//VER QUE HACER EL STOPPROPAGATION()
//TERMINAR!!!

const cards = document.getElementById("cards")
const items = document.getElementById("items")
const footer = document.getElementById("footer")

const templateCards = document.getElementById("template-card").content
const templateFooter = document.getElementById("template-footer").content
const templateCarrito = document.getElementById("template-carrito").content
const fragment = document.createDocumentFragment()
let carrito = {}
const miLocalStorage = window.localStorage;
document.addEventListener('DOMContentLoaded', ()=>{
    fetchData()
    if(localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        pintarCarrito();
    }
})
/**Obtiene el click en el boton */
cards.addEventListener('click', e =>{
    agregarCarrito(e)
})

items.addEventListener("click", e =>{
    btnAccion(e)
})
/**
 * Consumo mi api de productos local
 */
const fetchData = async () =>{
    try {
        const res = await fetch('../api/product.json')
        const data = await res.json()
        renderizarProductos(data)
    } catch (error) {
    }
}
/**
 * Pinto los productos en el DOM
 */
const renderizarProductos = data =>{
    data.forEach(producto => {
        /** Pinto los titulos dinamicamente */
        templateCards.querySelector('h5').textContent = producto.nombre
        templateCards.querySelector('p').textContent = producto.precio
        templateCards.querySelector('img').setAttribute("src", producto.img)
        templateCards.querySelector('.btn-dark').dataset.id = producto.id
        const clone = templateCards.cloneNode(true)
        fragment.appendChild(clone)
    });
    cards.appendChild(fragment)
}
/**Detecto el boton Comprar mediante su clase*/
const agregarCarrito = e => {
    if(e.target.classList.contains('btn-dark')){
        setCarrito(e.target.parentElement)
    }
    /** Evita que se seleccione cualquier elemento del contenedor padre */
    e.stopPropagation();
}
/**Agrego el objeto a mi carrito */
const setCarrito = objeto =>{
    /**Creo un array de objeto que me devuelve los atributos del producto seleccionado */
    const producto = {
        id: objeto.querySelector('.btn-dark').dataset.id,
        nombre: objeto.querySelector('h5').textContent,
        precio: objeto.querySelector('p').textContent,
        cantidad: 1,
    }
    /**Pregunto si carrito tiene el ID dentro, en caso de TRUE, aumento la cantidad */
    if(carrito.hasOwnProperty(producto.id)){
        producto.cantidad = carrito[producto.id].cantidad+1
    }

    carrito[producto.id] = {...producto}
    pintarCarrito();
}

const pintarCarrito = ()=>{
    items.innerHTML = ''
    Object.values(carrito).forEach(producto =>{
        templateCarrito.querySelector('th').textContent = producto.id
        templateCarrito.querySelectorAll('td')[0].textContent = producto.nombre
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
        templateCarrito.querySelector('.btn-info').dataset.id = producto.id
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id
        templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio

        const clone = templateCarrito.cloneNode(true);
        fragment.appendChild(clone);

    })
    items.appendChild(fragment)
    pintarFooter()

    localStorage.setItem('carrito', JSON.stringify(carrito))
}

const pintarFooter = () =>{
    footer.innerHTML = '';
    if(Object.keys(carrito).length ===0){
        footer.innerHTML = `
        <th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>
        `
        return;
    }

    const cantidadTotal = Object.values(carrito).reduce((acc, {cantidad})=> acc + cantidad,0)
    const precioTotal = Object.values(carrito).reduce((acc, {cantidad, precio})=> acc + cantidad*precio ,0)    
    
    templateFooter.querySelectorAll('td')[0].textContent = cantidadTotal;
    templateFooter.querySelector('span').textContent = precioTotal;

    const clone = templateFooter.cloneNode(true);
    fragment.appendChild(clone);
    footer.appendChild(fragment)

    const btnVaciar = document.getElementById('vaciar-carrito');
    btnVaciar.addEventListener('click', () =>{
        carrito = {};
        pintarCarrito();
    })
    }

    const btnAccion = e =>{
        if(e.target.classList.contains('btn-info')){
            const producto = carrito[e.target.dataset.id];
            producto.cantidad++;
            carrito[e.target.dataset.id] = {...producto};
            pintarCarrito();
        }
        if(e.target.classList.contains('btn-danger')){
            const producto = carrito[e.target.dataset.id];
            if(producto.cantidad === 0){
                delete carrito[e.target-dataset.id]
            }
            pintarCarrito();
        }
        e.stopPropagation();
    }
