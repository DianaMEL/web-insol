import axios from './axios'

export const crearAreaRequest = (subMenu) => axios.post('/crearArea', subMenu);
export const getAreasRequest = () => axios.get('/obtenerAreas');
export const deleteAreaRequest = (id) => axios.delete(`/eliminarArea/${id}`);
export const editarAreaRequest = (id, area) => axios.put(`/editarArea/${id}`, area);