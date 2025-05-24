
function HistorialIngresos({ ingresos }) {
  return (
    <div>
      <h4>Historial de Ingresos:</h4>
      <ul>
        {ingresos.map(ingreso => (
          <li key={ingreso.id}>
            Monto: ${ingreso.monto}, Fecha: {ingreso.fecha}, Valor Unidad: {ingreso.valorUnidad}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HistorialIngresos;