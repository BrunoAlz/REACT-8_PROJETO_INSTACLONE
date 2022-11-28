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

const photoService = {
  publishPhoto,
};

export default photoService;
