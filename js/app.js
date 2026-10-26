"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const campoBusqueda = document.getElementById("busqueda");
    const filtroCategoria = document.getElementById("filtro-categoria");
    const filtroMarca = document.getElementById("filtro-marca");
    const contadorProductos = document.getElementById("contador-productos");
    const productos = document.querySelectorAll(".producto");

    function filtrarCatalogo() {
        const textoBusqueda = campoBusqueda ? campoBusqueda.value.toLowerCase().trim() : "";
        const catSeleccionada = filtroCategoria ? filtroCategoria.value : "todas";
        const marcaSeleccionada = filtroMarca ? filtroMarca.value : "todas";

        let visibles = 0;

        productos.forEach((producto) => {
            const contenido = producto.textContent.toLowerCase();
            const categoria = producto.getAttribute("data-categoria");
            const marca = producto.getAttribute("data-marca");

            const coincideTexto = contenido.includes(textoBusqueda);
            const coincideCat = catSeleccionada === "todas" || categoria === catSeleccionada;
            const coincideMarca = marcaSeleccionada === "todas" || marca === marcaSeleccionada;

            if (coincideTexto && coincideCat && coincideMarca) {
                producto.style.display = "block";
                visibles++;
            } else {
                producto.style.display = "none";
            }
        });

        if (contadorProductos) {
            contadorProductos.textContent = Se muestran ${visibles} productos.;
        }
    }

    if (campoBusqueda) campoBusqueda.addEventListener("input", filtrarCatalogo);
    if (filtroCategoria) filtroCategoria.addEventListener("change", filtrarCatalogo);
    if (filtroMarca) filtroMarca.addEventListener("change", filtrarCatalogo);

    filtrarCatalogo();

    // Carrito interactivo
    let carrito = [];
    const botonesComprar = document.querySelectorAll(".btn-comprar");
    const contadorCarrito = document.getElementById("contador-carrito");
    const btnVerCarrito = document.getElementById("btn-ver-carrito");

    botonesComprar.forEach((boton) => {
        boton.style.cursor = "pointer";
        boton.addEventListener("click", (e) => {
            const tarjeta = e.target.closest(".producto");
            const nombre = tarjeta.querySelector("h3").textContent;
            const precio = tarjeta.querySelector(".precio").textContent;

            carrito.push({ nombre, precio });
            
            if (contadorCarrito) {
                contadorCarrito.textContent = carrito.length;
            }

            alert(¡"${nombre}" fue agregado al carrito con éxito!);
        });
    });

    if (btnVerCarrito) {
        btnVerCarrito.addEventListener("click", () => {
            if (carrito.length === 0) {
                alert("Tu carrito de compras está vacío.");
            } else {
                let mensaje = "--- RESUMEN DE COMPRAS TIENDA VYQ ---\n\n";
                carrito.forEach((item, i) => {
                    mensaje += ${i + 1}. ${item.nombre} - ${item.precio}\n;
                });
                mensaje += \nTotal de productos en carrito: ${carrito.length};
                alert(mensaje);
            }
        });
    }
