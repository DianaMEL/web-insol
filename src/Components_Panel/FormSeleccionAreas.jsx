import React, { useState } from 'react';

function FormSeleccionAreas() {
  // Lista de todas las áreas disponibles
  const areasDisponibles = ['Área 1', 'Área 2', 'Área 3', 'Área 4', 'Área 5', 'Área 6', 'Área 7', 'Área 8'];

  // Estado para almacenar las áreas seleccionadas y las opciones seleccionadas para cada área
  const [areasSeleccionadas, setAreasSeleccionadas] = useState([]);
  const [opcionesPorArea, setOpcionesPorArea] = useState({});

  // Función para manejar el cambio en la selección de áreas
  const handleSeleccion = (area) => {
    // Si el área ya está seleccionada, la deseleccionamos
    if (areasSeleccionadas.includes(area)) {
      const nuevasAreas = areasSeleccionadas.filter((a) => a !== area);
      setAreasSeleccionadas(nuevasAreas);
      // También eliminamos las opciones seleccionadas para esa área
      const nuevasOpciones = { ...opcionesPorArea };
      delete nuevasOpciones[area];
      setOpcionesPorArea(nuevasOpciones);
    } else {
      // Si el área no está seleccionada y ya hay 4 selecciones, reemplazamos la primera selección con la nueva
      if (areasSeleccionadas.length === 4) {
        const nuevasAreas = [...areasSeleccionadas];
        nuevasAreas.shift(); // Eliminamos la primera selección
        nuevasAreas.push(area); // Agregamos la nueva selección al final
        setAreasSeleccionadas(nuevasAreas);
      } else {
        // Si hay menos de 4 selecciones, simplemente agregamos la nueva selección
        setAreasSeleccionadas([...areasSeleccionadas, area]);
      }
    }
  };

  // Función para manejar el cambio en la selección de opciones
  const handleSeleccionOpcion = (area, opcion) => {
    setOpcionesPorArea({
      ...opcionesPorArea,
      [area]: opcion,
    });
  };

  // Función para manejar el guardado de las selecciones
  const handleGuardarSelecciones = () => {
    console.log('Áreas seleccionadas:', areasSeleccionadas);
    console.log('Opciones por área:', opcionesPorArea);
    // Aquí puedes agregar la lógica para guardar las selecciones en tu aplicación
  };

  return (
    <div>
      <p>Selecciona hasta cuatro áreas:</p>
      <div className="flex flex-wrap">
        {areasDisponibles.map((area, index) => (
          <button
            key={index}
            className={`py-2 px-4 m-2 rounded-lg ${
              areasSeleccionadas.includes(area) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => handleSeleccion(area)}
          >
            {area}
          </button>
        ))}
      </div>
      <div>
        <p>Áreas seleccionadas:</p>
        <ul>
          {areasSeleccionadas.map((area, index) => (
            <li key={index} className="flex items-center m-2">
              <span className="mr-2">{area}</span>
              <select
                className="ml-2 p-1 border border-gray-400 rounded"
                value={opcionesPorArea[area] || ''}
                onChange={(e) => handleSeleccionOpcion(area, e.target.value)}
              >
                <option value="">Selecciona una opción</option>
                <option value="Opción 1">Opción 1</option>
                <option value="Opción 2">Opción 2</option>
                <option value="Opción 3">Opción 3</option>
              </select>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={handleGuardarSelecciones} className="bg-green-500 text-white px-4 py-2 rounded mt-4">
        Guardar selecciones
      </button>
    </div>
  );
}

export default FormSeleccionAreas;

