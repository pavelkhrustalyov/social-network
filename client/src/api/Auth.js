import axios from 'axios';

class Auth {
    login = async (data) => {
        try {
            const token = await axios.post('/api/auth/login', data);
            return data.token;
        } catch (error) {
            console.log(error);
        }
    }

    register = async (data) => {
        try {
            const token = await axios.post('/api/auth/register', data);
            return data.token;
        } catch (error) {
            console.log(error);
        }
    }
};

export default new Auth();