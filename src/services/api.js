import axios from 'axios'
console.log('api')

const api = axios.create({
    baseURL: 'http://192.168.100.188:3000/',
})


export default api