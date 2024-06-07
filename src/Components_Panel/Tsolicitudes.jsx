import React, {useEffect} from 'react'
import LogoAmarilloBlanco from "../img/Logos/AmarilloBlanco.png";
import { useInsoel } from '../Context/InsoelContext';
import { TfiClipboard } from "react-icons/tfi";
import { FiInbox } from "react-icons/fi";

function Tsolicitudes() {
    const { obtenerSolicitudes, solicitudes } = useInsoel(); 

    useEffect(() => {
      obtenerSolicitudes();
    }, [obtenerSolicitudes]);
    
    return (
        <div className='container mx-auto px-4 py-8 mt-10'>
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
      </div>
    );
  }
  

export default Tsolicitudes