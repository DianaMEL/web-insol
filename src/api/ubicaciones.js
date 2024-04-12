import axios from './axios'

export const crearUbicacionRequest = (ubicacion) => axios.post('/crearUbicacion', ubicacion);
export const getUbicacionesRequest = () => axios.get('/obtenerUbicaciones');
export const deleteUbicacionRequest = (id) => axios.delete(`/eliminarUbicacion/${id}`)
export const updateUbicacionRequest = (id, ubicacion) => axios.put(`/editarUbicacion/${id}`, ubicacion)