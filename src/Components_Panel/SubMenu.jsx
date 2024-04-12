import React, { useState, useEffect } from "react";
import { deleteSubMenuRequest, editarSubMenuRequest } from "../api/subMenus";

function SubMenu({ submenu }) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [editando, setEditando] = useState(false);
  const [nuevoArea, setNuevoArea] = useState(submenu.area);
  const [nuevoEnlace, setNuevoEnlace] = useState(submenu.enlace);
  const [nuevaImg, setNuevaImg] = useState(submenu.img);
  const [nuevaDescripcion, setNuevaDescripcion] = useState(submenu.descripcion);
  const [nuevaImagen, setNuevaImagen] = useState(null);

  // Definir el id 
  const id = submenu ? submenu._id : null;

  useEffect(() => {
    if (submenu) {
      setNuevoArea(submenu.area);
      setNuevoEnlace(submenu.enlace);
      setNuevaImg(submenu.img);
      setNuevaDescripcion(submenu.descripcion)
    }
  }, [submenu]);

  const handleClick = async () => {
    try {
      if (!id) {
        throw new Error("El ID del submenu no está definido");
      }

      if (!confirmDelete) {
        setConfirmDelete(true); // Mostrar el mensaje de confirmación
        return; // Salir de la función para esperar la confirmación del usuario
      }

      // Si confirmDelete es true, proceder con la eliminación
      const data = await deleteSubMenuRequest(id);
      console.log("SubMenu eliminado:", data);

      // Restablecer el estado después de eliminar
      setConfirmDelete(false);

      // Recargar la lista de carruseles después de eliminar uno (
    } catch (error) {
      console.error("Error al eliminar el SubMenu:", error);
      // Aquí podrías manejar el error de alguna manera, por ejemplo, mostrando un mensaje al usuario
    }
  };

  const handleEditar = () => {
    setEditando(true);
  };
 
  const handleGuardar = async () => {
    try {
      // Console.log para verificar el estado de newImagenes
    console.log("Estado :", nuevaImg);
    
      // Realizar solicitud PUT al backend para actualizar el carrusel
      const response = await editarSubMenuRequest(id, {
        area: nuevoArea,
        enlace: nuevoEnlace,
        img: nuevaImg,
        descripcion: nuevaDescripcion,
      }); 
      console.log("SubMENU actualizado:", response.data);
      setEditando(false); // Finalizar modo edición
    } catch (error) {
      console.error("Error al actualizar el carrusel:", error);
      // Manejar el error según sea necesario
    }
  };
  

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
                {submenu.area}
              </h2>
              <p className="text-black ml-2 mt-5">{submenu.enlace}</p>
              </div>
              <img
                src={`http://localhost:3000/uploads/SubMenu/${submenu?.img?.nuevoNombre}`}
                alt={submenu.area}
                className={editando ? "w-full h-40 object-cover rounded-md m-2" : "h-48 ml-28 mt-5  "}
              />
            </div>
            
              <p className={editando ? "text-black m-4 text-justify " : "text-black m-4 text-justify  text-lg mt-10"}>
                {submenu.descripcion}
              </p>
            
          </div>
          <div className="">
            {editando && (
              <>
              <div className="grid grid-cols-2 ">
              <input
                  type="text"
                  value={nuevoArea}
                  onChange={(e) => setNuevoArea(e.target.value)}
                  className="mb-2 w-full border border-gray-400 rounded-md p-1 mr-3"
                />
                 <select
                  value={nuevoEnlace}
                  onChange={(e) => setNuevoEnlace(e.target.value)}
                  className="mb-4 w-full border border-gray-400 rounded-md p-2 ml-2 mr-2 mt-1"
                >
                  <option value="opcion1">Opción 1</option>
                  <option value="opcion2">Opción 2</option>
                  <option value="opcion3">Opción 3</option>
                </select>

              </div>
                
                <div className="grid grid-cols-2">
                <input
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setNuevaImagen(URL.createObjectURL(file));
                    } else {
                      setNuevaImagen(null);
                    }
                  }}
                  className="mb-2 w-full border border-gray-400 rounded-md p-1"
                />

                {nuevaImagen && (
                  <img
                    src={nuevaImagen}
                    alt="Imagen seleccionada"
                    className="w-56 rounded-md mb-4 text-center"
                  />
                )}
                </div>
                
                <textarea
                  value={nuevaDescripcion}
                  onChange={(e) => setNuevaDescripcion(e.target.value)}
                  className="mb-2 w-full border border-gray-400 rounded-md p-1"
                  style={{ height: "auto", minHeight: "100px" }} // Establecer altura automática y una altura mínima
                  rows={Math.max(nuevaDescripcion.split("\n").length, 3)} // Ajustar el número de filas basado en el número de líneas de texto
                ></textarea>
              </>
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

export default SubMenu;
