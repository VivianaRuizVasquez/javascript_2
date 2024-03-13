
//PROFEEEEE YO SE QUE FALTA QUE SUME EL TOTAL , PERO TENGA PIEDAD TTTT______TTTTT
//Ya no me quedan mas neuronas

// Variables
//Entendi que los elementos que no se reasignan serian const
// Queryselector cuando tengo un solo elemento con ese nombre

const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];  //El carrito inicia vacio 

// Listeners
cargarEventListeners();

function cargarEventListeners() {
    // Dispara cuando se presiona "Agregar Carrito" 
    //Falta agregar una notificacion en el carro cuando agregas el curso 
    listaCursos.addEventListener('click', agregarCurso);

    // Cuando se elimina un curso del carrito
    //Falta agregar un modo para que no se me borren todos al vaciar 
    carrito.addEventListener('click', eliminarCurso);

    // Al Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

}
// Funciones
// Función que añade el curso al carrito
function agregarCurso(e) {
    e.preventDefault(); //No tengo el link ## , esto para que no se suba la pantalla 

    if (e.target.classList.contains('agregar-carrito')) {
        const curso = e.target.parentElement.parentElement;
        // Enviamos el curso seleccionado para tomar sus datos
        leerDatosCurso(curso);
    }
}

// Lee los datos del curso
function leerDatosCurso(curso) {
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //Si compra el mismo curso varias veces , que lo sume al existente
    if (articulosCarrito.some(curso => curso.id === infoCurso.id)) {
        const cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso;
            } else {
                return curso;
            }
        })
        articulosCarrito = [...cursos];
    } else {
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    // console.log(articulosCarrito)


    carritoHTML();
}

// Elimina el curso del carrito en el DOM
function eliminarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('borrar-curso')) {
        // e.target.parentElement.parentElement.remove();
        const cursoId = e.target.getAttribute('data-id')

        // Eliminar del arreglo del carrito
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

        carritoHTML();
    }
}

// Muestra el curso seleccionado en el Carrito
function carritoHTML() {

    vaciarCarrito();

    //Iterando el carrito con for each  --- table row 

    articulosCarrito.forEach(curso => {
        const row = document.createElement('tr');
        row.innerHTML = `
               <td>  
                    <img src="${curso.imagen}" width=100>
               </td>
               <td>${curso.titulo}</td>
               <td>${curso.precio}</td>
               <td>${curso.cantidad} </td>
               <td>
                    <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
               </td>
          `;

        //agrega el html del carrito en el tbody
        contenedorCarrito.appendChild(row);
    });

}

// Eliminar todo 
function vaciarCarrito() {

    //Limpiar el html para que al agregar cursos no los duplique , sino que agregue ala orden actual 
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}

