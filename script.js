let materiales = [];
let manoDeObra = [];
let gastosIndirectos = [];

function agregarMaterial() {
    const listaMateriales = document.getElementById('listaMateriales');
    const cantidadMaterial = document.getElementById('cantidadMaterial');
    const precioUnitarioMaterial = document.getElementById('precioUnitarioMaterial');

    // Validar que los campos obligatorios estén llenos
    if (!listaMateriales.value.trim()) {
        alert('Debe seleccionar un material de la lista');
        return;
    }

    if (!cantidadMaterial.value.trim()) {
        alert('Debe ingresar la cantidad del material.');
        return;
    }

    if (!precioUnitarioMaterial.value.trim()) {
        alert('Debe ingresar el precio unitario del material.');
        return;
    }

    // Convertir valores y calcular el valor total
    const nombre = listaMateriales.value.trim();
    const cantidad = parseFloat(cantidadMaterial.value);
    const precioUnitario = parseFloat(precioUnitarioMaterial.value);
    const valorTotal = cantidad * precioUnitario;

    // Agregar el material a la lista
    materiales.push({ nombre, cantidad, precioUnitario, valorTotal });

    // Actualizar la tabla y calcular totales
    actualizarTabla('tablaMateriales', materiales);
    calcularTotales();

    // Limpiar campos después de agregar
    listaMateriales.value = '';
    cantidadMaterial.value = '';
    precioUnitarioMaterial.value = '';
}



function agregarManoDeObra() {
    const nombreEmpleado = document.getElementById('nombreEmpleado');
    const horasTrabajadas = document.getElementById('horasTrabajadas');
    const precioPorHora = document.getElementById('precioPorHora');

    // Validar que los campos obligatorios estén llenos
    if (!nombreEmpleado.value.trim()) {
        alert('Debe ingresar el nombre del empleado.');
        return;
    }

    if (!horasTrabajadas.value.trim()) {
        alert('Debe ingresar las horas trabajadas por el empleado.');
        return;
    }

    if (!precioPorHora.value.trim()) {
        alert('Debe ingresar el precio por hora del empleado.');
        return;
    }

    // Convertir valores y calcular el valor total
    const nombre = nombreEmpleado.value.trim();
    const horas = parseFloat(horasTrabajadas.value);
    const precio = parseFloat(precioPorHora.value);
    const valorTotal = horas * precio;

    // Agregar la mano de obra a la lista
    manoDeObra.push({ nombre, horasTrabajadas: horas, precioPorHora: precio, valorTotal });

    // Actualizar la tabla y calcular totales
    actualizarTabla('tablaManoDeObra', manoDeObra);
    calcularTotales();

    // Limpiar campos después de agregar
    nombreEmpleado.value = '';
    horasTrabajadas.value = '';
    precioPorHora.value = '';
}


function agregarGastoIndirecto() {
    const nombreGasto = document.getElementById('listaGasto');
    const cantidadHorasGasto = document.getElementById('cantidadHorasGasto');
    const precioUnitarioGasto = document.getElementById('precioUnitarioGasto');

    // Validar que los campos obligatorios estén llenos
    if (!nombreGasto.value.trim()) {
        alert('Debe ingresar el nombre del gasto.');
        return;
    }

    if (!cantidadHorasGasto.value.trim()) {
        alert('Debe ingresar la cantidad de horas del gasto.');
        return;
    }

    if (!precioUnitarioGasto.value.trim()) {
        alert('Debe ingresar el precio unitario del gasto.');
        return;
    }

    // Convertir valores y calcular el valor total
    const nombre = nombreGasto.value.trim();
    const cantidadHoras = parseFloat(cantidadHorasGasto.value);
    const precioUnitario = parseFloat(precioUnitarioGasto.value);
    const valorTotal = cantidadHoras * precioUnitario;

    // Agregar el gasto indirecto a la lista
    gastosIndirectos.push({ nombre, cantidadHoras, precioUnitario, valorTotal });

    // Actualizar la tabla y calcular totales
    actualizarTabla('tablaGastosIndirectos', gastosIndirectos);
    calcularTotales();

    // Limpiar campos después de agregar
    nombreGasto.value = '';
    cantidadHorasGasto.value = '';
    precioUnitarioGasto.value = '';
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

    document.getElementById('totalMateriales').textContent = `Total Materiales: S/${totalMateriales.toFixed(2)}`;
    document.getElementById('totalManoDeObra').textContent = `Total Mano de Obra: S/${totalManoDeObra.toFixed(2)}`;
    document.getElementById('totalGastosIndirectos').textContent = `Total Gastos Indirectos: S/${totalGastosIndirectos.toFixed(2)}`;
}

function calcularCostoTotal() {
    const totalMateriales = materiales.reduce((total, item) => total + item.valorTotal, 0);
    const totalManoDeObra = manoDeObra.reduce((total, item) => total + item.valorTotal, 0);
    const totalGastosIndirectos = gastosIndirectos.reduce((total, item) => total + item.valorTotal, 0);

    const costoTotalProduccion = totalMateriales + totalManoDeObra + totalGastosIndirectos;
    const cantidadProducir = parseFloat(document.getElementById('cantidadProducir').value);

    document.getElementById('costoTotalProduccion').textContent = `Total Costo Producción: S/${costoTotalProduccion.toFixed(2)}`;
    document.getElementById('cantidadProducida').textContent = `Cantidad Producida: ${cantidadProducir}`;
}


// Ejecutar la función al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    manejarSeleccion();
});
