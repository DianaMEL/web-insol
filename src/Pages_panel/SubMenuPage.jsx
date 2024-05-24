import React, {useEffect, useState} from 'react'

import Automa from "../img/Noticias/automatizacion.jpg";
import ListSubMenu from '../Components_Panel/ListSubMenu';
import FormSubMenu from '../Components_Panel/FormSubMenu'
import { getSubMenusRequest } from '../api/subMenus';
import { useInsoel } from '../Context/InsoelContext';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SubMenuPage() {
  /*  const submenus = [
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
    
    const [submenus, setSubMenus] = useState([]);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [recargar, setRecargar] = useState(false)

    const obtenerSubMenus = async () => { 
      try {
        const subMenus = await getSubMenusRequest();
        setSubMenus(subMenus.data);
      } catch (error) {
        console.error('Error al obtener los SubMenus', error);
      }
    }; 

    useEffect(() => {
      obtenerSubMenus();
      setRecargar(false);
    },[recargar]);


    const handleReloadSubMenu = () => {
      console.log("cargando SubMenus nuevamente");
      obtenerSubMenus();
      setRecargar(true);
      setMostrarFormulario(false)
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
            <FormSubMenu
            reloadSubMenu={handleReloadSubMenu} toast={toast} />
            </div>
          ) : (
            // Mostrar el botón "Nuevo Proyecto" cuando mostrarFormulario es false
            /* onClick={handleClickNuevoProyecto} */
            <button onClick={handleClickNuevoProyecto} className="mt-14 bg-tertiary hover:bg-secondary text-white py-2 px-4 rounded-md">Nuevo SubMenu</button>
          )}
      </div>

      <ToastContainer/>

      {!mostrarFormulario && (
            <div>
              <ListSubMenu submenus={submenus} 
               reloadSubMenu={handleReloadSubMenu} toast={toast} 
           />
            </div>
          )}
    </div>
      )
}

export default SubMenuPage