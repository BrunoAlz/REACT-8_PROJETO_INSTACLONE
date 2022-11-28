/* eslint-disable no-unused-vars */
import "./EditProfile.css";

import { uploads } from "../../utils/config";

// Hooks
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// Redux
import { profile, resetMessage, updateProfile } from "../../slices/userSlice";

// Components
import Message from "../../components/Message";

const EditProfile = () => {
  const dispatch = useDispatch();
  const { user, message, error, loading } = useSelector((state) => state.user);

  // States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [bio, setBio] = useState("");
  const [previewImage, setpreviewImage] = useState("");

  // Load user data
  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

  // fill user data form
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setBio(user.bio);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // get user data from states
    const userData = {
      name,
    };

    if (profileImage) {
      userData.profileImage = profileImage;
    }

    if (bio) {
      userData.bio = bio;
    }

    if (password) {
      userData.password = password;
    }

    // build form data
    const formData = new FormData();

    Object.keys(userData).forEach((key) => formData.append(key, userData[key]));

    await dispatch(updateProfile(formData));

    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };

  const handleFile = (e) => {
    // Image preview
    const image = e.target.files[0];
    setpreviewImage(image);

    // update image state
    setProfileImage(image);
  };

  return (
    <div id="edit-profile">
      <h2> Edite seus dados</h2>
      <p className="subtitle">
        Adicione uma imagem de Perfil e conte mais sobre você...
      </p>
      {(user.profileImage || previewImage) && (
        <img
          className="profile-image"
          src={
            previewImage
              ? URL.createObjectURL(previewImage)
              : `${uploads}/users/${user.profileImage}`
          }
          alt={user.name}
        />
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          onChange={(e) => setName(e.target.value)}
          value={name || ""}
        />
        <input type="email" placeholder="E-mail" disabled value={email || ""} />
        <label>
          <span>Imagem do Perfil: </span>
          <input type="file" onChange={handleFile} />
        </label>
        <label>
          <span>Bio: </span>
          <input
            type="text"
            placeholder="Descrição do Perfil"
            onChange={(e) => setBio(e.target.value)}
            value={bio || ""}
          />
        </label>
        <label>
          <span>Deseja alterar sua senha? </span>
          <input
            type="password"
            placeholder="Digite sua nova Senha"
            onChange={(e) => setPassword(e.target.value)}
            value={password || ""}
          />
        </label>
        {!loading ? (
          <input type="submit" value="Atualizar" />
        ) : (
          <input type="submit" value="Aguarde..." disabled />
        )}
        {error && <Message msg={error} type="error" />}
        {message && <Message msg={message} type="success" />}
      </form>
    </div>
  );
};

export default EditProfile;
