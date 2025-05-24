import { useState } from "react";
import { database, ref, push } from "./firebaseConfig";

function Main() {
  const [ingreso, setIngreso] = useState("");
  const [fechaIngreso, setFechaIngreso] = useState("");

  const handleIngresoChange = (event) => {
    setIngreso(event.target.value);
  };

  const handleFechaIngresoChange = (event) => {
    setFechaIngreso(event.target.value);
  };

  const guardarIngreso = () => {
    if (ingreso && fechaIngreso) {
      // Obtiene una referencia al nodo 'ingresos' en tu base de datos
      const ingresosRef = ref(database, "ingresos");
      // Agrega un nuevo registro a la lista de ingresos
      push(ingresosRef, {
        monto: ingreso,
        fecha: fechaIngreso,
      })
        .then(() => {
          // Opcional: Mostrar un mensaje de éxito o limpiar el formulario
          console.log("Ingreso guardado exitosamente");
          setIngreso("");
          setFechaIngreso("");
        })
        .catch((error) => {
          console.error("Error al guardar el ingreso:", error);
        });
    } else {
      // Opcional: Mostrar un mensaje de error si los campos están vacíos
      alert("Por favor, ingrese un monto y una fecha.");
    }
  };

  return (
    <main className="p-7">
      <h2 className="text-2xl">Ingresos</h2>
      <div>
        <label htmlFor="monto-ingreso">Monto: </label>
        <input
          type="number"
          id="monto-ingreso"
          value={ingreso}
          onChange={handleIngresoChange}
          placeholder="Ingrese el monto"
          className="border-2 border-gray-300 p-2 rounded-md mt-2 mb-2"
        />
      </div>
      <p className="text-2xl">Valor ingresado: ${ingreso}</p>{" "}
      {/* Para visualizar el valor */}
      <div className="mt-6">
        <label htmlFor="fecha-ingreso" className="text-2xl">
          Fecha:{" "}
        </label>
        <input
          type="date"
          id="fecha-ingreso"
          value={fechaIngreso}
          onChange={handleFechaIngresoChange}
          className="border-2 border-gray-300 p-2 rounded-md mt-2 mb-2"
        />
      </div>
      <p className="text-2xl">Fecha de ingreso: {fechaIngreso}</p>
      <button
        className="mt-6 bg-blue-500 text-white p-2 rounded-md"
        onClick={guardarIngreso}
      >
        Guardar Ingreso
      </button>
    </main>
  );
}

export default Main;
