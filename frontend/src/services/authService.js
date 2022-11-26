import { endpoint, requestConfig } from "../utils/config";

//  Registrar um usuário no sistema

const register = async (data) => {
  const config = requestConfig("POST", data);

  try {
    const res = await fetch(endpoint + "/users/register", config)
      .then((res) => res.json())
      .catch((err) => err);

    if (res) {
      localStorage.setItem("user", JSON.stringify(res));
    }
    return res;
  } catch (error) {}
};

// logout user
const logout = () => {
  localStorage.removeItem("user");
};

// Login user
const login = async (data) => {
  const config = requestConfig("POST", data);

  try {
    const res = await fetch(endpoint + "user/login", config)
      .then((res) => res.json())
      .catch((err) => err);

    if (res) {
      localStorage.setItem("user", JSON.stringify(res));
    }

    return res;
  } catch (error) {}
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
