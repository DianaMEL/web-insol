import React, {useState, useEffect} from 'react'
import FormUbicacion from '../Components_Panel/FormUbicacion';
import ListMapaUbicacion from '../Components_Panel/ListMapaUbicacion';
import Paginador from '../Components_Panel/Paginador';
import { getUbicacionesRequest } from '../api/ubicaciones';

function MapaUbicacionPage() {
  /*
    const ubicaciones = [
        {
          id: 1,
          nombre: "UNAM",
          direccion:"Col. Loma Linda, San Juan del Rio, QRO, C.P.76820.",
          latitud: "15.654 ",
          longitud:"130.5434234",
        },
        {
            id: 2,
            nombre: "UNAM",
            direccion:"Col. Loma Linda, San Juan del Rio, QRO, C.P.76820.",
            latitud: "15.654 ",
            longitud:"130.5434234",
          },
          {
            id: 3,
            nombre: "UNAM",
            direccion:"Col. Loma Linda, San Juan del Rio, QRO, C.P.76820.",
            latitud: "15.654 ",
            longitud:"130.5434234",
          },
          {
            id: 4,
            nombre: "UNAM",
            direccion:"Col. Loma Linda, San Juan del Rio, QRO, C.P.76820.",
            latitud: "15.654 ",
            longitud:"130.5434234",
          },
          {
            id: 5,
            nombre: "UNAM",
            direccion:"Col. Loma Linda, San Juan del Rio, QRO, C.P.76820.",
            latitud: "15.654 ",
            longitud:"130.5434234",
          },
          {
            id: 6,
            nombre: "UNAM",
            direccion:"Col. Loma Linda, San Juan del Rio, QRO, C.P.76820.",
            latitud: "15.654 ",
            longitud:"130.5434234",
          },
          {
            id: 7,
            nombre: "UNAM",
            direccion:"Col. Loma Linda, San Juan del Rio, QRO, C.P.76820.",
            latitud: "15.654 ",
            longitud:"130.5434234",
          },
        
      ];
*/
      const [ubicaciones, setUbicaciones] = useState([]);
      const [mostrarFormulario, setMostrarFormulario] = useState(false);
      const [filtroNombre, setFiltroNombre] = useState('');

      useEffect(() => {
        obtenerUbicaciones();
      }, []); 
    
      const obtenerUbicaciones = async () => {
        try {
          const ubicaciones = await getUbicacionesRequest();
          setUbicaciones(ubicaciones.data);
        } catch (error) {
          console.error('Error al obtener las Ubicaciones', error);
        }
      };

      const handleClickNuevoProyecto = () => {
        setMostrarFormulario(true);
      }

  
  
  const handleChangeFiltroNombre = (event) => {
    setFiltroNombre(event.target.value);
  };

    return (
      <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        {!mostrarFormulario && (
          <h1 className="mt-16 text-3xl font-bold ml-5">Mapa Ubicaciones</h1>
        )}
        {mostrarFormulario ? (
          <div className="">
            {/* Mostrar el formulario cuando mostrarFormulario es true */}
            <FormUbicacion />
          </div>
        ) : (
          // Mostrar el botón "Nueva Ubicación" cuando mostrarFormulario es false
          <button onClick={handleClickNuevoProyecto} className="mt-16 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">
            Nueva Ubicación
          </button>
        )}
      </div>
      {!mostrarFormulario && (
        <div>
          {/* Agregar el campo de búsqueda  */}
          <div className="mb-4">
            <input
              type="text"
              value={filtroNombre}
              onChange={handleChangeFiltroNombre}
              placeholder="Buscar por nombre de ubicación"
              className="p-2 w-[20rem] border rounded-md ml-5 mb-5"
            />
          </div>
          {/* Pasar el filtro a la lista de ubicaciones */}
          <ListMapaUbicacion ubicaciones={ubicaciones.filter(ubicacion => ubicacion.nombre.toLowerCase().includes(filtroNombre.toLowerCase()))} />
        </div>
      )}
       
      
    </div>
      )
}

export default MapaUbicacionPage