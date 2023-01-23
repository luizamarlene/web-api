import api from './api';

export default async function UsuarioService(usuario) {
    try {
        const response = await api.get(`/users?login=${usuario}`)
        return response.data[0];
        
    } catch (error) {
        return {};
    }
}