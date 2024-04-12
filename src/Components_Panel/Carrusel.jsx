import React, { useState, useEffect } from "react";
import {
  deleteCarruselRequest,
  editCarruselRequest,
  getCarruselesRequest,
} from "../api/carruseles";

function Carrusel({ carrusel }) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [editando, setEditando] = useState(false);
  const [nuevoTitulo, setNuevoTitulo] = useState(carrusel.titulo);
  const [newImagenes, setNewImagenes] = useState(carrusel.imagenes);
  const [nuevaImagen, setNuevaImagen] = useState(null);
  //console.log('Datos del carrusel:', carrusel.titulo, carrusel.imagenes);

  // Definir el id del carrusel
  const id = carrusel ? carrusel._id : null;

  useEffect(() => {
    if (carrusel) {
      setNuevoTitulo(carrusel.titulo);
      setNewImagenes(carrusel.imagenes);
    }
  }, [carrusel]);

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
      const data = await deleteCarruselRequest(id);
      console.log("Carrusel eliminado:", data);

      // Restablecer el estado después de eliminar
      setConfirmDelete(false);

      // Recargar la lista de carruseles después de eliminar uno (
    } catch (error) {
      console.error("Error al eliminar el carrusel:", error);
      // Aquí podrías manejar el error de alguna manera, por ejemplo, mostrando un mensaje al usuario
    }
  };

  const handleEditar = () => {
    setEditando(true);
  };

  const handleGuardar = async () => {
    try {
      // Console.log para verificar el estado de newImagenes
    console.log("Estado de newImagenes antes de enviar al backend:", newImagenes);
    
      // Realizar solicitud PUT al backend para actualizar el carrusel
      const response = await editCarruselRequest(id, {
        titulo: nuevoTitulo,
        imagenes: newImagenes,
      });
      console.log("Carrusel actualizado:", response.data);
      setEditando(false); // Finalizar modo edición
    } catch (error) {
      console.error("Error al actualizar el carrusel:", error);
      // Manejar el error según sea necesario
    }
  };

  const handleImagenSeleccionada = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const nuevasImagenes = [...newImagenes];
      nuevasImagenes[index] = URL.createObjectURL(file);
      setNewImagenes(nuevasImagenes);
    }
  };

  return (
    <div className="m-5 ">
      <div className="bg-opacity-25 bg-gray-900 shadow-xl rounded-md p-4 relative">
        <div
          className={`grid grid-cols-1 ${
            editando ? "md:grid-cols-2" : ""
          } gap-6`}
        >
          <div
            className={editando ? "rid grid-cols-1 md:grid-cols-2 gap-6" : ""}
          >
            <h2 className="text-2xl text-center font-semibold text-secondary mb-4">
              {carrusel.titulo}
            </h2>

            <div
              className={
                editando ? "grid grid-cols-2" : "grid gap-4 grid-cols-4"
              }
            >
              {carrusel?.imagenes?.map((imagen, index) => (
                <div key={index} className="relative group">
                  <img
                    src={`http://localhost:3000/uploads/carrusel/${imagen.nuevoNombre}`}
                    alt={`Imagen ${index}`}
                    className={`w-full ${
                      editando ? "h-28 p-0.5 " : "h-36"
                    }  object-cover rounded-md transition-transform transform  hover:scale-105`}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="">
            {editando && (
              <>
                <input
                  type="text"
                  value={nuevoTitulo}
                  onChange={(e) => setNuevoTitulo(e.target.value)}
                  className="mb-2 w-full border border-gray-400 rounded-md p-1 mr-3"
                  placeholder="Nuevo Título"
                />
                <div className="grid grid-cols-2 ">
                  {newImagenes.map((imagen, index) => (
                    <div key={index}>
                      <input
                        type="file"
                        onChange={(e) => handleImagenSeleccionada(e, index)}
                        className="mb-2 w-full border border-gray-400 rounded-md p-1"
                      />

                      <img
                        key={index}
                        src={imagen}
                        alt={`Imagen seleccionada ${index + 1}`}
                        className="w-28 mx-16 rounded-md mb-4 text-center"
                      />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Botones de eliminar y editar */}
        <div className="flex justify-end mt-5">
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
            <>
              {editando ? (
                <>
                  <button
                    onClick={handleGuardar}
                    className="bg-secondary hover:bg-darkPrimary text-white py-1 px-4 rounded-md mr-2"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => setEditando(false)}
                    className="bg-gray-500 hover:bg-gray-600 text-white py-1 px-4 rounded-md"
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleClick}
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded-md mr-2"
                  >
                    Eliminar
                  </button>
                  <button
                    className="bg-tertiary hover:bg-secondary text-white py-1 px-4 rounded-md"
                    onClick={() => setEditando(true)}
                  >
                    Editar
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Carrusel;
