import axios from 'axios';

export default axios.create({
    baseURL: 'https://doowit-server.onrender.com/'
},
{
    credentials: 'include',
});