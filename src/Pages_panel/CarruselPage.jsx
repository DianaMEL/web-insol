import React, {useState, useEffect} from 'react'

import Automa from "../img/Noticias/automatizacion.jpg";
import FormCarrusel from '../Components_Panel/FormCarrusel';
import ListCarrusel from '../Components_Panel/ListCarrusel';
import { getCarruselesRequest } from '../api/carruseles';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useInsoel } from '../Context/InsoelContext';

function CarruselPage() {
 
  const [carruseles, setCarruseles] = useState([]);
 
  const { carruselActivo, setCarruselActivo } = useInsoel(); // Obtén el valor de carruselActivo del contexto
  console.log("carruselActivo", carruselActivo);
  const [isLoading, setIsLoading] = useState(true);
      const [mostrarFormulario, setMostrarFormulario] = useState(false);
      const [recargar, setRecargar] = useState(false)
     
      const obtenerCarruseles = async () => {
        try {
          const response = await getCarruselesRequest();
          setCarruseles(response.data);
        } catch (error) {
          console.error('Error al obtener carruseles', error);
        }
      };
/*
      useEffect(() => {
        obtenerCarruseles();
        setRecargar(false);
      }, [recargar]); */
      useEffect(() => {
        const fetchData = async () => {
          await obtenerCarruseles();
          setIsLoading(false);
        };
    
        fetchData();
        setRecargar(false)
      }, [recargar]);
    
      const handleReloadCarrusel = () => {
        console.log("cargando Carrusel nuevamente");
        obtenerCarruseles();
        setRecargar(true);
        setMostrarFormulario(false)
      };
     

      const handleClickNuevoProyecto = () => {
        setMostrarFormulario(true);
      };

      const handleCarruselActivoChange = (event) => {
        const tituloSeleccionado = event.target.value;
        console.log("tituloSeleccionado", tituloSeleccionado);
        setCarruselActivo(tituloSeleccionado);
      };
      

    return (
        <div className="container mx-auto px-4 py-8 ">
      <div className="flex justify-between items-center ">
      {!mostrarFormulario && (
            <h1 className="mt-20 text-3xl font-bold ml-5">Carrusel</h1>
          )}
        {mostrarFormulario ? (
            <div className='ml-24 mt-10'>
                
            <FormCarrusel toast={toast} reloadCarrusel={handleReloadCarrusel} />
            </div>
          ) : (
            <div className="flex justify-between mt-7">
  {/* Sección de selección de carrusel activo 
  <div className="mt-12 mr-10">
    <label htmlFor="carruselActivo" className=' text-sm font-medium text-gray-700'></label>
    <div className="mt-1 relative">
    <select
      id="carruselActivo"
      value={carruselActivo}
      onChange={handleCarruselActivoChange}
      className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
    >
      <option value="">Seleccione un carrusel...</option>
      {carruseles.map((carrusel) => (
        <option key={carrusel._id} value={carrusel.titulo}>
          {carrusel.titulo}
        </option>
      ))}
    </select>
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M9.293 13.293a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414l-4 4a1 1 0 0 1 0 1.414z" clipRule="evenodd" />
      </svg>
    </div>
  </div>
  </div> */}
  {/*
  <div> 
    <button onClick={handleClickNuevoProyecto} className="mt-14 bg-tertiary hover:bg-secondary text-white py-2 px-4 rounded-md">Nuevo Carrusel</button>
  </div> */}
</div>


            
            
          )}
      </div>
      
      <ToastContainer/>

      {!mostrarFormulario && (
        isLoading ? (
          <div className="flex flex-col items-center justify-center mt-48">
      <div className="custom-progress-bar">
        <div className="custom-progress"></div>
      </div>
      <p className="custom-loading-text mt-4 text-xl font-semibold text-black">Cargando...</p>
    </div>
        ) : (
            <div>
              <ListCarrusel carruseles={carruseles} reloadCarrusel={handleReloadCarrusel} toast={toast}/>
            </div>
             )
          )}
    </div>
      )
}

export default CarruselPage