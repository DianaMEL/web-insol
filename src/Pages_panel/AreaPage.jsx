import React, { useEffect, useState } from "react";

import Automa from "../img/Noticias/automatizacion.jpg";
import ListArea from "../Components_Panel/ListArea";
import FormArea from "../Components_Panel/FormArea";
import { getAreasRequest } from "../api/area";
import { useInsoel } from "../Context/InsoelContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AreaPage() {
  
  const [areas, setAreas] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [recargar, setRecargar] = useState(false);

  const obtenerAreas = async () => {
    try {
      const areas = await getAreasRequest();
      setAreas(areas.data);
    } catch (error) {
      console.error("Error al obtener las Areas", error);
    }
  };

  useEffect(() => {
    obtenerAreas();
    setRecargar(false);
  }, [recargar]);

  const handleReloadArea = () => {
    console.log("cargando Areas nuevamente");
    obtenerAreas();
    setRecargar(true);
    setMostrarFormulario(false);
  };

  const handleClickNuevoProyecto = () => {
    setMostrarFormulario(true);
  };

  return (
    <div className="container mx-auto px-4 py-8 ">
      <div className="flex justify-between items-center ">
        {!mostrarFormulario && (
          <h1 className="mt-10 text-3xl font-bold ml-5">Areas</h1>
        )}
        {mostrarFormulario ? (
          <div className="">
            // Mostrar el formulario cuando mostrarFormulario es true
            <FormArea reloadArea={handleReloadArea} toast={toast} />
          </div>
        ) : (
          // Mostrar el botón "Nuevo Proyecto" cuando mostrarFormulario es false
          /* onClick={handleClickNuevoProyecto} */
          <button
            onClick={handleClickNuevoProyecto}
            className="mt-14 bg-tertiary hover:bg-secondary text-white py-2 px-4 rounded-md"
          >
            Nueva Area
          </button>
        )}
      </div>

      <ToastContainer />

      {!mostrarFormulario && (
        <div>
          <ListArea areas={areas} reloadarea={handleReloadArea} toast={toast} />
        </div>
      )}
    </div>
  );
}

export default AreaPage;
