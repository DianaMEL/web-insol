import React, { useState, useEffect } from 'react';
import { useInsoel } from '../Context/InsoelContext';

function FormSeleccionAreas() {
  const { areas, obtenerAreas, getProyectosByArea } = useInsoel();

  useEffect(() => {
    obtenerAreas();
  }, []);

  const [areasSeleccionadas, setAreasSeleccionadas] = useState([]);
  const [proyectosPorArea, setProyectosPorArea] = useState({});
  const [selecciones, setSelecciones] = useState({});
  const [areaIds, setAreaIds] = useState([]);
  const [proyectoIds, setProyectoIds] = useState([]);

  useEffect(() => {
    setAreaIds(Object.keys(selecciones));
    setProyectoIds(Object.values(selecciones));
  }, [selecciones]);

  const handleSeleccion = async (area) => {
    if (areasSeleccionadas.some(a => a._id === area._id)) {
      const nuevasAreas = areasSeleccionadas.filter((a) => a._id !== area._id);
      setAreasSeleccionadas(nuevasAreas);
      const nuevosProyectos = { ...proyectosPorArea };
      delete nuevosProyectos[area._id];
      setProyectosPorArea(nuevosProyectos);
      const nuevasSelecciones = { ...selecciones };
      delete nuevasSelecciones[area._id];
      setSelecciones(nuevasSelecciones);
    } else {
      if (areasSeleccionadas.length === 4) {
        const nuevasAreas = [...areasSeleccionadas];
        const primeraArea = nuevasAreas.shift();
        setAreasSeleccionadas([...nuevasAreas, area]);
        const nuevosProyectos = { ...proyectosPorArea };
        delete nuevosProyectos[primeraArea._id];
        setProyectosPorArea(nuevosProyectos);
        const nuevasSelecciones = { ...selecciones };
        delete nuevasSelecciones[primeraArea._id];
        setSelecciones(nuevasSelecciones);
      } else {
        setAreasSeleccionadas([...areasSeleccionadas, area]);
      }

      const proyectos = await getProyectosByArea(area._id);
      setProyectosPorArea((prevProyectos) => ({
        ...prevProyectos,
        [area._id]: proyectos,
      }));
    }
  };

  const handleSeleccionOpcion = (areaId, proyectoId) => {
    setSelecciones({
      ...selecciones,
      [areaId]: proyectoId,
    });
  };

  const handleGuardarSelecciones = () => {
    const subMenu = {
      "area1" : areaIds[0],
      "area2" : areaIds[1],
      "area3" : areaIds[2],
      "area4" : areaIds[3],
      "enlace1" : proyectoIds[0],
      "enlace2" : proyectoIds[1],
      "enlace3" : proyectoIds[2],
      "enlace4" : proyectoIds[3],
    }
    console.log(subMenu)
  };

  return (
    <div>
      <p>Selecciona hasta cuatro áreas:</p>
      <div className="flex flex-wrap">
        {areas.map((area, index) => (
          <button
            key={index}
            className={`py-2 px-4 m-2 rounded-lg ${
              areasSeleccionadas.some(a => a._id === area._id) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => handleSeleccion(area)}
          >
            {area.area}
          </button>
        ))}
      </div>
      <div>
        <p>Áreas seleccionadas:</p>
        <ul>
          {areasSeleccionadas.map((area, index) => (
            <li key={index} className="flex items-center m-2">
              <span className="mr-2">{area.area}</span>
              <select
                className="ml-2 p-1 border border-gray-400 rounded"
                value={selecciones[area._id] || ''}
                onChange={(e) => handleSeleccionOpcion(area._id, e.target.value)}
              >
                <option value="">Selecciona una opción</option>
                {proyectosPorArea[area._id] &&
                  proyectosPorArea[area._id].map((proyecto, i) => (
                    <option key={i} value={proyecto._id}>
                      {proyecto.titulo}
                    </option>
                  ))}
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
