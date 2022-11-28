/* eslint-disable no-unused-vars */
import "./Profile.css";

// Utils
import { uploads } from "../../utils/config";

// Hooks
import { useState, useEffect } from "react";
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

  // Photo

  // load user data
  useEffect(() => {
    dispatch(getUserProfileDetails(id));
  }, [dispatch, id]);

  if (loading){
    return <p className="loader">Carregando...</p>
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
    </div>
  );
};

export default Profile;
