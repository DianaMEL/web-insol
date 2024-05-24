import React, {useEffect, useState} from 'react'

import Automa from "../img/Noticias/automatizacion.jpg";
import ListArea from '../Components_Panel/ListArea';
import FormArea from '../Components_Panel/FormArea'
import { getAreasRequest } from '../api/area';
import { useInsoel } from '../Context/InsoelContext';

function AreaPage() {
  /*  const areas = [
        {
          id: 1,
          area: "Desarrollo Tecnologico",
          descripcion: "Explora nuestra sección de Desarrollo Tecnológico para conocer los proyectos pioneros que hemos llevado a cabo. Desde la creación de soluciones personalizadas hasta la adopción de tecnologías emergentes, demostramos nuestro compromiso con la innovación y el avance en el mundo digital.",
          img1: Automa,
          enlace: "https://ejemplo.com/proyecto1"
        },
        {
          id: 1,
          area: "Desarrollo Tecnologico",
          descripcion: "Explora nuestra sección de Desarrollo Tecnológico para conocer los proyectos pioneros que hemos llevado a cabo. Desde la creación de soluciones personalizadas hasta la adopción de tecnologías emergentes, demostramos nuestro compromiso con la innovación y el avance en el mundo digital.",
          img1: Automa,
          enlace: "https://ejemplo.com/proyecto1"
        },
      ]; */
    
    const [areas, setAreas] = useState([]);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [recargar, setRecargar] = useState(false)

    const obtenerAreas = async () => {
      try {
        const areas = await getAreasRequest();
        setAreas(areas.data);
      } catch (error) {
        console.error('Error al obtener las Areas', error);
      }
    }; 

    useEffect(() => {
      obtenerAreas();
      setRecargar(false);
    },[recargar]);

    const handleReloadArea = () => {
      console.log("cargando Areas nuevamente");
      obtenerAreas();
      setRecargar(true);
    };

      const handleClickNuevoProyecto = () => {
        setMostrarFormulario(true);
      };
    
    
      
  
    return (
        <div className="container mx-auto px-4 py-8 ">
      <div className="flex justify-between items-center ">
      {!mostrarFormulario && (
            <h1 className="mt-10 text-3xl font-bold ml-5">Areas</h1>
          )}
        {mostrarFormulario ? (
            <div className=''>
                // Mostrar el formulario cuando mostrarFormulario es true
            <FormArea
            reloadArea={handleReloadArea} />
            </div>
          ) : (
            // Mostrar el botón "Nuevo Proyecto" cuando mostrarFormulario es false
            /* onClick={handleClickNuevoProyecto} */
            <button onClick={handleClickNuevoProyecto} className="mt-14 bg-tertiary hover:bg-secondary text-white py-2 px-4 rounded-md">Nueva Area</button>
          )}
      </div>
      {!mostrarFormulario && (
            <div>
              <ListArea areas={areas} 
               reloadarea={handleReloadArea}  />
            </div>
          )}
    </div>
      )
}

export default AreaPage