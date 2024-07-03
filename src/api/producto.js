import axios from './axios'

export const crearProductoRequest = (producto) => axios.post('/crearProducto', producto)
export const getProductosrequest = () => axios.get('/obtenerProductos')
export const deleteProductoRequest = (id) => axios.delete(`/eliminarProducto/${id}`)
export const editarProductoRequest = (id, producto) => axios.put(`/editarProducto/${id}`, producto)