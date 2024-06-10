import axios from './axios'

export const crearProyectoRequest = (proyecto) => axios.post('/crearProyecto', proyecto);
export const getProyectosRequest = () => axios.get('/obtenerProyectos')
export const getProyectoRequest = (id) => axios.get(`/proyecto/${id}`)
export const deleteProyectoRequest = (id) => axios.delete(`/eliminarProyecto/${id}`)
export const updateProyectoRequest = (id, proyecto) => axios.put(`/actualizarProyecto/${id}`, proyecto)
export const getProyectosByAreaRequest = (area) => axios.get(`/proyectosByArea/${area}`)