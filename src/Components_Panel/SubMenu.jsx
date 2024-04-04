import React, { useState } from "react";

function SubMenu({ submenu }) {
  const [editando, setEditando] = useState(false);
  const [nuevoArea, setNuevoArea] = useState(submenu.area);
  const [nuevoEnlace, setNuevoEnlace] = useState(submenu.enlace);
  const [nuevaDescripcion, setNuevaDescripcion] = useState(submenu.descripcion);
  const [nuevaImagen, setNuevaImagen] = useState(null);

  const handleEditar = () => {
    setEditando(true);
  };
 
  const handleGuardar = () => {
    // Aquí deberías implementar la lógica para guardar los cambios
    setEditando(false);
    // También puedes enviar los nuevos valores al backend o realizar cualquier acción necesaria
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
                src={submenu.img1}
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

        <div className="flex justify-end">
          {editando ? (
            <>
              <button
                onClick={handleGuardar}
                className="bg-green-500 hover:bg-green-600 text-white py-1 px-4 rounded-md mr-2"
              >
                Guardar
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white py-1 px-4 rounded-md"
                onClick={() => setEditando(false)}
              >
                Cancelar
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleEditar}
                className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded-md mr-2"
              >
                Editar
              </button>
              <button className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded-md">
                Eliminar
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default SubMenu;
