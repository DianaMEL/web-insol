import axios from './axios'

export const crearSubMenuRequest = (subMenu) => axios.post('/crearSubMenu', subMenu);
export const getSubMenusRequest = () => axios.get('/obtenerSubMenus');
//export const deleteSubMenuRequest = (id) => axios.delete(`/eliminarSubMenu/${id}`);
export const editarSubMenuRequest = (id, subMenu) => axios.put(`/editarSubMenu/${id}`, subMenu);
export const obtenerSubMenuRef = (id) => axios.get(`/referenciasSubMenu/${id}`)