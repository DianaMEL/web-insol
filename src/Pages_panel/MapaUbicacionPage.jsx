import React, { useState, useEffect } from "react";
import FormUbicacion from "../Components_Panel/FormUbicacion";
import ListMapaUbicacion from "../Components_Panel/ListMapaUbicacion";
import Paginador from "../Components_Panel/Paginador";
import { getUbicacionesRequest } from "../api/ubicaciones";
import { RiSearchLine } from 'react-icons/ri';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MapaUbicacionPage() {
  const [ubicaciones, setUbicaciones] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [filtroNombre, setFiltroNombre] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [recargar, setRecargar] = useState(false)
  const [ubicacionToUpdate, setUbicacionToUpdate] = useState(null); 

  const obtenerUbicaciones = async () => {
    try {
      const ubicaciones = await getUbicacionesRequest();
      setUbicaciones(ubicaciones.data);
    } catch (error) {
      console.error("Error al obtener las Ubicaciones", error);
    }
  };
/*
  useEffect(() => {
    obtenerUbicaciones();
    setRecargar(false);
  }, [recargar]);*/
  useEffect(() => {
    const fetchData = async () => {
      await obtenerUbicaciones();
      setIsLoading(false);
    };

    fetchData();
    setRecargar(false)
  }, [recargar]);

  const handleReloadMapa = () => {
    console.log("cargando Mapa nuevamente");
    obtenerUbicaciones();
    setRecargar(true);
    setMostrarFormulario(false)
    setIsUpdateMode(false)
  };


  const handleClickNuevoProyecto = () => {
    setMostrarFormulario(true);
  };

  const handleChangeFiltroNombre = (event) => {
    setFiltroNombre(event.target.value);
  };

  const handleClickActualizarUbicacion = (ubicacion) => {
    setUbicacionToUpdate(ubicacion);
    setMostrarFormulario(true);
    setIsUpdateMode(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="justify-between items-center mb-8">
        {!mostrarFormulario && (
          <h1 className="mt-16 text-3xl font-bold ml-5">Mapa Ubicaciones</h1>
        )}
        {mostrarFormulario ? (
          <div className="">
            {/* Mostrar el formulario cuando mostrarFormulario es true */}
            <FormUbicacion 
              ubicacionToUpdate={ubicacionToUpdate} // Pasa la ubicacion que se va a actualizar
              isUpdateMode={isUpdateMode} // Pasa el modo de actualización 
              toast={toast} 
              reloadMapa={handleReloadMapa}/>
          </div>
        ) : (
          <div>
            <div className="grid  justify-items-end ">
              <div className="relative">
               
                  {/* Agregar el campo de búsqueda  */}
                <input
                  type="text"
                  value={filtroNombre}
                  onChange={handleChangeFiltroNombre}
                  placeholder="Buscar por nombre de ubicación"
                  className=" p-2 w-[20rem] border rounded-md mr-5 border-gray-800 pl-8"
                />
                <RiSearchLine className="absolute top-1/2 left-2 transform -translate-y-1/2 text-darkPrimary" /> 
             
                
                {/* Botón para agregar nueva ubicación */}
                <button
                  onClick={handleClickNuevoProyecto}
                  className=" bg-tertiary hover:bg-secondary text-white py-2 px-4 mr-2 rounded-md"
                >
                  Nueva Ubicación
                </button>
              </div>
            </div>
          </div>
        )}
        <ToastContainer/>
      </div>
      {!mostrarFormulario && (
        isLoading ? (
          <div className="flex flex-col items-center justify-center mt-48">
      <div className="custom-progress-bar">
        <div className="custom-progress"></div>
      </div>
      <p className="custom-loading-text mt-4 text-xl font-semibold text-black">Cargando...</p>
    </div>
        ) : (
        <div>
          {/* Pasar el filtro a la lista de ubicaciones */}
          <ListMapaUbicacion
            ubicaciones={ubicaciones.filter((ubicacion) =>
              ubicacion.nombre
                .toLowerCase()
                .includes(filtroNombre.toLowerCase())
            )}
            reloadMapa={handleReloadMapa}
            onUpdateClick={handleClickActualizarUbicacion}
          />
        </div>
         )
      )}
    </div>
  );
}

export default MapaUbicacionPage;
