import axios from './axios'

export const crearUbicacionRequest = (ubicacion) => axios.post('/crearUbicacion', ubicacion);
export const getUbicacionesRequest = () => axios.get('/obtenerUbicaciones');