import React from 'react'

import image1 from "../img/Submenu/desarrollo.png";

function Productos() {
    const productos = [
        {
          id: 1,
          nombre: 'Producto 1',
          descripcion: 'Esta es la descripción del producto 1',
          precio: '$10.00',
          imagen: image1
        },
        {
          id: 2,
          nombre: 'Producto 2',
          descripcion: 'Esta es la descripción del producto 2',
          precio: '$20.00',
          imagen: image1
        },
        {
            id: 3,
            nombre: 'Producto 2',
            descripcion: 'Esta es la descripción del producto 2',
            precio: '$20.00',
            imagen: image1
          },
       
      ];
    
      return (
        <div className="container mx-auto px-4 py-8 ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {productos.map(producto => (
              <div key={producto.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800">{producto.nombre}</h2>
                  <p className="text-gray-600 mt-2">{producto.descripcion}</p>
                  <p className="text-gray-800 mt-4 font-bold">{producto.precio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

export default Productos