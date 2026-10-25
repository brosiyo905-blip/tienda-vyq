"use strict";

document.addEventListener("DOMContentLoaded", () => {
    // Cargar datos del Administrador si existen
    const datosGuardados = JSON.parse(localStorage.getItem("vyq_productos"));
    
    if (datosGuardados) {
        const articulosWeb = document.querySelectorAll(".producto");
        articulosWeb.forEach((articulo, idx) => {
            if (datosGuardados[idx]) {
                const pPrecio = articulo.querySelector(".precio");
                const pDisponibilidad = articulo.querySelector(".disponibilidad");
                
                if (pPrecio) pPrecio.textContent = datosGuardados[idx].precio;
                if (pDisponibilidad) pDisponibilidad.textContent = "Disponibilidad: " + datosGuardados[idx].stock;
                
                // Si hay descuento, añadimos una etiqueta visual elegante
                if (datosGuardados[idx].descuento && datosGuardados[idx].descuento.trim() !== "") {
                    let etiquetaDescuento = articulo.querySelector(".etiqueta-descuento");
                    if (!etiquetaDescuento) {
                        etiquetaDescuento = document.createElement("span");
                        etiquetaDescuento.className = "etiqueta-descuento";
                        etiquetaDescuento.style.cssText = "background: var(--dorado); color: var(--negro); padding: 2px 8px; font-size: 0.75rem; font-weight: bold; border-radius: 3px; display: inline-block; margin-bottom: 5px;";
                        articulo.querySelector(".producto-info").prepend(etiquetaDescuento);
                    }
                    etiquetaDescuento.textContent = datosGuardados[idx].descuento;
                }
            }
        });
    }

    // =====================================
    // BÚSQUEDA Y FILTROS
    // =====================================
    const campoBusqueda = document.getElementById("busqueda");
    const filtroCategoria = document.getElementById("filtro-categoria");
    const filtroMarca = document.getElementById("filtro-marca");
    const contadorProductos = document.getElementById("contador-productos");
    const productos = Array.from(document.querySelectorAll(".producto"));

    function normalizarTexto(texto) {
        return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
    }

    function filtrarProductos() {
        const busqueda = normalizarTexto(campoBusqueda ? campoBusqueda.value : "");
        const categoriaSeleccionada = filtroCategoria ? filtroCategoria.value : "todas";
        const marcaSeleccionada = filtroMarca ? filtroMarca.value : "todas";

        let visibles = 0;

        productos.forEach((producto) => {
            const textoProducto = normalizarTexto(producto.textContent);
            const categoria = producto.dataset.categoria;
            const marca = producto.dataset.marca;

            const coincideBusqueda = textoProducto.includes(busqueda);
            const coincideCategoria = categoriaSeleccionada === "todas" || categoria === categoriaSeleccionada;
            const coincideMarca = marcaSeleccionada === "todas" || marca === marcaSeleccionada;

            const mostrar = coincideBusqueda && coincideCategoria && coincideMarca;
            producto.hidden = !mostrar;

            if (mostrar) visibles++;
        });

        if (contadorProductos) {
            if (visibles === 0) {
                contadorProductos.textContent = "No se encontraron productos con esos filtros.";
            } else if (visibles === 1) {
                contadorProductos.textContent = "Se muestra 1 producto.";
            } else {
                contadorProductos.textContent = Se muestran ${visibles} productos.;
            }
        }
    }

    if (campoBusqueda) campoBusqueda.addEventListener("input", filtrarProductos);
    if (filtroCategoria) filtroCategoria.addEventListener("change", filtrarProductos);
    if (filtroMarca) filtroMarca.addEventListener("change", filtrarProductos);

    filtrarProductos();
});
