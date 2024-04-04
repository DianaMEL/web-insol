import React, {useState, useEffect} from 'react'

import Automa from "../img/Noticias/automatizacion.jpg";
import FormCarrusel from '../Components_Panel/FormCarrusel';
import ListCarrusel from '../Components_Panel/ListCarrusel';
import { getCarruselesRequest } from '../api/carruseles';

function CarruselPage() {

  const [carruseles, setCarruseles] = useState([]);
 
      const [mostrarFormulario, setMostrarFormulario] = useState(false);
      useEffect(() => {
        obtenerCarruseles();
      }, []); 
    
      const obtenerCarruseles = async () => {
        try {
          const carruseles = await getCarruselesRequest();
          setCarruseles(carruseles.data);
        } catch (error) {
          console.error('Error al obtener carruseles', error);
        }
      };

      const handleClickNuevoProyecto = () => {
        setMostrarFormulario(true);
      };

    return (
        <div className="container mx-auto px-4 py-8 ">
      <div className="flex justify-between items-center ">
      {!mostrarFormulario && (
            <h1 className="mt-10 text-3xl font-bold ml-5">Carrusel</h1>
          )}
        {mostrarFormulario ? (
            <div className='ml-24 mt-10'>
                
            <FormCarrusel/>
            </div>
          ) : (
            // Mostrar el botón "Nuevo Proyecto" cuando mostrarFormulario es false
            <button onClick={handleClickNuevoProyecto} className="mt-14 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">Nuevo Carrusel</button>
          )}
      </div>
      {!mostrarFormulario && (
            <div>
              <ListCarrusel carruseles={carruseles} />
            </div>
          )}
    </div>
      )
}

export default CarruselPage