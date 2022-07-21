import axios from "axios";

export default axios.create({
    baseURL: 'https://doowit-app.herokuapp.com/'
},
{
    credentials: 'include',
});