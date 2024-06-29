<?php
require('fpdf.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $materiales = json_decode($_POST['materiales'], true);
    $manoDeObra = json_decode($_POST['manoDeObra'], true);
    $gastosIndirectos = json_decode($_POST['gastosIndirectos'], true);

    // Verificar si la decodificación fue exitosa
    if (json_last_error() !== JSON_ERROR_NONE) {
        die('Error en la decodificación de JSON: ' . json_last_error_msg());
    }

    // Inicializar variables de costo
    $costoMateriales = 0;
    $costoManoDeObra = 0;
    $costoGastosIndirectos = 0;

    // Verificar si los arrays no son nulos y calcular los costos
    if (is_array($materiales)) {
        foreach ($materiales as $material) {
            $costoMateriales += $material['cantidad'] * $material['precioUnitario'];
        }
    }

    if (is_array($manoDeObra)) {
        foreach ($manoDeObra as $mano) {
            $costoManoDeObra += $mano['horasTrabajadas'] * $mano['precioPorHora'];
        }
    }

    if (is_array($gastosIndirectos)) {
        foreach ($gastosIndirectos as $gasto) {
            $costoGastosIndirectos += $gasto['cantidadHoras'] * $gasto['precioUnitario'];
        }
    }

    $costoTotalProduccion = $costoMateriales + $costoManoDeObra + $costoGastosIndirectos;

    // Creación del PDF con orientación horizontal
    $pdf = new FPDF('L', 'mm', 'A4');
    $pdf->AddPage();
    $pdf->SetFont('Arial', '', 12);

    // Título
    $pdf->Cell(0, 10, 'Cristales S.A.', 0, 1, 'C');
    $pdf->Cell(0, 10, 'ORDEN DE PRODUCCION', 0, 1, 'C');
    $pdf->Ln(5);

    // Información general
    $pdf->Cell(80, 7, 'Fecha de Expedicion: ' . $_POST['fechaExpedicion']);
    $pdf->Cell(80, 7, 'Departamento/Area: ' . $_POST['departamento']);
    $pdf->Cell(0, 7, 'Nº: ' . $_POST['numeroDocumento'], 0, 1);
    $pdf->Ln(5);

    // Información del artículo
    $pdf->Cell(80, 7, 'Nombre Articulo: ' . $_POST['nombreArticulo']);
    $pdf->Cell(80, 7, 'Cantidad Iniciada: ' . $_POST['cantidadIniciada']);
    $pdf->Cell(0, 7, 'Cantidad Terminada: ' . $_POST['cantidadTerminada'], 0, 1);
    $pdf->Cell(80, 7, 'Cantidad a Producir: ' . $_POST['cantidadProducir']);
    $pdf->Cell(80, 7, 'Referencia Articulo: ' . $_POST['referenciaArticulo']);
    $pdf->Cell(0, 7, 'Fecha Ingreso Bodega: ' . $_POST['fechaIngresoBodega'], 0, 1);
    $pdf->Cell(80, 7, 'Unidad Medida: ' . $_POST['unidadMedida']);
    $pdf->MultiCell(0, 7, 'Especificaciones: ' . $_POST['especificaciones']);
    $pdf->Ln(5);

    // Materiales
    if (is_array($materiales)) {
        $pdf->Cell(0, 7, 'Materiales', 0, 1);
        $pdf->SetFont('Arial', 'B', 12);
        $pdf->Cell(40, 7, 'Nombre', 1, 0, 'C');
        $pdf->Cell(30, 7, 'Cantidad', 1, 0, 'C');
        $pdf->Cell(40, 7, 'Precio Unitario', 1, 0, 'C');
        $pdf->Cell(40, 7, 'Valor Total', 1, 1, 'C');
        $pdf->SetFont('Arial', '', 12);
        foreach ($materiales as $material) {
            $pdf->Cell(40, 7, $material['nombre'], 1, 0);
            $pdf->Cell(30, 7, $material['cantidad'], 1, 0, 'C');
            $pdf->Cell(40, 7, '$' . $material['precioUnitario'], 1, 0, 'R');
            $pdf->Cell(40, 7, '$' . $material['valorTotal'], 1, 1, 'R');
        }
        $pdf->Cell(0, 7, 'Total Materiales: $' . number_format($costoMateriales, 2), 0, 1);
        $pdf->Ln(5);
    }

    // Mano de Obra
    if (is_array($manoDeObra)) {
        $pdf->Cell(0, 7, 'Mano de Obra', 0, 1);
        $pdf->SetFont('Arial', 'B', 12);
        $pdf->Cell(40, 7, 'Nombre', 1, 0, 'C');
        $pdf->Cell(30, 7, 'Horas Trabajadas', 1, 0, 'C');
        $pdf->Cell(40, 7, 'Precio por Hora', 1, 0, 'C');
        $pdf->Cell(40, 7, 'Valor Total', 1, 1, 'C');
        $pdf->SetFont('Arial', '', 12);
        foreach ($manoDeObra as $mano) {
            $pdf->Cell(40, 7, $mano['nombre'], 1, 0);
            $pdf->Cell(30, 7, $mano['horasTrabajadas'], 1, 0, 'C');
            $pdf->Cell(40, 7, '$' . $mano['precioPorHora'], 1, 0, 'R');
            $pdf->Cell(40, 7, '$' . $mano['valorTotal'], 1, 1, 'R');
        }
        $pdf->Cell(0, 7, 'Total Mano de Obra: $' . number_format($costoManoDeObra, 2), 0, 1);
        $pdf->Ln(5);
    }

    // Gastos Indirectos
    if (is_array($gastosIndirectos)) {
        $pdf->Cell(0, 7, 'Gastos Indirectos', 0, 1);
        $pdf->SetFont('Arial', 'B', 12);
        $pdf->Cell(40, 7, 'Nombre', 1, 0, 'C');
        $pdf->Cell(30, 7, 'Cantidad Horas', 1, 0, 'C');
        $pdf->Cell(40, 7, 'Precio Unitario', 1, 0, 'C');
        $pdf->Cell(40, 7, 'Valor Total', 1, 1, 'C');
        $pdf->SetFont('Arial', '', 12);
        foreach ($gastosIndirectos as $gasto) {
            $pdf->Cell(40, 7, $gasto['nombre'], 1, 0);
            $pdf->Cell(30, 7, $gasto['cantidadHoras'], 1, 0, 'C');
            $pdf->Cell(40, 7, '$' . $gasto['precioUnitario'], 1, 0, 'R');
            $pdf->Cell(40, 7, '$' . $gasto['valorTotal'], 1, 1, 'R');
        }
        $pdf->Cell(0, 7, 'Total Gastos Indirectos: $' . number_format($costoGastosIndirectos, 2), 0, 1);
        $pdf->Ln(5);
    }

    // Costo Total Producción
    $pdf->SetFont('Arial', 'B', 16);
    $pdf->Cell(0, 7, 'Total Costo Produccion: $' . number_format($costoTotalProduccion, 2), 0, 1);
    $pdf->Ln(10);

    // Observaciones
    $pdf->SetFont('Arial', 'B', 14);
    $pdf->Cell(0, 7, 'Observaciones Generales', 0, 1);
    $pdf->SetFont('Arial', '', 12);
    $pdf->MultiCell(0, 7, $_POST['observaciones']);

    // Salida del PDF
    $pdf->Output('D', 'orden_produccion.pdf');
}
?>
