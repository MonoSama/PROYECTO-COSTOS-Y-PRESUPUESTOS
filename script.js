let materiales = [];
let manoDeObra = [];
let gastosIndirectos = [];



function agregarMaterial() {
    const nombre = document.getElementById('nombreMaterial').value;
    const cantidad = parseFloat(document.getElementById('cantidadMaterial').value);
    const precioUnitario = parseFloat(document.getElementById('precioUnitarioMaterial').value);
    const valorTotal = cantidad * precioUnitario;

    materiales.push({ nombre, cantidad, precioUnitario, valorTotal });
    actualizarTabla('tablaMateriales', materiales);
    calcularTotales();
}

function agregarManoDeObra() {
    const nombre = document.getElementById('nombreEmpleado').value;
    const horasTrabajadas = parseFloat(document.getElementById('horasTrabajadas').value);
    const precioPorHora = parseFloat(document.getElementById('precioPorHora').value);
    const valorTotal = horasTrabajadas * precioPorHora;

    manoDeObra.push({ nombre, horasTrabajadas, precioPorHora, valorTotal });
    actualizarTabla('tablaManoDeObra', manoDeObra);
    calcularTotales();
}

function agregarGastoIndirecto() {
    const nombre = document.getElementById('nombreGasto').value;
    const cantidadHoras = parseFloat(document.getElementById('cantidadHorasGasto').value);
    const precioUnitario = parseFloat(document.getElementById('precioUnitarioGasto').value);
    const valorTotal = cantidadHoras * precioUnitario;

    gastosIndirectos.push({ nombre, cantidadHoras, precioUnitario, valorTotal });
    actualizarTabla('tablaGastosIndirectos', gastosIndirectos);
    calcularTotales();
}

function actualizarTabla(idTabla, items) {
    const tabla = document.getElementById(idTabla).getElementsByTagName('tbody')[0];
    tabla.innerHTML = '';

    items.forEach(item => {
        const row = tabla.insertRow();
        Object.values(item).forEach(text => {
            const cell = row.insertCell();
            cell.textContent = text;
        });
    });
}

function calcularTotales() {
    const totalMateriales = materiales.reduce((total, item) => total + item.valorTotal, 0);
    const totalManoDeObra = manoDeObra.reduce((total, item) => total + item.valorTotal, 0);
    const totalGastosIndirectos = gastosIndirectos.reduce((total, item) => total + item.valorTotal, 0);

    document.getElementById('totalMateriales').textContent = `Total Materiales: $${totalMateriales.toFixed(2)}`;
    document.getElementById('totalManoDeObra').textContent = `Total Mano de Obra: $${totalManoDeObra.toFixed(2)}`;
    document.getElementById('totalGastosIndirectos').textContent = `Total Gastos Indirectos: $${totalGastosIndirectos.toFixed(2)}`;
}

function calcularCostoTotal() {
    const totalMateriales = materiales.reduce((total, item) => total + item.valorTotal, 0);
    const totalManoDeObra = manoDeObra.reduce((total, item) => total + item.valorTotal, 0);
    const totalGastosIndirectos = gastosIndirectos.reduce((total, item) => total + item.valorTotal, 0);

    const costoTotalProduccion = totalMateriales + totalManoDeObra + totalGastosIndirectos;
    const cantidadProducir = parseFloat(document.getElementById('cantidadProducir').value);

    document.getElementById('costoTotalProduccion').textContent = `Total Costo Producción: $${costoTotalProduccion.toFixed(2)}`;
    document.getElementById('cantidadProducida').textContent = `Cantidad Producida: ${cantidadProducir}`;
}
