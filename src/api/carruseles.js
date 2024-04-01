import axios from './axios'

export const createCarruselRequest = (carrusel) => axios.post('/crearCarrusel', carrusel);
export const getCarruselesRequest = () => axios.get('/obtenerCarruseles')
export const deleteCarruselRequest = (id) => axios.delete(`/eliminarCarrusel/${id}`)
export const getCarruselRequest = (id) => axios.get(`/carrusel/${id}`)
export const getCarruselPorTituloRequest = (titulo) => axios.get(`/carrusel/${titulo}`)
