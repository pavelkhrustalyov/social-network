import axios from 'axios';

class User {
    getMe() {
        try {
            return await axios.post('/api/users/me');
        } catch (error) {
            console.log(error);
        }
    }
    getUser(id) {
        try {
            return await axios.post(`/api/users/${id}`);
        } catch (error) {
            console.log(error);
        }
    }
}

export default new User();