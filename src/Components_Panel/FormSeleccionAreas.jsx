import React, { useState, useEffect } from 'react';
import { useInsoel } from '../Context/InsoelContext';
import { IoCheckmarkOutline } from "react-icons/io5";

function FormSeleccionAreas({ reloadSubMenu, toast }) {
  const {
    areas,
    obtenerAreas,
    getProyectosByArea,
    updateSubMenu,
    obtenerSubMenu,
    idSubMenu,
  } = useInsoel();

  useEffect(() => {
    obtenerAreas();
    obtenerSubMenu();
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
    if (areasSeleccionadas.some((a) => a._id === area._id)) {
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

  const handleGuardarSelecciones = async () => {
    const subMenu = {
      area1: areaIds[0],
      area2: areaIds[1],
      area3: areaIds[2],
      area4: areaIds[3],
      enlace1: proyectoIds[0],
      enlace2: proyectoIds[1],
      enlace3: proyectoIds[2],
      enlace4: proyectoIds[3],
    };
    await toast.promise(updateSubMenu(idSubMenu, subMenu), {
      pending: "Actualizando Sub Menu",
      success: "Sub Menu actualizado con Éxito",
      error: "Error al actualizar el sub menu",
    });
    reloadSubMenu()
  };

  return (
    <div className="ml-10 mr-10 mt-10">
    <p className="text-xl font-semibold mb-6 mt-16">Selecciona hasta cuatro áreas:</p>
    <div className="flex flex-wrap gap-2">
        {areas.map((area, index) => (
          <button
            key={index}
            className={`flex items-center py-2 px-4 m-2 rounded-lg shadow transition-transform transform hover:scale-105 ${
              areasSeleccionadas.some(a => a._id === area._id)
                ? 'bg-secondary text-white border-2 border-secondary-dark'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            } transition-colors duration-300`}
            onClick={() => handleSeleccion(area)}
            title={area.descripcion} 
          >
            {areasSeleccionadas.some(a => a._id === area._id) && (
              <IoCheckmarkOutline className='text-primary mr-2 text-xl'/>
            )}
            {area.area}
          </button>
        ))}
     
      </div>
      <div className="mt-8">
        <p className="text-lg font-semibold mb-2">Áreas seleccionadas:</p>
        <ul className="border border-gray-500 rounded-lg p-4 bg-gray-50">
          {areasSeleccionadas.map((area, index) => (
            <li key={index} className="flex items-center justify-between mb-2 p-2 bg-white rounded shadow">
              <span className="mr-2">{area.area}</span>
              <select
                className="w-1/2 ml-2 p-1 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-secondary"
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
      <button
        onClick={handleGuardarSelecciones}
        className="bg-tertiary text-white px-4 py-2 rounded mt-4 shadow hover:bg-darkPrimary transition-colors duration-300"
      >
        Guardar selecciones
      </button>
    </div>
  );
}

export default FormSeleccionAreas;
