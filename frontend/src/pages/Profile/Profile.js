/* eslint-disable no-unused-vars */
// CSS
import "./Profile.css";

// Utils
import { uploads } from "../../utils/config";

// Hooks
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";

// Redux
import { getUserProfileDetails } from "../../slices/userSlice";
import {
  publishPhoto,
  resetMessage,
  getUserPhotos,
} from "../../slices/photoSlice";

// Components
import Message from "../../components/Message";

// Icons
import { BsFillEyeFill, BsPencilFill, BsXLg } from "react-icons/bs";

const Profile = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  // Url user
  const { user, loading } = useSelector((state) => state.user);
  // Auth User
  const { user: userAuth } = useSelector((state) => state.auth);

  const {
    photos,
    loading: loadingPhoto,
    message: messagePhoto,
    error: errorPhoto,
  } = useSelector((state) => state.photo);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  // New form and edit form refs
  const newPhotoForm = useRef();
  const editPhotoForm = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const photoData = {
      title,
      image,
    };

    // Build form data
    const formData = new FormData();

    Object.keys(photoData).forEach((key) =>
      formData.append(key, photoData[key])
    );

    dispatch(publishPhoto(formData));
    setTitle("");

    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };

  const handleFile = (e) => {
    // Image preview
    const image = e.target.files[0];
    setImage(image);
  };

  // load user data
  useEffect(() => {
    dispatch(getUserProfileDetails(id));
    dispatch(getUserPhotos(id));
  }, [dispatch, id]);

  if (loading) {
    return <p className="loader">Carregando...</p>;
  }

  return (
    <div id="profile">
      <div className="profile-header">
        {user.profileImage && (
          <img src={`${uploads}/users/${user.profileImage}`} alt={user.name} />
        )}
        <div className="profile-description">
          <h2>{user.name}</h2>
          <p>{user.bio}</p>
        </div>
      </div>
      {id === userAuth._id ? (
        <>
          <div className="new-photo" ref={newPhotoForm}>
            <h3>Compartilhe algum momento:</h3>
            <form onSubmit={handleSubmit}>
              <label>
                <span>Título para a foto:</span>
                <input
                  type="text"
                  placeholder="Insira o título"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title || ""}
                />
              </label>
              <label>
                <span>Imagem:</span>
                <input
                  type="file"
                  placeholder="Insira o título"
                  onChange={handleFile}
                />
              </label>
              {!loadingPhoto ? (
                <input type="submit" value="Postar!" />
              ) : (
                <input type="submit" value="Aguarde..." disabled />
              )}
            </form>
          </div>
          {errorPhoto && <Message msg={errorPhoto} type="error" />}
          {messagePhoto && <Message msg={messagePhoto} type="success" />}
        </>
      ) : null}
      <div className="user-photos">
        <h2>Fotos Publicadas: </h2>
        <div className="photos-container">
          {photos
            ? photos.map((photo) => (
                <div className="photo" key={photo._id}>
                  {photo.image && (
                    <img
                      src={`${uploads}/photos/${photo.image}`}
                      alt={photo.title}
                    />
                  )}
                  {id === userAuth._id ? (
                    <p>Actions</p>
                  ) : (
                    <Link className="btn" to={`/photos/${photos._id}`}>
                      Ver
                    </Link>
                  )}
                </div>
              ))
            : null}
          {photos.length === 0 ? <p>Nenhuma Postagem publicada :/ </p> : null}
        </div>
      </div>
    </div>
  );
};

export default Profile;
