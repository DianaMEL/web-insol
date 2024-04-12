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
  getCarruselesRequest,
  getCarruselPorTituloRequest,
  getCarruselRequest,
} from "../api/carruseles"

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
  const fechaFormateada = (fechaISO) =>{
    // Convertir la cadena de fecha a objeto Date
    const fecha = new Date(fechaISO);

    // Obtener el día
    const dia = fecha.getDate();
    //console.log(fecha)

    // Obtener el mes
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    const mes = meses[fecha.getMonth()];

    // Obtener el año
    const año = fecha.getFullYear();

    // Formatear la fecha en el formato deseado
    const fechaFormateada = `${dia} de ${mes} del ${año}`;
    //console.log(fechaFormateada)

    return fechaFormateada
  }

  //----------------Proyectos--------------
  const [proyectos, setProyectos] = useState([]);
  const [proyecto, setProyecto] = useState([]);

  const [carruseles, setcarruseles] = useState([]);
  const [carrusel, setCarrusel] = useState([]);


  // Funciones para la seccion de contactarnos

  const createSolicitud = async (solicitud) => {
    const res = await createSolicitudRequest(solicitud);
    console.log(res);
  };

  /** ------------------Proyectos----------------------- */
  const crearProyecto = async (proyecto) => {
    const res = await crearProyectoRequest(proyecto);
    console.log(res);
  };
  const deleteProyecto = async (id) =>{
    try {
      const res = await  deleteProyectoRequest(id)
      if (res.status === 204) {
      setProyectos(proyecto.filter((proyecto) => proyecto._id !== id))}
          
  } catch (error) {
      console.log(error);
  }
  }
  const getProyectos = async () => {
    const proyectos = await getProyectosRequest();
    setProyectos(proyectos.data);
  }; 
  const getProyecto = async (id) => {
    //console.log(id)
    try {
      const proyecto = await getProyectoRequest(id);
      setProyecto(proyecto.data)
      //console.log(proyecto.data)
      return proyecto.data
    } catch (error) {
      console.error(error)
    }
  };

  const formDataToJson = (formData) => {
    const json = {};
    formData.forEach((value, key) => {
      json[key] = value;
    });
    return json;
  };

  const updateProyecto = async(id, proyecto) =>{
    //console.log(id)
    //console.log(proyecto)
    try {
      const proyectoActualizado = await updateProyectoRequest(id, proyecto)
      console.log(proyectoActualizado)
    } catch (error) {
      console.error(error)
    }
  }

  /** ------------------carrusel----------------------- */
  const createCarrusel = async (carrusel) => {
    const res = await createCarruselRequest(carrusel);
    console.log(res);
  };
  const obtenerCarruseles = async () => {
    const carruseles = await getCarruselesRequest();
    setcarruseles(carruseles.data);
  };
  const getCarrusel = async (id) => {
    console.log(id)
    try {
      const carrusel = await getCarruselRequest(id);
      setCarrusel(carrusel.data)
      return carrusel.data
    } catch (error) {
      console.error(error)
    }
  };
  const eliminarCarrusel = async (id) => {
    console.log(id)
    try {
      const carrusel = await deleteCarruselRequest(id);
      setCarrusel(carrusel.data)
      return carrusel.data
    } catch (error) {
      console.error(error)
    }
  }
  const getCarruselPorTitulo = async (titulo) => {
    try {
      const carruseles = await getCarruselPorTituloRequest(titulo);
      const carruselFiltrado = carruseles.data.filter(carrusel => carrusel.titulo === titulo);
      return carruselFiltrado;
    } catch (error) {
      console.error("Error al obtener el carrusel por título:", error);
      throw error; // Puedes manejar el error según tus necesidades
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
        getCarruselPorTitulo,
        getCarrusel,
        carruseles,
        carrusel,
        fechaFormateada,
        createSolicitud,// Proyectos
        crearProyecto,
        updateProyecto,
        deleteProyecto,
        getProyectos,
        getProyecto,
        proyectos,
        proyecto,
      }}
    >
      {children}
    </InsoelContext.Provider>
  );
}
