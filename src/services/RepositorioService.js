import api from './api';

export default {
    async index(id) {
        try {
            const response = await api.get(`/repos?postId=${id}`)
            return response.data;

        } catch (error) {
            return [];
        }
    },

    async update(postId, name, data, id) {
        try {
            await api.put(`/repos/${id}`, {
                postId,
                name,
                data,
                id,
            })
            return 'sucesso'
        }
        catch (error) {
            return  'erro'
        }
    },

    async create(postId, name, data) {
        try {
            await api.post(`/repos/`, {
                postId,
                name,
                data,
            })
            return 'sucesso'
        }
        catch (error) {
            return  'erro'
        }
    },

    async delete(id) {
        try {
            await api.delete(`/repos/${id}`)
            return 'sucesso'
        }
        catch (error) {
            return  'erro'
        }
    },

    async show(postId,nome ) {
        try {
            const response = await api.get(`/repos?postId=${postId}&name=${nome}`,)
            return response.data;
        }
        catch (error) {
            return [];
        }
    }
}

