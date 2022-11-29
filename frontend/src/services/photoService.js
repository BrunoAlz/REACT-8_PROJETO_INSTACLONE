import { endpoint, requestConfig } from "../utils/config";

//  Publish an user photo

const publishPhoto = async (data, token) => {
  const config = requestConfig("POST", data, token, true);

  try {
    const res = await fetch(`${endpoint}/photos`, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {}
};

// Get user Photos
const getUserPhotos = async (id, token) => {
  const config = requestConfig("GET", null, token);

  try {
    const res = await fetch(`${endpoint}/photos/user/${id}`, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {}
};

// Get photo
// Get photo
const getPhoto = async (id) => {
  const config = requestConfig("GET");

  try {
    const res = await fetch(endpoint + "/photos/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// Delete a photo
const deleteUserPhoto = async (id, token) => {
  const config = requestConfig("DELETE", null, token);

  try {
    const res = await fetch(`${endpoint}/photos/${id}`, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {}
};

// Updade a photo
const updateUserPhoto = async (data, id, token) => {
  const config = requestConfig("PUT", data, token);

  try {
    const res = await fetch(`${endpoint}/photos/${id}`, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {}
};

const photoService = {
  publishPhoto,
  getUserPhotos,
  deleteUserPhoto,
  updateUserPhoto,
  getPhoto,
};

export default photoService;
