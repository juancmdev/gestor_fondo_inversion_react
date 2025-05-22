import { useState } from "react";

function Main() {

  const [ingreso, setIngreso] = useState('');
  const [fechaIngreso, setFechaIngreso] = useState('');

  const handleIngresoChange = (event) => {
    setIngreso(event.target.value);
  };

   const handleFechaIngresoChange = (event) => {
    setFechaIngreso(event.target.value);
  };

  return (
    <main className="p-7">
      <h2 className="text-2xl">Ingresos</h2>
      <input
        type="number"
        value={ingreso}
        onChange={handleIngresoChange}
        placeholder="Ingrese el monto"
        className="border-2 border-gray-300 p-2 rounded-md mt-2 mb-2"
      />
        <p className="text-2xl">Valor ingresado: ${ingreso}</p> {/* Para visualizar el valor */}

      <div style={{ marginTop: '30px' }}>
        <label htmlFor="fecha-ingreso" className="text-2xl">Fecha: </label>
        <input
          type="date"
          id="fecha-ingreso"
          value={fechaIngreso}
          onChange={handleFechaIngresoChange}
          className="border-2 border-gray-300 p-2 rounded-md mt-2 mb-2"
        />
      </div>
      <p className="text-2xl">Fecha de ingreso: {fechaIngreso}</p>
    </main>
  );
}

export default Main;