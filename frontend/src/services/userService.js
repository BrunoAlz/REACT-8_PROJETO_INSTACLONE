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

const updateProfile = async (data, token) => {
  const config = requestConfig("PUT", data, token, true);

  try {
    const res = await fetch(`${endpoint}/users/`, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {}
};

// get user Profile details
const getUserProfileDetails = async (id) => {
  const config = requestConfig("GET");

  try {
    const res = await fetch(`${endpoint}/users/${id}`, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {}
};

const userService = {
  profile,
  updateProfile,
  getUserProfileDetails,
};

export default userService;
