import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBirthdayCake, faPen } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import Avatar from "../../components/Avatar/Avatar";
import EditProfileForm from "./EditProfileForm";
import ProfileBio from "./ProfileBio";
import "./UserProfile.css";
import { GiTrophy } from "react-icons/gi";


const UserProfile = ({ slideIn, handleSlideIn }) => {
  const { id } = useParams();
  const users = useSelector((state) => state.usersReducer);
  const currentProfile = users.filter((user) => user._id === id)[0];
  const currentUser = useSelector((state) => state.currentUserReducer);
  const [Switch, setSwitch] = useState(false);

  return (
    <div className="home-container-1">
      <LeftSidebar slideIn={slideIn} handleSlideIn={handleSlideIn} />
      <div className="home-container-2">
        <section>
          <div className="user-details-container">
            <div className="user-details">
              <Avatar
                backgroundColor="purple"
                color="white"
                fontSize="50px"
                px="40px"
                py="30px"
              >
                {currentProfile?.name.charAt(0).toUpperCase()}
              </Avatar>
              <div className="user-name">
                <h1>{currentProfile?.name}</h1>
                <p>Points: {currentProfile?.points || 0}</p>
                <p>
                  <FontAwesomeIcon icon={faBirthdayCake} /> Joined{" "}
                  {moment(currentProfile?.joinedOn).fromNow()}
                </p>
              </div>
            </div>
            {currentUser?.result._id === id && (
              <button
                type="button"
                onClick={() => setSwitch(true)}
                className="edit-profile-btn"
              >
                <FontAwesomeIcon icon={faPen} /> Edit Profile
              </button>
            )}
          </div>
          <>
            {Switch ? (
              <EditProfileForm
                currentUser={currentUser}
                setSwitch={setSwitch}
              />
            ) : (
              <ProfileBio currentProfile={currentProfile} />
            )}
          </>
        </section>
        <section>
          <h1>Badges</h1>
          <div className="badge-container-wrapper">
            <div className="badge-container">
              <div>{currentProfile?.points>=50?1:0}</div>
              <GiTrophy className="badge-icon" id="bronze-badge" />
            </div>
            <div className="badge-container">
              <div>{currentProfile?.points>=100?1:0}</div>
              <GiTrophy className="badge-icon" id="silver-badge" />
            </div>
            <div className="badge-container">
            <div>{currentProfile?.points>=150?1:0}</div>
              <GiTrophy className="badge-icon" id="gold-badge" />
            </div>
          </div>
          <h1>Points system: </h1>
          <h4>1. If any question Gets upvote then +5 points and for downvote -5 points.</h4>
          <h4>2. If user posts question then +2 points and for delete -2 points.</h4>
          <h4>3. If user gives an answer then +5 points and for delete -5 points.</h4><br/>
          <h1>How to get Badges: </h1>
          <h4>1. For Bronze badge you have to earn 50 points.</h4>
          <h4>2. For Silver badge you have to earn 50 points.</h4>
          <h4>3. For Gold badge you have to earn 50 points.</h4>

        </section>
      </div>
    </div>
  );
};

export default UserProfile;
