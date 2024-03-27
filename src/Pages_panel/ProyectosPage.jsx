import React, { useEffect, useState } from "react";

import Automa from "../img/Noticias/automatizacion.jpg";
import ListProyectos from "../Components_Panel/ListProyectos";
import FormProyectos from "../Components_Panel/FormProyectos";
import { useInsoel } from "../Context/InsoelContext";

function ProyectosPage() {
  const {getProyectos, proyectos} = useInsoel()
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  //const [addProyecto, setAddProyecto] = useState(false)

  useEffect(() => {
    getProyectos()
  }, [])

   const handleReloadProyectos = () => {
    console.log("cargando proyectos nuevamente")
    getProyectos();
  };
  console.log(proyectos)
  /** 
  const proyectos2 = [
    {
      id: 1,
      titulo: "Automatización y Control",
      video: Automa,
      fecha: "Marzo 2020",
      area: "Desarrollo Tecnologico",
      contenido:
        "La automatización es el proceso de realizar tareas, operaciones o procesos de forma automática, sin intervención humana directa. Esto se logra mediante el uso de tecnología, sistemas y software diseñados para ejecutar acciones de manera programada o basada en ciertos criterios predefinidos. La automatización tiene como objetivo aumentar la eficiencia, reducir los errores y liberar tiempo y recursos humanos para tareas más estratégicas y creativas.",
      img1: Automa,
      img2: Automa,
      img3: Automa,
      frase:
        "La automatización libera el potencial humano al delegar las tareas repetitivas a la precisión de las máquinas.",
      //enlace: "https://ejemplo.com/noticia1"
    },
    {
      id: 1,
      titulo: "Automatización y Control",
      video: Automa,
      fecha: "Marzo 2020",
      area: "Desarrollo Tecnologico",
      contenido:
        "La automatización es el proceso de realizar tareas, operaciones o procesos de forma automática, sin intervención humana directa. Esto se logra mediante el uso de tecnología, sistemas y software diseñados para ejecutar acciones de manera programada o basada en ciertos criterios predefinidos. La automatización tiene como objetivo aumentar la eficiencia, reducir los errores y liberar tiempo y recursos humanos para tareas más estratégicas y creativas.",
      img1: Automa,
      img2: Automa,
      img3: Automa,
      frase:
        "La automatización libera el potencial humano al delegar las tareas repetitivas a la precisión de las máquinas.",
      //enlace: "https://ejemplo.com/noticia1"
    },
  ];
  */
 

  const handleClickNuevoProyecto = () => {
    setMostrarFormulario(true);
    //setAddProyecto(true)
  };
  return (
    <div className="container mx-auto px-4 py-8 ">
      <div className="flex justify-between items-center ">
        {!mostrarFormulario && (
          <h1 className="mt-10 text-3xl font-bold ml-5">Proyectos</h1>
        )}
        {mostrarFormulario ? (
          <div className="">
            // Mostrar el formulario cuando mostrarFormulario es true
            <FormProyectos reloadProyectos={handleReloadProyectos} />
          </div>
        ) : (
          // Mostrar el botón "Nuevo Proyecto" cuando mostrarFormulario es false
          <button
            onClick={handleClickNuevoProyecto}
            className="mt-14 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
          >
            Nuevo Proyecto
          </button>
        )}
      </div>
      {!mostrarFormulario && (
        <div>
          <ListProyectos proyectos={proyectos} reloadProyectos={handleReloadProyectos} />
        </div>
      )}
    </div>
  );
}

export default ProyectosPage;
