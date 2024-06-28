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

function Tsolicitudes() {
    const { obtenerSolicitudes, solicitudes } = useInsoel(); 

    useEffect(() => {
      obtenerSolicitudes();
    }, [obtenerSolicitudes]);
    
    return (
      <div className='container mx-auto px-4 py-8 mt-14'>
        <h1 className='text-3xl font-semibold mb-6  text-gray-800'>Solicitudes</h1>
        {solicitudes.length > 0 ? (
          <ul className='grid grid-cols-3 gap-4'>
            {solicitudes.map((solicitud, index) => (
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
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className='text-center text-gray-600'>No hay solicitudes disponibles.</p>
        )}
      </div>
    )    
  }
  

export default Tsolicitudes

{/* <div className='container mx-auto px-4 py-8 mt-10'>
        <h1 className='text-3xl font-semibold mb-6 text-center text-gray-800'>Solicitudes</h1>
        {solicitudes.length > 0 ? (
          <ul>
            {solicitudes.map((solicitud, index) => (
              <li key={index}>
                <TfiClipboard className='text-blue-500 text-2xl mt-1' />
                <div>
                  <h2>Solicitud {index + 1}</h2>
                  <div>
                    {Object.keys(solicitud).map(key => (
                      <p key={key}>
                        <strong>{key}:</strong> {solicitud[key]}
                      </p>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div>
            <FiInbox />
            <p>No hay solicitudes disponibles</p>
          </div>
        )}
      </div> */}