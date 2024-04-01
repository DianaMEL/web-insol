import React, {useState, useEffect} from 'react'
import { deleteCarruselRequest, getCarruselesRequest } from '../api/carruseles';

function Carrusel({carrusel}) {

  //console.log('Datos del carrusel:', carrusel);

   // Definir el id del carrusel
   const id = carrusel ? carrusel._id : null;

   const handleClick = async () => {
     try {
      if (!id) {
        throw new Error("El ID del carrusel no está definido");
      }
       const data = await deleteCarruselRequest(id); // Pasar el id del carrusel a la función eliminarCarrusel
       console.log("Carrusel eliminado:", data);
      // Recargar la lista de carruseles después de eliminar uno
      
     
     } catch (error) {
       console.error("Error al eliminar el carrusel:", error);
       // Aquí podrías manejar el error de alguna manera, por ejemplo, mostrando un mensaje al usuario
     }
   };

    return ( 
        <div className="m-5 ">
            <div className="bg-opacity-25 bg-gray-900 shadow-xl rounded-md p-4 relative">
              
            <div className="">
            <h2 className="text-2xl text-center font-semibold text-secondary mb-4">{carrusel.titulo}</h2>
            
            
  <div className="grid gap-4 grid-cols-4 ">
  
  {carrusel?.imagenes?.map((imagen, index) => (
    <div key={index} className="relative group">
      <img
        src={`http://localhost:3000/uploads/carrusel/${imagen.nuevoNombre}`}
        alt={`Imagen ${index}`}
        className="w-full h-36 object-cover rounded-md transition-transform transform hover:scale-105"
        
      />
  </div>
  ))}
  </div> 

</div>
        
        
        {/* Botones de eliminar y editar */}
    <div className="flex justify-end mt-5">
      <button className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded-md mr-2"
      onClick={handleClick}>
        Eliminar
      </button>
      <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded-md">
        Editar
      </button>
    </div>
      </div>
    </div>
    
      );
}

export default Carrusel