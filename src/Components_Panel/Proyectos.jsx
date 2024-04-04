import React, { useRef, useState } from "react";
import { useInsoel } from "../Context/InsoelContext";
import { Link } from 'react-router-dom';

function Proyectos({ proyecto, reloadProyectos }) {
  const { deleteProyecto, fechaFormateada } = useInsoel();
  const videoRef = useRef(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const MAX_LENGTH = 300; // Número máximo de caracteres que deseas mostrar

  // Función para truncar el texto si es demasiado largo
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    } else {
      return text;
    }
  };

  const handleDelete = () => {
    if (confirmDelete) {
      deleteProyecto(proyecto._id);
      setConfirmDelete(false); // Restablecer el estado después de eliminar
      reloadProyectos(); // Llama a la función para recargar los proyectos después de eliminar
      // Puedes mostrar un mensaje de confirmación aquí también si lo deseas
    } else {
      setConfirmDelete(true);
    }
  };

  return (
    <div className="ml-5 mt-5 mr-5">
      <div className="bg-opacity-25 bg-gray-900  shadow-xl rounded-md p-4 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-2xl font-semibold text-secondary mb-2">
              {proyecto.titulo}
            </h2>
            <p className="text-black mb-4">{fechaFormateada(proyecto.fecha)}</p>
            <p className="text-black mb-4">{proyecto.area}</p>
            <p className="text-black mb-4">
              {truncateText(proyecto.contenido, MAX_LENGTH)}
            </p>
            <p className="italic text-black mb-4">{proyecto.frase}</p>
          </div>
          <div>
            <div className="grid grid-cols-2 gap-4">
              {proyecto.imagenes.map((imagen, index) => (
                <img
                  src={`http://localhost:3000/uploads/${imagen.nuevoNombre}`}
                  alt={proyecto.titulo}
                  key={imagen._id}
                  className="w-full h-36 object-cover rounded-md border border-gray-300 "
                />
              ))}
              <video
                loop
                muted
                preload={"auto"}
                ref={videoRef}
                autoPlay
                src={`http://localhost:3000/uploads/${proyecto?.video?.nuevoNombre}`}
                className="w-full h-36 object-cover rounded-md  border border-gray-300"
              />
            </div>
          </div>
        </div>

        {/* Botones de eliminar y editar */}
        <div className="flex justify-end mt-4">
          {confirmDelete ? (
            <> 
              <button
                onClick={handleDelete}
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
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded-md mr-2"
            >
              Eliminar
            </button>
          )}
          <button
            className={` ${
              confirmDelete
                ? "hidden"
                : "bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded-md"
            }`}
          >
            Editar
          </button>
          <button
            className={` ${
              confirmDelete
                ? "hidden"
                : "bg-secondary hover:bg-primary text-white py-1 px-4 ml-2 rounded-md"
            }`}
          >
             <Link to={`/web-insol/proyecto/${proyecto._id}`}>Ver página</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Proyectos;
