import React, { useEffect } from "react";
import { useInsoel } from "../Context/InsoelContext";
import { useNavigate } from "react-router-dom";

//const navigate = useNavigate()

function ListaProyectosPage() {
  const { obtenerProyectos, proyectos } = useInsoel();
  useEffect(() => {
    obtenerProyectos();
  }, []);

  console.log(proyectos);

  if (proyectos.length === 0) return <h1>No Hay Productos</h1>;
  return (
    <div>
      <h2>Proyectos</h2>
      {proyectos.map((proyecto) => (
        <div key={proyecto._id}>
          <h3>{proyecto.titulo}</h3> 
          <p>{proyecto.contenido}</p>
          <button onClick={useNavigate}></button>
          {/** 
          {proyecto.imagenes.map((imagen, index) => {
            const ruta = imagen.ruta;
            // Utiliza split para dividir la ruta por el separador de directorios (en este caso, '\\')
            const partesRuta = ruta.split('\\');
            // La última parte del array resultante será el nombre del archivo
            const nombreArchivo = partesRuta[partesRuta.length - 1];

            return (
              <img
                key={index}
                src={`http://localhost:3000/uploads/${nombreArchivo}`}
                alt={`Imagen ${index}`}
              />
            );
          })}
          */}
        </div>
      ))}
    </div>
  );
}

export default ListaProyectosPage;
