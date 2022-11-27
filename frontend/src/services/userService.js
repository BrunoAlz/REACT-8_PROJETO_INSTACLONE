import { endpoint, requestConfig } from "../utils/config";

// get user details
const profile = async (data, token) => {
  const config = requestConfig("GET", data, token);

  try {
    const res = await fetch(`${endpoint}/users/profile`, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {}
};

const userService = {
  profile,
};

export default userService;
