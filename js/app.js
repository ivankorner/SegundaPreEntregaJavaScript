// Clase para crear productos
class Item {
  constructor(nombre, id, type , precio,  stock, descripcion) {
    this.nombre = nombre;
    this.id = id;
    this.type = type;
    this.precio = precio;    
    this.stock = stock;
    this.descripcion = descripcion;
  }
}

// Lista de productos existentes
const productosPreCargados = [
  {
    nombre: "Termo Lumilagro Luminox Acero",
    id: "020",
    type:"Nacional",
    precio: 18000,    
    stock: 3,
    descripcion: "Termo Lumilagro de Acero, 1 Lts, tipo Bala",
  },
  {
    nombre: "Termo Lumilagro Luminox Acero Fultbol",
    id: "021",
    type:"Nacional",
    precio: 33000,    
    stock: 5,
    descripcion:
      "Termo Lumilagro de Acero, 1 Lts, tipo Bala, Ploteado Selección Futbol Argentino",
  },
  {
    nombre: "Termo Lumilagro Sigma Vidrio",
    id: "022",
    type:"Nacional",
    precio: 28000,   
    stock: 5,
    descripcion: "Termo de vidrio azul Sigma Lumilagro 1L",
  },
  {
    nombre: "Termo Coleman Acero Inoxidable",
    id: "023",
    type:"Importado",
    precio: 58000,    
    stock: 4,
    descripcion:
      "Termo Coleman Acero Inoxidable 1200 Ml. Color Negro. Pico sevador",
  },
  {
    nombre: "Termo Termolar R-evolution",
    id: "024",
    type:"Nacional",
    precio: 54000,    
    stock: 5,
    descripcion:
      "Termo Termolar R-evolution Rolha-Dupla1 de acero inoxidable 1L acero inoxidable",
  },
  {
    nombre: "Termo Waterdog Ombu",
    id: "025",
    type:"Importado",
    precio: 64000,    
    stock: 7,
    descripcion: "Termo Waterdog Ombu 1000ml Negro Ombu1000bk",
  },
  {
    nombre: "Termo Stanley Clásico Azul Lake",
    id: "026",
    type:"Importado",
    precio: 120000,   
    stock: 3,
    descripcion: "Termo Stanley Clásico 1.4 Litros Con Manija Color Azul Lake",
  },
  {
    nombre: "Termo Contigo Ashland",
    id: "027",
    type:"Importado",
    precio: 80000,    
    stock: 2,
    descripcion:
      "Termo Contigo Ashland Chill 2070897 35hs Agua Caliente 1200cc Color Negro",
  },
  {
    nombre: "Termo Kushiro Acero Inoxidable",
    id: "028",
    type:"Importado",
    precio: 90000,
    
    stock: 2,
    descripcion: "Termo Kushiro DS607V de acero inoxidable 1L gris",
  },
  {
    nombre: "Termo Lusqtoff Acero Inoxidable",
    id: "029",
    type:"Importado",
    precio: 30000,
    
    stock: 5,
    descripcion:
      "Termo Acero Inox Lusqtoff Color Negro TL1-9N 1 Lt Tapón Cebador",
  }
]

// Recupera productos y carrito del almacenamiento local
const productos = JSON.parse(localStorage.getItem("productos")) || [];
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const ordenes = JSON.parse(localStorage.getItem("ordenes")) || [];

// Función para añadir nuevos productos
const agregarItem  = ({
  nombre, id, type , precio,  stock, descripcion
}) => {  
  if (productos.some(prod => prod.id === id)) {    
  } else {
    const nuevoProducto  = new Item(
      nombre, id, type , precio,  stock, descripcion
    )
    productos.push(nuevoProducto );    
    localStorage.setItem('productos', JSON.stringify(productos))
  }
}

// Carga inicial de productos si el array está vacío
const cargarProductosIniciales  = () => {
  if (productos.length === 0) {
    productosPreCargados.forEach(prod => {
      let dato = JSON.parse(JSON.stringify(prod));
      agregarItem (dato)
    })
  }
}

// Calcula el total del carrito de compras
const calcularTotalCarrito = () => {
  let total = carrito.reduce((acumulador, { precio, quantity }) => {
    return acumulador + precio * quantity;
  }, 0)
  return total;
}
// Actualiza el total del carrito en la interfaz
const actualizarTotalCarrito = () => {
  const carritoTotal = document.getElementById("carritoTotal")
  carritoTotal.innerHTML = `precio Total: $${calcularTotalCarrito()}`
}

// Añade un producto al carrito
const agregarAlCarrito = (objetoCarrito) => {
  carrito.push(objetoCarrito)
  actualizarTotalCarrito()
}

// Renderiza el carrito en la interfaz
const mostrarCarrito = () => {
  const listaCarrito = document.getElementById("listaCarrito")
  listaCarrito.innerHTML = ""
  carrito.forEach(
    ({nombre, precio, quantity,id}) => {
      let elementoLista = document.createElement("li")
      elementoLista.innerHTML = `Producto: ${nombre} <br> precio/U: $${precio} <br> Cant. : ${quantity} <br> <button  class="btn btn-danger" id="eliminarCarrito${id}">Borrar</button>`
      listaCarrito.appendChild(elementoLista);
      const botonEliminar = document.getElementById(`eliminarCarrito${id}`)
      botonEliminar.addEventListener("click", () => {
        carrito = carrito.filter((elemento) => {
          if (elemento.id !== id) {
            return elemento
          }
        });
        let carritoString = JSON.stringify(carrito);
        localStorage.setItem("carrito", carritoString);
        mostrarCarrito();
      });
      let carritoString = JSON.stringify(carrito);
      localStorage.setItem("carrito", carritoString);
    }
  );
};

// Borra el carrito de compras
const limpiarCarrito = () => {
  carrito.length = 0; 
  let carritoString = JSON.stringify(carrito)
  localStorage.setItem("carrito", carritoString)
  mostrarCarrito()
}

// Renderiza la lista de productos
const mostrarProductos = (arrayUtilizado) => { 
  const contenedorProductos = document.getElementById("contenedorProductos"); 
  contenedorProductos.innerHTML = "";
  arrayUtilizado.forEach(
    ({ id, nombre, precio, type, stock, descripcion }) => {
      const prodCard = document.createElement("div")      
      prodCard.classList.add("col-xs", "card")      
      prodCard.style = "width: 250px; height: auto; margin:5px;"
      prodCard.id = id
      prodCard.innerHTML = `        
                <img src="../img/${id}.png" class="card-img-top" alt="${nombre}">
                <div class="card-body">
                    <h4 class="card-title">${nombre}</h4>                    
                    <p class="card-text">${descripcion}</p>
                    <p class="precio">precio: $ ${precio}</p>
                    <p>Stock: ${stock}</p>                    
                    <p>Procedencia: ${type}</p>                                       
                    <div>
                    <form id="form${id}">
                        <label for="contador${id}">Cantidad</label>
                        <input type="number" placeholder="0" id="contador${id}">
                        <button class="btn btn-warning" style="margin: 5px"  id="botonProd${id}">Agregar</button>
                    </form>
                    </div>  
                </div>`                
      contenedorProductos.appendChild(prodCard)
      const btn = document.getElementById(`botonProd${id}`)      
      btn.addEventListener("click", (evento) => {
        evento.preventDefault()
        const contadorQuantity = Number(
          document.getElementById(`contador${id}`).value
        )
        if (contadorQuantity > 0) {
          agregarAlCarrito({
            nombre, id, type , precio,  stock, descripcion,
            quantity: contadorQuantity,
          });
          mostrarCarrito();
          const form = document.getElementById(`form${id}`);
          form.reset();
        }
      });
    }
  );
};

// Finaliza una compra
const finalizarCompra = (event) => {
  event.preventDefault();  
  const data = new FormData(event.target);  
  const cliente = Object.fromEntries(data);  
  const eticket = {
    cliente: cliente,
    total: calcularTotalCarrito(),
    id: ordenes.length,
    productos: carrito,
  }; 
  ordenes.push(eticket);  
  localStorage.setItem("ordenes", JSON.stringify(ordenes));  
  limpiarCarrito();
  let mensaje = document.getElementById("carritoTotal");
  mensaje.innerHTML =`
  <div class="descuentos text-center">
    <h2>
      "Muchas gracias por su compra"
    </h2>
 </div>  
  `
};

// Configuración del DOM y eventos
const compraFinal = document.getElementById("formCompraFinal");
compraFinal.addEventListener("submit", (event) => {
  event.preventDefault();
  if (carrito.length > 0) {
    finalizarCompra(event);
  } else {
    
  }
});
const selectorTipo = document.getElementById("tipoProducto")
selectorTipo.onchange = (evt) => {
  const tipoSeleccionado = evt.target.value;
  if (tipoSeleccionado === "Todos") {
    mostrarProductos(productos);
  } else {
    mostrarProductos(
      productos.filter((prod) => prod.type === tipoSeleccionado)
    );
  }
};

// Test
const app = () => {
  cargarProductosIniciales ();
  mostrarProductos(productos);
  mostrarCarrito();
  actualizarTotalCarrito();
};

//Ejecucion de la Aplicacion
app();
