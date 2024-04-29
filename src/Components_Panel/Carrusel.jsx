import React, { useState, useEffect } from "react";
import {
  deleteCarruselRequest,
} from "../api/carruseles";
import { useForm } from "react-hook-form";
import { useInsoel } from "../Context/InsoelContext";


function Carrusel({ carrusel }) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { register, handleSubmit, setValue  } = useForm(); 
  const { editarCarrusel } = useInsoel();
  const [editando, setEditando] = useState(false);
  const [nuevoTitulo, setNuevoTitulo] = useState(carrusel.titulo);
  const [newImagenes, setNewImagenes] = useState(carrusel.imagenes);
  const [nuevaImagen, setNuevaImagen] = useState(null);
  //console.log('Datos del carrusel:', carrusel.titulo, carrusel.imagenes);

  // Definir el id del carrusel
  const id = carrusel ? carrusel._id : null;

 
  useEffect(() => {
    if (carrusel) {
      setValue("titulo", carrusel.titulo);
    }
  }, [carrusel, setValue]);

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

  const onSubmit = handleSubmit(async(data)=>{
    const formData = new FormData();
    formData.append('titulo', data.titulo)
    formData.append('imagen1', data.imagen1[0]);
    formData.append('imagen2', data.imagen2[0]);
    formData.append('imagen3', data.imagen3[0]);
    formData.append('imagen4', data.imagen4[0]);
    console.log([...formData.entries()]);
    //console.log(formData)
    await editarCarrusel(carrusel._id, formData)
  })
  

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
              <form onSubmit={onSubmit} >
              <div className="mb-4">
                <label htmlFor="titulo" className="block text-lg sm:text-base md:text-lg lg:text-xl font-semibold">
                  Titulo
                </label>
                <input
                  type="text"
                  {...register("titulo")}
                  id="titulo"
                  name="titulo"
                  className="mt-1 p-2 w-full border rounded-md border-gray-800"
                  placeholder="Titulo "
                />
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div className="mb-4">
                <label htmlFor="imagen1" className="block text-lg font-semibold ">
                    Imagen 1
                  </label>
                  <input
                    type="file"
                    {...register("imagen1")}
                    id="imagen1"
                    name="imagen1"
                    accept="image/*"
                    className="mt-1 p-2 w-full border rounded-md border-gray-800"
                  />
                </div>
                <div className="mb-4">
                <label htmlFor="imagen2" className="block text-lg font-semibold ">
                    Imagen 2
                  </label>
                  <input
                    type="file"
                    {...register("imagen2")}
                    id="imagen2"
                    name="imagen2"
                    accept="image/*"
                    className="mt-1 p-2 w-full border rounded-md border-gray-800"
                  />
                </div>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div className="mb-4">
                  <label htmlFor="imagen3" className="block text-lg font-semibold ">
                    Imagen 3
                  </label>
                  <input
                    type="file"
                    {...register("imagen3")}
                    id="imagen3"
                    name="imagen3"
                    //accept: que tipo de archivo acepta en este caso imagen y el /* es que acepta jpg,, png, etc
                    accept="image/*"
                    className="mt-1 p-2 w-full border rounded-md border-gray-800"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="imagen4" className="block text-lg font-semibold ">
                    Imagen 4
                  </label>
                  <input
                    type="file"
                    {...register("imagen4")}
                    id="imagen4"
                    name="imagen4"
                    accept="image/*"
                    className="mt-1 p-2 w-full border rounded-md border-gray-800"
                  /> 
                </div>
              </div>
              <div className="flex justify-center">
            <button
              type="submit"
              className="bg-secondary hover:bg-darkPrimary text-white py-1 px-4 rounded-md "
            >
              Guardar
            </button>
          </div>
            </form>
            )}
          </div>
        </div>

        {/* Botones de eliminar y editar */}
        <div className="flex justify-end ">
          {confirmDelete ? (
            <>
              <button
                onClick={handleClick}
                className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded-md mr-2 mt-5"
              >
                Confirmar Eliminar
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white py-1 px-4 rounded-md mt-5"
              >
                Cancelar
              </button>
            </>
          ) : (
            <>
              {editando ? (
                <>
                  
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
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded-md mr-2 mt-5"
                  >
                    Eliminar
                  </button>
                  <button
                    className="bg-tertiary hover:bg-secondary text-white py-1 px-4 rounded-md mt-5"
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
