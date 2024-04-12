import React, {useState} from 'react'
import Carrusel from './Carrusel'
import Paginador from './Paginador';
import HomePage from '../pages/HomePage';

function 


ListCarrusel({carruseles}) { 
  // Verificamos si el arreglo de datos está vacío o es nulo
  if (!carruseles.length) return <h1>No hay datos disponibles</h1>;

  // Estados para el paginador
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1; // Cambia este valor según tus necesidades numero de elementos por página

  // Calcula el total de páginas
  const totalPages = Math.ceil(carruseles.length / itemsPerPage);

  // Función para cambiar la página
  const handlePageChange = (page) => { 
    setCurrentPage(page);
  };

  const paginatedData = carruseles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
    return (
        <div>
          {" "}
          <div className="grid gap-4 grid-cols-1">
            {paginatedData.map((carrusel) => (
              <Carrusel key={carrusel.id} carrusel={carrusel}  />
            ))}
          </div> 
          <div style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
        <Paginador
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
        </div>
  )
}

export default ListCarrusel