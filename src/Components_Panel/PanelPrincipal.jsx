import React, {useEffect} from 'react'
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
  const { obtenerSolicitudes, solicitudes } = useInsoel(); // Se obtienen las funciones y el arreglo de solicitudes del hook useInsoel()

useEffect(() => {
  obtenerSolicitudes(); // Se llama a la función obtenerSolicitudes al montar el componente o cuando obtenerSolicitudes cambia
}, [obtenerSolicitudes]); // Se especifica que el efecto se ejecutará cuando obtenerSolicitudes cambie

// Función que determina si dos fechas están en la misma semana
const isSameWeek = (date1, date2) => {
  // Función para obtener el inicio de la semana de una fecha dada
  const startOfWeek = (date) => {
const day = date.getDay(); // 0 (domingo) a 6 (sábado)
const diff = date.getDate() - day + (day === 0 ? -7 : 1); // Ajuste para lunes a domingo
    //const day = date.getDay();
    //const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Ajuste si el día es domingo
    date.setDate(diff);
    date.setHours(0, 0, 0, 0); // Normaliza la hora a las 00:00:00
    return date;
  };

  // Obtiene el inicio de la semana para ambas fechas
  const date1StartOfWeek = startOfWeek(new Date(date1));
  const date2StartOfWeek = startOfWeek(new Date(date2));

  // Retorna true si los inicios de semana son iguales
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

  return (
    <div className='container mx-auto px-4 py-8 mt-14 '>
      <h1 className='text-3xl font-semibold mb-6 text-center text-gray-800'>Solicitudes</h1>
      {filteredSolicitudes.length > 0 ? (
        <ul className='grid grid-cols-3 gap-4 '>
          {filteredSolicitudes.map((solicitud, index) => (
            <li
              key={index}
              className='bg-opacity-25 bg-gray-900 p-6 rounded-lg shadow flex items-start space-x-4'
            >
              <TfiClipboard className='text-secondary text-2xl mt-1' />
              <div className='flex-1'>
  <h2 className='text-xl font-semibold text-secondary'>Solicitud {index + 1}</h2>
  <div className='text-black'>
    <div className='flex items-center'>
      <ImUser className=" text-xl m-2" />
      <p>{solicitud.nombre}</p>
    </div>
    <div className='flex items-center'>
      <MdEmail className=" text-xl m-2" />
      <p>{solicitud.correo}</p>
    </div>
    <div className='flex items-center'>
      <FaPhoneAlt className=" text-xl m-2" />
      <p>{solicitud.telefono}</p>
    </div>
    <div className='flex items-center'>
      <BsBuildingsFill className=" text-xl m-2" />
      <p>{solicitud.empresa}</p>
    </div>
    <p className='-ml-11 '><strong>Servicio:</strong> {solicitud.servicio}</p>
    <p className='-ml-11'><strong>Descripción:</strong> {solicitud.descripcion}</p>
  </div>
</div>

            </li>
          ))}
        </ul>
      ) : (
        <div className='flex flex-col items-center text-gray-500'>
          <FiInbox className='text-6xl mb-4' />
          <p className='text-lg'>No hay solicitudes disponibles</p>
        </div>
      )}
    </div>
  );
}


export default PanelPrincipal