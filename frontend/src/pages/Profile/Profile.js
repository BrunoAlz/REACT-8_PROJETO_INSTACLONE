/* eslint-disable no-unused-vars */
import "./Profile.css";

// Utils
import { uploads } from "../../utils/config";

// Hooks
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

// Redux
import { getUserProfileDetails } from "../../slices/userSlice";

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

  // New form and edit form refs
  const newPhotoForm = useRef();
  const editPhotoForm = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // load user data
  useEffect(() => {
    dispatch(getUserProfileDetails(id));
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
                <input type="text" placeholder="Insira o título" />
              </label>
              <label>
                <span>Imagem:</span>
                <input type="file" placeholder="Insira o título" />
              </label>
              <input type="submit" value="Postar!" />
            </form>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Profile;
