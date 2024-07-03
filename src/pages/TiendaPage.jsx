import React, {useEffect, useState} from 'react'
import Footer from '../Components/Footer'
import Productos from '../Components/Productos'
import Navbar_Tienda from '../Components/Navbar_Tienda'
import { FaWhatsapp } from "react-icons/fa";

function TiendaPage() {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    setShowAlert(true);
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 10000); // Oculta el mensaje después de 5 segundos

    return () => clearTimeout(timer); // Limpiar el temporizador al desmontar
  }, []);

  return (
    <div>
      <Navbar_Tienda />
      {showAlert && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
           
           <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white  p-10 rounded-lg shadow-lg max-w-md mx-auto space-y-4 animate-drop">
            <h2 className="text-2xl font-bold text-center">
              ¿Interesado en algún producto? 
            </h2>
            <p className="text-lg text-justify font-medium">
              Para adquirir alguno de los productos mostrados, por favor
              contáctanos por WhatsApp haciendo clic en el botón en la parte
              superior derecha de la página.
            </p>
            <p className="text-base font-medium text-center italic  ">
              Agradecemos tu interés y estaremos encantados de asistirte.
            </p>
          
          </div>
        </div>
      )}
    
      <Productos />
    </div>
  );
}

export default TiendaPage