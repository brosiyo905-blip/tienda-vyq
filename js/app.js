"use strict";

// =====================================
// TIENDA VYQ - BÚSQUEDA Y FILTROS
// =====================================

const campoBusqueda = document.getElementById("busqueda");
const filtroCategoria = document.getElementById("filtro-categoria");
const filtroMarca = document.getElementById("filtro-marca");
const contadorProductos = document.getElementById("contador-productos");

const productos = Array.from(
    document.querySelectorAll(".producto")
);

function normalizarTexto(texto) {
    return texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
}

function filtrarProductos() {
    const busqueda = normalizarTexto(campoBusqueda.value);
    const categoriaSeleccionada = filtroCategoria.value;
    const marcaSeleccionada = filtroMarca.value;

    let visibles = 0;

    productos.forEach((producto) => {
        const textoProducto = normalizarTexto(producto.textContent);
        const categoria = producto.dataset.categoria;
        const marca = producto.dataset.marca;

        const coincideBusqueda = textoProducto.includes(busqueda);

        const coincideCategoria =
            categoriaSeleccionada === "todas" ||
            categoria === categoriaSeleccionada;

        const coincideMarca =
            marcaSeleccionada === "todas" ||
            marca === marcaSeleccionada;

        const mostrar =
            coincideBusqueda &&
            coincideCategoria &&
            coincideMarca;

        producto.hidden = !mostrar;

        if (mostrar) {
            visibles++;
        }
    });

    contadorProductos.textContent =
        visibles === 1
            ? "Se muestra 1 producto."
            : Se muestran ${visibles} productos.;
}

campoBusqueda.addEventListener("input", filtrarProductos);
filtroCategoria.addEventListener("change", filtrarProductos);
filtroMarca.addEventListener("change", filtrarProductos);

filtrarProductos();
