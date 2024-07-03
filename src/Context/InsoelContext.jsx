import { createContext, useState, useContext, useEffect } from "react";

import {
  createSolicitudRequest,
  getSolicitudesRequest,
  updateSolicitudRequest,
} from "../api/contactarnos";
import {
  crearProyectoRequest,
  getProyectoRequest,
  getProyectosRequest,
  deleteProyectoRequest,
  updateProyectoRequest,
  getProyectosByAreaRequest,
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
  editarSubMenuRequest,
  getSubMenusRequest,
  obtenerSubMenuRef,
} from "../api/subMenus";
import {
  crearAreaRequest,
  deleteAreaRequest,
  editarAreaRequest,
  getAreasRequest,
} from "../api/area";
import {
  crearProductoRequest,
  getProductosrequest,
  deleteProductoRequest,
  editarProductoRequest,
} from "../api/producto";

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

    // Verificar si la fecha es válida
    if (isNaN(fecha)) {
      return "Fecha no válida";
    }

    // Obtener el día en UTC y asegurarse de que tenga dos dígitos
    const dia = String(fecha.getUTCDate()).padStart(2, "0");

    // Obtener el mes en UTC
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
    const mes = meses[fecha.getUTCMonth()];

    // Obtener el año en UTC
    const año = fecha.getUTCFullYear();

    // Formatear la fecha en el formato deseado
    const fechaFormateada = `${dia} de ${mes} del ${año}`;

    return fechaFormateada;
  };

  //----------------Proyectos--------------
  const [proyectos, setProyectos] = useState([]);
  const [proyecto, setProyecto] = useState([]);
  const [solicitudes, setSolicitudes] = useState([]);

  // Funciones para la seccion de contactarnos

  const createSolicitud = async (solicitud) => {
    const res = await createSolicitudRequest(solicitud);
    console.log(res);
  };

  const obtenerSolicitudes = async () => {
    const solicitud = await getSolicitudesRequest();
    setSolicitudes(solicitud.data);
  };

  const actualizarSolicitud = async (id, terminada) => {
    try {
      const res = await updateSolicitudRequest(id, { terminada });
      setSolicitudes((prevSolicitudes) =>
        prevSolicitudes.map((solicitud) =>
          solicitud._id === id ? { ...solicitud, terminada } : solicitud
        )
      );
    } catch (error) {
      console.error("Error al actualizar la solicitud:", error);
    }
  };

  useEffect(() => {
    obtenerSolicitudes();
  }, []);
  /*
  useEffect(() => {
    obtenerSolicitudes();
  }, []); */

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

  const getProyectosByArea = async (area) => {
    try {
      const proyectos = await getProyectosByAreaRequest(area);
      return proyectos.data;
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
    try {
      const res = await createCarruselRequest(carrusel);
      return res;
    } catch (error) {
      throw error;
    }
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
      console.log(carruselActualizado);
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
      if (!id) {
        throw new Error("ID no está definido");
      }
      await updateUbicacionRequest(id, ubicacion);
    } catch (error) {
      console.error(error);
    }
  };

  /** ------------------Areas----------------------- */
  const [areas, setAreas] = useState([]);
  const [area, setArea] = useState([]);

  const crearArea = async (area) => {
    try {
      const res = await crearAreaRequest(area);
      console.log(res);
    } catch (error) {
      throw error;
    }
  };

  const obtenerAreas = async () => {
    const areas = await getAreasRequest();
    setAreas(areas.data);
  };

  const deleteArea = async (id) => {
    try {
      const res = await deleteAreaRequest(id);
      console.log(res);
      if (res.status === 204) setArea(area.filter((area) => area._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const editarArea = async (id, area) => {
    try {
      const areaActualizada = await editarAreaRequest(id, area);
      console.log(areaActualizada);
    } catch (error) {
      console.error(error);
    }
  };
  /**--------------------------SubMenu------------------------ */
  const [subMenu, setSubMenu] = useState(null);
  const [idSubMenu, setIdSubMenu] = useState(null);

  const updateSubMenu = async (id, subMenu) => {
    try {
      await editarSubMenuRequest(id, subMenu);
    } catch (error) {
      console.error(error);
    }
  };

  const [carruselActivo, setCarruselActivo] = useState("");

  useEffect(() => {
    console.log("Valor de carruselActivo en el contexto:", carruselActivo);
  }, [carruselActivo]);

  const obtenerSubMenu = async () => {
    const subMenu = await getSubMenusRequest();
    //console.log(subMenu.data[0]._id)
    const id = subMenu.data[0]._id;
    const subMenuRef = await obtenerSubMenuRef(id);
    setSubMenu(subMenuRef.data.subMenu);
    setIdSubMenu(id);
  };

  /**------------------------------Producto-------------------- */
  const [productos, setProductos] = useState([]);
  const [producto, setProducto] = useState([]);
  const crearProducto = async (producto) => {
    try {
      const res = await crearProductoRequest(producto);
      console.log(res);
    } catch (error) {
      throw error;
    }
  };

  const obtenerProductos = async () => {
    const productos = await getProductosrequest();
    setProductos(productos.data);
  };

  const deleteProducto = async (id) => {
    try {
      const res = await deleteProductoRequest(id);
      console.log(res);
      if (res.status === 204)
        setProducto(producto.filter((area) => producto.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const editarProducto = async (id, producto) => {
    try {
      const productoActualizado = await editarProductoRequest(id, producto)
      console.log(productoActualizado)
    } catch (error) {
      console.error(error)
    }
  }

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
        createSolicitud, // solicitudes
        obtenerSolicitudes,
        actualizarSolicitud,
        solicitudes,
        crearProyecto, // proyectos
        updateProyecto,
        deleteProyecto,
        getProyectos,
        getProyecto,
        getProyectosByArea,
        proyectos,
        proyecto,
        crearUbicacion, // ubicaciones
        obtenerUbicaciones,
        ubicaciones,
        deleteUbicacion,
        updateUbicacion,
        crearArea, // AREAS
        obtenerAreas,
        deleteArea,
        editarArea,
        areas,
        obtenerSubMenu, //Submenu
        subMenu,
        updateSubMenu,
        idSubMenu,
        carruselActivo, //carrusel
        setCarruselActivo,
        crearProducto,//Productos
        editarProducto,
        deleteProducto,
        obtenerProductos,
        productos
      }}
    >
      {children}
    </InsoelContext.Provider>
  );
}
