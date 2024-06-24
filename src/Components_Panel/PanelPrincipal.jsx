import React, {useEffect, useState} from 'react'
import LogoAmarilloBlanco from "../img/Logos/AmarilloBlanco.png";
import { useInsoel } from '../Context/InsoelContext';
import { TfiClipboard } from "react-icons/tfi";
import { FiInbox } from "react-icons/fi";
import { ImUser } from "react-icons/im";
import { BsBuildingsFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { GrServices } from "react-icons/gr";
import { MdDescription } from "react-icons/md";

function PanelPrincipal() {
 const { obtenerSolicitudes, actualizarSolicitud, solicitudes } = useInsoel(); // Se obtienen las funciones y el arreglo de solicitudes del hook useInsoel()
  const [terminadas, setTerminadas] = useState(() => {
    const savedTerminadas = localStorage.getItem('terminadas');
    return savedTerminadas ? JSON.parse(savedTerminadas) : [];
  });
  
  useEffect(() => {
    obtenerSolicitudes(); // Se llama a la función obtenerSolicitudes al montar el componente o cuando obtenerSolicitudes cambia
  }, [obtenerSolicitudes]); // Se especifica que el efecto se ejecutará cuando obtenerSolicitudes cambie

  useEffect(() => {
    localStorage.setItem('terminadas', JSON.stringify(terminadas));
  }, [terminadas]);

  // Función que determina si dos fechas están en la misma semana
  const isSameWeek = (date1, date2) => {
    const startOfWeek = (date) => {
      const day = date.getDay();
      const diff = date.getDate() - day + (day === 0 ? -7 : 1);
      const newDate = new Date(date.setDate(diff));
      newDate.setHours(0, 0, 0, 0);
      return newDate;
    };

    const date1StartOfWeek = startOfWeek(new Date(date1));
    const date2StartOfWeek = startOfWeek(new Date(date2));

    return date1StartOfWeek.getTime() === date2StartOfWeek.getTime();
  };

  // Filtra las solicitudes para obtener solo las de la misma semana que la fecha actual
  const filteredSolicitudes = solicitudes.filter(solicitud => {
    if (!solicitud.fecha) {
      return false; // Omitir solicitudes sin fecha
    }

    const solicitudDate = new Date(solicitud.fecha);
    if (isNaN(solicitudDate)) {
      return false; // Omitir solicitudes con fecha inválida
    }

    const now = new Date();
    return isSameWeek(solicitudDate, now); // Retorna true si la fecha de la solicitud está en la misma semana que la fecha actual
  });

  // Función para manejar el cambio de estado del checkbox
  const handleCheckboxChange = async (solicitudId) => {
    try {
      await actualizarSolicitud(solicitudId, !terminadas.includes(solicitudId));
      setTerminadas((prevTerminadas) => {
        const newTerminadas = prevTerminadas.includes(solicitudId)
          ? prevTerminadas.filter(id => id !== solicitudId)
          : [...prevTerminadas, solicitudId];

        // Imprimir el estado de todas las solicitudes
        const solicitudStatus = solicitudes.map(solicitud => ({
          id: solicitud._id,
          terminada: newTerminadas.includes(solicitud._id)
        }));
        console.log(solicitudStatus);

        return newTerminadas;
      });
    } catch (error) {
      console.error('Error al actualizar la solicitud:', error);
    }
  };

  // Función para eliminar solicitudes terminadas al comienzo de cada semana
  const eliminarTerminadas = () => {
    setTerminadas((prevTerminadas) => {
      const nuevasTerminadas = prevTerminadas.filter(id =>
        filteredSolicitudes.some(solicitud => solicitud._id === id)
      );
      return nuevasTerminadas;
    });
    obtenerSolicitudes(); // Refrescar la lista de solicitudes después de eliminar las terminadas
  };

  // Efecto para ejecutar la eliminación al comienzo de cada semana
  useEffect(() => {
    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 1)); // Lunes de esta semana
    startOfWeek.setHours(0, 0, 0, 0);

    const nextMonday = new Date(startOfWeek);
    nextMonday.setDate(nextMonday.getDate() + 7); // Próximo lunes

    const timeUntilNextMonday = nextMonday - now;

    const timer = setTimeout(eliminarTerminadas, timeUntilNextMonday);

    return () => clearTimeout(timer); // Limpiar el timeout al desmontar el componente o al cambiar de semana
  }, []);

  return (
    <div className='container mx-auto px-4 py-8 mt-14'>
      {filteredSolicitudes.length > 0 ? (
        <>
        <h1 className='text-3xl font-semibold mb-6 text-center text-gray-800'>Solicitudes</h1>
        <ul className='grid grid-cols-3 gap-4'>
          {filteredSolicitudes.map((solicitud, index) => (
            <li
              key={solicitud._id}
              className='bg-opacity-25 bg-gray-900 p-6 rounded-lg shadow flex items-start space-x-4'
            >
              <TfiClipboard className='text-secondary text-2xl mt-1' />
              <div className='flex-1'>
                <h2 className='text-xl font-semibold text-secondary'>Solicitud {index + 1}</h2>
                <div className='text-black'>
                  <div className='flex items-center'>
                    <ImUser className='text-xl m-2' />
                    <p>{solicitud.nombre}</p>
                  </div>
                  <div className='flex items-center'>
                    <MdEmail className='text-xl m-2' />
                    <p>{solicitud.correo}</p>
                  </div>
                  <div className='flex items-center'>
                    <FaPhoneAlt className='text-xl m-2' />
                    <p>{solicitud.telefono}</p>
                  </div>
                  <div className='flex items-center'>
                    <BsBuildingsFill className='text-xl m-2' />
                    <p>{solicitud.empresa}</p>
                  </div>
                  <p className='-ml-11'><strong>Servicio:</strong> {solicitud.servicio}</p>
                  <p className='-ml-11'><strong>Descripción:</strong> {solicitud.descripcion}</p>
                </div>
                <div className='flex items-center mt-4'>
                  <input
                    type='checkbox'
                    checked={terminadas.includes(solicitud._id)}
                    onChange={() => handleCheckboxChange(solicitud._id)}
                  />
                  <label className='ml-2'>Terminado</label>
                </div>
              </div>
            </li>
          ))}
        </ul>
       </> 
      ) : (
        <div className='flex flex-col items-center text-gray-500 mt-24'>
          <FiInbox className='text-9xl mb-4' />
          <p className='text-2xl'>No hay solicitudes disponibles</p>
        </div>
      )}
    </div>
  );
}




export default PanelPrincipal