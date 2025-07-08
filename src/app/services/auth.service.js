import api from "../api";
import localStorageService from "./localStorage.service";

const authService = {
  register: async (payload) => {
    const data = await api.users.create(payload);
    return data;
  },
  login: async ({ email, password }) => {
    // В реальном приложении это был бы вызов API
    const users = await api.users.fetchAll();
    const foundUser = users.find((user) => user.email === email);

    if (!foundUser) {
      throw new Error("Пользователь с таким Email не найден");
    }
    if (foundUser.password !== password) {
      throw new Error("Неверный пароль");
    }

    // В реальном приложении сервер вернул бы токен.
    // Здесь мы симулируем это, сохраняя ID пользователя.
    localStorageService.setTokens({
      userId: foundUser._id
      // в реальном приложении здесь были бы accessToken, refreshToken, expiresIn
    });

    return foundUser;
  }
};

export default authService;
