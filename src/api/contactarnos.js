import axios from './axios'

export const createSolicitudRequest = (solicitud) => axios.post('/enviarSolicitud',solicitud);
export const getSolicitudesRequest = () => axios.get('/obtenerSolicitudes') ;
export const updateSolicitudRequest = (id, solicitud) => axios.put(`/actualizarSolicitud/${id}`, solicitud);