<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $materiales = $_POST['materiales'];
    $manoDeObra = $_POST['manoDeObra'];
    $gastosIndirectos = $_POST['gastosIndirectos'];

    $costoMateriales = 0;
    foreach ($materiales as $material) {
        $costoMateriales += $material['cantidad'] * $material['precioUnitario'];
    }

    $costoManoDeObra = 0;
    foreach ($manoDeObra as $mano) {
        $costoManoDeObra += $mano['horasTrabajadas'] * $mano['precioPorHora'];
    }

    $costoGastosIndirectos = 0;
    foreach ($gastosIndirectos as $gasto) {
        $costoGastosIndirectos += $gasto['cantidadHoras'] * $gasto['precioUnitario'];
    }

    $costoTotalProduccion = $costoMateriales + $costoManoDeObra + $costoGastosIndirectos;

    echo json_encode(["costoTotalProduccion" => $costoTotalProduccion]);
}
?>
