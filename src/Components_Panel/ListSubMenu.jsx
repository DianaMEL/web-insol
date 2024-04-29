import React,{useState} from 'react'
import SubMenu from './SubMenu'
import Paginador from './Paginador';

function ListSubMenu({submenus, reloadSubMenu}) {
   // Verificamos si el arreglo de datos está vacío o es nulo
   if (!submenus.length) return <h1>No hay datos disponibles</h1>;

   // Estados para el paginador
   const [currentPage, setCurrentPage] = useState(1);
   const itemsPerPage = 1; // Cambia este valor según tus necesidades numero de elementos por página
 
   // Calcula el total de páginas
   const totalPages = Math.ceil(submenus.length / itemsPerPage);
 
   // Función para cambiar la página
   const handlePageChange = (page) => { 
     setCurrentPage(page);
   };
 
   const paginatedData = submenus.slice(
     (currentPage - 1) * itemsPerPage,
     currentPage * itemsPerPage
   );
    return (
        <div>
          {" "} 
          <div className="grid gap-4 grid-cols-1">
            {paginatedData.map((submenu) => (
              <SubMenu key={submenu.id} submenu={submenu} reloadSubMenu={reloadSubMenu} />
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

export default ListSubMenu