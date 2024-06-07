import axios from './axios'

export const createSolicitudRequest = (solicitud) => axios.post('/enviarSolicitud',solicitud);
export const getSolicitudesRequest = () => axios.get('/obtenerSolicitudes') 