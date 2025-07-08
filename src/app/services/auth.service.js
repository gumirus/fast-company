import api from "../api";

const authService = {
    register: async (payload) => {
        const { data } = await api.users.create(payload);
        return data;
    }
};

export default authService; 