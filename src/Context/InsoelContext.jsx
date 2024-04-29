import { createContext, useState, useContext, useEffect } from "react";

import {
  createSolicitudRequest,
  getSolicitudesRequest,
} from "../api/contactarnos";
import {
  crearProyectoRequest,
  getProyectoRequest,
  getProyectosRequest,
  deleteProyectoRequest,
  updateProyectoRequest,
} from "../api/proyectos";
import {
  createCarruselRequest,
  deleteCarruselRequest,
  editCarruselRequest,
  getCarruselesRequest,
  getCarruselPorTituloRequest,
  getCarruselRequest,
} from "../api/carruseles";
import {
  crearUbicacionRequest,
  deleteUbicacionRequest,
  getUbicacionesRequest,
  updateUbicacionRequest,
} from "../api/ubicaciones";
import {
  crearSubMenuRequest,
  deleteSubMenuRequest,
  editarSubMenuRequest,
  getSubMenusRequest,
} from "../api/subMenus";

const InsoelContext = createContext();

export const useInsoel = () => {
  const context = useContext(InsoelContext);
  if (!context) {
    throw new Error("useInsoel must be used with, a Insoelprovider");
  }
  return context;
};

export function InsoelProvider({ children }) {
  const [logoColor, setLogoColor] = useState("amarilloNegro");
  const [txtColor, setTxtColor] = useState("white");
  const [proyectColor, setProyectColor] = useState("bg-tertiary bg-opacity-75");
  const [opacidadColor, setOpacidadColor] = useState(
    "bg-opacity-75 bg-gradient-to-b from-secondary bottom-96"
  );

  //-----------Funcion para formatear la fecha de ISO -------
  const fechaFormateada = (fechaISO) => {
    // Convertir la cadena de fecha a objeto Date
    const fecha = new Date(fechaISO);

    // Obtener el día
    const dia = fecha.getDate();
    //console.log(fecha)

    // Obtener el mes
    const meses = [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ];
    const mes = meses[fecha.getMonth()];

    // Obtener el año
    const año = fecha.getFullYear();

    // Formatear la fecha en el formato deseado
    const fechaFormateada = `${dia} de ${mes} del ${año}`;
    //console.log(fechaFormateada)

    return fechaFormateada;
  };

  //----------------Proyectos--------------
  const [proyectos, setProyectos] = useState([]);
  const [proyecto, setProyecto] = useState([]);

  // Funciones para la seccion de contactarnos

  const createSolicitud = async (solicitud) => {
    const res = await createSolicitudRequest(solicitud);
    console.log(res);
  };

  /** ------------------Proyectos----------------------- */
  const crearProyecto = async (proyecto) => {
    try {
      const res = await crearProyectoRequest(proyecto);
      return res;
    } catch (error) {
      console.error(error);
      throw error; // Propaga el error para que sea capturado en la llamada a crearProyecto
    }

    //console.log(res);
  };
  const deleteProyecto = async (id) => {
    try {
      const res = await deleteProyectoRequest(id);
      if (res.status === 204) {
        setProyectos(proyecto.filter((proyecto) => proyecto._id !== id));
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  const getProyectos = async () => {
    const proyectos = await getProyectosRequest();
    setProyectos(proyectos.data);
  };
  const getProyecto = async (id) => {
    //console.log(id)
    try {
      const proyecto = await getProyectoRequest(id);
      setProyecto(proyecto.data);
      //console.log(proyecto.data)
      return proyecto.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const formDataToJson = (formData) => {
    const json = {};
    formData.forEach((value, key) => {
      json[key] = value;
    });
    return json;
  };

  const updateProyecto = async (id, proyecto) => {
    //console.log(id)
    //console.log(proyecto)
    try {
      const proyectoActualizado = await updateProyectoRequest(id, proyecto);

      console.log(proyectoActualizado);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  /** ------------------carrusel----------------------- */
  const [carruseles, setcarruseles] = useState([]);
  const [carrusel, setCarrusel] = useState([]);

  const createCarrusel = async (carrusel) => {
    const res = await createCarruselRequest(carrusel);
    console.log(res);
  };
  const obtenerCarruseles = async () => {
    const carruseles = await getCarruselesRequest();
    setcarruseles(carruseles.data);
  };
  const getCarrusel = async (id) => {
    console.log(id);
    try {
      const carrusel = await getCarruselRequest(id);
      setCarrusel(carrusel.data);
      return carrusel.data;
    } catch (error) {
      console.error(error);
    }
  };
  const eliminarCarrusel = async (id) => {
    console.log(id);
    try {
      const carrusel = await deleteCarruselRequest(id);
      setCarrusel(carrusel.data);
      return carrusel.data;
    } catch (error) {
      console.error(error);
    }
  };

  const editarCarrusel = async (id, carrusel) => {
    try {
      const carruselActualizado = await editCarruselRequest(id, carrusel);
      console.log(carruselActualizado)
    } catch (error) {
      console.error(error);
    }
  };


  const getCarruselPorTitulo = async (titulo) => {
    try {
      const carruseles = await getCarruselPorTituloRequest(titulo);
      const carruselFiltrado = carruseles.data.filter(
        (carrusel) => carrusel.titulo === titulo
      );
      return carruselFiltrado;
    } catch (error) {
      console.error("Error al obtener el carrusel por título:", error);
      throw error; // Puedes manejar el error según tus necesidades
    }
  };

  /** ------------------ubicaciones----------------------- */
  const [ubicaciones, setUbicaciones] = useState([]);
  const [ubicacion, setUbicacion] = useState([]);

  const crearUbicacion = async (ubicacion) => {
    try {
      const res = await crearUbicacionRequest(ubicacion);
      return res;
    } catch (error) {
      console.error(error);
      throw error; // Propaga el error para que sea capturado en la llamada a crearUbicacion
    }
  };
  const obtenerUbicaciones = async () => {
    const ubicaciones = await getUbicacionesRequest();
    setUbicaciones(ubicaciones.data);
  };

  const deleteUbicacion = async (id) => {
    try {
      const res = await deleteUbicacionRequest(id);
      console.log(res);
      if (res.status === 204)
        setUbicacion(ubicacion.filter((ubicacion) => ubicacion._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const updateUbicacion = async (id, ubicacion) => {
    try {
      await updateUbicacionRequest(id, ubicacion);
    } catch (error) {
      console.error(error);
    }
  };

  /** ------------------submenu----------------------- */
  const [subMenus, setSubMenus] = useState([]);
  const [subMenu, setSubMenu] = useState([]);

  const crearSubMenu = async (subMenu) => {
    const res = await crearSubMenuRequest(subMenu);
    console.log(res);
  };

  const obtenerSubMenus = async () => {
    const subMenus = await getSubMenusRequest();
    setSubMenus(subMenus.data);
  };

const deleteSubMenu = async (id) => {
  try {
    const res = await deleteSubMenuRequest(id);
    console.log(res)
    if (res.status === 204)
      setSubMenu(subMenu.filter((submenu) => submenu._id !== id));
  } catch (error) {
    console.log(error);
  }
};

const editarSubMenu = async (id, subMenu) => {
  try {
    const subMenuActualizado = await editarSubMenuRequest(id, subMenu);
    console.log(subMenuActualizado)
  } catch (error) {
    console.error(error);
  }
};

  const updateSubMenu = async (id, submenu) => {
    try {
      await editarSubMenuRequest(id, submenu);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <InsoelContext.Provider
      value={{
        logoColor,
        setLogoColor,
        txtColor,
        setTxtColor,
        proyectColor,
        setProyectColor,
        opacidadColor,
        setOpacidadColor,
        createCarrusel, //carruseles
        obtenerCarruseles,
        eliminarCarrusel,
        editarCarrusel,
        getCarruselPorTitulo,
        getCarrusel,
        carruseles,
        carrusel,
        fechaFormateada,
        createSolicitud, // Proyectos
        crearProyecto,
        updateProyecto,
        deleteProyecto,
        getProyectos,
        getProyecto,
        crearUbicacion, // ubicaciones
        obtenerUbicaciones,
        ubicaciones,
        deleteUbicacion,
        updateUbicacion,
        crearSubMenu, // SUBMENU
        obtenerSubMenus,
        deleteSubMenu,
        editarSubMenu,
        proyectos,
        proyecto,
      }}
    >
      {children}
    </InsoelContext.Provider>
  );
}
