import axios from 'axios';

const UserService = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

export default UserService;