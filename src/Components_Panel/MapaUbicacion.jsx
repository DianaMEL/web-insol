import React, { useState, useEffect } from "react";
import {
  deleteUbicacionRequest,
  updateUbicacionRequest,
} from "../api/ubicaciones";
import { useInsoel } from "../Context/InsoelContext";

function MapaUbicacion({ ubicacion, reloadMapa ,onUpdateClick}) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [editando, setEditando] = useState(false);
  const [newNombre, setNewNombre] = useState(ubicacion.nombre);
  const [newDireccion, setNewDireccion] = useState(ubicacion.direccion);
  const [newLatitud, setNewLatitud] = useState(ubicacion.latitud);
  const [newLongitud, setNewLongitud] = useState(ubicacion.longitud);

  // Definir el id
  const id = ubicacion ? ubicacion._id : null;

  useEffect(() => {
    if (ubicacion) {
      setNewNombre(ubicacion.nombre);
      setNewDireccion(ubicacion.direccion);
      setNewLatitud(ubicacion.latitud);
      setNewLongitud(ubicacion.longitud);
    }
  }, [ubicacion]);

  const handleClick = async () => {
    try {
      if (!id) {
        throw new Error("El ID del carrusel no está definido");
      }

      if (!confirmDelete) {
        setConfirmDelete(true); // Mostrar el mensaje de confirmación
        return; // Salir de la función para esperar la confirmación del usuario
      }

      // Si confirmDelete es true, proceder con la eliminación
      const data = await deleteUbicacionRequest(id);
      console.log("Ubicacion eliminada:", data);

      // Restablecer el estado después de eliminar
      setConfirmDelete(false);

      // Recargar la lista de carruseles después de eliminar uno 
      reloadMapa();

    } catch (error) {
      console.error("Error al eliminar la Ubicacion:", error);
      // Aquí podrías manejar el error de alguna manera, por ejemplo, mostrando un mensaje al usuario
    }
  };
 
  const handleGuardar = async () => { 
    try {
      // Console.log para verificar el estado
      console.log("Estado de ubicacion antes de enviar al backend:", ubicacion);

      // Realizar solicitud PUT al backend para actualizar el carrusel
      const response = await updateUbicacionRequest(id, {
        nombre: newNombre,
        direccion: newDireccion,
        latitud: newLatitud,
        longitud: newLongitud,
      });

      // Salir del modo de edición
      setEditando(false);
      reloadMapa();

      console.log("Ubicación actualizada:", response.data);
    } catch (error) {
      console.error("Error al actualizar el carrusel:", error);
      // Manejar el error según sea necesario
    }
  };

  return (
    <div className="m-3">
      <div className="bg-opacity-25 bg-gray-900 shadow-xl rounded-md p-4 relative">
        {/* Tabla de ubicaciones */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="text-lg font-semibold text-secondary px-4 py-2">
                  Nombre
                </th>
                <th className="text-lg font-semibold text-secondary px-4 py-2">
                  Direccion
                </th>
                <th className="text-lg font-semibold text-secondary px-4 py-2">
                  Latitud
                </th>
                <th className="text-lg font-semibold text-secondary px-4 py-2">
                  Longitud
                </th>
                <th className="text-lg font-semibold text-secondary px-4 py-2">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center">
                <td className="text-lg font-semibold text-black px-4 py-2">
                  {ubicacion.nombre}
                </td>
                <td className="text-lg font-semibold text-black px-4 py-2">
                  {ubicacion.direccion}
                </td>
                <td className="text-lg font-semibold text-black px-4 py-2">
                  {ubicacion.latitud}
                </td>
                <td className="text-lg font-semibold text-black px-4 py-2 ">
                  {ubicacion.longitud}
                </td>
                <td className="flex justify-center">
                  {/* Botones de eliminar y editar */}
                  <div>
                    {confirmDelete ? (
                      <>
                        <button
                          onClick={handleClick}
                          className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded-md mr-2"
                        >
                          Confirmar Eliminar
                        </button>
                        <button
                          onClick={() => setConfirmDelete(false)}
                          className="bg-gray-500 hover:bg-gray-600 text-white py-1 px-4 rounded-md"
                        >
                          Cancelar
                        </button>
                      </>
                    ) : (
                     
                      <button
                      onClick={handleClick}
                        className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded-md mr-2"
                      >
                        Eliminar
                      </button>
                    )}
                    <button
                      className={` ${
                        confirmDelete
                          ? "hidden"
                          : "bg-tertiary hover:bg-secondary text-white py-1 px-4 rounded-md"
                      }`}
                      onClick={()=>{onUpdateClick(ubicacion)}}
                    >
                      Editar
                    </button> 
                           
              
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MapaUbicacion;
