"use strict";

document.addEventListener("DOMContentLoaded", () => {
    // Definimos la estructura base de los productos de TIENDA VYQ
    const productosBase = [
        { id: "mitica", nombre: "Mítica", precio: "Precio: Bs. 180", stock: "Disponible", descuento: "" },
        { id: "mitica-elixir", nombre: "Mítica Elixir", precio: "Precio: Bs. 220", stock: "Próximamente", descuento: "10% OFF" },
        { id: "desodorante", nombre: "Desodorante roll-on", precio: "Precio: Bs. 35", stock: "Disponible", descuento: "" },
        { id: "chompas", nombre: "Chompas y cárdigans", precio: "Precio: Bs. 150", stock: "Disponible", descuento: "" },
        { id: "sudaderas", nombre: "Sudaderas y suéteres", precio: "Precio: Bs. 130", stock: "Disponible", descuento: "Oferta" },
        { id: "polar", nombre: "Chompas polares y chalecos", precio: "Precio: Bs. 140", stock: "Disponible", descuento: "" },
        { id: "finart", nombre: "Joyas Finart", precio: "Precio: Bs. 90", stock: "Disponible", descuento: "" },
        { id: "collares", nombre: "Collares y chokers", precio: "Precio: Bs. 60", stock: "Disponible", descuento: "" },
        { id: "aretes", nombre: "Aretes", precio: "Precio: Bs. 45", stock: "Disponible", descuento: "" }
    ];

    // Cargar datos guardados previamente o usar los base
    let datosActuales = JSON.parse(localStorage.getItem("vyq_productos")) || productosBase;
    const contenedor = document.getElementById("lista-admin-productos");

    function renderizarFormularioAdmin() {
        contenedor.innerHTML = "";
        datosActuales.forEach((prod, index) => {
            const div = document.createElement("div");
            div.className = "admin-producto";
            div.innerHTML = `
                <h3>${prod.nombre}</h3>
                <div>
                    <label>Precio:</label>
                    <input type="text" data-index="${index}" data-campo="precio" value="${prod.precio}">
                </div>
                <div>
                    <label>Disponibilidad / Estado:</label>
                    <input type="text" data-index="${index}" data-campo="stock" value="${prod.stock}">
                </div>
                <div>
                    <label>Descuento / Aviso especial:</label>
                    <input type="text" data-index="${index}" data-campo="descuento" value="${prod.descuento}" placeholder="Ej. 15% OFF o vacío">
                </div>
            `;
            contenedor.appendChild(div);
        });
    }

    renderizarFormularioAdmin();

    // Guardar cambios
    document.getElementById("btn-guardar-todo").addEventListener("click", () => {
        const inputs = contenedor.querySelectorAll("input");
        inputs.forEach(input => {
            const index = input.getAttribute("data-index");
            const campo = input.getAttribute("data-campo");
            datosActuales[index][campo] = input.value;
        });

        localStorage.setItem("vyq_productos", JSON.stringify(datosActuales));
        
        const mensaje = document.getElementById("mensaje-exito");
        mensaje.style.display = "block";
        setTimeout(() => {
            mensaje.style.display = "none";
        }, 2500);
    });
});
