import { useEffect, useState } from "react";
import { database, ref, push, onValue } from "../firebaseConfig";
import HistorialIngresos from "./HistorialIngresos";

function Main() {
  const [ingreso, setIngreso] = useState("");
  const [fechaIngreso, setFechaIngreso] = useState("");
  const [valorUnidad, setValorUnidad] = useState("");
  const [saldoAcumulado, setSaldoAcumulado] = useState(0);
  const [ingresosRegistrados, setIngresosRegistrados] = useState([]);

  const handleIngresoChange = (event) => {
    setIngreso(event.target.value);
  };

  const handleFechaIngresoChange = (event) => {
    setFechaIngreso(event.target.value);
  };

  const handleValorUnidadChange = (event) => {
    setValorUnidad(event.target.value);
  };

  const guardarIngreso = () => {
    if (ingreso && fechaIngreso && valorUnidad) {
      // Aquí puedes agregar la lógica para guardar el ingreso en tu base de datos
      // Obtiene una referencia al nodo 'ingresos' en tu base de datos
      const ingresosRef = ref(database, "ingresos");
      // Agrega un nuevo registro a la lista de ingresos
      push(ingresosRef, {
        monto: ingreso,
        fecha: fechaIngreso,
        valorUnidad: valorUnidad,
      })
        .then(() => {
          // Opcional: Mostrar un mensaje de éxito o limpiar el formulario
          console.log("Ingreso guardado exitosamente con datos adicionales");
          setIngreso("");
          setFechaIngreso("");
          setValorUnidad("");
        })
        .catch((error) => {
          console.error("Error al guardar el ingreso:", error);
        });
    } else {
      // Opcional: Mostrar un mensaje de error si los campos están vacíos
      alert(
        "Por favor, ingrese un monto y una fecha, el valor de la unidad y el acumulado invertido."
      );
    }
  };

  useEffect(() => {
    const ingresosRef = ref(database, "ingresos");
    // Escucha los cambios en el nodo 'ingresos' de la base de datos
    onValue(ingresosRef, (snapshot) => {
      const data = snapshot.val();
      let totalAcumulado = 0;
      const ingresoArray = [];

      if (data) {
        Object.keys(data).forEach((key) => {
          ingresoArray.push({
            id: key,
            ...data[key],
          });
          totalAcumulado += parseFloat(data[key].monto || 0);
        });
      }
      setIngresosRegistrados(ingresoArray);
      setSaldoAcumulado(totalAcumulado);
    });
    // Limpia la suscripción al desmontar el componente
    return () => {
      // Detach listener? (Según la documentación de Firebase, onValue se desvincula automáticamente cuando el componente se desmonta)
    };
  }, []); // El array vacío significa que este efecto se ejecuta solo una vez al montar el componente

  return (
    <main className="p-7">
      {/* // Registro de ingresos */}
      <h2 className="text-2xl">Ingresos</h2>
      <div>
        <label htmlFor="monto-ingreso">Monto: </label>
        <input
          type="number"
          id="monto-ingreso"
          value={ingreso}
          onChange={handleIngresoChange}
          placeholder="Ingrese el monto"
          className="border-2 border-gray-300 p-2 rounded-md \mt-2 mb-2"
        />
      </div>
      <p className="text-2xl">Valor ingresado: ${ingreso}</p>

      {/* // Registro de fecha de ingreso */}
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

      {/* // Registro del valor de la unidad */}
      <div className="mt-6">
        <label htmlFor="valor-unidad" className="text-2xl">
          Valor de la unidad:{" "}
        </label>
        <input
          type="number"
          id="valor-unidad"
          value={valorUnidad}
          onChange={handleValorUnidadChange}
          placeholder="Ingrese el valor de la unidad"
          className="border-2 border-gray-300 p-2 rounded-md mt-2 mb-2"
        />
      </div>
      <p className="text-2xl">Valor de la unidad: ${valorUnidad}</p>

      {/* // Botón para guardar el ingreso */}
      <button
        className="mt-6 bg-blue-500 text-white p-2 rounded-md"
        onClick={guardarIngreso}
      >
        Guardar Ingreso
      </button>

      <h3 style={{ marginTop: "30px" }}>
        Saldo Acumulado: ${saldoAcumulado.toLocaleString()}
      </h3>

      {/* Opcional: Mostrar la lista de ingresos registrados */}
      <h4>Historial de Ingresos:</h4>
      <ul>
        {ingresosRegistrados.map((ingreso) => (
          <li key={ingreso.id}>
            Monto: ${ingreso.monto}, Fecha: {ingreso.fecha}, Valor Unidad:{" "}
            {ingreso.valorUnidad}
          </li>
        ))}
      </ul>
    </main>
  );
}

export default Main;
