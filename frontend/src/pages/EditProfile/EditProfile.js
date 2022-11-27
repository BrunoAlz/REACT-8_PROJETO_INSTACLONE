import "./EditProfile.css";

import { uploads } from "../../utils/config";

// Hooks
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// Redux
import { profile, resetMessage } from "../../slices/userSlice";

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

    if(user){
      setName(user.name)
      setEmail(user.email)
      setBio(user.bio)
    }

  }, [user])

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div id="edit-profile">
      <h2> Edite seus dados</h2>
      <p className="subtitle">
        Adicione uma imagem de Perfil e conte mais sobre você...
      </p>
      {/* img prev */}
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
          <input type="file" />
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
        <input type="submit" value="Atualizar" />
      </form>
    </div>
  );
};

export default EditProfile;
