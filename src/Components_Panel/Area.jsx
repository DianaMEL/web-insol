import React, { useState, useEffect } from "react";
import { deleteAreaRequest,
 } from "../api/area";
import { useForm } from "react-hook-form";
import { useInsoel } from "../Context/InsoelContext";

function Area({ area, reloadArea }) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [editando, setEditando] = useState(false);
  const { register, handleSubmit, setValue  } = useForm(); 
  const { editarArea } = useInsoel();

  // Definir el id 
  const id = area ? area._id : null;

  useEffect(() => {
    if (area) {
      setValue("area", area.area);
      setValue("enlace", area.enlace);
      setValue("descripcion", area.descripcion);
    }
  }, [area, setValue]);

  const handleClick = async () => {
    try {
      if (!id) {
        throw new Error("El ID del area no está definido");
      }

      if (!confirmDelete) {
        setConfirmDelete(true); // Mostrar el mensaje de confirmación
        return; // Salir de la función para esperar la confirmación del usuario
      }

      // Si confirmDelete es true, proceder con la eliminación
      const data = await deleteAreaRequest(id);
      console.log("area eliminada:", data);

      // Restablecer el estado después de eliminar
      setConfirmDelete(false);
      // Recargar la lista de carruseles después de eliminar uno 
      reloadArea();

    } catch (error) {
      console.error("Error al eliminar el area:", error);
      // Aquí podrías manejar el error de alguna manera, por ejemplo, mostrando un mensaje al usuario
    }
  };

  const handleEditar = () => {
    setEditando(true);
  };
 
  const onSubmit = handleSubmit(async(data)=>{
    const formData = new FormData();
    formData.append('area', data.area);
    formData.append('enlace', data.enlace);
    formData.append('img', data.img[0]);
    formData.append('descripcion', data.descripcion);
    console.log([...formData.entries()]);
    //console.log(formData)
    //await editarArea(area._id, formData)

    await toast.promise(editarArea(area._id, formData), {
      pending: "Editando Area...",
      success: "Area Editada con Éxito",
      error: "Error al Editar el Area"
    });

setEditando(false);
    reloadArea();
  })
  

  return (
    <div className="h-64 mt-5 mr-5 ml-5">
      <div className="bg-opacity-25 bg-gray-900  shadow-xl rounded-md p-4 relative">
        <div
          className={`grid grid-cols-1 ${
            editando ? "md:grid-cols-2" : ""
          } gap-6`}
        >
          <div
            className={editando ? "" : "grid grid-cols-1 md:grid-cols-2 gap-6"}
          >
            <div className={editando ? "grid grid-cols-2 mr-3" : " "}>
              <div>
              <h2 className="text-2xl text-center  font-semibold text-secondary m-2 ">
                {area.area}
              </h2>
              <p className="text-black ml-2 mt-5">{area.enlace}</p>
              </div>
              <img
                src={`http://localhost:3000/uploads/Area/${area?.img?.nuevoNombre}`}
                alt={area.area}
                className={editando ? "w-full h-40 object-cover rounded-md m-2" : "h-48 ml-28 mt-5  "}
              />
            </div>
            
              <p className={editando ? "text-black m-4 text-justify " : "text-black m-4 text-justify  text-lg mt-10"}>
                {area.descripcion}
              </p>
            
          </div> 
          <div className="">
            {editando && (
              <form onSubmit={onSubmit}>
              <div class="grid grid-cols-2 gap-4">
              <div className="">
                  <label htmlFor="area" className="block text-lg sm:text-base md:text-lg lg:text-xl font-semibold">
                    Area
                  </label>
                  <input
                    type="text"
                    {...register("area")}
                    id="area"
                    name="area"
                    className="mt-1 p-2 w-full border rounded-md border-gray-800"
                    placeholder="area "
                  />
                  </div>
                  <div className="">
                  <label htmlFor="enlace" className="block text-lg sm:text-base md:text-lg lg:text-xl font-semibold">
                    enlace
                  </label>
                  <input
                    type="text"
                    {...register("enlace")}
                    id="enlace"
                    name="enlace"
                    className="mt-1 p-2 w-full border rounded-md border-gray-800"
                    placeholder="enlace "
                  />
                </div>
                </div>
                <div className="">
                  <label htmlFor="img" className="block text-lg font-semibold ">
                      Imagen 
                    </label>
                    <input
                      type="file"
                      {...register("img")}
                      id="img"
                      name="img"
                      accept="image/*"
                      className="mt-1 p-2 w-full border rounded-md border-gray-800"
                    />
                  </div>
                  <div className="">
                  <label htmlFor="descripcion" className="block text-lg font-semibold">
          Descripción
      </label>
      <textarea
          {...register("descripcion")}
          id="descripcion"
          name="descripcion"
          className="mt-1 p-2 w-full border rounded-md border-gray-800"
          rows="3" // puedes ajustar este valor según la cantidad de líneas que desees mostrar inicialmente
      />
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
{/* botones  */}
        <div className="flex justify-end">
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

export default Area;
